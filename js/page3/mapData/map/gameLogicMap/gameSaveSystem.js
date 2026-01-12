// ============================================
// СИСТЕМА ЗБЕРЕЖЕННЯ/ЗАВАНТАЖЕННЯ ГРИ
// ============================================

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
    attack: unit.attack,
    armor: unit.armor,
    step: unit.step,
    range: unit.range,
    coin: unit.coin,
    // ✅ ДОДАНО: Для прогрес-системи
    upgradeCost: unit.upgradeCost || null,
    // Для героїв
    level: unit.level,
    LevelAttack: unit.LevelAttack,
    LevelArmor: unit.LevelArmor,
    abilitiesProgress: unit.abilitiesProgress,
    originalStep: unit.originalStep, // ✅ ДОДАНО: Для ефекту "Коріння"
originalAttack: unit.originalAttack, // ✅ ДОДАНО: Для ефекту "Наручники"
    effects: unit.effects,
    activeEffects: unit.activeEffects
})),
        
        // Захоплені хатки золота
        capturedGoldHouses: window.capturedGoldHouses || []
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
            moved: unit.moved,
            attacked: unit.attacked,
            canAttack: unit.canAttack,
            unitId: unit.unitId,
            race: unit.race,
            type: unit.type,
            attack: unit.attack,
            armor: unit.armor,
            step: unit.step,
            range: unit.range,
            coin: unit.coin,
            level: unit.level,
            LevelAttack: unit.LevelAttack,
            LevelArmor: unit.LevelArmor,
            abilitiesProgress: unit.abilitiesProgress,
            effects: unit.effects,
            originalStep: unit.originalStep, // ✅ ДОДАНО: Для ефекту "Коріння"
            originalAttack: unit.originalAttack, // ✅ ДОДАНО: Для ефекту "Наручники"
            activeEffects: unit.activeEffects
        })),
        heroCooldowns: window.heroActiveAbilitySystem ? 
    Array.from(window.heroActiveAbilitySystem.currentCooldowns.entries()) : [],
        capturedGoldHouses: window.capturedGoldHouses || []
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