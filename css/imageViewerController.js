(function(){
    class ImageViewerController {
        constructor(view, triggers) {
            this._view = view;
            this._container = view.querySelector('.js-image-viewer__container');

            triggers.forEach((trigger) => {
                trigger.addEventListener('click', () => this._onTriggerClicked(trigger));
            });

            this._view.addEventListener('click', this._onClose);
            this._container.addEventListener('load', this._onImageLoaded);
        }

        _onTriggerClicked = (trigger) => {
            this._view.classList.replace('c-image-viewer--not-loading', 'c-image-viewer--loading');
            this._container.src = trigger.src.replace('250x500', '400x750');
            this._view.style.opacity = '1';
            this._view.style.visibility = 'visible';
        }

        _onClose = () => {
            this._container.removeAttribute('src');
            this._view.style.opacity = '0';
            this._view.style.visibility = 'hidden';
        }

        _onImageLoaded = () => {
            this._view.classList.replace('c-image-viewer--loading', 'c-image-viewer--not-loading');
        }
    }

    function onContentLoaded() {
        const imageViewer = document.querySelector(".js-image-viewer");
        new ImageViewerController(imageViewer, document.querySelectorAll('.js-image-viewer-trigger'));
    }

    onContentLoaded();
})();
