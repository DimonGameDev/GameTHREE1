// ============================================
// СИСТЕМА ЕФЕКТІВ ВІД КЛІТИНОК КАРТИ
// ============================================

/**
 * Отримує бонуси від клітинки під юнітом
 * @param {number} x - координата X
 * @param {number} y - координата Y
 * @param {object} unit - юніт який стоїть на клітинці
 */
function getTileBonuses(x, y, unit) {
    if (!mapData || !mapData[y] || mapData[y][x] === undefined) {
        return null;
    }
    
    const tileType = mapData[y][x];
    const info = tileInfo[tileType];
    
    if (!info || !info.effects || info.effects.length === 0) {
        return null;
    }
    
    const bonuses = {
        armor: 0,      // Броня (постійна, всім)
        defense: 0,    // Захист (постійний, всім)
        regeneration: 0 // Регенерація (тільки власнику для хаток/замків)
    };
    
    // Визначаємо власника клітинки (для хаток та замків)
    let tileOwner = null;
    
    // Перевіряємо чи це замок
    if (tileType === 1) {
        const castle = castles.find(c => c.x === x && c.y === y);
        if (castle) {
            const activePlayer = players.find(p => p.originalIndex === castle.playerIndex);
            tileOwner = activePlayer ? players.indexOf(activePlayer) : null;
        }
    }
    
    // Перевіряємо чи це захоплена хатка золота
    if (tileType === 2 && typeof findGoldHouse === 'function') {
        const capturedHouse = findGoldHouse(x, y);
        if (capturedHouse) {
            tileOwner = capturedHouse.playerIndex; // Просто playerIndex хатки
        }
    }
    
    // Застосовуємо ефекти
    info.effects.forEach(effect => {
        switch(effect.type) {
            case "Броня":
                bonuses.armor = effect.value; // Всім
                break;
                
            case "Захист":
                bonuses.defense = effect.value; // Всім
                break;
                
            case "Регенерація":
            case "HP":
                // Для хаток/замків - тільки власнику
                if (tileType === 1 || tileType === 2) {
                    if (tileOwner !== null && unit && unit.playerIndex === tileOwner) {
                        bonuses.regeneration = effect.value;
                    }
                } else {
                    // Для будинків лікування - всім
                    bonuses.regeneration = effect.value;
                }
                break;
        }
    });
    
    return bonuses;
}

/**
 * Застосовує миттєві бонуси при зупинці юніта
 */
/**
 * Застосовує миттєві бонуси при зупинці юніта
 */
// function applyTileDefenseBonuses(unit) {
//     if (!unit || unit.x === undefined || unit.y === undefined) {
//         return;
//     }
    
//     const bonuses = getTileBonuses(unit.x, unit.y, unit);
    
//     if (!bonuses || (bonuses.armor === 0 && bonuses.defense === 0)) {
//         // Юніт на звичайній клітинці - скидаємо бонуси
//         if (unit.tileBonuses) {
//             console.log(`⬇️ ${unit.name} покинув особливу клітинку`);
//             unit.tileBonuses = null;
//         }
//         return;
//     }


function applyTileDefenseBonuses(unit) {
    if (!unit || unit.x === undefined || unit.y === undefined) {
        return;
    }
    
    const bonuses = getTileBonuses(unit.x, unit.y, unit);
    
    if (!bonuses || (bonuses.armor === 0 && bonuses.defense === 0)) {
        // Юніт на звичайній клітинці - скидаємо бонуси
        if (unit.tileBonuses) {
            console.log(`⬇️ ${unit.name} покинув особливу клітинку`);
            unit.tileBonuses = null;
        }
        return;
    }
    
    // Зберігаємо бонуси в юніті (замінюємо старі, якщо були)
    unit.tileBonuses = bonuses;
    
    // Логуємо
    const bonusTexts = [];
    if (bonuses.defense > 0) bonusTexts.push(`🛡️ +${bonuses.defense} захисту`);
    if (bonuses.armor > 0) bonusTexts.push(`🛡️ +${bonuses.armor} броні`);
    
    if (bonusTexts.length > 0) {
        const tileName = tileInfo[mapData[unit.y][unit.x]].name;
        console.log(`✨ ${unit.name} на "${tileName}": ${bonusTexts.join(', ')}`);
    }
}

/**
 * Регенерує HP всім юнітам гравця на початку ходу
 */
/**
 * Регенерує HP всім юнітам гравця на початку ходу
 */
