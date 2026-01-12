
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
            console.log('🔧 ТЕСТ: loadedFromSave =', loadedFromSave);
            console.log('🔧 ТЕСТ: window.getColoredHeroImage =', typeof window.getColoredHeroImage);
            console.log('🔧 ТЕСТ: window.heroes =', window.heroes ? 'доступно' : 'недоступно');
            // Відновлюємо мета-дані
            currentPlayerIndex = savedState.currentPlayerIndex;
            currentRound = savedState.currentRound;
            maxUnitsOnField = savedState.maxUnitsOnField || 30;
            
            // Відновлюємо гравців
            // Відновлюємо гравців
            players = savedState.players;
            
            console.log('📊 ГРАВЦІ ПІСЛЯ ЗАВАНТАЖЕННЯ:', players.map((p, i) => ({
                index: i,
                originalIndex: p.originalIndex,
                race: p.race,
                availableUnitsCount: p.availableUnits ? p.availableUnits.length : 0
            })));
            // console.log('🔧 ПЕРЕВІРКА ФУНКЦІЙ ПІД ЧАС ЗАВАНТАЖЕННЯ:');
            // console.log('- window.getColoredHeroImage:', typeof window.getColoredHeroImage);
            // console.log('- window.heroes:', window.heroes ? `масив з ${window.heroes.length} героями` : 'не визначено');
            // console.log('- players:', players.length, 'гравців');
            players.forEach((player, index) => {
                const raceKey = raceMap[player.race || "Орки"];
                const raceUnitsList = races[raceKey] || [];
                
                // ✅ ВИПРАВЛЕНО: Якщо є збережені availableUnits - використовуємо їх
                if (player.availableUnits && player.availableUnits.length > 0) {
                    // Відновлюємо збережені юніти з правильними рівнями та upgradeCost
                    console.log(`✅ Відновлюю ${player.availableUnits.length} юнітів зі збереження для гравця ${player.originalIndex + 1}`);
                    
                    // Знаходимо повні шаблони для кожного юніта
                    player.availableUnits = player.availableUnits.map(savedUnit => {
                        // Шукаємо повний шаблон юніта
                        const fullTemplate = raceUnitsList.find(unit => 
                            unit.unitId === savedUnit.unitId || unit.name === savedUnit.name
                        );
                        
                        if (fullTemplate) {
                            // Створюємо повний об'єкт юніта з шаблону
                            const restoredUnit = { ...fullTemplate };
                            
                            // Оновлюємо збережені поля (рівень, upgradeCost тощо)
                            restoredUnit.level = savedUnit.level || 1;
                            restoredUnit.upgradeCost = savedUnit.upgradeCost || fullTemplate.upgradeCost;
                            restoredUnit.coin = savedUnit.coin || fullTemplate.coin;
                            restoredUnit.img = savedUnit.img || fullTemplate.img;
                            
                            return restoredUnit;
                        } else {
                            // console.warn(`⚠️ Не знайдено шаблон для юніта:`, savedUnit);
                            return savedUnit;
                        }
                    });
                    
                    // Застосовуємо кольори до відновлених юнітів
                    if (window.createColoredUnit) {
                        player.availableUnits = player.availableUnits.map(unit => 
                            window.createColoredUnit(unit, player.originalIndex)
                        );
                    }
                } else {
                    // Старий код: генеруємо доступні юніти з базових шаблонів
                    // console.log(`⚠️ Немає збережених availableUnits, генерую з базових шаблонів для гравця ${player.originalIndex + 1}`);
                    player.availableUnits = [...raceUnitsList];
                    
                    // Застосовуємо кольори до юнітів
                    if (player.availableUnits && Array.isArray(player.availableUnits)) {
                        player.availableUnits = player.availableUnits.map(unit => {
                            if (window.createColoredUnit) {
                                return window.createColoredUnit(unit, player.originalIndex);
                            }
                            return unit;
                        });
                    }
                }
                
                // console.log(`🎨 Регенеровано ${player.availableUnits.length} юнітів для гравця ${player.originalIndex + 1}`);
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
            console.log('📊 ЮНІТИ ДЛЯ ВІДНОВЛЕННЯ:', savedState.units.map(u => ({
                name: u.name,
                isHero: u.isHero,
                playerIndex: u.playerIndex,
                originalIndex: u.originalIndex,
                heroTemplateId: u.heroTemplateId
                
            }))); 
            console.log('🔍 ДЕТАЛЬНА ПЕРЕВІРКА ГЕРОЇВ ПІСЛЯ ЗАВАНТАЖЕННЯ:');
            savedState.units.forEach((unit, index) => {
                if (unit.isHero) {
                    console.log(`  Герой ${unit.name}:`, {
                        playerIndex: unit.playerIndex,
                        originalIndex: unit.originalIndex,
                        heroTemplateId: unit.heroTemplateId
                    });
                }
            });            
unitsOnMap = savedState.units.map(savedUnit => {
    // Знаходимо шаблон юніта
    let templateUnit = null;
    
    if (savedUnit.isHero) {
        // Для героїв - знаходимо шаблон з window.heroes
        if (savedUnit.heroTemplateId) {
            templateUnit = window.heroes[savedUnit.heroTemplateId - 1];
        }
        // Якщо heroTemplateId відсутній, шукаємо за ім'ям
        else if (window.heroes) {
            templateUnit = window.heroes.find(h => h.name === savedUnit.name);
            if (templateUnit) {
                console.log(`🔍 Знайдено шаблон героя ${savedUnit.name} за ім'ям`);
            }
        }
    } else if (savedUnit.unitId) {
                // Для звичайних юнітів - знаходимо в availableUnits гравця
        // ✅ ВИПРАВЛЕНО: Шукаємо гравця за playerIndex
        console.log(`🔍 ПОШУК ГРАВЦЯ ДЛЯ ЮНІТА ${savedUnit.name}:`, {
            playerIndex: savedUnit.playerIndex,
            originalIndex: savedUnit.originalIndex,
            players: players.map((p, i) => ({ index: i, originalIndex: p.originalIndex, playerIndex: i }))
        });
        const player = players[savedUnit.playerIndex];
        // console.log(`🔍 РЕЗУЛЬТАТ:`, player ? `Знайдено гравець з originalIndex=${player.originalIndex}` : 'Гравець не знайдений');
        // console.log(`🔍 Шукаю шаблон для ${savedUnit.name}, unitId: ${savedUnit.unitId}, playerIndex: ${savedUnit.playerIndex}`);
        
        if (player && player.availableUnits) {
            templateUnit = player.availableUnits.find(u => u.unitId === savedUnit.unitId);
            // console.log(`🔍 Знайдено шаблон:`, templateUnit ? `${templateUnit.name} (${templateUnit.unitId})` : 'НЕ ЗНАЙДЕНО');
            // console.log(`🔍 Abilities в шаблоні:`, templateUnit?.abilities);
        } else {
            // console.warn(`⚠️ Гравець не знайдений для playerIndex: ${savedUnit.playerIndex}`);
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
// ✅ ДОДАНО: Відновлюємо originalStep для ефекту "Коріння"
if (savedUnit.originalStep !== undefined) {
    restoredUnit.originalStep = savedUnit.originalStep;
    restoredUnit.step = 0; // Юніт все ще знерухомлений
    console.log(`🌿 ${restoredUnit.name} відновлено знерухомлення (originalStep: ${restoredUnit.originalStep})`);
}
        // Для героїв - відновлюємо прогрес і регенеруємо зображення
        if (savedUnit.isHero) {
                        // 🔧 Якщо heroTemplateId відсутній, намагаємося його знайти
                        if (!restoredUnit.heroTemplateId && templateUnit && templateUnit.id) {
                            console.log(`⚠️ У героя ${restoredUnit.name} немає heroTemplateId, встановлюю ${templateUnit.id}`);
                            restoredUnit.heroTemplateId = templateUnit.id;
                        }
                        
                        // 🔧 Або спробуємо знайти за ім'ям
                        if (!restoredUnit.heroTemplateId && window.heroes) {
                            const foundHero = window.heroes.find(h => h.name === restoredUnit.name);
                            if (foundHero) {
                                console.log(`🔍 Знайдено героя ${restoredUnit.name} за ім'ям, ID: ${foundHero.id}`);
                                restoredUnit.heroTemplateId = foundHero.id;
                            }
                        }
            restoredUnit.level = savedUnit.level;
            if (savedUnit.upgradeCost !== undefined && savedUnit.upgradeCost !== null) {
                restoredUnit.upgradeCost = savedUnit.upgradeCost;
            } else if (templateUnit) {
                restoredUnit.upgradeCost = templateUnit.upgradeCost;
            }
           console.log(`📊 Відновлено рівень ${restoredUnit.level} для ${restoredUnit.name}, upgradeCost: ${restoredUnit.upgradeCost} (з збереження: ${savedUnit.upgradeCost})`);
            restoredUnit.LevelAttack = savedUnit.LevelAttack;
            restoredUnit.LevelArmor = savedUnit.LevelArmor;
            restoredUnit.abilitiesProgress = savedUnit.abilitiesProgress;
            // ✅ ДОДАНО: Створюємо abilities з abilitiesProgress для AbilityFactory
            if (savedUnit.abilitiesProgress && Array.isArray(savedUnit.abilitiesProgress)) {
                restoredUnit.abilities = savedUnit.abilitiesProgress.map(progress => progress.abilityId);
            }
            console.log(`🔍 ДАНІ ГЕРОЯ ${restoredUnit.name}:`, {
                heroTemplateId: restoredUnit.heroTemplateId,
                hasHeroTemplateId: !!restoredUnit.heroTemplateId,
                isHero: restoredUnit.isHero,
                playerIndex: restoredUnit.playerIndex,
                originalIndex: restoredUnit.originalIndex
            });
            console.log(`🔍 ПЕРЕВІРКА РЕГЕНЕРАЦІЇ ГЕРОЯ ${restoredUnit.name}:`, {
                isHero: restoredUnit.isHero,
                hasHeroTemplateId: !!restoredUnit.heroTemplateId,
                heroTemplateId: restoredUnit.heroTemplateId,
                hasGetColoredHeroImage: !!window.getColoredHeroImage,
                typeofGetColoredHeroImage: typeof window.getColoredHeroImage
            });
           // ✅ РЕГЕНЕРУЄМО ЗОБРАЖЕННЯ з правильним кольором
           if (restoredUnit.heroTemplateId && window.getColoredHeroImage) {
            const heroTemplate = window.heroes[restoredUnit.heroTemplateId - 1];
            if (heroTemplate) {
                console.log(`🎨 ПЕРША РЕГЕНЕРАЦІЯ ГЕРОЯ ${restoredUnit.name}:`, {
                    playerIndex: restoredUnit.playerIndex,
                    originalIndex: restoredUnit.originalIndex,
                    savedUnitOriginalIndex: savedUnit.originalIndex,
                    players: players.map((p, i) => ({ index: i, originalIndex: p.originalIndex }))
                });
                
                // ✅ ВИПРАВЛЕНО: Знаходимо гравця за playerIndex
                const player = players[restoredUnit.playerIndex];
                const colorIndex = player ? player.originalIndex : (restoredUnit.originalIndex || 0);
                
                console.log(`🎨 РЕЗУЛЬТАТ: player=${player ? 'знайдено' : 'не знайдено'}, colorIndex=${colorIndex}`);
                restoredUnit.img = window.getColoredHeroImage(heroTemplate.img, colorIndex);
                // console.log(`🎨 Регенеровано зображення героя ${restoredUnit.name} з кольором гравця ${colorIndex + 1}`);
            }
        }
        }
         // ✅ ДОДАНО: Для звичайних юнітів - відновлюємо рівень та інші поля прогрес-системи
         if (!savedUnit.isHero) {
            restoredUnit.level = savedUnit.level || 1;
            if (savedUnit.upgradeCost !== undefined && savedUnit.upgradeCost !== null) {
                restoredUnit.upgradeCost = savedUnit.upgradeCost;
            } else if (templateUnit) {
                restoredUnit.upgradeCost = templateUnit.upgradeCost;
            }
            // console.log(`📊 Відновлено рівень ${restoredUnit.level} для ${restoredUnit.name}`);
        }
    
    // ✅ КЛЮЧОВИЙ МОМЕНТ: Ініціалізуємо здібності
    // ✅ КЛЮЧОВИЙ МОМЕНТ: Ініціалізуємо здібності
    if (window.AbilityFactory && !savedUnit.isHero) {
        restoredUnit.abilityInstances = AbilityFactory.createAbilities(restoredUnit);
        // console.log(`✨ Відновлено ${restoredUnit.abilityInstances.length} здібностей для ${restoredUnit.name}`);
        
        // ✅ ДОДАНО: Синхронізуємо здібності з прогресом
        if (typeof syncAbilitiesWithProgress === 'function' && savedUnit.abilitiesProgress) {
            syncAbilitiesWithProgress(restoredUnit, savedUnit.abilitiesProgress);
        }
    } else if (savedUnit.isHero) {
        // Для героїв - створюємо пустий масив abilityInstances
        restoredUnit.abilityInstances = [];
        // console.log(`✨ Для героя ${restoredUnit.name} створено пустий масив abilityInstances`);
    }
    // ✅ Відновлюємо кулдауни здібностей героїв
if (savedState.heroCooldowns && window.heroAbilitySystem) {
    savedState.heroCooldowns.forEach(([key, value]) => {
        window.heroAbilitySystem.currentCooldowns.set(key, value);
    });
    // console.log(`⏱️ Відновлено ${savedState.heroCooldowns.length} кулдаунів здібностей`);
}
    
    return restoredUnit;
});
window.unitsOnMap = unitsOnMap;
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
//             unitsOnMap = savedState.units.map(savedUnit => {
//                 // Знаходимо шаблон юніта
//                 let templateUnit = null;
                
//                 if (savedUnit.isHero) {
//                     // ... весь код для героїв (рядки 102-180) ...
//                     const restoredUnit = templateUnit ? { ...templateUnit } : { ...savedUnit };
//                     // ... більше коду для героїв ...
//                     return restoredUnit; // рядок 180
//                 } else {
//                     // КОД ДЛЯ ЗВИЧАЙНИХ ЮНІТІВ
//                     // Знаходимо шаблон звичайного юніта
//                     const player = players[savedUnit.playerIndex];
//                     const raceKey = raceMap[player?.race || "Орки"];
//                     const raceUnitsList = races[raceKey] || [];
                    
//                     // Шукаємо юніта за іменем
//                     const unitTemplate = raceUnitsList.find(unit => unit.name === savedUnit.name);
                    
//                     if (unitTemplate) {
//                         // Створюємо відновленого юніта з шаблону
//                         const restoredUnit = { ...unitTemplate };
                        
//                         // Відновлюємо збережені дані
//                         restoredUnit.id = savedUnit.id;
//                         restoredUnit.playerIndex = savedUnit.playerIndex;
//                         restoredUnit.originalIndex = savedUnit.originalIndex;
//                         restoredUnit.x = savedUnit.x;
//                         restoredUnit.y = savedUnit.y;
//                         restoredUnit.hp = savedUnit.hp;
//                         restoredUnit.newhp = savedUnit.newhp;
//                         restoredUnit.moved = savedUnit.moved;
//                         restoredUnit.attacked = savedUnit.attacked;
//                         restoredUnit.canAttack = savedUnit.canAttack;
//                         restoredUnit.effects = savedUnit.effects || [];
//                         restoredUnit.activeEffects = savedUnit.activeEffects || [];
//                         restoredUnit.isHero = false;
//                          // ✅ ДОДАНО: Відновлюємо originalStep для ефекту "Коріння"
//                          if (savedUnit.originalStep !== undefined) {
//                             restoredUnit.originalStep = savedUnit.originalStep;
//                             restoredUnit.step = 0; // Юніт все ще знерухомлений
//                             console.log(`🌿 ${restoredUnit.name} відновлено знерухомлення (originalStep: ${restoredUnit.originalStep})`);
//                         }

//                         // ✅ ДОДАНО: Відновлюємо рівень для звичайних юнітів
//                         restoredUnit.level = savedUnit.level || 1;
//                         restoredUnit.upgradeCost = savedUnit.upgradeCost || templateUnit?.upgradeCost;

//                         if (window.createColoredUnit && player) {
//                             const coloredUnit = window.createColoredUnit(restoredUnit, player.originalIndex);
//                             Object.assign(restoredUnit, coloredUnit);
//                         }
//                         console.log(`📊 Відновлено рівень ${restoredUnit.level} для ${restoredUnit.name}, upgradeCost: ${restoredUnit.upgradeCost} (з збереження: ${savedUnit.upgradeCost}, з шаблону: ${templateUnit?.upgradeCost})`);
//                         // Застосовуємо колір гравця
//                         if (window.createColoredUnit && player) {
//                             const coloredUnit = window.createColoredUnit(restoredUnit, player.originalIndex);
//                             Object.assign(restoredUnit, coloredUnit);
//                         }

//                         // ✅ ДОДАНО: Ініціалізуємо здібності
// if (window.AbilityFactory) {
//     restoredUnit.abilityInstances = AbilityFactory.createAbilities(restoredUnit);
//     console.log(`✨ Відновлено ${restoredUnit.abilityInstances.length} здібностей для ${restoredUnit.name}`);
    
//     // ✅ ДОДАНО: Синхронізуємо здібності з прогресом
//     if (typeof syncAbilitiesWithProgress === 'function' && savedUnit.abilitiesProgress) {
//         syncAbilitiesWithProgress(restoredUnit, savedUnit.abilitiesProgress);
//     }
// }
                        
//                         console.log(`🎨 Відновлено звичайного юніта ${restoredUnit.name} для гравця ${savedUnit.playerIndex + 1}`);
//                         return restoredUnit;
//                     } else {
//                         console.error(`❌ Не знайдено шаблон юніта для ${savedUnit.name}`);
//                         return { ...savedUnit };
//                     }
//                 }
//             });



// window.unitsOnMap = unitsOnMap;
            
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
                const raceUnitsList = races[raceKey] || [];
                
                // ✅ ВИПРАВЛЕНО: Якщо є збережені availableUnits - використовуємо їх
                if (player.availableUnits && player.availableUnits.length > 0) {
                    // Відновлюємо збережені юніти з правильними рівнями та upgradeCost
                    console.log(`✅ Відновлюю ${player.availableUnits.length} юнітів зі збереження для гравця ${player.originalIndex + 1}`);
                    
                    // Знаходимо повні шаблони для кожного юніта
                    player.availableUnits = player.availableUnits.map(savedUnit => {
                        // Шукаємо повний шаблон юніта
                        const fullTemplate = raceUnitsList.find(unit => 
                            unit.unitId === savedUnit.unitId || unit.name === savedUnit.name
                        );
                        
                        if (fullTemplate) {
                            // Створюємо повний об'єкт юніта з шаблону
                            const restoredUnit = { ...fullTemplate };
                            
                            // Оновлюємо збережені поля (рівень, upgradeCost тощо)
                            restoredUnit.level = savedUnit.level || 1;
                            if (savedUnit.upgradeCost !== undefined && savedUnit.upgradeCost !== null) {
                                restoredUnit.upgradeCost = savedUnit.upgradeCost;
                            } else if (templateUnit) {
                                restoredUnit.upgradeCost = templateUnit.upgradeCost;
                            }
                            restoredUnit.coin = savedUnit.coin || fullTemplate.coin;
                            restoredUnit.img = savedUnit.img || fullTemplate.img;
                            
                            return restoredUnit;
                        } else {
                            console.warn(`⚠️ Не знайдено шаблон для юніта:`, savedUnit);
                            return savedUnit;
                        }
                    });
                    
                    // Застосовуємо кольори до відновлених юнітів
                    if (window.createColoredUnit) {
                        player.availableUnits = player.availableUnits.map(unit => 
                            window.createColoredUnit(unit, player.originalIndex)
                        );
                    }
                } else {
                    // Старий код: генеруємо доступні юніти з базових шаблонів
                    console.log(`⚠️ Немає збережених availableUnits, генерую з базових шаблонів для гравця ${player.originalIndex + 1}`);
                    player.availableUnits = [...raceUnitsList];
                    
                    // Застосовуємо кольори до юнітів
                    if (player.availableUnits && Array.isArray(player.availableUnits)) {
                        player.availableUnits = player.availableUnits.map(unit => {
                            if (window.createColoredUnit) {
                                return window.createColoredUnit(unit, player.originalIndex);
                            }
                            return unit;
                        });
                    }
                }
                
                console.log(`🎨 Регенеровано ${player.availableUnits.length} юнітів для гравця ${player.originalIndex + 1}`);
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
// unitsOnMap = savedState.units.map(savedUnit => {
//     // Знаходимо шаблон юніта
//     let templateUnit = null;
    
//     if (savedUnit.isHero && savedUnit.heroTemplateId) {
//         // Для героїв - знаходимо шаблон з window.heroes
//         templateUnit = window.heroes[savedUnit.heroTemplateId - 1];
//     } else if (savedUnit.unitId) {
//         // Для звичайних юнітів - знаходимо в availableUnits гравця
//         // ✅ ВИПРАВЛЕНО: Шукаємо гравця за playerIndex, а не originalIndex
//         const player = players[savedUnit.playerIndex];
//         console.log(`🔍 Шукаю шаблон для ${savedUnit.name}, unitId: ${savedUnit.unitId}, playerIndex: ${savedUnit.playerIndex}`);
        
//         if (player && player.availableUnits) {
//             templateUnit = player.availableUnits.find(u => u.unitId === savedUnit.unitId);
//             console.log(`🔍 Знайдено шаблон:`, templateUnit ? `${templateUnit.name} (${templateUnit.unitId})` : 'НЕ ЗНАЙДЕНО');
//             console.log(`🔍 Abilities в шаблоні:`, templateUnit?.abilities);
//         } else {
//             console.warn(`⚠️ Гравець не знайдений для playerIndex: ${savedUnit.playerIndex}`);
//         }
//     }
    
//     // Створюємо новий об'єкт юніта на основі шаблону
//     const restoredUnit = templateUnit ? { ...templateUnit } : { ...savedUnit };
    
//           // Відновлюємо збережені дані (НЕ використовуємо Object.assign, щоб не перезаписати abilities)
//     restoredUnit.id = savedUnit.id;
//     restoredUnit.playerIndex = savedUnit.playerIndex;
//     restoredUnit.originalIndex = savedUnit.originalIndex;
//     restoredUnit.x = savedUnit.x;
//     restoredUnit.y = savedUnit.y;
//     restoredUnit.hp = savedUnit.hp;
//     restoredUnit.newhp = savedUnit.newhp;
//     restoredUnit.moved = savedUnit.moved;
//     restoredUnit.attacked = savedUnit.attacked;
//     restoredUnit.canAttack = savedUnit.canAttack;
//     restoredUnit.effects = savedUnit.effects || [];
//     restoredUnit.activeEffects = savedUnit.activeEffects || [];
//     // abilities залишається з шаблону! ✅
    
//         // Для героїв - відновлюємо прогрес і регенеруємо зображення
//         if (savedUnit.isHero) {
//             restoredUnit.level = savedUnit.level;
//             restoredUnit.upgradeCost = savedUnit.upgradeCost;
//            console.log(`📊 Відновлено рівень ${restoredUnit.level} для ${restoredUnit.name}, upgradeCost: ${restoredUnit.upgradeCost} (з збереження: ${savedUnit.upgradeCost})`);
//             restoredUnit.LevelAttack = savedUnit.LevelAttack;
//             restoredUnit.LevelArmor = savedUnit.LevelArmor;
//             restoredUnit.abilitiesProgress = savedUnit.abilitiesProgress;
            
//             // ✅ РЕГЕНЕРУЄМО ЗОБРАЖЕННЯ з правильним кольором
//             if (restoredUnit.heroTemplateId && window.getColoredHeroImage) {
//                 const heroTemplate = window.heroes[restoredUnit.heroTemplateId - 1];
//                 if (heroTemplate) {
//                     const player = players[savedUnit.playerIndex];
//                     const colorIndex = player ? player.originalIndex : savedUnit.playerIndex;
//                     restoredUnit.img = window.getColoredHeroImage(heroTemplate.img, colorIndex);
//                     console.log(`🎨 Регенеровано зображення героя ${restoredUnit.name} з кольором гравця ${colorIndex + 1}`);
//                 }
//             }
//         }
//          // ✅ ДОДАНО: Для звичайних юнітів - відновлюємо рівень та інші поля прогрес-системи
//          if (!savedUnit.isHero) {
//             restoredUnit.level = savedUnit.level || 1;
//             if (savedUnit.upgradeCost !== undefined && savedUnit.upgradeCost !== null) {
//                 restoredUnit.upgradeCost = savedUnit.upgradeCost;
//             } else if (templateUnit) {
//                 restoredUnit.upgradeCost = templateUnit.upgradeCost;
//             }
//             console.log(`📊 Відновлено рівень ${restoredUnit.level} для ${restoredUnit.name}`);
//         }
    
//     // ✅ КЛЮЧОВИЙ МОМЕНТ: Ініціалізуємо здібності
//     if (window.AbilityFactory) {
//         restoredUnit.abilityInstances = AbilityFactory.createAbilities(restoredUnit);
//         console.log(`✨ Відновлено ${restoredUnit.abilityInstances.length} здібностей для ${restoredUnit.name}`);

//         // ✅ ДОДАНО: Синхронізуємо здібності з прогресом
//     if (typeof syncAbilitiesWithProgress === 'function' && savedUnit.abilitiesProgress) {
//         syncAbilitiesWithProgress(restoredUnit, savedUnit.abilitiesProgress);
//     }
//     }
//     // ✅ Відновлюємо кулдауни здібностей героїв
// if (savedState.heroCooldowns && window.heroAbilitySystem) {
//     savedState.heroCooldowns.forEach(([key, value]) => {
//         window.heroAbilitySystem.currentCooldowns.set(key, value);
//     });
//     console.log(`⏱️ Відновлено ${savedState.heroCooldowns.length} кулдаунів здібностей`);
// }
    
//     return restoredUnit;
// });
// window.unitsOnMap = unitsOnMap;
                // Після рядка 353: window.unitsOnMap = unitsOnMap;
// Після рядка 353: window.unitsOnMap = unitsOnMap;
// ✅ ДОДАНО: Застосовуємо аури для всіх юнітів після завантаження
if (window.EffectsManager && typeof window.EffectsManager.applyAllAuras === 'function') {
    window.EffectsManager.applyAllAuras();
  }
                
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
                    console.log(`🎨 ДРУГА РЕГЕНЕРАЦІЯ ГЕРОЯ ${unit.name}:`, {
                        playerIndex: unit.playerIndex,
                        originalIndex: unit.originalIndex,
                        players: players.map((p, i) => ({ index: i, originalIndex: p.originalIndex })),
                        unitObject: unit
                    });
                    
                    // ✅ ВИПРАВЛЕННЯ: Знаходимо правильний originalIndex через playerIndex
                    const player = players[unit.playerIndex];
                    const correctOriginalIndex = player ? player.originalIndex : (unit.originalIndex || 0);
                    
                    console.log(`🎨 РЕЗУЛЬТАТ: player=${player ? 'знайдено' : 'не знайдено'}, correctOriginalIndex=${correctOriginalIndex}`);
                    console.log(`🎨 Викликаємо getColoredHeroImage з параметрами: img=${heroTemplate.img}, originalIndex=${correctOriginalIndex}`);
                    
                    unit.img = window.getColoredHeroImage(heroTemplate.img, correctOriginalIndex);
                    console.log(`🎨 Отримано нове зображення: ${unit.img}`);
                } else {
                    console.warn(`⚠️ Не вдалося регенерувати героя ${unit.name}:`, {
                        hasHeroTemplate: !!heroTemplate,
                        hasGetColoredHeroImage: !!window.getColoredHeroImage
                    });
                }
            }
            
            if (unit.isHero && typeof createHeroVisual === 'function') {
                createHeroVisual(unit);
            } else if (typeof createUnitVisual === 'function') {
                createUnitVisual(unit);
            }
        });


         // ✅ ДОДАНО: Оновлюємо колір health bar одразу після створення візуальних елементів
         if (typeof window.updateAllUnitsVisualState === 'function') {
            console.log('🎨 Оновлюю колір health bar одразу після створення візуальних елементів');
            window.updateAllUnitsVisualState();
        }
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
        // На:
