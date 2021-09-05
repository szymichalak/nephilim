(function() {
    class NotificationController {
        constructor(forms) {
            forms.forEach((formSection) => {
                formSection.addEventListener('submit', this._onFormSubmit);
            });
        }

        _onFormSubmit = (event) => {
            event.preventDefault();
            const req = new XMLHttpRequest();

            let form = event.target;
            let body = new FormData(form);

            let i = form.classList.contains('c-section--brand-01') ? 1 : 0;
            let successNotification = document.querySelectorAll(".c-notification--success")[i];
            let errorNotification = document.querySelectorAll(".c-notification--error")[i];
            req.onreadystatechange = async () => {
                if (req.readyState === XMLHttpRequest.DONE) {
                    if (req.status >= 200 && req.status < 400) {
                        this._showNotification(successNotification);
                        await this._sleep(5);
                        this._hideNotification(successNotification);
                    }
                    else if (req.status >= 400 || req.status === 0) {
                        this._showNotification(errorNotification);
                        await this._sleep(5);
                        this._hideNotification(errorNotification);
                    }
                }
            };

            req.open(form.method, form.action, true);
            req.send(body);
        };

        async _sleep(sek) {
            await new Promise(resolve => setTimeout(resolve, sek * 1000));
        }

        _showNotification = (notification) => {
            notification.style.opacity = '1';
            notification.style.visibility = 'visible';
        };

        _hideNotification = (notification) =>{
            notification.style.opacity = '0';
            notification.style.visibility = 'hidden';
        };
    }

    function handleNotification() {
        const forms = document.querySelectorAll(".js-form");
        new NotificationController(forms);
    }

    handleNotification();
})();
