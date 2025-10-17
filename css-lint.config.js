module.exports = {
  rules: {
    // Ignorar reglas de Tailwind CSS
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
          'layer'
        ]
      }
    ],
    // Ignorar prefijos de vendor
    'property-no-vendor-prefix': null,
    'value-no-vendor-prefix': null,
    'selector-no-vendor-prefix': null,
    'media-feature-name-no-vendor-prefix': null,
    'at-rule-no-vendor-prefix': null,
    // Permitir !important para utilidades
    'declaration-no-important': null,
    // Permitir patrones de clase personalizados
    'selector-class-pattern': null,
    'custom-property-pattern': null,
    'keyframes-name-pattern': null,
    // Permitir diferentes casos de función
    'function-name-case': null,
    // Ignorar pseudo-clases y pseudo-elementos de Tailwind
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'local', 'hover', 'focus', 'active', 'disabled']
      }
    ],
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['global', 'local', 'before', 'after', 'first-line', 'first-letter']
      }
    ]
  },
  ignoreFiles: [
    'node_modules/**/*',
    'dist/**/*',
    'build/**/*',
    '.next/**/*',
    'public/**/*'
  ]
}
