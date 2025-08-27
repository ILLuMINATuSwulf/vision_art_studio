// VisionArt Studio - Advanced Canvas Engine
class CanvasEngine {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.pressure = 1;
        this.tilt = { x: 0, y: 0 };
        this.supportsPressure = false;
        this.brushStabilizer = new BrushStabilizer();
        
        this.initPressureSupport();
    }

    initPressureSupport() {
        // Check for pointer events and pressure support
        if ('PointerEvent' in window) {
            this.canvas.addEventListener('pointerdown', this.handlePointer.bind(this));
            this.canvas.addEventListener('pointermove', this.handlePointer.bind(this));
            this.canvas.addEventListener('pointerup', this.handlePointer.bind(this));
            this.supportsPressure = true;
        }
    }

    handlePointer(e) {
        this.pressure = e.pressure || 1;
        this.tilt.x = e.tiltX || 0;
        this.tilt.y = e.tiltY || 0;
        
        // Dispatch corresponding mouse events for compatibility
        const mouseEvent = new MouseEvent(
            e.type.replace('pointer', 'mouse'),
            {
                clientX: e.clientX,
                clientY: e.clientY,
                button: e.button,
                buttons: e.buttons
            }
        );
        
        // Add pressure data to the event
        mouseEvent.pressure = this.pressure;
        mouseEvent.tilt = this.tilt;
        
        this.canvas.dispatchEvent(mouseEvent);
    }

    drawBrushStroke(x1, y1, x2, y2, brush) {
        const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        const steps = Math.max(1, Math.floor(distance / 2));
        
        for (let i = 0; i <= steps; i++) {
            const t = i / steps;
            const x = x1 + (x2 - x1) * t;
            const y = y1 + (y2 - y1) * t;
            
            // Apply pressure sensitivity
            const pressureSize = brush.size * this.pressure;
            const pressureOpacity = brush.opacity * this.pressure;
            
            this.ctx.save();
            this.ctx.globalAlpha = pressureOpacity;
            
            // Apply brush texture if available
            if (brush.texture) {
                this.applyBrushTexture(x, y, pressureSize, brush);
            } else {
                this.drawBrushDab(x, y, pressureSize, brush);
            }
            
            this.ctx.restore();
        }
    }

    drawBrushDab(x, y, size, brush) {
        const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, size / 2);
        
        switch (brush.type) {
            case 'soft':
                gradient.addColorStop(0, brush.color);
                gradient.addColorStop(0.7, brush.color);
                gradient.addColorStop(1, 'transparent');
                break;
            case 'hard':
                gradient.addColorStop(0, brush.color);
                gradient.addColorStop(0.9, brush.color);
                gradient.addColorStop(1, 'transparent');
                break;
            case 'textured':
                // Add noise for texture
                this.addBrushNoise(x, y, size, brush);
                return;
        }
        
        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(x, y, size / 2, 0, Math.PI * 2);
        this.ctx.fill();
    }

    applyBrushTexture(x, y, size, brush) {
        // Create a temporary canvas for texture
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = size;
        tempCanvas.height = size;
        const tempCtx = tempCanvas.getContext('2d');
        
        // Draw texture pattern
        tempCtx.drawImage(brush.texture, 0, 0, size, size);
        
        // Apply color overlay
        tempCtx.globalCompositeOperation = 'source-atop';
        tempCtx.fillStyle = brush.color;
        tempCtx.fillRect(0, 0, size, size);
        
        // Draw to main canvas
        this.ctx.drawImage(tempCanvas, x - size / 2, y - size / 2);
    }

    addBrushNoise(x, y, size, brush) {
        const imageData = this.ctx.getImageData(x - size / 2, y - size / 2, size, size);
        const data = imageData.data;
        
        // Parse color
        const color = this.hexToRgb(brush.color);
        
        for (let i = 0; i < data.length; i += 4) {
            const noise = Math.random() * 0.3 + 0.7; // Random noise factor
            const distance = Math.sqrt(
                ((i / 4) % size - size / 2) ** 2 + 
                (Math.floor((i / 4) / size) - size / 2) ** 2
            );
            
            if (distance < size / 2) {
                const alpha = Math.max(0, 1 - (distance / (size / 2))) * noise;
                data[i] = color.r;     // R
                data[i + 1] = color.g; // G
                data[i + 2] = color.b; // B
                data[i + 3] = alpha * 255; // A
            }
        }
        
        this.ctx.putImageData(imageData, x - size / 2, y - size / 2);
    }

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
}

// Brush Stabilizer for smoother strokes
class BrushStabilizer {
    constructor() {
        this.points = [];
        this.maxPoints = 5;
        this.smoothing = 0.5;
    }

    addPoint(x, y) {
        this.points.push({ x, y });
        if (this.points.length > this.maxPoints) {
            this.points.shift();
        }
    }

    getSmoothedPoint() {
        if (this.points.length === 0) return null;
        if (this.points.length === 1) return this.points[0];
        
        let totalX = 0;
        let totalY = 0;
        let totalWeight = 0;
        
        for (let i = 0; i < this.points.length; i++) {
            const weight = (i + 1) / this.points.length; // More recent points have higher weight
            totalX += this.points[i].x * weight;
            totalY += this.points[i].y * weight;
            totalWeight += weight;
        }
        
        return {
            x: totalX / totalWeight,
            y: totalY / totalWeight
        };
    }

    clear() {
        this.points = [];
    }
}

