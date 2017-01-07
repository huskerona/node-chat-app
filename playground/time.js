const moment = require('moment');

const format = 'MMM Do, YYYY @ h:mm a ZZ';

var date = moment();
console.log(date.format(format));

date.add(1, 'y');
console.log(date.format(format));

date.subtract(7, 'months');
console.log(date.format(format));