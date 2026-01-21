// ============================================
// СИСТЕМА ЗБЕРЕЖЕННЯ/ЗАВАНТАЖЕННЯ ГРИ
// ============================================
/**
 * Отримати базові характеристики юніта (без бонусів від аур та тимчасових ефектів)
 * @param {object} unit - юніт
 * @returns {object} - базові характеристики {attack, armor, step, range}
 */
function getBaseUnitStats(unit) {
    // Спочатку шукаємо в unitsRegistry за unitId (для звичайних юнітів)
    if (!unit.isHero && window.unitsRegistry) {
        const unitKey = unit.baseUnitKey || unit.unitId;
        const template = window.unitsRegistry[unitKey];
        if (template) {
            return {
                attack: template.attack || 0,
                armor: template.armor || 0,
                step: template.step || 0,
                range: template.range || 0
            };
        }
    }
    
    // Для героїв шукаємо в heroes
    if (unit.isHero && unit.heroTemplateId && window.heroes) {
        const heroTemplate = window.heroes[unit.heroTemplateId - 1];
        if (heroTemplate) {
            return {
                attack: heroTemplate.attack || 0,
                armor: heroTemplate.armor || 0,
                step: heroTemplate.step || 0,
                range: heroTemplate.range || 0
            };
        }
    }
    
    // Якщо не знайшли шаблон, намагаємося відняти бонуси аур
    console.warn(`⚠️ Не знайдено шаблон для ${unit.name}, намагаюся обчислити базові характеристики`);
    
    let baseAttack = unit.attack || 0;
    let baseArmor = unit.armor || 0;
    let baseStep = unit.step || 0;
    
    // Віднімаємо бонуси від активних ефектів аур
    if (unit.activeEffects && Array.isArray(unit.activeEffects)) {
        unit.activeEffects.forEach(effect => {
            if (effect.abilityName && (effect.abilityName.includes('Аура') || effect.abilityName.includes('aura'))) {
                switch (effect.type) {
                    case "attack":
                        baseAttack -= (effect.attackBonus || 0);
                        break;
                    case "armor":
                        baseArmor -= (effect.armorBonus || 0);
                        break;
                    case "step":
                        baseStep -= (effect.stepBonus || 0);
                        break;
                    case "mixed":
                        baseAttack -= (effect.attackBoost || 0);
                        baseArmor -= (effect.armorBoost || 0);
                        break;
                }
            }
        });
    }
    
    return {
        attack: Math.max(0, baseAttack),
        armor: Math.max(0, baseArmor),
        step: Math.max(0, baseStep),
        range: unit.range || 0
    };
}
/**
 * Зберігає поточний стан гри
 */
