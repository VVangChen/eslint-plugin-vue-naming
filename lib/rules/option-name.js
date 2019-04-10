/**
 * @fileoverview option name rule
 * @author VVangChen
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const utils = require('../utils')
const casing = require('../utils/casing')
const path = require('path')

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: 'suggestion',
    fixable: 'code',
    schema: [{
      type: 'object',
      properties: {
        component: {
          type: 'string'
        },
        index: {
          type: 'string'
        },
        app: {
          type: 'string'
        }
      },
      additionalProperties: false
    }]
  },

  create (context) {
    const defaultConfig = {
      component: '[filename]',
      index: '[dirname]',
      app: '[dirname]'
    }
    const config = Object.assign({}, defaultConfig, context.options[0] || {})

    return utils.executeOnVueComponent(context, (obj) => {
      const node = obj.properties
        .find(item => (
          item.type === 'Property' &&
          item.key.name === 'name' &&
          item.value.type === 'Literal'
        ))
      const nameValue = node.value.value

      let targetName = ''
      let fileName = ''
      let dirName = ''

      const filePath = context.getFilename()
      fileName = path.basename(filePath).split('.')[0] || ''
      if (fileName) fileName = casing.getConverter('kebab-case')(fileName)
      const pathArr = filePath.split('/')
      // todo: 如果是根目录怎么处理？
      dirName = pathArr[pathArr.length - 2] || ''
      if (dirName) dirName = casing.getConverter('kebab-case')(dirName)

      // 如果文件名为 'index.*'
      if (fileName === 'index') {
        targetName = config.index
          .replace('[dirname]', dirName)
          .replace('[filename]', fileName)
      } else if (fileName === 'app') {
        // 如果文件名为 'app.*'
        targetName = config.app
          .replace('[dirname]', dirName)
          .replace('[filename]', fileName)
      } else {
        targetName = config.component
          .replace('[dirname]', dirName)
          .replace('[filename]', fileName)
      }

      if (!node) return

      if (nameValue !== targetName) {
        context.report({
          node: node.value,
          message: 'require option name equal to {{targetName}}.',
          data: {
            targetName
          },
          fix (fixer) {
            return fixer.replaceTextRange([node.value.start + 1, node.value.end - 1], targetName)
          }
        })
      }
    })
  }
}
