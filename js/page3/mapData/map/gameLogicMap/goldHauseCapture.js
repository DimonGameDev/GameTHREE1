// ============================================
// СИСТЕМА ЗАХОПЛЕННЯ ХАТОК ЗОЛОТА
// ============================================

// Масив захоплених хаток золота: { x, y, playerIndex }
let capturedGoldHouses = [];

/**
 * Перевіряє чи юніт може захоплювати хатки (перший воїн кожної раси)
 */
function canCaptureGoldHouse(unit) {
    if (!unit.unitId) return false;
    
    // Перший воїн має ID що закінчується на 101: orc101, pipl101, elf101, demon101, beetle101
    const canCapture = unit.unitId.endsWith('101');
    
    return canCapture;
}

/**
 * Перевіряє чи на позиції є хатка золота
 */
function isGoldHouse(x, y) {
    if (!mapData || !mapData[y] || !mapData[y][x]) return false;
    
    // tileType 2 - це хатка золота
    return mapData[y][x] === 2;
}

/**
 * Знаходить хатку золота за координатами
 */
function findGoldHouse(x, y) {
    return capturedGoldHouses.find(house => house.x === x && house.y === y);
}

/**
 * Захоплює хатку золота
 */
function captureGoldHouse(x, y, playerIndex) {
    // Перевіряємо чи це хатка золота
    if (!isGoldHouse(x, y)) return false;
    
    const player = players[playerIndex];
    if (!player) return false;
    
    // Шукаємо чи хатка вже захоплена
    let house = findGoldHouse(x, y);
    
    if (house) {
        // Хатка вже захоплена, змінюємо власника
        const oldOwner = house.playerIndex;
        house.playerIndex = playerIndex;
        console.log(`🏠 Хатка золота (${x}, ${y}) перехоплена від гравця ${oldOwner + 1} до гравця ${playerIndex + 1}`);
    } else {
        // Нова захоплена хатка
        capturedGoldHouses.push({ x, y, playerIndex });
        console.log(`🏠 Хатка золота (${x}, ${y}) захоплена гравцем ${playerIndex + 1}`);
    }
    
    // Змінюємо візуальне відображення
    updateGoldHouseVisual(x, y, playerIndex);
    
    return true;
}

/**
 * Оновлює візуальне відображення хатки золота
 */
function updateGoldHouseVisual(x, y, playerIndex) {
    const cell = document.querySelector(`.cell[data-x='${x}'][data-y='${y}']`);
    if (!cell) return;
    
    const player = players[playerIndex];
    if (!player) return;
    
    // Шляхи до зображень хаток різних кольорів
    const goldHouseImages = {
        0: "../../img/map/hausGold/red/hausGoldRed.jpeg",     // Червоний
        1: "../../img/map/hausGold/blue/hausGoldBlue.jpeg",      // Синій 
        2: "../../img/map/hausGold/green/hausGoldGreen.jpeg",   // Зелений
        3: "../../img/map/hausGold/yellow/hausGoldYellow.jpeg"  // Жовтий
    };
    
    // Визначаємо колір на основі originalIndex гравця
    const colorIndex = player.originalIndex % 4;
    const imagePath = goldHouseImages[colorIndex];
    
    // Змінюємо фон клітинки
    cell.style.backgroundImage = `url(${imagePath})`;
    
    console.log(`🎨 Хатка (${x}, ${y}) змінила колір на колір гравця ${playerIndex + 1}`);
}
/**
 * Отримує шлях до картинки клітинки (з урахуванням захоплених хаток)
 */
/**
 * Отримує шлях до картинки клітинки (з урахуванням захоплених хаток та замків)
 */
