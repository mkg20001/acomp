'use strict'

const debug = require('debug')
const log = debug('acomp:inputController:jquery')

const $ = window.jQuery = require('jquery')
require('@accursoft/jquery-caret')

module.exports = (id) => ({onChange}) => {
  $(id).on('keydown', (e) => {
    let val = $(id).val().split('')

    const pos = $(id).caret()

    log(e)

    if (pos && e.originalEvent.code === 'Backspace') {
      e.preventDefault()
      if (typeof val[pos] === 'string') {
        val[pos - 1] = '░' // remove current value
      } else {
        delete val[pos - 1]
      }
      $(id).val(val.join('')) // set value
      $(id).caret(pos - 1) // move caret one back
    }

    if (typeof val[pos + 1] === 'string' && e.originalEvent.code === 'Delete') { // if next thing is string and user presses delete, delete next char
      e.preventDefault()
      if (typeof val[pos + 1] === 'string') {
        val[pos] = '░' // remove current value
      } else {
        delete val[pos]
      }
      $(id).val(val.join('')) // set value
      $(id).caret(pos + 1) // move caret one back
    }
  })

  $(id).on('keypress', (e) => {
    let val = $(id).val().split('')
    let pos = $(id).caret()

    log(e)
    e.preventDefault()

    if (e.which) {
      const res = onChange(val, pos, [String.fromCharCode(e.originalEvent.charCode)])

      $(id).val(res.val.join(''))
      $(id).caret(res.pos)
    }
  })
}
