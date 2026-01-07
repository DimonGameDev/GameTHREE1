// ============================================
// СИСТЕМА АТАКИ З ПІДТРИМКОЮ АЛЬЯНСІВ
// ============================================
// console.log('attackSystem.js dddd');
let isInAttackMode = false;
let selectedAttacker = null;
let availableTargets = [];

/**
 * Перевіряє чи є два гравці союзниками
 */
function areAllies(playerIndex1, playerIndex2) {
    // Якщо це той самий гравець - повертаємо true (не може атакувати сам себе)
    if (playerIndex1 === playerIndex2) {
        return true;
    }
    
    // Перевіряємо чи існують гравці
    if (!players[playerIndex1] || !players[playerIndex2]) {
        return false;
    }
    
    // Порівнюємо номери кланів
    const clan1 = players[playerIndex1].clan;
    const clan2 = players[playerIndex2].clan;
    
    // Якщо клани однакові - це союзники
    return clan1 === clan2;
}

/**
 * Обчислює відстань між двома точками (Manhattan distance)
 */
function getDistance(x1, y1, x2, y2) {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}


/**
 * Підсвічує клітинки доступні для атаки
 */
function highlightAttackCells(unit) {
    console.log(`🎯 Режим атаки для ${unit.name || unit.type}`);
    //console.log('📊 Дані юніта:', { x: unit.x, y: unit.y, range: unit.range, playerIndex: unit.playerIndex });
    
    // Очищаємо попередні підсвічення
    clearAttackHighlights();
    
    availableTargets = [];
    
    let maxRange = unit.range;
    let startX = unit.x;
    let startY = unit.y;
    
    // ✅ ПЕРЕВІРЯЄМО ЧИ Є mapData
    if (!mapData) {
        //console.error('❌ mapData не знайдено!');
        alert('Помилка: дані карти не завантажені!');
        return;
    }
    
    console.log('✅ mapData знайдено, розмір:', mapData.length, 'x', mapData[0]?.length);
    
    // Таблиця вартості руху (для розрахунку відстані)
    const moveCost = {
        0: 1,        // Трава
        1: 1,        // Замок
        2: 1,
        3: 1,        // Будинок золота
        // 3: Infinity, // Вода — непрохідна (не можна стріляти через воду)
        4: 1,        // Будинок броні
        5: 1,        // Будинок лікування
        6: 1         // Дорога
    };
    
    // Масив для зберігання відвіданих клітинок
    let visited = Array.from({ length: mapData.length }, () =>
        Array(mapData[0].length).fill(Infinity)
    );
    
    visited[startY][startX] = 0;
    
    // Черга для обходу карти (BFS алгоритм)
    let queue = [{ x: startX, y: startY, cost: 0 }];
    
    let cellsChecked = 0;
    let cellsHighlighted = 0;
    
    while (queue.length > 0) {
        let { x, y, cost } = queue.shift();
        
        let directions = [
            { dx: 0, dy: -1 },  // вгору
            { dx: 0, dy: 1 },   // вниз
            { dx: -1, dy: 0 },  // вліво
            { dx: 1, dy: 0 }    // вправо
        ];
        
        for (let dir of directions) {
            let nx = x + dir.dx;
            let ny = y + dir.dy;
            
            cellsChecked++;
            
            // Перевірка меж карти
            if (ny < 0 || nx < 0 || ny >= mapData.length || nx >= mapData[0].length) continue;
            
            let tileType = mapData[ny][nx];
            let costToMove = moveCost[tileType];
            
            if (costToMove === Infinity) continue; // непрохідна клітинка
            
            let newCost = cost + costToMove;
            
            // ✅ Підсвічуємо всі клітинки в межах дальності атаки
            if (newCost <= maxRange && newCost < visited[ny][nx]) {
                visited[ny][nx] = newCost;
                queue.push({ x: nx, y: ny, cost: newCost });
                
                // Пропускаємо клітинку де стоїть сам юніт
                if (nx === startX && ny === startY) continue;
                
                let cell = document.querySelector(`.cell[data-x='${nx}'][data-y='${ny}']`);
                if (!cell) {
                    console.warn(`⚠️ Клітинка не знайдена: (${nx}, ${ny})`);
                    continue;
                }
                
                cellsHighlighted++;
                
                // Шукаємо юніта на цій клітинці
                const targetUnit = unitsOnMap.find(u => u.x === nx && u.y === ny);
                
                if (targetUnit) {
                    // ✅ ПЕРЕВІРКА АЛЬЯНСІВ
                    if (!areAllies(unit.playerIndex, targetUnit.playerIndex)) {
                        // Це ворог - червоне підсвічування
                        cell.classList.add('cellAttackRed');
                        availableTargets.push({
                            unit: targetUnit,
                            cell: cell,
                            x: nx,
                            y: ny
                        });
                        console.log(`⚔️ Ворог знайдений: ${targetUnit.name || targetUnit.type} на (${nx}, ${ny})`);
                    } else {
                        // Це союзник - світло-червоне підсвічування
                        cell.classList.add('cellAttackAlly');
                        console.log(`🤝 Союзник: ${targetUnit.name || targetUnit.type} на (${nx}, ${ny})`);
                    }
                } else {
                    // Порожня клітинка в межах дальності - сіро-червоне підсвічування
                    if (!cell.classList.contains('portal-entry') && !cell.classList.contains('portal-exit')) {
                        cell.classList.add('cellAttackRange');
                    }
                }
            }
        }
    }
    
    // console.log(`📊 Статистика:`);
    // console.log(`   - Перевірено клітинок: ${cellsChecked}`);
    // console.log(`   - Підсвічено клітинок: ${cellsHighlighted}`);
    // console.log(`   - Знайдено цілей: ${availableTargets.length}`);
    
    // if (availableTargets.length === 0) {
    //     alert('⚠️ Немає доступних ворогів для атаки!');
    //     exitAttackMode();
    // }
}

