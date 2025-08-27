module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'eslint:recommended'
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    rules: {
        // Code Quality
        'no-unused-vars': 'warn',
        'no-console': 'warn',
        'no-debugger': 'error',
        'no-alert': 'warn',
        
        // Style
        'indent': ['error', 4],
        'linebreak-style': ['error', 'unix'],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        
        // Best Practices
        'eqeqeq': 'error',
        'no-eval': 'error',
        'no-implied-eval': 'error',
        'no-new-func': 'error',
        'no-script-url': 'error',
        
        // Accessibility
        'no-access-key': 'error'
    },
    globals: {
        // Canvas API
        'CanvasRenderingContext2D': 'readonly',
        'ImageData': 'readonly',
        'Path2D': 'readonly',
        
        // File API
        'FileReader': 'readonly',
        'Blob': 'readonly',
        'URL': 'readonly',
        
        // Custom globals
        'VisionArtStudio': 'readonly',
        'CanvasEngine': 'readonly',
        'DrawingTools': 'readonly',
        'FontGenerator': 'readonly',
        'AccessibilityManager': 'readonly'
    }
};
