[{
  id: '/#29321kjasdfk',
  name: 'Andrew',
  room: 'The office fans'
}];

class Users {
  constructor (){
    this.users = [];
  }

  addUser(id, name, room){
    var user = {id, name, room}; // In ES6 variable and property name are same can use only the variable name

    this.users.push(user); //push the user to the array
    return user;
  }

  removeUser(id){
    //return user that was removed
    var user = this.getUser(id);
    if (user) {
      this.users = this.users.filter((user) => user.id !== id); //return all users whose id is not the ide in the removeUser argument and make a new list of users array list.
    }
    return user;
  }

  getUser(id){
    return this.users.filter((user) => user.id === id)[0]; //[0] is to return only one user incase multiple users found, if nothing found it will return undefined
  }

  getUserList(room){
    var users = this.users.filter((user) => user.room === room); // filter function includes or excludes items in an array based on criteria given. Like in this case it is returning the users whose room name matches the argument passed in the getUserList function.

    //map function (also gets calles with individual items), map gives us the value we want to use instead. like in this case we want to pick only the user's names from the list and thus returing only that.
    var namesArray = users.map((user) => user.name);

    return namesArray;
  }
}

//addUser(id, name, room)


//removeUser(id)

//getUser(id)

//getUserList(room)

//use ES6 classes for objects

class Person {

   constructor (name, age){
     this.name = name; //refer this for the current initiated object
     this.age = age;
   }

   getUserDescription(){
     return `${this.name} is ${this.age} year(s) old`;
   }

}

var me = new Person('Soumik', 37);
var description = me.getUserDescription();
console.log('this.name', me.name);


module.exports = {Users};
