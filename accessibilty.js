// VisionArt Studio - Accessibility Features
class AccessibilityManager {
    constructor(app) {
        this.app = app;
        this.highContrast = false;
        this.largeText = false;
        this.screenReaderMode = false;
        this.keyboardNavigation = true;
        this.announcements = [];
        
        this.init();
    }

    init() {
        this.setupKeyboardNavigation();
        this.setupScreenReaderSupport();
        this.setupHighContrastMode();
        this.setupFocusManagement();
        this.setupAccessibilityPanel();
        this.detectAccessibilityPreferences();
    }

    detectAccessibilityPreferences() {
        // Detect system preferences
        if (window.matchMedia('(prefers-contrast: high)').matches) {
            this.enableHighContrast();
        }
        
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.reduceMotion();
        }
        
        // Check for screen reader
        if (navigator.userAgent.includes('NVDA') || 
            navigator.userAgent.includes('JAWS') || 
            navigator.userAgent.includes('VoiceOver')) {
            this.enableScreenReaderMode();
        }
    }

    setupAccessibilityPanel() {
        const panel = document.createElement('div');
        panel.className = 'accessibility-panel';
        panel.innerHTML = `
            <button class="accessibility-toggle" aria-label="Open accessibility options">
                ♿ Accessibility
            </button>
            <div class="accessibility-options" style="display: none;">
                <h3>Accessibility Options</h3>
                <label>
                    <input type="checkbox" id="high-contrast-toggle"> High Contrast Mode
                </label>
                <label>
                    <input type="checkbox" id="large-text-toggle"> Large Text
                </label>
                <label>
                    <input type="checkbox" id="screen-reader-toggle"> Screen Reader Mode
                </label>
                <label>
                    <input type="range" id="ui-scale" min="1" max="2" step="0.1" value="1"> UI Scale
                </label>
                <button id="reset-accessibility">Reset to Defaults</button>
            </div>
        `;
        
        document.body.appendChild(panel);
        
        // Event listeners
        const toggle = panel.querySelector('.accessibility-toggle');
        const options = panel.querySelector('.accessibility-options');
        
        toggle.addEventListener('click', () => {
            const isVisible = options.style.display !== 'none';
            options.style.display = isVisible ? 'none' : 'block';
            toggle.setAttribute('aria-expanded', !isVisible);
        });
        
        document.getElementById('high-contrast-toggle').addEventListener('change', (e) => {
            if (e.target.checked) {
                this.enableHighContrast();
            } else {
                this.disableHighContrast();
            }
        });
        
        document.getElementById('large-text-toggle').addEventListener('change', (e) => {
            if (e.target.checked) {
                this.enableLargeText();
            } else {
                this.disableLargeText();
            }
        });
        
        document.getElementById('screen-reader-toggle').addEventListener('change', (e) => {
            if (e.target.checked) {
                this.enableScreenReaderMode();
            } else {
                this.disableScreenReaderMode();
            }
        });
        
        document.getElementById('ui-scale').addEventListener('input', (e) => {
            this.setUIScale(parseFloat(e.target.value));
        });
        
        document.getElementById('reset-accessibility').addEventListener('click', () => {
            this.resetToDefaults();
        });
    }

    setupKeyboardNavigation() {
        let focusableElements = [];
        let currentFocusIndex = -1;
        
        const updateFocusableElements = () => {
            focusableElements = Array.from(document.querySelectorAll(
                'button, input, select, textarea, [tabindex]:not([tabindex="-1"]), [contenteditable]'
            )).filter(el => !el.disabled && el.offsetParent !== null);
        };
        
        document.addEventListener('keydown', (e) => {
            updateFocusableElements();
            
            switch (e.key) {
                case 'Tab':
                    // Enhanced tab navigation
                    if (e.shiftKey) {
                        currentFocusIndex = Math.max(0, currentFocusIndex - 1);
                    } else {
                        currentFocusIndex = Math.min(focusableElements.length - 1, currentFocusIndex + 1);
                    }
                    
                    if (focusableElements[currentFocusIndex]) {
                        e.preventDefault();
                        focusableElements[currentFocusIndex].focus();
                        this.announceElement(focusableElements[currentFocusIndex]);
                    }
                    break;
                    
                case 'Enter':
                case ' ':
                    // Activate focused element
                    if (document.activeElement && document.activeElement.click) {
                        e.preventDefault();
                        document.activeElement.click();
                    }
                    break;
                    
                case 'Escape':
                    // Close modals or return to canvas
                    const modal = document.querySelector('.modal-overlay.show');
                    if (modal) {
                        modal.classList.remove('show');
                    } else {
                        this.app.canvas.focus();
                    }
                    break;
                    
                case 'F1':
                    e.preventDefault();
                    this.showKeyboardShortcuts();
                    break;
            }
        });
        
        // Canvas keyboard controls
        this.app.canvas.addEventListener('keydown', (e) => {
            if (!this.app.canvas.matches(':focus')) return;
            
            const step = e.shiftKey ? 10 : 1;
            let handled = false;
            
            switch (e.key) {
                case 'ArrowUp':
                    this.moveCursor(0, -step);
                    handled = true;
                    break;
                case 'ArrowDown':
                    this.moveCursor(0, step);
                    handled = true;
                    break;
                case 'ArrowLeft':
                    this.moveCursor(-step, 0);
                    handled = true;
                    break;
                case 'ArrowRight':
                    this.moveCursor(step, 0);
                    handled = true;
                    break;
                case ' ':
                    this.simulateClick();
                    handled = true;
                    break;
            }
            
            if (handled) {
                e.preventDefault();
            }
        });
    }

    setupScreenReaderSupport() {
        // Create live region for announcements
        this.liveRegion = document.createElement('div');
        this.liveRegion.setAttribute('aria-live', 'polite');
        this.liveRegion.setAttribute('aria-atomic', 'true');
        this.liveRegion.className = 'sr-only';
        document.body.appendChild(this.liveRegion);
        
        // Add canvas description
        this.app.canvas.setAttribute('role', 'img');
        this.app.canvas.setAttribute('aria-label', 'Drawing canvas - Use arrow keys to navigate, space to draw');
        
        // Add tool descriptions
        this.enhanceToolDescriptions();
    }

    enhanceToolDescriptions() {
        const toolDescriptions = {
            'brush': 'Brush tool - Paint with pressure-sensitive strokes. Use arrow keys to position, space to paint.',
            'pencil': 'Pencil tool - Draw precise lines. Current size: {size}px.',
            'eraser': 'Eraser tool - Remove parts of your drawing. Current size: {size}px.',
            'line': 'Line tool - Draw straight lines. Click and drag or use arrow keys and space.',
            'rectangle': 'Rectangle tool - Draw rectangles and squares.',
            'circle': 'Circle tool - Draw circles and ellipses.',
            'text': 'Text tool - Add text to your artwork.',
            'crop': 'Crop tool - Trim your image to selected area.'
        };
        
        document.querySelectorAll('[data-tool]').forEach(btn => {
            const tool = btn.dataset.tool;
            if (toolDescriptions[tool]) {
                const description = toolDescriptions[tool].replace('{size}', this.app.brushSize);
                btn.setAttribute('aria-description', description);
            }
        });
    }

    setupHighContrastMode() {
        const style = document.createElement('style');
        style.id = 'high-contrast-styles';
        document.head.appendChild(style);
    }

    setupFocusManagement() {
        // Enhanced focus indicators
        const style = document.createElement('style');
        style.textContent = `
            .focus-enhanced *:focus {
                outline: 3px solid #0066cc !important;
                outline-offset: 2px !important;
                box-shadow: 0 0 0 5px rgba(0, 102, 204, 0.3) !important;
            }
            
            .sr-only {
                position: absolute !important;
                width: 1px !important;
                height: 1px !important;
                padding: 0 !important;
                margin: -1px !important;
                overflow: hidden !important;
                clip: rect(0, 0, 0, 0) !important;
                white-space: nowrap !important;
                border: 0 !important;
            }
            
            .accessibility-panel {
                position: fixed;
                top: 10px;
                right: 10px;
                z-index: 1000;
                background: white;
                border: 2px solid #333;
                border-radius: 8px;
                padding: 10px;
            }
            
            .accessibility-options {
                margin-top: 10px;
                padding: 10px;
                border: 1px solid #ccc;
                border-radius: 4px;
            }
            
            .accessibility-options label {
                display: block;
                margin: 8px 0;
                font-weight: 500;
            }
            
            .accessibility-options input {
                margin-right: 8px;
            }
        `;
        document.head.appendChild(style);
        
        document.body.classList.add('focus-enhanced');
    }

    enableHighContrast() {
        this.highContrast = true;
        document.body.classList.add('high-contrast');
        
        const style = document.getElementById('high-contrast-styles');
        style.textContent = `
            .high-contrast {
                --text-primary: #000000 !important;
                --text-secondary: #000000 !important;
                --bg-primary: #ffffff !important;
                --bg-secondary: #f0f0f0 !important;
                --bg-tertiary: #e0e0e0 !important;
                --border-color: #000000 !important;
                --primary-color: #0000ff !important;
                --primary-hover: #000080 !important;
            }
            
            .high-contrast button {
                border: 2px solid #000000 !important;
                background: #ffffff !important;
                color: #000000 !important;
            }
            
            .high-contrast button:hover,
            .high-contrast button.active {
                background: #000000 !important;
                color: #ffffff !important;
            }
        `;
        
        this.announce('High contrast mode enabled');
    }

    disableHighContrast() {
        this.highContrast = false;
        document.body.classList.remove('high-contrast');
        document.getElementById('high-contrast-styles').textContent = '';
        this.announce('High contrast mode disabled');
    }

    enableLargeText() {
        this.largeText = true;
        document.body.style.fontSize = '1.2em';
        this.announce('Large text enabled');
    }

    disableLargeText() {
        this.largeText = false;
        document.body.style.fontSize = '';
        this.announce('Large text disabled');
    }

    enableScreenReaderMode() {
        this.screenReaderMode = true;
        
        // Add more detailed descriptions
        this.app.canvas.setAttribute('aria-description', 
            'Drawing canvas. Current tool: ' + this.app.currentTool + 
            '. Canvas size: ' + this.app.canvas.width + ' by ' + this.app.canvas.height + ' pixels. ' +
            'Use arrow keys to navigate, space bar to draw or activate tools.'
        );
        
        // Announce tool changes
        const originalSelectTool = this.app.selectTool;
        this.app.selectTool = (tool) => {
            originalSelectTool.call(this.app, tool);
            this.announce(`${tool} tool selected`);
        };
        
        this.announce('Screen reader mode enabled');
    }

    disableScreenReaderMode() {
        this.screenReaderMode = false;
        this.announce('Screen reader mode disabled');
    }

    setUIScale(scale) {
        document.body.style.transform = `scale(${scale})`;
        document.body.style.transformOrigin = 'top left';
        this.announce(`UI scaled to ${Math.round(scale * 100)}%`);
    }

    reduceMotion() {
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
            }
        `;
        document.head.appendChild(style);
    }

    resetToDefaults() {
        this.disableHighContrast();
        this.disableLargeText();
        this.disableScreenReaderMode();
        this.setUIScale(1);
        
        // Reset checkboxes
        document.getElementById('high-contrast-toggle').checked = false;
        document.getElementById('large-text-toggle').checked = false;
        document.getElementById('screen-reader-toggle').checked = false;
        document.getElementById('ui-scale').value = 1;
        
        this.announce('Accessibility settings reset to defaults');
    }

    announce(message) {
        this.liveRegion.textContent = message;
        this.announcements.push({
            message,
            timestamp: Date.now()
        });
        
        // Keep only last 10 announcements
        if (this.announcements.length > 10) {
            this.announcements.shift();
        }
    }

    announceElement(element) {
        if (!this.screenReaderMode) return;
        
        const label = element.getAttribute('aria-label') || 
                     element.getAttribute('aria-description') ||
                     element.textContent ||
                     element.value ||
                     'Interactive element';
        
        this.announce(label);
    }

    moveCursor(deltaX, deltaY) {
        // Virtual cursor for keyboard navigation
        if (!this.virtualCursor) {
            this.virtualCursor = { x: this.app.canvas.width / 2, y: this.app.canvas.height / 2 };
        }
        
        this.virtualCursor.x = Math.max(0, Math.min(this.app.canvas.width, this.virtualCursor.x + deltaX));
        this.virtualCursor.y = Math.max(0, Math.min(this.app.canvas.height, this.virtualCursor.y + deltaY));
        
        // Visual indicator for cursor position
        this.showCursorIndicator();
        
        this.announce(`Cursor at ${Math.round(this.virtualCursor.x)}, ${Math.round(this.virtualCursor.y)}`);
    }

    showCursorIndicator() {
        // Remove existing indicator
        const existing = document.querySelector('.cursor-indicator');
        if (existing) existing.remove();
        
        // Create new indicator
        const indicator = document.createElement('div');
        indicator.className = 'cursor-indicator';
        indicator.style.cssText = `
            position: absolute;
            width: 20px;
            height: 20px;
            border: 2px solid #ff0000;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            animation: pulse 1s infinite;
        `;
        
        const rect = this.app.canvas.getBoundingClientRect();
        indicator.style.left = (rect.left + this.virtualCursor.x - 10) + 'px';
        indicator.style.top = (rect.top + this.virtualCursor.y - 10) + 'px';
        
        document.body.appendChild(indicator);
        
        // Remove after 2 seconds
        setTimeout(() => {
            if (indicator.parentNode) {
                indicator.parentNode.removeChild(indicator);
            }
        }, 2000);
    }

    simulateClick() {
        if (!this.virtualCursor) return;
        
        const event = new MouseEvent('mousedown', {
            clientX: this.virtualCursor.x,
            clientY: this.virtualCursor.y,
            bubbles: true
        });
        
        this.app.canvas.dispatchEvent(event);
        this.announce('Drawing at cursor position');
    }

    showKeyboardShortcuts() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay show';
        modal.innerHTML = `
            <div class="modal">
                <h2>Keyboard Shortcuts</h2>
                <div class="modal-content">
                    <div class="shortcuts-grid">
                        <h3>Navigation</h3>
                        <ul>
                            <li><strong>Tab / Shift+Tab:</strong> Navigate between controls</li>
                            <li><strong>Arrow Keys:</strong> Move cursor on canvas</li>
                            <li><strong>Space:</strong> Activate tool at cursor position</li>
                            <li><strong>Escape:</strong> Close dialogs or return to canvas</li>
                        </ul>
                        
                        <h3>Tools</h3>
                        <ul>
                            <li><strong>B:</strong> Brush tool</li>
                            <li><strong>P:</strong> Pencil tool</li>
                            <li><strong>E:</strong> Eraser tool</li>
                            <li><strong>T:</strong> Text tool</li>
                        </ul>
                        
                        <h3>Actions</h3>
                        <ul>
                            <li><strong>Ctrl+Z:</strong> Undo</li>
                            <li><strong>Ctrl+Y:</strong> Redo</li>
                            <li><strong>Ctrl+S:</strong> Save project</li>
                            <li><strong>Ctrl+E:</strong> Export artwork</li>
                            <li><strong>Ctrl+Plus:</strong> Zoom in</li>
                            <li><strong>Ctrl+Minus:</strong> Zoom out</li>
                        </ul>
                        
                        <h3>Accessibility</h3>
                        <ul>
                            <li><strong>F1:</strong> Show this help</li>
                            <li><strong>Alt+A:</strong> Open accessibility panel</li>
                        </ul>
                    </div>
                </div>
                <div class="modal-actions">
                    <button class="btn btn-primary" onclick="this.closest('.modal-overlay').remove()">Close</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        modal.querySelector('button').focus();
    }
}

