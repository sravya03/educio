var user = {
	firstName: 'Janet',
	lastName: 'Wilson',
	email: 'jwilson@gmail.com',
	password: 'tester123'
};

var users = {};
users[user.email] = user;

localStorage.setItem('users', JSON.stringify(users));
localStorage.setItem('extraClasses', JSON.stringify([]));