let instance;
let container;

function onContentLoaded() {
    instance = document.querySelector('.js-image-viewer');
    if (!instance) {
        console.warn('Missing js-image-viewer element');
        return;
    }

    container = instance.querySelector('.js-image-viewer__container');
    if (!container) {
        console.warn('Missing js-image-viewer__container element');
        return;
    }

    document.querySelectorAll('.js-image-viewer-trigger').forEach((trigger) => {
        trigger.addEventListener('click', onTriggerClicked)
    });

    instance.addEventListener('click', onClose);
    container.addEventListener('load', onImageLoaded);

    document.querySelectorAll(".c-section").forEach((formSection) => {
        formSection.addEventListener('submit', onFormSubmit);
    });
}

function onTriggerClicked() {
    instance.classList.replace('c-image-viewer--not-loading', 'c-image-viewer--loading');
    container.src = this.src.replace('250x500', '400x750');
    instance.style.opacity = '1';
    instance.style.visibility = 'visible';
}

function onClose() {
    container.removeAttribute('src');
    instance.style.opacity = '0';
    instance.style.visibility = 'hidden';
}

function onImageLoaded() {
    instance.classList.replace('c-image-viewer--loading', 'c-image-viewer--not-loading');
}

function onFormSubmit() {
    event.preventDefault();
    const req = new XMLHttpRequest();

    let form = event.target;
    let body = getFormData(form);

    let i = form.classList.contains('c-section--brand-01') ? 1 : 0;
    let successNotification = document.querySelectorAll(".c-notification--success")[i];
    let errorNotification = document.querySelectorAll(".c-notification--error")[i];
    req.onreadystatechange = async function() {
        if (req.readyState === XMLHttpRequest.DONE) {
            if (req.status >= 200 && req.status < 400) {
                showNotification(successNotification);
                await sleep(5);
                hideNotification(successNotification);
            }
            else if (req.status >= 400 || req.status === 0) {
                showNotification(errorNotification);
                await sleep(5);
                hideNotification(errorNotification);
            }
        }
    };

    req.open(form.method, form.action, true);
    req.send(body);
}

async function sleep(sek) {
    await new Promise(resolve => setTimeout(resolve, sek * 1000));
}

function showNotification(notification) {
    notification.style.opacity = '1';
    notification.style.visibility = 'visible';
}

function hideNotification(notification) {
    notification.style.opacity = '0';
    notification.style.visibility = 'hidden';
}

function getFormData(form) {
    const elements = form.elements;
    const formData = new FormData();
    for(let i = 0 ; i < elements.length ; i++){
        let item = elements.item(i);
        if (item.name === '') { continue; }
        if ((item.type === 'radio' || item.type === 'checkbox') && !item.checked) { continue; }
        formData.append(item.name, item.value);
    }

    return formData;
}

onContentLoaded();