if (typeof window.updateActivePlayerUnitsVisuals === 'function') {
    window.updateActivePlayerUnitsVisuals();
}
        console.log('✅ Гру повністю відновлено!');
        console.log('🎨 ТЕСТОВЕ ОНОВЛЕННЯ 1 ГЕРОЯ...');
        if (unitsOnMap.length > 0 && unitsOnMap[0].isHero) {
            const firstHero = unitsOnMap[0];
            console.log('Перший герой:', {
                name: firstHero.name,
                playerIndex: firstHero.playerIndex,
                heroTemplateId: firstHero.heroTemplateId,
                hasHeroTemplateId: !!firstHero.heroTemplateId,
                typeOfHeroTemplateId: typeof firstHero.heroTemplateId
            });
            
            if (window.getColoredHeroImage && window.heroes) {
                console.log('window.heroes length:', window.heroes.length);
                console.log('Шукаємо шаблон з ID:', firstHero.heroTemplateId);
                
                // Перетворюємо на число, якщо потрібно
                const templateIndex = parseInt(firstHero.heroTemplateId) - 1;
                console.log('Індекс у масиві:', templateIndex);
                
                const player = players[firstHero.playerIndex];
                console.log('Гравець знайдений:', player ? 'так' : 'ні', 'originalIndex:', player?.originalIndex);
                
                if (player && firstHero.heroTemplateId) {
                    const heroTemplate = window.heroes[templateIndex];
                    console.log('Шаблон героя знайдений:', heroTemplate ? heroTemplate.name : 'НІ');
                    
                    if (heroTemplate) {
                        console.log('Старе зображення:', firstHero.img);
                        firstHero.img = window.getColoredHeroImage(heroTemplate.img, player.originalIndex);
                        console.log('Нове зображення встановлено:', firstHero.img);
                        
                        // Оновлюємо DOM
                        const unitElement = document.querySelector(`[data-unit-id="${firstHero.id}"] img`);
                        if (unitElement) {
                            unitElement.src = firstHero.img;
                            console.log('DOM оновлено');
                        }
                    }
                }
            }
        }
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