/**
 * Очищає підсвічені клітинки атаки
 */
function clearAttackHighlights() {
    document.querySelectorAll('.cellAttackRed').forEach(cell => {
        cell.classList.remove('cellAttackRed');
    });
    document.querySelectorAll('.cellAttackRange').forEach(cell => {
        cell.classList.remove('cellAttackRange');
    });
    document.querySelectorAll('.cellAttackAlly').forEach(cell => {
        cell.classList.remove('cellAttackAlly');
    });
    document.querySelectorAll('.cellTargetSelected').forEach(cell => {
        cell.classList.remove('cellTargetSelected');
    });
}

/**
 * Виходить з режиму атаки
 */
function exitAttackMode() {
    isInAttackMode = false;
    selectedAttacker = null;
    availableTargets = [];
    clearAttackHighlights();
    console.log('❌ Вихід з режиму атаки');
}

/**
 * Виконує атаку на ціль
 */
function executeAttack(attacker, target) {
    console.log(`⚔️ Атака: ${attacker.name || attacker.type} → ${target.unit.name || target.unit.type}`);
    
    // Перевірка: чи юніт вже атакував
    if (attacker.attacked) {
        alert('⚠️ Цей юніт вже атакував цього ходу!');
        return;
    }
    if (attacker.canAttack === false) {
        alert('🔒 Юніт в наручниках! Не може атакувати');
        return;
    }

    // Обчислюємо базовий урон
    let baseDamage = attacker.isHero 
        ? (attacker.attack || 0) + (attacker.LevelAttack || 0)
        : (attacker.attack || 0);
    
    // ═══════════════════════════════════════════
    // 🆕 АУРИ ГЕРОЇВ - МОДИФІКАЦІЯ УРОНУ
    // ═══════════════════════════════════════════
    let isCritical = false;
    
    if (attacker.isHero && window.heroAuraSystem) {
        // ID:1 - Збільшений кріт
        const critResult = window.heroAuraSystem.calculateCriticalDamage(attacker, baseDamage);
        baseDamage = critResult.damage;
        isCritical = critResult.isCritical;
        
        // ID:3 - Серія пострілів (бонус за атаку того ж ворога)
        const seriesBonus = window.heroAuraSystem.calculateSeriesBonus(attacker, target.unit);
        if (seriesBonus.bonusPercent > 0) {
            const seriesDamage = Math.floor(baseDamage * (seriesBonus.bonusPercent / 100));
            baseDamage += seriesDamage;
            console.log(`🎯 +${seriesDamage} від серії пострілів`);
        }
        
        // ID:5 - Берсерк (% атаки при HP < 50%)
        const berserk = window.heroAuraSystem.getBerserkBonuses(attacker);
        if (berserk) {
            const berserkDamage = Math.floor((attacker.attack || 0) * (berserk.attackPercent / 100));
            baseDamage += berserkDamage;
            console.log(`😤 +${berserkDamage} від Берсерка`);
        }
    }

    // // 🆕 БОНУС АТАКИ ВІД ALLY_BUFF (ID:24)
    // console.log(`🔍 DEBUG: attacker.activeEffects =`, attacker.activeEffects);
    // const attackBuffEffect = attacker.activeEffects?.find(e => e.type === 'ally_buff');
    // if (attackBuffEffect) {
    //     baseDamage += attackBuffEffect.attackBoost;
    //     console.log(`✨ Баф союзника: ${attacker.name} +${attackBuffEffect.attackBoost} атаки`);
    // }
    // ═══════════════════════════════════════════
    
    // Розрахунок броні цілі
    // Розрахунок броні цілі (з бонусами від клітинки)
let targetArmor;
if (typeof window.calculateFinalArmor === 'function') {
    targetArmor = window.calculateFinalArmor(target.unit);
} else {
    targetArmor = target.unit.isHero
        ? (target.unit.armor || 0) + (target.unit.LevelArmor || 0)
        : (target.unit.armor || 0);
}
console.log(`🛡️ Броня ${target.unit.name}: ${targetArmor} (з бонусами клітинки)`);
    
    // ═══════════════════════════════════════════
    // 🆕 АУРИ ГЕРОЇВ - БОНУСНА БРОНЯ ЦІЛІ
    // ═══════════════════════════════════════════
    if (target.unit.isHero && window.heroAuraSystem) {
        // ID:9 - Додаткова броня від ворогів поряд
        const bonusArmor = window.heroAuraSystem.calculateEnemyProximityArmor(target.unit, unitsOnMap);
        targetArmor += bonusArmor;
        
        // ID:4,5,6 - Бонуси при низькому HP
        // const passiveBonuses = window.heroAuraSystem.applyAllPassiveBonuses(target.unit, unitsOnMap);
        // targetArmor += passiveBonuses.armor;
    }

        // ═══════════════════════════════════════════
    // 🆕 АКТИВНИЙ ЕФЕКТ - БОНУСНА БРОНЯ (armor_boost від ID:23)
    // ═══════════════════════════════════════════
    const armorBoostEffect = target.unit.activeEffects?.find(e => e.type === 'armor_boost');
    if (armorBoostEffect) {
        const bonusArmor = Math.floor(targetArmor * (armorBoostEffect.armorBoostPercent / 100));
        targetArmor += bonusArmor;
        console.log(`🛡️ Броньований щит: ${target.unit.name} +${bonusArmor} броні (${armorBoostEffect.armorBoostPercent}%)`);
    // }
    // // 🆕 БОНУС БРОНІ ВІД ALLY_BUFF (ID:24)
    // const allyBuffEffect = target.unit.activeEffects?.find(e => e.type === 'ally_buff');
    // if (allyBuffEffect) {
    //     targetArmor += allyBuffEffect.armorBoost;
    //     console.log(`✨ Баф союзника: ${target.unit.name} +${allyBuffEffect.armorBoost} броні`);
    }

    // ═══════════════════════════════════════════
// 🆕 ПЕРЕВІРКА ШИПІВ - відбиття урону
// ═══════════════════════════════════════════
if (target.unit.activeEffects) {
    const thornsEffect = target.unit.activeEffects.find(e => e.type === 'thorns');
    if (thornsEffect) {
        // Розраховуємо відбитий урон (% від атаки атакуючого)
        const reflectedDamage = Math.floor(baseDamage * (thornsEffect.reflectPercent / 100));
        
        // Наносимо урон атакуючому
        attacker.newhp = (attacker.newhp ?? attacker.hp) - reflectedDamage;
        
        console.log(`🌵 Шипи! ${attacker.name} отримав ${reflectedDamage} урону назад`);
        
        // Оновлюємо health bar атакуючого
        if (typeof window.updateUnitHealthBar === 'function') {
            window.updateUnitHealthBar(attacker);
        }
        
        // Показуємо попап урону на атакуючому
        showDamagePopup(reflectedDamage, attacker.x, attacker.y, false, '#8B4513'); // Коричневий колір для шипів
    }
}
    // ═══════════════════════════════════════════
    
    // Випадковість урону (80%-120%)
    const randomMultiplier = 0.8 + Math.random() * 0.4;
    const damageWithRandom = Math.floor(baseDamage * randomMultiplier);
    
    // Зменшення від броні
    let armorReduction = 0;
    if (targetArmor > 0) {
        const armorRandomMultiplier = 0.6 + Math.random() * 0.8;
        armorReduction = Math.floor(targetArmor * armorRandomMultiplier);
    }
    
    // Фінальний урон (мінімум 1)
    const finalDamage = Math.max(1, damageWithRandom - armorReduction);
    
    // ═══════════════════════════════════════════
    // 🆕 АУРИ ГЕРОЇВ - ПІСЛЯ УРОНУ
    // ═══════════════════════════════════════════
    if (attacker.isHero && window.heroAuraSystem) {
        // ID:2 - Вампірізм (повертає HP від завданого урону)
        const lifesteal = window.heroAuraSystem.calculateLifesteal(attacker, finalDamage);
        if (lifesteal > 0) {
            const maxHp = attacker.maxHp || attacker.hp;
            attacker.newhp = Math.min((attacker.newhp || attacker.hp) + lifesteal, maxHp);
            console.log(`🧛 ${attacker.name} відновив ${lifesteal} HP (тепер: ${attacker.newhp})`);
            
            // Оновлюємо health bar атакуючого
            if (typeof window.updateUnitHealthBar === 'function') {
                window.updateUnitHealthBar(attacker);
            }
        }
        
        // ID:7 - Баш (шанс оглушити ворога)
        const bashResult = window.heroAuraSystem.tryBash(attacker, target.unit);
        if (bashResult) {
            target.unit.step = Math.max(0, (target.unit.step || 0) - bashResult.stepReduction);
            target.unit.armor = Math.max(0, (target.unit.armor || 0) - bashResult.armorReduction);
            window.heroAuraSystem.bashDebuffs.set(target.unit.id, {
                stepLost: bashResult.stepReduction,
                armorLost: bashResult.armorReduction,
                turnsLeft: 1, // 1 хід ворога
                appliedByPlayerIndex: attacker.playerIndex
            });
            console.log(`💫 ${target.unit.name}: -${bashResult.stepReduction} кроків, -${bashResult.armorReduction} броні`);
           // 🔧 ДОДАНО: Показуємо попап "БАШ!"
           showBashPopup(target.x, target.y, bashResult.stepReduction, bashResult.armorReduction);
        }
    }

    // 🔧 ДОДАТИ НОВУ ФУНКЦІЮ:
function showBashPopup(x, y, stepLost, armorLost) {
    const popup = document.createElement('div');
    popup.innerHTML = `💫 БАШ!<br>-${stepLost} 👟 -${armorLost} 🛡️`;
    popup.style.cssText = `
        position: absolute;
        left: ${x * cellSizeAll + 5}px;
        top: ${y * cellSizeAll - 30}px;
        color: #FFD700;
        font-weight: bold;
        font-size: 14px;
        text-shadow: 2px 2px 4px black;
        z-index: 1000;
        pointer-events: none;
        animation: bashFloat 1.5s ease-out forwards;
    `;
    
    map.appendChild(popup);
    setTimeout(() => popup.remove(), 1500);
}


function showSecondBreathPopup(x, y) {
    const popup = document.createElement('div');
    popup.innerHTML = `💀➡️💚 ДРУГЕ ДИХАННЯ!`;
    popup.style.cssText = `
        position: absolute;
        left: ${x * cellSizeAll + 5}px;
        top: ${y * cellSizeAll - 40}px;
        color: #00ff88;
        font-weight: bold;
        font-size: 16px;
        text-shadow: 2px 2px 4px black, 0 0 10px #00ff88;
        z-index: 1000;
        pointer-events: none;
        animation: secondBreathFloat 2s ease-out forwards;
    `;
    
    map.appendChild(popup);
    setTimeout(() => popup.remove(), 2000);
}
    // ═══════════════════════════════════════════
    
    // ⬇️ Накопичення мани
    if (attacker.isHero) {
        if (typeof window.addHeroesMana === 'function') {
            window.addHeroesMana(attacker.playerIndex, finalDamage, isCritical);
            console.log(`🔮 +${finalDamage} мани героїв. Гравець: ${attacker.playerIndex + 1}`);
        }
    } else {
        const unitType = getUnitType(attacker);
        if (unitType && players[attacker.playerIndex]) {
            if (players[attacker.playerIndex].unitMana[unitType] === undefined) {
                players[attacker.playerIndex].unitMana[unitType] = 0;
            }
            players[attacker.playerIndex].unitMana[unitType] += finalDamage;
            
            // 🎯 ВСТАНОВЛЮЄМО СТАН ПЕРЕД АПГРЕЙДОМ!
attacker.moved = true;
attacker.attacked = true;  // 👈 ДЛЯ ВСІХ ЮНІТІВ!

if (attacker.name && attacker.name.toLowerCase().includes('катапульт')) {
    console.log(`🎯 Катапульта атакувала → рух заблокований (moved=true, attacked=true)`);
}
            
            if (window.unitProgressSystem && typeof window.unitProgressSystem.checkAndUpgradeIfReady === 'function') {
                window.unitProgressSystem.checkAndUpgradeIfReady(attacker.playerIndex, unitType);
            }
        }
    }

    // Застосовуємо урон
    target.unit.newhp = (target.unit.newhp || target.unit.hp) - finalDamage;
    
    // 💚 Оновлюємо health bar
    if (typeof window.updateUnitHealthBar === 'function') {
        window.updateUnitHealthBar(target.unit);
    }
// 🆕 Перевіряємо бонуси "Мале здоров'я" після отримання урону
if (target.unit.isHero && window.heroAuraSystem && window.heroAuraSystem.checkLowHealthBonusForUnit) {
    window.heroAuraSystem.checkLowHealthBonusForUnit(target.unit);
}
    console.log(`💥 Урон: ${finalDamage} (${baseDamage} base, -${armorReduction} armor)${isCritical ? ' КРІТ!' : ''}`);
    console.log(`❤️ HP цілі: ${target.unit.newhp}/${target.unit.hp}`);
    
    // Показуємо урон на екрані
    showDamagePopup(finalDamage, target.x, target.y, isCritical);
    
    // ═══════════════════════════════════════════
    // 🆕 ПЕРЕВІРКА СМЕРТІ + ДРУГЕ ДИХАННЯ
    // ═══════════════════════════════════════════
    if (target.unit.newhp <= 0) {
        // Якщо це герой - перевіряємо "Друге дихання"
        if (target.unit.isHero && window.heroAuraSystem) {
            const survived = window.heroAuraSystem.trySecondBreath(target.unit);
            if (survived) {
                // Герой вижив!
                console.log(`💀➡️💚 ${target.unit.name} активував Друге дихання!`);

                 // 🆕 Показуємо анімацію
    showSecondBreathPopup(target.x, target.y);
                if (typeof window.updateUnitHealthBar === 'function') {
                    window.updateUnitHealthBar(target.unit);
                }
                // НЕ знищуємо юніта - пропускаємо destroyUnit
            } else {
                // Герой помер
                console.log('💀 Герой знищений!');
                destroyUnit(target.unit);
                 // Перевіряємо чи гравець програв після смерті цього юніта
                 if (typeof window.checkPlayerDefeatAfterUnitDeath === 'function') {
                    window.checkPlayerDefeatAfterUnitDeath(target.unit);
                }
            }
        } else {
            // Звичайний юніт
            console.log('💀 Ціль знищена!');
            destroyUnit(target.unit);
             // Перевіряємо чи гравець програв після смерті цього юніта
             if (typeof window.checkPlayerDefeatAfterUnitDeath === 'function') {
                window.checkPlayerDefeatAfterUnitDeath(target.unit);
            }
        }
    } else {
        if (typeof updateUnitTablo === 'function' && selectedUnitForMove === target.unit) {
            updateUnitTablo(target.unit);
        }
    }
    // ═══════════════════════════════════════════
    
    // Позначаємо що юніт атакував
    attacker.attacked = true;
    attacker.moved = true;

    // if (attacker.name && attacker.name.toLowerCase().includes('катапульт')) {
    //     attacker.attacked = true;
    //     attacker.moved = true;  // 👈 ДОДАТИ!
    //     console.log(`🎯 Катапульта атакувала → рух заблокований (moved=true, attacked=true)`);
    // }
    // if (attacker.type && attacker.type.toLowerCase().includes('catapult')) {
    //     console.log(`🎯 Катапульта атакувала → рух заблокований`);
    // }

    if (typeof updateUnitVisualState === 'function') {
        updateUnitVisualState(attacker);
    }

    if (typeof updateUnitTablo === 'function') {
        updateUnitTablo(attacker);
    }
    
    // Виходимо з режиму атаки
    exitAttackMode();
}

