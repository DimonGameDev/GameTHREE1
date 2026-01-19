// ============================================
// ЛОГІКА ВИБОРУ ТА РУХУ ЮНІТІВ
// ============================================

let selectedUnitForMove = null; // Вибраний юніт для руху
let selectedUnitVisual = null;  // Візуальний елемент вибраного юніта
let mapClickHandler = null;     // ⬅️ ДОДАЙТЕ: Зберігаємо обробник
let isInitialized = false; 



// ============================================
// СИСТЕМА ВОСКРЕСІННЯ ГЕРОЇВ
// ============================================

// Глобальний масив для зберігання померлих героїв, які чекають воскресіння
let deadHeroesWaitingForRespawn = [];


// ============================================
// ФУНКЦІЯ ПЕРЕВІРКИ БЛОКУВАННЯ КЛІТИНКИ ВОРОЖИМИ ЮНІТАМИ
// ============================================

/**
 * Перевіряє чи клітинка заблокована ворожим юнітом
 * @param {number} x - координата X клітинки
 * @param {number} y - координата Y клітинки  
 * @param {number} currentPlayerIndex - індекс поточного гравця
 * @returns {boolean} - true якщо клітинка заблокована ворожим юнітом
 */
function isCellBlocked(x, y, currentPlayerIndex) {
    // Детальний лог для дебагу
    // console.log(`🔍 Перевірка блокування клітинки (${x}, ${y}) для гравця ${currentPlayerIndex + 1}`);
    
    // Шукаємо юніта на цій клітинці
    const unitOnCell = unitsOnMap.find(unit => {
        return unit.x === x && unit.y === y;
    });
    
    // Якщо на клітинці немає юніта - вона не заблокована
    if (!unitOnCell) {
        // console.log(`✅ Клітинка (${x}, ${y}) вільна - немає юнітів`);
        return false;
    }
    
    // Отримуємо індекс гравця юніта
    const unitPlayerIndex = unitOnCell.playerIndex;
    
    // Перевіряємо чи це ворожий юніт
    const isEnemyUnit = unitPlayerIndex !== currentPlayerIndex;
    
    // Детальний лог
    // console.log(`📊 Дані юніта на клітинці (${x}, ${y}):`);
    // console.log(`   - Назва: ${unitOnCell.name || unitOnCell.type}`);
    // console.log(`   - Гравець юніта: ${unitPlayerIndex + 1}`);
    // console.log(`   - Поточний гравець: ${currentPlayerIndex + 1}`);
    // console.log(`   - Це ворожий юніт? ${isEnemyUnit ? '✅ ТАК' : '❌ НІ'}`);
    
    // Якщо це ворожий юніт - клітинка заблокована
    if (isEnemyUnit) {
        // console.log(`🚫 Клітинка (${x}, ${y}) ЗАБЛОКОВАНА ворожим юнітом ${unitOnCell.name || unitOnCell.type}`);
        return true;
    }
    
    // Якщо це свій юніт - клітинка не заблокована
    // console.log(`✅ Клітинка (${x}, ${y}) НЕ заблокована - свій юніт`);
    return false;
}


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
 * Закриває кнопку завершення ходу при кліку поза нею
 */
function initEndTurnButtonClickOutside() {
    document.addEventListener('click', (event) => {
        if (!BtnActiveUnitEndTurn) return;
        
        // Перевіряємо чи кнопка видима
        if (BtnActiveUnitEndTurn.style.display !== 'block') return;
        
        // Перевіряємо чи клік був НЕ на кнопці
        if (!BtnActiveUnitEndTurn.contains(event.target)) {
            hideEndTurnButton();
            console.log('✅ Кнопку завершення ходу закрито (клік поза нею)');
        }
    });
}

// Викликаємо один раз при завантаженні
initEndTurnButtonClickOutside();

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


function clearMoveCells() {
    document.querySelectorAll(".cell").forEach(cell => {
        cell.classList.remove("moveCellMap");
        // ⬇️ ДОДАНО: Примусово перемальовуємо клітинку
        void cell.offsetHeight; // force reflow
    });
}