function getTileImage(x, y, tileType) {
    // ✅ ДОДАНО: Обробка замків (tileType === 1)
    if (tileType === 1) {
        // Знаходимо замок за координатами
        const castle = castles.find(c => c.x === x && c.y === y);
        
        if (castle) {
            const originalIndex = castle.playerIndex;
            const activePlayer = players.find(p => p.originalIndex === originalIndex);
            
            // Масив кольорових замків
            const castleImages = [
                "../../img/map/castle/red/castleRed.jpeg",      // Гравець 1
                "../../img/map/castle/blue/castleBlue.jpeg",    // Гравець 2
                "../../img/map/castle/green/castleGreen.jpeg",  // Гравець 3
                "../../img/map/castle/yellow/castleYellow.jpeg" // Гравець 4
            ];
            
            if (activePlayer) {
                // Активний гравець - кольоровий замок
                return castleImages[originalIndex];
            } else {
                // Неактивний гравець - нейтральний замок
                return "../../img/map/castle/castleStartFon/castleStartFon.jpeg";
            }
        }
    }
    
    // Перевіряємо чи це хатка золота (tileType === 2)
    if (tileType === 2) {
        // Шукаємо чи хатка захоплена
        const capturedHouse = findGoldHouse(x, y);
        
        if (capturedHouse) {
            // Хатка захоплена - повертаємо картинку відповідного кольору
            const player = players[capturedHouse.playerIndex];
            if (player) {
                const goldHouseImages = {
                    0: "../../img/map/hausGold/red/hausGoldRed.jpeg",
                    1: "../../img/map/hausGold/blue/hausGoldBlue.jpeg",
                    2: "../../img/map/hausGold/green/hausGoldGreen.jpeg",
                    3: "../../img/map/hausGold/yellow/hausGoldYellow.jpeg"
                };
                
                const colorIndex = player.originalIndex;
                return goldHouseImages[colorIndex] || tileImages[2];
            }
        }
    }
    
    // Інші типи клітинок - звичайне зображення
    return tileImages[tileType];
}
/**
 * Перевіряє чи юніт стоїть на хатці і може її захопити
 * Показує кнопку захоплення замість автоматичного захоплення
 */
function checkAndShowCaptureButton(unit, targetX, targetY) {
    // Перевіряємо чи юніт може захоплювати
    if (!canCaptureGoldHouse(unit)) {
        // Якщо юніт не може захоплювати - ховаємо кнопку
        if (BtnActiveHauseGoldCapture) {
            BtnActiveHauseGoldCapture.style.display = "none";
        }
        return false;
    }
    
    // Перевіряємо чи це хатка золота
    if (!isGoldHouse(targetX, targetY)) {
        // Якщо це не хатка - ховаємо кнопку
        if (BtnActiveHauseGoldCapture) {
            BtnActiveHauseGoldCapture.style.display = "none";
        }
        return false;
    }

    const capturedHouse = findGoldHouse(targetX, targetY);
if (capturedHouse && capturedHouse.playerIndex === unit.playerIndex) {
    // Хатка вже належить цьому гравцю - не показуємо кнопку
    if (BtnActiveHauseGoldCapture) {
        BtnActiveHauseGoldCapture.style.display = "none";
    }
    console.log('🏠 Хатка вже належить цьому гравцю');
    return false;
}
    
    // ⬇️ НОВИЙ КОД: Перевіряємо чи юніт вже завершив хід
    if (unit.moved && unit.attacked) {
        // Юніт вже завершив хід - не показуємо кнопку
        if (BtnActiveHauseGoldCapture) {
            BtnActiveHauseGoldCapture.style.display = "none";
        }
        return false;
    }
    
    // Юніт може захопити хатку - показуємо кнопку
    if (BtnActiveHauseGoldCapture) {
        BtnActiveHauseGoldCapture.style.display = "block";
        console.log('🏠 Показано кнопку захоплення хатки');
    }
    
    return true;
}

/**
 * Виконує захоплення хатки при натисканні кнопки
 */
