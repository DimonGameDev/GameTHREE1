// ============================================
// СИСТЕМА ПРОГРЕСУ ЮНІТІВ (ПОЕТАПНЕ ВДОСКОНАЛЕННЯ)
// ============================================

/**
 * Мапа індексів юнітів на типи
 * Кожна раса має фіксований порядок: warrior, archer, shaman, horse, pikener, horseman, catapult
 */
const UNIT_TYPE_MAP = {
    0: 'warrior',
    1: 'archer',
    2: 'shaman',
    3: 'horse',
    4: 'horseman',    // 👈 Було pikener
    5: 'catapult',    // 👈 Було horseman
    6: 'pikener',     // 👈 Було catapult
    7: 'support',
    8: 'specialist',
    9: 'mage',
    10: 'wisp'
};

const TYPE_TO_INDEX_MAP = {
    'warrior': 0,
    'archer': 1,
    'shaman': 2,
    'horse': 3,
    'horseman': 4,    // 👈 Було 5
    'catapult': 5,    // 👈 Було 6
    'pikener': 6,     // 👈 Було 4
    'support': 7,
    'specialist': 8,
    'mage': 9,
    'wisp': 10
};

/**
 * Налаштування системи прогресу
 */
const PROGRESS_CONFIG = {
    // Поріг мани для кожного переходу рівня (індекс 0 = перехід з рівня 1 на 2)
    manaThresholds: [
        100,  // Рівень 1 → 2: потрібно 100 мани
        150,  // Рівень 2 → 3: потрібно 150 мани
        200,  // Рівень 3 → 4: потрібно 200 мани
        300,  // Рівень 4 → 5: потрібно 300 мани
        400,  // Рівень 5 → 6: потрібно 400 мани
        500,  // Рівень 6 → 7: потрібно 500 мани
        600   // Рівень 7 → 8: потрібно 600 мани
    ],
    maxLevel: 8,               // Максимальний рівень юніта
    showNotifications: true    // Показувати повідомлення про прогрес
};

/**
 * Отримує поріг мани для поточного рівня з upgradeCost юніта
 * @param {number} currentLevel - поточний рівень юніта (1-7)
 * @param {object} unit - об'єкт юніта (опціонально, для отримання upgradeCost)
 * @returns {number} поріг мани для наступного рівня
 */
function getManaThreshold(currentLevel, unit = null) {
    console.log(`🔍 getManaThreshold: level=${currentLevel}, unit=`, unit, `upgradeCost=${unit?.upgradeCost}`);
    
    // Якщо передано юніта і у нього є upgradeCost - використовуємо його
    if (unit && unit.upgradeCost !== undefined && unit.upgradeCost !== null) {
        console.log(`✅ Використовую upgradeCost: ${unit.upgradeCost}`);
        return unit.upgradeCost;
    }
    
    // Інакше використовуємо старий масив (для сумісності)
    console.log(`⚠️ upgradeCost не знайдено, використовую масив`);
    const index = currentLevel - 1;
    if (index < 0 || index >= PROGRESS_CONFIG.manaThresholds.length) {
        return PROGRESS_CONFIG.manaThresholds[0];
    }
    return PROGRESS_CONFIG.manaThresholds[index];
}

/**
 * Отримує об'єкт з рівнями для конкретного типу юніта
 * @param {string} raceKey - ключ раси (orcs, elves, humans, undead, demons)
 * @param {number} unitIndex - індекс типу юніта (0-6)
 * @returns {object|null} об'єкт з рівнями або null
 */
