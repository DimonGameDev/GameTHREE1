// ============================================
// СИСТЕМА АКТИВНИХ ЗДІБНОСТЕЙ ГЕРОЇВ
// ============================================

class HeroActiveAbilitySystem {
    constructor() {
        // Реєстр обробників здібностей (легко додавати нові)
        this.handlers = {};
        
        // Стан активації
        this.isSelectingTarget = false;
        this.activeAbility = null;
        this.caster = null;
        this.currentCooldowns = new Map(); // Map<heroId_abilityId, cooldown>
        
        // Реєструємо базові обробники
        this.registerDefaultHandlers();
    }

    // ═══════════════════════════════════════════
    // РЕЄСТРАЦІЯ ОБРОБНИКІВ (для розширення)
    // ═══════════════════════════════════════════
    
    /**
     * Реєструє обробник для типу здібності
     * @param {string} actionType - тип дії (self_buff, projectile, teleport, etc.)
     * @param {object} handler - об'єкт з методами: canActivate, getTargets, execute
     */
    registerHandler(actionType, handler) {
        this.handlers[actionType] = handler;
       // console.log(`✅ Зареєстровано обробник: ${actionType}`);
    }

    /**
     * Реєструє базові обробники
     */
    registerDefaultHandlers() {
        // ═══════════════════════════════════════════
        // SELF_BUFF - баф на себе (ID: 11)
        // ═══════════════════════════════════════════
        this.registerHandler('self_buff', {
            needsTarget: false,
            blocksAttack: false,
            
            canActivate: (hero, ability, levelData) => {
                return true; // Завжди можна активувати на себе
            },
            
            execute: (hero, ability, levelData) => {
                // Розрахунок бонусу залежно від втраченого HP
                const currentHp = hero.newhp ?? hero.hp;
                const maxHp = hero.maxHp || hero.hp;
                const lostHpPercent = ((maxHp - currentHp) / maxHp) * 100;
                
                const hpPercentForDamage = ability.hpPercentForDamage || 10;
                const stacks = Math.floor(lostHpPercent / hpPercentForDamage);
                const bonusPercent = stacks * (levelData.damagePercent || 0);
                
                // Розраховуємо плоский бонус атаки
                const baseAttack = (hero.attack || 0) + (hero.LevelAttack || 0);
                const attackBoost = Math.floor(baseAttack * (bonusPercent / 100));
                
                if (attackBoost > 0) {
                    // Ініціалізуємо activeEffects
                    if (!hero.activeEffects) hero.activeEffects = [];
                    
                    // Видаляємо старий ефект
                    hero.activeEffects = hero.activeEffects.filter(e => e.type !== 'blood_rage');
                    
                    // Додаємо новий ефект
                    hero.activeEffects.push({
                        type: 'blood_rage',
                        attackBoost: attackBoost,
                        appliedByPlayerIndex: hero.playerIndex,
                        source: `ability_11_from_${hero.id}`
                    });
                    
                    // Додаємо атаку напряму
                    hero.attack = (hero.attack || 0) + attackBoost;
                    
                    console.log(`🔥 ${hero.name}: Кров'яний лют +${attackBoost} атаки (${stacks} стаків, ${bonusPercent}%)`);
                }
                
                return {
                    success: true,
                    message: attackBoost > 0 ? `+${attackBoost} до атаки` : 'Потрібно втратити HP!',
                    bonus: attackBoost
                };
            }
        });

        // ... existing code ...

        // ═══════════════════════════════════════════
        // PROJECTILE - стріла у ворога (ID: 12)
        // ═══════════════════════════════════════════
        this.registerHandler('projectile', {
            needsTarget: true,
            targetType: 'enemy',  // 🆕 Вибір ворога, а не напрямку
            
            getValidTargets: (hero, ability, levelData, unitsOnMap) => {
                const maxRange = levelData.distance || 10;
                const targets = [];
                
                // Показуємо ВСІ клітинки в радіусі для візуалізації
                for (let dx = -maxRange; dx <= maxRange; dx++) {
                    for (let dy = -maxRange; dy <= maxRange; dy++) {
                        if (dx === 0 && dy === 0) continue;
                        
                        const distance = Math.abs(dx) + Math.abs(dy);
                        if (distance <= maxRange) {
                            const x = hero.x + dx;
                            const y = hero.y + dy;
                            
                            if (x >= 0 && y >= 0 && x < 30 && y < 30) {
                                // Шукаємо ворога на цій клітинці
                                const enemy = unitsOnMap.find(u => 
                                    u.x === x && 
                                    u.y === y && 
                                    u.playerIndex !== hero.playerIndex
                                );
                                
                                if (enemy) {
                                    targets.push({ unit: enemy, x, y });
                                } else {
                                    // Порожня клітинка - для візуалізації дистанції
                                    targets.push({ x, y, visualOnly: true });
                                }
                            }
                        }
                    }
                }
                
                return targets;
            },
            
            execute: (hero, ability, levelData, target, unitsOnMap) => {
                if (!target.unit) {
                    return { success: false, message: 'Ціль не знайдена' };
                }
                
                const enemy = target.unit;
                console.log(`🔍 BEFORE: newhp=${enemy.newhp}, hp=${enemy.hp}, maxHp=${enemy.maxHp}`);
                
                // 1️⃣ Розраховуємо шкоду
                let damage;
                if (levelData.damagePercent) {
                    damage = Math.floor(hero.attack * (levelData.damagePercent / 100));
                } else {
                    damage = levelData.damage || hero.attack || 50;
                }
                
                // 2️⃣ Застосовуємо шкоду (ОКРЕМО!)
                if (enemy.newhp !== undefined) {
                    enemy.newhp -= damage;
                } else {
                    enemy.newhp = (enemy.hp || 100) - damage;
                }
                
                console.log(`🔍 AFTER: newhp=${enemy.newhp}`);
                console.log(`🏹 ${hero.name} стріляє в ${enemy.name}: ${damage} шкоди`);
                if (typeof window.addHeroesMana === 'function') {
                    const heroOriginalIndex = hero.originalIndex ?? hero.playerIndex;
                    window.addHeroesMana(heroOriginalIndex, damage, false);
                }
                // Перевіряємо чи ворог загинув
                if (enemy.newhp <= 0) {
                    console.log(`💀 ${enemy.name} загинув від стріли!`);
                    // Тут можна додати видалення юніта
                    if (typeof window.addManaForKill === 'function') {
                        const heroOriginalIndex = hero.originalIndex ?? hero.playerIndex;
                        window.addManaForKill(heroOriginalIndex);
                    }
                }
                
                // Оновлюємо health bar
                if (typeof window.updateUnitHealthBar === 'function') {
                    window.updateUnitHealthBar(enemy);
                }
                
                return { 
                    success: true, 
                    message: `Влучив у ${enemy.name} на ${damage} шкоди!`
                };
            }
        });
// ═══════════════════════════════════════════
// HEALTH_SWAP - обмін здоровʼям з союзником (ID: 13)
// ═══════════════════════════════════════════
this.registerHandler('health_swap', {
    needsTarget: true,
    targetType: 'ally',
    
    getValidTargets: (hero, ability, levelData, unitsOnMap) => {
        const maxRange = levelData.distance || 5;
        const targets = [];
        
        // 🆕 Показуємо ВСІ клітинки в радіусі для візуалізації
        for (let dx = -maxRange; dx <= maxRange; dx++) {
            for (let dy = -maxRange; dy <= maxRange; dy++) {
                if (dx === 0 && dy === 0) continue;
                
                const distance = Math.abs(dx) + Math.abs(dy);
                if (distance <= maxRange) {
                    const x = hero.x + dx;
                    const y = hero.y + dy;
                    
                    // Перевіряємо межі карти
                    if (x >= 0 && y >= 0 && x < 30 && y < 30) {
                        // Шукаємо союзника на цій клітинці
                        const ally = unitsOnMap.find(u => 
                            u.x === x && 
                            u.y === y && 
                            u.id !== hero.id && 
                            u.playerIndex === hero.playerIndex
                        );
                        
                        if (ally) {
                            // Є союзник - можна обрати
                            targets.push({ unit: ally, x, y });
                        } else {
                            // Порожня клітинка - тільки для візуалізації дистанції
                            targets.push({ x, y, visualOnly: true });
                        }
                    }
                }
            }
        }
        
        return targets;
    },
    
    execute: (hero, ability, levelData, target, unitsOnMap) => {
        // 🆕 Перевіряємо чи є юніт для обміну
        if (!target.unit) {
            return { success: false, message: 'Тут немає союзника для обміну!' };
        }
        
        const ally = target.unit;
        
        // Поточне HP обох
        const heroCurrentHp = hero.newhp ?? hero.hp;
        const allyCurrentHp = ally.newhp ?? ally.hp;
        
        // Максимальне HP героя
        const heroMaxHp = hero.maxHp || hero.hp;
        
        // Скільки % HP союзника отримує герой
        const receivePercent = levelData.healthReceivePercent || 80;
        
        // Розрахунок HP, яке герой отримає від союзника
        let hpFromAlly = Math.floor(allyCurrentHp * (receivePercent / 100));
        
        // Якщо це перевищує максимум героя - обмежуємо максимумом
        const heroNewHp = Math.min(hpFromAlly, heroMaxHp);
        
        // Союзник отримує 100% поточного HP героя (але не більше свого максимуму)
        const allyMaxHp = ally.maxHp || ally.hp;
        const allyNewHp = Math.min(heroCurrentHp, allyMaxHp);
        
        // Застосовуємо обмін
        hero.newhp = heroNewHp;
        ally.newhp = allyNewHp;
        
        console.log(`💚 Обмін здоровʼям:`);
        console.log(`   ${hero.name}: ${heroCurrentHp} → ${heroNewHp} HP (отримав ${receivePercent}% від ${allyCurrentHp})`);
        console.log(`   ${ally.name}: ${allyCurrentHp} → ${allyNewHp} HP (отримав 100% від ${heroCurrentHp})`);
        
        // Оновлюємо health bar обох юнітів
        if (typeof window.updateUnitHealthBar === 'function') {
            window.updateUnitHealthBar(hero);
            window.updateUnitHealthBar(ally);
        }
        
        return {
            success: true,
            message: `Обмін з ${ally.name}: ${hero.name} отримав ${heroNewHp} HP, ${ally.name} отримав ${allyNewHp} HP`,
            heroHpChange: heroNewHp - heroCurrentHp,
            allyHpChange: allyNewHp - allyCurrentHp
        };
    }
});
// ... existing code ...

        // ═══════════════════════════════════════════
        // JUMP - стрибок через клітинку (ID: 13)
        // ═══════════════════════════════════════════
        this.registerHandler('jump', {
            needsTarget: true,
            targetType: 'empty_cell',
            
            getValidTargets: (hero, ability, levelData, unitsOnMap) => {
                // Стрибок через одну клітинку в будь-якому напрямку
                const targets = [];
                const directions = [
                    { dx: 2, dy: 0 }, { dx: -2, dy: 0 },
                    { dx: 0, dy: 2 }, { dx: 0, dy: -2 },
                    { dx: 2, dy: 2 }, { dx: -2, dy: 2 },
                    { dx: 2, dy: -2 }, { dx: -2, dy: -2 }
                ];
                
                directions.forEach(dir => {
                    const x = hero.x + dir.dx;
                    const y = hero.y + dir.dy;
                    
                    // Перевіряємо що клітинка порожня
                    const occupied = unitsOnMap.find(u => u.x === x && u.y === y);
                    if (!occupied && x >= 0 && y >= 0 && x < 30 && y < 30) {
                        targets.push({ x, y });
                    }
                });
                
                return targets;
            },
            
            execute: (hero, ability, levelData, target) => {
                const oldX = hero.x;
                const oldY = hero.y;
                
                // Переміщуємо героя
                hero.x = target.x;
                hero.y = target.y;
                
                // Додаємо бонуси
                if (levelData.cellAttackPlus) {
                    hero.range = (hero.range || 1) + levelData.cellAttackPlus;
                }
                if (levelData.critChancePercent) {
                    hero.critChance = (hero.critChance || 0) + levelData.critChancePercent;
                }
                if (levelData.armorPlusPercent) {
                    const bonus = Math.floor((hero.armor || 0) * (levelData.armorPlusPercent / 100));
                    hero.armor = (hero.armor || 0) + bonus;
                }
                
                console.log(`🦘 ${hero.name} стрибнув з (${oldX},${oldY}) на (${target.x},${target.y})`);
                
                return {
                    success: true,
                    message: `Стрибок виконано`,
                    oldPosition: { x: oldX, y: oldY },
                    newPosition: { x: target.x, y: target.y }
                };
            }
        });

        // ═══════════════════════════════════════════
// THORNS - шипи, повертають урон атакуючому (ID: 14)
// ═══════════════════════════════════════════
this.registerHandler('thorns', {
    needsTarget: false,  // Застосовується на себе
    
    execute: (hero, ability, levelData, target, unitsOnMap) => {
        const reflectPercent = levelData.reflectPercent || 20;
        const duration = levelData.duration || 2;
        
        // Додаємо ефект "Шипи" герою
        if (!hero.activeEffects) {
            hero.activeEffects = [];
        }
        
        // Видаляємо старий ефект шипів, якщо є
        hero.activeEffects = hero.activeEffects.filter(e => e.type !== 'thorns');
        
        // Додаємо новий ефект
        hero.activeEffects.push({
            type: 'thorns',
            reflectPercent: reflectPercent,
            turnsLeft: duration,
            source: `ability_14`
        });
        
        console.log(`🌵 ${hero.name} активував Шипи: ${reflectPercent}% відбиття на ${duration} ходів`);
        
        return {
            success: true,
            message: `Шипи активовано! ${reflectPercent}% відбиття на ${duration} ходів`
        };
    }
});

        // ═══════════════════════════════════════════
        // TELEPORT - телепорт (ID: 15)
        // ═══════════════════════════════════════════
        this.registerHandler('teleport', {
            needsTarget: true,
            targetType: 'empty_cell',
            
            getValidTargets: (hero, ability, levelData, unitsOnMap) => {
                const maxRange = levelData.cellTeleport || 5;
                const targets = [];
                
                for (let dx = -maxRange; dx <= maxRange; dx++) {
                    for (let dy = -maxRange; dy <= maxRange; dy++) {
                        if (dx === 0 && dy === 0) continue;
                        
                        const distance = Math.abs(dx) + Math.abs(dy);
                        if (distance <= maxRange) {
                            const x = hero.x + dx;
                            const y = hero.y + dy;
                            
                            if (x >= 0 && y >= 0 && x < 30 && y < 30) {
                                // 🆕 Перевіряємо чи клітинка прохідна (не вода, не гори тощо)
                                const tileType = mapData?.[y]?.[x];
                                const isWalkable = tileType !== 3 && tileType !== undefined; // 3 = вода
                                
                                if (isWalkable) {
                                    const occupied = unitsOnMap.find(u => u.x === x && u.y === y);
                                    if (!occupied) {
                                        targets.push({ x, y });
                                    }
                                }
                            }
                        }
                    }
                }
                
                return targets;
            },
            
            execute: (hero, ability, levelData, target) => {
                const oldX = hero.x;
                const oldY = hero.y;
                
                hero.x = target.x;
                hero.y = target.y;
                
                console.log(`✨ ${hero.name} телепортувався з (${oldX},${oldY}) на (${target.x},${target.y})`);
                
                return {
                    success: true,
                    message: `Телепорт виконано`,
                    oldPosition: { x: oldX, y: oldY }
                };
            }
        });

        // ═══════════════════════════════════════════
        // TELEPORT_DEBUFF - телепорт + AoE дебаф (ID: 16)
        // ═══════════════════════════════════════════
        this.registerHandler('teleport_debuff', {
            needsTarget: true,
            targetType: 'empty_cell',
            maxRange: 3, // Фіксована дальність телепорту
            
            getValidTargets: (hero, ability, levelData, unitsOnMap) => {
                const maxRange = 3;
                const targets = [];
                
                for (let dx = -maxRange; dx <= maxRange; dx++) {
                    for (let dy = -maxRange; dy <= maxRange; dy++) {
                        if (dx === 0 && dy === 0) continue;
                        
                        const distance = Math.abs(dx) + Math.abs(dy);
                        if (distance <= maxRange) {
                            const x = hero.x + dx;
                            const y = hero.y + dy;
                            
                            if (x >= 0 && y >= 0 && x < 30 && y < 30) {
                                const occupied = unitsOnMap.find(u => u.x === x && u.y === y);
                                if (!occupied) {
                                    targets.push({ x, y });
                                }
                            }
                        }
                    }
                }
                
                return targets;
            },
            
            execute: (hero, ability, levelData, target, unitsOnMap) => {
                const oldX = hero.x;
                const oldY = hero.y;
                
                // Телепортуємось
                hero.x = target.x;
                hero.y = target.y;
                
                // Дебаф всім ворогам поряд
                const affected = [];
                for (let dx = -1; dx <= 1; dx++) {
                    for (let dy = -1; dy <= 1; dy++) {
                        if (dx === 0 && dy === 0) continue;
                        
                        const enemy = unitsOnMap.find(u => 
                            u.x === target.x + dx && 
                            u.y === target.y + dy && 
                            u.playerIndex !== hero.playerIndex
                        );
                        
                        if (enemy) {
                            const stepLost = levelData.stepMinus || 0;
                            const armorLost = levelData.armorMinus || 0;
                            
                            // Знижуємо крок
                            if (stepLost) {
                                enemy.step = Math.max(0, (enemy.step || 0) - stepLost);
                            }
                            // Знижуємо броню
                            if (armorLost) {
                                enemy.armor = Math.max(0, (enemy.armor || 0) - armorLost);
                            }
                            
                            // 🆕 Зберігаємо дебаф для відновлення через 1 хід
                            if ((stepLost || armorLost) && window.heroAuraSystem) {
                                window.heroAuraSystem.bashDebuffs.set(enemy.id, {
                                    stepLost: stepLost,
                                    armorLost: armorLost,
                                    turnsLeft: 1,
                                    appliedByPlayerIndex: hero.playerIndex  // 🆕 Хто застосував
                                });
                            }
                            
                            affected.push(enemy);
                        }
                    }
                }
                
                console.log(`🌀 ${hero.name}: Тактичний підступ, вражено ${affected.length} ворогів`);
                
                return {
                    success: true,
                    message: `Вражено ${affected.length} ворогів`,
                    affected: affected
                };
            }
        });

                 // ═══════════════════════════════════════════
        // SWAP - обмін позиціями (ID: 17)
        // ═══════════════════════════════════════════
        this.registerHandler('swap', {
            needsTarget: true,
            targetType: 'ally',
            
            getValidTargets: (hero, ability, levelData, unitsOnMap) => {
                const maxRange = levelData.rangeCount || 5;
                const targets = [];
                
                // 🆕 Показуємо ВСІ клітинки в радіусі
                for (let dx = -maxRange; dx <= maxRange; dx++) {
                    for (let dy = -maxRange; dy <= maxRange; dy++) {
                        if (dx === 0 && dy === 0) continue;
                        
                        const distance = Math.abs(dx) + Math.abs(dy);
                        if (distance <= maxRange) {
                            const x = hero.x + dx;
                            const y = hero.y + dy;
                            
                            // Перевіряємо межі карти
                            if (x >= 0 && y >= 0 && x < 30 && y < 30) {
                                // Шукаємо союзника на цій клітинці
                                const ally = unitsOnMap.find(u => 
                                    u.x === x && 
                                    u.y === y && 
                                    u.id !== hero.id && 
                                    u.playerIndex === hero.playerIndex
                                );
                                
                                if (ally) {
                                    // Є союзник - можна обрати
                                    targets.push({ unit: ally, x, y });
                                } else {
                                    // Порожня клітинка - тільки для візуалізації
                                    targets.push({ x, y, visualOnly: true });
                                }
                            }
                        }
                    }
                }
                
                return targets;
            },
            
            execute: (hero, ability, levelData, target) => {
                // 🆕 Перевіряємо чи є юніт для обміну
                if (!target.unit) {
                    return { success: false, message: 'Тут немає союзника для обміну!' };
                }
                
                const heroOldX = hero.x;
                const heroOldY = hero.y;
                
                // Міняємо місцями
                hero.x = target.unit.x;
                hero.y = target.unit.y;
                target.unit.x = heroOldX;
                target.unit.y = heroOldY;
                
                console.log(`🔄 ${hero.name} помінявся місцями з ${target.unit.name}`);
                
                return {
                    success: true,
                    message: `Обмін позиціями з ${target.unit.name}`,
                    swappedWith: target.unit
                };
            }
        });
         // ═══════════════════════════════════════════
        // AOE_ALLY_BUFF - бонуси союзникам в зоні (ID: 18)
        // Хрест: 2 клітинки ортогонально + 1 по діагоналі
        // ═══════════════════════════════════════════
        this.registerHandler('aoe_ally_buff', {
            needsTarget: false,
            
            execute: (hero, ability, levelData, target, unitsOnMap) => {
                // Визначаємо зону впливу (відносні координати)
                const affectedPositions = [
                    // Ортогонально (до 2 клітинок)
                    { dx: 0, dy: -1 }, { dx: 0, dy: -2 },  // вгору
                    { dx: 0, dy: 1 }, { dx: 0, dy: 2 },    // вниз
                    { dx: -1, dy: 0 }, { dx: -2, dy: 0 },  // вліво
                    { dx: 1, dy: 0 }, { dx: 2, dy: 0 },    // вправо
                    // Діагонально (1 клітинка)
                    { dx: -1, dy: -1 }, { dx: 1, dy: -1 }, // верхні діагоналі
                    { dx: -1, dy: 1 }, { dx: 1, dy: 1 }    // нижні діагоналі
                ];
                
                const { attackBoostPercent, armorBoost, hpRegenPercent } = levelData;
                const affectedUnits = [];
                
                // Знаходимо союзників в зоні
                affectedPositions.forEach(pos => {
                    const targetX = hero.x + pos.dx;
                    const targetY = hero.y + pos.dy;
                    
                    const ally = unitsOnMap.find(u => 
                        u.x === targetX && 
                        u.y === targetY && 
                        u.playerIndex === hero.playerIndex &&
                        u.id !== hero.id
                    );
                    
                    if (ally) {
                        // 1️⃣ Реген HP (відразу)
                        if (hpRegenPercent && hpRegenPercent > 0) {
                            const maxHp = ally.maxHp || ally.hp;
                            const healAmount = Math.floor(maxHp * (hpRegenPercent / 100));
                            const currentHp = ally.newhp ?? ally.hp;
                            ally.newhp = Math.min(currentHp + healAmount, maxHp);
                            console.log(`💚 ${ally.name} відновив ${healAmount} HP`);
                        }
                        
                        // 2️⃣ Бонуси на 1 хід (тимчасові)
                        if (!ally.tempBonuses) ally.tempBonuses = {};
                        
                        if (attackBoostPercent) {
                            ally.tempBonuses.attackPercent = (ally.tempBonuses.attackPercent || 0) + attackBoostPercent;
                        }
                        if (armorBoost) {
                            ally.tempBonuses.armor = (ally.tempBonuses.armor || 0) + armorBoost;
                        }
                        
                        // Позначаємо що бонус діє 1 хід
                        ally.tempBonuses.duration = 1;
                        ally.tempBonuses.source = `ability_${hero.id}_18`;
                        
                        affectedUnits.push(ally.name);
                        console.log(`✨ ${ally.name}: +${attackBoostPercent}% атаки, +${armorBoost} броні (1 хід)`);
                    }
                });
                
                // Застосовуємо і на самого героя (якщо потрібно)
                // hero.tempBonuses = { ... };
                
                if (affectedUnits.length === 0) {
                    return { success: true, message: 'Немає союзників в зоні' };
                }
                
                return {
                    success: true,
                    message: `Бонуси надано: ${affectedUnits.join(', ')}`,
                    affectedCount: affectedUnits.length
                };
            }
        });

         // ═══════════════════════════════════════════
        // AOE_DAMAGE - урон по площі 3x3 (ID: 21)
        // ═══════════════════════════════════════════
        this.registerHandler('aoe_damage', {
            needsTarget: false,
            
            execute: (hero, ability, levelData, target, unitsOnMap) => {
                // Зона 3x3 навколо героя
                const affectedPositions = [];
                for (let dx = -1; dx <= 1; dx++) {
                    for (let dy = -1; dy <= 1; dy++) {
                        if (dx === 0 && dy === 0) continue; // Пропускаємо клітинку героя
                        affectedPositions.push({ dx, dy });
                    }
                }
                
                const { damagePercent, stepMinus } = levelData;
                const baseDamage = Math.floor(hero.attack * (damagePercent / 100));
                const affectedEnemies = [];
                
                // Знаходимо ворогів в зоні
                affectedPositions.forEach(pos => {
                    const targetX = hero.x + pos.dx;
                    const targetY = hero.y + pos.dy;
                    
                    const enemy = unitsOnMap.find(u => 
                        u.x === targetX && 
                        u.y === targetY && 
                        u.playerIndex !== hero.playerIndex
                    );
                    
                    if (enemy) {
                        // 1️⃣ Наносимо урон
                        const currentHp = enemy.newhp ?? enemy.hp;
                        const armor = enemy.armor || 0;
                        const actualDamage = Math.max(1, baseDamage - Math.floor(armor * 0.5));
                        
                        enemy.newhp = Math.max(0, currentHp - actualDamage);
                        console.log(`💥 ${enemy.name} отримав ${actualDamage} урону (HP: ${currentHp} → ${enemy.newhp})`);
                        if (typeof window.addHeroesMana === 'function') {
                            const heroOriginalIndex = hero.originalIndex ?? hero.playerIndex;
                            window.addHeroesMana(heroOriginalIndex, actualDamage, false);
                        }
                        // 2️⃣ Зменшуємо крок
if (stepMinus && stepMinus > 0) {
    // Зберігаємо оригінальний step якщо ще не збережено
    if (enemy.originalStepBeforeAoe === undefined) {
        enemy.originalStepBeforeAoe = enemy.step || 0;
    }
    
    enemy.step = Math.max(0, (enemy.step || 0) - stepMinus);
    console.log(`🦶 ${enemy.name}: -${stepMinus} крок (залишилось: ${enemy.step})`);
    
    // Додаємо ефект для відновлення через 1 хід
    if (!enemy.activeEffects) {
        enemy.activeEffects = [];
    }
    
    enemy.activeEffects.push({
        type: "debuff",
        effectType: "stepReduction",
        stepReduction: stepMinus,
        appliedByPlayer: hero.playerIndex,  // ← Зберігаємо хто застосував
        source: "aoe_damage_ability_21"
    });
}
                        
                        // Оновлюємо health bar
                        if (typeof window.updateUnitHealthBar === 'function') {
                            window.updateUnitHealthBar(enemy);
                        }
                        
                        // Перевіряємо смерть
                        if (enemy.newhp <= 0) {
                            console.log(`☠️ ${enemy.name} загинув від AoE!`);
                            // Тут можна додати видалення юніта
                            if (typeof window.addManaForKill === 'function') {
                                const heroOriginalIndex = hero.originalIndex ?? hero.playerIndex;
                                window.addManaForKill(heroOriginalIndex);
                            }
                        }
                        
                        affectedEnemies.push({
                            name: enemy.name,
                            damage: actualDamage,
                            isDead: enemy.newhp <= 0
                        });
                    }
                });
                
                if (affectedEnemies.length === 0) {
                    return { success: true, message: 'Немає ворогів в зоні' };
                }
                
                const totalDamage = affectedEnemies.reduce((sum, e) => sum + e.damage, 0);
                const killed = affectedEnemies.filter(e => e.isDead).length;
                
                return {
                    success: true,
                    message: `Урон ${totalDamage} по ${affectedEnemies.length} ворогам${killed > 0 ? `, вбито: ${killed}` : ''}`,
                    affectedCount: affectedEnemies.length,
                    totalDamage: totalDamage
                };
            }
        });

        // ═══════════════════════════════════════════
// THORNS_ALLY - колючі щити союзнику (ID: 22)
// ═══════════════════════════════════════════
this.registerHandler('thorns_ally', {
    needsTarget: true,
    targetType: 'ally',
    
    getValidTargets: (hero, ability, levelData, unitsOnMap) => {
        const maxRange = levelData.distance || 5;
        const targets = [];
        
        // 🆕 Показуємо ВСІ клітинки в радіусі для візуалізації
        for (let dx = -maxRange; dx <= maxRange; dx++) {
            for (let dy = -maxRange; dy <= maxRange; dy++) {
                if (dx === 0 && dy === 0) continue;
                
                const distance = Math.abs(dx) + Math.abs(dy);
                if (distance <= maxRange) {
                    const x = hero.x + dx;
                    const y = hero.y + dy;
                    
                    // Перевіряємо межі карти
                    if (x >= 0 && y >= 0 && x < 30 && y < 30) {
                        // Шукаємо союзника на цій клітинці
                        const ally = unitsOnMap.find(u => 
                            u.x === x && 
                            u.y === y && 
                            u.id !== hero.id && 
                            u.playerIndex === hero.playerIndex
                        );
                        
                        if (ally) {
                            // Є союзник - можна обрати
                            targets.push({ unit: ally, x, y });
                        } else {
                            // Порожня клітинка - тільки для візуалізації дистанції
                            targets.push({ x, y, visualOnly: true });
                        }
                    }
                }
            }
        }
        
        return targets;
    },
    
    execute: (hero, ability, levelData, target, unitsOnMap) => {
        // Перевіряємо чи є юніт
        if (!target.unit) {
            return { success: false, message: 'Тут немає союзника!' };
        }
        
        const ally = target.unit;
        const reflectPercent = levelData.damagePercent || 20;
        const duration = 1; // 1 хід
        
        // Додаємо ефект "Шипи" СОЮЗНИКУ
        if (!ally.activeEffects) {
            ally.activeEffects = [];
        }
        
        // Видаляємо старий ефект шипів, якщо є
        ally.activeEffects = ally.activeEffects.filter(e => e.type !== 'thorns');
        
        // Додаємо новий ефект
        ally.activeEffects.push({
            type: 'thorns',
            reflectPercent: reflectPercent,
            expiresOnRound: currentRound + 1,
            appliedByPlayerIndex: hero.playerIndex,  // 🆕 Хто застосував
            source: `ability_22_from_${hero.id}`
        });
        
        console.log(`🌵 ${hero.name} надав Шипи союзнику ${ally.name}: ${reflectPercent}% відбиття`);
        
        return {
            success: true,
            message: `${ally.name} отримав Колючі щити (${reflectPercent}%)`
        };
    }
});

// ═══════════════════════════════════════════
// ARMOR_SELF - броньований щит на себе (ID: 23)
// ═══════════════════════════════════════════
this.registerHandler('armor_self', {
    needsTarget: false,  // Застосовується на себе
    
    execute: (hero, ability, levelData, target, unitsOnMap) => {
        const armorBoostPercent = levelData.armorBoostPercent || 20;
        
        // Додаємо ефект бонусної броні
        if (!hero.activeEffects) {
            hero.activeEffects = [];
        }
        
        // Видаляємо старий ефект броні, якщо є
        hero.activeEffects = hero.activeEffects.filter(e => e.type !== 'armor_boost');
        
        // Додаємо новий ефект
        hero.activeEffects.push({
            type: 'armor_boost',
            armorBoostPercent: armorBoostPercent,
            expiresOnRound: (typeof currentRound !== 'undefined' ? currentRound : 1) + 1,
            appliedByPlayerIndex: hero.playerIndex,
            source: `ability_23_from_${hero.id}`
        });
        
        console.log(`🛡️ ${hero.name} підняв Броньований щит: +${armorBoostPercent}% броні`);
        
        return {
            success: true,
            message: `+${armorBoostPercent}% броні на 1 раунд`
        };
    }
});

// ═══════════════════════════════════════════
// BUFF_ALLY - бонуси союзнику (ID: 24)
// ═══════════════════════════════════════════
this.registerHandler('buff_ally', {
    needsTarget: true,
    targetType: 'ally',
    
    getValidTargets: (hero, ability, levelData, unitsOnMap) => {
        const maxRange = levelData.distance || 5;
        const targets = [];
        
        // Показуємо ВСІ клітинки в радіусі для візуалізації
        for (let dx = -maxRange; dx <= maxRange; dx++) {
            for (let dy = -maxRange; dy <= maxRange; dy++) {
                if (dx === 0 && dy === 0) continue;
                
                const distance = Math.abs(dx) + Math.abs(dy);
                if (distance <= maxRange) {
                    const x = hero.x + dx;
                    const y = hero.y + dy;
                    
                    // Перевіряємо межі карти
                    if (x >= 0 && y >= 0 && x < 30 && y < 30) {
                        // Шукаємо союзника на цій клітинці
                        const ally = unitsOnMap.find(u => 
                            u.x === x && 
                            u.y === y && 
                            u.id !== hero.id && 
                            u.playerIndex === hero.playerIndex
                        );
                        
                        if (ally) {
                            targets.push({ unit: ally, x, y });
                        } else {
                            // Порожня клітинка - тільки для візуалізації дистанції
                            targets.push({ x, y, visualOnly: true });
                        }
                    }
                }
            }
        }
        
        return targets;
    },
    
    execute: (hero, ability, levelData, target, unitsOnMap) => {
        if (!target.unit) {
            return { success: false, message: 'Тут немає союзника!' };
        }
        
        const ally = target.unit;
        const stepPlus = levelData.stepPlus || 1;
        const attackBoost = levelData.attackBoost || 5;
        const armorBoost = levelData.armorBoost || 4;
        
        // Ініціалізуємо activeEffects
        if (!ally.activeEffects) {
            ally.activeEffects = [];
        }
        
        // Видаляємо старий баф, якщо є
        ally.activeEffects = ally.activeEffects.filter(e => e.type !== 'ally_buff');
        
        // Додаємо новий ефект
        ally.activeEffects.push({
            type: 'ally_buff',
            stepPlus: stepPlus,
            attackBoost: attackBoost,
            armorBoost: armorBoost,
            expiresOnRound: (typeof currentRound !== 'undefined' ? currentRound : 1) + 1,
            appliedByPlayerIndex: hero.playerIndex,
            source: `ability_24_from_${hero.id}`
        });
        
        // 🆕 Одразу додаємо бонус до кроку
        ally.step = (ally.step || 0) + stepPlus;
        ally.attack = (ally.attack || 0) + attackBoost;  // 🆕 Додаємо атаку
        ally.armor = (ally.armor || 0) + armorBoost;
        console.log(`✨ ${hero.name} дав бонуси союзнику ${ally.name}: +${stepPlus} крок, +${attackBoost} атаки, +${armorBoost} броні`);
        
        return {
            success: true,
            message: `${ally.name}: +${stepPlus} крок, +${attackBoost} атаки, +${armorBoost} броні`
        };
    }
});

// ═══════════════════════════════════════════
// CURSE_ENEMY - прокляття ворога (ID: 25)
// ═══════════════════════════════════════════
this.registerHandler('curse_enemy', {
    needsTarget: true,
    targetType: 'enemy',
    
    getValidTargets: (hero, ability, levelData, unitsOnMap) => {
        const maxRange = levelData.distance || 5;
        const targets = [];
        
        for (let dx = -maxRange; dx <= maxRange; dx++) {
            for (let dy = -maxRange; dy <= maxRange; dy++) {
                if (dx === 0 && dy === 0) continue;
                
                const distance = Math.abs(dx) + Math.abs(dy);
                if (distance <= maxRange) {
                    const x = hero.x + dx;
                    const y = hero.y + dy;
                    
                    if (x >= 0 && y >= 0 && x < 30 && y < 30) {
                        const enemy = unitsOnMap.find(u => 
                            u.x === x && 
                            u.y === y && 
                            u.playerIndex !== hero.playerIndex
                        );
                        
                        if (enemy) {
                            targets.push({ unit: enemy, x, y });
                        } else {
                            targets.push({ x, y, visualOnly: true });
                        }
                    }
                }
            }
        }
        
        return targets;
    },
    
    execute: (hero, ability, levelData, target, unitsOnMap) => {
        if (!target.unit) {
            return { success: false, message: 'Тут немає ворога!' };
        }
        
        const enemy = target.unit;
        const stepMinus = levelData.stepMinus || 1;
        const attackMinus = levelData.attackMinus || 5;
        const armorMinus = levelData.armorMinus || 4;
        
        if (!enemy.activeEffects) {
            enemy.activeEffects = [];
        }
        
        // Видаляємо старе прокляття
        enemy.activeEffects = enemy.activeEffects.filter(e => e.type !== 'curse');
        
        // Додаємо прокляття
        enemy.activeEffects.push({
            type: 'curse',
            stepMinus: stepMinus,
            attackMinus: attackMinus,
            armorMinus: armorMinus,
            appliedByPlayerIndex: hero.playerIndex,
            source: `ability_25_from_${hero.id}`
        });
        
        // Одразу віднімаємо бонуси
        enemy.step = Math.max(0, (enemy.step || 0) - stepMinus);
        enemy.attack = Math.max(0, (enemy.attack || 0) - attackMinus);
        enemy.armor = Math.max(0, (enemy.armor || 0) - armorMinus);
        
        console.log(`💀 ${hero.name} проклав ${enemy.name}: -${stepMinus} крок, -${attackMinus} атаки, -${armorMinus} броні`);
        
        return {
            success: true,
            message: `${enemy.name} проклятий: -${stepMinus} крок, -${attackMinus} атаки, -${armorMinus} броні`
        };
    }
});



// ═══════════════════════════════════════════
// ARMOR_PER_ENEMY - броня за кожного ворога поряд (ID: 26)
// ═══════════════════════════════════════════
this.registerHandler('armor_per_enemy', {
    needsTarget: false,  // На себе
    
    execute: (hero, ability, levelData, target, unitsOnMap) => {
        const armorBoostPercent = levelData.armorBoostPercent || 10;
        
        // Рахуємо ворогів поряд (в радіусі 1 клітинки)
        let enemyCount = 0;
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                
                const enemy = unitsOnMap.find(u => 
                    u.x === hero.x + dx && 
                    u.y === hero.y + dy && 
                    u.playerIndex !== hero.playerIndex
                );
                
                if (enemy) enemyCount++;
            }
        }
        
        if (enemyCount === 0) {
            return { success: false, message: 'Немає ворогів поряд!' };
        }
        
        const totalBoostPercent = armorBoostPercent * enemyCount;
        const baseArmor = (hero.armor || 0) + (hero.LevelArmor || 0);
        const bonusArmor = Math.floor(baseArmor * (totalBoostPercent / 100));
        
        // Ініціалізуємо activeEffects
        if (!hero.activeEffects) {
            hero.activeEffects = [];
        }
        
        // Видаляємо старий ефект
        hero.activeEffects = hero.activeEffects.filter(e => e.type !== 'armor_per_enemy');
        
        // Додаємо ефект
        hero.activeEffects.push({
            type: 'armor_per_enemy',
            bonusArmor: bonusArmor,
            appliedByPlayerIndex: hero.playerIndex,
            source: `ability_26_from_${hero.id}`
        });
        
        // Додаємо броню напряму
        hero.armor = (hero.armor || 0) + bonusArmor;
        
        console.log(`🛡️ ${hero.name}: +${bonusArmor} броні (${enemyCount} ворогів × ${armorBoostPercent}%)`);
        
        return {
            success: true,
            message: `+${bonusArmor} броні (${enemyCount} ворогів)`
        };
    }
});

