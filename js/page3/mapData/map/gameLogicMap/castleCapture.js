// ============================================
// СИСТЕМА ЗАХОПЛЕННЯ ЗАМКІВ
// ============================================

// Глобальний масив захоплених замків
if (!window.capturedCastles) {
    window.capturedCastles = [];
}

/**
 * Перевіряє чи юніт може захоплювати замки
 */
function canCaptureCastle(unit) {
    // 1. Тільки герої можуть захоплювати замки
    const isHero = unit.isHero === true || (unit.id && unit.id.startsWith('hero_'));
    if (isHero) {
        return true;
    }
    
    // 2. Звичайні юніти не можуть захоплювати замки
    return false;
}

/**
 * Перевіряє чи на позиції є замок
 */
function isCastle(x, y) {
    if (!mapData || !mapData[y] || !mapData[y][x]) return false;
    
    // tileType 1 - це замок
    return mapData[y][x] === 1;
}

/**
 * Знаходить замок за координатами
 */
function findCastle(x, y) {
    return window.capturedCastles.find(castle => castle.x === x && castle.y === y);
}

/**
 * Захоплює замок
 */
function captureCastle(x, y, playerIndex) {
    // Перевіряємо чи це замок
    if (!isCastle(x, y)) return false;
    
    const player = players[playerIndex];
    if (!player) return false;
    
    // Шукаємо чи замок вже захоплений
    let castle = findCastle(x, y);
    let oldOwnerIndex = null;
    
    if (castle) {
        // Замок вже захоплений, змінюємо власника
        oldOwnerIndex = castle.playerIndex;
        castle.playerIndex = playerIndex;
        console.log(`🏰 Замок (${x}, ${y}) перехоплений від гравця ${oldOwnerIndex + 1} до гравця ${playerIndex + 1}`);
    } else {
        // Перевіряємо чи це оригінальний замок
        const originalCastle = castles.find(c => c.x === x && c.y === y);
        if (originalCastle) {
            oldOwnerIndex = originalCastle.playerIndex;
            console.log(`🏰 Оригінальний замок (${x}, ${y}) гравця ${oldOwnerIndex + 1} захоплений гравцем ${playerIndex + 1}`);
        } else {
            console.log(`🏰 Нейтральний замок (${x}, ${y}) захоплений гравцем ${playerIndex + 1}`);
        }
        
        // Додаємо до захоплених замків
        window.capturedCastles.push({ x, y, playerIndex });
    }
    
    // Змінюємо візуальне відображення
    updateCastleVisual(x, y, playerIndex);
    
    // Перевіряємо чи гравець програв після втрати замку
    if (oldOwnerIndex !== null && oldOwnerIndex !== playerIndex) {
        setTimeout(() => {
            checkPlayerDefeatAfterCastleCapture(x, y, playerIndex, oldOwnerIndex);
        }, 100);
    }
    
    return true;
}

/**
 * Оновлює візуальне відображення замка
 */
function updateCastleVisual(x, y, playerIndex) {
    const cell = document.querySelector(`.cell[data-x='${x}'][data-y='${y}']`);
    if (!cell) return;
    
    const player = players[playerIndex];
    if (!player) return;
    
    // Шляхи до зображень замків різних кольорів
    const castleImages = {
        0: "../../img/map/castle/red/castleRed.jpeg",      // Червоний
        1: "../../img/map/castle/blue/castleBlue.jpeg",    // Синій 
        2: "../../img/map/castle/green/castleGreen.jpeg",  // Зелений
        3: "../../img/map/castle/yellow/castleYellow.jpeg" // Жовтий
    };
    
    // Визначаємо колір на основі originalIndex гравця
    const colorIndex = player.originalIndex % 4;
    const imagePath = castleImages[colorIndex];
    
    // Змінюємо фон клітинки
    cell.style.backgroundImage = `url(${imagePath})`;
    
    console.log(`🎨 Замок (${x}, ${y}) змінив колір на колір гравця ${playerIndex + 1}`);
}

