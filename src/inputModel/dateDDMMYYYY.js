'use strict'

module.exports = ({currentCentury}) => (val, pos, lastKey, key) => { // eslint-disable-line complexity
  /* Time */

  // rule of thumb: push to stack if the field is after the current

  switch (pos) {
    // 1
    case 0: { // second digit of day of a month. no month has more than 31 days
      if (key.match(/^[0-3]$/)) {
        return {curChar: key}
      } else if (key.match(/^[4-9]$/)) {
        return {curChar: '0', pushStack: key}
      } else {
        return false
      }
    }
    // 12
    case 1: { // first digit of day of month. any number
      if (key.match(/^[0-9]$/)) {
        return {curChar: key, pushStack: '.'}
      } else if (key === '.') {
        return {prevChar: '0', curChar: lastKey, pushStack: key}
      } else {
        return false
      }
    }
    // 12.
    case 2: { // a dot
      return key === '.' ? {curChar: key} : false
    }
    // 12.0
    case 3: { // second digit of month. no year has more than 12 months
      if (key.match(/^[0-1]$/)) {
        return {curChar: key}
      } else if (key.match(/^[2-9]$/)) {
        return {curChar: '0', pushStack: key}
      } else {
        return false
      }
    }
    // 12.05
    case 4: { // first digit of month. any number
      if (key.match(/^[0-9]$/)) {
        return {curChar: key, pushStack: '.'} // if currentCentury is enabled, then autofill that
      } else if (key === '.') {
        return {prevChar: '0', curChar: lastKey, pushStack: key}
      } else {
        return false
      }
    }
    // 12.05.
    case 5: {
      return key === '.' ? {curChar: key, pushStack: currentCentury ? '20' : ''} : false
    }
    case 6: { // assume 4 digit year, maximum 2999
      if (key.match(/^[0-2]$/)) {
        return {curChar: key}
      } else if (key.match(/^[3-9]$/)) {
        return {curChar: '0', pushStack: key}
      } else {
        return false
      }
    }
    case 7:
    case 8:
    case 9: { // next 3 digits of year. any number.
      if (key.match(/^[0-9]$/)) {
        return {curChar: key}
      } else {
        return false
      }
    }
    default: { // out of bounds
      return false
    }
  }
}
