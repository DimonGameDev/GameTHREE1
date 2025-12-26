// ============================================
// СИСТЕМА АУР ГЕРОЇВ
// ============================================

class HeroAuraSystem {
    constructor() {
        this.attackStacks = new Map(); // Для серії пострілів: Map<heroId_targetId, count>
        this.secondBreathUsed = new Map(); // Для друге дихання: Map<heroId, boolean>
        this.bashDebuffs = new Map();
        this.lowHealthBonuses = new Map(); // 🆕 Для бонусів при низькому HP
    }

    // ═══════════════════════════════════════════
    // ГОЛОВНИЙ МЕТОД - ОТРИМАТИ ДАНІ ЗДІБНОСТІ
    // ═══════════════════════════════════════════
    
    /**
     * Отримує дані здібності героя за ID
     * @param {object} hero - об'єкт героя
     * @param {number} abilityId - ID здібності
     * @returns {object|null} - дані здібності з поточним рівнем
     */
    getHeroAbilityData(hero, abilityId) {
        if (!hero.abilitiesProgress) return null;
        
        // Знаходимо прогрес здібності
        const progress = hero.abilitiesProgress.find(p => p.abilityId === abilityId);
        if (!progress) return null;
        
        // Отримуємо базову здібність
        const ability = window.heroesAbilities?.[abilityId];
        if (!ability) return null;
        
        // Знаходимо дані поточного рівня
        const levelData = ability.levels.find(l => l.level === progress.currentLevel);
        
        return {
            ...ability,
            currentLevel: progress.currentLevel,
            levelData: levelData
        };
    }

    /**
     * Перевіряє чи герой має певну здібність
     */
    heroHasAbility(hero, abilityId) {
        if (!hero.abilitiesProgress) return false;
        return hero.abilitiesProgress.some(p => p.abilityId === abilityId);
    }

    // ═══════════════════════════════════════════
    // ЗДІБНОСТІ ПРИ АТАЦІ (викликати в executeAttack)
    // ═══════════════════════════════════════════

    /**
     * ID:1 - Збільшений кріт
     * Повертає модифікатори криту
     */
    getCritModifiers(hero) {
        const ability = this.getHeroAbilityData(hero, 1);
        if (!ability || !ability.levelData) {
            return { critChanceBonus: 0, critDamageMin: 1, critDamageMax: 1 };
        }
        
        const { critChancePercent, critDamageMin, critDamageMax } = ability.levelData;
        return {
            critChanceBonus: critChancePercent || 0,
            critDamageMin: critDamageMin || 1,
            critDamageMax: critDamageMax || 1
        };
    }

    /**
     * Розраховує критичний урон
     */
    calculateCriticalDamage(hero, baseDamage) {
        const critMods = this.getCritModifiers(hero);
        const totalCritChance = (hero.critChance || 0) + critMods.critChanceBonus;
        
        // Перевіряємо чи спрацював кріт
        const roll = Math.random() * 100;
        if (roll < totalCritChance) {
            // Випадковий множник між min та max
            const critMultiplier = critMods.critDamageMin + 
                Math.random() * (critMods.critDamageMax - critMods.critDamageMin);
            const critDamage = Math.floor(baseDamage * critMultiplier);
            
            console.log(`💥 КРІТ! ${hero.name}: ${baseDamage} → ${critDamage} (x${critMultiplier.toFixed(2)})`);
            return { damage: critDamage, isCritical: true, multiplier: critMultiplier };
        }
        
        return { damage: baseDamage, isCritical: false, multiplier: 1 };
    }

    /**
     * ID:2 - Вампірізм
     * Повертає HP для лікування після урону
     */
    calculateLifesteal(hero, damageDealt) {
        const ability = this.getHeroAbilityData(hero, 2);
        if (!ability || !ability.levelData) return 0;
        
        const { hpPercent } = ability.levelData;
        const healAmount = Math.floor(damageDealt * (hpPercent / 100));
        
        if (healAmount > 0) {
            console.log(`🧛 Вампірізм: ${hero.name} відновив ${healAmount} HP`);
        }
        
        return healAmount;
    }

