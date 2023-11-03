var login_email = document.getElementById('email');
var login_password = document.getElementById('password');
var login_form = document.getElementById('login-form');
var email_error = document.querySelector('#email-error');
var password_error = document.querySelector('#password-error');
login_form.addEventListener('submit', function (e) {
    e.preventDefault();
    var email = login_email.value;
    var password = login_password.value;
    if (!email) {
        email_error.textContent = 'Email address is required';
        setTimeout(function () {
            email_error.textContent = '';
        }, 3000);
    }
    if (!password) {
        password_error.textContent = 'Password is required';
        setTimeout(function () {
            password_error.textContent = '';
        }, 3000);
    }
    if (password && email) {
        var promise2 = new Promise(function (res, rej) {
            fetch('http://localhost:4600/user/login', {
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({
                    "email": email,
                    "password": password
                })
            }).then(function (res) { return res.json(); }).then(function (data) {
                console.log(data);
                localStorage.setItem('token', data.token);
                redirect();
                res(data);
            }).catch(function (error) {
                console.log(error);
                rej(error);
            });
        });
        function redirect() {
            var token = localStorage.getItem('token');
            new Promise(function (resolve, reject) {
                fetch('http://localhost:4600/user/check_user_details', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                        'token': token
                    },
                    method: "GET"
                }).then(function (res) {
                    resolve(res.json());
                }).catch(function (error) {
                    reject(error);
                });
            }).then(function (data) {
                console.log(data['info']);
                if (data['info'].role === 'employee') {
                    localStorage.setItem('user_email', data['info'].email);
                    location.href = 'users.html';
                }
                else if (data['info'].role === 'admin') {
                    localStorage.setItem('user_email', data['info'].email);
                    location.href = 'admin.html';
                }
            });
        }
    }
});
