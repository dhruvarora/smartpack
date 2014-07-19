var Firebase = require('firebase');
var smartpackDB = new Firebase('https://smartpack.firebaseio.com/masterpack');
var masterpack = {
  '7a7e694f' : 'Laptop',
  '9a84654f' : 'Charger',
  'da0b664f' : 'Notes',
  '3a36694f' : 'Headphones',
  '1a1a674f' : 'Textbook',
  '7a4a654f' : 'Lunch',
  '7a4a651f' : 'Umbrella',
  '1b1b674f' : 'Kindle',
  '2b1b674f' : 'External Hard Drive'
};
smartpackDB.set(masterpack);