// ============================================
// СИСТЕМА КОЛЬОРІВ ЮНІТІВ ДЛЯ ГРАВЦІВ
// ============================================

/**
 * Мапінг ОРИГІНАЛЬНОГО індексу гравця на колір юніта
 * ✅ ВАЖЛИВО: Використовуємо originalIndex (0-3), а не playerIndex!
 */
const playerColorMap = {
    0: 'red',      // Гравець 1 - червоний
    1: 'blue',     // Гравець 2 - синій
    2: 'green',    // Гравець 3 - зелений
    3: 'yellow'    // Гравець 4 - жовтий
};

/**
 * Отримує шлях до картинки юніта з правильним кольором
 * @param {string} basePath - базовий шлях
 * @param {number} originalIndex - ОРИГІНАЛЬНИЙ індекс гравця (0-3)
 * @returns {string} - шлях до картинки з кольором гравця
 */
function getColoredUnitImage(basePath, originalIndex) {
    const playerColor = playerColorMap[originalIndex] || 'blue';
    
    // console.log('🎨 Зміна кольору юніта:', { basePath, originalIndex, playerColor });
    
    // Замінюємо колір у шляху папки
    const coloredPath = basePath
        .replace(/\/(blue|red|green|yellow)\//i, `/${playerColor}/`)
        .replace(/(Blue|Red|Green|Yellow|blue|red|green|yellow)\.png$/i, 
                 `${playerColor.charAt(0).toUpperCase() + playerColor.slice(1)}.png`);
    
    return coloredPath;
}

/**
 * Створює копію юніта з правильним кольором для гравця
 * @param {object} unitTemplate - шаблон юніта
 * @param {number} originalIndex - ОРИГІНАЛЬНИЙ індекс гравця
 * @returns {object} - копія юніта з кольоровою картинкою
 */
function createColoredUnit(unitTemplate, originalIndex) {
    const coloredUnit = { ...unitTemplate };
    
    if (coloredUnit.img) {
        coloredUnit.img = getColoredUnitImage(coloredUnit.img, originalIndex);
    }
    
    return coloredUnit;
}

/**
 * Оновлює всі юніти гравця на правильний колір
 * @param {object} player - об'єкт гравця з originalIndex
 */
function updatePlayerUnitsColor(player) {
    if (!player || player.originalIndex === undefined) return;
    
    const originalIndex = player.originalIndex;
    
    // Оновлюємо доступні юніти в магазині
    if (player.availableUnits && Array.isArray(player.availableUnits)) {
        player.availableUnits = player.availableUnits.map(unit => 
            createColoredUnit(unit, originalIndex)
        );
    }
    
    // Оновлюємо юніти на карті
    unitsOnMap.forEach(unit => {
        if (unit.playerIndex === players.findIndex(p => p.originalIndex === originalIndex) && unit.img) {
            unit.img = getColoredUnitImage(unit.img, originalIndex);
            
            // Оновлюємо візуальний елемент на карті
            const visual = document.querySelector(
                `.cellPlayer[data-x="${unit.x}"][data-y="${unit.y}"]`
            );
            if (visual) {
                visual.src = unit.img;
            }
        }
    });
}

// Експортуємо функції в window
window.getColoredUnitImage = getColoredUnitImage;
window.createColoredUnit = createColoredUnit;
window.updatePlayerUnitsColor = updatePlayerUnitsColor;

// console.log('✅ Система кольорів юнітів ініціалізована');


// ============================================
// СИСТЕМА КОЛЬОРІВ ГЕРОЇВ
// ============================================

/**
 * Отримує шлях до картинки героя з правильним кольором
 * @param {string} basePath - базовий шлях героя
 * @param {number} originalIndex - ОРИГІНАЛЬНИЙ індекс гравця (0-3)
 * @returns {string} - шлях до картинки з кольором гравця
 */
function getColoredHeroImage(basePath, originalIndex) {
    const playerColor = playerColorMap[originalIndex] || 'blue';
    
    // console.log('🎨 Зміна кольору героя:', { basePath, originalIndex, playerColor });
    
    // Замінюємо колір у шляху героя
    const coloredPath = basePath
        .replace(/\/(blue|red|green|yellow)\//i, `/${playerColor}/`)
        .replace(/(Blue|Red|Green|Yellow|blue|red|green|yellow)\.png$/i, 
                 `${playerColor.charAt(0).toUpperCase() + playerColor.slice(1)}.png`);
    
    return coloredPath;
}

/**
 * Створює героя з правильним кольором для гравця
 * @param {object} heroTemplate - шаблон героя
 * @param {number} originalIndex - ОРИГІНАЛЬНИЙ індекс гравця
 * @returns {object} - герой з кольоровою картинкою
 */
function createColoredHero(heroTemplate, originalIndex) {
    const coloredHero = { ...heroTemplate };
    
    if (coloredHero.img) {
        coloredHero.img = getColoredHeroImage(coloredHero.img, originalIndex);
    }
    
    return coloredHero;
}

// Експортуємо функції героїв
window.getColoredHeroImage = getColoredHeroImage;
window.createColoredHero = createColoredHero;

console.log('✅ Система кольорів героїв ініціалізована');