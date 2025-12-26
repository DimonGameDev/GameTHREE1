// ============================================
// ЛОГІКА ВИБОРУ ТА РУХУ ЮНІТІВ
// ============================================

let selectedUnitForMove = null; // Вибраний юніт для руху
let selectedUnitVisual = null;  // Візуальний елемент вибраного юніта
let mapClickHandler = null;     // ⬅️ ДОДАЙТЕ: Зберігаємо обробник
let isInitialized = false; 


// Додати на початку файлу unitSelection.js (після інших змінних)
let selectedUnitForEndTurn = null; // Юніт для завершення ходу

/**
 * Показує кнопку завершення ходу юніта
 */
function showEndTurnButton(unit) {
    if (!BtnActiveUnitEndTurn) return;
    
    // Перевіряємо чи це юніт поточного гравця
    if (unit.playerIndex !== currentPlayerIndex) {
        BtnActiveUnitEndTurn.style.display = "none";
        return;
    }
    
    // Перевіряємо чи юніт ще не завершив хід
    if (!unit.moved || !unit.attacked) {
        BtnActiveUnitEndTurn.style.display = "block";
        console.log('✅ Показано кнопку завершення ходу юніта');
        
        // Прив'язуємо обробник до кнопки (один раз)
        if (!BtnActiveUnitEndTurn.dataset.initialized) {
            BtnActiveUnitEndTurn.addEventListener('click', () => {
                if (selectedUnitForEndTurn) {
                    endUnitTurn(selectedUnitForEndTurn);
                }
            });
            BtnActiveUnitEndTurn.dataset.initialized = "true";
        }
    } else {
        BtnActiveUnitEndTurn.style.display = "none";
    }
}

/**
 * Ховає кнопку завершення ходу юніта
 */
function hideEndTurnButton() {
    if (BtnActiveUnitEndTurn) {
        BtnActiveUnitEndTurn.style.display = "none";
    }
}

/**
 * Завершує хід юніта достроково
 */
function endUnitTurn(unit) {
    if (!unit) return;
    
    // Позначаємо що юніт завершив хід
    unit.moved = true;
    unit.attacked = true;
    
    // Оновлюємо візуальний стан
    if (typeof updateUnitVisualState === 'function') {
        updateUnitVisualState(unit);
    }
    
    // Очищаємо підсвічування
    if (typeof clearMoveCells === 'function') {
        clearMoveCells();
    }
    
    // Ховаємо кнопку
    hideEndTurnButton();
    
    // Очищаємо вибраний юніт
    selectedUnitForMove = null;
    selectedUnitForEndTurn = null;
    
    console.log('✅ Хід юніта завершено достроково');
}



/**
 * Очищає підсвічені клітинки руху
 */
function clearMoveCells() {
    document.querySelectorAll(".cell").forEach(cell => {
        cell.classList.remove("moveCellMap");
        // ⬇️ ДОДАНО: Примусово перемальовуємо клітинку
        void cell.offsetHeight; // force reflow
    });
}


/**
 * Підсвічує доступні клітинки для руху юніта
 */
