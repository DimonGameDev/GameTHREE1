function upgradeUnit(unit) {
    if (!unit.nextLevelId) {
        alert("⚠️ Це максимальний рівень!");
        return;
    }
    
    // Знаходимо наступний рівень по ID
    const nextLevel = window.unitsRegistry[unit.nextLevelId];
    
    if (!nextLevel) {
        console.error("Не знайдено юніта з ID:", unit.nextLevelId);
        return;
    }
    
    // Перевіряємо золото
    const currentPlayer = players[currentPlayerIndex];
    if (currentPlayer.gold < unit.upgradeCost) {
        alert(`⚠️ Недостатньо золота! Потрібно: ${unit.upgradeCost}`);
        return;
    }
    
    // Віднімаємо золото
    currentPlayer.gold -= unit.upgradeCost;
    
    // Оновлюємо відображення золота
    if (typeof goldNumber !== 'undefined' && goldNumber) {
        goldNumber.innerText = currentPlayer.gold;
    }
    
    // Створюємо прокачаного юніта
    const upgradedUnit = {
        ...nextLevel,
        x: unit.x,
        y: unit.y,
        newhp: Math.min((unit.newhp || unit.hp) + 50, nextLevel.hp),
        playerIndex: unit.playerIndex,
        moved: unit.moved,
        attacked: unit.attacked,
        id: unit.id,
        effects: unit.effects || []
    };
    
    // Замінюємо юніта на карті
    const replaced = replaceUnit(unit.id, upgradedUnit);
    
    if (!replaced) {
        console.error('❌ Не вдалося замінити юніта на карті');
        // Повертаємо золото назад
        currentPlayer.gold += unit.upgradeCost;
        if (typeof goldNumber !== 'undefined' && goldNumber) {
            goldNumber.innerText = currentPlayer.gold;
        }
        return;
    }
    
    // Оновлюємо магазин гравця
    updatePlayerAvailableUnit(
        unit.playerIndex, 
        unit.unitId, 
        nextLevel
    );
    
    alert(`✅ ${nextLevel.name} прокачано до ${nextLevel.level} рівня!`);
}

/**
 * Замінює юніта на карті новим (після апгрейду)
 * @param {number} unitId - ID юніта в масиві unitsOnMap
 * @param {object} newUnit - Новий об'єкт юніта
 */
function replaceUnit(unitId, newUnit) {
    // Знаходимо індекс юніта в масиві
    const index = unitsOnMap.findIndex(u => u.id === unitId);
    
    if (index === -1) {
        console.error(`❌ Юніт з ID ${unitId} не знайдений на карті!`);
        return false;
    }
    
    // Замінюємо юніта в масиві
    unitsOnMap[index] = newUnit;
    
    // Знаходимо і оновлюємо візуальний елемент
    const visualElement = document.querySelector(`[data-unit-id="${unitId}"]`);
    if (visualElement) {
        // Оновлюємо зображення
        visualElement.src = newUnit.img;
        // Оновлюємо позицію (якщо змінилась)
        visualElement.style.left = (newUnit.x * cellSizeAll) + "px";
        visualElement.style.top = (newUnit.y * cellSizeAll) + "px";
    } else {
        console.warn(`⚠️ Візуальний елемент юніта з ID ${unitId} не знайдений`);
    }
    
    // Оновлюємо табло якщо це вибраний юніт
    if (typeof selectedUnitForMove !== 'undefined' && selectedUnitForMove && selectedUnitForMove.id === unitId) {
        selectedUnitForMove = newUnit;
        if (typeof updateUnitTablo === 'function') {
            updateUnitTablo(newUnit);
        }
    }
    
    console.log(`✅ Юніт ${newUnit.name} (ID: ${unitId}) замінено на карті`);
    return true;
}

/**
 * Оновлює доступного юніта в магазині гравця при досягненні нового рівня
 * @param {number} playerIndex - Індекс гравця
 * @param {string} unitTypeId - Префікс unitId (наприклад "orc10" для воїнів орків)
 * @param {object} newLevelUnit - Об'єкт юніта нового рівня
 */
function updatePlayerAvailableUnit(playerIndex, unitTypeId, newLevelUnit) {
    const player = players[playerIndex];
    
    if (!player || !player.availableUnits) {
        console.error('❌ Гравець або availableUnits не знайдені!');
        return;
    }
    
    // Знаходимо індекс юніта цього типу в availableUnits
    const unitIndex = player.availableUnits.findIndex(u => 
        u.unitId && u.unitId.substring(0, 5) === unitTypeId.substring(0, 5)
    );
    
    if (unitIndex === -1) {
        console.error(`❌ Юніт типу ${unitTypeId} не знайдений в availableUnits гравця ${playerIndex + 1}`);
        console.log('Доступні юніти:', player.availableUnits.map(u => u.unitId));
        return;
    }
    
    // Замінюємо посилання на юніта новим рівнем
    player.availableUnits[unitIndex] = newLevelUnit;
    
    console.log(`✅ Оновлено юніта в магазині гравця ${playerIndex + 1}: ${newLevelUnit.name} рівень ${newLevelUnit.level}`);
}