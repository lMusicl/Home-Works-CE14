window.onload = function () {
    // Поиск элементов
    let fullName = document.getElementById('fullName');
    let username = document.getElementById('username');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let repeatPass = document.getElementById('repeatPass');
    let checkbox = document.getElementById('checkbox');
    let submit = document.getElementById('submit');
    let popup = document.getElementById('popup');
    let okButton = document.getElementById('popup-btn');
    let already = document.getElementById('already');
    let title = document.getElementById('main-title');
    let section = document.getElementById('section');
    let client = localStorage.getItem('users');

    //блоки с ошибками
    let fnError = document.getElementsByClassName('fn-error')[0];
    let unError = document.getElementsByClassName('un-error')[0];
    let emailError = document.getElementsByClassName('email-error')[0];
    let passError = document.getElementsByClassName('pass-error')[0];
    let repassError = document.getElementsByClassName('repass-error')[0];

    //выражения для проверки
    let fullNameExpression = /^[a-zа-я\s]+$/ig;
    let usernameExpression = /^[а-я\w-]+$/ig;
    let emailExpression = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6}$/ig;
    let passwordExpression = /^(?=.*\d)(?=.*[!@#$%^&*.,<>])(?=.*[a-z])(?=.*[A-Z]).{8,15}$/;

    //функция проверки username
    function checkUsername() {
        if (!username.value.match(usernameExpression)) {
            username.parentElement.style.color = "red";
            username.style.borderBottom = "1px solid red";
            unError.style.display = "block";
            return false
        } else {
            username.parentElement.style.color = "#C6C6C4";
            username.style.borderBottom = "1px solid #C6C6C4";
            unError.style.display = "none";
        }
    }


    //функция проверки пароля
    function checkPass() {
        let countPass = password.value.length;
        if (countPass < 8) {
            password.parentElement.style.color = "red";
            password.style.borderBottom = "1px solid red";
            passError.style.display = "block";
            return false
        } else if (!password.value.match(passwordExpression)) {
            password.parentElement.style.color = "red";
            password.style.borderBottom = "1px solid red";
            passError.style.display = "block";
            return false
        } else {
            password.parentElement.style.color = "#C6C6C4";
            password.style.borderBottom = "1px solid #C6C6C4";
            passError.style.display = "none";
        }
    }

    // Клик по кнопке Sign up
    submit.onclick = (event) => {
        let inputField = [fullName, username, email, password, repeatPass, checkbox];
        // проверяет каждое значение
        for (let i = 0; i < inputField.length; i++) {
            // проверяет заполнено ли поле
            if (!inputField[i].value) {
                inputField[i].parentElement.style.color = "red";
                inputField[i].style.borderBottom = "1px solid red";
            } else if (inputField[i] === fullName) {
                if (!fullName.value.match(fullNameExpression)) {
                    fullName.parentElement.style.color = "red";
                    fullName.style.borderBottom = "1px solid red";
                    fnError.style.display = "block";
                    break
                } else {
                    fullName.parentElement.style.color = "#C6C6C4";
                    fullName.style.borderBottom = "1px solid #C6C6C4";
                    fnError.style.display = "none";
                }
            } else if (inputField[i] === username) {
                checkUsername();
            } else if (inputField[i] === email) {
                if (!email.value.match(emailExpression)) {
                    email.parentElement.style.color = "red";
                    email.style.borderBottom = "1px solid red";
                    emailError.style.display = "block";
                    break
                } else {
                    email.parentElement.style.color = "#C6C6C4";
                    email.style.borderBottom = "1px solid #C6C6C4";
                    emailError.style.display = "none";
                }
            } else if (inputField[i] === password) { // проверка пароля
                checkPass();
                // проверка паролей на соответствие
            } else if (inputField[i] === repeatPass) {
                if (repeatPass.value !== password.value) {
                    inputField[i].parentElement.style.color = "red";
                    inputField[i].style.borderBottom = "1px solid red";
                    repassError.style.display = "block";
                } else {
                    inputField[i].parentElement.style.color = "#C6C6C4";
                    inputField[i].style.borderBottom = "1px solid #C6C6C4";
                    repassError.style.display = "none";
                }
            }
            // возвращает стили заполненных полей
            else if (inputField[i].value && inputField[i] !== checkbox) {
                inputField[i].parentElement.style.color = "#C6C6C4";
                inputField[i].style.borderBottom = "1px solid #C6C6C4";
                // проверяет чекбокс на галочку
            } else if (!checkbox.checked) {
                checkbox.parentElement.style.color = "red";
            } else {
                popup.style.display = 'block';
            }
        }
        let user = {
            fullName: fullName.value,
            username: username.value,
            email: email.value,
            password: password.value
        };
        if (client) {
            let clientArray = JSON.parse(client);
            clientArray.push(user);
            localStorage.setItem('users', JSON.stringify(clientArray));
        } else {
            let clientArray = [];
            clientArray.push(user);
            localStorage.setItem('users', JSON.stringify(clientArray));
        }
        event.preventDefault();
    }
    section.onclick = (event) => {
        let target = event.target;
        if (target === already || target === okButton) {
            popup.style.display = 'none';
            username.value = '';
            password.value = '';
            // удаляет ненужные поля
            let deleteArray = [fullName, email, repeatPass, checkbox];
            for (let item of deleteArray) {
                item.parentElement.remove();
            }
            // поправляем стили второй страницы
            document.getElementsByClassName('main-container')[0].style.gridTemplateRows = '56px 81px 360px 25px';
            document.getElementsByClassName('main-image')[0].style.gridRow = '1/5';
            already.textContent = "Registration";
            title.textContent = 'Log in to the system';
            submit.textContent = 'Sign In'
            //перезагрузка страницы при нажатии на Registration
            already.onclick = () => {
                location.reload();
            };
            //нажатие на sign in
            submit.onclick = (event) => {
                let inputField = [username, password];
                for (let i = 0; i < inputField.length; i++) {
                    if (inputField[i] === username) {
                        checkUsername();
                    } else if (inputField[i] === password) {
                        checkPass();
                    }
                }
                //достаем ключ значение из localstorage
                let loginArray = JSON.parse(client);
                for (let i = 0; i < loginArray.length; i++) {
                    let userKey = loginArray[i].username;
                    let passKey = loginArray[i].password;
                    if (username.value === userKey && password.value === passKey) {
                        alert(`Добро пожаловать, ${username.value}!`);
                    }
                }
                alert('Неправильный логин или пароль!');
                event.preventDefault();
            }
        }
    }
}


// // Full Name может содержать только буквы и пробел
// fullName.onkeydown = (e) => {
//     if (!e.key.match(/^[a-zа-я\s]+$/ig)) {
//         return false
//     }
// }
// // Your username - может содержать только буквы, цифры, символ подчеркивания и тире
// username.onkeydown = (e) => {
//     if (!e.key.match(/^[а-я\w-]+$/ig)) {
//         return false
//     }
// }
// // /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,6}$/ig
// // Реализовать проверку введенного E-mail на корректность
// email.onkeydown = (e) => {
//     if (!e.key.match(/^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,6}$/ig)) {
//         return false
//     }
// }

// // значение checkbox
// checkbox.onclick = () => {
//     if (checkbox.checked) {
//         console.log('Согласен');
//     } else {
//         console.log('Не согласен');
//     }
// }