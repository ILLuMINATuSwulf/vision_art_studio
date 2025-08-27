/* VisionArt Studio - Accessible Creative App Styles */

:root {
    /* Accessibility-focused color palette */
    --primary-color: #2563eb;
    --primary-hover: #1d4ed8;
    --secondary-color: #64748b;
    --secondary-hover: #475569;
    --success-color: #059669;
    --warning-color: #d97706;
    --danger-color: #dc2626;
    
    /* High contrast colors for accessibility */
    --text-primary: #0f172a;
    --text-secondary: #475569;
    --text-inverse: #ffffff;
    --bg-primary: #ffffff;
    --bg-secondary: #f8fafc;
    --bg-tertiary: #e2e8f0;
    --border-color: #cbd5e1;
    --border-focus: #3b82f6;
    
    /* Spacing and sizing for accessibility */
    --touch-target-min: 44px; /* WCAG minimum touch target */
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;
    
    /* Typography */
    --font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    --font-size-sm: 0.875rem;
    --font-size-base: 1rem;
    --font-size-lg: 1.125rem;
    --font-size-xl: 1.25rem;
    --font-size-2xl: 1.5rem;
    
    /* Shadows and effects */
    --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
    
    /* Border radius */
    --radius-sm: 0.25rem;
    --radius-md: 0.375rem;
    --radius-lg: 0.5rem;
}

/* Reset and base styles */
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: var(--font-family);
    font-size: var(--font-size-base);
    line-height: 1.5;
    color: var(--text-primary);
    background-color: var(--bg-primary);
    overflow: hidden;
}

/* Focus styles for accessibility */
*:focus {
    outline: 2px solid var(--border-focus);
    outline-offset: 2px;
}

/* App container */
.app-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
}

/* Header */
.app-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-md) var(--spacing-lg);
    background-color: var(--bg-secondary);
    border-bottom: 1px solid var(--border-color);
    box-shadow: var(--shadow-sm);
}

.app-title {
    font-size: var(--font-size-2xl);
    font-weight: 700;
    color: var(--primary-color);
}

.header-controls {
    display: flex;
    gap: var(--spacing-md);
}

/* Main content layout */
.main-content {
    display: flex;
    flex: 1;
    overflow: hidden;
}

/* Toolbar */
.toolbar {
    width: 200px;
    background-color: var(--bg-secondary);
    border-right: 1px solid var(--border-color);
    padding: var(--spacing-lg);
    overflow-y: auto;
}

.tool-section {
    margin-bottom: var(--spacing-xl);
}

.section-title {
    font-size: var(--font-size-sm);
    font-weight: 600;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: var(--spacing-md);
}

.tool-btn {
    display: flex;
    align-items: center;
    width: 100%;
    min-height: var(--touch-target-min);
    padding: var(--spacing-md);
    margin-bottom: var(--spacing-sm);
    background-color: transparent;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: var(--font-size-base);
}

.tool-btn:hover {
    background-color: var(--bg-tertiary);
    border-color: var(--primary-color);
}

.tool-btn.active {
    background-color: var(--primary-color);
    color: var(--text-inverse);
    border-color: var(--primary-color);
}

.tool-icon {
    font-size: var(--font-size-lg);
    margin-right: var(--spacing-sm);
}

.tool-label {
    font-weight: 500;
}

/* Canvas container */
.canvas-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: var(--bg-tertiary);
    position: relative;
}

.canvas-wrapper {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: var(--spacing-lg);
    position: relative;
}

#main-canvas {
    background-color: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    cursor: crosshair;
}

.canvas-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
}

.canvas-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--spacing-md);
    padding: var(--spacing-md);
    background-color: var(--bg-secondary);
    border-top: 1px solid var(--border-color);
}

.zoom-level {
    font-weight: 600;
    min-width: 60px;
    text-align: center;
}

/* Properties panel */
.properties-panel {
    width: 250px;
    background-color: var(--bg-secondary);
    border-left: 1px solid var(--border-color);
    padding: var(--spacing-lg);
    overflow-y: auto;
}

.panel-section {
    margin-bottom: var(--spacing-xl);
}

.control-group {
    display: flex;
    flex-direction: column;
    margin-bottom: var(--spacing-md);
}

.control-group label {
    font-weight: 500;
    margin-bottom: var(--spacing-xs);
    color: var(--text-secondary);
}

.control-group input[type="range"] {
    width: 100%;
    height: var(--touch-target-min);
    margin-bottom: var(--spacing-xs);
}

.value-display {
    font-size: var(--font-size-sm);
    color: var(--text-secondary);
    text-align: right;
}