    /**
     * ID:3 - Серія пострілів
     * Рахує стаки атак на одну ціль
     */
    calculateSeriesBonus(hero, target) {
        const ability = this.getHeroAbilityData(hero, 3);
        if (!ability || !ability.levelData) return { bonusPercent: 0, currentStack: 0 };
        
        const key = `${hero.id}_${target.id}`;
        let currentStack = (this.attackStacks.get(key) || 0) + 1;
        this.attackStacks.set(key, currentStack);
        
        const { stackRequired, damagePercent } = ability.levelData;
        
        if (currentStack >= stackRequired) {
            console.log(`🎯 Серія пострілів: ${hero.name} → ${target.name}, стак ${currentStack}, +${damagePercent}% урону`);
            return { bonusPercent: damagePercent, currentStack: currentStack };
        }
        
        return { bonusPercent: 0, currentStack: currentStack };
    }

    /**
     * ID:7 - Баш (оглушення)
     * Перевіряє чи спрацював баш
     */
    tryBash(hero, target) {
        const ability = this.getHeroAbilityData(hero, 7);
        if (!ability || !ability.levelData) return null;
        
        const { stunChancePercent, stepMinus, armorMinus } = ability.levelData;
        
        const roll = Math.random() * 100;
        if (roll < stunChancePercent) {
            console.log(`💫 БАШ! ${hero.name} оглушив ${target.name}`);
            return {
                stunned: true,
                stepReduction: stepMinus || 0,
                armorReduction: armorMinus || 0
            };
        }
        
        return null;

        
    }
    /**
     * Відновлює характеристики після закінчення баш-дебафу
     * Викликати на початку ходу гравця
     */
    clearExpiredBashDebuffs(unitsOnMap, playerIndex) {
        this.bashDebuffs.forEach((debuff, unitId) => {
            // 🆕 Підтримуємо обидва варіанти: appliedByPlayerIndex (новий) або originalPlayerIndex (старий)
            const triggerPlayerIndex = debuff.appliedByPlayerIndex !== undefined 
                ? debuff.appliedByPlayerIndex 
                : debuff.originalPlayerIndex;
            
            if (triggerPlayerIndex === playerIndex) {
                debuff.turnsLeft--;
                
                if (debuff.turnsLeft <= 0) {
                    const unit = unitsOnMap.find(u => u.id === unitId);
                    if (unit) {
                        unit.step = (unit.step || 0) + debuff.stepLost;
                        unit.armor = (unit.armor || 0) + debuff.armorLost;
                        console.log(`✅ ${unit.name}: відновлено +${debuff.stepLost} кроків, +${debuff.armorLost} броні`);
                    }
                    this.bashDebuffs.delete(unitId);
                }
            }
        });
    }

    /**
     * Застосовує або знімає бонуси "Мале здоров'я" залежно від поточного HP
     * Викликати на початку ходу гравця
     */
    applyLowHealthBonuses(unitsOnMap, playerIndex) {
        unitsOnMap.forEach(unit => {
            // Тільки для героїв поточного гравця
            if (!unit.isHero || unit.playerIndex !== playerIndex) return;
            
            // Перевіряємо чи герой має здібність ID:4
            const ability = this.getHeroAbilityData(unit, 4);
            if (!ability || !ability.levelData) return;
            
            const currentHp = unit.newhp ?? unit.hp;
            const maxHp = unit.maxHp || unit.hp;
            const hpPercent = (currentHp / maxHp) * 100;
            const { hpPercent: threshold, stepPlus, armorBoost } = ability.levelData;
            
            const existingBonus = this.lowHealthBonuses.get(unit.id);
            
            if (hpPercent < threshold) {
                // HP нижче порогу - застосовуємо бонуси (якщо ще не застосовані)
                if (!existingBonus) {
                    const stepBonus = stepPlus || 0;
                    const armorBonus = armorBoost || 0;
                    
                    unit.step = (unit.step || 0) + stepBonus;
                    unit.armor = (unit.armor || 0) + armorBonus;
                    
                    this.lowHealthBonuses.set(unit.id, {
                        stepBonus: stepBonus,
                        armorBonus: armorBonus
                    });
                    
                    console.log(`🩸 Мале здоров'я активовано: ${unit.name} +${stepBonus} step, +${armorBonus} armor (HP: ${hpPercent.toFixed(0)}%)`);
                }
            } else {
                // HP вище порогу - знімаємо бонуси (якщо були застосовані)
                if (existingBonus) {
                    unit.step = Math.max(0, (unit.step || 0) - existingBonus.stepBonus);
                    unit.armor = Math.max(0, (unit.armor || 0) - existingBonus.armorBonus);
                    
                    this.lowHealthBonuses.delete(unit.id);
                    
                    console.log(`💚 Мале здоров'я деактивовано: ${unit.name} (HP: ${hpPercent.toFixed(0)}%)`);
                }
            }
        });
    }