// Color blindness support
class ColorBlindnessSupport {
    constructor() {
        this.filters = {
            'protanopia': this.protanopiaFilter,
            'deuteranopia': this.deuteranopiaFilter,
            'tritanopia': this.tritanopiaFilter
        };
    }

    applyColorBlindFilter(canvas, filterType) {
        if (!this.filters[filterType]) return;
        
        const ctx = canvas.getContext('2d');
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const filteredData = this.filters[filterType](imageData);
        ctx.putImageData(filteredData, 0, 0);
    }

    protanopiaFilter(imageData) {
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            
            data[i] = 0.567 * r + 0.433 * g;
            data[i + 1] = 0.558 * r + 0.442 * g;
            data[i + 2] = 0.242 * g + 0.758 * b;
        }
        return imageData;
    }

    deuteranopiaFilter(imageData) {
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            
            data[i] = 0.625 * r + 0.375 * g;
            data[i + 1] = 0.7 * r + 0.3 * g;
            data[i + 2] = 0.3 * g + 0.7 * b;
        }
        return imageData;
    }

    tritanopiaFilter(imageData) {
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            
            data[i] = 0.95 * r + 0.05 * g;
            data[i + 1] = 0.433 * g + 0.567 * b;
            data[i + 2] = 0.475 * g + 0.525 * b;
        }
        return imageData;
    }
}
