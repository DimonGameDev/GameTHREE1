
window.unitsOnMap = unitsOnMap;


// Перевіряємо чи користувач прийшов з page1 з підтвердженням
const urlParams = new URLSearchParams(window.location.search);
const autoLoadSave = urlParams.get('loadSave') === 'true';
const loadSlotId = urlParams.get('loadSlot');
if (loadSlotId || (typeof window.hasSavedGame === 'function' && window.hasSavedGame())) {
    
    if (autoLoadSave || loadSlotId) {
        // Користувач вже підтвердив на page1 - завантажуємо без питань
        console.log('📂 Автоматичне завантаження збереженої гри (підтверджено на page1)');
        loadedFromSave = true;
        // Завантажуємо з конкретного слота або зі старого збереження
let savedState;
if (loadSlotId) {
    savedState = window.loadGameFromSlot(parseInt(loadSlotId));
    console.log(`📂 Завантаження зі слота ${loadSlotId}`);
} else {
    savedState = window.loadGameState(); // Стара система (для сумісності)
}
        
        if (savedState) {
            console.log('📂 Відновлюю стан гри...');
            
            // Відновлюємо мета-дані
            currentPlayerIndex = savedState.currentPlayerIndex;
            currentRound = savedState.currentRound;
            maxUnitsOnField = savedState.maxUnitsOnField || 30;
            
            // Відновлюємо гравців
            players = savedState.players;
            players.forEach((player, index) => {
                const raceKey = raceMap[player.race || "Орки"];
                
                // Генеруємо доступні юніти
                player.availableUnits = races[raceKey] ? [...races[raceKey]] : [];
                
                // Застосовуємо кольори до юнітів
                if (player.availableUnits && Array.isArray(player.availableUnits)) {
                    player.availableUnits = player.availableUnits.map(unit => {
                        if (window.createColoredUnit) {
                            return window.createColoredUnit(unit, player.originalIndex);
                        }
                        return unit;
                    });
                    console.log(`🎨 Регенеровано ${player.availableUnits.length} юнітів для гравця ${player.originalIndex + 1}`);
                }
            });
            const castleImages = [
                "../../img/map/castle/red/castleRed.jpeg",
                "../../img/map/castle/blue/castleBlue.jpeg",
                "../../img/map/castle/green/castleGreen.jpeg",
                "../../img/map/castle/yellow/castleYellow.jpeg"
            ];
            const neutralCastleImage = "../../img/map/castle/castleStartFon/castleStartFon.jpeg";
            
            castles.forEach(castle => {
                console.count("ALL CELLS SEARCH");
                const cells = map.querySelectorAll('.cell');
                cells.forEach(cell => {
                    const cellX = parseInt(cell.dataset.x);
                    const cellY = parseInt(cell.dataset.y);
                    
                    if (cellX === castle.x && cellY === castle.y) {
                        const originalIndex = castle.playerIndex;
                        const activePlayer = players.find(p => p.originalIndex === originalIndex);
                        
                        if (activePlayer) {
                            cell.style.backgroundImage = `url(${castleImages[originalIndex]})`;
                        } else {
                            cell.style.backgroundImage = `url(${neutralCastleImage})`;
                        }
                    }
                });
            });
            
            console.log('🏰 Замки оновлено');
            
            // Відновлюємо захоплені хатки
            // Відновлюємо захоплені хатки
if (savedState.capturedGoldHouses) {
    window.capturedGoldHouses = savedState.capturedGoldHouses;
    
    // Відновлюємо візуальне відображення
    window.capturedGoldHouses.forEach(house => {
        if (typeof window.updateGoldHouseVisual === 'function') {
            window.updateGoldHouseVisual(house.x, house.y, house.playerIndex);
        }
    });
    
    console.log(`🏠 Відновлено ${window.capturedGoldHouses.length} хаток`);
}
            
            // Відновлюємо юнітів (регенеруємо через шаблони для здібностей)
unitsOnMap = savedState.units.map(savedUnit => {
    // Знаходимо шаблон юніта
    let templateUnit = null;
    
    if (savedUnit.isHero) {
        // ✅ НОВИЙ ПІДХІД: Створюємо героя заново з правильним кольором
        
        // Знаходимо шаблон героя за іменем (якщо heroTemplateId відсутній)
        let heroIndex = -1;
        if (savedUnit.heroTemplateId) {
            heroIndex = savedUnit.heroTemplateId - 1;
        } else {
            // Шукаємо за іменем для старих збережень
            heroIndex = window.heroes.findIndex(h => h.name === savedUnit.name);
            console.log(`🔧 Знайдено героя ${savedUnit.name} за іменем, індекс: ${heroIndex}`);
        }
        
        if (heroIndex >= 0 && window.heroes[heroIndex]) {
            const heroTemplate = window.heroes[heroIndex];
            const player = players[savedUnit.playerIndex];
            
            // Створюємо героя ЗАНОВО з шаблону
            templateUnit = {
                ...heroTemplate,
                abilitiesProgress: heroTemplate.abilitiesProgress.map(ability => ({...ability})),
                effects: heroTemplate.effects ? [...heroTemplate.effects] : [],
            };
            
            // Встановлюємо правильне кольорове зображення
            if (window.getColoredHeroImage && player) {
                templateUnit.img = window.getColoredHeroImage(heroTemplate.img, player.originalIndex);
                console.log(`🎨 Створено героя ${heroTemplate.name} з кольором гравця ${player.originalIndex + 1}`);
            }
            
            // Зберігаємо heroTemplateId для майбутніх збережень
            templateUnit.heroTemplateId = heroTemplate.id;
        } else {
            console.error(`❌ Не знайдено шаблон героя для ${savedUnit.name}`);
            templateUnit = { ...savedUnit };
        }
        
        // Створюємо відновленого юніта
        const restoredUnit = templateUnit ? { ...templateUnit } : { ...savedUnit };
        
        // Відновлюємо ЗБЕРЕЖЕНІ дані (позицію, стан, прогрес)
        restoredUnit.id = savedUnit.id;
        restoredUnit.playerIndex = savedUnit.playerIndex;
        restoredUnit.originalIndex = savedUnit.originalIndex;
        restoredUnit.x = savedUnit.x;  // ← Позиція зі збереження
        restoredUnit.y = savedUnit.y;  // ← Позиція зі збереження
        restoredUnit.hp = savedUnit.hp;
        restoredUnit.newhp = savedUnit.newhp;
        restoredUnit.moved = savedUnit.moved;
        restoredUnit.attacked = savedUnit.attacked;
        restoredUnit.canAttack = savedUnit.canAttack;
        restoredUnit.effects = savedUnit.effects || [];
        restoredUnit.activeEffects = savedUnit.activeEffects || [];
        restoredUnit.isHero = true;
        restoredUnit.maxHp = savedUnit.hp || heroTemplate.hp;
        
        // Відновлюємо прогрес героя зі збереження
        restoredUnit.level = savedUnit.level;
        restoredUnit.LevelAttack = savedUnit.LevelAttack;
        restoredUnit.LevelArmor = savedUnit.LevelArmor;
        restoredUnit.abilitiesProgress = savedUnit.abilitiesProgress;
        
        // Ініціалізуємо здібності
        if (window.AbilityFactory) {
            restoredUnit.abilityInstances = AbilityFactory.createAbilities(restoredUnit);
            console.log(`✨ Відновлено ${restoredUnit.abilityInstances.length} здібностей для ${restoredUnit.name}`);
        }
        // ✅ Відновлюємо кулдауни здібностей героїв
if (savedState.heroCooldowns && window.heroAbilitySystem) {
    savedState.heroCooldowns.forEach(([key, value]) => {
        window.heroAbilitySystem.currentCooldowns.set(key, value);
    });
    console.log(`⏱️ Відновлено ${savedState.heroCooldowns.length} кулдаунів здібностей`);
}
    //     // ✅ КЛЮЧОВИЙ МОМЕНТ: Ініціалізуємо здібності
    // if (window.AbilityFactory) {
    //     restoredUnit.abilityInstances = AbilityFactory.createAbilities(restoredUnit);
    //     console.log(`✨ Відновлено ${restoredUnit.abilityInstances.length} здібностей для ${restoredUnit.name}`);
    // }
        return restoredUnit;
    }
    
    
    
    return restoredUnit;
});
window.unitsOnMap = unitsOnMap;
            
            console.log(`✅ Відновлено: ${players.length} гравців, ${unitsOnMap.length} юнітів, раунд ${currentRound}`);
// ✅ ДОДАНО: Відновлюємо кулдауни здібностей героїв
if (savedState.heroCooldowns && window.heroActiveAbilitySystem) {
    window.heroActiveAbilitySystem.currentCooldowns.clear(); // Спочатку очищаємо
    savedState.heroCooldowns.forEach(([key, value]) => {
        window.heroActiveAbilitySystem.currentCooldowns.set(key, value);
    });
    console.log(`⏱️ Відновлено ${savedState.heroCooldowns.length} кулдаунів здібностей`);
} else {
    console.warn('⚠️ Кулдауни не відновлено:', {
        hasCooldowns: !!savedState.heroCooldowns,
        hasSystem: !!window.heroActiveAbilitySystem
    });
}
            if (maxUnits) {
                maxUnits.innerText = maxUnitsOnField;
                console.log(`📊 Оновлено maxUnits: ${maxUnitsOnField}`);
            } else {
                console.error('❌ maxUnits елемент не знайдено!');
            }
            
            if (typeof goldNumber !== 'undefined') {
                goldNumber.innerText = players[currentPlayerIndex].gold;
            }
            
            if (typeof flagTopNumberPlayer !== 'undefined') {
                flagTopNumberPlayer.innerText = players[currentPlayerIndex].originalIndex + 1;
            }
            
            if (typeof FlagColorPlayer !== 'undefined') {
                FlagColorPlayer.style.backgroundColor = colorFlag[players[currentPlayerIndex].originalIndex];
                console.log(`🚩 Прапор встановлено для гравця ${players[currentPlayerIndex].originalIndex + 1}: ${colorFlag[players[currentPlayerIndex].originalIndex]}`);
            }
        }
        
    } else {
        // Звичайний діалог (якщо користувач прийшов не з page1)
       // console.log('🔍 ТЕСТ: Знайдено збережену гру!');
        //console.log('🔍 ТЕСТ: Зараз показую діалог...');
        
        const userChoice = confirm('🎮 Знайдено збережену гру!\n\nПродовжити збережену гру?');
        //console.log('🔍 ТЕСТ: Вибір користувача:', userChoice);
        
        if (userChoice) {
            loadedFromSave = true;
            // Завантажуємо з конкретного слота або зі старого збереження
let savedState;
if (loadSlotId) {
    savedState = window.loadGameFromSlot(parseInt(loadSlotId));
    console.log(`📂 Завантаження зі слота ${loadSlotId}`);
} else {
    savedState = window.loadGameState(); // Стара система (для сумісності)
}
            
            if (savedState) {
                console.log('📂 Відновлюю стан гри...');
                
                // Відновлюємо мета-дані
                currentPlayerIndex = savedState.currentPlayerIndex;
                currentRound = savedState.currentRound;
                maxUnitsOnField = savedState.maxUnitsOnField || 30;
                // Відновлюємо гравців
                players = savedState.players;
                players.forEach((player, index) => {
                    const raceKey = raceMap[player.race || "Орки"];
                    
                    // Генеруємо доступні юніти
                    player.availableUnits = races[raceKey] ? [...races[raceKey]] : [];
                    
                    // Застосовуємо кольори до юнітів
                    if (player.availableUnits && Array.isArray(player.availableUnits)) {
                        player.availableUnits = player.availableUnits.map(unit => {
                            if (window.createColoredUnit) {
                                return window.createColoredUnit(unit, player.originalIndex);
                            }
                            return unit;
                        });
                        //console.log(`🎨 Регенеровано ${player.availableUnits.length} юнітів для гравця ${player.originalIndex + 1}`);
                    }
                });
                const castleImages = [
                    "../../img/map/castle/red/castleRed.jpeg",
                    "../../img/map/castle/blue/castleBlue.jpeg",
                    "../../img/map/castle/green/castleGreen.jpeg",
                    "../../img/map/castle/yellow/castleYellow.jpeg"
                ];
                const neutralCastleImage = "../../img/map/castle/castleStartFon/castleStartFon.jpeg";
                
                castles.forEach(castle => {
                    const cells = map.querySelectorAll('.cell');
                    cells.forEach(cell => {
                        const cellX = parseInt(cell.dataset.x);
                        const cellY = parseInt(cell.dataset.y);
                        
                        if (cellX === castle.x && cellY === castle.y) {
                            const originalIndex = castle.playerIndex;
                            const activePlayer = players.find(p => p.originalIndex === originalIndex);
                            
                            if (activePlayer) {
                                cell.style.backgroundImage = `url(${castleImages[originalIndex]})`;
                            } else {
                                cell.style.backgroundImage = `url(${neutralCastleImage})`;
                            }
                        }
                    });
                });
                
                console.log('🏰 Замки оновлено');
                
                // Відновлюємо захоплені хатки
                // Відновлюємо захоплені хатки
if (savedState.capturedGoldHouses) {
    window.capturedGoldHouses = savedState.capturedGoldHouses;
    
    // Відновлюємо візуальне відображення
    window.capturedGoldHouses.forEach(house => {
        if (typeof window.updateGoldHouseVisual === 'function') {
            window.updateGoldHouseVisual(house.x, house.y, house.playerIndex);
        }
    });
    
    console.log(`🏠 Відновлено ${window.capturedGoldHouses.length} хаток`);
}
                
                // Відновлюємо юнітів (регенеруємо через шаблони для здібностей)
unitsOnMap = savedState.units.map(savedUnit => {
    // Знаходимо шаблон юніта
    let templateUnit = null;
    
    if (savedUnit.isHero && savedUnit.heroTemplateId) {
        // Для героїв - знаходимо шаблон з window.heroes
        templateUnit = window.heroes[savedUnit.heroTemplateId - 1];
    } else if (savedUnit.unitId) {
        // Для звичайних юнітів - знаходимо в availableUnits гравця
        // ✅ ВИПРАВЛЕНО: Шукаємо гравця за playerIndex, а не originalIndex
        const player = players[savedUnit.playerIndex];
        console.log(`🔍 Шукаю шаблон для ${savedUnit.name}, unitId: ${savedUnit.unitId}, playerIndex: ${savedUnit.playerIndex}`);
        
        if (player && player.availableUnits) {
            templateUnit = player.availableUnits.find(u => u.unitId === savedUnit.unitId);
            console.log(`🔍 Знайдено шаблон:`, templateUnit ? `${templateUnit.name} (${templateUnit.unitId})` : 'НЕ ЗНАЙДЕНО');
            console.log(`🔍 Abilities в шаблоні:`, templateUnit?.abilities);
        } else {
            console.warn(`⚠️ Гравець не знайдений для playerIndex: ${savedUnit.playerIndex}`);
        }
    }
    
    // Створюємо новий об'єкт юніта на основі шаблону
    const restoredUnit = templateUnit ? { ...templateUnit } : { ...savedUnit };
    
          // Відновлюємо збережені дані (НЕ використовуємо Object.assign, щоб не перезаписати abilities)
    restoredUnit.id = savedUnit.id;
    restoredUnit.playerIndex = savedUnit.playerIndex;
    restoredUnit.originalIndex = savedUnit.originalIndex;
    restoredUnit.x = savedUnit.x;
    restoredUnit.y = savedUnit.y;
    restoredUnit.hp = savedUnit.hp;
    restoredUnit.newhp = savedUnit.newhp;
    restoredUnit.moved = savedUnit.moved;
    restoredUnit.attacked = savedUnit.attacked;
    restoredUnit.canAttack = savedUnit.canAttack;
    restoredUnit.effects = savedUnit.effects || [];
    restoredUnit.activeEffects = savedUnit.activeEffects || [];
    // abilities залишається з шаблону! ✅
    
        // Для героїв - відновлюємо прогрес і регенеруємо зображення
        if (savedUnit.isHero) {
            restoredUnit.level = savedUnit.level;
            restoredUnit.LevelAttack = savedUnit.LevelAttack;
            restoredUnit.LevelArmor = savedUnit.LevelArmor;
            restoredUnit.abilitiesProgress = savedUnit.abilitiesProgress;
            
            // ✅ РЕГЕНЕРУЄМО ЗОБРАЖЕННЯ з правильним кольором
            if (restoredUnit.heroTemplateId && window.getColoredHeroImage) {
                const heroTemplate = window.heroes[restoredUnit.heroTemplateId - 1];
                if (heroTemplate) {
                    const player = players[savedUnit.playerIndex];
                    const colorIndex = player ? player.originalIndex : savedUnit.playerIndex;
                    restoredUnit.img = window.getColoredHeroImage(heroTemplate.img, colorIndex);
                    console.log(`🎨 Регенеровано зображення героя ${restoredUnit.name} з кольором гравця ${colorIndex + 1}`);
                }
            }
        }
    
    // ✅ КЛЮЧОВИЙ МОМЕНТ: Ініціалізуємо здібності
    if (window.AbilityFactory) {
        restoredUnit.abilityInstances = AbilityFactory.createAbilities(restoredUnit);
        console.log(`✨ Відновлено ${restoredUnit.abilityInstances.length} здібностей для ${restoredUnit.name}`);
    }
    // ✅ Відновлюємо кулдауни здібностей героїв
if (savedState.heroCooldowns && window.heroAbilitySystem) {
    savedState.heroCooldowns.forEach(([key, value]) => {
        window.heroAbilitySystem.currentCooldowns.set(key, value);
    });
    console.log(`⏱️ Відновлено ${savedState.heroCooldowns.length} кулдаунів здібностей`);
}
    
    return restoredUnit;
});
window.unitsOnMap = unitsOnMap;
                
                console.log(`✅ Відновлено: ${players.length} гравців, ${unitsOnMap.length} юнітів, раунд ${currentRound}`);
                // ✅ ДОДАНО: Відновлюємо кулдауни здібностей героїв
if (savedState.heroCooldowns && window.heroActiveAbilitySystem) {
    window.heroActiveAbilitySystem.currentCooldowns.clear();
    savedState.heroCooldowns.forEach(([key, value]) => {
        window.heroActiveAbilitySystem.currentCooldowns.set(key, value);
    });
    console.log(`⏱️ Відновлено ${savedState.heroCooldowns.length} кулдаунів здібностей`);
} else {
    console.warn('⚠️ Кулдауни не відновлено:', {
        hasCooldowns: !!savedState.heroCooldowns,
        hasSystem: !!window.heroActiveAbilitySystem
    });
}
                // if (typeof window.applyTileDefenseBonuses === 'function') {
                //     unitsOnMap.forEach(unit => {
                //         window.applyTileDefenseBonuses(unit);
                //     });
                //     console.log('🛡️ Бонуси клітинок застосовано до всіх юнітів');
                // }
                if (typeof maxUnits !== 'undefined') {
                    maxUnits.innerText = maxUnitsOnField;
                }

                
                
                if (typeof goldNumber !== 'undefined') {
                    goldNumber.innerText = players[currentPlayerIndex].gold;
                }
                
                if (typeof flagTopNumberPlayer !== 'undefined') {
                    flagTopNumberPlayer.innerText = players[currentPlayerIndex].originalIndex + 1;
                }
                
                if (typeof FlagColorPlayer !== 'undefined') {
                    FlagColorPlayer.style.backgroundColor = colorFlag[players[currentPlayerIndex].originalIndex];
                    console.log(`🚩 Прапор встановлено для гравця ${players[currentPlayerIndex].originalIndex + 1}: ${colorFlag[players[currentPlayerIndex].originalIndex]}`);
                }
            }
        } else {
            window.deleteSavedGame();
            console.log('🗑️ Збережену гру видалено, починаємо нову');
        }
    }
}

