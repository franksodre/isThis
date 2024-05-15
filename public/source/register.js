// import { redirect } from '../public/source/handlers/buttonRedirect.js'

const form = document.querySelector('form');
const SERVER_MSG = document.querySelector("#alerts__message");

function updateDataServerMSG(data){
  const valueData_msg = "msg" in data ? data.msg : data.error;
  SERVER_MSG.innerHTML = `${valueData_msg}`
}

const showNotificationCallback = (callback) => {
    const notification = document.getElementById('notification');
    notification.classList.remove('hidden');
    notification.classList.remove('-translate-x-full');
    notification.classList.add('translate-x-0');
    if (typeof callback === 'function') {
        callback();
    }

    setTimeout(() => {
      hideNotification()
    }, 3000)
};


const hideNotification = () => {
    const notification = document.getElementById('notification');
    notification.classList.add('-translate-x-full');
    notification.classList.remove('translate-x-0');
    // Esperar a animação terminar antes de ocultar completamente
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 500); // Esperar 500 milissegundos (0.5 segundos) para garantir que a animação termine
}



form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const url = "/";
        const response = await fetch('/customer/account/register', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: { 'content-Type': 'application/json' }
        })
        const data = await response.json();
        console.log(data)

        showNotificationCallback(updateDataServerMSG(data));

        if(response.ok || response.status === 201){//.status === 200 || response.status === 201
            setTimeout(() => {
                window.location = url;
            }, 5000)
        }

    } catch (e) {
        console.log(e)
    }
})