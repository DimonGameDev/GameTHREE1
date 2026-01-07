// ============================================
// СИСТЕМА ПЕРЕВІРКИ ПОРАЗКИ ГРАВЦЯ
// ============================================

/**
 * Перевіряє, чи гравець має хоча б один замок
 * @param {number} playerIndex - індекс гравця
 * @returns {boolean} - true якщо є хоча б один замок
 */
function checkIfPlayerHasCastles(playerIndex) {
    console.log(`🔍 ДЕТАЛЬНА перевірка замків гравця ${playerIndex + 1}:`);
    
    let totalCastles = 0;
    
    // 1. Перевіряємо захоплені замки
    if (window.capturedCastles && Array.isArray(window.capturedCastles)) {
        const playerCapturedCastles = window.capturedCastles.filter(castle => {
            return castle.playerIndex === playerIndex;
        });
        
        console.log(`🏰 Захоплені замки гравця ${playerIndex + 1}:`, playerCapturedCastles);
        totalCastles += playerCapturedCastles.length;
    } else {
        console.log(`⚠️ window.capturedCastles не знайдено або не масив`);
    }
    
    // 2. Перевіряємо початкові замки (які ще не захоплені іншим гравцем)
    if (typeof castles !== 'undefined' && Array.isArray(castles)) {
        let playerStartCastles = [];
        
        castles.forEach(startCastle => {
            if (startCastle.playerIndex === playerIndex) {
                // Перевіряємо чи цей замок не захоплений іншим гравцем
                let isCapturedByOther = false;
                
                if (window.capturedCastles && Array.isArray(window.capturedCastles)) {
                    isCapturedByOther = window.capturedCastles.some(capturedCastle => {
                        return capturedCastle.x === startCastle.x && 
                               capturedCastle.y === startCastle.y;
                    });
                }
                
                if (!isCapturedByOther) {
                    playerStartCastles.push(startCastle);
                }
            }
        });
        
        console.log(`🏰 Початкові незахоплені замки гравця ${playerIndex + 1}:`, playerStartCastles);
        totalCastles += playerStartCastles.length;
    } else {
        console.log(`⚠️ Масив castles не знайдено`);
    }
    
    console.log(`🏰 Всього замків гравця ${playerIndex + 1}: ${totalCastles}`);
    
    return totalCastles > 0;
}

/**
 * Перевіряє, чи гравець програв (немає героїв, юнітів і замків)
 * @param {number} playerIndex - індекс гравця для перевірки
 * @returns {boolean} - true якщо гравець програв, false якщо ще може грати
 */
function hasPlayerLost(playerIndex) {
    console.log(`🔍 ДЕТАЛЬНА перевірка поразки гравця ${playerIndex + 1}`);
    
    // 1. Перевіряємо чи є герої у гравця
    const playerHeroes = unitsOnMap.filter(unit => {
        return unit.playerIndex === playerIndex && unit.isHero === true;
    });
    
    console.log(`👑 Герої гравця ${playerIndex + 1}:`, playerHeroes.length);
    
    if (playerHeroes.length > 0) {
        console.log(`✅ Гравець ${playerIndex + 1} ще має ${playerHeroes.length} героїв`);
        return false;
    }
    
    // 2. Перевіряємо чи є звичайні юніти у гравця
    const playerRegularUnits = unitsOnMap.filter(unit => {
        return unit.playerIndex === playerIndex && unit.isHero !== true;
    });
    
    console.log(`⚔️ Звичайні юніти гравця ${playerIndex + 1}:`, playerRegularUnits.length);
    
    if (playerRegularUnits.length > 0) {
        console.log(`✅ Гравець ${playerIndex + 1} ще має ${playerRegularUnits.length} звичайних юнітів`);
        return false;
    }
    
    // 3. Перевіряємо чи є замки у гравця (ТІЛЬКИ ЗАМКИ, не хатки!)
    const hasCastles = checkIfPlayerHasCastles(playerIndex);
    
    if (hasCastles) {
        console.log(`✅ Гравець ${playerIndex + 1} ще має замки`);
        return false;
    }
    
    // 4. Якщо немає ні героїв, ні юнітів, ні замків - гравець програв
    console.log(`💀 Гравець ${playerIndex + 1} ПРОГРАВ! Немає героїв, юнітів і замків`);
    return true;
}

/**
 * Обробляє поразку гравця (видаляє з гри, показує повідомлення)
 * @param {number} playerIndex - індекс гравця, який програв
 */
function handlePlayerDefeat(playerIndex) {
    const player = players[playerIndex];
    if (!player) {
        console.error(`❌ Гравець ${playerIndex + 1} не знайдений`);
        return;
    }
    
    console.log(`💀 ОБРОБКА ПОРАЗКИ: Гравець ${playerIndex + 1} (${player.name}) програв!`);
    
    // 1. Показуємо повідомлення
    alert(`💀 Гравець ${playerIndex + 1} (${player.name}) програв!\nНемає героїв, юнітів і замків.`);
    
    // 2. Видаляємо всі юніти гравця з карти
    const playerUnits = unitsOnMap.filter(unit => unit.playerIndex === playerIndex);
    playerUnits.forEach(unit => {
        // Видаляємо візуальний елемент
        const wrapper = document.querySelector(`.unit-wrapper[data-unit-id="${unit.id}"]`);
        if (wrapper) {
            wrapper.remove();
        }
    });
    
    // 3. Видаляємо юнітів з масиву
    unitsOnMap = unitsOnMap.filter(unit => unit.playerIndex !== playerIndex);
    
    // 4. Позначаємо гравця як програвшого
    player.defeated = true;
    player.active = false;
    
    // 5. Перевіряємо чи залишився тільки один гравець (переможець)
    checkForWinner();
    
    console.log(`✅ Гравець ${playerIndex + 1} видалений з гри`);
}

/**
 * Перевіряє чи залишився тільки один активний гравець (переможець)
 */
function checkForWinner() {
    const activePlayers = players.filter(player => player.active && !player.defeated);
    
    if (activePlayers.length === 1) {
        const winner = activePlayers[0];
        console.log(`🏆 ПЕРЕМОЖЕЦЬ: Гравець ${winner.originalIndex + 1} (${winner.name})!`);
        
        // Показуємо повідомлення про перемогу
        setTimeout(() => {
            alert(`🏆 ПЕРЕМОГА!\nГравець ${winner.originalIndex + 1} (${winner.name}) переміг!`);
        }, 500);
        
        return true;
    }
    
    return false;
}

/**
 * Перевіряє поразку гравця після смерті юніта
 * @param {Object} unit - юніт, який загинув
 */
function checkPlayerDefeatAfterUnitDeath(unit) {
    const playerIndex = unit.playerIndex;
    
    // Затримка для того, щоб юніт встиг видалитися з unitsOnMap
    setTimeout(() => {
        // Перевіряємо чи гравець програв
        if (hasPlayerLost(playerIndex)) {
            // Гравець програв - обробляємо поразку
            handlePlayerDefeat(playerIndex);
        }
    }, 100);
}

// Експортуємо функції для використання в інших файлах
window.hasPlayerLost = hasPlayerLost;
window.handlePlayerDefeat = handlePlayerDefeat;
window.checkForWinner = checkForWinner;
window.checkPlayerDefeatAfterUnitDeath = checkPlayerDefeatAfterUnitDeath;
window.checkIfPlayerHasCastles = checkIfPlayerHasCastles;

console.log('✅ Система перевірки поразки гравця завантажена');