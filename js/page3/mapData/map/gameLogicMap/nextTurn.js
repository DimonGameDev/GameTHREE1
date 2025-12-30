// ============================================
// ЛОГІКА ЗМІНИ ХОДУ МІЖ ГРАВЦЯМИ
// ============================================

// Лічильник раундів (починається з 1)
// let currentRound = 1;

function updatePlayerDisplay() {
    const currentPlayer = players[currentPlayerIndex];
    
    if (!currentPlayer) {
        // console.error('❌ Поточний гравець не знайдений!');
        return;
    }
    
    
    // Оновлюємо номер гравця
    if (flagTopNumberPlayer) {
        flagTopNumberPlayer.innerText = currentPlayer.originalIndex + 1;
    }
    
    // Оновлюємо колір прапора
    if (FlagColorPlayer) {
        // ✅ ВИПРАВЛЕНО: Використовуємо originalIndex
        FlagColorPlayer.style.backgroundColor = colorFlag[currentPlayer.originalIndex];
        console.log(`🚩 Прапор оновлено для гравця ${currentPlayer.originalIndex + 1}: ${colorFlag[currentPlayer.originalIndex]}`);
    }
    
    // Оновлюємо кількість золота
    if (goldNumber) {
        goldNumber.innerText = currentPlayer.gold;
    }
    
    // Рахуємо скільки юнітів на полі у цього гравця
    const currentUnitsCount = unitsOnMap.filter(u => u.playerIndex === currentPlayerIndex).length;
    
    // Оновлюємо поточну кількість юнітів
    if (cauntNowUnits) {
        cauntNowUnits.innerText = currentUnitsCount;
    }
    
    // 🔮 Оновлюємо відображення мани для поточного гравця
    if (typeof window.updateCurrentPlayerMana === 'function') {
        window.updateCurrentPlayerMana();
    }
    
    // console.log(`   Юнітів на полі: ${currentUnitsCount} / ${maxUnitsOnField}`);
}

/**
 * Нараховує золото гравцю за його замки
 */
function addGoldForCastles(playerIndex) {
    const player = players[playerIndex];
    
    if (!player) {
        return;
    }
    
    // Підраховуємо кількість замків цього гравця
    const playerCastles = castles.filter(castle => castle.playerIndex === player.originalIndex);
    const castleCount = playerCastles.length;
    
    // Кожен замок дає +50 золота
    const goldPerCastle = 50;
    const totalGold = castleCount * goldPerCastle;
    
    // Додаємо золото
    player.gold += totalGold;
    
   // console.log(`💰 Гравець ${player.originalIndex + 1} отримав ${totalGold} золота за ${castleCount} замків`);
    //console.log(`   Всього золота: ${player.gold}`);
    
    return totalGold;
}



/**
 * Переходить до наступного гравця
 */
