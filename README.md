# acomp

Autocompletion & input validation for dates & times

# How to use it

Browser textfield:

```js
const acomp = require('acomp')

acomp.create(acomp.inputModel.TimeSimple12And24(), acomp.inputController.TextFieldJquery('#time'))
```

# Models

TimeSimple12And24: Simple time model that accepts `HH:MM` aswell as `HH:MM [am/pm]`

DateDDMMYYYY: Date model that accepts `DD.MM.YYYY`