function highlightMoveCells(unit) {
    // 🆕 ДОДАНО: Лог для дебагу
    console.log(`🚶 Початок розрахунку руху для ${unit.name}`);
    console.log(`📊 Параметри: крок=${unit.step}, координати=(${unit.x},${unit.y}), гравець=${unit.playerIndex + 1}`);
    // ⬇️ ДОДАТИ: Перевірка чи юніт вже ходив
    if (unit.moved) {
        console.log('⚠️ Юніт вже ходив цього ходу, рух заблокований');
        return;
    }
    // Очищаємо старі підсвічені клітинки
    clearMoveCells();
    
    if (unit.name && unit.name.toLowerCase().includes('катапульт') && unit.attacked) {
        console.log(`🚫 Катапульта вже атакувала → рух заблокований`);
        return;
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
            
            // 🆕 ДОДАНО: Перевірка чи клітинка заблокована ворожим юнітом
            const isBlockedByEnemy = isCellBlocked(nx, ny, unit.playerIndex);
            if (isBlockedByEnemy) {
                // console.log(`⛔ Пропускаємо клітинку (${nx}, ${ny}) - заблокована ворожим юнітом`);
                continue; // Пропускаємо цю клітинку
            }
            
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
    
    console.log(`✅ Підсвічено доступні клітинки для руху юніта ${unit.name}`);
}


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

// ⬇️ ДОДАНО: Перевіряємо чи можна захопити замок і показуємо кнопку
if (typeof window.checkAndShowCastleCaptureButton === 'function') {
    window.checkAndShowCastleCaptureButton(unit, targetX, targetY);
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

                        // Оновлюємо візуальний стан після руху
                        if (typeof window.updateUnitVisualState === 'function') {
                            window.updateUnitVisualState(unit);
                        }
             // Перевіряємо чи є у юніта аури і застосовуємо їх
                 // Перевіряємо чи є у юніта аури і застосовуємо їх
                 console.log(`🔍 Перевірка аур для ${unit.name}:`);
                 console.log(`🔍 abilityInstances:`, unit.abilityInstances);
                 
                 if (window.EffectsManager) {
                     const hasAura = window.EffectsManager.hasAuraAbility(unit);
                     console.log(`🔍 hasAuraAbility повертає: ${hasAura}`);
                     
                     if (hasAura) {
                         console.log(`🚀 Виклик applyUnitAuras для ${unit.name}`);
                         EffectsManager.applyUnitAuras(unit);
                     }
                 }

        }
    
    // Додаємо слухачі тільки до клітинок з класом moveCellMap
    const moveCells = document.querySelectorAll(".moveCellMap");
    moveCells.forEach(cell => {
        cell.addEventListener("click", handleMove, { once: true });
    });
}


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
   
 
   // ⬇️ ВИПРАВЛЕННЯ: Оновлюємо selectedUnitForMove ЗАВЖДИ, навіть якщо юніт вже ходив
selectedUnitForMove = unit;
selectedUnitVisual = cellPlayer;

// ⬇️ НОВИЙ КОД: Перевіряємо чи юніт стоїть на хатці і може її захопити
if (typeof window.checkAndShowCaptureButton === 'function') {
    window.checkAndShowCaptureButton(unit, unit.x, unit.y);
}