/**
 * Показує урон на екрані
 */
function showDamagePopup(damage, x, y, isCritical = false) {
    const popup = document.createElement('div');
    popup.innerText = `-${damage}${isCritical ? ' КРІТ!' : ''}`;
    popup.style.position = 'absolute';
    popup.style.left = `${x * cellSizeAll + 15}px`;
    popup.style.top = `${y * cellSizeAll - 10}px`;
    popup.style.color = isCritical ? 'gold' : 'red';
    popup.style.fontWeight = 'bold';
    popup.style.fontSize = isCritical ? '24px' : '20px';
    popup.style.pointerEvents = 'none';
    popup.style.zIndex = '9999';
    if (isCritical) {
        popup.style.textShadow = '0 0 10px gold, 0 0 20px orange';
    }
    
    map.appendChild(popup);
    
    // Анімація
    popup.animate([
        { transform: 'translateY(0px)', opacity: 1 },
        { transform: 'translateY(-30px)', opacity: 0 }
    ], {
        duration: 1500,
        easing: 'ease-out'
    });
    
    setTimeout(() => popup.remove(), 1500);
}

/**
 * Знищує юніта
 */
/**
 * Знищує юніта
 */
function destroyUnit(unit) {
    console.log(`💀 Функція destroyUnit викликана для ${unit.name}`);
    
    // Перевіряємо чи це герой
    if (unit.isHero) {
        console.log(`👑 Це герой ${unit.name} - викликаємо спеціальну обробку смерті`);
        // Використовуємо нову функцію для героїв
        if (typeof window.handleHeroDeath === 'function') {
            window.handleHeroDeath(unit);
        } else {
            console.error('❌ Функція handleHeroDeath не знайдена!');
            console.log('⚠️ Використовуємо стандартне видалення для героя');
            // Стандартне видалення якщо функція не знайдена
            standardDestroyUnit(unit);
        }
        return;
    }
    
    // Для звичайних юнітів - стандартне видалення
    standardDestroyUnit(unit);
}