function checkAndShowCastleCaptureButton(unit, targetX, targetY) {
    // Перевіряємо чи юніт може захоплювати замки
    if (!canCaptureCastle(unit)) {
        // Якщо юніт не може захоплювати - ховаємо кнопку
        if (window.BtnActiveCastleCapture) {
            window.BtnActiveCastleCapture.style.display = "none";
        }
        return false;
    }
    
    // Перевіряємо чи це замок
    if (!isCastle(targetX, targetY)) {
        // Якщо це не замок - ховаємо кнопку
        if (window.BtnActiveCastleCapture) {
            window.BtnActiveCastleCapture.style.display = "none";
        }
        return false;
    }

    const capturedCastle = findCastle(targetX, targetY);
    if (capturedCastle && capturedCastle.playerIndex === unit.playerIndex) {
        // Замок вже належить цьому гравцю - не показуємо кнопку
        if (window.BtnActiveCastleCapture) {
            window.BtnActiveCastleCapture.style.display = "none";
        }
        console.log('🏰 Замок вже належить цьому гравцю');
        return false;
    }
    
    // Перевіряємо чи юніт вже завершив хід
    if (unit.moved && unit.attacked) {
        // Юніт вже завершив хід - не показуємо кнопку
        if (window.BtnActiveCastleCapture) {
            window.BtnActiveCastleCapture.style.display = "none";
        }
        return false;
    }
    
    // Юніт може захопити замок - показуємо кнопку
    if (window.BtnActiveCastleCapture) {
        window.BtnActiveCastleCapture.style.display = "block";
        console.log('🏰 Показано кнопку захоплення замку');
        
        // ДЕБАГ ІНФОРМАЦІЯ
        console.log('📍 Позиція кнопки:', window.BtnActiveCastleCapture.getBoundingClientRect());
        console.log('🎨 Стилі кнопки:', {
            display: window.BtnActiveCastleCapture.style.display,
            top: window.BtnActiveCastleCapture.style.top,
            right: window.BtnActiveCastleCapture.style.right,
            zIndex: window.BtnActiveCastleCapture.style.zIndex,
            position: window.BtnActiveCastleCapture.style.position
        });
        
        // Перевірка чи кнопка в DOM
        console.log('🔍 Кнопка в DOM?:', document.body.contains(window.BtnActiveCastleCapture));
        console.log('👁️ Видимість кнопки:', window.BtnActiveCastleCapture.offsetParent !== null);
    } else {
        console.log('❌ Кнопка BtnActiveCastleCapture не знайдена!');
        console.log('🔍 Шукаємо кнопку в DOM:');
        const foundBtn = document.getElementById('btnActiveCastleCapture');
        console.log('Знайдено кнопку по id:', foundBtn);
    }
    
    return true;
}

/**
 * Виконує захоплення замку при натисканні кнопки
 */
function executeCaptureCastle() {
    // Перевіряємо чи є вибраний юніт
    if (!selectedUnitForMove) {
        console.log('❌ Немає вибраного юніта для захоплення замку');
        return;
    }
    
    const unit = selectedUnitForMove;
    const x = unit.x;
    const y = unit.y;
    
    // Перевіряємо чи юніт може захоплювати замки
    if (!canCaptureCastle(unit)) {
        alert('⚠️ Цей юніт не може захоплювати замки! Тільки герої можуть захоплювати замки.');
        return;
    }
    
    // Перевіряємо чи це замок
    if (!isCastle(x, y)) {
        alert('⚠️ Тут немає замку!');
        return;
    }
    
    // Захоплюємо замок
    const captured = captureCastle(x, y, unit.playerIndex);
    
    if (captured) {
        // Показуємо повідомлення
        showCastleCaptureMessage(x, y);
        
        // Завершуємо хід юніта
        unit.moved = true;
        unit.attacked = true; // Також блокуємо атаку
        
        // Очищаємо жовті клітинки руху
        if (typeof clearMoveCells === 'function') {
            clearMoveCells();
        } else if (typeof window.clearMoveCells === 'function') {
            window.clearMoveCells();
        }
        
        // Видаляємо обробники кліків з клітинок руху
        document.querySelectorAll(".moveCellMap").forEach(cell => {
            const newCell = cell.cloneNode(true);
            cell.parentNode.replaceChild(newCell, cell);
        });
        
        // Оновлюємо візуальний стан юніта
        if (typeof updateUnitVisualState === 'function') {
            updateUnitVisualState(unit);
        }
        
        // Ховаємо кнопку
        window.BtnActiveCastleCapture.style.display = "none";
        
        console.log('✅ Замок захоплений, хід юніта завершено');
    }
}