// ⬇️ ДОДАНО: Перевіряємо чи юніт стоїть на замку і може його захопити
if (typeof window.checkAndShowCastleCaptureButton === 'function') {
    window.checkAndShowCastleCaptureButton(unit, unit.x, unit.y);
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
        // Оновлюємо назву
        if (daniUnitsName) {
            // Для юнітів використовуємо name, для героїв теж name
            const unitName = unit.name || unit.type || "Невідомо";
            const unitLevel = unit.level || 1; // Якщо рівня немає, вважаємо 1
            
            // Завжди додаємо рівень у дужках для всіх юнітів і героїв
            daniUnitsName.innerText = `${unitName} (${unitLevel})`;
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
// Оновлюємо HP (здоров'я)
// Оновлюємо HP (здоров'я)
if (daniUnitsHp) {
    const currentHp = unit.newhp !== undefined ? unit.newhp : (unit.hp || unit.health || 0);
    daniUnitsHp.innerText = currentHp;
}

if (daniUnitsHpNew) {
    // 🔴 ВИПРАВЛЕННЯ: Спочатку maxHp, потім hp, потім health
    const maxHp = unit.maxHp || (unit.hp && unit.hp > 100 ? unit.hp : 0) || unit.health || 0;
    daniUnitsHpNew.innerText = maxHp;
    console.log(`❤️ Табло: maxHp = ${maxHp} (unit.maxHp=${unit.maxHp}, unit.hp=${unit.hp})`);
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

// ✨ Показуємо бонуси від аури в табло
if (unit.activeEffects && unit.activeEffects.length > 0) {
    console.log('🔍 DEBUG: activeEffects юніта:', unit.activeEffects);
    
    // Шукаємо аури (ефекти від інших юнітів з attackBoost або armorBoost)
    const auraEffects = unit.activeEffects.filter(e => 
        (e.type === "attack" || e.type === "armor" || e.type === "mixed") && 
        e.abilityName && 
        (e.abilityName.includes("Аура") || e.abilityName.includes("підтримки"))
    );
    
    console.log('🔍 DEBUG: Знайдено auraEffects:', auraEffects);
    
    if (auraEffects.length > 0) {
        // ДЕТАЛЬНИЙ ЛОГ: подивимося що всередині
        console.log('📊 Структура першого ефекту:', auraEffects[0]);
        console.log('📊 Структура першого ефекту:', auraEffects[0]);
        console.log('📊 ВСІ КЛЮЧІ:', Object.keys(auraEffects[0]));
        console.log('📊 ВСІ ЗНАЧЕННЯ:', Object.values(auraEffects[0]));
                // Рахуємо ФІКСОВАНІ бонуси (правильні назви полів!)
                // Беремо тільки перший ефект кожної аури (унікальні за abilityName)
const uniqueAuraEffects = [];
const seenAuraNames = new Set();

auraEffects.forEach(e => {
    if (!seenAuraNames.has(e.abilityName)) {
        seenAuraNames.add(e.abilityName);
        uniqueAuraEffects.push(e);
    }
});

const auraAttackBoost = uniqueAuraEffects.reduce((sum, e) => {
    const boost = e.attackBonus || e.attackBoost || e.attack || 0;
    console.log('🔍 Унікальний ефект:', e.abilityName, '→ attack bonus:', boost);
    return sum + boost;
}, 0);

const auraArmorBoost = uniqueAuraEffects.reduce((sum, e) => {
    const boost = e.armorBonus || e.armorBoost || e.armor || 0;
    console.log('🔍 Унікальний ефект:', e.abilityName, '→ armor bonus:', boost);
    return sum + boost;
}, 0);
               // Додати після рядка 864 (перед console.log(`🔍 ДЕТАЛЬНА ПЕРЕВІРКА`))
               const getBaseAttackFromTemplate = (unit) => {
                if (unit.baseUnitKey && window.unitsRegistry) {
                    const template = window.unitsRegistry[unit.baseUnitKey];
                    if (template && template.levels) {
                        // Отримуємо атаку для поточного рівня
                        const level = unit.level || 1;
                        const levelData = template.levels[level];
                        if (levelData && levelData.attack !== undefined) {
                            console.log(`🔍 Шаблон для ${unit.name} рівень ${level}: атака=${levelData.attack}`);
                            return levelData.attack;
                        }
                    }
                    // Запасний варіант: якщо немає levels, шукаємо безпосередньо в template
                    if (template && template.attack !== undefined) {
                        console.log(`🔍 Шаблон для ${unit.name}: атака=${template.attack} (без levels)`);
                        return template.attack;
                    }
                }
                // Для героїв
                if (unit.isHero && unit.heroTemplateId && window.heroes) {
                    const heroTemplate = window.heroes[unit.heroTemplateId - 1];
                    if (heroTemplate) {
                        console.log(`🔍 Шаблон героя для ${unit.name}: атака=${heroTemplate.attack}`);
                        return heroTemplate.attack;
                    }
                }
                console.log(`⚠️ Не знайдено шаблон для ${unit.name}, використовую unit.attack=${unit.attack}`);
                return unit.attack; // Запасний варіант
            };

            const getBaseArmorFromTemplate = (unit) => {
                if (unit.baseUnitKey && window.unitsRegistry) {
                    const template = window.unitsRegistry[unit.baseUnitKey];
                    if (template && template.levels) {
                        // Отримуємо броню для поточного рівня
                        const level = unit.level || 1;
                        const levelData = template.levels[level];
                        if (levelData && levelData.armor !== undefined) {
                            console.log(`🔍 Шаблон для ${unit.name} рівень ${level}: броня=${levelData.armor}`);
                            return levelData.armor;
                        }
                    }
                    // Запасний варіант: якщо немає levels, шукаємо безпосередньо в template
                    if (template && template.armor !== undefined) {
                        console.log(`🔍 Шаблон для ${unit.name}: броня=${template.armor} (без levels)`);
                        return template.armor;
                    }
                }
                if (unit.isHero && unit.heroTemplateId && window.heroes) {
                    const heroTemplate = window.heroes[unit.heroTemplateId - 1];
                    if (heroTemplate) return heroTemplate.armor;
                }
                console.log(`⚠️ Не знайдено шаблон броні для ${unit.name}, використовую unit.armor=${unit.armor}`);
                return unit.armor || 0;
            };

console.log(`🔍 ДЕТАЛЬНА ПЕРЕВІРКА: ${unit.name}`, {
    unitAttack: unit.attack,
    unitAttackType: typeof unit.attack,
    finalAttack: finalAttack,
    finalAttackType: typeof finalAttack,
    difference: finalAttack - (unit.attack || 0),
    auraAttackBoost: auraAttackBoost,
    unitArmor: unit.armor,
    auraArmorBoost: auraArmorBoost
});
        // Показуємо атаку як 23(+3)
        if (daniUnitsAtack && auraAttackBoost > 0) {
            const baseAttack = getBaseAttackFromTemplate(unit);
            console.log(`📊 ${unit.name}: базова атака=${baseAttack} (з шаблону)`);
            daniUnitsAtack.innerText = `${baseAttack}(+${auraAttackBoost})`;
            daniUnitsAtack.style.color = '#00ff88';
            daniUnitsAtack.style.fontWeight = 'bold';
            console.log(`✨ Табло атака: ${baseAttack}(+${auraAttackBoost})`);
        } else if (daniUnitsAtack) {
            daniUnitsAtack.innerText = finalAttack;
            daniUnitsAtack.style.color = '';
            daniUnitsAtack.style.fontWeight = '';
        }
        
        // Показуємо броню як 15(+2)
        if (daniUnitsArmor && auraArmorBoost > 0) {
            let baseArmor = getBaseArmorFromTemplate(unit);
            if (unit.isHero) {
                baseArmor += (unit.LevelArmor || 0);
            }
            console.log(`📊 ${unit.name}: базова броня=${baseArmor} (з шаблону)`);
            
            const tileBonusForArmor = unit.tileBonuses 
                ? (unit.tileBonuses.armor || 0) + (unit.tileBonuses.defense || 0)
                : 0;
            
            if (tileBonusForArmor > 0) {
                daniUnitsArmor.innerText = `${baseArmor}+${tileBonusForArmor}(+${auraArmorBoost})`;
            } else {
                daniUnitsArmor.innerText = `${baseArmor}(+${auraArmorBoost})`;
            }
            daniUnitsArmor.style.color = '#00ff88';
            daniUnitsArmor.style.fontWeight = 'bold';
            console.log(`✨ Табло броня: ${baseArmor}(+${auraArmorBoost})`);
        }

    } else {
        // Немає ефектів аури - показуємо звичайну атаку
        if (daniUnitsAtack) {
            daniUnitsAtack.innerText = finalAttack;
            daniUnitsAtack.style.color = '';
            daniUnitsAtack.style.fontWeight = '';
        }
    }
} else {
    // Немає activeEffects взагалі - показуємо звичайну атаку
    if (daniUnitsAtack) {
        daniUnitsAtack.innerText = finalAttack;
        daniUnitsAtack.style.color = '';
        daniUnitsAtack.style.fontWeight = '';
    }
}

        }  // ← Закриття if (daniUnitsAtack) з рядка 712

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
                               // Отримуємо магазинний юніт для цього типу
                                              // Отримуємо магазинний юніт для цього типу
                let shopUnit = null;
                const player = players[unit.playerIndex];
                console.log(`🔍 Пошук магазинного юніта для:`, {
                    unitId: unit.unitId,
                    name: unit.name,
                    playerIndex: unit.playerIndex,
                    hasPlayer: !!player,
                    hasAvailableUnits: player ? !!player.availableUnits : false
                });
                
                if (player && player.availableUnits) {
                    // ДЕБАГ: Виведемо всі магазинні юніти
                    console.log(`🔍 Магазинні юніти гравця ${unit.playerIndex}:`, 
                        player.availableUnits.map(u => ({ 
                            unitId: u.unitId, 
                            name: u.name, 
                            upgradeCost: u.upgradeCost 
                        }))
                    );
                    
                    // Шукаємо юніта з таким же unitId в магазині
                    shopUnit = player.availableUnits.find(
                        shopUnit => shopUnit.baseUnitKey === unit.baseUnitKey
                    );
                    
                    if (shopUnit) {
                        console.log(`✅ Знайдено магазинний юніт:`, shopUnit);
                    } else {
                        console.log(`❌ Магазинний юніт не знайдений за unitId=${unit.unitId}`);
                        
                        // Спробуємо знайти за назвою
                        shopUnit = player.availableUnits.find(
                            shopUnit => shopUnit.name === unit.name
                        );
                        
                        if (shopUnit) {
                            console.log(`✅ Знайдено магазинний юніт за назвою:`, shopUnit);
                        }
                    }
                }
                
                                // Отримуємо вартість прокачки
                                                // Отримуємо вартість прокачки зі стандартної системи
                const threshold = STANDARD_UPGRADE_SYSTEM.getUpgradeCost(currentLevel);
                console.log(`💰 [ТАБЛО] Стандартна вартість для ${unit.name} рівень ${currentLevel}: ${threshold}`);
                
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

// ============================================
// СИСТЕМА ВОСКРЕСІННЯ ГЕРОЇВ - ФУНКЦІЇ
// ============================================

/**
 * Ініціалізує поля для воскресіння героя
 * @param {Object} hero - об'єкт героя
 * @param {number} respawnTimer - кількість ходів до воскресіння (за замовчуванням 4)
 */
function initHeroRespawnFields(hero, respawnTimer = 4) {
    // Перевіряємо чи це герой
    if (!hero.isHero) {
        console.log(`⚠️ ${hero.name} не є героєм - пропускаємо ініціалізацію воскресіння`);
        return;
    }
    
    // Ініціалізуємо поля для воскресіння
    hero.respawnTimer = respawnTimer;          // Таймер воскресіння (в ходах)
    hero.isDead = false;                       // Чи герой мертвий
    hero.respawnX = null;                      // Координата X для воскресіння
    hero.respawnY = null;                      // Координата Y для воскресіння
    hero.originalStats = {                     // Зберігаємо оригінальні характеристики
        hp: hero.hp || hero.health || 0,
        attack: hero.attack || 0,
        armor: hero.armor || 0,
        step: hero.step || 0,
        range: hero.range || 0
    };
    
//     console.log(`✅ Ініціалізовано поля воскресіння для героя ${hero.name}`);
//     console.log(`   - isDead: ${hero.isDead}`);
//     console.log(`   - respawnTimer: ${hero.respawnTimer}`);
}

/**
 * Ініціалізує поля воскресіння для всіх героїв на карті
 */
function initAllHeroesRespawnFields() {
    console.log('🔍 Ініціалізація полів воскресіння для всіх героїв...');
    
    let heroesInitialized = 0;
    
    unitsOnMap.forEach(unit => {
        if (unit.isHero) {
            initHeroRespawnFields(unit);
            heroesInitialized++;
        }
    });
    
    // console.log(`✅ Ініціалізовано поля воскресіння для ${heroesInitialized} героїв`);
}

/**
 * Обробляє смерть героя (додає до списку очікування воскресіння)
 * @param {Object} hero - герой, який помер
 */
function handleHeroDeath(hero) {
    console.log(`💀 Обробка смерті героя ${hero.name} (Гравець ${hero.playerIndex + 1})`);
    
    // Перевіряємо чи це герой
    if (!hero.isHero) {
        console.log(`⚠️ ${hero.name} не є героєм - пропускаємо обробку смерті`);
        return;
    }
    
    // Позначаємо героя як мертвого
    hero.isDead = true;
    
    hero.respawnTimer = 4;
    // Зберігаємо оригінальні координати (для пошуку замка)
    hero.deathX = hero.x;
    hero.deathY = hero.y;
    
    // Додаємо героя до списку очікування воскресіння
    deadHeroesWaitingForRespawn.push(hero);
    
    // console.log(`⏳ Герой ${hero.name} доданий до списку очікування воскресіння`);
    // console.log(`   - Таймер воскресіння: ${hero.respawnTimer} ходів`);
    // console.log(`   - Координати смерті: (${hero.deathX}, ${hero.deathY})`);
    // console.log(`   - Всього героїв в очікуванні: ${deadHeroesWaitingForRespawn.length}`);
    

    if (typeof window.updateHeroRespawnTimer === 'function') {
        window.updateHeroRespawnTimer(hero);
    }

        // Додаємо таймер на картинку героя на карті
        if (typeof window.addRespawnTimerToHeroImage === 'function') {
            window.addRespawnTimerToHeroImage(hero);
        }
    // Видаляємо героя з масиву unitsOnMap (він буде в deadHeroesWaitingForRespawn)
    const index = unitsOnMap.findIndex(u => u.id === hero.id);
    if (index !== -1) {
        unitsOnMap.splice(index, 1);
        console.log(`🗑️ Герой ${hero.name} видалений з unitsOnMap`);
    }
    
    // Видаляємо візуальний елемент
    const wrapper = document.querySelector(`.unit-wrapper[data-unit-id="${hero.id}"]`);
    if (wrapper) {
        wrapper.remove();
        console.log(`💀 Видалено візуальний елемент героя: ${hero.name}`);
    }
    
    // Оновлюємо лічильник юнітів
    if (typeof updateUnitsCount === 'function') {
        updateUnitsCount();
    }
}


/**
 * Додає таймер воскресіння на картинку героя на карті
 * @param {Object} hero - герой
 */
function addRespawnTimerToHeroImage(hero) {
    if (!hero || !hero.isDead) return;
    
    console.log(`⏰ Додавання таймера воскресіння на картинку героя ${hero.name}`);
    
    // Знаходимо wrapper героя на карті
    const wrapper = document.querySelector(`.unit-wrapper[data-unit-id="${hero.id}"]`);
    if (!wrapper) {
        console.log(`❌ Wrapper для героя ${hero.name} не знайдено`);
        return;
    }
    
    // Знаходимо картинку героя всередині wrapper
    const heroImage = wrapper.querySelector('.cellPlayer');
    if (!heroImage) {
        console.log(`❌ Картинка героя ${hero.name} не знайдено`);
        return;
    }
    
    // Створюємо елемент для таймера
    let timerElement = wrapper.querySelector('.respawn-timer-on-map');
    if (!timerElement) {
        timerElement = document.createElement('div');
        timerElement.className = 'respawn-timer-on-map';
        timerElement.style.position = 'absolute';
        timerElement.style.top = '0';
        timerElement.style.left = '0';
        timerElement.style.width = '100%';
        timerElement.style.height = '100%';
        timerElement.style.display = 'flex';
        timerElement.style.justifyContent = 'center';
        timerElement.style.alignItems = 'center';
        timerElement.style.fontSize = '24px';
        timerElement.style.fontWeight = 'bold';
        timerElement.style.color = '#ff0000';
        timerElement.style.textShadow = '0 0 5px #000, 0 0 10px #000';
        timerElement.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        timerElement.style.borderRadius = '5px';
        timerElement.style.zIndex = '100';
        timerElement.style.pointerEvents = 'none';
        
        wrapper.appendChild(timerElement);
    }
    
    // Оновлюємо значення таймера
    timerElement.textContent = hero.respawnTimer > 0 ? hero.respawnTimer : "⚡";
    
    // Додаємо підказку
    heroImage.title = hero.respawnTimer > 0 
        ? `Воскресне через ${hero.respawnTimer} ходів` 
        : "Готовий до воскресіння!";
    
    console.log(`✅ Таймер додано на картинку героя ${hero.name}: ${timerElement.textContent}`);
}

/**
 * Оновлює таймер воскресіння на картинці героя на карті
 * @param {Object} hero - герой
 */
function updateHeroRespawnTimerOnMap(hero) {
    if (!hero || !hero.isDead) return;
    
    console.log(`🔄 Оновлення таймера на карті для героя ${hero.name}: ${hero.respawnTimer}`);
    
    // Знаходимо wrapper героя на карті
    const wrapper = document.querySelector(`.unit-wrapper[data-unit-id="${hero.id}"]`);
    if (!wrapper) return;
    
    // Знаходимо елемент таймера
    const timerElement = wrapper.querySelector('.respawn-timer-on-map');
    if (!timerElement) {
        // Якщо таймера немає, додаємо його
        addRespawnTimerToHeroImage(hero);
        return;
    }
    
    // Оновлюємо значення таймера
    timerElement.textContent = hero.respawnTimer > 0 ? hero.respawnTimer : "⚡";
    
    // Оновлюємо підказку
    const heroImage = wrapper.querySelector('.cellPlayer');
    if (heroImage) {
        heroImage.title = hero.respawnTimer > 0 
            ? `Воскресне через ${hero.respawnTimer} ходів` 
            : "Готовий до воскресіння!";
    }
    
    console.log(`✅ Оновлено таймер на карті для ${hero.name}: ${timerElement.textContent}`);
}

/**
 * Знаходить вільну клітинку біля замка гравця
 * @param {number} playerIndex - індекс гравця
 * @returns {Object|null} - об'єкт {x, y} з координатами вільної клітинки або null
 */
function findFreeCellNearCastle(playerIndex) {
    console.log(`🔍 Пошук вільної клітинки біля замка гравця ${playerIndex + 1}`);
    
    // Знаходимо замок гравця
    const playerCastle = castles.find(castle => castle.playerIndex === playerIndex);
    
    if (!playerCastle) {
        console.error(`❌ Замок гравця ${playerIndex + 1} не знайдено!`);
        return null;
    }
    
    console.log(`🏰 Замок гравця ${playerIndex + 1} знаходиться на (${playerCastle.x}, ${playerCastle.y})`);
    
    // Визначаємо напрямки для пошуку (всі 8 напрямків навколо)
    const directions = [
        { dx: 0, dy: -1 },   // вгору
        { dx: 1, dy: -1 },   // вгору-вправо
        { dx: 1, dy: 0 },    // вправо
        { dx: 1, dy: 1 },    // вправо-вниз
        { dx: 0, dy: 1 },    // вниз
        { dx: -1, dy: 1 },   // вниз-вліво
        { dx: -1, dy: 0 },   // вліво
        { dx: -1, dy: -1 }   // вліво-вгору
    ];
    
    // Спочатку шукаємо в радіусі 1 клітинки
    for (let radius = 1; radius <= 3; radius++) {
        console.log(`🔍 Пошук в радіусі ${radius} від замка...`);
        
        for (let dir of directions) {
            const checkX = playerCastle.x + (dir.dx * radius);
            const checkY = playerCastle.y + (dir.dy * radius);
            
            // Перевірка меж карти
            if (checkX < 0 || checkY < 0 || checkX >= mapData[0].length || checkY >= mapData.length) {
                continue;
            }
            
            // Перевірка типу клітинки (не повинна бути водою)
            const tileType = mapData[checkY][checkX];
            if (tileType === 3) { // 3 = вода (непрохідна)
                continue;
            }
            
            // Перевірка чи клітинка вільна (немає юнітів)
            const isCellOccupied = unitsOnMap.some(unit => unit.x === checkX && unit.y === checkY);
            
            if (!isCellOccupied) {
                console.log(`✅ Знайдено вільну клітинку на (${checkX}, ${checkY}) в радіусі ${radius}`);
                return { x: checkX, y: checkY };
            }
        }
    }
    
    console.log(`❌ Не знайдено вільної клітинки біля замка гравця ${playerIndex + 1}`);
    return null;
}

/**
 * Воскрешає героя
 * @param {Object} hero - герой для воскресіння
 */
function respawnHero(hero) {
    console.log(`✨ Воскресіння героя ${hero.name} (Гравець ${hero.playerIndex + 1})`);
    
    // Знаходимо вільну клітинку біля замка
    const respawnCell = findFreeCellNearCastle(hero.playerIndex);
    
    if (!respawnCell) {
        console.log(`⏳ Не знайдено вільної клітинки для воскресіння ${hero.name}. Таймер встановлено на 1.`);
        hero.respawnTimer = 1; // Чекаємо ще один хід
        return;
    }
    
    // Оновлюємо координати героя
    hero.x = respawnCell.x;
    hero.y = respawnCell.y;
    
    // Відновлюємо характеристики
    hero.newhp = hero.originalStats.hp;
    hero.attack = hero.originalStats.attack;
    hero.armor = hero.originalStats.armor;
    hero.step = hero.originalStats.step;
    hero.range = hero.originalStats.range;
    
    // Скидаємо прапорці смерті
    hero.isDead = false;
    hero.moved = true;      // Не може ходити в цей хід
    hero.attacked = true;   // Не може атакувати в цей хід
    
    console.log(`✅ Герой ${hero.name} воскрес на клітинці (${hero.x}, ${hero.y})`);
    console.log(`   - HP відновлено: ${hero.newhp}`);
    console.log(`   - Атака відновлена: ${hero.attack}`);
    console.log(`   - Броня відновлена: ${hero.armor}`);
    console.log(`   - Не може ходити/атакувати в цей хід`);
    
    // Додаємо героя назад до unitsOnMap
    unitsOnMap.push(hero);
    
    // Видаляємо зі списку очікування
    const index = deadHeroesWaitingForRespawn.findIndex(h => h.id === hero.id);
    if (index !== -1) {
        deadHeroesWaitingForRespawn.splice(index, 1);
    }
    
    // Створюємо візуальний елемент героя
    createHeroVisualElement(hero);
    
    // Оновлюємо лічильник юнітів
    if (typeof updateUnitsCount === 'function') {
        updateUnitsCount();
    }
}

/**
 * Створює візуальний елемент для воскреслого героя
 * @param {Object} hero - герой
 */
function createHeroVisualElement(hero) {
    console.log(`🎨 Створення візуального елемента для воскреслого героя ${hero.name}`);
    
    // Використовуємо ту саму функцію, що і для створення героїв на старті
        // Використовуємо ту саму функцію, що і для створення героїв на старті
        if (typeof window.createHeroVisual === 'function') {
            // Спочатку переконуємося, що герой має всі необхідні поля
            const heroForVisual = {
                ...hero,
                // Якщо немає originalIndex, використовуємо playerIndex
                originalIndex: hero.originalIndex !== undefined ? hero.originalIndex : hero.playerIndex
            };
            
            const wrapper = window.createHeroVisual(heroForVisual);
            
            // Оновлюємо координати в wrapper (на всяк випадок)
            if (wrapper) {
                wrapper.dataset.x = hero.x;
                wrapper.dataset.y = hero.y;
                wrapper.style.left = `${hero.x * (cellSizeAll || 60)}px`;
                wrapper.style.top = `${hero.y * (cellSizeAll || 60)}px`;
            }

            setTimeout(() => {
                if (typeof window.updateUnitVisualState === 'function') {
                    window.updateUnitVisualState(hero);
                }
            }, 100);

                            // Оновлюємо таймер на карті
                            if (typeof window.updateHeroRespawnTimerOnMap === 'function') {
                                window.updateHeroRespawnTimerOnMap(hero);
                            }
            
            console.log(`✅ Герой ${hero.name} створено за допомогою createHeroVisual`);
            return;
        }
    
    // Якщо функції немає, створюємо вручну (копіюємо логіку з loadingHeroesOnMap.js)
    const mapElement = document.querySelector('.map');
    if (!mapElement) {
        console.error('❌ Елемент карти не знайдено!');
        return;
    }
    
    // Створюємо img елемент (ТОЧНО ТАК ЖЕ, як у createHeroVisual)
    let cellPlayer = document.createElement("img");
    cellPlayer.classList.add("cellPlayer");
    cellPlayer.src = hero.img || hero.image || '../../img/units/default.png';
    
    // Додаємо border (ТОЧНО ТАК ЖЕ, як у createHeroVisual)
        // Додаємо border (ТОЧНО ТАК ЖЕ, як у createHeroVisual)
        if (colorFlag) {
            // Використовуємо originalIndex як у оригінальній функції, або playerIndex як запасний варіант
            const colorIndex = hero.originalIndex !== undefined ? hero.originalIndex : hero.playerIndex;
            if (colorFlag[colorIndex]) {
                cellPlayer.style.border = `1px dashed ${colorFlag[colorIndex]}`;
            }
        }
        cellPlayer.style.boxSizing = "border-box";
        cellPlayer.style.pointerEvents = "none";
    
    // Створюємо wrapper з health bar (ТОЧНО ТАК ЖЕ, як у createHeroVisual)
    let wrapper;
    if (typeof window.createUnitWithHealthBar === 'function') {
        wrapper = window.createUnitWithHealthBar(hero, cellPlayer);
    } else {
        // Запасний варіант
        wrapper = document.createElement('div');
        wrapper.className = 'unit-wrapper';
        wrapper.style.position = 'absolute';
        wrapper.style.left = `${hero.x * (cellSizeAll || 60)}px`;
        wrapper.style.top = `${hero.y * (cellSizeAll || 60)}px`;
        wrapper.style.width = `${cellSizeAll || 60}px`;
        wrapper.style.height = `${cellSizeAll || 60}px`;
        wrapper.style.zIndex = '10';
        wrapper.appendChild(cellPlayer);
    }
    
    wrapper.dataset.unitId = hero.id;
    wrapper.dataset.x = hero.x;
    wrapper.dataset.y = hero.y;
    
    // Додаємо обробник кліку
    wrapper.addEventListener('click', function() {
        handleUnitClick(hero, wrapper);
    });
    
    // Додаємо до карти
     // Додаємо до карти
     mapElement.appendChild(wrapper);
    
     console.log(`✅ Візуальний елемент для ${hero.name} створено на (${hero.x}, ${hero.y})`);
     
     // Оновлюємо візуальний стан героя
     setTimeout(() => {
         if (typeof window.updateUnitVisualState === 'function') {
             window.updateUnitVisualState(hero);
         }
     }, 100);
 }

/**
 * Оновлює таймери воскресіння для всіх мертвих героїв
/**
 * Оновлює таймери воскресіння для всіх мертвих героїв
 * @param {number} playerIndex - індекс гравця, який закінчив хід
 */
function updateRespawnTimers(playerIndex) {
    console.log(`⏳ Оновлення таймерів воскресіння для гравця ${playerIndex + 1}`);
    
    let timersUpdated = 0;
    let heroesReadyToRespawn = [];
    
    // Проходимо по всіх мертвих героях
    deadHeroesWaitingForRespawn.forEach(hero => {
        // ✅ ВИПРАВЛЕННЯ: Зменшуємо таймер тільки для героїв цього гравця
        if (hero.playerIndex === playerIndex) {
            // ✅ ВИПРАВЛЕННЯ: Зменшуємо таймер тільки якщо він більше 0
            if (hero.respawnTimer > 0) {
                hero.respawnTimer--;
                timersUpdated++;
                
                console.log(`📉 Герой ${hero.name}: таймер зменшено до ${hero.respawnTimer}`);
                
                // ✅ ВИПРАВЛЕННЯ: Оновлюємо таймер у модальному вікні
                if (typeof window.updateHeroRespawnTimer === 'function') {
                    window.updateHeroRespawnTimer(hero);
                }
                
                // Перевіряємо чи герой готовий до воскресіння
                if (hero.respawnTimer <= 0) {
                    heroesReadyToRespawn.push(hero);
                    console.log(`✅ Герой ${hero.name} готовий до воскресіння!`);
                }
            } else {
                // Таймер вже 0 або менше - герой готовий до воскресіння
                heroesReadyToRespawn.push(hero);
                console.log(`✅ Герой ${hero.name} вже готовий до воскресіння (таймер: ${hero.respawnTimer})`);
            }
        } else {
            console.log(`⏭️ Герой ${hero.name} пропущений (належить гравцю ${hero.playerIndex + 1}, а не ${playerIndex + 1})`);
        }
    });
    
    console.log(`📊 Оновлено таймери для ${timersUpdated} героїв`);
    console.log(`📊 Героїв готових до воскресіння: ${heroesReadyToRespawn.length}`);
    
    // Воскрешаємо героїв, які готові
    heroesReadyToRespawn.forEach(hero => {
        respawnHero(hero);
    });
}

// Експортуємо нові функції для таймерів на карті
window.addRespawnTimerToHeroImage = addRespawnTimerToHeroImage;
window.updateHeroRespawnTimerOnMap = updateHeroRespawnTimerOnMap;

window.clearUnitTablo = clearUnitTablo;
window.clearMoveCells = clearMoveCells;
window.updateUnitTablo = updateUnitTablo;
// Експортуємо функцію для використання в інших файлах
window.isCellBlocked = isCellBlocked;


// Експортуємо функції системи воскресіння
window.initHeroRespawnFields = initHeroRespawnFields;
window.initAllHeroesRespawnFields = initAllHeroesRespawnFields;
window.handleHeroDeath = handleHeroDeath;
window.updateRespawnTimers = updateRespawnTimers;
window.respawnHero = respawnHero;
window.findFreeCellNearCastle = findFreeCellNearCastle;


// ============================================
// ІНІЦІАЛІЗАЦІЯ СИСТЕМИ ВОСКРЕСІННЯ
// ============================================

/**
 * Ініціалізує систему воскресіння після повного завантаження гри
 */
function initRespawnSystem() {
    console.log('🔧 Ініціалізація системи воскресіння героїв...');
    
    // Затримка для того, щоб всі юніти встигли завантажитися
    setTimeout(() => {
        if (typeof initAllHeroesRespawnFields === 'function') {
            initAllHeroesRespawnFields();
            console.log('✅ Система воскресіння героїв ініціалізована');
        } else {
            console.error('❌ Функція initAllHeroesRespawnFields не знайдена!');
        }
    }, 1500); // 1.5 секунди затримки для надійності
}

// Ініціалізуємо систему воскресіння після завантаження DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('📄 DOM завантажено, ініціалізуємо систему воскресіння...');
        initRespawnSystem();
    });
} else {
    console.log('📄 DOM вже завантажено, ініціалізуємо систему воскресіння...');
    initRespawnSystem();
}

// Експортуємо функцію ініціалізації
window.initRespawnSystem = initRespawnSystem;