function saveGameState() {
    // 🔍 ДІАГНОСТИКА: Перевіряємо героїв перед збереженням
    console.log('💾 ПЕРЕВІРКА ГЕРОЇВ ПЕРЕД ЗБЕРЕЖЕННЯМ:');
    unitsOnMap.forEach((unit, index) => {
        if (unit.isHero) {
            console.log(`  Герой ${unit.name}:`, {
                playerIndex: unit.playerIndex,
                originalIndex: unit.originalIndex,
                hasOriginalIndex: unit.originalIndex !== undefined,
                player: players[unit.playerIndex] ? {
                    originalIndex: players[unit.playerIndex].originalIndex
                } : 'гравець не знайдений'
            });
        }
    });
    const gameState = {
        // Мета-інформація
        savedAt: new Date().toISOString(),
        currentPlayerIndex: currentPlayerIndex,
        currentRound: currentRound,
        maxUnitsOnField: maxUnitsOnField,
        
        
        players: players.map(player => ({
            originalIndex: player.originalIndex,
            race: player.race,
            type: player.type,
            clan: player.clan,
            gold: player.gold,
            heroes: player.heroes,
            active: player.active,
            unitMana: player.unitMana,
            // ✅ ДОДАНО: Зберігаємо доступні юніти з їх рівнями та upgradeCost
            availableUnits: player.availableUnits ? player.availableUnits.map(unit => ({
                unitId: unit.unitId,
                name: unit.name,
                level: unit.level,
                upgradeCost: unit.upgradeCost,
                coin: unit.coin,
                img: unit.img,
                type: unit.type,
                race: unit.race
            })) : []
        })),
        
        // Юніти на карті
        // Юніти на карті
//         // 🔍 ДІАГНОСТИКА: Перевіряємо героїв перед збереженням
// console.log('💾 ПЕРЕВІРКА ГЕРОЇВ ПЕРЕД ЗБЕРЕЖЕННЯМ:');
//         unitsOnMap.forEach((unit, index) => {
//             if (unit.isHero) {
//                 console.log(`  Герой ${unit.name}:`, {
//                     playerIndex: unit.playerIndex,
//                     originalIndex: unit.originalIndex,
//                     hasOriginalIndex: unit.originalIndex !== undefined,
//                     player: players[unit.playerIndex] ? {
//                         originalIndex: players[unit.playerIndex].originalIndex
//                     } : 'гравець не знайдений'
//                 });
//             }
//         });        
units: unitsOnMap.map(unit => ({
    
    id: unit.id,
    name: unit.name, // ✅ ДОДАНО
    img: unit.img,
    heroTemplateId: unit.heroTemplateId,
    isHero: unit.isHero,
    originalIndex: unit.originalIndex !== undefined ? unit.originalIndex : (players[unit.playerIndex] ? players[unit.playerIndex].originalIndex : 0),
    x: unit.x,
    y: unit.y,
    hp: unit.hp,
    newhp: unit.newhp,
    moved: unit.moved,
    attacked: unit.attacked,
    canAttack: unit.canAttack,
    // ✅ ДОДАНО: Для звичайних юнітів
    unitId: unit.unitId, // ID шаблону юніта
    race: unit.race, // Раса (для регенерації img)
    type: unit.type, // Тип (warrior, archer, тощо)
    // ✅ КЛЮЧОВЕ: Зберігаємо тільки базові дані для перерахунку
    baseUnitKey: unit.baseUnitKey,
    level: unit.level || 1,
    coin: unit.coin,
    // ✅ ДОДАНО: Для прогрес-системи
    upgradeCost: unit.upgradeCost,
    // Для героїв
    LevelAttack: unit.LevelAttack,
    LevelArmor: unit.LevelArmor,
    abilitiesProgress: unit.abilitiesProgress,
    originalStep: unit.originalStep,
    originalStepBeforeAoe: unit.originalStepBeforeAoe, // ✅ ДОДАНО: Для ефекту AoE damage // ✅ ДОДАНО: Для ефекту "Коріння"
    originalAttack: unit.originalAttack, // ✅ ДОДАНО: Для ефекту "Наручники"
    originalRange: unit.originalRange, // ✅ ДОДАНО: Для ефекту "Наручники" (дальність)
    effects: unit.effects,
    activeEffects: unit.activeEffects,
    abilities: unit.abilities,
    // ✅ ДОДАНО: Зберігаємо кулдауни здібностей
    abilityCooldowns: unit.abilityInstances ? unit.abilityInstances.map(ability => ({
        key: ability.key || ability.name,
        currentCooldown: ability.currentCooldown || 0
    })) : [],
    usedPortalThisTurn: unit.usedPortalThisTurn || false
})),
        
        // Захоплені хатки золота
        capturedGoldHouses: window.capturedGoldHouses || [],
        activePortals: window.activePortals || [] 
    };
    
    try {
        localStorage.setItem('gameSaveState', JSON.stringify(gameState));
        console.log('💾 Гру збережено!', {
            раунд: currentRound,
            гравець: currentPlayerIndex + 1,
            юнітів: unitsOnMap.length
        });
        return true;
    } catch (error) {
        console.error('❌ Помилка збереження:', error);
        return false;
    }
}

/**
 * Завантажує збережений стан гри
 */
