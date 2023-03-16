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
                let fnError = document.getElementsByClassName('fn-error')[0];
                if (!fullName.value.match(/^[a-zа-я\s]+$/ig)) {
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
                let unError = document.getElementsByClassName('un-error')[0];
                if (!username.value.match(/^[а-я\w-]+$/ig)) {
                    username.parentElement.style.color = "red";
                    username.style.borderBottom = "1px solid red";
                    unError.style.display = "block";
                    break
                } else {
                    username.parentElement.style.color = "#C6C6C4";
                    username.style.borderBottom = "1px solid #C6C6C4";
                    unError.style.display = "none";
                }
            } else if (inputField[i] === email) {
                let emailError = document.getElementsByClassName('email-error')[0];
                if (!email.value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6}$/ig)) {
                    email.parentElement.style.color = "red";
                    email.style.borderBottom = "1px solid red";
                    emailError.style.display = "block";
                    break
                } else {
                    email.parentElement.style.color = "#C6C6C4";
                    email.style.borderBottom = "1px solid #C6C6C4";
                    emailError.style.display = "none";
                }
            } else if (inputField[i] === password) { // количество символов
                let countPass = password.value.length;
                let passError = document.getElementsByClassName('pass-error')[0];
                if (countPass < 8) {
                    inputField[i].parentElement.style.color = "red";
                    inputField[i].style.borderBottom = "1px solid red";
                    break
                } else if (!password.value.match(/^(?=.*\d)(?=.*[!@#$%^&*.,<>])(?=.*[a-z])(?=.*[A-Z]).{8,15}$/)) {
                    password.parentElement.style.color = "red";
                    password.style.borderBottom = "1px solid red";
                    passError.style.display = "block";
                    break
                } else {
                    inputField[i].parentElement.style.color = "#C6C6C4";
                    inputField[i].style.borderBottom = "1px solid #C6C6C4";
                    passError.style.display = "none";
                }
                // проверка паролей на соответствие
            } else if (inputField[i] === repeatPass) {
                let repassError = document.getElementsByClassName('repass-error')[0];
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
        event.preventDefault();
    }
    section.onclick = (event) => {
        let target = event.target;
        if (target === already || target === okButton) {
            let client = localStorage.getItem('users');
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
            console.log(localStorage);

            popup.style.display = 'none';
            username.value = '';
            password.value = '';
            // удаляет ненужные поля
            let deleteArray = [fullName, email, repeatPass, checkbox, already];
            for (let item of deleteArray) {
                item.parentElement.remove();
            }
            title.textContent = 'Log in to the system';
            submit.textContent = 'Sign In'
            submit.onclick = (event) => {
                let inputField = [username, password];
                for (let i = 0; i < inputField.length; i++) {
                    if (!inputField[i].value) {
                        alert(`Заполните поле ${inputField[i].parentElement.innerText}`);
                        inputField[i].parentElement.style.color = "red";
                        inputField[i].style.borderBottom = "1px solid red";
                        break;
                    } else if (inputField[i].value) {
                        inputField[i].parentElement.style.color = "#C6C6C4";
                        inputField[i].style.borderBottom = "1px solid #C6C6C4";
                    }
                }
                if (inputField[0].value && inputField[1].value) {
                    alert(`Добро пожаловать, ${username.value}!`);
                    username.value = '';
                    password.value = '';
                }
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