/**
 * Показує повідомлення про захоплення замку
 */
function showCastleCaptureMessage(x, y) {
    const popup = document.createElement('div');
    popup.innerText = '🏰 Замок захоплено!';
    popup.style.position = 'absolute';
    popup.style.left = `${x * cellSizeAll + 15}px`;
    popup.style.top = `${y * cellSizeAll - 10}px`;
    popup.style.color = 'gold';
    popup.style.fontWeight = 'bold';
    popup.style.fontSize = '18px';
    popup.style.pointerEvents = 'none';
    popup.style.zIndex = '9999';
    popup.style.textShadow = '2px 2px 4px rgba(0,0,0,0.8)';
    
    map.appendChild(popup);
    
    // Анімація
    popup.animate([
        { transform: 'translateY(0px)', opacity: 1 },
        { transform: 'translateY(-40px)', opacity: 0 }
    ], {
        duration: 2000,
        easing: 'ease-out'
    });
    
    setTimeout(() => popup.remove(), 2000);
}

/**
 * Ініціалізація системи захоплення замків
 */
function initCastleCaptureSystem() {
    console.log('🔧 Ініціалізація системи захоплення замків...');
    
    // Створюємо кнопку захоплення замку, якщо її немає
    if (!window.BtnActiveCastleCapture) {
        console.log('🆕 Створюємо нову кнопку захоплення замку...');
        
        const btn = document.createElement('button');
        btn.id = 'btnActiveCastleCapture';
        btn.className = 'castle-capture-btn';
        btn.innerText = '🏰 Захопити замок';
        btn.style.position = 'fixed';
        btn.style.top = '50%';
        btn.style.left = '50%';
        btn.style.width = '10%';
        btn.style.transform = 'translate(-50%, -50%)';
        btn.style.zIndex = '9999';
        btn.style.display = 'none';
        btn.style.padding = '8px 16px'; // ЗМЕНШЕНО: було 15px 25px
        btn.style.backgroundColor = '#8B4513';
        btn.style.color = 'white';
        btn.style.border = '2px solid gold'; // ЗМЕНШЕНО: було 3px
        btn.style.borderRadius = '6px'; // ЗМЕНШЕНО: було 10px
        btn.style.fontWeight = 'bold';
        btn.style.fontSize = '14px'; // ЗМЕНШЕНО: було 18px
        btn.style.cursor = 'pointer';
        btn.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.3)'; // ЗМЕНШЕНО: було 0 4px 8px
        
        document.body.appendChild(btn);
        window.BtnActiveCastleCapture = btn;
        
        console.log('✅ Кнопка створена та додана до DOM');
        console.log('📏 Розміри кнопки:', btn.getBoundingClientRect());
    } else {
        console.log('✅ Кнопка вже існує');
    }
    
    // Обробник кнопки захоплення
    if (window.BtnActiveCastleCapture) {
        window.BtnActiveCastleCapture.addEventListener('click', executeCaptureCastle);
        window.BtnActiveCastleCapture.style.display = "none"; // За замовчуванням схована
        console.log('✅ Обробник подій додано');
    }
    
    console.log('✅ Система захоплення замків ініціалізована');
}

// Ініціалізуємо після завантаження DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initCastleCaptureSystem, 300);
    });
} else {
    setTimeout(initCastleCaptureSystem, 300);
}

// Експортуємо функції для використання в інших файлах
window.checkAndShowCastleCaptureButton = checkAndShowCastleCaptureButton;
window.executeCaptureCastle = executeCaptureCastle;
window.canCaptureCastle = canCaptureCastle;
window.captureCastle = captureCastle;
window.updateCastleVisual = updateCastleVisual;




/**
 * Перевіряє чи гравець програв після втрати останнього замку
 */
