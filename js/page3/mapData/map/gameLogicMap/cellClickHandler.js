// ============================================
// ОБРОБКА КЛІКІВ ПО КЛІТИНКАХ КАРТИ
// ============================================

/**
 * Відображає інформацію про клітинку на верхньому табло
 */
function displayCellInfo(x, y, tileType) {
    // Отримуємо інформацію про тип клітинки з globals.js
    const info = tileInfo[tileType];
    
    if (!info) {
        // console.warn(`⚠️ Невідомий тип клітинки: ${tileType}`);
        return;
    }
    
    // console.log(`📍 Клік на клітинку (${x}, ${y}), тип: ${info.name}`);
    
    // Відображаємо картинку клітинки
    if (cellImgInfo) {
        // ⬇️ ВИПРАВЛЕНО: Використовуємо функцію яка враховує захоплені хатки
        if (typeof window.getTileImage === 'function') {
            cellImgInfo.src = window.getTileImage(x, y, tileType);
        } else {
            cellImgInfo.src = tileImages[tileType];
        }
        // console.log(`🖼️ Картинка: ${tileImages[tileType]}`);
    }
    
    // Шукаємо бонус броні в ефектах
    let armorBonus = 0;
    let defenseBonus = 0;
    
    info.effects.forEach(effect => {
        if (effect.type === "Броня") {
            armorBonus = effect.value;
        }
        if (effect.type === "Захист") {
            defenseBonus = effect.value;
        }
    });
    
    // Відображаємо бонус броні (або захисту)
    const totalArmor = armorBonus + defenseBonus;
    
    if (tabloPlusArmor) {
        if (totalArmor > 0) {
            tabloPlusArmor.innerText = `+${totalArmor}`;
            tabloPlusArmor.style.color = "white";
            // console.log(`🛡️ Броня/Захист: +${totalArmor}`);
        } else {
            tabloPlusArmor.innerText = "0";
            tabloPlusArmor.style.color = "gray";
            // console.log(`🛡️ Броня/Захист: немає`);
        }
    }
}

/**
 * Обробляє клік на порожню клітинку
 */
function handleEmptyCellClick(x, y) {
    // console.log('[handleEmptyCellClick] клітинка', x, y, 'порожня – очищаю табло');
    if (typeof clearMoveCells === 'function') {
        clearMoveCells();
    } else if (typeof window.clearMoveCells === 'function') {
        window.clearMoveCells();
    }  // ← ЦЕ ЗАКІНЧЕННЯ if/else

    // ⬇️ ТУТ МАЄ БУТИ КОД (ПІСЛЯ if/else, а не всередині!)
    // Видаляємо виділення юніта
    document.querySelectorAll('.cell.selected-unit').forEach(cell => {
        cell.classList.remove('selected-unit');
    });

    // Виділяємо порожню клітинку
    const clickedCell = document.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
    if (clickedCell) {
        clickedCell.classList.add('selected-unit');
    }

    if (typeof clearUnitTablo !== 'undefined') {
        // console.log('[handleEmptyCellClick] викликаю clearUnitTablo()');
        clearUnitTablo();
    }
    // ... інші дії як були ...

    

    
    // Отримуємо тип клітинки з mapData
    if (!mapData || !mapData[y] || mapData[y][x] === undefined) {
        // console.error('❌ Невірні координати або mapData не завантажено');
        return;
    }
    
    const tileType = mapData[y][x];

    const unit = unitsOnMap.find(u => u.x === x && u.y === y);
    if (unit) {
        // на клітинці залишився юніт – не чистимо табло
        displayCellInfo(x, y, tileType);
        return;
    }

    clearUnitTablo();
    displayCellInfo(x, y, tileType);
}

/**
 * Ініціалізація обробника кліків по карті
 */
function initCellClickHandler() {
    if (!map) {
        // console.error('❌ Елемент карти не знайдено!');
        return;
    }
    
    // Додаємо обробник кліку на карту з невеликою затримкою
    // щоб unitSelection встиг обробити клік на юніта першим
    map.addEventListener("click", (e) => {
        // Перевіряємо чи клік по клітинці
        if (!e.target.classList.contains("cell")) return;
        
        // Отримуємо координати клітинки
        const x = parseInt(e.target.dataset.x);
        const y = parseInt(e.target.dataset.y);
        
        // ⬅️ ЗМІНЕНО: Невелика затримка, щоб unitSelection встиг обробити клік на юніта
        setTimeout(() => {
            const unit = unitsOnMap.find(u => u.x === x && u.y === y);

            if (unit) {
                if (typeof updateUnitTablo === 'function') {
                    updateUnitTablo(unit);
                } else if (typeof window.updateUnitTablo === 'function') {
                    window.updateUnitTablo(unit);
                }

                if (unit.playerIndex !== currentPlayerIndex) {
                    return;
                }

                // свій юніт — нічого більше не робимо
                return;
            }

            handleEmptyCellClick(x, y);
        }, 50);
    });
    
    // console.log('✅ Обробник кліків по карті ініціалізовано');
}

// Ініціалізуємо після завантаження DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCellClickHandler);
} else {
    // DOM вже завантажено
    initCellClickHandler();
}