console.log("лоадінгОМ9999999999");



/**
 * Синхронізує abilityInstances з abilitiesProgress після завантаження
 * @param {Object} unit - юніт для синхронізації
 * @param {Array} abilitiesProgress - прогрес здібностей зі збереження
 */
function syncAbilitiesWithProgress(unit, abilitiesProgress) {
    if (!unit.abilityInstances || !Array.isArray(unit.abilityInstances)) {
        console.warn(`⚠️ ${unit.name}: немає abilityInstances для синхронізації`);
        return;
    }
    
    if (!abilitiesProgress || !Array.isArray(abilitiesProgress)) {
        console.log(`📋 ${unit.name}: немає abilitiesProgress для синхронізації`);
        return;
    }
    
    console.log(`🔄 Синхронізую здібності для ${unit.name}:`, {
        abilityInstances: unit.abilityInstances.length,
        abilitiesProgress: abilitiesProgress.length
    });
    
    abilitiesProgress.forEach(savedProgress => {
        // Знаходимо відповідну здібність у abilityInstances
        const abilityInstance = unit.abilityInstances.find(
            ability => ability.id === savedProgress.abilityId || ability.abilityId === savedProgress.abilityId || ability.key === savedProgress.key || ability.name === savedProgress.name
        );
        
        if (abilityInstance) {
            // Синхронізуємо прогрес
            if (savedProgress.level !== undefined) {
                abilityInstance.level = savedProgress.level;
            }
            if (savedProgress.cooldown !== undefined) {
                abilityInstance.cooldown = savedProgress.cooldown;
            }
            if (savedProgress.usedThisTurn !== undefined) {
                abilityInstance.usedThisTurn = savedProgress.usedThisTurn;
            }
            if (savedProgress.enabled !== undefined) {
                abilityInstance.enabled = savedProgress.enabled;
            }
            
            console.log(`✅ Синхронізовано здібність ${abilityInstance.name}:`, {
                level: abilityInstance.level,
                cooldown: abilityInstance.cooldown,
                usedThisTurn: abilityInstance.usedThisTurn,
                enabled: abilityInstance.enabled
            });
        } else {
            console.warn(`⚠️ Не знайдено здібність для синхронізації:`, savedProgress);
        }
    });
}

