
# VisionArt Studio

**Accessible, All-in-One Creative Web Application**

VisionArt Studio combines the painting power of Apple Procreate, simplified image editing capabilities of GIMP, and a comprehensive font generator with Western graphic design styles. Built with accessibility as a core feature for clinically sight-impaired users.

## 🚀 Quick Start

1. **One-Click Setup**: Simply open `index.html` in any modern web browser
2. **No Installation Required**: Works directly in your browser
3. **Mobile Friendly**: Responsive design works on tablets and phones

```bash
# Clone or download the project
# Navigate to the project folder
# Open index.html in your browser
```

## ✨ Core Features

### 🎨 Drawing & Painting Engine
- **Pressure-sensitive brush support** (stylus + finger)
- **Layer system** with blend modes (multiply, screen, overlay, etc.)
- **Customizable brushes** with texture support
- **Undo/redo history** (50 steps)
- **Brush stabilization** for smoother strokes

### 🖼️ Image Editing Tools
- **Basic editing**: Crop, resize, rotate, flip
- **Color correction**: Brightness, contrast, saturation
- **Filters & effects**: Blur, sharpen, vignette, sepia, grayscale
- **Format support**: PNG, JPG, WEBP, SVG import/export

### 🔤 Font Generator
Complete library of Western graphic design fonts:
- **Video Game Culture**: Pixel, retro arcade, cyberpunk
- **Graffiti Styles**: Urban, street art, bubble letters
- **Calligraphy**: Script, gothic, brush lettering
- **Text Effects**: Outline, shadow, gradient fill, neon glow

### 📱 Templates & Backgrounds
- Pre-made templates for posters, social media, game screens
- Customizable background patterns & gradients
- Export presets for different platforms

## ♿ Accessibility Features

### WCAG 2.1 AA Compliant
- **Large clickable buttons** (minimum 44px touch targets)
- **High-contrast icons** with clear visual association
- **Pop-up hints** on hover/long-press for every tool
- **Adjustable font sizes** for all UI elements
- **Colorblind-friendly palette** (no red/green-only indicators)

### Screen Reader Support
- **Full keyboard navigation** with arrow keys
- **Screen reader announcements** for all actions
- **Alternative text** for all interface elements
- **Live regions** for status updates

### Keyboard Shortcuts
- **B**: Brush tool
- **P**: Pencil tool  
- **E**: Eraser tool
- **T**: Text tool
- **Ctrl+Z**: Undo
- **Ctrl+Y**: Redo
- **Ctrl+S**: Save project
- **F1**: Show help

### Accessibility Panel
- High contrast mode toggle
- Large text option
- UI scaling (100%-200%)
- Screen reader mode
- Reduced motion support

## 🛠️ Technical Features

### Browser Compatibility
- **Modern browsers**: Chrome 80+, Firefox 75+, Safari 13+, Edge 80+
- **Mobile support**: iOS Safari, Chrome Mobile, Samsung Internet
- **No plugins required**: Pure HTML5/CSS3/JavaScript

### Performance Optimized
- **Mid-range device support** (4GB RAM minimum)
- **High DPI display support** (Retina, 4K)
- **Efficient canvas rendering** with hardware acceleration
- **Memory management** for large artworks

### File Handling
- **Import formats**: PNG, JPG, SVG, PSD (basic)
- **Export formats**: PNG (transparent), JPG, WEBP, SVG, PDF
- **Project files**: JSON format for saving/loading
- **Adjustable resolution** and DPI for print/web

## 🎯 Usage Examples

### For Digital Artists
```
1. Select brush tool (B)
2. Adjust size and opacity in properties panel
3. Choose colors from palette or color picker
4. Start drawing with mouse/stylus/finger
5. Use layers for complex compositions
6. Export as high-resolution PNG
```

### For Graphic Designers
```
1. Import background image or use template
2. Add text using Font Generator
3. Apply effects (outline, shadow, gradient)
4. Use shape tools for geometric elements
5. Export in multiple formats for different uses
```

### For Accessibility Users
```
1. Enable high contrast mode in accessibility panel
2. Use keyboard navigation (Tab to move, Space to activate)
3. Listen for screen reader announcements
4. Use arrow keys to position cursor on canvas
5. Press F1 for complete keyboard shortcut list
```

## 🔧 Customization

### Adding Custom Brushes
```javascript
// Add to brush library
const customBrush = {
    name: 'Custom Texture',
    type: 'textured',
    texture: textureImage,
    size: 20,
    opacity: 0.8
};
```

### Creating New Font Styles
```javascript
// Extend font generator
fontGenerator.styles['custom-style'] = {
    name: 'Custom Style',
    fontFamily: 'Your Font, fallback',
    effects: ['custom-effect']
};
```

## 🌐 Deployment

### Local Development
```bash
# Serve with any HTTP server
python -m http.server 8000
# or
npx serve .
```

### Web Hosting
- Upload all files to web server
- Ensure MIME types are configured for .json, .svg files
- Enable HTTPS for full functionality (camera access, etc.)

### Mobile App (PWA)
- Add to home screen on mobile devices
- Works offline after first load
- Native-like experience

## 🔮 Future Enhancements

### AI Integration (Planned)
- Text-to-image generation via Stable Diffusion API
- Style transfer for existing artworks
- Auto-completion suggestions
- Smart color palette generation

### Advanced Features (Roadmap)
- Vector drawing tools
- Animation timeline
- Collaborative editing
- Cloud sync
- Plugin system

## 🐛 Troubleshooting

### Common Issues

**Canvas not responding to touch:**
- Ensure browser supports touch events
- Try refreshing the page
- Check if accessibility mode is interfering

**Performance issues:**
- Reduce canvas size for older devices
- Clear browser cache
- Close other browser tabs

**Accessibility features not working:**
- Enable JavaScript in browser
- Check browser compatibility
- Try keyboard navigation (Tab key)

### Browser-Specific Notes

**Safari:**
- Some filters may render differently
- Touch pressure may not be available on older devices

**Firefox:**
- Canvas performance may be slower on very large images
- Some CSS filters not supported in older versions

## 📄 License

MIT License - Feel free to use, modify, and distribute.

## 🤝 Contributing

Contributions welcome! Focus areas:
- Accessibility improvements
- Performance optimizations
- New brush types
- Additional font styles
- Mobile experience enhancements

## 📞 Support

For accessibility-related issues or feature requests, please prioritize:
1. Screen reader compatibility
2. Keyboard navigation improvements  
3. High contrast mode enhancements
4. Touch target size optimization

---

**Built with accessibility in mind - Empowering all artists to create.**
