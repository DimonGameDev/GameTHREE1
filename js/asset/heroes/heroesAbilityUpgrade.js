// ============================================
// СИСТЕМА ПОКРАЩЕННЯ ЗДІБНОСТЕЙ ГЕРОЇВ
// ============================================

/**
 * Отримати ключ героя за ID
 */
function getHeroKeyById(heroId) {
    const heroMap = {
        1: "artemis",    // ✅
        2: "leon",       // ✅
        3: "mira",       // ✅
        4: "dimon",      // ⬅️ ВИПРАВЛЕНО
        5: "sanya",      // ⬅️ ВИПРАВЛЕНО
        6: "lonya",      // ⬅️ ВИПРАВЛЕНО
        7: "vasya",      // ⬅️ ВИПРАВЛЕНО
        8: "petro",      // ⬅️ ВИПРАВЛЕНО
        9: "roma",       // ⬅️ ВИПРАВЛЕНО
        10: "maxim",     // ⬅️ ВИПРАВЛЕНО
        11: "luda",      // ⬅️ ВИПРАВЛЕНО
        12: "maryna",    // ⬅️ ВИПРАВЛЕНО
        13: "yula",      // ⬅️ ВИПРАВЛЕНО
        14: "dasha",     // ⬅️ ВИПРАВЛЕНО
        15: "vlada"      // ⬅️ ВИПРАВЛЕНО
    };
    
    return heroMap[heroId];
}

/**
 * Покращити здібність героя
 * @param {object} hero - об'єкт героя на карті
 * @param {number} abilityIndex - індекс здібності (0, 1, 2)
 * @returns {boolean} - чи вдалося покращити
 */
window.upgradeHeroAbility = function(hero, abilityIndex) {
    if (!hero.isHero) {
        alert("⚠️ Це не герой!");
        return false;
    }
    
    // Отримуємо прогрес здібності
    const abilityProgress = hero.abilitiesProgress[abilityIndex];
    if (!abilityProgress) {
        alert("⚠️ Здібність не знайдена!");
        return false;
    }
    
   // ⬇️ ЗМІНЕНО: Шукаємо здібність напряму по ID
const ability = window.heroesAbilities?.[abilityProgress.abilityId];
if (!ability) {
    alert("⚠️ Здібність не знайдена в базі!");
    console.error('❌ Не знайдено здібність з ID:', abilityProgress.abilityId);
    return false;
}
    
    // Перевіряємо чи можна покращити
    const currentLevel = abilityProgress.currentLevel;
    const nextLevel = currentLevel + 1;
    
    if (nextLevel > ability.maxLevel) {
        alert("⚠️ Здібність досягла максимального рівня!");
        return false;
    }
    
    // Отримуємо вартість покращення
    // levels[0] = рівень 1, levels[1] = рівень 2, тощо
    // Вартість з поточного рівня знаходиться в levels[currentLevel - 1]
    const currentLevelData = ability.levels[currentLevel - 1];
    if (!currentLevelData) {
        alert("⚠️ Дані поточного рівня не знайдені!");
        return false;
    }
    
    const upgradeCost = currentLevelData.upgradeCost || 500;
    
    // Перевіряємо чи є достатньо мани
    if (!window.hasEnoughMana(hero.playerIndex, upgradeCost)) {
        alert(`⚠️ Недостатньо мани!\n\nПотрібно: ${upgradeCost}\nЄ зараз: ${window.heroesMana.players[`player${hero.playerIndex + 1}`].current}`);
        return false;
    }
    
    // Витрачаємо ману
    if (!window.spendHeroesMana(hero.playerIndex, upgradeCost)) {
        return false;
    }
    
    // ✅ ПОКРАЩУЄМО ЗДІБНІСТЬ
    abilityProgress.currentLevel = nextLevel;
    
    // ✅ ДОДАЄМО БОНУСИ ДО СТАТІВ ГЕРОЯ
    hero.LevelAttack = (hero.LevelAttack || 0) + 1;
    hero.LevelArmor = (hero.LevelArmor || 0) + 1;
    hero.level = (hero.level || 1) + 1;
    
    // Показуємо повідомлення
    alert(`🎉 Здібність "${ability.name}" покращена до рівня ${nextLevel}!
    
📊 Бонуси героя:
⚔️ Атака: +1 (бонус: ${hero.LevelAttack})
🛡️ Броня: +1 (бонус: ${hero.LevelArmor})
⭐ Рівень героя: ${hero.level}

💰 Витрачено мани: ${upgradeCost}`);
    
    console.log(`✨ Здібність покращена:`, {
        hero: hero.name,
        ability: ability.name,
        newLevel: nextLevel,
        newHeroLevel: hero.level,
        attackBonus: hero.LevelAttack,
        armorBonus: hero.LevelArmor
    });
    
    // Оновлюємо відображення
    if (typeof updateUnitTablo === 'function') {
        updateUnitTablo(hero);
    }
    
    return true;
};

/**
 * Отримати інформацію про можливість покращення
 * @param {object} hero - об'єкт героя
 * @param {number} abilityIndex - індекс здібності
 * @returns {object} - інформація про покращення
 */
window.getUpgradeInfo = function(hero, abilityIndex) {
    if (!hero.isHero) return null;
    
    const abilityProgress = hero.abilitiesProgress[abilityIndex];
    if (!abilityProgress) return null;
    
    const heroKey = getHeroKeyById(hero.heroTemplateId || hero.id);
    const abilities = window.heroesAbilities?.[heroKey];
    if (!abilities) return null;
    
    const ability = abilities.find(a => a.id === abilityProgress.abilityId);
    if (!ability) return null;
    
    const currentLevel = abilityProgress.currentLevel;
    const canUpgrade = currentLevel < ability.maxLevel;
    
    let upgradeCost = 0;
    if (canUpgrade) {
        const currentLevelData = ability.levels[currentLevel - 1];
        upgradeCost = currentLevelData?.upgradeCost || 0;
    }
    
    return {
        canUpgrade,
        currentLevel,
        maxLevel: ability.maxLevel,
        upgradeCost,
        abilityName: ability.name
    };
};

//console.log("✨ Система покращення здібностей героїв завантажена!");