/**
 * Стандартне видалення юніта (для звичайних юнітів)
 */
function standardDestroyUnit(unit) {
    console.log(`⚔️ Стандартне видалення юніта ${unit.name}`);
    
    // Видаляємо з масиву
    const index = unitsOnMap.findIndex(u => 
        u.x === unit.x && u.y === unit.y && u.playerIndex === unit.playerIndex
    );
    
    if (index !== -1) {
        unitsOnMap.splice(index, 1);
        console.log(`🗑️ Юніт ${unit.name} видалений з unitsOnMap`);
    } else {
        console.warn(`⚠️ Юніт ${unit.name} не знайдений в unitsOnMap`);
    }
    
    // Видаляємо wrapper юніта (разом з health bar)
    const wrapper = document.querySelector(
        `.unit-wrapper[data-unit-id="${unit.id}"]`
    );

    if (wrapper) {
        wrapper.remove();
        console.log(`💀 Видалено візуальний елемент юніта: ${unit.name}`);
    } else {
        console.warn(`⚠️ Не знайдено wrapper для видалення юніта: ${unit.name}`);
    }
    
    // Оновлюємо лічильник юнітів
    if (typeof updateUnitsCount === 'function') {
        updateUnitsCount();
    }
    
    // Перевіряємо чи гравець програв після смерті цього юніта
    if (typeof window.checkPlayerDefeatAfterUnitDeath === 'function') {
        window.checkPlayerDefeatAfterUnitDeath(unit);
    }
}