function getUnitLevelsObject(raceKey, unitIndex) {
    // Мапа типів юнітів за індексами
    const unitTypeNames = ['Warrior', 'Archer', 'Shaman', 'Horses', 'Horseman', 'Catapult', 'Pikener'];
//                      Index 0    Index 1   Index 2   Index 3   Index 4     Index 5     Index 6
    
    // Мапа рас на префікси змінних
    const racePrefixes = {
        'orcs': 'orc',
        'elves': 'elf',
        'humans': 'pipl',
        'undead': 'beetle',
        'demons': 'demon'
    };
    
    const prefix = racePrefixes[raceKey];
    const typeName = unitTypeNames[unitIndex];
    
    if (!prefix || !typeName) {
        console.error('❌ Невірний raceKey або unitIndex:', raceKey, unitIndex);
        return null;
    }
    
    // Формуємо ім'я змінної, наприклад: orcWarriorLevels
    const variableName = `${prefix}${typeName}Levels`;
    
    // Отримуємо об'єкт з глобального scope
    const levelsObject = window[variableName];
    
    if (!levelsObject) {
        console.error('❌ Об\'єкт рівнів не знайдений:', variableName);
        return null;
    }
    
    return levelsObject;
}

/**
 * Отримує префікс unitId для конкретного типу юніта
 * @param {string} raceKey - ключ раси
 * @param {number} unitIndex - індекс типу юніта
 * @returns {string} префікс unitId (наприклад, "orc10")
 */
function getUnitIdPrefix(raceKey, unitIndex) {
    // Префікси ID для рас
    const raceIdPrefixes = {
        'orcs': 'orc',
        'elves': 'elf',
        'humans': 'pipl',
        'undead': 'beet',
        'demons': 'demo'
    };
    
    const prefix = raceIdPrefixes[raceKey];
    if (!prefix) {
        console.error('❌ Невідома раса:', raceKey);
        return '';
    }
    
    // Формуємо префікс ID: наприклад orc10 для воїна, orc20 для лучника
    return `${prefix}${unitIndex + 1}0`;
}
/**
 * Перевіряє чи досягнуто порогу мани і вдосконалює юнітів
 * Викликається після кожного отримання мани в бою
 * @param {number} playerIndex - індекс гравця
 * @param {string} unitType - тип юніта (warrior, archer, тощо)
 * @returns {boolean} true якщо досягнуто порогу та відбулося вдосконалення
 */
function checkAndUpgradeIfReady(playerIndex, unitType) {
    const player = players[playerIndex];
    if (!player || !player.unitMana) {
        console.error('❌ Гравець або unitMana не знайдені!');
        return false;
    }
    
    // Знаходимо індекс юніта за типом
    const unitIndex = TYPE_TO_INDEX_MAP[unitType];
    if (unitIndex === undefined) {
        console.error('❌ Невідомий тип юніта:', unitType);
        return false;
    }
    
    // Отримуємо расу гравця та поточний рівень юніта
    const raceKey = raceMap[player.race];
    if (!raceKey || !races[raceKey]) {
        console.error('❌ Раса не знайдена:', player.race);
        return false;
    }
    
    if (!player.availableUnits || !player.availableUnits[unitIndex]) {
        console.error('❌ Юніт не знайдений в availableUnits гравця');
        return false;
    }
    
    const currentShopUnit = player.availableUnits[unitIndex];
    if (!currentShopUnit) {
        console.error('❌ Юніт не знайдений в магазині');
        return false;
    }
    
    const currentLevel = currentShopUnit.level;
const threshold = getManaThreshold(currentLevel, currentShopUnit); // 👈 Передаємо юніта
    
    console.log(`🔍 Перевірка прогресу ${unitType} (рівень ${currentLevel}): ${player.unitMana[unitType]}/${threshold}`);
    
    // Перевіряємо чи досягнуто порогу
    if (player.unitMana[unitType] >= threshold) {
        return upgradeAllUnitsOfType(playerIndex, unitType, unitIndex);
    }
    
    return false;
}

/**
 * Вдосконалює всі юніти певного типу для гравця
 * @param {number} playerIndex - індекс гравця
 * @param {string} unitType - тип юніта (warrior, archer, тощо)
 * @param {number} unitIndex - індекс юніта в масиві раси
 * @returns {boolean} true якщо вдосконалення відбулося
 */
