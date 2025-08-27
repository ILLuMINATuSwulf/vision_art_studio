# Contributing to VisionArt Studio

Thank you for your interest in contributing to VisionArt Studio! This document provides guidelines and best practices for contributing to this accessible creative web application.

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome 80+, Firefox 75+, Safari 13+, Edge 80+)
- Git installed on your system
- Basic knowledge of HTML5, CSS3, and JavaScript
- Understanding of web accessibility principles (WCAG 2.1 AA)

### Development Setup
```bash
# 1. Fork the repository on GitHub
# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/visionart-studio.git
cd visionart-studio

# 3. Add upstream remote
git remote add upstream https://github.com/ORIGINAL_OWNER/visionart-studio.git

# 4. Create a new branch for your feature
git checkout -b feature/your-feature-name

# 5. Start development server (optional)
npm start
# or simply open index.html in your browser
```

## 📁 Project Structure

```
visionart-studio/
├── index.html              # Main application entry point
├── styles.css              # Main stylesheet with accessibility features
├── manifest.json           # PWA manifest for mobile app functionality
├── package.json            # Project metadata and scripts
├── README.md               # Project documentation
├── CONTRIBUTING.md         # This file
├── LICENSE                 # MIT license
├── .gitignore             # Git ignore rules
├── js/                    # JavaScript modules
│   ├── app.js             # Main application controller
│   ├── canvas.js          # Canvas engine and drawing functionality
│   ├── tools.js           # Drawing tools and font generator
│   └── accessibility.js   # Accessibility features and WCAG compliance
├── assets/                # Static assets (created as needed)
│   ├── icons/             # App icons for PWA
│   ├── fonts/             # Custom fonts
│   └── templates/         # Art templates
├── docs/                  # Documentation (created as needed)
└── .github/               # GitHub specific files
    ├── workflows/         # GitHub Actions
    ├── ISSUE_TEMPLATE/    # Issue templates
    └── PULL_REQUEST_TEMPLATE.md
```

## 🎯 Development Guidelines

### Code Style
- **JavaScript**: Use ES6+ features, camelCase naming
- **CSS**: Use CSS custom properties (variables), kebab-case for classes
- **HTML**: Semantic markup, proper ARIA attributes
- **Indentation**: 4 spaces (no tabs)
- **Line endings**: LF (Unix style)

### Naming Conventions
- **Files**: kebab-case (e.g., `font-generator.js`)
- **Classes**: PascalCase (e.g., `FontGenerator`)
- **Functions**: camelCase (e.g., `generateText`)
- **CSS classes**: kebab-case with BEM methodology (e.g., `tool-btn--active`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_BRUSH_SIZE`)

### Accessibility Requirements
All contributions MUST maintain WCAG 2.1 AA compliance:
- **Keyboard navigation**: All features accessible via keyboard
- **Screen reader support**: Proper ARIA labels and live regions
- **Color contrast**: Minimum 4.5:1 ratio for normal text
- **Touch targets**: Minimum 44px for interactive elements
- **Focus indicators**: Visible focus states for all interactive elements

## 🔧 Types of Contributions

### 🐛 Bug Fixes
- Fix accessibility issues
- Resolve browser compatibility problems
- Correct drawing engine bugs
- Address performance issues

### ✨ New Features
- Additional drawing tools
- New font styles for the generator
- Enhanced accessibility features
- Mobile/touch improvements
- Performance optimizations

### 📚 Documentation
- Code comments and documentation
- User guides and tutorials
- Accessibility documentation
- API documentation

### 🎨 Design Improvements
- UI/UX enhancements (maintaining accessibility)
- Icon and asset improvements
- Color scheme refinements
- Mobile responsive improvements

## 📝 Pull Request Process

### Before Submitting
1. **Test thoroughly**: Ensure your changes work across browsers
2. **Accessibility check**: Verify WCAG compliance using screen readers
3. **Code review**: Self-review your code for quality and consistency
4. **Documentation**: Update relevant documentation

### PR Guidelines
1. **Branch naming**: `feature/description`, `bugfix/description`, `docs/description`
2. **Commit messages**: Use conventional commits format
   ```
   feat: add new brush stabilization feature
   fix: resolve canvas scaling issue on mobile
   docs: update accessibility guidelines
   ```
3. **PR title**: Clear, descriptive title
4. **Description**: Use the PR template, include screenshots if UI changes
5. **Link issues**: Reference related issues with `Fixes #123`

### Review Process
1. Automated checks must pass
2. Code review by maintainers
3. Accessibility review (if applicable)
4. Testing on multiple browsers/devices
5. Approval and merge

## 🧪 Testing Guidelines

### Manual Testing
- **Cross-browser**: Chrome, Firefox, Safari, Edge
- **Mobile devices**: iOS Safari, Chrome Mobile
- **Accessibility tools**: Screen readers (NVDA, JAWS, VoiceOver)
- **Keyboard navigation**: Tab through all interactive elements
- **Touch devices**: Test on tablets and phones

### Accessibility Testing Checklist
- [ ] All interactive elements have proper ARIA labels
- [ ] Keyboard navigation works for all features
- [ ] Screen reader announces all important actions
- [ ] Color contrast meets WCAG AA standards
- [ ] Focus indicators are visible and clear
- [ ] Touch targets are at least 44px
- [ ] High contrast mode works properly

## 🚫 What Not to Contribute

- Features that break accessibility
- Code that doesn't follow the established patterns
- Large dependencies that increase bundle size significantly
- Features that require server-side components (keep it client-side)
- Changes that break existing functionality without good reason

## 📋 Issue Guidelines

### Bug Reports
Use the bug report template and include:
- Browser and version
- Operating system
- Steps to reproduce
- Expected vs actual behavior
- Screenshots/recordings if applicable
- Accessibility impact (if any)

### Feature Requests
Use the feature request template and include:
- Clear description of the feature
- Use case and benefits
- Accessibility considerations
- Implementation suggestions (if any)

## 🏷️ Labels and Milestones

### Priority Labels
- `priority: critical` - Security or major accessibility issues
- `priority: high` - Important features or significant bugs
- `priority: medium` - Standard features and improvements
- `priority: low` - Nice-to-have features

### Type Labels
- `type: bug` - Something isn't working
- `type: feature` - New feature or enhancement
- `type: accessibility` - Accessibility improvements
- `type: documentation` - Documentation updates
- `type: performance` - Performance improvements

### Status Labels
- `status: needs-review` - Awaiting code review
- `status: needs-testing` - Needs manual testing
- `status: blocked` - Blocked by external dependency
- `status: ready-to-merge` - Approved and ready

## 🤝 Community Guidelines

### Be Inclusive
- Use inclusive language
- Respect different perspectives and experience levels
- Prioritize accessibility in all discussions
- Help newcomers get started

### Communication
- Be constructive in feedback
- Ask questions if something is unclear
- Share knowledge and resources
- Celebrate contributions from others

## 📞 Getting Help

- **Documentation**: Check README.md and docs/
- **Issues**: Search existing issues before creating new ones
- **Discussions**: Use GitHub Discussions for questions
- **Accessibility**: Prioritize accessibility-related questions

## 🎉 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- Special recognition for accessibility improvements

---

**Remember: Accessibility is not optional - it's essential for creating inclusive creative tools.**