function executeCaptureGoldHouse() {
    // Перевіряємо чи є вибраний юніт
    if (!selectedUnitForMove) {
        console.log('❌ Немає вибраного юніта для захоплення');
        return;
    }
    
    const unit = selectedUnitForMove;
    const x = unit.x;
    const y = unit.y;
    
    // Перевіряємо чи юніт може захоплювати
    if (!canCaptureGoldHouse(unit)) {
        alert('⚠️ Цей юніт не може захоплювати хатки!');
        return;
    }
    
    // Перевіряємо чи це хатка золота
    if (!isGoldHouse(x, y)) {
        alert('⚠️ Тут немає хатки золота!');
        return;
    }
    
    // Захоплюємо хатку
    const captured = captureGoldHouse(x, y, unit.playerIndex);
    
    if (captured) {
        // Показуємо повідомлення
        showCaptureMessage(x, y);
        
        // ⬇️ ВАЖЛИВО: Завершуємо хід юніта
        unit.moved = true;
        unit.attacked = true; // Також блокуємо атаку
        
        // ⬇️ ДОДАНО: Очищаємо жовті клітинки руху
        if (typeof clearMoveCells === 'function') {
            clearMoveCells();
        } else if (typeof window.clearMoveCells === 'function') {
            window.clearMoveCells();
        }
        
        // ⬇️ ДОДАНО: Видаляємо обробники кліків з клітинок руху
        document.querySelectorAll(".moveCellMap").forEach(cell => {
            const newCell = cell.cloneNode(true);
            cell.parentNode.replaceChild(newCell, cell);
        });
        
        // Оновлюємо візуальний стан юніта
        if (typeof updateUnitVisualState === 'function') {
            updateUnitVisualState(unit);
        }
        
        // Ховаємо кнопку
        BtnActiveHauseGoldCapture.style.display = "none";
        
        console.log('✅ Хатка захоплена, хід юніта завершено');
    }
}

// Експортуємо функцію
// window.getTileImage = getTileImage;
/**
 * Перевіряє та захоплює хатку при переміщенні юніта
 */
function checkAndCaptureGoldHouse(unit, targetX, targetY) {
    // Перевіряємо чи юніт може захоплювати
    if (!canCaptureGoldHouse(unit)) {
        return false;
    }
    
    // Перевіряємо чи це хатка золота
    if (!isGoldHouse(targetX, targetY)) {
        return false;
    }
    
    // Захоплюємо хатку
    const captured = captureGoldHouse(targetX, targetY, unit.playerIndex);
    
    if (captured) {
        // Показуємо повідомлення
        showCaptureMessage(targetX, targetY);
    }
    
    return captured;
}

/**
 * Показує повідомлення про захоплення
 */
function showCaptureMessage(x, y) {
    const popup = document.createElement('div');
    popup.innerText = '🏠 Захоплено!';
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
 * Підраховує золото за захоплені хатки для гравця
 */
function addGoldForCapturedHouses(playerIndex) {
    const playerHouses = capturedGoldHouses.filter(house => house.playerIndex === playerIndex);
    const houseCount = playerHouses.length;
    
    // Кожна хатка дає +30 золота
    const goldPerHouse = 30;
    const totalGold = houseCount * goldPerHouse;
    
    if (totalGold > 0 && players[playerIndex]) {
        players[playerIndex].gold += totalGold;
        console.log(`💰 Гравець ${playerIndex + 1} отримав ${totalGold} золота за ${houseCount} хаток`);
    }
    
    return totalGold;
}

// Експортуємо функції для використання в інших файлах
window.checkAndCaptureGoldHouse = checkAndCaptureGoldHouse;
window.addGoldForCapturedHouses = addGoldForCapturedHouses;
window.canCaptureGoldHouse = canCaptureGoldHouse;


/**
 * Ініціалізація системи захоплення хаток
 */
function initGoldHouseCaptureSystem() {
    // Обробник кнопки захоплення
    if (BtnActiveHauseGoldCapture) {
        BtnActiveHauseGoldCapture.addEventListener('click', executeCaptureGoldHouse);
        BtnActiveHauseGoldCapture.style.display = "none"; // За замовчуванням схована
        //console.log('✅ Кнопка захоплення хаток ініціалізована');
    }
}

// Ініціалізуємо після завантаження DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initGoldHouseCaptureSystem, 300);
    });
} else {
    setTimeout(initGoldHouseCaptureSystem, 300);
}

// Експортуємо функції для використання в інших файлах
window.checkAndShowCaptureButton = checkAndShowCaptureButton;
window.executeCaptureGoldHouse = executeCaptureGoldHouse;
window.addGoldForCapturedHouses = addGoldForCapturedHouses;
window.canCaptureGoldHouse = canCaptureGoldHouse;
window.getTileImage = getTileImage;

//console.log('✅ Система захоплення хаток золота ініціалізована');


