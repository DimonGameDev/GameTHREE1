window.unitsRegistry = window.unitsRegistry || {};

// Функція для реєстрації юніта
window.registerUnit = function(baseUnitKey, unitData) {
    window.unitsRegistry[baseUnitKey] = unitData;
    
    // Для зворотної сумісності: створюємо старі ID для кожного рівня
    if (unitData.levels && unitData.race) {
        const racePrefixMap = {
            'orcs': 'orc',
            'elves': 'elf',
            'humans': 'pipl',
            'undead': 'beetle',
            'demons': 'demon'
        };
        
        const typeCodeMap = {
            'warrior': '1',
            'archer': '2',
            'shaman': '3',
            'horse': '4',
            'horseman': '5',
            'catapult': '6',
            'pikener': '7',
            'support': '8',
            'specialist': '9',
            'mage': '10',
            'wisp': '11'
        };
        
        const racePrefix = racePrefixMap[unitData.race] || unitData.race;
        const typeCode = typeCodeMap[unitData.role];
        
        if (racePrefix && typeCode) {
            Object.keys(unitData.levels).forEach(level => {
                const oldUnitId = `${racePrefix}${typeCode}${String(level).padStart(2, '0')}`;
                const levelData = unitData.levels[level];
                
                window.unitsRegistry[oldUnitId] = {
                    ...levelData,
                    unitId: oldUnitId,
                    level: parseInt(level),
                    name: unitData.name,
                    img: unitData.img,
                    baseUnitKey: baseUnitKey,
                    race: unitData.race,
                    role: unitData.role
                };
            });
        }
    }
};



// ДОДАТИ в кінець файлу unitsRegistry.js (після рядка 52):

// Глобальна змінна для зворотної сумісності
window.races = window.races || {};

// Функція для оновлення races з unitsRegistry
window.updateRacesFromRegistry = function() {
    if (!window.unitsRegistry) return;
    
    const raceKeys = ['orcs', 'elves', 'humans', 'undead', 'demons'];
    
    raceKeys.forEach(raceKey => {
        const raceUnits = [];
        
        for (const [key, unitData] of Object.entries(window.unitsRegistry)) {
            if (key.includes(':')) {
                const [unitRace, unitType] = key.split(':');
                
                if (unitRace === raceKey && unitData.levels && unitData.levels[1]) {
                    const level1Unit = {
                        ...unitData.levels[1],
                        unitId: `${raceKey}:${unitType}:1`,
                        baseUnitKey: key,
                        name: unitData.name,
                        img: unitData.img,
                        race: unitData.race,
                        role: unitData.role,
                        level: 1
                    };
                    raceUnits.push(level1Unit);
                }
            }
        }
        
        // Сортуємо
        const typeOrder = ['warrior', 'archer', 'shaman', 'horse', 'horseman', 'catapult', 'pikener', 'support', 'specialist', 'mage', 'wisp'];
        raceUnits.sort((a, b) => {
            // wisp завжди в кінці
            if (a.role === 'wisp') return 1;
            if (b.role === 'wisp') return -1;
            
            const indexA = typeOrder.indexOf(a.role);
            const indexB = typeOrder.indexOf(b.role);
            
            // Якщо role не знайдено - ставимо в кінець
            const aIndex = indexA !== -1 ? indexA : 999;
            const bIndex = indexB !== -1 ? indexB : 999;
            
            return aIndex - bIndex;
        });
        
        window.races[raceKey] = raceUnits;
    });
};

// Оновлюємо races при завантаженні
if (window.unitsRegistry && Object.keys(window.unitsRegistry).length > 0) {
    window.updateRacesFromRegistry();
}