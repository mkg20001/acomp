'use strict'

const core = require('./core')

module.exports = (inputModel, inputController) => {
  inputController({
    onChange: (val, pos, stack) => {
      return core(val, pos, stack, inputModel)
    }
  })
}
