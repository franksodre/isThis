const form = document.querySelector('form');
const btn = document.querySelector("#button_refreshToken");
const SERVER_MSG = document.querySelector("#alerts__message");
const notificationIcon = document.querySelector("#notification_svg_path");

// esta função passou a ter muitas responsabilidades e esta feia devo melhorar la
function updateDataServerMSG(data){
  // const valueData_msg = "msg" in data ? data.msg : data.error;
	let valueData_msg = null;

	if("msg" in data){
		valueData_msg = data.msg;
		notificationIcon.outerHTML = `
          <svg class="flex-shrink-0 size-4 text-teal-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16"  fill="currentColor" viewBox="0 0 16 16">
                 <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path>
           </svg>
		`
	}else{
		valueData_msg = data.error;
	}

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

    const email = form.email.value;
    const password = form.password.value;
    try {
        const url = "/";
        const response = await fetch('/customer/account/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        })
        const data = await response.json();
        // console.log(data);
        showNotificationCallback(updateDataServerMSG(data));

        if(response.ok){ // ok. o set foi para simular um tempo de demora como se estivesse em produção. deve usar soluções de verdade.
            setTimeout(() => {
            	window.location = url;
            }, 5000)
        }
    } catch (e) {
        console.log(e)
    }
})