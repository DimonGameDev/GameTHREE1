// ============================================
// МОДАЛЬНЕ МЕНЮ НАЛАШТУВАНЬ
// ============================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSettingsModal);
} else {
    initSettingsModal();
}

function initSettingsModal() {
    const settingsBtn = document.querySelector('.settings');
    const settingsModal = document.querySelector('.settingsModal');
    
    if (!settingsBtn || !settingsModal) {
        console.error('❌ Не знайдено елементи меню налаштувань');
        return;
    }
    
    // Обробник кліку на шестеронку
    settingsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        settingsModal.classList.toggle('active');
        console.log('⚙️ Меню налаштувань:', settingsModal.classList.contains('active') ? 'відкрито' : 'закрито');
    });
    
    // Закриття меню при кліку поза ним
    document.addEventListener('click', (e) => {
        if (!settingsModal.contains(e.target) && !settingsBtn.contains(e.target)) {
            settingsModal.classList.remove('active');
        }
    });
    
    // ============================================
    // ОБРОБНИКИ ПУНКТІВ МЕНЮ
    // ============================================
    
    // 1. ЗБЕРЕГТИ ГРУ
    const saveGameBtn = document.querySelector('#saveGameBtn');
    if (saveGameBtn) {
        saveGameBtn.addEventListener('click', () => {
            console.log('💾 Натиснуто "Зберегти гру"');
            
            if (typeof window.saveGameState === 'function') {
                const success = window.saveGameState();
                
                if (success) {
                    // Показуємо повідомлення про успіх
                    alert('✅ Гру успішно збережено!');
                    console.log('✅ Гра збережена успішно');
                } else {
                    alert('❌ Помилка збереження гри!');
                    console.error('❌ Не вдалося зберегти гру');
                }
            } else {
                alert('❌ Система збереження не доступна!');
                console.error('❌ Функція saveGameState не знайдена');
            }
            
            // Закриваємо меню
            settingsModal.classList.remove('active');
        });
    }
    
    // 2. НОВА ГРА
    const newGameBtn = document.querySelector('#newGameBtn');
    if (newGameBtn) {
        newGameBtn.addEventListener('click', () => {
            console.log('🆕 Натиснуто "Нова гра"');
            
            const confirm = window.confirm(
                '⚠️ УВАГА!\n\n' +
                'Розпочати нову гру?\n\n' +
                'Поточний прогрес буде втрачено.\n' +
                '(Не забудьте зберегти!)'
            );
            
            if (confirm) {
                // Переходимо на page2 для налаштування нової гри
                window.location.href = '../page2/page2_2.html';
            }
            
            settingsModal.classList.remove('active');
        });
    }
    
    // 3. ВИХІД В МЕНЮ
    const exitGameBtn = document.querySelector('#exitGameBtn');
    if (exitGameBtn) {
        exitGameBtn.addEventListener('click', () => {
            console.log('🚪 Натиснуто "Вихід в меню"');
            
            const confirm = window.confirm(
                '⚠️ УВАГА!\n\n' +
                'Повернутися в головне меню?\n\n' +
                'Не забудьте зберегти гру!'
            );
            
            if (confirm) {
                // Переходимо на page1
                window.location.href = '../page1/page1.html';
            }
            
            settingsModal.classList.remove('active');
        });
    }
    
    console.log('✅ Модальне меню налаштувань ініціалізовано');
}