// ═══════════════════════════════════════════
// GROUND_STRIKE - удар по землі (ID: 27)
// ═══════════════════════════════════════════
this.registerHandler('ground_strike', {
    needsTarget: true,
    targetType: 'enemy',
    
    getValidTargets: (hero, ability, levelData, unitsOnMap) => {
        const maxRange = 1; // Тільки сусідні клітинки
        const targets = [];
        
        for (let dx = -maxRange; dx <= maxRange; dx++) {
            for (let dy = -maxRange; dy <= maxRange; dy++) {
                if (dx === 0 && dy === 0) continue;
                if (Math.abs(dx) + Math.abs(dy) > 1) continue; // Тільки ортогональні
                
                const x = hero.x + dx;
                const y = hero.y + dy;
                
                if (x >= 0 && y >= 0 && x < 30 && y < 30) {
                    const enemy = unitsOnMap.find(u => 
                        u.x === x && u.y === y && u.playerIndex !== hero.playerIndex
                    );
                    
                    if (enemy) {
                        targets.push({ unit: enemy, x, y });
                    }
                }
            }
        }
        
        return targets;
    },
    
    execute: (hero, ability, levelData, target, unitsOnMap) => {
        if (!target.unit) {
            return { success: false, message: 'Тут немає ворога!' };
        }
        
        const enemy = target.unit;
        const stepMinus = levelData.stepMinus || 1;
        const attackMinus = levelData.attackMinus || 5;
        const armorMinusPercent = levelData.armorMinusPercent || 10;
        const stepMinusNeighbors = levelData.stepMinusNeighbors || 0;
        const armorMinusNeighborsPercent = levelData.armorMinusNeighborsPercent || 0;
        
        // Визначаємо напрямок атаки
        const dx = enemy.x - hero.x;
        const dy = enemy.y - hero.y;
        
        // Перпендикулярні напрямки для сусідів
        let neighborOffsets = [];
        if (dx !== 0) { // Горизонтальна атака → сусіди зверху/знизу
            neighborOffsets = [{ dx: 0, dy: -1 }, { dx: 0, dy: 1 }];
        } else { // Вертикальна атака → сусіди зліва/справа
            neighborOffsets = [{ dx: -1, dy: 0 }, { dx: 1, dy: 0 }];
        }
        
        // === ДЕБАФ ОСНОВНОЇ ЦІЛІ ===
        const mainArmorReduction = Math.floor((enemy.armor || 0) * (armorMinusPercent / 100));
        
        if (!enemy.activeEffects) enemy.activeEffects = [];
        enemy.activeEffects = enemy.activeEffects.filter(e => e.type !== 'ground_strike');
        
        enemy.activeEffects.push({
            type: 'ground_strike',
            stepMinus: stepMinus,
            attackMinus: attackMinus,
            armorMinus: mainArmorReduction,
            appliedByPlayerIndex: hero.playerIndex,
            source: `ability_27_from_${hero.id}`
        });
        
        enemy.step = Math.max(0, (enemy.step || 0) - stepMinus);
        enemy.attack = Math.max(0, (enemy.attack || 0) - attackMinus);
        enemy.armor = Math.max(0, (enemy.armor || 0) - mainArmorReduction);
        
        console.log(`💥 ${hero.name} вдарив по землі! ${enemy.name}: -${stepMinus} крок, -${attackMinus} атака, -${mainArmorReduction} броня`);
        
        // === ДЕБАФ СУСІДІВ ===
        let neighborsHit = 0;
        if (stepMinusNeighbors > 0 || armorMinusNeighborsPercent > 0) {
            neighborOffsets.forEach(offset => {
                const nx = enemy.x + offset.dx;
                const ny = enemy.y + offset.dy;
                
                const neighbor = unitsOnMap.find(u => 
                    u.x === nx && u.y === ny && u.playerIndex !== hero.playerIndex
                );
                
                if (neighbor) {
                    const neighborArmorReduction = Math.floor((neighbor.armor || 0) * (armorMinusNeighborsPercent / 100));
                    
                    if (!neighbor.activeEffects) neighbor.activeEffects = [];
                    neighbor.activeEffects = neighbor.activeEffects.filter(e => e.type !== 'ground_strike_neighbor');
                    
                    neighbor.activeEffects.push({
                        type: 'ground_strike_neighbor',
                        stepMinus: stepMinusNeighbors,
                        armorMinus: neighborArmorReduction,
                        appliedByPlayerIndex: hero.playerIndex,
                        source: `ability_27_neighbor_from_${hero.id}`
                    });
                    
                    neighbor.step = Math.max(0, (neighbor.step || 0) - stepMinusNeighbors);
                    neighbor.armor = Math.max(0, (neighbor.armor || 0) - neighborArmorReduction);
                    
                    console.log(`   💫 Сусід ${neighbor.name}: -${stepMinusNeighbors} крок, -${neighborArmorReduction} броня`);
                    neighborsHit++;
                }
            });
        }
        
        return {
            success: true,
            message: `${enemy.name} оглушений!${neighborsHit > 0 ? ` (+${neighborsHit} сусідів)` : ''}`
        };
    }
});

                // ═══════════════════════════════════════════
        // DELAYED_STRIKE - підготовлений удар (ID: 19)
        // ═══════════════════════════════════════════
        this.registerHandler('delayed_strike', {
            needsTarget: true,
            targetType: 'empty_cell',
            
            getValidTargets: (hero, ability, levelData, unitsOnMap) => {
                const maxRange = levelData.cellMoveCount || 5;
                const targets = [];
                
                for (let dx = -maxRange; dx <= maxRange; dx++) {
                    for (let dy = -maxRange; dy <= maxRange; dy++) {
                        if (dx === 0 && dy === 0) continue;
                        
                        const distance = Math.abs(dx) + Math.abs(dy);
                        if (distance <= maxRange) {
                            const x = hero.x + dx;
                            const y = hero.y + dy;
                            
                            if (x >= 0 && y >= 0 && x < 30 && y < 30) {
                                // Можна ставити на будь-яку клітинку (і з ворогом, і порожню)
                                targets.push({ x, y });
                            }
                        }
                    }
                }
                
                return targets;
            },
            
            execute: (hero, ability, levelData, target, unitsOnMap) => {
                // Ініціалізуємо масив відкладених ударів
                if (!window.delayedStrikes) window.delayedStrikes = [];
                
                const strike = {
                    id: `strike_${hero.id}_${Date.now()}`,
                    heroId: hero.id,
                    heroName: hero.name,
                    playerIndex: hero.playerIndex,
                    target: { x: target.x, y: target.y },
                    damage: Math.floor(hero.attack * (levelData.damagePercent / 100))
                };
                
                window.delayedStrikes.push(strike);
                
                // Візуалізуємо маркер на карті
                const cell = document.querySelector(`.cell[data-x='${target.x}'][data-y='${target.y}']`);
                if (cell) {
                    cell.classList.add('delayed-strike-marker');
                    cell.dataset.strikeId = strike.id;
                }
                
                console.log(`🎯 ${hero.name}: Підготовлений удар на (${target.x}, ${target.y}), урон: ${strike.damage}`);
                
                return {
                    success: true,
                    message: `Ціль обрано: (${target.x}, ${target.y})`,
                    strike: strike
                };
            }
        });

        this.registerHandler('portal', {
            needsTarget: true,
            targetType: 'empty_cell',
            
            getValidTargets: (hero, ability, levelData, unitsOnMap) => {
                const maxRange = levelData.distance || 6;
                const minRange = 2;
                const targets = [];
                
                const directions = [
                    { dx: 1, dy: 0 },
                    { dx: -1, dy: 0 },
                    { dx: 0, dy: 1 },
                    { dx: 0, dy: -1 }
                ];
                
                directions.forEach(dir => {
                    for (let dist = minRange; dist <= maxRange; dist++) {
                        const x = hero.x + dir.dx * dist;
                        const y = hero.y + dir.dy * dist;
                        
                        if (x < 0 || y < 0 || x >= 30 || y >= 30) continue;
                        
                        // 🆕 ДОДАНО: Перевіряємо чи клітинка не вода
                        const tileType = mapData?.[y]?.[x];
                        const isWalkable = tileType !== 3 && tileType !== undefined; // 3 = вода
                        
                        if (!isWalkable) continue;
                        
                        const occupied = unitsOnMap.find(u => u.x === x && u.y === y);
                        if (!occupied) {
                            targets.push({ 
                                x, y,
                                direction: dir
                            });
                        }
                    }
                });
                
                return targets;
            },
            
            execute: (hero, ability, levelData, target, unitsOnMap) => {
                const dx = target.x - hero.x;
                const dy = target.y - hero.y;
                const stepX = dx === 0 ? 0 : (dx > 0 ? 1 : -1);
                const stepY = dy === 0 ? 0 : (dy > 0 ? 1 : -1);
                
                const entryX = hero.x + stepX;
                const entryY = hero.y + stepY;
                
                // 🆕 ДОДАНО: Перевіряємо чи вхід не на воді
                const entryTileType = mapData?.[entryY]?.[entryX];
                if (entryTileType === 3) {
                    return { success: false, message: 'Не можна ставити вхід порталу на воду!' };
                }
                
                if (!window.activePortals) window.activePortals = [];
                
                const portal = {
                    id: `portal_${hero.id}_${Date.now()}`,
                    ownerId: hero.id,
                    playerIndex: hero.playerIndex,
                    entry: { x: entryX, y: entryY },
                    exit: { x: target.x, y: target.y },
                    duration: 1,  // 🆕 ЗМІНЕНО: Тепер тільки на 1 хід (цей хід)
                    usedBy: []
                };
                
                window.activePortals.push(portal);
                
                
                
                const entryCell = document.querySelector(`.cell[data-x='${entryX}'][data-y='${entryY}']`);
                const exitCell = document.querySelector(`.cell[data-x='${target.x}'][data-y='${target.y}']`);
                
                if (entryCell) {
                    entryCell.classList.add('portal-entry');
                    entryCell.dataset.portalId = portal.id;
                }
                if (exitCell) {
                    exitCell.classList.add('portal-exit');
                    exitCell.dataset.portalId = portal.id;
                }

                console.log(`🌀 Портал створено:`);
                console.log(`   Вхід: (${entryX}, ${entryY})`);
                console.log(`   Вихід: (${target.x}, ${target.y})`);
                console.log(`   Тривалість: 2 ходи`);
                
                // TODO: Візуалізувати портал на карті
                
                return {
                    success: true,
                    message: `Портал: (${entryX},${entryY}) → (${target.x},${target.y})`,
                    portal: portal
                };
            }
        });
    }

    

    // ═══════════════════════════════════════════
    // ОСНОВНІ МЕТОДИ
    // ═══════════════════════════════════════════

    /**
     * Визначає тип дії для здібності за її ID
     */
    getActionType(abilityId) {
        const actionTypes = {
            11: 'self_buff',
            12: 'projectile',
            13: 'health_swap',
            14: 'thorns',
            15: 'teleport',
            16: 'teleport_debuff',
            17: 'swap',
            18: 'aoe_ally_buff',
            19: 'delayed_strike',
            20: 'portal',
            21: 'aoe_damage',
            22: 'thorns_ally',
            23: 'armor_self',
            24: 'buff_ally',
            25: 'curse_enemy',
            26: 'armor_per_enemy',
            27: 'ground_strike',
            // Додавай нові здібності тут!
        };
        
        return actionTypes[abilityId] || null;
    }

    /**
     * Отримує дані здібності та поточного рівня
     */
    getAbilityData(hero, abilityId) {
        if (!hero.abilitiesProgress) return null;
        
        const progress = hero.abilitiesProgress.find(p => p.abilityId === abilityId);
        if (!progress) return null;
        
        const ability = window.heroesAbilities?.[abilityId];
        if (!ability || ability.type !== 'active') return null;
        
        const levelData = ability.levels?.find(l => l.level === progress.currentLevel);
        
        return { ability, levelData, currentLevel: progress.currentLevel };
    }

    /**
     * Перевіряє cooldown здібності
     */
    isOnCooldown(hero, abilityId) {
        const key = `${hero.id}_${abilityId}`;
        const cooldown = this.currentCooldowns.get(key) || 0;
        return cooldown > 0;
    }

    /**
     * Отримує поточний cooldown
     */
    getCooldown(hero, abilityId) {
        const key = `${hero.id}_${abilityId}`;
        return this.currentCooldowns.get(key) || 0;
    }

    /**
     * Встановлює cooldown
     */
    setCooldown(hero, abilityId, cooldown) {
        const key = `${hero.id}_${abilityId}`;
        this.currentCooldowns.set(key, cooldown);
    }

    /**
     * Зменшує cooldown на 1 (викликати кожен хід)
     */
    reduceCooldowns(hero) {
        if (!hero.abilitiesProgress) return;
        
        hero.abilitiesProgress.forEach(progress => {
            const key = `${hero.id}_${progress.abilityId}`;
            const current = this.currentCooldowns.get(key) || 0;
            if (current > 0) {
                this.currentCooldowns.set(key, current - 1);
            }
        });
    }

    /**
     * Активує здібність
     */
    activateAbility(hero, abilityId, unitsOnMap) {
        // Перевіряємо cooldown
        if (this.isOnCooldown(hero, abilityId)) {
            const remaining = this.getCooldown(hero, abilityId);
            return { success: false, message: `Перезарядка: ${remaining} ходів` };
        }
        
        // Отримуємо дані
        const data = this.getAbilityData(hero, abilityId);
        if (!data) {
            return { success: false, message: 'Здібність не знайдена' };
        }
        
        const actionType = this.getActionType(abilityId);
        const handler = this.handlers[actionType];
        
        if (!handler) {
            return { success: false, message: `Невідомий тип здібності: ${actionType}` };
        }
        
        // Якщо потрібна ціль - запускаємо режим вибору
        if (handler.needsTarget) {
            const targets = handler.getValidTargets(hero, data.ability, data.levelData, unitsOnMap);
            
            if (targets.length === 0) {
                return { success: false, message: 'Немає доступних цілей' };
            }
            
            // Зберігаємо стан для вибору цілі
            this.isSelectingTarget = true;
            this.activeAbility = { ...data, abilityId, actionType, handler };
            this.caster = hero;
            
            return {
                success: true,
                needsTarget: true,
                targetType: handler.targetType,
                targets: targets,
                message: 'Оберіть ціль'
            };
        }
        
        // Виконуємо одразу (self_buff)
        const result = handler.execute(hero, data.ability, data.levelData, null, unitsOnMap);
        
        if (result.success) {
            // Встановлюємо cooldown
            this.setCooldown(hero, abilityId, data.levelData.cooldown || 5);
        }
        
        return result;
    }

    /**
     * Виконує здібність на обрану ціль
     */
    executeOnTarget(target, unitsOnMap) {
        if (!this.isSelectingTarget || !this.activeAbility || !this.caster) {
            return { success: false, message: 'Немає активної здібності' };
        }
        
        const { ability, levelData, abilityId, handler } = this.activeAbility;
        const hero = this.caster;
        
        // Виконуємо
        const result = handler.execute(hero, ability, levelData, target, unitsOnMap);
        
        if (result.success) {
            // Встановлюємо cooldown
            this.setCooldown(hero, abilityId, levelData.cooldown || 5);
        }
        
        // Скидаємо стан
        this.clearSelection();
        
        return result;
    }

    /**
     * Скидає стан вибору цілі
     */
    clearSelection() {
        this.isSelectingTarget = false;
        this.activeAbility = null;
        this.caster = null;
    }

    /**
     * Отримує всі активні здібності героя
     */
    getHeroActiveAbilities(hero) {
        if (!hero.abilitiesProgress) return [];
        
        const activeAbilities = [];
        
        hero.abilitiesProgress.forEach(progress => {
            const ability = window.heroesAbilities?.[progress.abilityId];
            if (ability && ability.type === 'active') {
                const levelData = ability.levels?.find(l => l.level === progress.currentLevel);
                const cooldown = this.getCooldown(hero, progress.abilityId);
                
                activeAbilities.push({
                    ...ability,
                    abilityId: progress.abilityId,
                    currentLevel: progress.currentLevel,
                    levelData: levelData,
                    cooldown: cooldown,
                    isReady: cooldown === 0,
                    actionType: this.getActionType(progress.abilityId)
                });
            }
        });
        
        return activeAbilities;
    }
}

// Створюємо глобальний екземпляр
window.heroActiveAbilitySystem = new HeroActiveAbilitySystem();

//console.log('✅ HeroActiveAbilitySystem завантажено');


// ═══════════════════════════════════════════
// ПРИКЛАД ДОДАВАННЯ НОВОЇ ЗДІБНОСТІ:
// ═══════════════════════════════════════════
// 
// 1. Додай дані в heroesAbilities2.js (ID: 18, 19, ...)
// 
// 2. Зареєструй обробник:
// 
// window.heroActiveAbilitySystem.registerHandler('new_action_type', {
//     needsTarget: true/false,
//     targetType: 'enemy' / 'ally' / 'empty_cell' / 'any_unit',
//     
//     getValidTargets: (hero, ability, levelData, unitsOnMap) => {
//         // Повернути масив цілей
//         return [];
//     },
//     
//     execute: (hero, ability, levelData, target, unitsOnMap) => {
//         // Логіка виконання
//         return { success: true, message: 'Готово' };
//     }
// });
// 
// 3. Додай маппінг в getActionType():
//    18: 'new_action_type',
// ═══════════════════════════════════════════