if (!loadedFromSave) {
    let savedSettings = localStorage.getItem("gameSettings");
    
    if (savedSettings) {
    // ===== НОВА ГРА - ЗАВАНТАЖЕННЯ НАЛАШТУВАНЬ =====
    // console.log("🆕 Початок нової гри...");
    
    let gameSettings = JSON.parse(savedSettings);
    
    // Підготовка даних всіх 4 гравців
   // Підготовка даних всіх 4 гравців
const allPlayers = gameSettings.players.map((p, originalIndex) => {
    const raceKey = raceMap[p.race || "Орки"];
    
    return {
        originalIndex: originalIndex,
        race: p.race || "Орки",
        type: p.type || "пусто",
        clan: p.clan || 1,
        gold: typeof p.gold === "number" ? p.gold : 2000,
        heroes: p.heroes || [],
        active: p.active !== undefined ? p.active : (p.type === "гравець"),
        heroUnits: [],
        unitMana: {
            warrior: 0,
            archer: 0,
            shaman: 0,
            horse: 0,
            pikener: 0,
            horseman: 0,
            catapult: 0,
            wisp: 0 
        },
        // ⬇️ ДОДАЙТЕ ЦЕ: Кожен гравець має свою копію юнітів
        availableUnits: races[raceKey] ? [...races[raceKey]] : []
        // Спочатку це просто масив посилань на level1 юнітів
    };
});
    
    // ✅ Фільтруємо: залишаємо ТІЛЬКИ активних гравців
    players = allPlayers.filter(p => p.active);
    // ✅ ЗАСТОСОВУЄМО КОЛЬОРИ ДО ЮНІТІВ кожного активного гравця
players.forEach((player, index) => {
    if (player.availableUnits && Array.isArray(player.availableUnits)) {
        // Застосовуємо колір на основі originalIndex
        player.availableUnits = player.availableUnits.map(unit => {
            if (window.createColoredUnit) {
                return window.createColoredUnit(unit, player.originalIndex);
            }
            return unit;
        });
        console.log(`🎨 Застосовано колір для юнітів гравця ${player.originalIndex + 1}`);
    }
});
    // Оновлюємо замки після створення гравців
const castleImages = [
    "../../img/map/castle/red/castleRed.jpeg",
    "../../img/map/castle/blue/castleBlue.jpeg",
    "../../img/map/castle/green/castleGreen.jpeg",
    "../../img/map/castle/yellow/castleYellow.jpeg"
  ];
  const neutralCastleImage = "../../img/map/castle/castleStartFon/castleStartFon.jpeg";
  
  castles.forEach(castle => {
    const cells = map.querySelectorAll('.cell');
    cells.forEach(cell => {
      const cellX = parseInt(cell.dataset.x);
      const cellY = parseInt(cell.dataset.y);
      
      if (cellX === castle.x && cellY === castle.y) {
        const originalIndex = castle.playerIndex;
        const activePlayer = players.find(p => p.originalIndex === originalIndex);
        
        if (activePlayer) {
          cell.style.backgroundImage = `url(${castleImages[originalIndex]})`;
        } else {
          cell.style.backgroundImage = `url(${neutralCastleImage})`;
        }
      }
    });
  });
    players.forEach((player, index) => {
        if (typeof window.updatePlayerUnitsColor === 'function') {
            window.updatePlayerUnitsColor(index);
        }
    });
    
    if (players.length === 0) {
        alert('❌ Немає активних гравців! Поверніться назад і налаштуйте гравців.');
        window.location.href = '../page2/page2.html';
        throw new Error('No active players');
    }
    
    //console.log(`✅ Активних гравців: ${players.length} з ${allPlayers.length}`);
    
    // Максимальна кількість юнітів на полі
    maxUnitsOnField = gameSettings.units || 30;
    
    // Початкові налаштування
    currentPlayerIndex = 0;  // Починає перший активний гравець
    
    // Виводимо детальну інформацію про гравців
    // console.log('📋 Список активних гравців:');
    players.forEach((player, index) => {
   
    });
    
    // Оновлюємо UI для першого гравця
    if (typeof maxUnits !== 'undefined') {
        maxUnits.innerText = maxUnitsOnField;
    }
    
    if (typeof goldNumber !== 'undefined') {
        goldNumber.innerText = players[currentPlayerIndex].gold;
    }
    
    if (typeof flagTopNumberPlayer !== 'undefined') {
        flagTopNumberPlayer.innerText = players[currentPlayerIndex].originalIndex + 1;
    }
    
    if (typeof FlagColorPlayer !== 'undefined') {
        // ✅ ВИПРАВЛЕНО: Використовуємо originalIndex
        FlagColorPlayer.style.backgroundColor = colorFlag[players[currentPlayerIndex].originalIndex];
        console.log(`🚩 Прапор встановлено для гравця ${players[currentPlayerIndex].originalIndex + 1}: ${colorFlag[players[currentPlayerIndex].originalIndex]}`);
    }
    
    //console.log('✅ Дані гри ініціалізовані успішно!');
    
} else {
    // ===== ПОМИЛКА: НЕМАЄ ДАНИХ =====
    // console.error('❌ Немає налаштувань гри!');
    alert('⚠️ Налаштування гри не знайдено!\n\nПоверніться на сторінку налаштувань.');
    window.location.href = '../page2/page2.html';
    throw new Error('No game settings found');
}
} // закриває if (!loadedFromSave)


