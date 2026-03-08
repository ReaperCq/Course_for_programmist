// consoleLogger.js
// Практическое занятие 10: Логирование данных формы
// CodeMaster Pro — contacts.html

document.addEventListener('DOMContentLoaded', function () {

    // Слушаем кастомное событие formValid, которое диспатчит validation.js
    document.addEventListener('formValid', function (event) {
        const formData = event.detail;

        // Очищаем консоль для наглядности
        console.clear();

        console.log('%c📬 Форма обратной связи — CodeMaster Pro', 'font-size: 14px; font-weight: bold; color: #667eea;');
        console.log('─────────────────────────────────────────');

        // Построчный вывод данных
        console.log('Имя:', formData.name);
        console.log('Email:', formData.email);
        console.log('Телефон:', formData.phone);
        console.log('Тема:', formData.subject);
        console.log('Сообщение:', formData.message);

        // Временная метка
        const timestamp = new Date().toLocaleString('ru-RU');
        console.log('Время отправки:', timestamp);

        console.log('─────────────────────────────────────────');

        // Табличное представление
        console.table({
            'Имя': formData.name,
            'Email': formData.email,
            'Телефон': formData.phone,
            'Тема': formData.subject,
            'Время': timestamp
        });
    });

});