// ============================================
// ПОВТОРНЕ ЗАСТОСУВАННЯ АКТИВНИХ ЕФЕКТІВ ПІСЛЯ ЗАВАНТАЖЕННЯ
// ============================================

function reapplyActiveEffects() {
    console.log('🔄 Повторне застосування активних ефектів після завантаження...');
    
    if (!window.unitsOnMap) {
        console.error('❌ unitsOnMap не знайдено');
        return;
    }
    
    let reappliedCount = 0;
    
    window.unitsOnMap.forEach(unit => {
        if (!unit.activeEffects || unit.activeEffects.length === 0) return;
        
        console.log(`🔍 ${unit.name} має ${unit.activeEffects.length} активних ефектів:`, unit.activeEffects);
        
        unit.activeEffects.forEach(effect => {
            // Застосовуємо ефект без пошуку здібності
            switch (effect.type) {
                case "control":
                    if (effect.effectType === "immobilize") {
                        if (!unit.originalStep) {
                            unit.originalStep = unit.step;
                        }
                        unit.step = Math.max(0, unit.step - (effect.stepReduction || 999));
                        console.log(`🌿 ${unit.name} знерухомлено після завантаження! Крок: ${unit.step}`);
                        reappliedCount++;
                    }
                    break;
                case "debuff":
                    if (effect.effectType === "stepReduction") {
                        unit.step = Math.max(0, unit.step - (effect.stepReduction || 0));
                        console.log(`📉 ${unit.name} втратив ${effect.stepReduction} кроків після завантаження`);
                        reappliedCount++;
                    }
                    break;
                // Додайте інші типи ефектів за потреби
            }
        });
    });
    
    console.log(`✨ Повторно застосовано ${reappliedCount} ефектів`);
}

