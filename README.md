# acomp

Autocompletion & input validation for dates & times

# How to use it

Browser textfield:

```js
const acomp = require('acomp')

acomp.create(acomp.inputModel.TimeSimple24and12(), acomp.inputController.TextFieldJquery('#time'))
```
