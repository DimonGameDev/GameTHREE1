// ============================================
// СИСТЕМА ПРОГРЕСУ ЮНІТІВ (ПОЕТАПНЕ ВДОСКОНАЛЕННЯ)
// ============================================
// ============================================
// СТАНДАРТНА СИСТЕМА ПРОКАЧКИ (ОДНАКОВА ДЛЯ ВСІХ)
// ============================================

const STANDARD_UPGRADE_SYSTEM = {
    // Стандартні вартості прокачки для кожного рівня
    upgradeCosts: [100, 150, 200, 250, 300, 350, 400], // рівень 1→2, 2→3, ... 7→8
    
    // Максимальний рівень
    maxLevel: 8,
    
    // Отримати вартість прокачки для рівня
    getUpgradeCost: function(currentLevel) {
        console.log(`💰 [STANDARD] Вартість для рівня ${currentLevel}`);
        const index = currentLevel - 1;
        if (index < 0 || index >= this.upgradeCosts.length) {
            return this.upgradeCosts[0] || 100;
        }
        const cost = this.upgradeCosts[index];
        console.log(`💰 [STANDARD] Результат: ${cost}`);
        return cost;
    },
    
    // Перевірити, чи можна прокачати
    canUpgrade: function(unit) {
        if (!unit || !unit.level) {
            console.log(`❌ [STANDARD] Не можна прокачати: немає юніта або рівня`);
            return false;
        }
        
        const can = unit.level < this.maxLevel;
        console.log(`🔍 [STANDARD] ${unit.name} рівень ${unit.level}: можна прокачати? ${can}`);
        return can;
    },
    
    // Прокачати юніта
    upgradeUnit: function(unit, source = 'unknown') {
        console.log(`\n🎯 [STANDARD] ====== ПРОКАЧКА ======`);
        console.log(`🎯 [STANDARD] Юніт: ${unit.name}, рівень: ${unit.level}, джерело: ${source}`);
        
        if (!this.canUpgrade(unit)) {
            console.log(`❌ [STANDARD] Не можна прокачати ${unit.name}`);
            return false;
        }
        
        const currentLevel = unit.level;
        const nextLevel = currentLevel + 1;
        
        console.log(`📈 [STANDARD] ${currentLevel} → ${nextLevel}`);
        
        // Оновлюємо рівень
        unit.level = nextLevel;
        
        // Оновлюємо unitId
        if (unit.baseUnitKey) {
            const oldUnitId = unit.unitId;
            unit.unitId = `${unit.baseUnitKey}:${nextLevel}`;
            console.log(`🆔 [STANDARD] unitId: ${oldUnitId} → ${unit.unitId}`);
        }
        
        // Оновлюємо стати з реєстру (якщо є)
        if (unit.baseUnitKey && window.unitsRegistry) {
            const unitData = window.unitsRegistry[unit.baseUnitKey];
            if (unitData && unitData.levels) {
                const nextLevelStats = unitData.levels[nextLevel];
                if (nextLevelStats) {
                    console.log(`📊 [STANDARD] Оновлюю стати з реєстру:`, nextLevelStats);
                    Object.assign(unit, nextLevelStats);
                } else {
                    console.log(`⚠️ [STANDARD] Немає даних для рівня ${nextLevel} в реєстрі`);
                }
            }
        }
        
        console.log(`✅ [STANDARD] ${unit.name} прокачано до рівня ${nextLevel}`);
        console.log(`🎯 [STANDARD] ====== КІНЕЦЬ ======\n`);
        
        return true;
    }
};
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
    // Використовуємо стандартну систему
    return STANDARD_UPGRADE_SYSTEM.getUpgradeCost(currentLevel);
}
    
   
/**
 * Перевіряє юніта на можливість прокачки
 * @param {object} unit - об'єкт юніта
 * @returns {object} результат перевірки {valid: boolean, errors: array, unitData: object}
 */