function loadGameState() {
    try {
        const savedData = localStorage.getItem('gameSaveState');
        
        if (!savedData) {
            console.log('ℹ️ Немає збереженої гри');
            return null;
        }
        
        const gameState = JSON.parse(savedData);
        console.log('📂 Завантажено стан гри:', {
            збережено: gameState.savedAt,
            раунд: gameState.currentRound,
            гравець: gameState.currentPlayerIndex + 1
        });
        
        return gameState;
    } catch (error) {
        console.error('❌ Помилка завантаження:', error);
        return null;
    }
}

/**
 * Видаляє збережену гру
 */
function deleteSavedGame() {
    localStorage.removeItem('gameSaveState');
    console.log('🗑️ Збережену гру видалено');
}

/**
 * Перевіряє чи є збережена гра
 */
function hasSavedGame() {
    return localStorage.getItem('gameSaveState') !== null;
}

// Експортуємо функції
window.saveGameState = saveGameState;
window.loadGameState = loadGameState;
window.deleteSavedGame = deleteSavedGame;
window.hasSavedGame = hasSavedGame;

console.log('✅ Система збереження ініціалізована');


// ============================================
// СИСТЕМА МНОЖИННИХ ЗБЕРЕЖЕНЬ (4 СЛОТИ)
// ============================================

/**
 * Отримує всі слоти збережень
 * @returns {Array} Масив з 4 слотами
 */
function getSaveSlots() {
    const slots = [];
    for (let i = 1; i <= 4; i++) {
        const slotKey = `save_slot_${i}`;
        const slotData = localStorage.getItem(slotKey);
        
        if (slotData) {
            try {
                slots.push({ slotId: i, ...JSON.parse(slotData) });
            } catch (error) {
                console.error(`❌ Помилка читання слота ${i}:`, error);
                slots.push(null);
            }
        } else {
            slots.push(null);
        }
    }
    return slots;
}

/**
 * Зберігає гру в конкретний слот
 * @param {number} slotId - номер слоту (1-4)
 * @param {string} saveName - назва збереження
 */
function saveGameToSlot(slotId, saveName) {
    if (slotId < 1 || slotId > 4) {
        console.error('❌ Неправильний номер слота:', slotId);
        return false;
    }
    
    // Створюємо стан гри (той самий що і раніше)
    const gameState = {
        savedAt: new Date().toISOString(),
        currentPlayerIndex: currentPlayerIndex,
        currentRound: currentRound,
        maxUnitsOnField: maxUnitsOnField,
        players: players.map(player => ({
            originalIndex: player.originalIndex,
            race: player.race,
            type: player.type,
            clan: player.clan,
            gold: player.gold,
            heroes: player.heroes,
            active: player.active,
            unitMana: player.unitMana,
            // ✅ ДОДАНО: Зберігаємо доступні юніти з їх рівнями та upgradeCost
            availableUnits: player.availableUnits ? player.availableUnits.map(unit => ({
                unitId: unit.unitId,
                name: unit.name,
                level: unit.level,
                upgradeCost: unit.upgradeCost,
                coin: unit.coin,
                img: unit.img,
                type: unit.type,
                race: unit.race
            })) : []
        })),
        units: unitsOnMap.map(unit => ({
            id: unit.id,
            name: unit.name,
            img: unit.img,
            heroTemplateId: unit.heroTemplateId,
            isHero: unit.isHero,
            playerIndex: unit.playerIndex,
            originalIndex: unit.originalIndex,
            x: unit.x,
            y: unit.y,
            hp: unit.hp,
            newhp: unit.newhp,
            maxHp: unit.maxHp, // ✅ ДОДАТИ ЦЕЙ РЯДОК
            moved: unit.moved,
            attacked: unit.attacked,
            canAttack: unit.canAttack,
            unitId: unit.unitId,
            race: unit.race,
            type: unit.type,
            // ✅ КЛЮЧОВЕ: Зберігаємо тільки базові дані для перерахунку
            baseUnitKey: unit.baseUnitKey,
            level: unit.level || 1,
            coin: unit.coin,
            // level: unit.level,
            LevelAttack: unit.LevelAttack,
            LevelArmor: unit.LevelArmor,
            abilitiesProgress: unit.abilitiesProgress,
            effects: unit.effects,
            originalStep: unit.originalStep,
            originalStepBeforeAoe: unit.originalStepBeforeAoe, // ✅ ДОДАНО: Для ефекту AoE damage // ✅ ДОДАНО: Для ефекту "Коріння"
            originalAttack: unit.originalAttack, // ✅ ДОДАНО: Для ефекту "Наручники"
            originalRange: unit.originalRange, // ✅ ДОДАНО: Для ефекту "Наручники" (дальність)
            activeEffects: unit.activeEffects,
            abilities: unit.abilities,
            // ✅ ДОДАНО: Зберігаємо кулдауни здібностей
            abilityCooldowns: unit.abilityInstances ? unit.abilityInstances.map(ability => ({
                key: ability.key || ability.name,
                currentCooldown: ability.currentCooldown || 0
            })) : [],
            usedPortalThisTurn: unit.usedPortalThisTurn || false
        })),
        heroCooldowns: window.heroActiveAbilitySystem ? 
    Array.from(window.heroActiveAbilitySystem.currentCooldowns.entries()) : [],
        capturedGoldHouses: window.capturedGoldHouses || [],
        activePortals: window.activePortals || [] 
    };
    
    // Обгортаємо в метадані слота
    const slotData = {
        name: saveName || `Збереження ${slotId}`,
        savedAt: new Date().toISOString(),
        round: currentRound,
        gameState: gameState
    };
    
    try {
        const slotKey = `save_slot_${slotId}`;
        localStorage.setItem(slotKey, JSON.stringify(slotData));
        console.log(`💾 Гру збережено в слот ${slotId}: "${saveName}"`);
        return true;
    } catch (error) {
        console.error('❌ Помилка збереження в слот:', error);
        return false;
    }
}

