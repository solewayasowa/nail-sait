document.addEventListener('DOMContentLoaded', () => {
    // Дату можно выбрать только начиная с сегодня
    const dateInput = document.querySelector('input[name="date"]');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);

    const form = document.getElementById('bookingForm');
    const msg = document.getElementById('formMessage');

    form.addEventListener('submit', (e) => {

        const data = Object.fromEntries(new FormData(form));

        // Проверка телефона — минимум 10 цифр
        const digits = data.phone.replace(/\D/g, '');
        if (digits.length < 10) {
            msg.textContent = 'Проверьте номер телефона';
            msg.className = 'form-message error';
            return;
        }

        // Пока просто показываем успех
        msg.textContent = '✅ Заявка принята! Мы свяжемся с вами.';
        msg.className = 'form-message success';
        form.reset();

        // Здесь можно потом прикрутить отправку на почту или в CRM
        console.log('Новая заявка:', data);
    });
});