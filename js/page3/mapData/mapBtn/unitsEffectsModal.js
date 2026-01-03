// ============================================
// ЛОГІКА МОДАЛЬНОГО ВІКНА ЕФЕКТІВ ЮНІТІВ
// ============================================

/**
 * Відкриває модальне вікно з ефектами юніта
 */
function openUnitsEffectsModal() {
    // ⬇️ ЗМІНЕНО: використовуємо selectedUnitForMove
    if (!selectedUnitForMove) {
        alert("⚠️ Спочатку виберіть юніта на карті!");
        return;
    }
    
    if (modalEfectUnits) {
        // Показуємо backdrop
        const backdrop = document.querySelector('.modalEfectUnits-backdrop');
        if (backdrop) {
            backdrop.classList.add('active');
            backdrop.addEventListener('touchmove', preventScroll, { passive: false });
        }
        
        modalEfectUnits.style.display = "flex";
        displayUnitEffects(selectedUnitForMove); // ⬅️ ЗМІНЕНО
        
        // Блокуємо скрол body на мобільних
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
    }
}

function closeUnitsEffectsModal() {
    if (modalEfectUnits) {
        // Ховаємо backdrop
        const backdrop = document.querySelector('.modalEfectUnits-backdrop');
        if (backdrop) {
            backdrop.classList.remove('active');
            
            // 👇 ДОДАЙТЕ - Видаляємо обробник
            backdrop.removeEventListener('touchmove', preventScroll);
        }
        
        modalEfectUnits.style.display = "none";
        
        // Відновлюємо скрол body
        document.body.style.overflow = '';
        document.body.style.position = ''; // 👈 ДОДАНО
        document.body.style.width = ''; // 👈 ДОДАНО
    }
}

// 👇 ДОДАЙТЕ цю функцію в кінець файлу
function preventScroll(e) {
    e.preventDefault();
}

/**
 * Відображає ефекти вибраного юніта
 */
function displayUnitEffects(unit) {
    const container = document.querySelector(".modEfeUnitsItemsContainer");
    if (!container) return;
    
    // Очищаємо контейнер
    container.innerHTML = '';
    
    // Перевіряємо, чи є ефекти у юніта
    if (!unit.effects || unit.effects.length === 0) {
        container.innerHTML = '<div class="modEfeUnitsItems"><div class="modEfeUnitsItemsDescription">Немає активних ефектів</div></div>';
        return;
    }
    
    // Виводимо кожен ефект
unit.effects.forEach(effect => {
    const effectItem = document.createElement('div');
    effectItem.classList.add('modEfeUnitsItems');
    
        // Формуємо текст зі змінами характеристик
        let statsText = '';
        if (effect.attackBonus) statsText += `⚔️ Атака: +${effect.attackBonus}\n`;
        if (effect.attackBoost) statsText += `⚔️ Атака: +${effect.attackBoost}\n`;  // ← ДОДАНО для аури
        if (effect.attackBoostPercent) statsText += `⚔️ Атака: +${effect.attackBoostPercent}%\n`;  // ← Для відсотків
        if (effect.armorBonus) statsText += `🛡️ Броня: +${effect.armorBonus}\n`;
        if (effect.armorBoost) statsText += `🛡️ Броня: +${effect.armorBoost}\n`;  // ← ДОДАНО для аури
        if (effect.hpBonus) statsText += `❤️ HP: +${effect.hpBonus}\n`;
        if (effect.hpRegenPercent) statsText += `💚 Реген HP: +${effect.hpRegenPercent}%\n`;  // ← ДОДАНО для аури
        if (effect.stepBonus) statsText += `👟 Крок: +${effect.stepBonus}\n`;
        if (effect.rangeBonus) statsText += `🎯 Дальність: +${effect.rangeBonus}\n`;
    // Тривалість
    let durationText = '∞';
    if (effect.duration !== undefined && effect.duration !== null) {
        durationText = effect.turnsLeft ? `${effect.turnsLeft} ходів` : effect.duration;
    }
    
    effectItem.innerHTML = `
        <div class="modEfeUnitsItemsTitle">
            <img src="${effect.img || '../../img/map/infoTablo/swords/swords.png'}" />
            <span>${effect.name || 'Невідомий ефект'}</span>
            <div class="modEfeUnitsItmsColdwin">${durationText}</div>
        </div>
        <div class="modEfeUnitsItemsDescription">
            ${effect.description || 'Без опису'}
            ${statsText ? '<br><br><b>Зміни:</b><br>' + statsText.replace(/\n/g, '<br>') : ''}
        </div>
    `;
    
    container.appendChild(effectItem);
});
}

/**
 * Ініціалізація обробників
 */
function initUnitsEffectsModal() {
    // Обробник кнопки відкриття модального вікна
    if (BtnEfectUnitsTablo) {
        BtnEfectUnitsTablo.addEventListener('click', () => {
            openUnitsEffectsModal();
        });
    }
    
    // Обробник кнопки закриття
    if (BoxModEfeUnitsTopLineClose) {
        BoxModEfeUnitsTopLineClose.addEventListener('click', () => {
            closeUnitsEffectsModal();
        });
    }
}

// Ініціалізація після завантаження DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initUnitsEffectsModal, 200);
    });
} else {
    setTimeout(initUnitsEffectsModal, 200);
}