function highlightMoveCells(unit) {
    // Очищаємо старі підсвічені клітинки
    
    clearMoveCells();
    if (unit.name && unit.name.toLowerCase().includes('катапульт') && unit.attacked) {
        console.log(`🚫 Катапульта вже атакувала → рух заблокований`);
        return;
    }
    
    if (unit.step <= 0) {
    }
    if (unit.step <= 0) {
        console.log(`⚠️ ${unit.name} не може рухатись (крок: ${unit.step})`);
        return;
    }
    
    let maxStep = unit.step;
    let startX = unit.x;
    let startY = unit.y;
    let blockedPortals = [];
    // Таблиця вартості руху
    const moveCost = {
        0: 1,        // Трава
        1: 1,        // Замок
        2: 1,        // Будинок золота
        3: Infinity, // Вода — непрохідна
        4: 2,        // Будинок броні — вартість 2
        5: 1,        // Будинок лікування
        6: 0.5       // Дорога — вартість 0.5
    };
    
    // Масив для зберігання відвіданих клітинок
    let visited = Array.from({ length: mapData.length }, () =>
        Array(mapData[0].length).fill(Infinity)
    );
    
    visited[startY][startX] = 0;
    
    // Черга для обходу карти (BFS алгоритм)
    let queue = [{ x: startX, y: startY, cost: 0 }];
    
    while (queue.length > 0) {
        let { x, y, cost } = queue.shift();
        
        let directions = [
            { dx: 0, dy: -1 },  // вгору
            { dx: 0, dy: 1 },   // вниз
            { dx: -1, dy: 0 },  // вліво
            { dx: 1, dy: 0 }    // вправо
        ];
        
        for (let dir of directions) {
            let nx = x + dir.dx;
            let ny = y + dir.dy;
            
            // Перевірка меж карти
            if (ny < 0 || nx < 0 || ny >= mapData.length || nx >= mapData[0].length) continue;
            
            let tileType = mapData[ny][nx];
            let costToMove = moveCost[tileType];
            
            if (costToMove === Infinity) continue; // непрохідна клітинка
            
            // Перевіряємо чи немає там вже юніта
            // const hasUnit = unitsOnMap.some(u => u.x === nx && u.y === ny && u !== unit);
            // if (hasUnit) continue; // клітинка зайнята
            
            let newCost = cost + costToMove;
            
            if (newCost <= maxStep && newCost < visited[ny][nx]) {
                visited[ny][nx] = newCost;
                queue.push({ x: nx, y: ny, cost: newCost });
                
                // 🆕 ДОДАНО: Перевіряємо чи це вхід в портал з зайнятим виходом
                let isBlockedPortalEntry = false;
                if (window.activePortals && window.activePortals.length > 0) {
                    const portal = window.activePortals.find(p => 
                        p.entry.x === nx && 
                        p.entry.y === ny &&
                        p.playerIndex === unit.playerIndex
                    );
                    
                    if (portal) {
                        // Перевіряємо чи вихід порталу зайнятий
                        const exitOccupied = unitsOnMap.find(u => 
                            u.x === portal.exit.x && 
                            u.y === portal.exit.y && 
                            u.id !== unit.id
                        );
                        if (exitOccupied) {
                            isBlockedPortalEntry = true;
                            // 🆕 Записуємо в масив для повідомлення
                            blockedPortals.push({
                                entry: { x: nx, y: ny },
                                blockedBy: exitOccupied.name
                            });
                        }
                    }
                }
                
                // Підсвічуємо тільки якщо це не заблокований вхід порталу
                if (!isBlockedPortalEntry) {
                    let cell = document.querySelector(`.cell[data-x='${nx}'][data-y='${ny}']`);
                    if (cell) cell.classList.add("moveCellMap");
                }
            }
        }
    }
     // 🆕 ДОДАНО: Показуємо повідомлення про заблоковані портали
     if (blockedPortals.length > 0) {
        const names = [...new Set(blockedPortals.map(p => p.blockedBy))].join(', ');
        console.log(`🚫 Портал заблоковано: ${names} стоїть на виході`);
        
        // Можна використати alert або ваше кастомне повідомлення
        // alert(`Портал заблоковано! ${names} стоїть на виході.`);
        
        // Або показати тост/підказку якщо є така система
        if (typeof window.showGameMessage === 'function') {
            window.showGameMessage(`Портал заблоковано! ${names} стоїть на виході.`);
        }
    }
    
    // console.log(`✅ Підсвічено доступні клітинки для руху юніта ${unit.name}`);
}

/**
 * Дозволяє рухати юніта після підсвічування клітинок
 */
