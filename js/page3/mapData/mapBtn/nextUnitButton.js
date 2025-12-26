// ============================================
// КНОПКА "ДАЛІ" - ПЕРЕМИКАННЯ НА НАСТУПНОГО ЮНІТА
// ============================================

let currentUnitIndex = -1; // Індекс поточного вибраного юніта

/**
 * Знаходить наступного юніта, який ще не завершив хід
 */
function findNextAvailableUnit() {
    const currentPlayer = players[currentPlayerIndex];
    if (!currentPlayer) {
        console.warn('❌ Поточний гравець не знайдений');
        return null;
    }
    
    // Фільтруємо юнітів поточного гравця, які ще не завершили хід
    const playerUnits = unitsOnMap.filter(u => 
        u.playerIndex === currentPlayerIndex && 
        (!u.moved || !u.attacked)
    );
    
    if (playerUnits.length === 0) {
        console.log('ℹ️ Всі юніти завершили хід');
        return null;
    }
    
    // Знаходимо індекс поточного юніта в масиві доступних юнітів
    let currentIndex = -1;
    if (selectedUnitForMove) {
        currentIndex = playerUnits.findIndex(u => u === selectedUnitForMove);
    }
    
    // Беремо наступного юніта (циклічно)
    const nextIndex = (currentIndex + 1) % playerUnits.length;
    return playerUnits[nextIndex];
}

/**
 * Переключає на наступного доступного юніта
 */
/**
 * Переключає на наступного доступного юніта
 */
function selectNextUnit() {
    const nextUnit = findNextAvailableUnit();
    
    if (!nextUnit) {
        console.log('ℹ️ Немає доступних юнітів для вибору');
        return;
    }
    
    // ⬇️ НОВИЙ КОД: Центруємо камеру на юніті
    if (window.mapMovement && typeof window.mapMovement.centerOnCell === 'function') {
        window.mapMovement.centerOnCell(nextUnit.x, nextUnit.y);
    }
    
   // Знаходимо візуальний елемент юніта (враховуємо wrapper з health bar)
let cellPlayer = null;

// Спочатку шукаємо серед wrapper'ів
const wrappers = Array.from(map.querySelectorAll('.unit-wrapper'));
for (const wrapper of wrappers) {
    const wrapperX = parseInt(wrapper.dataset.x);
    const wrapperY = parseInt(wrapper.dataset.y);
    
    if (wrapperX === nextUnit.x && wrapperY === nextUnit.y) {
        // Знайшли wrapper - шукаємо cellPlayer всередині
        cellPlayer = wrapper.querySelector('.cellPlayer');
        break;
    }
}

// Якщо не знайшли у wrapper - шукаємо напряму (старі юніти)
if (!cellPlayer) {
    cellPlayer = Array.from(map.querySelectorAll('.cellPlayer')).find(img => {
        const imgX = parseInt(img.dataset.x);
        const imgY = parseInt(img.dataset.y);
        return imgX === nextUnit.x && imgY === nextUnit.y;
    });
}

if (cellPlayer && typeof handleUnitClick === 'function') {
    // Викликаємо функцію вибору юніта
    handleUnitClick(nextUnit, cellPlayer);
    
    console.log(`✅ Вибрано наступного юніта: ${nextUnit.name} на (${nextUnit.x}, ${nextUnit.y})`);
} else {
    console.warn('⚠️ Не вдалося знайти візуальний елемент юніта', {
        unit: nextUnit.name,
        x: nextUnit.x,
        y: nextUnit.y,
        wrappers: wrappers.length
    });
}
}

/**
 * Ініціалізація обробника кнопки "Далі"
 */
function initNextUnitButton() {
    if (!BtnNextTablo) {
        console.warn('❌ Кнопка BtnNextTablo не знайдена');
        return;
    }
    
    BtnNextTablo.addEventListener('click', () => {
        selectNextUnit();
    });
    
    //console.log('✅ Кнопка "Далі" ініціалізована');
}

// Ініціалізуємо після завантаження DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initNextUnitButton, 350);
    });
} else {
    setTimeout(initNextUnitButton, 350);
}

// Експортуємо функції для використання в інших файлах
window.selectNextUnit = selectNextUnit;
window.findNextAvailableUnit = findNextAvailableUnit;