/* Color picker */
.color-picker-container {
    display: flex;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-md);
}

.color-picker-container input[type="color"] {
    width: 60px;
    height: var(--touch-target-min);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    cursor: pointer;
}

.color-presets {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-sm);
}

.color-preset {
    width: var(--touch-target-min);
    height: var(--touch-target-min);
    border: 2px solid var(--border-color);
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all 0.2s ease;
}

.color-preset:hover {
    border-color: var(--primary-color);
    transform: scale(1.05);
}

/* Layers */
.layers-container {
    margin-bottom: var(--spacing-md);
}

.layer-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-sm);
    margin-bottom: var(--spacing-xs);
    background-color: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    cursor: pointer;
}

.layer-item.active {
    border-color: var(--primary-color);
    background-color: var(--primary-color);
    color: var(--text-inverse);
}

.layer-name {
    font-weight: 500;
}

/* Action bar */
.action-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--spacing-md);
    padding: var(--spacing-md);
    background-color: var(--bg-secondary);
    border-top: 1px solid var(--border-color);
}

/* Buttons */
.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: var(--touch-target-min);
    padding: var(--spacing-sm) var(--spacing-md);
    font-size: var(--font-size-base);
    font-weight: 500;
    border: 1px solid transparent;
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all 0.2s ease;
    text-decoration: none;
    gap: var(--spacing-sm);
}

.btn-primary {
    background-color: var(--primary-color);
    color: var(--text-inverse);
    border-color: var(--primary-color);
}

.btn-primary:hover {
    background-color: var(--primary-hover);
    border-color: var(--primary-hover);
}

.btn-secondary {
    background-color: var(--bg-primary);
    color: var(--text-primary);
    border-color: var(--border-color);
}

.btn-secondary:hover {
    background-color: var(--bg-tertiary);
    border-color: var(--secondary-color);
}

.btn-icon {
    min-width: var(--touch-target-min);
    padding: var(--spacing-sm);
}

.btn-small {
    min-height: 36px;
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: var(--font-size-sm);
}

.btn-tiny {
    min-height: 28px;
    padding: var(--spacing-xs);
    font-size: var(--font-size-sm);
}

.btn-text {
    font-weight: 500;
}

.btn-icon {
    font-size: var(--font-size-lg);
}

/* Tooltips */
.tooltip {
    position: absolute;
    background-color: var(--text-primary);
    color: var(--text-inverse);
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--radius-md);
    font-size: var(--font-size-sm);
    font-weight: 500;
    white-space: nowrap;
    z-index: 1000;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease;
    box-shadow: var(--shadow-md);
}

.tooltip.show {
    opacity: 1;
}

/* Modals */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s ease;
}

.modal-overlay.show {
    opacity: 1;
    visibility: visible;
}

.modal {
    background-color: var(--bg-primary);
    border-radius: var(--radius-lg);
    padding: var(--spacing-xl);
    max-width: 500px;
    width: 90%;
    box-shadow: var(--shadow-lg);
}

.modal h2 {
    font-size: var(--font-size-xl);
    font-weight: 600;
    margin-bottom: var(--spacing-lg);
    color: var(--text-primary);
}

.modal-content {
    margin-bottom: var(--spacing-lg);
}

.export-options {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-lg);
}

.export-options label {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    font-weight: 500;
    cursor: pointer;
    padding: var(--spacing-sm);
    border-radius: var(--radius-md);
    transition: background-color 0.2s ease;
}

.export-options label:hover {
    background-color: var(--bg-tertiary);
}

.export-options input[type="radio"] {
    width: 20px;
    height: 20px;
}

.modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: var(--spacing-md);
}

/* Responsive design */
@media (max-width: 768px) {
    .main-content {
        flex-direction: column;
    }
    
    .toolbar {
        width: 100%;
        height: auto;
        order: 2;
        padding: var(--spacing-md);
    }
    
    .tool-section {
        margin-bottom: var(--spacing-md);
    }
    
    .properties-panel {
        width: 100%;
        order: 3;
        padding: var(--spacing-md);
    }
    
    .canvas-container {
        order: 1;
        min-height: 300px;
    }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
    :root {
        --border-color: #000000;
        --text-primary: #000000;
        --text-secondary: #000000;
        --bg-primary: #ffffff;
        --bg-secondary: #f0f0f0;
        --bg-tertiary: #e0e0e0;
    }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}

/* Print styles */
@media print {
    .toolbar,
    .properties-panel,
    .action-bar,
    .app-header {
        display: none;
    }
    
    .canvas-container {
        width: 100%;
        height: 100vh;
    }
}
