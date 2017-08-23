const expect = require('expect');
var {Users} = require('./users'); // using ES6 destructuring

describe('Users', () => {

  var users; // defining because accessible inside beforeEach and down below

  //beforeEach gets called for every test case within describe, we are going to initialize some data in the user object in before each call
  beforeEach(() => {
    users = new Users();
    users.users = [ //setting up  the users array in the user object.
      {
        id: '1',
        name: 'Mike',
        room: 'Node Course'
      },
      {
        id: '2',
        name: 'Jen',
        room: 'React Course'
      },
      {
        id: '3',
        name: 'Julie',
        room: 'Node Course'
      },
    ];
  });

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id : '123',
      name: 'Soumik',
      room: 'Mayfair'
    };

    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]); //users.users (first one is the users variable in thi page initiating the User object, the second is referring to Users class 'users' array)
  });

  it('should remove a user', () => {
    var userId = '2';
    var user = users.removeUser(userId);

    expect(user.id).toBe(userId); // expect returned user object's id to be the id assigned

    expect(users.users.length).toBe(2); // expect the users list has reduced to
  });

  it('should not remove a user', () => {
    var userId = '5'; ///provide an invalid id here
    var user = users.removeUser(userId);

    expect(user).toNotExist(); // expect returned user object's id to be the id assigned

    expect(users.users.length).toBe(3); // expect the users list remained same
  });

  it('should find a user', () => {
    var userId = '2';
    var user = users.getUser(userId);
    expect(user.id).toBe(userId);
  });

  it('should not find a user', () => {
    var userId = '5';
    var user = users.getUser(userId);
    expect(user).toNotExist();
  });

  it('should return names for node course', () => {
    var userList = users.getUserList('Node Course');

    expect(userList).toEqual(['Mike', 'Julie']);

  });

  it('should return names for react course', () => {
    var userList = users.getUserList('React Course');

    expect(userList).toEqual(['Jen']);

  });



});
