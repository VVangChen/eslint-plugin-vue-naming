/**
 * @author Champion Wang
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/vue/vis-same-name')
const RuleTester = require('eslint').RuleTester
const parserOptions = {
  ecmaVersion: 2018,
  sourceType: 'module'
}

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester()
ruleTester.run('vis-same-name', rule, {
  valid: [
    {
      filename: 'TestComponent.vue',
      code: `
        export default {
          name: 'test-component',
        }
      `,
      parserOptions
    },
    {
      filename: '/test-component/index.vue',
      code: `
        export default {
          name: 'test-component',
        }
      `,
      parserOptions
    },
    {
      filename: '/test-component/App.vue',
      code: `
        export default {
          name: 'test-component',
        }
      `,
      parserOptions
    },
    {
      filename: '/test-component/App.vue',
      code: `
        export default {
          name: 'app-test-component',
        }
      `,
      options: [{ app: 'app-[dirname]' }],
      parserOptions
    },
    {
      filename: '/components/test-component.vue',
      code: `
        export default {
          name: 'component-components-test-component',
        }
      `,
      options: [{ component: 'component-[dirname]-[filename]' }],
      parserOptions
    }
  ],
  invalid: [
    {
      filename: 'TestComponent.vue',
      code: `
        export default {
          name: 'test',
        }
      `,
      parserOptions,
      errors: [{
        line: 3,
        message: 'require option name equal to test-component.'
      }],
      output: `
        export default {
          name: 'test-component',
        }
      `
    }
  ]
})