function enableUnitMovement(unit, cellPlayer) {
    // Якщо юніт уже ходив — нічого не робимо
    if (unit.moved) {
        console.log('⚠️ Юніт вже ходив цього ходу');
        return;
    }

    if (unit.step <= 0) {
        console.log(`⚠️ ${unit.name} знерухомлений! (крок: ${unit.step})`);
        return;
    }
    
    // ⬅️ ДОДАЙТЕ: Видаляємо всі старі слухачі з клітинок руху
    document.querySelectorAll(".moveCellMap").forEach(cell => {
        // Клонуємо елемент щоб видалити всі слухачі
        const newCell = cell.cloneNode(true);
        cell.parentNode.replaceChild(newCell, cell);
    });
    
    // Функція, яка викликається при натисканні на клітинку
        // Функція, яка викликається при натисканні на клітинку
        function handleMove(e) {
            const cell = e.currentTarget;
            
            if (!cell.classList.contains("moveCellMap")) {
                return;
            }
            
            let targetX = parseInt(cell.dataset.x);
            let targetY = parseInt(cell.dataset.y);
        
            const hasUnit = unitsOnMap.some(u => u.x === targetX && u.y === targetY && u !== unit);
            if (hasUnit) {
                console.log('⚠️ Клітинка зайнята іншим юнітом!');
                return;
            }
            
            // СПОЧАТКУ видаляємо всі слухачі (до того як видалимо класи!)
            document.querySelectorAll(".moveCellMap").forEach(cell => {
                cell.removeEventListener("click", handleMove);
            });
            
            // Переміщуємо юніта
            moveUnit(unit, cellPlayer, targetX, targetY);
            
            // Оновлюємо координати юніта
            unit.x = targetX;
            unit.y = targetY;
            
 // 🆕 ВСТАВИТИ ТУТ ↓↓↓ (після рядка 227)
 const usedPortal = checkAndUsePortal(unit, targetX, targetY);
 if (usedPortal) {
    setTimeout(() => {
        highlightMoveCells(unit);
        enableUnitMovement(unit, cellPlayer);  // ✅ Використовуємо існуючу функцію
    }, 400);
    return;
}

            // Перевіряємо чи можна захопити хатку і показуємо кнопку
            if (typeof window.checkAndShowCaptureButton === 'function') {
                window.checkAndShowCaptureButton(unit, targetX, targetY);
            }
    
            // Помічаємо, що юніт зробив хід
            unit.moved = true;
            if (typeof window.applyTileDefenseBonuses === 'function') {
                window.applyTileDefenseBonuses(unit);
            }
            if (unit.name && unit.name.toLowerCase().includes('катапульт')) {
                unit.attacked = true;
                console.log(`🎯 Катапульта походила → атака заблокована`);
            }
             // Перевіряємо чи є у юніта аури і застосовуємо їх
    if (window.EffectsManager && window.EffectsManager.hasAuraAbility(unit)) {
        EffectsManager.applyUnitAuras(unit);
    }
                        // // Додаткове очищення для мобільних
                        // setTimeout(() => {
                        //     document.querySelectorAll(".cell").forEach(cell => {
                        //         cell.classList.remove("moveCellMap");
                        //         // Примусово скидаємо всі inline стилі
                        //         cell.style.backgroundColor = '';
                        //         cell.style.boxShadow = '';
                        //         cell.style.border = '';
                        //     });
                        // }, 100); // Збільшив затримку до 100мс
        }
    
    // Додаємо слухачі тільки до клітинок з класом moveCellMap
    const moveCells = document.querySelectorAll(".moveCellMap");
    moveCells.forEach(cell => {
        cell.addEventListener("click", handleMove, { once: true });
    });
}
/**
 * Переміщує юніта на нову позицію
 */
// В файлі: GameTHREE/js/page3/mapData/map/gameLogicMap/unitSelection.js
// Замініть функцію moveUnit() на цю версію:

function moveUnit(unit, cellPlayer, targetX, targetY) {
    const cellSize = cellSizeAll;
    
    // Знаходимо wrapper замість cellPlayer
    const wrapper = document.querySelector(`.unit-wrapper[data-unit-id="${unit.id}"]`);
    
    if (!wrapper) {
        console.warn(`⚠️ Wrapper для юніта ${unit.name} не знайдено`);
        return;
    }
    
    // Очищаємо всі підсвічені клітинки руху
    clearMoveCells();
    
    // Видаляємо підсвічування зі старої клітинки
    const oldCell = document.querySelector(`.cell[data-x="${unit.x}"][data-y="${unit.y}"]`);
    if (oldCell) {
        oldCell.classList.remove('active-player-cell', 'enemy-player-cell', 'exhausted-unit-cell');
    }
    
    // Додаємо CSS transition для плавного руху
    wrapper.style.transition = 'left 0.3s ease-out, top 0.3s ease-out';
    
    // Одразу оновлюємо позицію - браузер сам зробить плавну анімацію
    wrapper.style.left = targetX * cellSize + "px";
    wrapper.style.top = targetY * cellSize + "px";
    wrapper.dataset.x = targetX;
    wrapper.dataset.y = targetY;
    
    // Прибираємо transition після завершення анімації
        // Прибираємо transition після завершення анімації
        setTimeout(() => {
            wrapper.style.transition = '';
            
            // Потрійне очищення для надійності на мобільних
            clearMoveCells();
            
            setTimeout(() => {
                clearMoveCells();
                document.querySelectorAll(".cell").forEach(cell => {
                    cell.classList.remove("moveCellMap");
                    cell.style.backgroundColor = '';
                    cell.style.boxShadow = '';
                    cell.style.border = '';
                });
            }, 50);
        }, 300);
    }

/**
 * Обробляє клік по юніту
 */
/**
 * Обробляє клік по юніту
 */
