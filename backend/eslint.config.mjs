// @ts-check

import eslint from '@eslint/js'
import { off } from 'process'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    rules: {
      'quotes': ['error', 'single'],
      'no-useless-escape': ['warn'],
      'no-inner-declarations': 'off',
		  'indent': ['warn', 2 ],
		  'global-require': 'warn',
		  'semi': ['warn', 'never'],
		  'semi-spacing': ['error'],
		  'max-len': [
			  'error',
        {
          'code': 142,
          'tabWidth': 2,
          'ignoreUrls': true,
          'ignorePattern': '^import .*',
          'ignoreComments': true,
          'ignoreTrailingComments': true
        }
      ],
		  'max-depth': ['warn', 3],
		  'no-unused-vars': [
			  'error',
        {
          'vars': 'all',
          'args': 'none',
          'ignoreRestSiblings': true
        }
      ],
		  'no-console': 'off',
		  'no-prototype-builtins': ['warn'],
		  'no-mixed-spaces-and-tabs': ['warn'],
		  'no-extra-semi': ['warn'],
		  'no-trailing-spaces': 'error',
		  'consistent-return': 'warn',
		  'no-undef': 'warn',
		  'prefer-const': 'warn',
		  'no-unused-expressions': ['error', { 'allowTaggedTemplates': true }],
		  'import/prefer-default-export': 'off',
		  'handle-callback-err': 'error',
		  'no-useless-catch': 'off',
		  'array-callback-return': 'off',
		  'no-empty-function': ['error', { 'allow': ['constructors'] }],
		  'require-await': 'warn'
    }
  },
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
)