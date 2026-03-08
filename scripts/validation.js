// validation.js
// Практическое занятие 10: Валидация формы обратной связи
// CodeMaster Pro — contacts.html

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('feedbackForm');
    if (!form) return;

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Сбрасываем предыдущие ошибки
        document.querySelectorAll('.input.is-danger, .textarea.is-danger, .select select.is-danger')
            .forEach(el => el.classList.remove('is-danger'));
        document.querySelectorAll('.help.is-danger')
            .forEach(el => el.remove());

        let isValid = true;

        // 1. Проверка имени (не пустое, минимум 2 слова)
        const fullname = document.getElementById('contactName');
        const fullnameValue = fullname.value.trim();
        const words = fullnameValue.split(' ').filter(w => w.length > 0);

        if (fullnameValue === '') {
            showError(fullname, 'Введите ваше имя');
            isValid = false;
        } else if (words.length < 2) {
            showError(fullname, 'Введите имя и фамилию');
            isValid = false;
        }

        // 2. Проверка email (не пустой, корректный формат)
        const email = document.getElementById('contactEmail');
        const emailValue = email.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailValue === '') {
            showError(email, 'Введите email');
            isValid = false;
        } else if (!emailPattern.test(emailValue)) {
            showError(email, 'Введите корректный email адрес');
            isValid = false;
        }

        // 3. Проверка телефона (если заполнен — минимум 10 цифр)
        const phone = document.getElementById('contactPhone');
        if (phone) {
            const phoneValue = phone.value.trim();
            const phoneDigits = phoneValue.replace(/\D/g, '');

            if (phoneValue !== '' && phoneDigits.length < 10) {
                showError(phone, 'Введите корректный номер телефона (минимум 10 цифр)');
                isValid = false;
            }
        }

        // 4. Проверка темы обращения
        const subject = document.getElementById('contactSubject');
        if (subject && subject.value === '') {
            showError(subject, 'Выберите тему обращения');
            isValid = false;
        }

        // 5. Проверка сообщения (не пустое, минимум 10 символов)
        const message = document.getElementById('contactMessage');
        const messageValue = message.value.trim();

        if (messageValue === '') {
            showError(message, 'Введите сообщение');
            isValid = false;
        } else if (messageValue.length < 10) {
            showError(message, 'Сообщение должно содержать минимум 10 символов');
            isValid = false;
        }

        // 6. Проверка чекбокса согласия
        const agreement = document.getElementById('contactAgreement');
        if (agreement && !agreement.checked) {
            const checkboxWrapper = agreement.closest('.field');
            if (!checkboxWrapper.querySelector('.help.is-danger')) {
                const errorMsg = document.createElement('p');
                errorMsg.classList.add('help', 'is-danger');
                errorMsg.textContent = 'Необходимо согласиться с политикой обработки данных';
                checkboxWrapper.appendChild(errorMsg);
            }
            isValid = false;
        }

        // Если всё корректно — диспатчим событие для consoleLogger.js
        if (isValid) {
            const formData = {
                name: fullnameValue,
                email: emailValue,
                phone: phone ? phone.value.trim() || '(не указан)' : '(не указан)',
                subject: subject ? subject.value : '',
                message: messageValue
            };

            const validEvent = new CustomEvent('formValid', { detail: formData });
            document.dispatchEvent(validEvent);

            // Показываем уведомление об успехе
            showSuccess();
            form.reset();
        }
    });

    // --- Вспомогательные функции ---

    function showError(input, message) {
        input.classList.add('is-danger');
        const help = document.createElement('p');
        help.classList.add('help', 'is-danger');
        help.textContent = message;

        // Для select — родитель другой
        const parent = input.closest('.field') || input.parentNode.parentNode;
        // Добавляем после control-блока
        const control = input.closest('.control') || input.parentNode;
        control.after(help);
    }

    function showSuccess() {
        // Убираем старое уведомление, если было
        const oldNotif = document.getElementById('successNotification');
        if (oldNotif) oldNotif.remove();

        const notif = document.createElement('div');
        notif.id = 'successNotification';
        notif.classList.add('notification', 'is-success', 'is-light');
        notif.style.marginBottom = '1.5rem';
        notif.innerHTML = `
            <button class="delete" onclick="this.parentElement.remove()"></button>
            <strong>Сообщение отправлено!</strong> Мы свяжемся с вами в ближайшее время.
        `;
        form.insertAdjacentElement('beforebegin', notif);
    }

    // Сброс ошибки при вводе
    document.querySelectorAll('.input, .textarea').forEach(input => {
        input.addEventListener('input', function () {
            this.classList.remove('is-danger');
            const nextEl = this.closest('.control').nextElementSibling;
            if (nextEl && nextEl.classList.contains('help') && nextEl.classList.contains('is-danger')) {
                nextEl.remove();
            }
        });
    });

    // Сброс ошибки при изменении select
    document.querySelectorAll('select').forEach(select => {
        select.addEventListener('change', function () {
            this.classList.remove('is-danger');
            const nextEl = this.closest('.control').nextElementSibling;
            if (nextEl && nextEl.classList.contains('help') && nextEl.classList.contains('is-danger')) {
                nextEl.remove();
            }
        });
    });
});
