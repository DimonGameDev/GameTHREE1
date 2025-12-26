// ============================================
// СИСТЕМА HEALTH BAR ДЛЯ ЮНІТІВ
// ============================================

/**
 * Створює health bar для юніта
 * @param {Object} unit - об'єкт юніта
 * @returns {HTMLElement} - wrapper з юнітом і health bar
 */
function createUnitWithHealthBar(unit, imgElement) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('unit-wrapper');
    wrapper.style.position = 'absolute';
    wrapper.style.width = cellSizeAll + 'px';
    wrapper.style.height = cellSizeAll + 'px';
    wrapper.style.top = (unit.y * cellSizeAll) + 'px';
    wrapper.style.left = (unit.x * cellSizeAll) + 'px';
    wrapper.style.pointerEvents = 'none';
    wrapper.dataset.unitId = unit.id || 'temp';
    wrapper.dataset.x = unit.x;
    wrapper.dataset.y = unit.y;
    
    // Додаємо зображення юніта
    imgElement.style.position = 'relative';
    imgElement.style.top = '0';
    imgElement.style.left = '0';
    imgElement.style.width = '100%';
    imgElement.style.height = '100%';
    
    wrapper.appendChild(imgElement);
    
    // Створюємо health bar
    const healthBarContainer = document.createElement('div');
    healthBarContainer.classList.add('unit-health-bar');
    
    const healthFill = document.createElement('div');
    healthFill.classList.add('unit-health-fill');
    
    // Обчислюємо відсоток HP
    const currentHp = unit.newhp !== undefined ? unit.newhp : unit.hp;
    const maxHp = unit.maxHp || unit.hp;
    const hpPercent = (currentHp / maxHp) * 100;
    
    healthFill.style.width = hpPercent + '%';
    
    // Визначаємо колір
    healthFill.classList.add(getHealthColorClass(hpPercent));
    
    healthBarContainer.appendChild(healthFill);
    wrapper.appendChild(healthBarContainer);
    
    return wrapper;
}

/**
 * Оновлює health bar юніта
 * @param {Object} unit - об'єкт юніта
 */
window.updateUnitHealthBar = function(unit) {
    // Знаходимо wrapper юніта
    const wrapper = document.querySelector(`.unit-wrapper[data-unit-id="${unit.id}"]`);
    
    if (!wrapper) {
        console.warn('⚠️ Health bar wrapper не знайдено для юніта:', unit.name);
        return;
    }
    
    const healthFill = wrapper.querySelector('.unit-health-fill');
    
    if (!healthFill) {
        console.warn('⚠️ Health fill не знайдено для юніта:', unit.name);
        return;
    }
    
    // Обчислюємо відсоток HP
    const currentHp = unit.newhp !== undefined ? unit.newhp : unit.hp;
    const maxHp = unit.maxHp || unit.hp;
    const hpPercent = Math.max(0, (currentHp / maxHp) * 100);
    
    // Оновлюємо ширину
    healthFill.style.width = hpPercent + '%';
    
    // Оновлюємо колір
    // ✅ ВИПРАВЛЕНО: Зберігаємо клас inactive-player-health якщо він є
const hasInactiveClass = healthFill.classList.contains('inactive-player-health');

// Видаляємо старі класи кольорів
healthFill.classList.remove('health-high', 'health-medium', 'health-low', 'health-critical');

// Додаємо новий клас кольору
healthFill.classList.add(getHealthColorClass(hpPercent));

// Відновлюємо клас inactive-player-health якщо він був
if (hasInactiveClass) {
    healthFill.classList.add('inactive-player-health');
}
    
    console.log(`💚 Оновлено health bar: ${unit.name} (${Math.round(hpPercent)}%)`);
};

/**
 * Визначає клас кольору health bar в залежності від HP
 * @param {number} hpPercent - відсоток HP
 * @returns {string} - назва CSS класу
 */
function getHealthColorClass(hpPercent) {
    if (hpPercent > 60) return 'health-high';
    if (hpPercent > 30) return 'health-medium';
    if (hpPercent > 15) return 'health-low';
    return 'health-critical';
}

/**
 * Оновлює позицію wrapper юніта
 * @param {Object} unit - об'єкт юніта
 * @param {number} x - нова X координата
 * @param {number} y - нова Y координата
 */
window.updateUnitWrapperPosition = function(unit, x, y) {
    const wrapper = document.querySelector(`.unit-wrapper[data-unit-id="${unit.id}"]`);
    
    if (wrapper) {
        wrapper.style.left = (x * cellSizeAll) + 'px';
        wrapper.style.top = (y * cellSizeAll) + 'px';
        wrapper.dataset.x = x;
        wrapper.dataset.y = y;
    }
};

//console.log('✅ Health Bar система ініціалізована!');