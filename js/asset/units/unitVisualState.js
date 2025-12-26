// ============================================
// ОНОВЛЕННЯ ВІЗУАЛЬНОГО СТАНУ ЮНІТІВ
// ============================================

/**
 * Оновлює візуальний стан всіх юнітів на карті
 */
function updateAllUnitsVisualState() {
    unitsOnMap.forEach(unit => {
        updateUnitVisualState(unit);
    });
}

/**
 * Оновлює візуальний стан одного юніта
 */
function updateUnitVisualState(unit) {
    // Спочатку шукаємо wrapper
    const wrapper = document.querySelector(
        `.unit-wrapper[data-unit-id="${unit.id}"]`
    );
    
    if (!wrapper) {
        console.warn(`⚠️ Wrapper для юніта ${unit.name || 'невідомий'} (ID: ${unit.id}) не знайдено`);
        return;
    }
    
    // Знаходимо cellPlayer всередині wrapper
    const cellPlayer = wrapper.querySelector('.cellPlayer');
    
    if (!cellPlayer) {
        console.warn(`⚠️ Візуальний елемент для юніта на (${unit.x}, ${unit.y}) не знайдено`);
        return;
    }
    
    // Перевіряємо чи юніт закінчив хід (і ходив, і атакував)
    const isExhausted = unit.moved && unit.attacked;
    
    // Додаємо або видаляємо клас exhausted
    if (isExhausted) {
        cellPlayer.classList.add('unit-exhausted');
    } else {
        cellPlayer.classList.remove('unit-exhausted');
    }
    
    // Додаємо або видаляємо клас active-player
    if (unit.playerIndex === currentPlayerIndex) {
        cellPlayer.classList.add('active-player-unit');
    } else {
        cellPlayer.classList.remove('active-player-unit');
    }
}

/**
 * Скидає візуальний стан для всіх юнітів гравця
 */
function resetPlayerUnitsVisualState(playerIndex) {
    unitsOnMap.forEach(unit => {
        if (unit.playerIndex === playerIndex) {
            // Шукаємо через wrapper
            const wrapper = document.querySelector(
                `.unit-wrapper[data-unit-id="${unit.id}"]`
            );
            
            if (wrapper) {
                const cellPlayer = wrapper.querySelector('.cellPlayer');
                if (cellPlayer) {
                    cellPlayer.classList.remove('unit-exhausted');
                }
            }
        }
    });
    console.log(`✅ Візуальний стан скинуто для юнітів гравця ${playerIndex + 1}`);
}

/**
 * Оновлює підсвічування клітинок під усіма юнітами
 */
function updateActivePlayerUnitsVisuals() {
    // Оновлюємо колір health bar всіх юнітів
    unitsOnMap.forEach(unit => {
        const wrapper = document.querySelector(`.unit-wrapper[data-unit-id="${unit.id}"]`);
        if (!wrapper) return;
        
        const healthFill = wrapper.querySelector('.unit-health-fill');
        if (!healthFill) return;
        
        if (unit.playerIndex === currentPlayerIndex) {
            // Активний гравець - стандартний зелений колір (видаляємо клас)
            healthFill.classList.remove('inactive-player-health');
        } else {
            // Неактивні гравці - помаранчевий колір
            healthFill.classList.add('inactive-player-health');
        }
    });
    
   // console.log(`✅ Оновлено колір health bar для гравця ${currentPlayerIndex + 1}`);
}

// Експортуємо функції в глобальну область
window.updateAllUnitsVisualState = updateAllUnitsVisualState;
window.updateUnitVisualState = updateUnitVisualState;
window.resetPlayerUnitsVisualState = resetPlayerUnitsVisualState;
window.updateActivePlayerUnitsVisuals = updateActivePlayerUnitsVisuals;

//console.log('✅ Модуль візуального стану юнітів завантажено');