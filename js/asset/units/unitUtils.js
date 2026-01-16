window.unitUtils = {
    // Конвертувати старий unitId у новий baseUnitKey
    getBaseUnitKeyFromUnitId: function(unitId) {
        if (!unitId) return null;
        
        // Якщо це вже новий ключ
        if (unitId.includes(':')) return unitId;
        
        // Конвертуємо старий ID
        const raceMatch = unitId.match(/^(orc|elf|pipl|demon|beetle)/);
        if (!raceMatch) return null;
        
        const race = raceMatch[0];
        const numberPart = unitId.match(/\d+/)?.[0] || '';
        
        const typeMap = {
            '1': 'warrior',
            '2': 'archer', 
            '3': 'shaman',
            '4': 'horse',
            '5': 'horseman',
            '6': 'catapult',
            '7': 'pikener',
            '8': 'support',
            '9': 'specialist',
            '10': 'mage',
            '11': 'wisp'
        };
        
        let typeCode;
        if (numberPart.length >= 3) {
            typeCode = numberPart.slice(0, -2);
        } else {
            typeCode = numberPart.charAt(0);
        }
        
        const unitType = typeMap[typeCode];
        if (!unitType) return null;
        
        const raceMap = {
            'orc': 'orcs',
            'elf': 'elves', 
            'pipl': 'humans',
            'demon': 'demons',
            'beetle': 'undead'
        };
        
        const newRace = raceMap[race] || race;
        return `${newRace}:${unitType}`;
    },
    
    // Отримати тип з baseUnitKey
    getUnitTypeFromBaseKey: function(baseUnitKey) {
        if (!baseUnitKey || !baseUnitKey.includes(':')) return null;
        return baseUnitKey.split(':')[1];
    },
    
    // Отримати расу з baseUnitKey
    getRaceFromBaseKey: function(baseUnitKey) {
        if (!baseUnitKey || !baseUnitKey.includes(':')) return null;
        return baseUnitKey.split(':')[0];
    },
    
    // Отримати рівень з unitId
    getLevelFromUnitId: function(unitId) {
        if (!unitId) return 1;
        
        if (unitId.includes(':')) return 1;
        
        const numberPart = unitId.match(/\d+/)?.[0] || '';
        if (numberPart.length >= 3) {
            return parseInt(numberPart.slice(-2)) || 1;
        }
        return 1;
    }
};