// Файл: js/asset/units/specialUnitsAliases.js
// ============================================
// ПОСИЛАННЯ НА СПЕЦІАЛЬНІ ЮНІТИ ДЛЯ СИСТЕМИ ПРОКАЧКИ
// ============================================

console.log('🔧 Ініціалізація псевдонімів для спеціальних юнітів...');

// Функція для створення псевдонімів з unitsRegistry
function createSpecialUnitAliases() {
    if (!window.unitsRegistry) {
        console.warn('⚠️ unitsRegistry ще не ініціалізовано');
        return;
    }
    
    // Мапінг спеціальних юнітів
    const specialUnitsMap = {
        // ОРКИ
        'orcs:minotaur': 'orcs:specialist',
        'orcs:bear': 'orcs:support',
        'orcs:mag': 'orcs:mage',
        
        // ЕЛЬФИ
        'elves:witch': 'elves:specialist',
        'elves:golem': 'elves:support',
        'elves:darkelf': 'elves:specialist', // додатковий
        
        // ЛЮДИ
        'humans:werewolf': 'humans:specialist',
        'humans:engineer': 'humans:support',
        'humans:assassin': 'humans:specialist', // додатковий
        
        // ДЕМОНИ
        'demons:cerberus': 'demons:specialist',
        'demons:spirit': 'demons:support',
        'demons:supervisor': 'demons:specialist', // додатковий
        
        // НЕМЕРТВІ
        'undead:scarab': 'undead:specialist',
        'undead:uterus': 'undead:support',
        'undead:armored': 'undead:specialist' // додатковий
    };
    
    // Створюємо псевдоніми
    Object.entries(specialUnitsMap).forEach(([originalKey, aliasKey]) => {
        if (window.unitsRegistry[originalKey] && !window.unitsRegistry[aliasKey]) {
            window.unitsRegistry[aliasKey] = window.unitsRegistry[originalKey];
            console.log(`✅ Створено псевдонім: ${aliasKey} -> ${originalKey}`);
        }
    });
    
    console.log('✅ Всі псевдоніми для спеціальних юнітів створені!');
}

// Викликаємо при завантаженні
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createSpecialUnitAliases);
} else {
    createSpecialUnitAliases();
}