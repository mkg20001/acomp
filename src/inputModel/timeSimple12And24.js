'use strict'

module.exports = () => (val, pos, lastKey, key) => { // eslint-disable-line complexity
  /* Time */

  // rule of thumb: push to stack if the field is after the current

  switch (pos) {
    // 1
    case 0: { // first key must be a number
      if (key.match(/^[0-9]$/)) {
        return {curChar: key}
      } else {
        return false
      }
    }
    // 12
    case 1: { // second key must be (together with the first) a number smaller than 23
      if (key.match(/^[0-9]$/)) {
        let total = parseInt(lastKey + key, 10)

        if (total === 24) {
          return {allow: true, prevChar: '0', curChar: '0', nextChar: ':'}
        } else if (total > 24) {
          return {prevChar: '0', curChar: lastKey, pushStack: ':' + key}
        } else {
          return {curChar: key, pushStack: ':'}
        }
      } else if (key === ':' || key === ' ') {
        return {prevChar: '0', curChar: lastKey, pushStack: ':'}
      } else {
        return false
      }
    }
    // 12:
    case 2: {
      return key === ':' ? {curChar: key} : false
    }
    // 12:3
    case 3: { // this can either be a 0-5 for 59 for ex, or 6-9 for 09
      if (key.match(/^[0-5]$/)) {
        return {curChar: key}
      } else if (key.match(/^[6-9]$/)) {
        return {curChar: '0', pushStack: key}
      } else {
        return false
      }
    }
    // 12:33
    case 4: { // this can be any number
      if (key.match(/^[0-9]$/)) {
        return {curChar: key, pushStack: ' '}
      } else {
        return false
      }
    }
    case 5: { // this can be a space
      return key === ' ' ? {curChar: key, pushStack: parseInt(val.slice(0, 2).join(''), 10) > 12 ? 'p' : ''} : false
    }
    case 6: { // this can be an a or p
      const hour = parseInt(val.slice(0, 2).join(''), 10)
      key = key.toLowerCase()
      if ((hour <= 12 && key.match(/^[ap]$/)) || (hour > 12 && key === 'p')) {
        return {curChar: key, pushStack: 'm'}
      } else {
        return false
      }
    }
    case 7: { // this can be an m
      return key.toLowerCase() === 'm' ? {curChar: 'm'} : false
    }
    default: { // out of bounds
      return false
    }
  }
}
