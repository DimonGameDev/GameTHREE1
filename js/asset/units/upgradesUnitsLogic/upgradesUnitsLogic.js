function upgradeUnit(unit) {
    if (!unit.baseUnitKey || !unit.level) {
        alert("⚠️ Неможливо прокачати цього юніта!");
        return;
    }
    
    const nextLevelNum = unit.level + 1;
    const unitData = window.unitsRegistry[unit.baseUnitKey];
    
    if (!unitData || nextLevelNum > unitData.maxLevel) {
        alert("⚠️ Це максимальний рівень!");
        return;
    }
    
    const nextLevelData = unitData.levels[nextLevelNum];
    if (!nextLevelData) {
        console.error("Не знайдено даних для рівня:", nextLevelNum);
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
        ...nextLevelData,
        x: unit.x,
        y: unit.y,
        newhp: Math.min((unit.newhp || unit.hp) + 50, nextLevelData.hp),
        playerIndex: unit.playerIndex,
        moved: unit.moved,
        attacked: unit.attacked,
        id: unit.id,
        effects: unit.effects || [],
        // Додаємо abilities з unitData
        abilities: unitData.abilities ? [...unitData.abilities] : [],
        baseUnitKey: unit.baseUnitKey,
        level: nextLevelNum
    };
    
    // Створюємо abilityInstances
    if (window.Ability && window.abilities && upgradedUnit.abilities) {
        upgradedUnit.abilityInstances = [];
        const oldAbilityInstances = unit.abilityInstances || [];
        
        upgradedUnit.abilities.forEach(abilityRef => {
            const abilityTemplate = window.abilities[abilityRef.key];
            if (abilityTemplate) {
                const fullTemplate = {
                    ...abilityTemplate,
                    power: abilityRef.power || abilityRef.value || 0
                };
                try {
                    const abilityInstance = new window.Ability(fullTemplate);
                    
                    // Переносимо cooldown зі старих здібностей
                    const oldAbility = oldAbilityInstances.find(a => 
                        a.name === abilityInstance.name
                    );
                    if (oldAbility && oldAbility.currentCooldown) {
                        abilityInstance.currentCooldown = oldAbility.currentCooldown;
                    }
                    
                    upgradedUnit.abilityInstances.push(abilityInstance);
                } catch (error) {
                    console.error('❌ Помилка створення здібності:', error);
                }
            }
        });
    }
    
    // Оновлюємо source в ефектах інших юнітів
    if (window.unitsOnMap) {
        window.unitsOnMap.forEach(otherUnit => {
            if (!otherUnit.activeEffects) return;
            
            otherUnit.activeEffects.forEach(effect => {
                if (effect.source === unit.id) {
                    effect.source = upgradedUnit.id;
                }
            });
        });
    }

    return upgradedUnit;
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
        u.baseUnitKey && u.baseUnitKey === unitTypeId
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