function handleUnitClick(unit, cellPlayer) {
    const currentPlayer = players[currentPlayerIndex];
    if (!currentPlayer) {
        console.error('❌ Поточний гравець не знайдений!');
        return;
    }
    console.log(`🔍 Клік на юніта: ${unit.name}, step: ${unit.step}, moved: ${unit.moved}, id: ${unit.id}`);
    // ⬇️ НОВИЙ КОД: Очищаємо червоні поля атаки при виборі юніта
    if (typeof clearAttackHighlights === 'function') {
        clearAttackHighlights();
    }
    
   // ⬇️ ВИПРАВЛЕНО: Виходимо з режиму атаки ЛИШЕ якщо клікаємо на свого юніта
// Якщо в режимі атаки і клікаємо на ворога - нехай attackSystem обробляє
if (typeof isInAttackMode !== 'undefined' && isInAttackMode) {
    // Якщо клікаємо на свого юніта - виходимо з режиму атаки
    if (unit.playerIndex === currentPlayerIndex) {
        if (typeof exitAttackMode === 'function') {
            exitAttackMode();
        }
    } else {
        // Клік на ворога в режимі атаки - не обробляємо тут, нехай attackSystem обробляє
        return;
    }
}
// ⬇️ НОВИЙ КОД: Ховаємо кнопку захоплення при виборі юніта
if (BtnActiveHauseGoldCapture) {
    BtnActiveHauseGoldCapture.style.display = "none";
}
    updateUnitTablo(unit);
    hideEndTurnButton();
    document.querySelectorAll('.cell.selected-unit').forEach(cell => {
        cell.classList.remove('selected-unit');
    });

    if (unit.x !== undefined && unit.y !== undefined) {
        const selectedCell = document.querySelector(`.cell[data-x="${unit.x}"][data-y="${unit.y}"]`);
        if (selectedCell) {
            selectedCell.classList.add('selected-unit');
        }
    }

    // ... решта коду без змін

    if (unit.playerIndex !== currentPlayerIndex) {
        // console.log('[handleUnitClick] чужий юніт', unit.name, 'playerIndex', unit.playerIndex, 'current', currentPlayerIndex);
        clearMoveCells();
        document.querySelectorAll(".moveCellMap").forEach(cell => {
            const newCell = cell.cloneNode(true);
            cell.parentNode.replaceChild(newCell, cell);
        });
        selectedUnitForMove = null;
        selectedUnitVisual = null;
        return;
    }
   
    // подальша логіка без змін

    // подальша логіка без змін

    
    
    
   // ⬇️ ВИПРАВЛЕННЯ: Оновлюємо selectedUnitForMove ЗАВЖДИ, навіть якщо юніт вже ходив
selectedUnitForMove = unit;
selectedUnitVisual = cellPlayer;

// ⬇️ НОВИЙ КОД: Перевіряємо чи юніт стоїть на хатці і може її захопити
if (typeof window.checkAndShowCaptureButton === 'function') {
    window.checkAndShowCaptureButton(unit, unit.x, unit.y);
}
    
    // Перевіряємо чи юніт вже ходив
    if (unit.moved) {
        // console.log('⚠️ Юніт вже ходив цього ходу');
        // ⬅️ ДОДАЙТЕ: Очищаємо попередні підсвічування, якщо вони є
        clearMoveCells();
        // ⬅️ ДОДАЙТЕ: Очищаємо попередні обробники руху
        document.querySelectorAll(".moveCellMap").forEach(cell => {
            const newCell = cell.cloneNode(true);
            cell.parentNode.replaceChild(newCell, cell);
        });
        // ⬇️ ТЕПЕР НЕ ВИХОДИМО, А ПРОСТО НЕ ПОКАЗУЄМО КЛІТИНКИ РУХУ
        // Юніт вибраний, але рухатися не може
        return;
    }

    // Очищаємо попередні обробники руху
    document.querySelectorAll(".moveCellMap").forEach(cell => {
        const newCell = cell.cloneNode(true);
        cell.parentNode.replaceChild(newCell, cell);
    });
    
    // Очищаємо попередні підсвічування
    clearMoveCells();
    
    // Підсвічуємо доступні клітинки
    highlightMoveCells(unit);
    
    // Дозволяємо рух
    enableUnitMovement(unit, cellPlayer);
}

/**
 * Ініціалізація обробників кліків по юнітах
 */