function validateUnitForUpgrade(unit) {
    const errors = [];
    
    console.log(`🔍 [VALIDATE] Перевірка юніта:`, {
        name: unit?.name,
        unitId: unit?.unitId,
        baseUnitKey: unit?.baseUnitKey,
        level: unit?.level,
        type: typeof unit?.level
    });
    
    // 1. Перевірка baseUnitKey
    if (!unit || !unit.baseUnitKey) {
        errors.push(`❌ baseUnitKey не визначений`);
        console.error(`❌ [VALIDATE] ${unit?.name || 'Невідомий юніт'}: baseUnitKey не визначений`);
        return { valid: false, errors, unitData: null };
    }
    
    // 2. Перевірка unitsRegistry
    if (!window.unitsRegistry) {
        errors.push(`❌ unitsRegistry не доступний`);
        console.error(`❌ [VALIDATE] unitsRegistry не доступний`);
        return { valid: false, errors, unitData: null };
    }
    
    const unitData = window.unitsRegistry[unit.baseUnitKey];
    if (!unitData) {
        errors.push(`❌ Юніт ${unit.baseUnitKey} не знайдений в реєстрі`);
        console.error(`❌ [VALIDATE] Юніт ${unit.baseUnitKey} не знайдений в реєстрі`);
        console.error(`Доступні ключі:`, Object.keys(window.unitsRegistry).filter(k => k.includes(':')));
        return { valid: false, errors, unitData: null };
    }
    
    // 3. Перевірка рівнів
    if (!unitData.levels) {
        errors.push(`❌ У юніта ${unit.baseUnitKey} немає рівнів`);
        console.error(`❌ [VALIDATE] У юніта ${unit.baseUnitKey} немає рівнів`);
        return { valid: false, errors, unitData };
    }
    
    // 4. Перевірка level
    let currentLevel = unit.level;
    if (currentLevel === undefined || currentLevel === null) {
        errors.push(`⚠️ level не визначений, встановлюю 1`);
        currentLevel = 1;
        unit.level = 1;
    } else if (typeof currentLevel === 'string') {
        const parsed = parseInt(currentLevel);
        if (isNaN(parsed)) {
            errors.push(`❌ level "${currentLevel}" не є числом`);
            console.error(`❌ [VALIDATE] level "${currentLevel}" не є числом`);
            currentLevel = 1;
            unit.level = 1;
        } else {
            unit.level = parsed;
            currentLevel = parsed;
        }
    } else if (typeof currentLevel !== 'number') {
        errors.push(`❌ level має невірний тип ${typeof currentLevel}`);
        console.error(`❌ [VALIDATE] level має невірний тип ${typeof currentLevel}`);
        currentLevel = 1;
        unit.level = 1;
    }
    
    // 5. Перевірка максимального рівня
    if (currentLevel >= PROGRESS_CONFIG.maxLevel) {
        errors.push(`ℹ️ Юніт вже максимального рівня (${currentLevel})`);
        console.log(`ℹ️ [VALIDATE] ${unit.name} вже максимального рівня`);
        return { valid: false, errors, unitData, maxLevel: true };
    }
    
    // 6. Перевірка наступного рівня
    const nextLevel = currentLevel + 1;
    const nextLevelKey = String(nextLevel);
    const nextLevelStats = unitData.levels[nextLevelKey];
    
    if (!nextLevelStats) {
        errors.push(`❌ Не знайдено рівень ${nextLevel} для ${unit.baseUnitKey}`);
        console.error(`❌ [VALIDATE] Не знайдено рівень ${nextLevel} для ${unit.baseUnitKey}`);
        console.error(`Доступні рівні:`, Object.keys(unitData.levels));
        return { valid: false, errors, unitData };
    }
    
    console.log(`✅ [VALIDATE] Юніт ${unit.name} може бути прокачаний до рівня ${nextLevel}`);
    return { 
        valid: true, 
        errors, 
        unitData, 
        currentLevel, 
        nextLevel, 
        nextLevelStats 
    };
}
/**
 * Отримує об'єкт з рівнями для конкретного типу юніта
 * @param {string} raceKey - ключ раси (orcs, elves, humans, undead, demons)
 * @param {number} unitIndex - індекс типу юніта (0-6)
 * @returns {object|null} об'єкт з рівнями або null
 */
 /**
 * Отримує об'єкт з рівнями юніта з unitsRegistry
 * @param {string} baseUnitKey - ключ базового юніта (наприклад, "orcs:warrior")
 * @returns {object|null} об'єкт з рівнями або null
 */

function getUnitLevelsObject(baseUnitKey) {
   if (!baseUnitKey || !window.unitsRegistry) {
       console.error(`❌ Не вдалося отримати рівні: baseUnitKey=${baseUnitKey}`);
       return null;
   }
   
   // Шукаємо юніта в реєстрі
   const unitData = window.unitsRegistry[baseUnitKey];
   
   if (!unitData) {
       console.error(`❌ Не знайдено юніта: ${baseUnitKey}`);
       return null;
   }
   
   if (!unitData.levels) {
       console.error(`❌ У юніта немає рівнів: ${baseUnitKey}`);
       return null;
   }
   
   return unitData.levels;
}

