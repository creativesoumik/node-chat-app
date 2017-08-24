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

  findUser(name, room){
    return this.users.filter((user) => user.name === name && user.room === room)[0]; //[0] is to return only one user incase multiple users found, if nothing found it will return undefined
  }

  getUserList(room){
    var users = this.users.filter((user) => user.room === room); // filter function includes or excludes items in an array based on criteria given. Like in this case it is returning the users whose room name matches the argument passed in the getUserList function.

    //map function (also gets calles with individual items), map gives us the value we want to use instead. like in this case we want to pick only the user's names from the list and thus returing only that.
    var namesArray = users.map((user) => user.name);

    return namesArray;
  }

  getRoomList(){   

    //map function (also gets calles with individual items), map gives us the value we want to use instead. like in this case we want to pick only the user's names from the list and thus returing only that.
    var roomsArray = this.users.map((user) => user.room);

    return roomsArray;
  }
}

//addUser(id, name, room)


//removeUser(id)

//getUser(id)

//getUserList(room)

//use ES6 classes for objects

class Person {

   constructor (){
     this.persons = [];
   }

   addPerson(name){
     var p = {name}; // In ES6 variable and property name are same can use only the variable name
     //console.log(name);
     this.persons.push(p); //push the user to the array
     //console.log(this.persons);
     return p;
   }

   getPersonList(){

     var namesArray = this.persons.map((person) => person.name);
     //console.log(this.persons);
     return namesArray;
   }

}

var me = new Person();
me.addPerson('Soumik');

var son = new Person();
son.addPerson('Aryan');

var wife = new Person();
wife.addPerson('Piu');

var listOfPersons = wife.getPersonList();

//console.log('Persons', listOfPersons);

module.exports = {Users};
