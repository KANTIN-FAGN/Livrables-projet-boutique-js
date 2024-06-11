const backToConnect = document.querySelector('.backToConnect');
const forgotPwd = document.querySelector('.forget-pwd');

const connect = document.querySelector('.connexion-input-global');
const forgot = document.querySelector('.forgot-pwd-global');

forgotPwd.addEventListener('click', () => {
    forgot.classList.add('active');
    connect.classList.add('remove');
})
backToConnect.addEventListener('click', () => {
    forgot.classList.remove('active');
    connect.classList.remove('remove');
})