/**
 * Отримує префікс unitId для конкретного типу юніта
 * @param {string} raceKey - ключ раси
 * @param {number} unitIndex - індекс типу юніта
 * @returns {string} префікс unitId (наприклад, "orc10")
 */
function getBaseUnitKey(raceKey, unitIndex) {
    const unitTypeMap = {
        0: 'warrior',
        1: 'archer',
        2: 'shaman',
        3: 'horse',
        4: 'horseman',
        5: 'catapult',
        6: 'pikener',
        7: 'support',
        8: 'specialist',
        9: 'mage',
        10: 'wisp'
    };
    
    const unitType = unitTypeMap[unitIndex];
    if (!unitType) return null;
    
    return `${raceKey}:${unitType}`;
}
/**
 * Перевіряє чи досягнуто порогу мани і вдосконалює юнітів
 * Викликається після кожного отримання мани в бою
 * @param {number} playerIndex - індекс гравця
 * @param {string} unitType - тип юніта (warrior, archer, тощо)
 * @returns {boolean} true якщо досягнуто порогу та відбулося вдосконалення
 */
function checkAndUpgradeIfReady(playerIndex, unitType) {
    console.log(`🎯 checkAndUpgradeIfReady ВХІД: playerIndex=${playerIndex}, unitType=${unitType}`);
    
    const player = players[playerIndex];
    if (!player || !player.unitMana) {
        console.log(`❌ Гравець або unitMana не знайдені!`);
        return false;
    }
    
    console.log(`🎯 player.unitMana:`, player.unitMana);
    console.log(`🎯 player.unitMana[${unitType}]:`, player.unitMana[unitType]);
    
      // Мапа спеціальних юнітів на стандартні типи
      const specialUnitTypeMap = {
        'bear': 'support',
        'mag': 'mage', 
        'minotaur': 'specialist',
        'witch': 'specialist',
        'golem': 'support',
        'werewolf': 'specialist',
        'engineer': 'support',
        'cerberus': 'specialist',
        'spirit': 'support',
        'scarab': 'specialist',
        'uterus': 'support',
        'darkelf': 'specialist',
        'assassin': 'specialist',
        'supervisor': 'specialist',
        'armored': 'specialist'
    };
    
    // Якщо це спеціальний юніт, отримуємо правильний тип
    let actualUnitType = unitType;
    if (specialUnitTypeMap[unitType]) {
        actualUnitType = specialUnitTypeMap[unitType];
        console.log(`🔧 Спеціальний юніт: ${unitType} → ${actualUnitType}`);
    }
    
    // Знаходимо індекс юніта за типом (використовуємо actualUnitType)
    const unitIndex = TYPE_TO_INDEX_MAP[actualUnitType];
    if (unitIndex === undefined) {
        console.error(`❌ Невідомий тип юніта: ${unitType} (actual: ${actualUnitType})`);
        return false;
    }
    
    // Отримуємо расу гравця та поточний рівень юніта
    const raceKey = raceMap[player.race];
    if (!raceKey) {
        // console.error('❌ Раса не знайдена:', player.race);
        return false;
    }
    
    if (!player.availableUnits || !player.availableUnits[unitIndex]) {
        // console.error('❌ Юніт не знайдений в availableUnits гравця');
        return false;
    }
    
    console.log(`🔍 checkAndUpgradeIfReady: playerIndex=${playerIndex}, unitType=${unitType}`);
  // ДОДАТИ ТУТ:
    // Мапа спеціальних юнітів на стандартні типи
    // const specialUnitTypeMap = {
        
    //     'bear': 'support',
    //     'mag': 'mage', 
    //     'minotaur': 'specialist',
    //     'witch': 'specialist',
    //     'golem': 'support',
    //     'werewolf': 'specialist',
    //     'engineer': 'support',
    //     'cerberus': 'specialist',
    //     'spirit': 'support',
    //     'scarab': 'specialist',
    //     'uterus': 'support',
    //     'darkelf': 'specialist',
    //     'assassin': 'specialist',
    //     'supervisor': 'specialist',
    //     'armored': 'specialist'
        
    // };

    // // Якщо це спеціальний юніт, отримуємо правильний тип
    // let actualUnitType = unitType;
    // if (specialUnitTypeMap[unitType]) {
    //     actualUnitType = specialUnitTypeMap[unitType];
    //     console.log(`🔧 Спеціальний юніт: ${unitType} → ${actualUnitType}`);
    //     console.log(`🔧 actualUnitType: ${actualUnitType}`);
    //     console.log(`🔧 [CHECK_UPGRADE] Тип юніта: ${unitType} → ${actualUnitType}`);
    // }
    // ДІАГНОСТИКА: Показати всіх юнітів в магазині
    console.log(`🔍 availableUnits гравця ${playerIndex}:`, player.availableUnits.map((u, i) => 
        `${i}: ${u.name} (${u.unitId}, тип: ${window.getUnitType ? window.getUnitType(u) : 'N/A'})`
    ));
    
 // Шукаємо магазинний юніт за baseUnitKey (правильний спосіб)
// const raceKey = raceMap[player.race];
const baseUnitKey = `${raceKey}:${unitType}`; // orcs:bear
let currentShopUnit = player.availableUnits.find(u => u.baseUnitKey === baseUnitKey);

if (!currentShopUnit) {
    // Спробуємо знайти за конвертованим типом
    const actualBaseUnitKey = `${raceKey}:${actualUnitType}`; // orcs:support
    currentShopUnit = player.availableUnits.find(u => u.baseUnitKey === actualBaseUnitKey);
    
    if (!currentShopUnit) {
        console.error(`❌ Магазинний юніт не знайдений за baseUnitKey: ${baseUnitKey} або ${actualBaseUnitKey}`);
        return false;
    }
}

// Знаходимо правильний індекс після пошуку
const actualUnitIndex = player.availableUnits.indexOf(currentShopUnit);
console.log(`🔧 Правильний індекс для ${currentShopUnit.name}: ${actualUnitIndex} (замість ${unitIndex})`);

console.log(`  - unitIndex: ${unitIndex}`);
    
    console.log(`✅ Знайдено магазинний юніт: ${currentShopUnit.name} (${currentShopUnit.unitId}, рівень ${currentShopUnit.level})`);

   
    
    console.log(`🔍 ДЕТАЛЬНА ПЕРЕВІРКА ПРОКАЧКИ:`);
    console.log(`  - unitType: ${unitType}`);
    console.log(`  - unitIndex: ${unitIndex} (actual: ${actualUnitIndex})`);
    console.log(`  - currentShopUnit.unitId: ${currentShopUnit.unitId}`);
    console.log(`  - getUnitType результат:`, window.getUnitType ? window.getUnitType(currentShopUnit) : 'N/A');
    const currentLevel = currentShopUnit.level;
const threshold = getManaThreshold(currentLevel, currentShopUnit); // 👈 Оголошуємо тут

    console.log(`  - Поріг (threshold): ${threshold}`); // 👈 Тепер працюватиме

// Перевірка unitMana
if (!player.unitMana) {
    console.log(`❌ player.unitMana не існує!`);
    player.unitMana = {};
}
// Перевіряємо ману за оригінальним ключем (unitType), бо в attackSystem.js мана зберігається за оригінальним типом
if (player.unitMana[unitType] === undefined && player.unitMana[actualUnitType] === undefined) {
    console.log(`🔧 unitMana[${unitType}] не існує, ініціалізую = 0`);
    player.unitMana[unitType] = 0;
}

console.log(`  - unitMana[${actualUnitType}]: ${player.unitMana[actualUnitType]}`);
console.log(`  - Поріг (threshold): ${threshold}`);
console.log(`  - Умова: ${player.unitMana[actualUnitType]} >= ${threshold} = ${player.unitMana[actualUnitType] >= threshold}`);
console.log(`🔍 Поточний магазинний юніт:`, {
    name: currentShopUnit.name,
    unitId: currentShopUnit.unitId,
    race: currentShopUnit.race,
    upgrades: currentShopUnit.upgrades,
    level: currentShopUnit.level,
    playerIndex: currentShopUnit.playerIndex
});

// console.log(`  - Поріг (threshold): ${threshold}`); // 👈 Тепер можна використовувати

// console.log(`🔍 Перевірка прогресу ${unitType} (рівень ${currentLevel}): ${player.unitMana[unitType]}/${threshold}`);

// Перевіряємо чи досягнуто порогу
// Перевіряємо чи досягнуто порогу (спочатку за оригінальним ключем, потім за конвертованим)
const manaValue = player.unitMana[unitType] !== undefined ? player.unitMana[unitType] : player.unitMana[actualUnitType];
console.log(`  - Мана: ${manaValue} (ключ: ${unitType})`);
console.log(`  - Поріг: ${threshold}`);
console.log(`  - Умова: ${manaValue} >= ${threshold} = ${manaValue >= threshold}`);

if (manaValue >= threshold) {
    console.log(`🎯 УМОВА ПРОКАЧКИ ВИКОНАЛАСЬ!`);
    console.log(`🚀 Виклик upgradeAllUnitsOfType...`);
    return upgradeAllUnitsOfType(playerIndex, actualUnitType, actualUnitIndex, unitType);
};
console.log(`🔍 [CHECK_UPGRADE] Підсумок для ${unitType}:`);
console.log(`  unitMana[${actualUnitType}]: ${player.unitMana[actualUnitType]}`);
console.log(`  threshold: ${threshold}`);
console.log(`  Умова: ${player.unitMana[actualUnitType]} >= ${threshold} = ${player.unitMana[actualUnitType] >= threshold}`);
console.log(`  Магазинний юніт: ${currentShopUnit?.name}, рівень: ${currentShopUnit?.level}`);
console.log(`  baseUnitKey: ${currentShopUnit?.baseUnitKey}`);

return false;

}