    /**
 * Перевіряє бонуси "Мале здоров'я" для одного юніта
 * Викликати після отримання урону
 */
checkLowHealthBonusForUnit(unit) {
    if (!unit.isHero) return;
    
    const ability = this.getHeroAbilityData(unit, 4);
    if (!ability || !ability.levelData) return;
    
    const currentHp = unit.newhp ?? unit.hp;
    const maxHp = unit.maxHp || unit.hp;
    const hpPercent = (currentHp / maxHp) * 100;
    const { hpPercent: threshold, stepPlus, armorBoost } = ability.levelData;
    
    const existingBonus = this.lowHealthBonuses.get(unit.id);
    
    if (hpPercent < threshold && !existingBonus) {
        // HP впало нижче порогу - застосовуємо бонуси
        const stepBonus = stepPlus || 0;
        const armorBonus = armorBoost || 0;
        
        unit.step = (unit.step || 0) + stepBonus;
        unit.armor = (unit.armor || 0) + armorBonus;
        
        this.lowHealthBonuses.set(unit.id, {
            stepBonus: stepBonus,
            armorBonus: armorBonus
        });
        
        console.log(`🩸 Мале здоров'я активовано: ${unit.name} +${stepBonus} step, +${armorBonus} armor (HP: ${hpPercent.toFixed(0)}%)`);
    } else if (hpPercent >= threshold && existingBonus) {
        // HP піднялось вище порогу - знімаємо бонуси
        unit.step = Math.max(0, (unit.step || 0) - existingBonus.stepBonus);
        unit.armor = Math.max(0, (unit.armor || 0) - existingBonus.armorBonus);
        
        this.lowHealthBonuses.delete(unit.id);
        
        console.log(`💚 Мале здоров'я деактивовано: ${unit.name} (HP: ${hpPercent.toFixed(0)}%)`);
    }
}
    // ═══════════════════════════════════════════
    // ЗДІБНОСТІ ПРИ НИЗЬКОМУ HP (перевіряти кожен хід)
    // ═══════════════════════════════════════════

    /**
     * ID:4 - Мале здоров'я
     * Повертає бонуси якщо HP низьке
     */
    getLowHealthBonuses_4(hero) {
        const ability = this.getHeroAbilityData(hero, 4);
        if (!ability || !ability.levelData) return null;
        
        const currentHp = hero.newhp ?? hero.hp;
        const maxHp = hero.maxHp || hero.hp;
        const hpPercent = (currentHp / maxHp) * 100;
        
        const { hpPercent: threshold, stepPlus, armorBoost, armorPlus } = ability.levelData;
        
        if (hpPercent < threshold) {
            console.log(`🩸 Мале здоров'я активне: ${hero.name} (HP: ${hpPercent.toFixed(0)}%)`);
            return {
                stepBonus: stepPlus || 0,
                armorBonus: armorBoost || armorPlus || 0
            };
        }
        
        return null;
    }