// Викликаємо після завантаження всіх юнітів
reapplyActiveEffects();
// ============================================
// ПРИМУСОВЕ ОНОВЛЕННЯ КОЛЬОРІВ ГЕРОЇВ ПІСЛЯ ЗАВАНТАЖЕННЯ
// ============================================

if (loadedFromSave) {
    setTimeout(() => {
        console.log('🎨 ПРИМУСОВЕ ОНОВЛЕННЯ КОЛЬОРІВ ГЕРОЇВ...');
        
        if (!window.heroes || !window.getColoredHeroImage) {
            console.warn('⚠️ Функції для кольорів не завантажені');
            return;
        }
        
        unitsOnMap.forEach(unit => {
            if (unit.isHero && unit.heroTemplateId) {
                const heroTemplate = window.heroes[unit.heroTemplateId - 1];
                if (heroTemplate) {
                    const player = players[unit.playerIndex];
                    const colorIndex = player ? player.originalIndex : (unit.originalIndex || 0);
                    
                    console.log(`🎨 Оновлюю героя ${unit.name} з кольором гравця ${colorIndex + 1}`);
                    unit.img = window.getColoredHeroImage(heroTemplate.img, colorIndex);
                    
                    // Оновлюємо зображення на карті
                    updateUnitVisual(unit);
                }
            }
        });
        
        console.log('✅ Кольори героїв оновлено!');
    }, 1500);
}

