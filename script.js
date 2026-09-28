document.addEventListener('DOMContentLoaded', () => {
    // Дата — только с сегодняшнего дня
    const dateInput = document.querySelector('input[name="date"]');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);

    const form = document.getElementById('bookingForm');
    const msg = document.getElementById('formMessage');
    const modal = document.getElementById('successModal');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Проверка телефона
        const phone = form.phone.value;
        const digits = phone.replace(/\D/g, '');
        if (digits.length < 10) {
            msg.textContent = 'Проверьте номер телефона';
            msg.className = 'form-message error';
            return;
        }
        msg.textContent = '';

        // Собираем данные
        const formData = new FormData(form);

        try {
            // Отправка на Formspree в фоне
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                // Показываем модальное окно
                modal.classList.add('modal--visible');
                form.reset();
            } else {
                msg.textContent = 'Ошибка отправки. Позвоните нам.';
                msg.className = 'form-message error';
            }
        } catch (err) {
            msg.textContent = 'Ошибка соединения. Попробуйте ещё раз.';
            msg.className = 'form-message error';
            console.error(err);
        }
    });

    // Закрытие окна
    document.querySelectorAll('[data-close-modal]').forEach(el => {
        el.addEventListener('click', () => {
            modal.classList.remove('modal--visible');
        });
    });
});