/**
 * Вдосконалює всі юніти певного типу для гравця
 * @param {number} playerIndex - індекс гравця
 * @param {string} unitType - тип юніта (warrior, archer, тощо)
 * @param {number} unitIndex - індекс юніта в масиві раси
 * @returns {boolean} true якщо вдосконалення відбулося
 */
function upgradeAllUnitsOfType(playerIndex, unitType, unitIndex, manaKey = unitType) {
    console.log(`\n🎯 [UPGRADE_ALL] ====== ПОЧАТОК ======`);
    console.log(`🎯 [UPGRADE_ALL] playerIndex: ${playerIndex}, unitType: ${unitType}, unitIndex: ${unitIndex}`);
    
    const player = players[playerIndex];
    if (!player || !player.availableUnits) {
        console.error(`❌ [UPGRADE_ALL] Гравець або availableUnits не знайдені`);
        return false;
    }
    
    // Отримуємо магазинний юніт
    const shopUnit = player.availableUnits[unitIndex];
    if (!shopUnit) {
        console.error(`❌ [UPGRADE_ALL] Магазинний юніт не знайдений за індексом ${unitIndex}`);
        return false;
    }
    
    console.log(`🎯 [UPGRADE_ALL] Магазинний юніт: ${shopUnit.name}, рівень: ${shopUnit.level}`);
    
    // Перевіряємо можливість прокачки
    if (!STANDARD_UPGRADE_SYSTEM.canUpgrade(shopUnit)) {
        console.log(`ℹ️ [UPGRADE_ALL] ${shopUnit.name} вже максимального рівня`);
        if (PROGRESS_CONFIG.showNotifications) {
            alert(`✅ ${shopUnit.name} досягли максимального рівня!`);
        }
        return false;
    }
    
    // Отримуємо вартість прокачки
    const upgradeCost = STANDARD_UPGRADE_SYSTEM.getUpgradeCost(shopUnit.level);
    console.log(`💰 [UPGRADE_ALL] Вартість прокачки: ${upgradeCost}`);
    
        // 🔄 Обнуляємо банку мани (використовуємо правильний ключ)
        player.unitMana[manaKey] = 0;
        console.log(`🔄 [UPGRADE_ALL] Банка мани обнулена для ${manaKey} (unitType: ${unitType})`);
    
    // 1. Прокачуємо магазинний юніт
    console.log(`🛒 [UPGRADE_ALL] Прокачка магазинного юніта...`);
    const shopUpgraded = STANDARD_UPGRADE_SYSTEM.upgradeUnit(shopUnit, 'shop');
    if (!shopUpgraded) {
        console.error(`❌ [UPGRADE_ALL] Не вдалося прокачати магазинний юніт`);
        return false;
    }
    
    // 2. Прокачуємо всі юніти цього типу на полі
    console.log(`🗺️ [UPGRADE_ALL] Пошук юнітів на полі...`);
    let upgradedCount = 0;
    
    unitsOnMap.forEach((unit, index) => {
        if (unit.playerIndex === playerIndex && unit.baseUnitKey === shopUnit.baseUnitKey) {
            console.log(`✅ [UPGRADE_ALL] Знайдено відповідний юніт на полі: ${unit.name}`);
            
            // Зберігаємо стан руху/атаки
            let finalMoved = unit.moved;
            let finalAttacked = unit.attacked;
            
            if (unit.attacked) {
                finalMoved = true;
                console.log(`🎯 [UPGRADE_ALL] ${unit.name} атакував → рух заблокований`);
            }
            
            if (unit.name && unit.name.toLowerCase().includes('катапульт') && unit.attacked) {
                finalMoved = true;
                finalAttacked = true;
            }
            
            // Прокачуємо юніта
            const upgraded = STANDARD_UPGRADE_SYSTEM.upgradeUnit(unit, 'field');
            if (upgraded) {
                // Зберігаємо стан руху/атаки
                unit.moved = finalMoved;
                unit.attacked = finalAttacked;
                
                upgradedCount++;
                console.log(`✅ [UPGRADE_ALL] Прокачано юніт на полі: ${unit.name}`);
            }
        }
    });
    
    console.log(`✅ [UPGRADE_ALL] Прокачано ${upgradedCount} юнітів на полі`);
    
    // 3. Оновлюємо відображення (якщо магазин відкритий)
    if (typeof ModalWindowsShop !== 'undefined' && ModalWindowsShop && ModalWindowsShop.style.display === 'block') {
        if (typeof fillShopWithUnits === 'function') {
            fillShopWithUnits(player.race);
            console.log(`🔄 [UPGRADE_ALL] Оновлено відображення магазину`);
        }
    }
    
    // 4. Оновлюємо табло інформації
    if (typeof selectedUnitForMove !== 'undefined' && selectedUnitForMove && selectedUnitForMove.playerIndex === playerIndex) {
        const selectedUnitType = typeof getUnitType === 'function' ? getUnitType(selectedUnitForMove) : null;
        if (selectedUnitType === unitType) {
            const updatedUnit = unitsOnMap.find(u => u.id === selectedUnitForMove.id);
            if (updatedUnit) {
                if (typeof window !== 'undefined') {
                    window.selectedUnitForMove = updatedUnit;
                }
                selectedUnitForMove = updatedUnit;
                
                console.log('🔄 [UPGRADE_ALL] Оновлено selectedUnitForMove:', {
                    name: updatedUnit.name,
                    level: updatedUnit.level,
                    unitId: updatedUnit.unitId
                });
                
                if (typeof updateUnitTablo === 'function') {
                    updateUnitTablo(updatedUnit);
                }
                if (typeof window.updateUnitVisualState === 'function') {
                    window.updateUnitVisualState(updatedUnit);
                }
            }
        }
    }
    
    // Показуємо повідомлення
    if (PROGRESS_CONFIG.showNotifications) {
        const nextLevel = shopUnit.level;
        const nextThreshold = nextLevel < STANDARD_UPGRADE_SYSTEM.maxLevel 
            ? STANDARD_UPGRADE_SYSTEM.getUpgradeCost(nextLevel) 
            : 0;
        
        const progressText = nextThreshold > 0 
            ? `\n\nДля рівня ${nextLevel + 1} потрібно зібрати: 0/${nextThreshold} мани`
            : '\n\nЦе максимальний рівень!';
        
        alert(`🎉 ВДОСКОНАЛЕННЯ!\n\n${shopUnit.name} досягли рівня ${nextLevel}!\n\nВсі юніти цього типу покращені:\n- На полі: ${upgradedCount}\n- В магазині: так${progressText}`);
    }
    
    console.log(`✅ [UPGRADE_ALL] ====== КІНЕЦЬ ======\n`);
    return true;
}

//console.log('✅ Система прогресу юнітів завантажена');

console.log("aaaaaaaaaaaa");







// ============================================
// КОНЕЦ ФАЙЛУ unitProgreesSystem.js
// ============================================



// ============================================
// ЕКСПОРТ ДЛЯ ВИКОРИСТАННЯ В ІНШИХ ФАЙЛАХ
// ============================================

window.unitProgressSystem = {
    checkAndUpgradeIfReady: checkAndUpgradeIfReady,
    upgradeAllUnitsOfType: upgradeAllUnitsOfType,
    getManaThreshold: getManaThreshold,
    PROGRESS_CONFIG: PROGRESS_CONFIG
};

// Також експортуємо стандартну систему для прямого доступу
window.STANDARD_UPGRADE_SYSTEM = STANDARD_UPGRADE_SYSTEM;

console.log('✅ Система прогресу юнітів завантажена');
console.log('✅ STANDARD_UPGRADE_SYSTEM доступна');
console.log('✅ unitProgressSystem доступна');