function upgradeAllUnitsOfType(playerIndex, unitType, unitIndex) {
    const player = players[playerIndex];
    
    // Отримуємо расу гравця
    const raceKey = raceMap[player.race];
    if (!raceKey || !races[raceKey]) {
        //console.error('❌ Раса не знайдена:', player.race);
        return false;
    }
    
    // Отримуємо поточний рівень юніта в магазині ГРАВЦЯ
if (!player.availableUnits || !player.availableUnits[unitIndex]) {
    console.error('❌ Юніт не знайдений в availableUnits гравця');
    return false;
}

const currentShopUnit = player.availableUnits[unitIndex];
    
    const currentLevel = currentShopUnit.level;
    const nextLevel = currentLevel + 1;
    
    // Отримуємо поріг для цього рівня
    const threshold = getManaThreshold(currentLevel, currentShopUnit); // 👈 Передаємо юніта
    
    console.log(`\n🎯 ВДОСКОНАЛЕННЯ ЮНІТІВ ТИПУ: ${unitType}`);
    //console.log(`   Гравець: ${playerIndex + 1}`);
    //console.log(`   Витрачено мани: ${threshold}, банка обнулена`);
    
    // 🔄 ПОВНІСТЮ ОБНУЛЯЄМО БАНКУ після покращення
    player.unitMana[unitType] = 0;
    
    // Перевіряємо чи не максимальний рівень
    if (nextLevel > PROGRESS_CONFIG.maxLevel) {
        if (PROGRESS_CONFIG.showNotifications) {
            alert(`✅ ${currentShopUnit.name} досягли максимального рівня!`);
        }
        return false;
    }
    
    // Знаходимо об'єкт з рівнями для цього типу юніта
    const unitLevelsObject = getUnitLevelsObject(raceKey, unitIndex);
    if (!unitLevelsObject) {
        //console.error('❌ Не знайдено об\'єкт рівнів для юніта');
        return false;
    }
    
    const nextLevelUnit = unitLevelsObject[`level${nextLevel}`];
    if (!nextLevelUnit) {
        console.error('❌ Наступний рівень не знайдений:', nextLevel);
        return false;
    }
    
    // 1. Оновлюємо юніта в магазині з правильним кольором
const coloredNextLevelUnit = window.createColoredUnit 
? window.createColoredUnit(nextLevelUnit, player.originalIndex)
: nextLevelUnit;

player.availableUnits[unitIndex] = coloredNextLevelUnit;
console.log(`✅ Магазин: ${currentShopUnit.name} → ${nextLevelUnit.name} (рівень ${nextLevel})`);
    
    // 2. Оновлюємо всі юніти цього типу на полі
    // let upgradedCount = 0;
        // 2. Оновлюємо всі юніти цього типу на полі
           // 2. Оновлюємо всі юніти цього типу на полі
    let upgradedCount = 0;
    unitsOnMap.forEach((unit, index) => {
        // Перевіряємо чи це юніт потрібного гравця і типу
        if (unit.playerIndex === playerIndex && unit.unitId && unit.unitId.startsWith(getUnitIdPrefix(raceKey, unitIndex))) {
            
            // 🎯 ВИПРАВЛЕННЯ: Зберігаємо стан руху/атаки
            let finalMoved = unit.moved;
            let finalAttacked = unit.attacked;
            
            // Якщо юніт атакував - він не може більше рухатись (для всіх юнітів)
            if (unit.attacked) {
                finalMoved = true;
                console.log(`🎯 ${unit.name} (${unit.id}) атакував → рух заблокований після апгрейду`);
            }
            
            // Додаткова перевірка для катапульти (вона не може рухатись після атаки взагалі)
            if (unit.name && unit.name.toLowerCase().includes('катапульт') && unit.attacked) {
                finalMoved = true;
                finalAttacked = true;
            }
            
            // Створюємо вдосконаленого юніта
            const upgradedUnit = {
                ...nextLevelUnit,
                x: unit.x,
                y: unit.y,
                newhp: Math.min((unit.newhp || unit.hp), nextLevelUnit.hp),
                playerIndex: unit.playerIndex,
                moved: finalMoved,      // 👈 Використовуємо finalMoved
                attacked: finalAttacked, // 👈 Використовуємо finalAttacked
                id: unit.id,
                effects: unit.effects || []
            };
            
            unitsOnMap[index] = upgradedUnit;
            upgradedCount++;
            
            // 🔍 ДІАГНОСТИКА: Перевіряємо що записалося
            console.log(`🔍 Після апгрейду ${upgradedUnit.name}: moved=${upgradedUnit.moved}, attacked=${upgradedUnit.attacked}, id=${upgradedUnit.id}`);
            console.log(`🔍 Перевірка unitsOnMap[${index}]:`, unitsOnMap[index].moved, unitsOnMap[index].attacked);
        }
    });
    console.log("пппп");
    console.log(`✅ На полі вдосконалено ${upgradedCount} юнітів`);
    
    // 3. Оновлюємо відображення (якщо магазин відкритий)
    if (typeof ModalWindowsShop !== 'undefined' && ModalWindowsShop && ModalWindowsShop.style.display === 'block') {
        if (typeof fillShopWithUnits === 'function') {
            fillShopWithUnits(player.race);
        }
    }
    
        // 🆕 4. Оновлюємо табло інформації, якщо зараз вибраний юніт цього типу
        if (typeof selectedUnitForMove !== 'undefined' && selectedUnitForMove && selectedUnitForMove.playerIndex === playerIndex) {
            const selectedUnitType = typeof getUnitType === 'function' ? getUnitType(selectedUnitForMove) : null;
            if (selectedUnitType === unitType) {
                // Знаходимо оновленого юніта в unitsOnMap
                const updatedUnit = unitsOnMap.find(u => u.id === selectedUnitForMove.id);
                if (updatedUnit) {
                    // Оновлюємо глобальну змінну
                    if (typeof window !== 'undefined') {
                        window.selectedUnitForMove = updatedUnit;
                    }
                    selectedUnitForMove = updatedUnit; // Також оновлюємо локальну
                    
                    console.log('🔄 Оновлено selectedUnitForMove:', {
                        name: updatedUnit.name,
                        level: updatedUnit.level,
                        unitId: updatedUnit.unitId
                    });
                    
                    if (typeof updateUnitTablo === 'function') {
                        updateUnitTablo(updatedUnit);
                        console.log('📊 Оновлено табло для вибраного юніта');
                    }
                    if (typeof window.updateUnitVisualState === 'function') {
                        window.updateUnitVisualState(updatedUnit);
                        console.log('🎨 Оновлено візуальний стан юніта');
                    }
                }
            }
        }
    
    // Визначаємо наступний поріг (якщо не останній рівень)
    const nextThreshold = nextLevel < PROGRESS_CONFIG.maxLevel ? getManaThreshold(nextLevel) : 0;
    
    // Показуємо повідомлення
    if (PROGRESS_CONFIG.showNotifications) {
        const progressText = nextThreshold > 0 
            ? `\n\nДля рівня ${nextLevel + 1} потрібно зібрати: 0/${nextThreshold} мани`
            : '\n\nЦе максимальний рівень!';
        alert(`🎉 ВДОСКОНАЛЕННЯ!\n\n${nextLevelUnit.name} досягли рівня ${nextLevel}!\n\nВсі юніти цього типу покращені:\n- На полі: ${upgradedCount}\n- В магазині: так${progressText}`);
    }
    
    // Перерисовуємо карту
    if (typeof renderUnitsOnMap === 'function') {
        renderUnitsOnMap();
    }
    
    return true;
}

// ============================================
// ЕКСПОРТ ДЛЯ ВИКОРИСТАННЯ В ІНШИХ ФАЙЛАХ
// ============================================

window.unitProgressSystem = {
    checkAndUpgradeIfReady: checkAndUpgradeIfReady,
    upgradeAllUnitsOfType: upgradeAllUnitsOfType,
    getManaThreshold: getManaThreshold,
    PROGRESS_CONFIG: PROGRESS_CONFIG
};

//console.log('✅ Система прогресу юнітів завантажена');

