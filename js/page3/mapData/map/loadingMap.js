// ============================================
// ЗАВАНТАЖЕННЯ ДАНИХ З СТОРІНКИ 2 (page2)
// ============================================

// Масив кольорів прапорів для 4 гравців
let colorFlag = [
    "rgb(255, 80, 80)",   // Гравець 1 - червоний
    "rgb(80, 80, 255)",   // Гравець 2 - синій  
    "rgb(80, 255, 80)",   // Гравець 3 - зелений
    "rgb(255, 220, 80)"   // Гравець 4 - жовтий
];

// Змінні гри
let currentPlayerIndex = 0;  // Поточний гравець (за замовчуванням гравець 1)
let players = [];            // Масив активних гравців
let unitsOnMap = [];
window.unitsOnMap = unitsOnMap;         // Юніти на карті
let maxUnitsOnField = 0;     // Максимальна кількість юнітів на полі

// Завантажуємо налаштування з localStorage
// ============================================
// ПЕРЕВІРКА ЗБЕРЕЖЕНОЇ ГРИ
// ============================================

// Спочатку перевіряємо чи є збережена гра
// Спочатку перевіряємо чи є збережена гра
let loadedFromSave = false;

// Перевіряємо чи користувач прийшов з page1 з підтвердженням
const urlParams = new URLSearchParams(window.location.search);
const autoLoadSave = urlParams.get('loadSave') === 'true';

if (typeof window.hasSavedGame === 'function' && window.hasSavedGame()) {
    
    if (autoLoadSave) {
        // Користувач вже підтвердив на page1 - завантажуємо без питань
        console.log('📂 Автоматичне завантаження збереженої гри (підтверджено на page1)');
        loadedFromSave = true;
        const savedState = window.loadGameState();
        
        if (savedState) {
            console.log('📂 Відновлюю стан гри...');
            
            // Відновлюємо мета-дані
            currentPlayerIndex = savedState.currentPlayerIndex;
            currentRound = savedState.currentRound;
            
            // Відновлюємо гравців
            players = savedState.players;

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
            
            // Відновлюємо юнітів
            unitsOnMap = savedState.units;
            window.unitsOnMap = unitsOnMap;
            
            console.log(`✅ Відновлено: ${players.length} гравців, ${unitsOnMap.length} юнітів, раунд ${currentRound}`);
        }
        
    } else {
        // Звичайний діалог (якщо користувач прийшов не з page1)
        console.log('🔍 ТЕСТ: Знайдено збережену гру!');
        console.log('🔍 ТЕСТ: Зараз показую діалог...');
        
        const userChoice = confirm('🎮 Знайдено збережену гру!\n\nПродовжити збережену гру?');
        console.log('🔍 ТЕСТ: Вибір користувача:', userChoice);
        
        if (userChoice) {
            loadedFromSave = true;
            const savedState = window.loadGameState();
            
            if (savedState) {
                console.log('📂 Відновлюю стан гри...');
                
                // Відновлюємо мета-дані
                currentPlayerIndex = savedState.currentPlayerIndex;
                currentRound = savedState.currentRound;
                
                // Відновлюємо гравців
                players = savedState.players;

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
                
                // Відновлюємо юнітів
                unitsOnMap = savedState.units;
                window.unitsOnMap = unitsOnMap;
                
                console.log(`✅ Відновлено: ${players.length} гравців, ${unitsOnMap.length} юнітів, раунд ${currentRound}`);
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
                    console.log(`🎨 Регенеровано img для героя ${unit.heroTemplateId} з кольором гравця ${correctOriginalIndex + 1}`);
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