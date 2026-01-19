// ============================================
// ЛОГІКА МАГАЗИНУ ЗАМКУ
// ============================================

let selectedUnit = null; // Вибраний юніт для покупки
let isBuying = false; 


/**
 * Виділяє вибрану карточку юніта
 */
function selectUnitCard(card) {
    const allCards = document.querySelectorAll('.modalItem');
    allCards.forEach(c => c.classList.remove('selected'));
    
    card.classList.add('selected');
    
    const unitName = card.querySelector('.unitNameModal')?.innerText || 'Юніт';
    const unitIndex = parseInt(card.dataset.unitIndex);
    
    const currentPlayer = players[currentPlayerIndex];
    
    // ⬇️ ЗМІНЕНО: Використовуємо availableUnits замість races[raceKey]
    if (!currentPlayer.availableUnits || !currentPlayer.availableUnits[unitIndex]) {
        console.error(`❌ Юніт з індексом ${unitIndex} не знайдений у гравця!`);
        return;
    }
    
    // Зберігаємо вибраний юніт
    selectedUnit = {
        unit: currentPlayer.availableUnits[unitIndex],
        unitIndex: unitIndex
    };
    
    // Оновлюємо назву в кнопці покупки
    if (modalBtnBuyUnitsName) {
        modalBtnBuyUnitsName.innerText = unitName;
    }
    
    // Показуємо кнопку покупки
    if (ModalBtnBuyUnits) {
        ModalBtnBuyUnits.style.display = "block";
    }
    
    // console.log(`✅ Вибрано юніта: ${unitName} (рівень ${selectedUnit.unit.level})`);
}

/**
 * Купує вибраний юніт
 */
