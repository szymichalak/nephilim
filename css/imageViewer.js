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

onContentLoaded();