function updateUnitVisual(unit) {
    const visual = document.querySelector(`[data-unit-id="${unit.id}"]`);
    if (visual && visual.querySelector('img')) {
        visual.querySelector('img').src = unit.img;
    }
}

// Просте оновлення кольорів героїв після завантаження
if (loadedFromSave) {
    console.log('🎨 ОНОВЛЕННЯ КОЛЬОРІВ ГЕРОЇВ ПІСЛЯ ЗАВАНТАЖЕННЯ...');
    
    // Чекаємо, поки все завантажиться
    setTimeout(() => {
        unitsOnMap.forEach(unit => {
            if (unit.isHero && unit.heroTemplateId && window.getColoredHeroImage) {
                const heroTemplate = window.heroes[unit.heroTemplateId - 1];
                if (heroTemplate) {
                    // Знаходимо гравця
                    const player = players[unit.playerIndex];
                    if (player) {
                        // Оновлюємо зображення (той самий код, що і при створенні)
                        unit.img = window.getColoredHeroImage(heroTemplate.img, player.originalIndex);
                        console.log(`✅ Оновлено колір героя ${unit.name} для гравця ${player.originalIndex + 1}`);
                        
                        // Оновлюємо зображення на карті
                        const unitElement = document.querySelector(`[data-unit-id="${unit.id}"] img`);
                        if (unitElement) {
                            unitElement.src = unit.img;
                        }
                    }
                }
            }
        });
    }, 500);
}