/**
 * Обробник кліку в режимі атаки
 */
function handleAttackClick(e) {
    if (!isInAttackMode || !selectedAttacker) return;
    
    // Перевіряємо чи клік по клітинці
    if (!e.target.classList.contains('cell')) return;
    
    const x = parseInt(e.target.dataset.x);
    const y = parseInt(e.target.dataset.y);
    
    // Шукаємо ціль серед доступних
    const target = availableTargets.find(t => t.x === x && t.y === y);
    
    if (target) {
        executeAttack(selectedAttacker, target);
    }
}

/**
 * Ініціалізація системи атаки
 */
function initAttackSystem() {
    if (!BtnAttackTablo) {
        console.error('❌ Кнопка атаки не знайдена!');
        return;
    }
    
    // Обробник кнопки атаки
    BtnAttackTablo.addEventListener('click', () => {
        if (isInAttackMode) {
            // Вимкнути режим атаки
            exitAttackMode();
            return;
        }
        
        // Перевіряємо чи є вибраний юніт
        if (!selectedUnitForMove) {
            alert('⚠️ Спочатку виберіть юніта!');
            return;
        }
        
        const unit = selectedUnitForMove;
        
        // Перевіряємо чи це юніт поточного гравця
        if (unit.playerIndex !== currentPlayerIndex) {
            alert('⚠️ Це не ваш юніт!');
            return;
        }
        
        // Перевіряємо чи юніт вже атакував
//console.log('🔍 Перевірка юніта:', {
    //name: unit.name || unit.type,
   // attacked: unit.attacked,
   // moved: unit.moved,
  //  playerIndex: unit.playerIndex,
   // x: unit.x,
   // y: unit.y,
   // range: unit.range
//});

if (unit.attacked) {
    console.log('❌ Юніт вже атакував!');
    alert('⚠️ Цей юніт вже атакував цього ходу!');
    return;
}
        
        // Перевіряємо чи юніт може атакувати (має range > 0)
        if (!unit.range || unit.range <= 0) {
            alert('⚠️ Цей юніт не може атакувати!');
            return;
        }
        
        // Включаємо режим атаки
        isInAttackMode = true;
        selectedAttacker = unit;
        
        // Очищаємо клітинки руху
        if (typeof clearMoveCells === 'function') {
            clearMoveCells();
        }
        
        // Підсвічуємо клітинки для атаки
        highlightAttackCells(unit);
    });
    
    // Додаємо обробник кліків на карту для атаки
    if (map) {
        map.addEventListener('click', handleAttackClick);
    }
    
   // console.log('✅ Система атаки ініціалізована з підтримкою альянсів');
}