    /**
     * ID:5 - Берсерк
     * Бонуси при HP < 50%
     */
    getBerserkBonuses(hero) {
        const ability = this.getHeroAbilityData(hero, 5);
        if (!ability || !ability.levelData) return null;
        
        const currentHp = hero.newhp ?? hero.hp;
        const maxHp = hero.maxHp || hero.hp;
        const hpPercent = (currentHp / maxHp) * 100;
        
        if (hpPercent < 50) {
            const { attackPercent, armorPlus } = ability.levelData;
            console.log(`😤 Берсерк активний: ${hero.name} +${attackPercent}% атаки, +${armorPlus} броні`);
            return {
                attackPercent: attackPercent || 0,
                armorBonus: armorPlus || 0
            };
        }
        
        return null;
    }

    /**
     * ID:6 - Контроль здоров'я
     */
    getHealthControlBonuses(hero) {
        const ability = this.getHeroAbilityData(hero, 6);
        if (!ability || !ability.levelData) return null;
        
        const currentHp = hero.newhp ?? hero.hp;
        const maxHp = hero.maxHp || hero.hp;
        const hpPercent = (currentHp / maxHp) * 100;
        
        const { healthPercent: threshold, armorBoost, step } = ability.levelData;
        
        if (hpPercent < threshold) {
            console.log(`🛡️ Контроль здоров'я активний: ${hero.name}`);
            return {
                armorBonus: armorBoost || 0,
                stepBonus: step || 0
            };
        }
        
        return null;
    }

    // ═══════════════════════════════════════════
    // АУРИ (застосовувати на початку ходу)
    // ═══════════════════════════════════════════

    /**
     * ID:8 - Аура бонусів (для союзників поряд)
     */
    applyAllyAura(hero, unitsOnMap) {
        const ability = this.getHeroAbilityData(hero, 8);
        if (!ability || !ability.levelData) return [];
        
        const { damageBoost, armorBoost } = ability.levelData;
        const affected = [];
        
        // Знаходимо союзників в радіусі 1
        const neighbors = this.findUnitsInRadius(hero, unitsOnMap, 1);
        
        neighbors.forEach(unit => {
            if (unit.playerIndex === hero.playerIndex && unit.id !== hero.id) {
                // Додаємо тимчасовий бонус
                if (!unit.auraBonuses) unit.auraBonuses = {};
                unit.auraBonuses.attack = (unit.auraBonuses.attack || 0) + damageBoost;
                unit.auraBonuses.armor = (unit.auraBonuses.armor || 0) + armorBoost;
                
                affected.push(unit);
                console.log(`✨ Аура бонусів: ${unit.name} отримав +${damageBoost} атаки, +${armorBoost} броні від ${hero.name}`);
            }
        });
        
        return affected;
    }

    /**
     * ID:9 - Додаткова броня (від ворогів поряд)
     */
    calculateEnemyProximityArmor(hero, unitsOnMap) {
        const ability = this.getHeroAbilityData(hero, 9);
        if (!ability || !ability.levelData) return 0;
        
        const { armorPlusPercent } = ability.levelData;
        
        // Рахуємо ворогів в радіусі 1
        const neighbors = this.findUnitsInRadius(hero, unitsOnMap, 1);
        const enemyCount = neighbors.filter(u => u.playerIndex !== hero.playerIndex).length;
        
        if (enemyCount > 0) {
            const baseArmor = hero.armor || 0;
            const bonusArmor = Math.floor(baseArmor * (armorPlusPercent / 100) * enemyCount);
            console.log(`🛡️ Додаткова броня: ${hero.name} +${bonusArmor} броні (${enemyCount} ворогів)`);
            return bonusArmor;
        }
        
        return 0;
    }

    // ═══════════════════════════════════════════
    // ID:10 - ДРУГЕ ДИХАННЯ (при смерті)
    // ═══════════════════════════════════════════

