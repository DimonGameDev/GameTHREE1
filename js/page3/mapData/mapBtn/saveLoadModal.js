// ============================================
// МОДАЛЬНІ ВІКНА ЗБЕРЕЖЕННЯ/ЗАВАНТАЖЕННЯ
// ============================================

/**
 * Показує модальне вікно збереження гри
 */
function showSaveModal() {
    // Отримуємо всі слоти
    const slots = window.getSaveSlots();
    
    let html = `
        <div class="save-load-modal-backdrop" id="saveModalBackdrop">
            <div class="save-load-modal">
                <h2>💾 Зберегти гру</h2>
                <p class="modal-subtitle">Виберіть слот для збереження:</p>
                <div class="save-slots">
    `;
    
    // Генеруємо 4 слоти
    for (let i = 1; i <= 4; i++) {
        const slot = slots[i - 1];
        const isEmpty = !slot;
        
        if (isEmpty) {
            html += `
                <div class="save-slot empty" data-slot="${i}">
                    <div class="slot-number">Слот ${i}</div>
                    <div class="slot-content">
                        <div class="empty-slot">Порожній слот</div>
                    </div>
                </div>
            `;
        } else {
            const date = new Date(slot.savedAt);
            const dateStr = date.toLocaleDateString('uk-UA');
            const timeStr = date.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });
            
            html += `
                <div class="save-slot filled" data-slot="${i}">
                    <div class="slot-number">Слот ${i}</div>
                    <div class="slot-content">
                        <div class="slot-name">${slot.name}</div>
                        <div class="slot-info">
                            <span>📅 ${dateStr} ${timeStr}</span>
                            <span>🎯 Раунд ${slot.round}</span>
                        </div>
                    </div>
                    <button class="delete-slot-btn" data-slot="${i}">🗑️</button>
                </div>
            `;
        }
    }
    
    html += `
                </div>
                <button class="modal-close-btn" id="closeSaveModal">❌ Закрити</button>
            </div>
        </div>
    `;
    
    // Додаємо в DOM
    document.body.insertAdjacentHTML('beforeend', html);
    
    // Обробники подій
    const backdrop = document.getElementById('saveModalBackdrop');
    
    // Закриття по backdrop
    backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
            backdrop.remove();
        }
    });
    
    // Закриття по кнопці
    document.getElementById('closeSaveModal').addEventListener('click', () => {
        backdrop.remove();
    });
    
    // Клік по слоту для збереження
    document.querySelectorAll('.save-slot').forEach(slot => {
        slot.addEventListener('click', (e) => {
            // Ігноруємо клік по кнопці видалення
            if (e.target.classList.contains('delete-slot-btn')) return;
            
            const slotId = parseInt(slot.dataset.slot);
            const isEmptySlot = slot.classList.contains('empty');
            
            // Питаємо назву збереження
            const saveName = prompt(
                isEmptySlot 
                    ? '💾 Введіть назву збереження:' 
                    : '💾 Введіть назву збереження (або залиште порожнім для перезапису):',
                isEmptySlot ? '' : slots[slotId - 1]?.name || ''
            );
            
            if (saveName !== null) { // не натиснули "Скасувати"
                const finalName = saveName.trim() || `Збереження ${slotId}`;
                
                if (window.saveGameToSlot(slotId, finalName)) {
                    alert(`✅ Гру збережено в слот ${slotId}!`);
                    backdrop.remove();
                } else {
                    alert('❌ Помилка збереження!');
                }
            }
        });
    });
    
    // Кнопки видалення
    document.querySelectorAll('.delete-slot-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const slotId = parseInt(btn.dataset.slot);
            
            if (confirm(`🗑️ Видалити збереження зі слота ${slotId}?`)) {
                if (window.deleteSaveSlot(slotId)) {
                    backdrop.remove();
                    showSaveModal(); // Перевідкриваємо з оновленими даними
                }
            }
        });
    });
}

/**
 * Показує модальне вікно завантаження гри
 */
