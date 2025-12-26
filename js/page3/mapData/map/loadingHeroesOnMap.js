






function createHeroUnits() {
    // Перевіряємо чи є масив героїв
    if (!window.heroes) {
        console.log('⚠️ Масив window.heroes не завантажений');
        return;
    }
    
    // Для кожного активного гравця
    players.forEach((player, playerIndex) => {
        // Беремо героїв з об'єкта гравця
        const heroIndices = player.heroes || [];
        
        if (heroIndices.length === 0) {
            // console.log(`ℹ️ Гравець ${playerIndex + 1} не має героїв`);
            return;
        }
        
        player.heroUnits = []; // Масив для героїв-юнітів
        
        heroIndices.forEach(heroIndex => {
            const heroTemplate = window.heroes[heroIndex];
            
            if (!heroTemplate) {
                console.warn(`⚠️ Герой з індексом ${heroIndex} не знайдений`);
                return;
            }
            
                       // ... existing code ...
// Створюємо юніт-героя
const heroUnit = {
    ...heroTemplate,
    // ВАЖЛИВО: Глибоке копіювання для abilitiesProgress
    abilitiesProgress: heroTemplate.abilitiesProgress.map(ability => ({...ability})),
    // ВАЖЛИВО: Глибоке копіювання для effects (якщо є)
    effects: heroTemplate.effects ? [...heroTemplate.effects] : [],
    
    // 🎨 ВИПРАВЛЕНО: Використовуємо player.originalIndex замість playerIndex
    img: window.getColoredHeroImage 
        ? (() => {
            const originalImg = heroTemplate.img;
            const coloredImg = window.getColoredHeroImage(originalImg, player.originalIndex);
            // console.log(`🎨 Герой ${heroTemplate.name} для гравця з originalIndex ${player.originalIndex}`);
            return coloredImg;
        })()
        : heroTemplate.img,
    
    // ⬇️ ЗБЕРІГАЄМО: Оригінальний числовий ID героя для здібностей
    heroTemplateId: heroTemplate.id,
    
    // ⬇️ ДОДАНО: Унікальний ID для health bar системи
    id: `hero_p${playerIndex}_${heroIndex}_${Date.now()}`,
    
    playerIndex: playerIndex,  // індекс у відфільтрованому масиві (для логіки гри)
    originalIndex: player.originalIndex,  // ✅ ДОДАНО: оригінальний номер гравця (0-3)
    isHero: true,
    canAttack: true,
moved: false,
attacked: false,
    
    // 💚 ДОДАЙТЕ ЦЕЙ РЯДОК:
    maxHp: heroTemplate.hp,
    
    // Обчислюємо фінальні характеристики
    finalAttack: getHeroFinalAttack(heroTemplate),
    finalArmor: getHeroFinalArmor(heroTemplate)
};
// ... existing code ...
            
            player.heroUnits.push(heroUnit);
            // console.log(`✅ Створено героя: ${heroUnit.name} для Гравця ${playerIndex + 1}`);
        });
    });
}

//console.log("dddd");
/**
 * Розміщує героїв біля замків їхніх гравців
 */