function initUnitSelection() {
    if (!map) {
        // console.error('❌ Елемент карти не знайдено!');
        return;
    }
    
    // Перевіряємо чи вже ініціалізовано
    if (isInitialized) {
        // console.log('⚠️ Обробник вибору юнітів вже ініціалізовано');
        return;
    }
    
    // Створюємо обробник кліку на карту
    mapClickHandler = (e) => {
        // Перевіряємо чи клік по клітинці
        if (e.target.classList.contains("cell")) {
            const x = parseInt(e.target.dataset.x);
            const y = parseInt(e.target.dataset.y);
            
            // Знаходимо юніта на цій клітинці
            const unit = unitsOnMap.find(u => u.x === x && u.y === y);
            
            if (unit) {
                               // Знаходимо візуальний елемент за координатами
                // ⬇️ ЗМІНЕНО: Шукаємо unit-wrapper замість cellPlayer
                const cellPlayer = Array.from(map.querySelectorAll('.unit-wrapper')).find(wrapper => {
                    const wrapperX = parseInt(wrapper.dataset.x);
                    const wrapperY = parseInt(wrapper.dataset.y);
                    return wrapperX === x && wrapperY === y;
                });
                
                if (cellPlayer) {
                    handleUnitClick(unit, cellPlayer);
                }
            } else {
                // ⬇️ НОВИЙ КОД: Якщо клік НЕ на юніта - ховаємо кнопку
                if (BtnActiveHauseGoldCapture) {
                    BtnActiveHauseGoldCapture.style.display = "none";
                }

            }
        }
    };
    


// Додаємо обробник тільки один раз
map.addEventListener("click", mapClickHandler);

// ⬇️ НОВИЙ КОД: Подвійний клік для показу кнопки завершення ходу
map.addEventListener("dblclick", (e) => {
    if (!e.target.classList.contains("cell")) return;
    
    const x = parseInt(e.target.dataset.x);
    const y = parseInt(e.target.dataset.y);
    const unit = unitsOnMap.find(u => u.x === x && u.y === y);
    
    if (unit && unit.playerIndex === currentPlayerIndex) {
        selectedUnitForEndTurn = unit;
        showEndTurnButton(unit);
    }
});
let lastTapTime = 0;
let lastTapX = null;
let lastTapY = null;
const DOUBLE_TAP_DELAY = 300; // 300мс між дотиками

map.addEventListener("touchend", (e) => {
    if (!e.target.classList.contains("cell")) return;
    
    const currentTime = new Date().getTime();
    const tapInterval = currentTime - lastTapTime;
    const x = parseInt(e.target.dataset.x);
    const y = parseInt(e.target.dataset.y);
    
    // Перевіряємо чи це подвійний тап на тій самій клітинці
    if (tapInterval < DOUBLE_TAP_DELAY && lastTapX === x && lastTapY === y) {
        // Це подвійний тап!
        const unit = unitsOnMap.find(u => u.x === x && u.y === y);
        
        if (unit && unit.playerIndex === currentPlayerIndex) {
            selectedUnitForEndTurn = unit;
            showEndTurnButton(unit);
            
            // Вібрація на мобільних
            if (navigator.vibrate) {
                navigator.vibrate(100);
            }
        }
        
        // Скидаємо лічильник
        lastTapTime = 0;
        lastTapX = null;
        lastTapY = null;
    } else {
        // Запам'ятовуємо перший тап
        lastTapTime = currentTime;
        lastTapX = x;
        lastTapY = y;
    }
});
isInitialized = true;
    
// console.log('✅ Обробник вибору юнітів ініціалізовано');

// isInitialized = true;
    
//     console.log('✅ Обробник вибору юнітів ініціалізовано');
}

// Ініціалізуємо після завантаження DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initUnitSelection, 300);
    });
} else {
    setTimeout(initUnitSelection, 300);
}


// -----------------------
/**
 * Оновлює табло з даними вибраного юніта/героя
 */