function regenerateUnitsAtTurnStart(playerIndex) {
    const currentPlayer = players[playerIndex];
    if (!currentPlayer) return;
    
    const playerUnits = unitsOnMap.filter(u => u.playerIndex === playerIndex);
    
    playerUnits.forEach(unit => {
        const bonuses = getTileBonuses(unit.x, unit.y, unit);
        
        if (bonuses && bonuses.regeneration > 0) {
            const oldHp = unit.newhp || unit.hp;
            const maxHp = unit.maxHp || unit.hp;
            
            // Регенеруємо HP
            unit.newhp = Math.min(maxHp, oldHp + bonuses.regeneration);
            
            if (unit.newhp > oldHp) {
                const tileName = tileInfo[mapData[unit.y][unit.x]].name;
                console.log(`💚 ${unit.name} на "${tileName}": ${oldHp} → ${unit.newhp} HP (+${unit.newhp - oldHp})`);
                
                // Оновлюємо health bar
                if (typeof window.updateUnitHealthBar === 'function') {
                    window.updateUnitHealthBar(unit);
                }
                
                // Показуємо попап
                showRegenerationPopup(unit.x, unit.y, unit.newhp - oldHp);
            }
        }
    });
}
/**
 * Регенерує HP від аур (supportAura) всім юнітам гравця на початку ходу
 */
function regenerateHpFromAuras(playerIndex) {
    const currentPlayer = players[playerIndex];
    if (!currentPlayer) return;
    
    const playerUnits = unitsOnMap.filter(u => u.playerIndex === playerIndex);
    
    playerUnits.forEach(unit => {
        // Перевіряємо чи є активні ефекти mixed типу з hpRegenPercent
        if (unit.activeEffects && unit.activeEffects.length > 0) {
            unit.activeEffects.forEach(effect => {
                if (effect.type === "mixed" && effect.hpRegenPercent > 0) {
                    const oldHp = unit.newhp || unit.hp;
                    const maxHp = unit.maxHp || unit.hp;
                    
                    // Розраховуємо регенерацію (відсоток від максимального HP)
                    const regenAmount = Math.floor(maxHp * (effect.hpRegenPercent / 100));
                    const newHp = Math.min(maxHp, oldHp + regenAmount);
                    
                    if (newHp > oldHp) {
                        unit.newhp = newHp;
                        console.log(`💚 ${unit.name} отримав регенерацію від аури: ${oldHp} → ${newHp} HP (+${regenAmount}) від ${effect.sourceName}`);
                        
                        // Оновлюємо health bar
                        if (typeof window.updateUnitHealthBar === 'function') {
                            window.updateUnitHealthBar(unit);
                        }
                        
                        // Показуємо попап
                        showRegenerationPopup(unit.x, unit.y, regenAmount);
                    }
                }
            });
        }
    });
}

/**
 * Показує попап регенерації
 */
function showRegenerationPopup(x, y, amount) {
    if (!map) return;
    
    const popup = document.createElement('div');
    popup.innerHTML = `💚 +${amount} HP`;
    popup.style.cssText = `
        position: absolute;
        left: ${x * cellSizeAll + 10}px;
        top: ${y * cellSizeAll - 20}px;
        color: #00ff88;
        font-weight: bold;
        font-size: 16px;
        text-shadow: 2px 2px 4px black;
        z-index: 1000;
        pointer-events: none;
        animation: floatUp 1.5s ease-out forwards;
    `;
    
    map.appendChild(popup);
    setTimeout(() => popup.remove(), 1500);
}

/**
 * Обчислює фінальну броню юніта з бонусами від клітинки
 */
function calculateFinalArmor(unit) {
    let baseArmor = unit.isHero 
        ? (unit.armor || 0) + (unit.LevelArmor || 0)
        : (unit.armor || 0);
    
    console.log(`🛡️ ${unit.name} базова броня: ${baseArmor}`);
    
    // Додаємо бонуси від клітинки
    if (unit.tileBonuses) {
        const tileBonus = (unit.tileBonuses.armor || 0) + (unit.tileBonuses.defense || 0);
        if (tileBonus > 0) {
            console.log(`🏰 Бонус від клітинки: +${tileBonus}`);
            baseArmor += tileBonus;
        }
    } else {
        console.log(`⚠️ ${unit.name} не має tileBonuses!`);
    }
    
    console.log(`🛡️ ${unit.name} фінальна броня: ${baseArmor}`);
    
    return baseArmor;
}

// Експортуємо функції
window.applyTileDefenseBonuses = applyTileDefenseBonuses;
window.regenerateUnitsAtTurnStart = regenerateUnitsAtTurnStart;
window.calculateFinalArmor = calculateFinalArmor;
window.getTileBonuses = getTileBonuses;
window.regenerateHpFromAuras = regenerateHpFromAuras;

console.log('✅ Система ефектів від клітинок ініціалізована');