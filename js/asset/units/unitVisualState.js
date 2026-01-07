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
    
    // Знаходимо health fill для зміни кольору
    const healthFill = wrapper.querySelector('.unit-health-fill');
    
    // Перевіряємо стани юніта
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
    
    // Оновлюємо колір HP bar тільки для активного гравця
    if (healthFill && unit.playerIndex === currentPlayerIndex) {
        // Видаляємо класи станів
        healthFill.classList.remove('unit-moved-only', 'unit-fresh');
        
        // Додаємо відповідний клас
        if (unit.moved) {
            // Юніт пересунувся - жовтий
            healthFill.classList.add('unit-moved-only');
        } else {
            // Юніт не пересувався - зелений
            healthFill.classList.add('unit-fresh');
        }
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
        
        // Спочатку видаляємо всі класи станів
        healthFill.classList.remove('inactive-player-health', 'unit-moved-only', 'unit-fresh');
        
        if (unit.playerIndex === currentPlayerIndex) {
            // Активний гравець
            if (unit.moved) {
                // Пересунувся - жовтий
                healthFill.classList.add('unit-moved-only');
            } else {
                // Не пересувався - зелений
                healthFill.classList.add('unit-fresh');
            }
        } else {
            // Неактивні гравці - помаранчевий колір
            healthFill.classList.add('inactive-player-health');
        }
    });
}

// Експортуємо функції в глобальну область
window.updateAllUnitsVisualState = updateAllUnitsVisualState;
window.updateUnitVisualState = updateUnitVisualState;
window.resetPlayerUnitsVisualState = resetPlayerUnitsVisualState;
window.updateActivePlayerUnitsVisuals = updateActivePlayerUnitsVisuals;

//console.log('✅ Модуль візуального стану юнітів завантажено');