    /**
     * Перевіряє та застосовує друге дихання
     * Повертає true якщо герой вижив
     */
    trySecondBreath(hero) {
        const ability = this.getHeroAbilityData(hero, 10);
        if (!ability || !ability.levelData) return false;
        
        // Перевіряємо чи вже використано
        if (this.secondBreathUsed.get(hero.id)) {
            console.log(`❌ Друге дихання вже використано для ${hero.name}`);
            return false;
        }
        
        const { healthBoost } = ability.levelData;
        const maxHp = hero.maxHp || hero.hp;
        const healAmount = Math.floor(maxHp * (healthBoost / 100));
        
        hero.newhp = healAmount;
        this.secondBreathUsed.set(hero.id, true);
        
        console.log(`💀➡️💚 Друге дихання! ${hero.name} відновив ${healAmount} HP`);
        return true;
    }

    /**
     * Перевіряє чи можна скинути "друге дихання"
     * (коли HP досягає порогу healthPercent)
     */
    checkSecondBreathReset(hero) {
        const ability = this.getHeroAbilityData(hero, 10);
        if (!ability || !ability.levelData) return;
        
        if (!this.secondBreathUsed.get(hero.id)) return; // Ще не використано
        
        const { healthPercent } = ability.levelData;
        const currentHp = hero.newhp ?? hero.hp;
        const maxHp = hero.maxHp || hero.hp;
        const currentPercent = (currentHp / maxHp) * 100;
        
        if (currentPercent >= healthPercent) {
            this.secondBreathUsed.set(hero.id, false);
            console.log(`🔄 Друге дихання відновлено для ${hero.name} (HP: ${currentPercent.toFixed(0)}%)`);
        }
    }

    // ═══════════════════════════════════════════
    // ДОПОМІЖНІ МЕТОДИ
    // ═══════════════════════════════════════════

    findUnitsInRadius(centerUnit, unitsOnMap, radius) {
        const result = [];
        
        for (let dx = -radius; dx <= radius; dx++) {
            for (let dy = -radius; dy <= radius; dy++) {
                if (dx === 0 && dy === 0) continue;
                
                const targetX = centerUnit.x + dx;
                const targetY = centerUnit.y + dy;
                
                const unit = unitsOnMap.find(u => u.x === targetX && u.y === targetY);
                if (unit) result.push(unit);
            }
        }
        
        return result;
    }

    /**
     * Скидає стаки серії пострілів на початку нового ходу
     */
    resetAttackStacks() {
        this.attackStacks.clear();
        console.log('🔄 Стаки серії пострілів скинуто');
    }

    /**
     * Застосовує всі пасивні бонуси героя
     * Викликати на початку ходу героя
     */
    applyAllPassiveBonuses(hero, unitsOnMap) {
        const bonuses = {
            attack: 0,
            armor: 0,
            step: 0
        };
        
        // ID:4 - Мале здоров'я
        const lowHp = this.getLowHealthBonuses_4(hero);
        if (lowHp) {
            bonuses.step += lowHp.stepBonus;
            bonuses.armor += lowHp.armorBonus;
        }
        
        // ID:5 - Берсерк
        const berserk = this.getBerserkBonuses(hero);
        if (berserk) {
            bonuses.attack += Math.floor((hero.attack || 0) * (berserk.attackPercent / 100));
            bonuses.armor += berserk.armorBonus;
        }
        
        // ID:6 - Контроль здоров'я
        const healthCtrl = this.getHealthControlBonuses(hero);
        if (healthCtrl) {
            bonuses.armor += healthCtrl.armorBonus;
            bonuses.step += healthCtrl.stepBonus;
        }
        
        // ID:9 - Додаткова броня від ворогів
        bonuses.armor += this.calculateEnemyProximityArmor(hero, unitsOnMap);
        
        // Перевіряємо скидання другого дихання
        this.checkSecondBreathReset(hero);
        
        return bonuses;
    }
}

// Створюємо глобальний екземпляр
window.heroAuraSystem = new HeroAuraSystem();

//console.log('✅ HeroAuraSystem завантажено');