function checkPlayerDefeatAfterCastleCapture(capturedCastleX, capturedCastleY, newOwnerIndex, oldOwnerIndex) {
    console.log(`🔍 Перевірка поразки гравця ${oldOwnerIndex + 1}...`);
    
    // 1. Перевіряємо захоплені замки
    const capturedPlayerCastles = window.capturedCastles.filter(castle => 
        castle.playerIndex === oldOwnerIndex && 
        !(castle.x === capturedCastleX && castle.y === capturedCastleY)
    );
    console.log(`🎯 Захоплені замки гравця ${oldOwnerIndex + 1}:`, capturedPlayerCastles.length);
    
    // 2. Перевіряємо оригінальні замки (які ще не захоплені)
    const originalPlayerCastles = castles.filter(castle => 
        castle.playerIndex === oldOwnerIndex &&
        !window.capturedCastles.some(c => c.x === castle.x && c.y === castle.y)
    );
    console.log(`🎯 Оригінальні незахоплені замки гравця ${oldOwnerIndex + 1}:`, originalPlayerCastles.length);
    
    // Якщо у гравця ще є замки - не програш
    if (capturedPlayerCastles.length > 0 || originalPlayerCastles.length > 0) {
        console.log(`🎯 Гравець ${oldOwnerIndex + 1} ще має замки`);
        return false;
    }
    
    // Перевіряємо чи у гравця ще є юніти на карті
    const playerUnits = unitsOnMap.filter(unit => unit.playerIndex === oldOwnerIndex);
    console.log(`🎯 Юніти гравця ${oldOwnerIndex + 1}:`, playerUnits.length);
    
    if (playerUnits.length > 0) {
        console.log(`🎯 Гравець ${oldOwnerIndex + 1} ще має ${playerUnits.length} юнітів`);
        return false;
    }
    
    // Гравець програв! Немає замків і немає юнітів
    console.log(`💀 Гравець ${oldOwnerIndex + 1} програв! Немає замків і юнітів`);
    
    // Робимо всі хатки гравця вільними (без кольору)
    freePlayerGoldHouses(oldOwnerIndex);
    
    // Можна додати додаткову логіку (повідомлення, анімацію тощо)
    showPlayerDefeatMessage(oldOwnerIndex);
    
    return true;
}

/**
 * Робить всі хатки гравця вільними (без кольору)
 */
function freePlayerGoldHouses(playerIndex) {
    if (!window.capturedGoldHouses) return;
    
    const playerHouses = window.capturedGoldHouses.filter(house => house.playerIndex === playerIndex);
    
    playerHouses.forEach(house => {
        // Видаляємо захоплення хатки
        const houseIndex = window.capturedGoldHouses.findIndex(h => 
            h.x === house.x && h.y === house.y
        );
        
        if (houseIndex !== -1) {
            window.capturedGoldHouses.splice(houseIndex, 1);
        }
        
        // Відновлюємо нейтральне зображення хатки
        const cell = document.querySelector(`.cell[data-x='${house.x}'][data-y='${house.y}']`);
        if (cell && tileImages[2]) {
            cell.style.backgroundImage = `url(${tileImages[2]})`;
        }
        
        console.log(`🏠 Хатка (${house.x}, ${house.y}) стала вільною`);
    });
    
    console.log(`🔄 Звільнено ${playerHouses.length} хаток гравця ${playerIndex + 1}`);
}

/**
 * Показує повідомлення про поразку гравця
 */
function showPlayerDefeatMessage(playerIndex) {
    const player = players[playerIndex];
    if (!player) return;
    
    const message = document.createElement('div');
    message.innerHTML = `💀 <strong>Гравець ${playerIndex + 1} програв!</strong><br>Всі хатки стали вільними`;
    message.style.position = 'fixed';
    message.style.top = '20%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    message.style.zIndex = '10000';
    message.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    message.style.color = 'white';
    message.style.padding = '20px';
    message.style.borderRadius = '10px';
    message.style.fontSize = '18px';
    message.style.textAlign = 'center';
    message.style.boxShadow = '0 0 20px rgba(255, 0, 0, 0.5)';
    
    document.body.appendChild(message);
    
    // Автоматично видаляємо через 5 секунд
    setTimeout(() => {
        if (message.parentNode) {
            message.parentNode.removeChild(message);
        }
    }, 5000);
}