function showLoadModal() {
    // Отримуємо всі слоти
    const slots = window.getSaveSlots();
    
    // Перевіряємо чи є хоч одне збереження
    const hasAnySave = slots.some(slot => slot !== null);
    
    if (!hasAnySave) {
        alert('ℹ️ Немає збережених ігор!');
        return;
    }
    
    let html = `
        <div class="save-load-modal-backdrop" id="loadModalBackdrop">
            <div class="save-load-modal">
                <h2>📂 Завантажити гру</h2>
                <p class="modal-subtitle">Виберіть збереження для завантаження:</p>
                <div class="save-slots">
    `;
    
    // Генеруємо 4 слоти
    for (let i = 1; i <= 4; i++) {
        const slot = slots[i - 1];
        const isEmpty = !slot;
        
        if (isEmpty) {
            html += `
                <div class="save-slot empty disabled" data-slot="${i}">
                    <div class="slot-number">Слот ${i}</div>
                    <div class="slot-content">
                        <div class="empty-slot">Порожній слот</div>
                    </div>
                </div>
            `;
        } else {
            const date = new Date(slot.savedAt);
            const dateStr = date.toLocaleDateString('uk-UA');
            const timeStr = date.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });
            
            html += `
                <div class="save-slot filled clickable" data-slot="${i}">
                    <div class="slot-number">Слот ${i}</div>
                    <div class="slot-content">
                        <div class="slot-name">${slot.name}</div>
                        <div class="slot-info">
                            <span>📅 ${dateStr} ${timeStr}</span>
                            <span>🎯 Раунд ${slot.round}</span>
                        </div>
                    </div>
                </div>
            `;
        }
    }
    
    html += `
                </div>
                <button class="modal-close-btn" id="closeLoadModal">❌ Закрити</button>
            </div>
        </div>
    `;
    
    // Додаємо в DOM
    document.body.insertAdjacentHTML('beforeend', html);
    
    // Обробники подій
    const backdrop = document.getElementById('loadModalBackdrop');
    
    // Закриття по backdrop
    backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
            backdrop.remove();
        }
    });
    
    // Закриття по кнопці
    document.getElementById('closeLoadModal').addEventListener('click', () => {
        backdrop.remove();
    });
    
    // Клік по слоту для завантаження
    document.querySelectorAll('.save-slot.clickable').forEach(slot => {
        slot.addEventListener('click', () => {
            const slotId = parseInt(slot.dataset.slot);
            const slotData = slots[slotId - 1];
            
            if (confirm(`📂 Завантажити гру "${slotData.name}"?`)) {
                // Завантажуємо гру
                const gameState = window.loadGameFromSlot(slotId);
                
                if (gameState) {
                    // Перезавантажуємо сторінку з параметром
                    window.location.href = `page3.html?loadSlot=${slotId}`;
                } else {
                    alert('❌ Помилка завантаження!');
                }
            }
        });
    });
}

// Експортуємо функції
window.showSaveModal = showSaveModal;
window.showLoadModal = showLoadModal;

console.log('✅ Модальні вікна збереження/завантаження ініціалізовані');

/**
 * Показує модальне вікно завантаження для page1
 * (перенаправляє на page3 після вибору)
 */
function showLoadModalForPage1() {
    // Отримуємо всі слоти
    const slots = window.getSaveSlots();
    
    // Перевіряємо чи є хоч одне збереження
    const hasAnySave = slots.some(slot => slot !== null);
    
    if (!hasAnySave) {
        alert('ℹ️ Немає збережених ігор!');
        return;
    }
    
    let html = `
        <div class="save-load-modal-backdrop" id="loadModalBackdrop">
            <div class="save-load-modal">
                <h2>📂 Завантажити гру</h2>
                <p class="modal-subtitle">Виберіть збереження для завантаження:</p>
                <div class="save-slots">
    `;
    
    // Генеруємо 4 слоти
    for (let i = 1; i <= 4; i++) {
        const slot = slots[i - 1];
        const isEmpty = !slot;
        
        if (isEmpty) {
            html += `
                <div class="save-slot empty disabled" data-slot="${i}">
                    <div class="slot-number">Слот ${i}</div>
                    <div class="slot-content">
                        <div class="empty-slot">Порожній слот</div>
                    </div>
                </div>
            `;
        } else {
            const date = new Date(slot.savedAt);
            const dateStr = date.toLocaleDateString('uk-UA');
            const timeStr = date.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });
            
            html += `
                <div class="save-slot filled clickable" data-slot="${i}">
                    <div class="slot-number">Слот ${i}</div>
                    <div class="slot-content">
                        <div class="slot-name">${slot.name}</div>
                        <div class="slot-info">
                            <span>📅 ${dateStr} ${timeStr}</span>
                            <span>🎯 Раунд ${slot.round}</span>
                        </div>
                    </div>
                </div>
            `;
        }
    }
    
    html += `
                </div>
                <button class="modal-close-btn" id="closeLoadModal">❌ Закрити</button>
            </div>
        </div>
    `;
    
    // Додаємо в DOM
    document.body.insertAdjacentHTML('beforeend', html);
    
    // Обробники подій
    const backdrop = document.getElementById('loadModalBackdrop');
    
    // Закриття по backdrop
    backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
            backdrop.remove();
        }
    });
    
    // Закриття по кнопці
    document.getElementById('closeLoadModal').addEventListener('click', () => {
        backdrop.remove();
    });
    
    // Клік по слоту для завантаження
    document.querySelectorAll('.save-slot.clickable').forEach(slot => {
        slot.addEventListener('click', () => {
            const slotId = parseInt(slot.dataset.slot);
            const slotData = slots[slotId - 1];
            
            if (confirm(`📂 Завантажити гру "${slotData.name}"?`)) {
                // Перенаправляємо на page3 з параметром слота
                console.log(`📂 Завантаження слота ${slotId}...`);
                window.location.href = `../page3/page3.html?loadSlot=${slotId}`;
            }
        });
    });
}

// Експортуємо нову функцію
window.showLoadModalForPage1 = showLoadModalForPage1;

console.log('✅ Функція завантаження для page1 ініціалізована');