function updateUnitTablo(unit) {
    // ⬅️ ДОДАЙТЕ: Оновлюємо картинку клітинки під юнітом
    if (cellImgInfo && unit.x !== undefined && unit.y !== undefined) {
        // Отримуємо тип клітинки з mapData
        if (mapData && mapData[unit.y] && mapData[unit.y][unit.x] !== undefined) {
            const tileType = mapData[unit.y][unit.x];
            // ⬇️ ВИПРАВЛЕНО: Використовуємо функцію яка враховує захоплені хатки
            if (typeof window.getTileImage === 'function') {
                cellImgInfo.src = window.getTileImage(unit.x, unit.y, tileType);
            } else {
                cellImgInfo.src = tileImages[tileType];
            }
            
            // ⬅️ ДОДАЙТЕ: Оновлюємо бонус броні з клітинки
            const info = tileInfo[tileType];
            if (info && tabloPlusArmor) {
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
                
                const totalArmor = armorBonus + defenseBonus;
                if (totalArmor > 0) {
                    tabloPlusArmor.innerText = `+${totalArmor}`;
                    tabloPlusArmor.style.color = "white";
                } else {
                    tabloPlusArmor.innerText = "0";
                    tabloPlusArmor.style.color = "gray";
                }
            }
        }
    }
    
    // Оновлюємо назву
    if (daniUnitsName) {
        // Для юнітів використовуємо name, для героїв теж name
        daniUnitsName.innerText = unit.name || unit.type || "Невідомо";
    }
    
    // Оновлюємо Step (хід)
    if (daniUnitsStep) {
        daniUnitsStep.innerText = unit.step || 0;
    }
    
    // Оновлюємо Range (дальність)
    if (daniUnitsRange) {
        daniUnitsRange.innerText = unit.range || 0;
    }
    
    // Оновлюємо Armor (броня)
       
   // Оновлюємо Armor (броня) з бонусами від клітинки
if (daniUnitsArmor) {
    let baseArmor = unit.isHero 
        ? (unit.armor || 0) + (unit.LevelArmor || 0)
        : (unit.armor || 0);
    
    let tileBonus = 0;
    if (unit.tileBonuses) {
        tileBonus = (unit.tileBonuses.armor || 0) + (unit.tileBonuses.defense || 0);
    }
    
    if (tileBonus > 0) {
        // Показуємо базову броню + бонус
        daniUnitsArmor.innerText = `${baseArmor}+${tileBonus}`;
        daniUnitsArmor.style.color = '#00ff88';
        daniUnitsArmor.style.fontWeight = 'bold';
        console.log(`🛡️ Табло: ${baseArmor} + ${tileBonus} = ${baseArmor + tileBonus}`);
    } else {
        // Тільки базова броня
        daniUnitsArmor.innerText = baseArmor;
        daniUnitsArmor.style.color = '';
        daniUnitsArmor.style.fontWeight = '';
    }
}
    
    // Оновлюємо HP (здоров'я)
// Оновлюємо HP (здоров'я)
if (daniUnitsHp) {
    const currentHp = unit.newhp !== undefined ? unit.newhp : (unit.hp || unit.health || 0);
    daniUnitsHp.innerText = currentHp;  // ✅ БЕЗ " /" - воно вже в HTML
}

if (daniUnitsHpNew) {
    const maxHp = unit.hp || unit.health || 0;
    daniUnitsHpNew.innerText = maxHp;
}
    
    // Оновлюємо Attack (атака)
       
       if (daniUnitsAtack) {
        // 👇 ДЛЯ ГЕРОЇВ додаємо бонус від рівня
        const finalAttack = unit.isHero 
            ? (unit.attack || 0) + (unit.LevelAttack || 0)
            : (unit.attack || 0);

            // ✅ ДОДАНО: Оновлюємо Crit (шанс та множник криту)
if (daniUnitsCrit) {
    if (unit.isHero) {
        const critChance = unit.critChance || 0;
        const critBlow = unit.critBlow || 1;
        
        if (critChance > 0) {
            daniUnitsCrit.innerText = `${critChance}% x${critBlow}`;
            daniUnitsCrit.style.color = '#ffcc00';
        } else {
            daniUnitsCrit.innerText = '0%';
            daniUnitsCrit.style.color = '';
        }
    } else {
        // Звичайні юніти не мають криту
        daniUnitsCrit.innerText = '—';
        daniUnitsCrit.style.color = '#888';
    }
}
        // 🔧 ДЕБАГ: перевіряємо tempBonuses
        //console.log('📊 tempBonuses:', unit.tempBonuses);
        
        // 🔧 ВИПРАВЛЕНО: Показуємо бонус від здібностей (тільки %)
        if (unit.tempBonuses && unit.tempBonuses.attackPercent > 0) {
            const bonusPercent = unit.tempBonuses.attackPercent;
            daniUnitsAtack.innerHTML = finalAttack + ` <span style="color:#00ff00">(+${bonusPercent}%)</span>`;
        } else {
            daniUnitsAtack.innerText = finalAttack;
        }
    
            }

    // Оновлюємо ману юніта/героя
    if (unit.playerIndex !== undefined) {
        const isOwnUnit = unit.playerIndex === currentPlayerIndex;
        
                // ⭐ ПЕРЕВІРЯЄМО ЧИ ЦЕ ГЕРОЙ
                if (unit.isHero) {
                    // === ДЛЯ ВСІХ ГЕРОЇВ - показуємо РІВЕНЬ ===
                    
                    // Ховаємо елементи мани
                    if (manaUnitsNow) {
                        manaUnitsNow.style.display = "none";
                    }
                    
                    if (manaUnitsThreshold) {
                        manaUnitsThreshold.style.display = "none";
                    }
                    
                    if (manaUnits) {
                        manaUnits.innerHTML = '';
                        
                        const heroLevel = unit.level || 1;
                        const heroSpan = document.createElement('span');
                        heroSpan.textContent = `Рівень: ${heroLevel}`;
                        heroSpan.style.color = '#ffd700';
                        heroSpan.style.fontSize = '16px';
                        heroSpan.style.fontWeight = 'bold';
                        heroSpan.style.textShadow = '0 0 5px #ff0000, 0 0 10px #ff0000';
                        heroSpan.style.display = 'inline-block';
                        
                        manaUnits.appendChild(heroSpan);
                        manaUnits.style.display = "flex";
                        manaUnits.style.justifyContent = "center";
                        manaUnits.style.alignItems = "center";
                    }
                    
                    // Показуємо рівень у спеціальному елементі
                    if (unitLevelNow) {
                        unitLevelNow.innerText = unit.level || 1;
                        unitLevelNow.style.display = "inline";
                    }
        } else {
            // === ДЛЯ ЗВИЧАЙНИХ ЮНІТІВ (старий код) ===
            const unitType = getUnitType(unit);
            
            if (unitType && players[unit.playerIndex] && players[unit.playerIndex].unitMana) {
                const manaValue = players[unit.playerIndex].unitMana[unitType] || 0;
                const currentLevel = unit.level || 1;
                const threshold = window.unitProgressSystem?.getManaThreshold 
                    ? window.unitProgressSystem.getManaThreshold(currentLevel)
                    : 100;
                
                if (isOwnUnit) {
                    // ✅ СВІЙ ЮНІТ - показуємо мана + поріг
                    if (manaUnitsNow) {
                        manaUnitsNow.innerText = manaValue;
                        manaUnitsNow.style.display = "inline";
                    }
                    
                    if (manaUnitsThreshold) {
                        manaUnitsThreshold.innerText = " / " + threshold;
                        manaUnitsThreshold.style.display = "inline";
                    }
                    
                    if (manaUnits) {
                        let spanNow = manaUnits.querySelector('.manaUnitsNow');
                        let spanThreshold = manaUnits.querySelector('.manaUnitsThreshold');
                        
                        if (!spanNow || !spanThreshold) {
                            manaUnits.innerHTML = '';
                            
                            spanNow = document.createElement('span');
                            spanNow.className = 'manaUnitsNow';
                            spanNow.innerText = manaValue;
                            
                            spanThreshold = document.createElement('span');
                            spanThreshold.className = 'manaUnitsThreshold';
                            spanThreshold.innerText = ' / ' + threshold;
                            
                            manaUnits.appendChild(spanNow);
                            manaUnits.appendChild(spanThreshold);
                            
                            manaUnitsNow = spanNow;
                            manaUnitsThreshold = spanThreshold;
                        } else {
                            spanNow.innerText = manaValue;
                            spanNow.style.display = "inline";
                            spanThreshold.innerText = ' / ' + threshold;
                            spanThreshold.style.display = "inline";
                        }
                        
                        manaUnits.style.display = "block";
                        manaUnits.style.color = "";
                    }
                    
                    if (unitLevelNow) {
                        unitLevelNow.innerText = currentLevel;
                        unitLevelNow.style.display = "inline";
                    }
                } else {
                    // ❌ ЧУЖИЙ ЮНІТ - показуємо рівень
                    if (manaUnitsNow) {
                        manaUnitsNow.style.display = "none";
                    }
                    
                    if (manaUnitsThreshold) {
                        manaUnitsThreshold.style.display = "none";
                    }
                    
                    if (manaUnits) {
                        manaUnits.innerHTML = '';
                        
                        const levelSpan = document.createElement('span');
                        levelSpan.textContent = `Рівень: ${currentLevel}`;
                        levelSpan.style.color = '#ffff00';
                        levelSpan.style.fontSize = '16px';
                        levelSpan.style.fontWeight = 'bold';
                        levelSpan.style.textShadow = '0 0 3px #000, 0 0 5px #000';
                        levelSpan.style.display = 'inline-block';
                        
                        manaUnits.appendChild(levelSpan);
                        manaUnits.style.display = "flex";
                        manaUnits.style.justifyContent = "center";
                        manaUnits.style.alignItems = "center";
                    }
                    
                    if (unitLevelNow) {
                        unitLevelNow.innerText = currentLevel;
                        unitLevelNow.style.display = "inline";
                    }
                }
            }
        }
    }
                }
            
        
        function clearUnitTablo() {
    
            // console.log('[clearUnitTablo] очищаю табло');
           
            // Очищаємо назву
            if (daniUnitsName) {
                daniUnitsName.innerText = "";
            }
            
            // Очищаємо Step
            if (daniUnitsStep) {
                daniUnitsStep.innerText = "";
            }
            
            // Очищаємо Range
            if (daniUnitsRange) {
                daniUnitsRange.innerText = "";
            }
            
            // Очищаємо Armor
            if (daniUnitsArmor) {
                daniUnitsArmor.innerText = "";
            }
            
            // Очищаємо HP
            if (daniUnitsHp) {
                daniUnitsHp.innerText = "";
            }
            
            if (daniUnitsHpNew) {
                daniUnitsHpNew.innerText = "";
            }
            
            // Очищаємо Attack
            if (daniUnitsAtack) {
                daniUnitsAtack.innerText = "";
            }

            if (daniUnitsCrit) {
                daniUnitsCrit.innerText = "";
            }
            
            if (manaUnits) {
                manaUnits.innerText = "";
            }
            
            // 🆕 Очищаємо нові елементи мани та рівня
            if (manaUnitsNow) {
                manaUnitsNow.innerText = "";
            }
            if (manaUnitsThreshold) {
                manaUnitsThreshold.innerText = "";
            }
            if (unitLevelNow) {
                unitLevelNow.innerText = "";
            }
            
            // console.log('🧹 Табло юніта очищено');
        }