function placeHeroesNearCastles() {
    // console.log('🎯 Початок розміщення героїв біля замків');
    
    players.forEach((player, playerIndex) => {
        if (!player.heroUnits || player.heroUnits.length === 0) return;
        
        // console.log(`\n🔍 Шукаємо замок для Гравця ${playerIndex + 1}`);
        
        // Знаходимо замок гравця (по originalIndex)
        const castle = castles.find(c => c.playerIndex === player.originalIndex);
        
        if (!castle) {
            // console.warn(`⚠️ Замок для гравця ${playerIndex + 1} не знайдений`);
            return;
        }
        
        // console.log(`✅ Знайдено замок на (${castle.x}, ${castle.y})`);
        
        // Визначаємо позиції залежно від замку
        let positions = [];
        
        if (castle.y === 0) {
            // Верхній замок → герої внизу
            positions = [
                { x: castle.x - 1, y: castle.y + 2 },
                { x: castle.x,     y: castle.y + 2 },
                { x: castle.x + 1, y: castle.y + 2 }
            ];
        } else if (castle.x === 28) {
            // Правий замок → герої зліва
            positions = [
                { x: castle.x - 2, y: castle.y - 1 },
                { x: castle.x - 2, y: castle.y },
                { x: castle.x - 2, y: castle.y + 1 }
            ];
        } else if (castle.y === 28) {
            // Нижній замок → герої зверху
            positions = [
                { x: castle.x - 1, y: castle.y - 2 },
                { x: castle.x,     y: castle.y - 2 },
                { x: castle.x + 1, y: castle.y - 2 }
            ];
        } else if (castle.x === 0) {
            // Лівий замок → герої справа
            positions = [
                { x: castle.x + 2, y: castle.y - 1 },
                { x: castle.x + 2, y: castle.y },
                { x: castle.x + 2, y: castle.y + 1 }
            ];
        }
        
        // console.log('   Позиції для героїв:', positions);
        
        // Розміщуємо кожного героя
        player.heroUnits.forEach((heroUnit, index) => {
            const pos = positions[index];
            if (pos) {
                heroUnit.x = pos.x;
                heroUnit.y = pos.y;
                
                // Додаємо героя на карту
                unitsOnMap.push(heroUnit);
                
                // Створюємо візуальний елемент
                const cellPlayer = createHeroVisual(heroUnit); // ⬅️ ЗМІНІТЬ: зберігаємо посилання
                
                // Оновлюємо dataset після створення (на всяк випадок)
                if (cellPlayer) {
                    cellPlayer.dataset.x = heroUnit.x;
                    cellPlayer.dataset.y = heroUnit.y;
                }
                
                // console.log(`📍 Розміщено ${heroUnit.name} на позиції (${pos.x}, ${pos.y})`);
            }
        });
    });
}

/**
 * Створює візуальний елемент героя на карті
 */
function createHeroVisual(heroUnit) {
    if (!map) return null;
    
    // Створюємо img елемент
    let cellPlayer = document.createElement("img");
    cellPlayer.classList.add("cellPlayer");
    cellPlayer.src = heroUnit.img;
    cellPlayer.style.border = `1px dashed ${colorFlag[players.findIndex(p => p.originalIndex === heroUnit.playerIndex)]}`;
    cellPlayer.style.boxSizing = "border-box";
    cellPlayer.style.pointerEvents = "none";
    
    // Створюємо wrapper з health bar
    const wrapper = createUnitWithHealthBar(heroUnit, cellPlayer);
    wrapper.dataset.unitId = heroUnit.id || unitsOnMap.length - 1;
    
    map.appendChild(wrapper);
    
    return wrapper;
}

// ============================================
// ІНІЦІАЛІЗАЦІЯ ГЕРОЇВ (виклик після завантаження даних)
// ============================================

/// Створюємо і розміщуємо героїв для нової гри


// Створюємо і розміщуємо героїв для нової гри
if (!loadedFromSave && players && players.length > 0) {
    // console.log('🦸 Створення героїв для нової гри...');
    
    // Створюємо юніти-героїв
    createHeroUnits();
    
    // Розміщуємо героїв біля замків
    placeHeroesNearCastles();
    
    // ⬇️ ДОДАНО: Оновлюємо кольори health bar після створення героїв
    setTimeout(() => {
        if (typeof updateActivePlayerUnitsVisuals === 'function') {
            updateActivePlayerUnitsVisuals();
            //console.log('✅ Кольори health bar оновлено при старті гри');
        }
    }, 500);
}
/**
 * Розраховує фінальну атаку героя (базова + бонус від рівня)
 */
function getHeroFinalAttack(hero) {
    const baseAttack = hero.attack || 0;
    const levelBonus = hero.LevelAttack || 0;
    return baseAttack + levelBonus;
}

/**
 * Розраховує фінальну броню героя (базова + бонус від рівня)
 */
function getHeroFinalArmor(hero) {
    const baseArmor = hero.armor || 0;
    const levelBonus = hero.LevelArmor || 0;
    return baseArmor + levelBonus;
}