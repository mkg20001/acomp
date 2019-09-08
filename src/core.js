'use strict'

const debug = require('debug')
const log = debug('acomp:core')

function core (val, pos, stack, model) {
  if (!Array.isArray(val)) {
    val = val.split('')
  }

  val = val.slice(0)

  if (!Array.isArray(stack)) {
    stack = stack.split('')
  }

  stack = stack.slice(0)

  while (stack.length) {
    log(stack)
    let key = stack.shift()

    const res = model(val, pos, val[pos - 1], key)
    log(res, {val, pos, lastKey: val[pos - 1], key})

    if (!res) {
      if (stack.length) {
        throw new Error('Leftover stack: ' + stack.join(' - '))
      }
    } else {
      const {prevChar, curChar, pushStack} = res

      if (prevChar) {
          if (!pos) { // eslint-disable-line
          pos++
          val.unshift(prevChar)
        } else {
          val[pos - 1] = prevChar
        }
      }

      if (curChar) {
        val[pos] = curChar
      }

      if (stack.length && pushStack) {
        throw new Error('Cannot push stack with leftover stack')
      }

      if (pushStack) {
        stack = pushStack.split('')
      }

      pos++
    }
  }

  return {val, pos}
}

module.exports = core
