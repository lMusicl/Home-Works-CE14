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
    let mainText = document.querySelector('.main-text');
    //переменная для остановки функции
    let result = true;
    //блоки с ошибками
    let fnError = document.querySelector('.fn-error');
    let unError = document.querySelector('.un-error');
    let emailError = document.querySelector('.email-error');
    let passError = document.querySelector('.pass-error');
    let repassError = document.querySelector('.repass-error');
    let loginUnError = document.querySelector('.login-un-error');
    let loginPassError = document.querySelector('.login-pass-error');
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
            result = false;
        } else {
            username.parentElement.style.color = "#C6C6C4";
            username.style.borderBottom = "1px solid #C6C6C4";
            unError.style.display = "none";
            result = true;
        }
    }
    //функция проверки пароля
    function checkPass() {
        let countPass = password.value.length;
        if (countPass < 8) {
            password.parentElement.style.color = "red";
            password.style.borderBottom = "1px solid red";
            passError.style.display = "block";
            result = false;
        } else if (!password.value.match(passwordExpression)) {
            password.parentElement.style.color = "red";
            password.style.borderBottom = "1px solid red";
            passError.style.display = "block";
            result = false;
        } else {
            password.parentElement.style.color = "#C6C6C4";
            password.style.borderBottom = "1px solid #C6C6C4";
            passError.style.display = "none";
            result = true;
        }
    }
    // Клик по кнопке Sign up
    submit.onclick = (event) => {
        let inputField = [fullName, username, email, password, repeatPass, checkbox];
        // проверяет каждое значение
        for (let i = 0; i < inputField.length; i++) {
            // проверяет заполнено ли поле
            if (inputField[i] === fullName) {
                if (!fullName.value.match(fullNameExpression)) {
                    fullName.parentElement.style.color = "red";
                    fullName.style.borderBottom = "1px solid red";
                    fnError.style.display = "block";
                    return false
                } else {
                    fullName.parentElement.style.color = "#C6C6C4";
                    fullName.style.borderBottom = "1px solid #C6C6C4";
                    fnError.style.display = "none";
                }
            } else if (inputField[i] === username) {
                checkUsername();
                if (result === false) {
                    return false
                }
            } else if (inputField[i] === email) {
                if (!email.value.match(emailExpression)) {
                    email.parentElement.style.color = "red";
                    email.style.borderBottom = "1px solid red";
                    emailError.style.display = "block";
                    return false
                } else {
                    email.parentElement.style.color = "#C6C6C4";
                    email.style.borderBottom = "1px solid #C6C6C4";
                    emailError.style.display = "none";
                }
            } else if (inputField[i] === password) { // проверка пароля
                checkPass();
                if (result === false) {
                    return false
                }
                // проверка паролей на соответствие
            } else if (inputField[i] === repeatPass) {
                if (repeatPass.value !== password.value) {
                    inputField[i].parentElement.style.color = "red";
                    inputField[i].style.borderBottom = "1px solid red";
                    repassError.style.display = "block";
                    return false
                } else {
                    inputField[i].parentElement.style.color = "#C6C6C4";
                    inputField[i].style.borderBottom = "1px solid #C6C6C4";
                    repassError.style.display = "none";
                }
            }
            // проверяет чекбокс на галочку
            else if (!checkbox.checked) {
                checkbox.parentElement.style.color = "red";
                return false
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
    //нажатие либо "Уже есть аккаунт" либо "Ок" во всплывающем окне
    section.onclick = (event) => {
        let target = event.target;
        if (target === already || target === okButton) {
            //убираем окно
            popup.style.display = 'none';
            //очищаем поля
            username.value = '';
            password.value = '';
            // удаляет ненужные поля
            let deleteArray = [fullName, email, repeatPass, checkbox];
            for (let item of deleteArray) {
                item.parentElement.remove();
            }
            // поправляем стили второй страницы
            document.querySelector('.main-container').style.gridTemplateRows = '56px 81px 360px 25px';
            document.querySelector('.main-image').style.gridRow = '1/5';
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
                        if (result === false) {
                            return false
                        }
                    } else if (inputField[i] === password) {
                        checkPass();
                        if (result === false) {
                            return false
                        }
                    }
                }
                //достаем ключ значение из localstorage
                let loginArray = JSON.parse(client);
                for (let i = 0; i < loginArray.length; i++) {
                    let userKey = loginArray[i].username;
                    let passKey = loginArray[i].password;
                    let fnKey = loginArray[i].fullName;
                    if (username.value !== userKey) {
                        username.parentElement.style.color = "red";
                        username.style.borderBottom = "1px solid red";
                        loginUnError.style.display = "block";
                    } else if (username.value === userKey && password.value !== passKey) {
                        password.parentElement.style.color = "red";
                        password.style.borderBottom = "1px solid red";
                        loginPassError.style.display = "block";
                        username.parentElement.style.color = "#C6C6C4";
                        username.style.borderBottom = "1px solid #C6C6C4";
                        loginUnError.style.display = "none";
                        return false
                    } else if (username.value === userKey && password.value === passKey) {
                        alert(`Добро пожаловать, ${username.value}!`);
                        title.textContent = "Welcome, " + fnKey + "!";
                        username.value = "";
                        password.value = "";
                        loginUnError.style.display = "none";
                        loginPassError.style.display = "none";
                        submit.textContent = 'Exit'
                        username.parentElement.remove();
                        password.parentElement.remove();
                        already.parentElement.remove();
                        mainText.remove();
                        submit.onclick = () => {
                            location.reload();
                        }
                        return false
                    }
                }
                event.preventDefault();
            }
        }
    }
}