function buyUnit() {
    
    if (isBuying) {
        return;
    }

    if (!selectedUnit) {
      
        return;
    }

    // Встановлюємо прапорець
    isBuying = true;
    
    if (!selectedCastle) {
        // console.error('❌ Замок не вибраний!');
        isBuying = false; // ⬅️ ДОДАЙТЕ: Скидаємо прапорець
        return;
    }
    
    const currentPlayer = players[currentPlayerIndex];
    
    if (!currentPlayer) {
        // console.error('❌ Поточний гравець не знайдений!');
        isBuying = false; // ⬅️ ДОДАЙТЕ: Скидаємо прапорець
        return;
    }
    
    const unit = selectedUnit.unit;
    
    // Перевірка 1: Чи достатньо золота?
    if (currentPlayer.gold < unit.coin) {
        alert(`❌ Недостатньо золота!\nПотрібно: ${unit.coin}, є: ${currentPlayer.gold}`);
        // console.log(`❌ Недостатньо золота: ${currentPlayer.gold} < ${unit.coin}`);
        window.closeShop();
        isBuying = false; // ⬅️ ДОДАЙТЕ: Скидаємо прапорець
        return;
    }
    
    // Перевірка 2: Чи не перевищено ліміт юнітів?
    const currentUnitsCount = unitsOnMap.filter(u => u.playerIndex === currentPlayerIndex).length;
    
    if (currentUnitsCount >= maxUnitsOnField) {
        alert(`❌ Досягнуто максимальну кількість юнітів!\nМаксимум: ${maxUnitsOnField}`);
        // console.log(`❌ Ліміт юнітів: ${currentUnitsCount} >= ${maxUnitsOnField}`);
        window.closeShop();
        isBuying = false; // ⬅️ ДОДАЙТЕ: Скидаємо прапорець
        return;
    }
    
    // Перевірка 3: Чи можна купити юніта в цьому замку?
    const buyCheck = canBuyUnitInCastle(selectedCastle);
    if (!buyCheck.canBuy) {
        alert(buyCheck.message);
        window.closeShop();
        isBuying = false; // Скидаємо прапорець
        return;
    }
    
    // Віднімаємо золото
    currentPlayer.gold -= unit.coin;
    
    // Оновлюємо відображення золота
    if (goldNumber) {
        goldNumber.innerText = currentPlayer.gold;
    }
    
    console.log(`🔍 Створення юніта: unit.race = ${unit.race}, currentPlayer.race = ${currentPlayer.race}`);
    console.log(`🔍 unit об'єкт має race?`, 'race' in unit);
    console.log(`🔍 currentPlayer об'єкт:`, currentPlayer);

    // Створюємо копію юніта для карти
        // Створюємо копію юніта для карти
        const newUnit = {
            ...unit,
            // ⬇️ ДОДАНО: Унікальний ID
            id: `unit_p${currentPlayerIndex}_${Date.now()}_${Math.random()}`,
            
            playerIndex: currentPlayerIndex,
            x: selectedCastle.x,
            y: selectedCastle.y,
            moved: false,
            attacked: false,
            canAttack: true,
            isHero: false,
            maxHp: unit.hp,
            newhp: unit.hp,
            originalRace: currentPlayer.race,
            // ✅ ДОДАНО: Зберігаємо race та upgrades
            race: unit.race || currentPlayer.race,
            upgrades: unit.upgrades || 0,
            createdAt: Date.now(),
            // 🔴 ДОДАТИ: Ініціалізація baseStats
            baseStats: {
                attack: unit.attack || 0,
                armor: unit.armor || 0,
                step: unit.step || 0,
                range: unit.range || 0,
                maxHp: unit.hp || unit.maxHp || 100
            }
        };
        
        console.log(`🔍 Створено новий юніт:`, {
            name: newUnit.name,
            unitId: newUnit.unitId,
            race: newUnit.race,
            upgrades: newUnit.upgrades,
            level: newUnit.level
        });
        // Ініціалізуємо екземпляри здібностей для юніта
        // Ініціалізуємо екземпляри здібностей для юніта
               // Ініціалізуємо екземпляри здібностей для юніта
if (window.Ability && window.abilities) {
    newUnit.abilityInstances = [];
    if (newUnit.abilities && Array.isArray(newUnit.abilities)) {
        newUnit.abilities.forEach(abilityRef => {
            // abilityRef = {key: 'armorAura', power: 3}
            const abilityTemplate = window.abilities[abilityRef.key];
            if (abilityTemplate) {
                // Створюємо повний шаблон з power
                const fullTemplate = {
                    ...abilityTemplate,
                    power: abilityRef.power || abilityRef.value || 0
                };
                try {
                    const abilityInstance = new window.Ability(fullTemplate);
                    newUnit.abilityInstances.push(abilityInstance);
                    console.log(`✨ Створено здібність: ${abilityInstance.name} (${abilityInstance.actionType}, power: ${abilityRef.power})`);
                } catch (error) {
                    console.error('❌ Помилка створення здібності:', error, abilityRef);
                }
            } else {
                console.error(`❌ Не знайдено шаблон здібності для ключа: ${abilityRef.key}`);
            }
        });
    }
} else {
    console.error('❌ window.Ability або window.abilities не знайдено');
}
    
    // Знаходимо вільну позицію біля замку
    const position = findFreePositionNearCastle(selectedCastle);
    if (position) {
        newUnit.x = position.x;
        newUnit.y = position.y;
    }
    
    // Додаємо юніта на карту
    unitsOnMap.push(newUnit);
        // ✅ ДОДАНО: Застосовуємо аури для всіх юнітів після покупки нового
        // if (window.EffectsManager && typeof window.EffectsManager.applyAllAuras === 'function') {
        //     window.EffectsManager.applyAurasForNewUnit(newUnit);
        //   }
   
    const cellPlayer = createUnitVisual(newUnit);

    // Оновлюємо лічильник юнітів
    updateUnitsCount();
    
    
    closeShop();

    // Скидаємо вибір ПЕРЕД тим як дозволити рух
    selectedUnit = null;
    
    // Ховаємо кнопку покупки
    if (ModalBtnBuyUnits) {
        ModalBtnBuyUnits.style.display = "none";
    }

    // ✅ ДОДАЙТЕ ЦІ РЯДКИ: Автоматично вибираємо новокупленого юніта
if (typeof selectedUnitForMove !== 'undefined') {
    selectedUnitForMove = newUnit;
    selectedUnitVisual = cellPlayer;
    // console.log('🎯 Автоматично вибрано купленого юніта:', newUnit.name);
    
    // Оновлюємо табло юніта
    if (typeof updateUnitTablo === 'function') {
        updateUnitTablo(newUnit);
    }
}
    // Скидаємо прапорець
    isBuying = false;

    // ⬅️ ПЕРЕМІЩЕНО: Автоматично підсвічуємо доступні клітинки для руху ПІСЛЯ закриття магазину
    if (typeof highlightMoveCells !== 'undefined' && typeof enableUnitMovement !== 'undefined') {
        // Невелика затримка щоб DOM оновився
        setTimeout(() => {
            // ⬅️ ДОДАЙТЕ: Оновлюємо табло з даними юніта
            if (typeof updateUnitTablo === 'function') {
                updateUnitTablo(newUnit);
            } else if (typeof window.updateUnitTablo === 'function') {
                window.updateUnitTablo(newUnit);
            }
            
            highlightMoveCells(newUnit);
            if (cellPlayer) {
                enableUnitMovement(newUnit, cellPlayer);
            }
        }, 100); // ⬅️ ЗБІЛЬШЕНО затримку до 100мс
    }
}

