// Подсветка активной ссылки в навигации
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// Отправка формы через Telegram API
const form = document.querySelector('#contact-form');
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.querySelector('#name').value;
        const phone = document.querySelector('#phone').value;
        const telegram = document.querySelector('#telegram').value || 'Не указан';

        // Валидация
        if (!name || !phone) {
            alert('Пожалуйста, заполните ФИО и телефон.');
            return;
        }
        if (!/^\+?[0-9]{10,15}$/.test(phone)) {
            alert('Некорректный формат телефона.');
            return;
        }

        // Замените на ваш токен бота и chat_id
        const botToken = 'YOUR_BOT_TOKEN'; // Вставьте токен бота
        const chatId = 'YOUR_CHAT_ID'; // Вставьте ваш chat_id

        const message = `Новая заявка:\nФИО: ${name}\nТелефон: ${phone}\nTelegram: ${telegram}`;
        const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

        try {
            const response = await fetch(url);
            if (response.ok) {
                alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
                form.reset();
            } else {
                alert('Ошибка отправки. Попробуйте позже.');
            }
        } catch (error) {
            alert('Ошибка сети. Попробуйте позже.');
        }
    });
}