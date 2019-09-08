'use strict'

module.exports = {
  create: require('./create'),
  inputController: {
    TextFieldJquery: require('./inputController/textFieldJquery')
  },
  inputModel: {
    TimeSimple12And24: require('./inputModel/timeSimple12And24')
  }
}