// Ініціалізація після завантаження DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initAttackSystem, 500);
    });
} else {
    setTimeout(initAttackSystem, 500);
}

/**
 * Визначає тип юніта за його unitId або іменем
 */
window.getUnitType = function(unit) {
    if (!unit.unitId) return null;
    
    const match = unit.unitId.match(/\d+/);
    if (!match) return null;
    
    const numberPart = match[0];
    
    // 🔴 ВИПРАВЛЕННЯ: для 3-4 значних кодів
    let typeCode;
    if (numberPart.length >= 3) {
        // Відкидаємо останні 2 цифри (рівень)
        typeCode = numberPart.slice(0, -2);
    } else {
        typeCode = numberPart.charAt(0);
    }
    
    const typeMap = {
        '1': 'warrior',
        '2': 'archer',
        '3': 'shaman',
        '4': 'horse',
        '5': 'horseman',    // 👈 ЗМІНИТИ з 'pikener' на 'horseman'
        '6': 'catapult',    // 👈 ЗМІНИТИ з 'horseman' на 'catapult'
        '7': 'pikener',     // 👈 ЗМІНИТИ з 'catapult' на 'pikener'
        '8': 'support',
        '9': 'specialist',
        '10': 'mage',
        '11': 'wisp'
    };
    
    return typeMap[typeCode] || null;
};