/**
 * Завантажує гру з конкретного слоту
 * @param {number} slotId - номер слоту (1-4)
 */
function loadGameFromSlot(slotId) {
    if (slotId < 1 || slotId > 4) {
        console.error('❌ Неправильний номер слота:', slotId);
        return null;
    }
    
    try {
        const slotKey = `save_slot_${slotId}`;
        const slotData = localStorage.getItem(slotKey);
        
        if (!slotData) {
            console.log(`ℹ️ Слот ${slotId} порожній`);
            return null;
        }
        
        const slot = JSON.parse(slotData);
        console.log(`📂 Завантажено гру зі слота ${slotId}: "${slot.name}"`);
        
        return slot.gameState; // повертаємо сам стан гри
    } catch (error) {
        console.error(`❌ Помилка завантаження зі слота ${slotId}:`, error);
        return null;
    }
}

/**
 * Видаляє збереження зі слота
 * @param {number} slotId - номер слоту (1-4)
 */
function deleteSaveSlot(slotId) {
    if (slotId < 1 || slotId > 4) {
        console.error('❌ Неправильний номер слота:', slotId);
        return false;
    }
    
    try {
        const slotKey = `save_slot_${slotId}`;
        localStorage.removeItem(slotKey);
        console.log(`🗑️ Слот ${slotId} очищено`);
        return true;
    } catch (error) {
        console.error('❌ Помилка видалення слота:', error);
        return false;
    }
}

/**
 * Перевіряє чи є хоча б одне збереження
 */
function hasAnySave() {
    for (let i = 1; i <= 4; i++) {
        if (localStorage.getItem(`save_slot_${i}`)) {
            return true;
        }
    }
    return false;
}

// Експортуємо нові функції
window.getSaveSlots = getSaveSlots;
window.saveGameToSlot = saveGameToSlot;
window.loadGameFromSlot = loadGameFromSlot;
window.deleteSaveSlot = deleteSaveSlot;
window.hasAnySave = hasAnySave;

console.log('✅ Система множинних збережень ініціалізована');