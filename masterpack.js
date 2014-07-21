var Firebase = require('firebase');
var smartpackDB = new Firebase('https://smartpack.firebaseio.com/masterpack');
var masterpack = {
  '7a7e694f' : ['Laptop', false],
  '9a84654f' : ['Charger', false],
  'da0b664f' : ['Notes', false],
  '3a36694f' : ['Headphones', false],
  '1a1a674f' : ['Textbook', false],
  '7a4a654f' : ['Lunch', false],
  '7a4a651f' : ['Umbrella', false],
  '1b1b674f' : ['Kindle', false],
  '2b1b674f' : ['External Hard Drive', false]
};
smartpackDB.set(masterpack);