// Blend Modes for layers
class BlendModes {
    static apply(ctx, mode, sourceCanvas, targetCanvas) {
        const originalCompositeOperation = ctx.globalCompositeOperation;
        
        switch (mode) {
            case 'normal':
                ctx.globalCompositeOperation = 'source-over';
                break;
            case 'multiply':
                ctx.globalCompositeOperation = 'multiply';
                break;
            case 'screen':
                ctx.globalCompositeOperation = 'screen';
                break;
            case 'overlay':
                ctx.globalCompositeOperation = 'overlay';
                break;
            case 'soft-light':
                ctx.globalCompositeOperation = 'soft-light';
                break;
            case 'hard-light':
                ctx.globalCompositeOperation = 'hard-light';
                break;
            case 'color-dodge':
                ctx.globalCompositeOperation = 'color-dodge';
                break;
            case 'color-burn':
                ctx.globalCompositeOperation = 'color-burn';
                break;
            case 'darken':
                ctx.globalCompositeOperation = 'darken';
                break;
            case 'lighten':
                ctx.globalCompositeOperation = 'lighten';
                break;
            case 'difference':
                ctx.globalCompositeOperation = 'difference';
                break;
            case 'exclusion':
                ctx.globalCompositeOperation = 'exclusion';
                break;
            default:
                ctx.globalCompositeOperation = 'source-over';
        }
        
        ctx.drawImage(sourceCanvas, 0, 0);
        ctx.globalCompositeOperation = originalCompositeOperation;
    }
}

// Image filters
class ImageFilters {
    static applyFilter(canvas, filterType, intensity = 1) {
        const ctx = canvas.getContext('2d');
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        switch (filterType) {
            case 'blur':
                return this.blur(imageData, intensity);
            case 'sharpen':
                return this.sharpen(imageData, intensity);
            case 'brightness':
                return this.brightness(imageData, intensity);
            case 'contrast':
                return this.contrast(imageData, intensity);
            case 'saturation':
                return this.saturation(imageData, intensity);
            case 'grayscale':
                return this.grayscale(imageData);
            case 'sepia':
                return this.sepia(imageData);
            case 'invert':
                return this.invert(imageData);
            case 'vignette':
                return this.vignette(imageData, canvas.width, canvas.height, intensity);
            default:
                return imageData;
        }
    }

    static blur(imageData, radius) {
        // Simple box blur implementation
        const data = imageData.data;
        const width = imageData.width;
        const height = imageData.height;
        const output = new Uint8ClampedArray(data);
        
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let r = 0, g = 0, b = 0, a = 0, count = 0;
                
                for (let dy = -radius; dy <= radius; dy++) {
                    for (let dx = -radius; dx <= radius; dx++) {
                        const nx = x + dx;
                        const ny = y + dy;
                        
                        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                            const idx = (ny * width + nx) * 4;
                            r += data[idx];
                            g += data[idx + 1];
                            b += data[idx + 2];
                            a += data[idx + 3];
                            count++;
                        }
                    }
                }
                
                const idx = (y * width + x) * 4;
                output[idx] = r / count;
                output[idx + 1] = g / count;
                output[idx + 2] = b / count;
                output[idx + 3] = a / count;
            }
        }
        
        return new ImageData(output, width, height);
    }

    static brightness(imageData, factor) {
        const data = imageData.data;
        const adjustment = (factor - 1) * 255;
        
        for (let i = 0; i < data.length; i += 4) {
            data[i] = Math.max(0, Math.min(255, data[i] + adjustment));
            data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + adjustment));
            data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + adjustment));
        }
        
        return imageData;
    }

    static contrast(imageData, factor) {
        const data = imageData.data;
        const contrast = (factor - 1) * 255;
        const contrastFactor = (259 * (contrast + 255)) / (255 * (259 - contrast));
        
        for (let i = 0; i < data.length; i += 4) {
            data[i] = Math.max(0, Math.min(255, contrastFactor * (data[i] - 128) + 128));
            data[i + 1] = Math.max(0, Math.min(255, contrastFactor * (data[i + 1] - 128) + 128));
            data[i + 2] = Math.max(0, Math.min(255, contrastFactor * (data[i + 2] - 128) + 128));
        }
        
        return imageData;
    }

    static saturation(imageData, factor) {
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            
            const gray = 0.299 * r + 0.587 * g + 0.114 * b;
            
            data[i] = Math.max(0, Math.min(255, gray + factor * (r - gray)));
            data[i + 1] = Math.max(0, Math.min(255, gray + factor * (g - gray)));
            data[i + 2] = Math.max(0, Math.min(255, gray + factor * (b - gray)));
        }
        
        return imageData;
    }

    static grayscale(imageData) {
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
            data[i] = gray;
            data[i + 1] = gray;
            data[i + 2] = gray;
        }
        
        return imageData;
    }

    static sepia(imageData) {
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            
            data[i] = Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189));
            data[i + 1] = Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168));
            data[i + 2] = Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131));
        }
        
        return imageData;
    }

    static invert(imageData) {
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            data[i] = 255 - data[i];
            data[i + 1] = 255 - data[i + 1];
            data[i + 2] = 255 - data[i + 2];
        }
        
        return imageData;
    }

    static vignette(imageData, width, height, intensity) {
        const data = imageData.data;
        const centerX = width / 2;
        const centerY = height / 2;
        const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
        
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
                const vignette = 1 - (distance / maxDistance) * intensity;
                const factor = Math.max(0, Math.min(1, vignette));
                
                const idx = (y * width + x) * 4;
                data[idx] *= factor;
                data[idx + 1] *= factor;
                data[idx + 2] *= factor;
            }
        }
        
        return imageData;
    }
}