/**
 * Знаходить вільну позицію біля замку
 */
function findFreePositionNearCastle(castle) {
    // Позиції навколо замку (спочатку перевіряємо ці)
    const positions = [
        { x: castle.x - 1, y: castle.y },     // зліва
        { x: castle.x + 1, y: castle.y },     // справа
        { x: castle.x, y: castle.y - 1 },     // зверху
        { x: castle.x, y: castle.y + 1 },     // знизу
        { x: castle.x - 1, y: castle.y - 1 }, // лівий верхній
        { x: castle.x + 1, y: castle.y - 1 }, // правий верхній
        { x: castle.x - 1, y: castle.y + 1 }, // лівий нижній
        { x: castle.x + 1, y: castle.y + 1 }  // правий нижній
    ];
    
    // Шукаємо вільну позицію
    for (const pos of positions) {
        // Перевіряємо чи не виходить за межі карти
        if (pos.x < 0 || pos.y < 0 || !mapData[pos.y] || !mapData[pos.y][pos.x]) {
            continue;
        }
        
        // Перевіряємо чи не вода (тип 3)
        if (mapData[pos.y][pos.x] === 3) {
            continue;
        }
        
                // Перевіряємо чи немає там вже юніта (будь-якого гравця)
                const hasUnit = unitsOnMap.some(u => u.x === pos.x && u.y === pos.y);
                if (!hasUnit) {
                    return pos;
                }
    }
    
    // Якщо всі позиції зайняті, повертаємо null
    return null;
}

/**
 * Створює візуальний елемент юніта на карті
 */
function createUnitVisual(unit) {
    if (!map) return null;
    
    // Створюємо img елемент
    let cellPlayer = document.createElement("img");
    cellPlayer.classList.add("cellPlayer");
    cellPlayer.src = unit.img;
    cellPlayer.style.boxSizing = "border-box";
    cellPlayer.style.objectFit = "contain";
    cellPlayer.style.pointerEvents = "none";
    
    // Створюємо wrapper з health bar
    const wrapper = createUnitWithHealthBar(unit, cellPlayer);
wrapper.dataset.unitId = unit.id;
    
    map.appendChild(wrapper);
    
    if (typeof updateUnitCellHighlight === 'function') {
        updateUnitCellHighlight(unit);
    }
    
    return wrapper;
}

/**
 * Оновлює лічильник юнітів на табло
 */
function updateUnitsCount() {
    const currentPlayer = players[currentPlayerIndex];
    if (!currentPlayer) return;
    
    const currentUnitsCount = unitsOnMap.filter(u => u.playerIndex === currentPlayerIndex).length;
    
    if (cauntNowUnits) {
        cauntNowUnits.innerText = currentUnitsCount;
    }
}



/**
 * Ініціалізація обробників магазину
 */
function initShopHandlers() {
    // Обробник кнопки відкриття магазину
    if (btnBuyCastle) {
        btnBuyCastle.addEventListener('click', () => {
            openShop();
        });
        // console.log('✅ Кнопка відкриття магазину підключена');
    }
    
    // Обробник кнопки закриття магазину
    const modalBtnLineClose = document.querySelector('.modalBtnLineClose');
    if (modalBtnLineClose) {
        modalBtnLineClose.addEventListener('click', () => {
            closeShop();
        });
        // console.log('✅ Кнопка закриття магазину підключена');
    }
    
    // Обробник кнопки покупки юніта
    if (ModalBtnBuyUnits) {
        ModalBtnBuyUnits.addEventListener('click', () => {
            buyUnit();
        });
        // console.log('✅ Кнопка покупки юніта підключена');
        
        // За замовчуванням ховаємо кнопку
        ModalBtnBuyUnits.style.display = "none";
    }
    
    // За замовчуванням магазин закритий
    closeShop();
}

