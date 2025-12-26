// ============================================
// СИСТЕМА ЗБЕРЕЖЕННЯ/ЗАВАНТАЖЕННЯ ГРИ
// ============================================

/**
 * Зберігає поточний стан гри
 */
function saveGameState() {
    const gameState = {
        // Мета-інформація
        savedAt: new Date().toISOString(),
        currentPlayerIndex: currentPlayerIndex,
        currentRound: currentRound,
        
        // Дані гравців
        players: players.map(player => ({
            originalIndex: player.originalIndex,
            race: player.race,
            type: player.type,
            clan: player.clan,
            gold: player.gold,
            heroes: player.heroes,
            active: player.active,
            unitMana: player.unitMana
        })),
        
        // Юніти на карті
        // Юніти на карті
units: unitsOnMap.map(unit => ({
    id: unit.id,
    name: unit.name, // ✅ ДОДАНО
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
    // ✅ ДОДАНО: Для звичайних юнітів
    unitId: unit.unitId, // ID шаблону юніта
    race: unit.race, // Раса (для регенерації img)
    type: unit.type, // Тип (warrior, archer, тощо)
    attack: unit.attack,
    armor: unit.armor,
    step: unit.step,
    range: unit.range,
    coin: unit.coin,
    // Для героїв
    level: unit.level,
    LevelAttack: unit.LevelAttack,
    LevelArmor: unit.LevelArmor,
    abilitiesProgress: unit.abilitiesProgress,
    // Ефекти
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