// console.log('🎯 gameData експортовано:', window.gameData);

// ============================================
// ВІДНОВЛЕННЯ ВІЗУАЛЬНИХ ЕЛЕМЕНТІВ
// ============================================

if (loadedFromSave && unitsOnMap.length > 0) {
    setTimeout(() => {
        console.log('🎨 Створюю візуальні елементи для збережених юнітів...');
        
        unitsOnMap.forEach(unit => {
            // ✅ ДОДАНО: Регенеруємо зображення для героїв
            if (unit.isHero && unit.heroTemplateId) {
                const heroTemplate = window.heroes[unit.heroTemplateId - 1];
                if (heroTemplate && window.getColoredHeroImage) {
                    // 🔍 ДІАГНОСТИКА: Виводимо інформацію про юніта
                    console.log(`🔍 Герой ${unit.name} (ID: ${unit.heroTemplateId}):`, {
                       playerIndex: unit.playerIndex,
                        originalIndex: unit.originalIndex
                    });
                    
                    // ✅ ВИПРАВЛЕННЯ: Знаходимо правильний originalIndex через гравця
                    let correctOriginalIndex = unit.originalIndex;
                    
                    // Якщо originalIndex відсутній або неправильний, шукаємо через playerIndex
                    if (correctOriginalIndex === undefined || correctOriginalIndex === null) {
                        const player = players[unit.playerIndex];
                        correctOriginalIndex = player ? player.originalIndex : 0;
                        console.warn(`⚠️ У героя ${unit.name} немає originalIndex, використовую ${correctOriginalIndex} з гравця`);
                    }
                    
                    unit.img = window.getColoredHeroImage(heroTemplate.img, correctOriginalIndex);
                    //console.log(`🎨 Регенеровано img для героя ${unit.heroTemplateId} з кольором гравця ${correctOriginalIndex + 1}`);
                }
            }
            
            // ✅ ДОДАНО: Регенеруємо зображення для звичайних юнітів
            if (!unit.isHero && unit.unitId) {
                if (unit.name && unit.originalIndex !== undefined) {
                    // Простий варіант - використовуємо збережені дані
                    console.log(`⚠️ Юніт ${unit.name} потребує img - пропускаємо поки що`);
                    return;
                }
            }
            
            // Створюємо візуальний елемент
            if (!unit.img) {
                console.warn(`⚠️ Юніт ${unit.name || unit.id} не має зображення, пропускаю`);
                return;
            }
            
            if (unit.isHero && typeof createHeroVisual === 'function') {
                createHeroVisual(unit);
            } else if (typeof createUnitVisual === 'function') {
                createUnitVisual(unit);
            }
        });
        if (typeof window.applyTileDefenseBonuses === 'function') {
            unitsOnMap.forEach(unit => {
                window.applyTileDefenseBonuses(unit);
            });
            console.log('🛡️ Бонуси клітинок застосовано до всіх юнітів');
        }
        // Оновлюємо дисплей
        if (typeof updatePlayerDisplay === 'function') {
            updatePlayerDisplay();
        }
        
        console.log('✅ Гру повністю відновлено!');
    }, 500);
}
// ============================================
// ЕКСПОРТ ДАНИХ ДЛЯ ВИКОРИСТАННЯ В ІНШИХ ФАЙЛАХ
// ============================================

// Глобальний об'єкт з даними гри
window.gameData = {
    players: players,
    currentPlayerIndex: currentPlayerIndex,
    unitsOnMap: unitsOnMap,
    maxUnitsOnField: maxUnitsOnField,
    colorFlag: colorFlag
};

// console.log('🎯 gameData експортовано:', window.gameData);

console.log("лоадінгОМАПааааааааа");