/**
 * Ініціалізація обробника кнопки покупки
 */
function initBuyUnitHandler() {
    // Обробник кнопки покупки юніта
    if (ModalBtnBuyUnits) {
        ModalBtnBuyUnits.addEventListener('click', () => {
            buyUnit();
        });
        // console.log('✅ Кнопка покупки юніта підключена');
        
        // За замовчуванням ховаємо кнопку
        ModalBtnBuyUnits.style.display = "none";
    }
}

// Ініціалізуємо після завантаження DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initBuyUnitHandler, 250);
    });
} else {
    setTimeout(initBuyUnitHandler, 250);
}

// ДЕЯКІ ДОДАТКОВІ ДАНІ ДЛЯ РОБОТИ З ЮНІТАМИ

/**
 * Знаходить юніта за ID
 */
function getUnitById(id) {
    return unitsOnMap.find(u => u.id === id);
}

/**
 * Знаходить юніта за координатами
 */
function getUnitAtPosition(x, y) {
    return unitsOnMap.find(u => u.x === x && u.y === y);
}

/**
 * Знаходить всіх юнітів гравця
 */
function getPlayerUnits(playerIndex) {
    return unitsOnMap.filter(u => u.playerIndex === playerIndex);
}

/**
 * Видаляє юніта з карти
 */
function removeUnit(unit) {
    const index = unitsOnMap.findIndex(u => u.id === unit.id);
    if (index !== -1) {
        unitsOnMap.splice(index, 1);
        
        // Видаляємо візуальний елемент
        const visual = document.querySelector(`[data-unit-id="${unit.id}"]`);
        if (visual) {
            visual.remove();
        }
        
        updateUnitsCount();
        return true;
    }
    return false;
}


/**
 * Перевіряє, чи зайнята клітинка на карті
 * @param {number} x - координата X клітинки
 * @param {number} y - координата Y клітинки
 * @returns {boolean} - true якщо клітинка зайнята, false якщо вільна
 */
function isCellOccupied(x, y, playerIndex = null) {
    // Перевіряємо чи координати в межах карти
    if (x < 0 || y < 0 || !mapData || !mapData[y] || !mapData[y][x]) {
        return true; // Якщо за межами карти - вважаємо зайнятою
    }
    
    // Перевіряємо чи є на цій клітинці юніт
    const hasUnit = unitsOnMap.some(unit => {
        if (unit.x === x && unit.y === y) {
            // Якщо вказано playerIndex, перевіряємо чи це юніт іншого гравця
            if (playerIndex !== null) {
                return unit.playerIndex !== playerIndex; // Зайнято тільки якщо це юніт іншого гравця
            }
            return true; // Зайнято будь-яким юнітом
        }
        return false;
    });
    
    return hasUnit;
}

/**
 * Перевіряє, чи можна купити юніта в замку
 * @param {Object} castle - об'єкт замку
 * @returns {Object} - результат перевірки {canBuy: boolean, message: string}
 */
function canBuyUnitInCastle(castle) {
    // Перевіряємо чи замок належить поточному гравцю
    if (castle.playerIndex !== currentPlayerIndex) {
        return {
            canBuy: false,
            message: "❌ Цей замок не належить вам!"
        };
    }
    
        // Перевіряємо чи клітинка замку зайнята ЮНІТОМ ІНШОГО ГРАВЦЯ
    // Дозволяємо купувати, якщо на замку стоїть юніт того ж гравця
    if (isCellOccupied(castle.x, castle.y, currentPlayerIndex)) {
        return {
            canBuy: false,
            message: "❌ На замку стоїть юніт іншого гравця!"
        };
    }
    
    // Шукаємо вільну позицію навколо замку
    const freePosition = findFreePositionNearCastle(castle);
    
    // Якщо знайшли вільну позицію
    if (freePosition && !isCellOccupied(freePosition.x, freePosition.y)) {
        return {
            canBuy: true,
            message: "✅ Можна купити юніта"
        };
    }
    
    // Якщо всі позиції зайняті
    return {
        canBuy: false,
        message: "❌ Немає вільної позиції біля замку! Пересуньте юніта перед замком!."
    };
}