function nextTurn() {
    // console.log('🔄 Зміна ходу...');
    
        // ⬅️ ДОДАЙТЕ: Скидаємо прапорці руху та атаки для всіх юнітів попереднього гравця
        const previousPlayerIndex = currentPlayerIndex;

        // if (typeof window.regenerateUnitsAtTurnStart === 'function') {
        //     window.regenerateUnitsAtTurnStart(currentPlayerIndex);
        //     console.log('💚 Регенерація юнітів застосована');
        // }
        // if (window.EffectsManager) {
        //     EffectsManager.cleanupExpiredEffects(previousPlayerIndex);  // ❌ НЕ ПРАВИЛЬНО
        // }
        unitsOnMap.forEach(unit => {
            if (unit.playerIndex === previousPlayerIndex) {
                unit.moved = false;
                unit.attacked = false;


                if (unit.usedPortalThisTurn && unit.originalStep !== undefined) {
                    unit.step = unit.originalStep;
                    delete unit.originalStep;
                    delete unit.usedPortalThisTurn;
                    console.log(`🔄 ${unit.name}: step відновлено до ${unit.step}`);
                }
                 // 🔧 ДОДАНО: Очищаємо тимчасові бонуси (від здібностей типу "Кров'яний лють")
                 if (unit.tempBonuses) {
                    console.log(`🧹 ${unit.name}: очищаємо tempBonuses`, unit.tempBonuses);
                    unit.tempBonuses = {};
                }

                // 🆕 Зменшуємо тривалість активних ефектів
if (unit.activeEffects && unit.activeEffects.length > 0) {
    unit.activeEffects = unit.activeEffects.filter(effect => {
        // 🆕 Перевірка по раунду (універсальна для будь-якої кількості гравців)
        if (effect.expiresOnRound !== undefined) {
            if (currentRound >= effect.expiresOnRound) {
                console.log(`⏰ Ефект "${effect.type}" закінчився у ${unit.name} (раунд ${currentRound})`);
                
                // // 🆕 Знімаємо всі бонуси якщо це ally_buff
                // if (effect.type === 'ally_buff') {
                //     if (effect.stepPlus) unit.step = Math.max(0, (unit.step || 0) - effect.stepPlus);
                //     if (effect.attackBoost) unit.attack = Math.max(0, (unit.attack || 0) - effect.attackBoost);
                //     if (effect.armorBoost) unit.armor = Math.max(0, (unit.armor || 0) - effect.armorBoost);
                //     console.log(`👋 ${unit.name}: знято бонуси (-${effect.stepPlus} крок, -${effect.attackBoost} атака, -${effect.armorBoost} броня)`);
                // }
                
                return false; // Видаляємо
            }
            return true;
        }
        
        // Стара логіка для turnsLeft (якщо ще використовується)
        if (effect.turnsLeft !== undefined) {
            if (effect.appliedByPlayerIndex !== undefined && 
                effect.appliedByPlayerIndex !== previousPlayerIndex) {
                return true;
            }
            effect.turnsLeft--;
            if (effect.turnsLeft <= 0) {
                console.log(`⏰ Ефект "${effect.type}" закінчився у ${unit.name}`);
                return false;
            }
        }
        return true;
    });
}
                
                // ✅ ДОДАЙТЕ: Зменшуємо cooldown здібностей
                if (unit.abilityInstances && Array.isArray(unit.abilityInstances)) {
                    unit.abilityInstances.forEach(ability => {
                        if (ability.currentCooldown && ability.currentCooldown > 0) {
                            ability.currentCooldown--;
                            console.log(`⏳ ${unit.name}: ${ability.name} cooldown: ${ability.currentCooldown}`);
                        }
                    });
                }

                // 🔧 ДОДАНО: Зменшуємо cooldown здібностей для ГЕРОЇВ
                if (unit.isHero && window.heroActiveAbilitySystem) {
                    window.heroActiveAbilitySystem.reduceCooldowns(unit);
                }
            }
        });
        
        // 🆕 ДОДАНО: Видаляємо портали гравця який закінчив хід
        if (window.activePortals && window.activePortals.length > 0) {
            // Фільтруємо - залишаємо тільки ті портали, які НЕ належать попередньому гравцю
            const portalsToRemove = window.activePortals.filter(p => p.playerIndex === previousPlayerIndex);
            
            // Видаляємо візуальні класи з клітинок
            portalsToRemove.forEach(portal => {
                const entryCell = document.querySelector(`.cell[data-x='${portal.entry.x}'][data-y='${portal.entry.y}']`);
                const exitCell = document.querySelector(`.cell[data-x='${portal.exit.x}'][data-y='${portal.exit.y}']`);
                
                if (entryCell) {
                    entryCell.classList.remove('portal-entry');
                    delete entryCell.dataset.portalId;
                }
                if (exitCell) {
                    exitCell.classList.remove('portal-exit');
                    delete exitCell.dataset.portalId;
                }
                
                console.log(`🌀 Портал гравця ${portal.playerIndex + 1} видалено`);
            });
            
            // Оновлюємо масив порталів
            window.activePortals = window.activePortals.filter(p => p.playerIndex !== previousPlayerIndex);
        }
        
        // if (window.heroAuraSystem && window.heroAuraSystem.clearExpiredBashDebuffs) {
        //     window.heroAuraSystem.clearExpiredBashDebuffs(unitsOnMap, currentPlayerIndex);
        // }
        // ⬅️ ДОДАЙТЕ: Скидаємо візуальний стан юнітів попереднього гравця
        if (typeof resetPlayerUnitsVisualState === 'function') {
            resetPlayerUnitsVisualState(previousPlayerIndex);
        }
        // console.log(`🔄 Скинуто прапорці руху для юнітів гравця ${previousPlayerIndex + 1}`);
        

    // console.log(`🔄 Скинуто прапорці руху для юнітів гравця ${previousPlayerIndex + 1}`);
    
    // Переходимо до наступного гравця
    currentPlayerIndex++;
    
    // Якщо дійшли до кінця списку, повертаємося на початок
    // Якщо дійшли до кінця списку, повертаємося на початок
if (currentPlayerIndex >= players.length) {
    currentPlayerIndex = 0;
    currentRound++; // Збільшуємо лічильник раундів
    console.log(`🔁 Новий раунд ${currentRound}!`);
        // 🆕 Знімаємо ефекти, які закінчуються на початку ходу гравця який їх наклав
        unitsOnMap.forEach(unit => {
            if (unit.activeEffects && unit.activeEffects.length > 0) {
                unit.activeEffects = unit.activeEffects.filter(effect => {
                    // Ефекти з appliedByPlayerIndex знімаються коли цей гравець починає хід
                    if (effect.appliedByPlayerIndex === currentPlayerIndex && 
                        (effect.type === 'ally_buff' || effect.type === 'curse' || effect.type === 'armor_per_enemy' || effect.type === 'ground_strike' || effect.type === 'ground_strike_neighbor'  || effect.type === 'blood_rage')) {
                        
                        // Для ally_buff - віднімаємо бонуси
                        if (effect.type === 'ally_buff') {
                            if (effect.stepPlus) unit.step = Math.max(0, (unit.step || 0) - effect.stepPlus);
                            if (effect.attackBoost) unit.attack = Math.max(0, (unit.attack || 0) - effect.attackBoost);
                            if (effect.armorBoost) unit.armor = Math.max(0, (unit.armor || 0) - effect.armorBoost);
                        }
                        // Для blood_rage - знімаємо бонус атаки
if (effect.type === 'blood_rage') {
    if (effect.attackBoost) unit.attack = Math.max(0, (unit.attack || 0) - effect.attackBoost);
    console.log(`🔥 ${unit.name}: Кров'яний лют закінчився (-${effect.attackBoost} атаки)`);
}

                        // Для ground_strike та ground_strike_neighbor - ПОВЕРТАЄМО статки
if (effect.type === 'ground_strike' || effect.type === 'ground_strike_neighbor') {
    if (effect.stepMinus) unit.step = (unit.step || 0) + effect.stepMinus;
    if (effect.attackMinus) unit.attack = (unit.attack || 0) + effect.attackMinus;
    if (effect.armorMinus) unit.armor = (unit.armor || 0) + effect.armorMinus;
    console.log(`💫 ${unit.name}: ефект удару по землі знято`);
}
                        
                        // Для curse - ПОВЕРТАЄМО статки
                        if (effect.type === 'curse') {
                            if (effect.stepMinus) unit.step = (unit.step || 0) + effect.stepMinus;
                            if (effect.attackMinus) unit.attack = (unit.attack || 0) + effect.attackMinus;
                            if (effect.armorMinus) unit.armor = (unit.armor || 0) + effect.armorMinus;
                            console.log(`✨ ${unit.name}: прокляття знято`);
                        }
                        
                        // 🆕 Для armor_per_enemy - знімаємо бонус броні
                        if (effect.type === 'armor_per_enemy') {
                            if (effect.bonusArmor) unit.armor = Math.max(0, (unit.armor || 0) - effect.bonusArmor);
                            console.log(`🛡️ ${unit.name}: знято бонусну броню (-${effect.bonusArmor})`);
                        }
                        
                        return false;
                    }
                    return true;
                });
            }
        });
}

if (window.EffectsManager) {
    EffectsManager.cleanupExpiredEffects(currentPlayerIndex);
}

if (window.heroAuraSystem && window.heroAuraSystem.applyLowHealthBonuses) {
    window.heroAuraSystem.applyLowHealthBonuses(unitsOnMap, currentPlayerIndex);
}

if (window.heroAuraSystem && window.heroAuraSystem.clearExpiredBashDebuffs) {
    window.heroAuraSystem.clearExpiredBashDebuffs(unitsOnMap, currentPlayerIndex);
}

// 🆕 ДОДАНО: Виконуємо відкладені удари (ID: 19)
if (window.delayedStrikes && window.delayedStrikes.length > 0) {
    const strikesToExecute = window.delayedStrikes.filter(s => s.playerIndex === currentPlayerIndex);
    
    strikesToExecute.forEach(strike => {
        // Знаходимо ворога на цільовій клітинці
        const target = unitsOnMap.find(u => u.x === strike.target.x && u.y === strike.target.y);
        
        if (target && target.playerIndex !== strike.playerIndex) {
            // Наносимо урон
            const currentHp = target.newhp ?? target.hp;
            target.newhp = Math.max(0, currentHp - strike.damage);
            
            console.log(`💥 Підготовлений удар! ${strike.heroName} вражає ${target.name} на ${strike.damage} урону`);
            
            // Оновлюємо health bar
            if (typeof window.updateUnitHealthBar === 'function') {
                window.updateUnitHealthBar(target);
            }
            
            // Перевіряємо смерть
            if (target.newhp <= 0) {
                console.log(`☠️ ${target.name} загинув від підготовленого удару!`);
            }
        } else {
            console.log(`🎯 Підготовлений удар на (${strike.target.x}, ${strike.target.y}) - ціль відсутня`);
        }
        
        // Видаляємо візуальний маркер
        const cell = document.querySelector(`.cell[data-strike-id='${strike.id}']`);
        if (cell) {
            cell.classList.remove('delayed-strike-marker');
            delete cell.dataset.strikeId;
        }
    });
    
    // Видаляємо виконані удари
    window.delayedStrikes = window.delayedStrikes.filter(s => s.playerIndex !== currentPlayerIndex);
    // 🆕 ДОДАНО: Показуємо маркери поточного гравця, ховаємо інших
if (window.delayedStrikes && window.delayedStrikes.length > 0) {
    window.delayedStrikes.forEach(strike => {
        const cell = document.querySelector(`.cell[data-strike-id='${strike.id}']`);
        if (cell) {
            if (strike.playerIndex === currentPlayerIndex) {
                cell.classList.remove('hidden-marker');  // Показуємо свої маркери
            } else {
                cell.classList.add('hidden-marker');     // Ховаємо чужі маркери
            }
        }
    });
  }
}
    
    // Нараховуємо золото тільки починаючи з 2-го раунду
if (currentRound >= 2) {
    // Нараховуємо золото за замки поточному гравцю
    addGoldForCastles(currentPlayerIndex);
    
    // Нараховуємо золото за захоплені хатки
    if (typeof window.addGoldForCapturedHouses === 'function') {
        window.addGoldForCapturedHouses(currentPlayerIndex);
    }
} else {
    console.log(`⏳ Раунд ${currentRound}: золото не нараховується (тільки з 2-го раунду)`);
}
    
    // ⬅️ ДОДАЙТЕ: Очищаємо підсвічені клітинки для руху
    if (typeof clearMoveCells === 'function') {
        clearMoveCells();
    } else if (typeof window.clearMoveCells === 'function') {
        window.clearMoveCells();
    }
    
    // ⬅️ ДОДАЙТЕ: Очищаємо табло юніта
    if (typeof clearUnitTablo === 'function') {
        clearUnitTablo();
    } else if (typeof window.clearUnitTablo === 'function') {
        window.clearUnitTablo();
    }
        // ⬅️ ДОДАЙТЕ: Очищаємо табло юніта
        if (typeof clearUnitTablo === 'function') {
            clearUnitTablo();
        } else if (typeof window.clearUnitTablo === 'function') {
            window.clearUnitTablo();
        }
        
        // ⬇️ НОВИЙ КОД: Ховаємо кнопку захоплення при зміні ходу
        if (typeof BtnActiveHauseGoldCapture !== 'undefined' && BtnActiveHauseGoldCapture) {
            BtnActiveHauseGoldCapture.style.display = "none";
        }
        
        const currentPlayer = players[currentPlayerIndex];
if (currentPlayer && typeof window.regenerateUnitsAtTurnStart === 'function') {
    window.regenerateUnitsAtTurnStart(currentPlayerIndex);
    console.log(`💚 Регенерація для гравця ${currentPlayer.originalIndex + 1}`);
}
        // Оновлюємо відображення
        updatePlayerDisplay();
        if (typeof updateActivePlayerUnitsVisuals === 'function') {
            updateActivePlayerUnitsVisuals();
        }
        // if (typeof window.saveGameState === 'function') {
        //     window.saveGameState();
        // }
    // console.log(`✅ Хід передано гравцю ${players[currentPlayerIndex].originalIndex + 1}`);
}

/**
 * Ініціалізація обробника кнопки зміни ходу
 */
function initNextTurnButton() {
    // Використовуємо змінну з globals.js
    if (!btnNextTurn) {
        // console.error('❌ Кнопка зміни ходу не знайдена!');
        return;
    }
    
    // Додаємо обробник кліку
    btnNextTurn.addEventListener('click', nextTurn);
    
    // console.log('✅ Кнопка зміни ходу ініціалізована');
    
    // Відразу оновлюємо дані першого гравця
    updatePlayerDisplay();
}


function clearExpiredTempBonuses(playerIndex) {
    unitsOnMap.forEach(unit => {
        if (unit.playerIndex === playerIndex && unit.tempBonuses) {
            if (unit.tempBonuses.duration !== undefined) {
                unit.tempBonuses.duration--;
                if (unit.tempBonuses.duration <= 0) {
                    console.log(`🧹 Очищено тимчасові бонуси для ${unit.name}`);
                    unit.tempBonuses = {};
                }
            }
        }
    });
}
// Ініціалізуємо після завантаження DOM і даних гри
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Невелика затримка щоб дані гри точно завантажились
        setTimeout(initNextTurnButton, 100);
    });
} else {
    setTimeout(initNextTurnButton, 100);
}