// ═══════════════════════════════════════════
// ПОРТАЛ - перевірка та використання
// ═══════════════════════════════════════════
function checkAndUsePortal(unit, newX, newY) {
    if (!window.activePortals || window.activePortals.length === 0) return false;
    
    const portal = window.activePortals.find(p => 
        p.entry.x === newX && 
        p.entry.y === newY &&
        p.playerIndex === unit.playerIndex
    );
    
    if (!portal) return false;
    
    // Перевіряємо чи юніт вже використовував цей портал
    if (portal.usedBy && portal.usedBy.includes(unit.id)) {
        console.log(`⛔ ${unit.name} вже використовував цей портал!`);
        return false;
    }

     // 🆕 ДОДАНО: Перевіряємо чи вихід порталу вільний
     const exitOccupied = unitsOnMap.find(u => 
        u.x === portal.exit.x && 
        u.y === portal.exit.y && 
        u.id !== unit.id
    );
    
    if (exitOccupied) {
        console.log(`⛔ Вихід порталу зайнятий юнітом ${exitOccupied.name}!`);
        alert(`Вихід порталу зайнятий! ${exitOccupied.name} повинен зійти з виходу.`);
        return false;  // Не дозволяємо використовувати портал
    }
    
    console.log(`🌀 ${unit.name} входить в портал!`);
    console.log(`   Телепортація: (${newX},${newY}) → (${portal.exit.x},${portal.exit.y})`);
    
    // Записуємо що юніт використав портал
    if (!portal.usedBy) portal.usedBy = [];
    portal.usedBy.push(unit.id);
    
    // 🆕 ДОДАНО: Зберігаємо оригінальний step і встановлюємо фіксований крок після порталу
    if (unit.originalStep === undefined) {
        unit.originalStep = unit.step;  // Зберігаємо оригінальний крок
    }
    unit.step = 2;  // Фіксовані 2 кроки після виходу з порталу
    unit.usedPortalThisTurn = true;  // Позначка що юніт використав портал
    
    // Оновлюємо координати юніта на вихід порталу
    unit.x = portal.exit.x;
    unit.y = portal.exit.y;
    
    // Оновлюємо DOM з анімацією
    const wrapper = document.querySelector(`[data-unit-id="${unit.id}"]`);
    if (wrapper) {
        wrapper.style.transition = 'none';
        wrapper.style.opacity = '0';
        wrapper.style.transform = 'scale(0.5)';
        
        setTimeout(() => {
            wrapper.style.left = `${unit.x * cellSizeAll}px`;
            wrapper.style.top = `${unit.y * cellSizeAll}px`;
            wrapper.dataset.x = unit.x;
            wrapper.dataset.y = unit.y;
            
            wrapper.style.transition = 'opacity 0.3s, transform 0.3s';
            wrapper.style.opacity = '1';
            wrapper.style.transform = 'scale(1)';
        }, 150);
    }
    
    clearMoveCells();
    
    return true;
}



window.clearUnitTablo = clearUnitTablo;
window.clearMoveCells = clearMoveCells;
window.updateUnitTablo = updateUnitTablo;




