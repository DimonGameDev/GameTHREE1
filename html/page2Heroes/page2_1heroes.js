// ========================================
// СЕЛЕКТОРИ ЕЛЕМЕНТІВ
// ========================================

// Фото та назва героя
const heroImg = document.querySelector(".heroImg");
const heroNameDisplay = document.querySelector(".heroNameDisplay");
const playerName = document.querySelector(".playerName");

// Кнопка закрити
const closeBtn = document.querySelector(".closeBtn");

// Характеристики героя
const attackSpan = document.querySelector(".attackSpanBaza");
const armorSpan = document.querySelector(".armorSpanBaza");
const hpSpan = document.querySelector(".hpSpanBaza");
const rangeSpan = document.querySelector(".rangeSpanBaza");
const stepSpan = document.querySelector(".stepSpanBaza");
const critSpan = document.querySelector(".critSpanBaza");
const critBlowSpan = document.querySelector(".critSpanBlow");

// Опис героя
const descriptHeroes = document.querySelector(".descriptHeroes");

// Кнопки вибору
const choiceBtn = document.querySelector(".choiceHeroesBtn");
const readyBtn = document.querySelector(".ChoiceHeroesBtnYes");

// Здібності
const abilityIcon1 = document.querySelector("#efectOne");
const abilityIcon2 = document.querySelector("#efectTwo");
const abilityIcon3 = document.querySelector("#efectThree");
const abilityName = document.querySelector(".nameEfectBaza");
const abilityDescription = document.querySelector(".discriptionEfect");
const detailBtn = document.querySelector(".detalEfectBtn");

// Модальне вікно
const modalWindow = document.querySelector(".modalWindowHeroes");
const modalImg = document.querySelector(".modalBoxImgEfect");
const modalName = document.querySelector(".modalNameEfect");
const modalCloseBtn = document.querySelector(".BtnModalCloseWindow");
const modalTextLevel1 = document.querySelector(".modalTextEfectOne");
const modalTextLevel2 = document.querySelector(".modalTextEfectTwo");
const modalTextLevel3 = document.querySelector(".modalTextEfectThree");
const modalTextLevel4 = document.querySelector(".modalTextEfectFour");


// ========================================
// СИСТЕМА ПОВЕРНЕННЯ НА PAGE2
// ========================================

// Отримати номер поточного гравця
const currentPlayerNum = localStorage.getItem('currentPlayerSelectingHeroes') || '1';

console.log('='.repeat(50));
console.log('🔍 ДІАГНОСТИКА - page2_1heroes.js завантажено');
console.log('📦 localStorage.currentPlayerSelectingHeroes:', localStorage.getItem('currentPlayerSelectingHeroes'));
console.log('📦 localStorage.currentPlayerAlliance:', localStorage.getItem('currentPlayerAlliance'));
console.log('🎮 currentPlayerNum (використовується):', currentPlayerNum);
console.log('🎮 Тип currentPlayerNum:', typeof currentPlayerNum);

// Оновити назву гравця в UI
if (playerName) {
  playerName.textContent = `Гравець ${currentPlayerNum}`;
}

console.log(`🎮 Вибір героїв для Гравця ${currentPlayerNum}`);

// Визначити колір героїв на основі НОМЕРА ГРАВЦЯ (не альянсу!)
const playerColors = {
  '1': 'red',      // Гравець 1 → Червоний
  '2': 'blue',     // Гравець 2 → Синій  ✅ ЗМІНЕНО
  '3': 'green',    // Гравець 3 → Зелений  ✅ ЗМІНЕНО
  '4': 'yellow'    // Гравець 4 → Жовтий
};
const playerColor = playerColors[currentPlayerNum];

console.log('🎨 Колір героїв для Гравця', currentPlayerNum, ':', playerColor);
console.log('🎨 playerColors об\'єкт:', playerColors);
console.log('🎨 playerColors[currentPlayerNum]:', playerColors[currentPlayerNum]);

if (!playerColor) {
  console.error('❌ ПОМИЛКА: Не знайдено колір для гравця', currentPlayerNum);
  console.error('❌ Перевірте чи currentPlayerNum є рядком:', typeof currentPlayerNum);
}

console.log('='.repeat(50));


// Список назв героїв
const heroNames = [
  'tuveran', 'timer', 'darest', 'kriver', 'spetri', 
  'artemis', 'enagra', 'blister', 'henri', 'savagar', 
  'mayden', 'elder', 'dazara', 'sniper', 'nekropius'
];

const heroIdToName = {
  1: 'tuveran',
  2: 'timer',
  3: 'darest',
  4: 'kriver',
  5: 'spetri',
  6: 'artemis',
  7: 'enagra',
  8: 'blister',
  9: 'henri',
  10: 'savagar',
  11: 'mayden',
  12: 'elder',
  13: 'dazara',
  14: 'sniper',
  15: 'nekropius'
};


// ✅ ВИПРАВЛЕННЯ: Перевизначаємо img для всіх героїв на правильний колір
if (window.heroes && window.heroes.length > 0) {
  console.log('🔧 Перевизначаємо зображення героїв на колір:', playerColor);
  
  window.heroes.forEach((hero, index) => {
    const heroName = heroIdToName[hero.id];
    if (heroName) {
      const capitalizedColor = playerColor.charAt(0).toUpperCase() + playerColor.slice(1);
      const timestamp = Date.now();
      const newImg = `../../img/heroes/heroesList/${heroName}/${playerColor}/${heroName}${capitalizedColor}.png?v=${timestamp}`;
      
      hero.img = newImg;
      console.log(`✅ Герой ${hero.name} (ID: ${hero.id}): img оновлено на ${playerColor}`);
    }
  });
}
// Слоти вибраних героїв
const heroSlots = [
  document.querySelector("#hero-1"),
  document.querySelector("#hero-2"),
  document.querySelector("#hero-3")
];

// Оновити колір в слотах (буде використовуватись при додаванні героя)

// Герої для вибору
// Герої для вибору (оновлюємо шляхи з правильним кольором)
const heroTiles = [];
for (let i = 0; i < heroNames.length; i++) {
  const heroTile = document.querySelector(`#hero-${i + 4}`);
  
  if (heroTile) {
    // Оновлюємо src на правильний колір
    const heroName = heroNames[i];
    const capitalizedColor = playerColor.charAt(0).toUpperCase() + playerColor.slice(1);
    // ✅ ДОДАНО: версіонування для запобігання кешуванню
    const timestamp = Date.now();
    const newSrc = `../../img/heroes/heroesList/${heroName}/${playerColor}/${heroName}${capitalizedColor}.png?v=${timestamp}`;
    
    // console.log(`🖼️ Герой ${i}: ${heroName} → колір: ${playerColor} → шлях: ${newSrc}`);
    
    heroTile.src = newSrc;
    heroTiles.push(heroTile);
  }
}
// ========================================
// ГЛОБАЛЬНІ ЗМІННІ
// ========================================

let currentHero = null;
let currentAbilities = [];
let currentAbility = null;
let selectedHeroesSlots = [null, null, null];

// ========================================
// ДОПОМІЖНІ ФУНКЦІЇ
// ========================================

/**
 * Отримує здібності героя з нової структури
 */
function getHeroAbilities(heroData) {
  if (!heroData || !heroData.abilitiesProgress) {
    return [];
  }
  
  const abilities = [];
  
  heroData.abilitiesProgress.forEach(progress => {
    const ability = window.heroesAbilities[progress.abilityId];
    
    if (ability) {
      abilities.push({
        ...ability,
        currentLevel: progress.currentLevel
      });
    }
  });
  
  return abilities;
}

/**
 * Генерує опис рівня здібності
 */
function generateLevelDescription(ability, levelIndex) {
    const level = ability.levels[levelIndex];
    if (!level) return "Опис недоступний";
  
    let desc = `<b>${ability.description}</b><br><br>`;
    
    if (level.descripLevel) {
      desc += `<i>${level.descripLevel}</i><br><br>`;
    }
  
    // Список технічних полів, які НЕ показуємо
    const skipKeys = [
      "levelId", 
      "level", 
      "descripLevel", 
      "upgradeCost",
      "plusStep",
      "plusAttack",
      "plusArmor",
      "plusHP",
      "plusRange",
      "plusCritChance",
      "plusCritBlow"
    ];
    
    // Показуємо тільки важливі параметри
    const showKeys = [
      "damage",
      "poisonDuration",
      "poisonDamage",
      "cooldown",
      "critChancePercent",
      "critDamageMin",
      "critDamageMax",
      "range",
      "cells",
      "ignoreArmor",
      "hpPercent",
      "duration",
      "healing",
      "shieldValue"
    ];
  
    // Переклад ключів
    const translations = {
      "damage": "Шкода",
      "poisonDuration": "Тривалість отрути (ходи)",
      "poisonDamage": "Шкода від отрути",
      "cooldown": "Перезарядка (ходи)",
      "critChancePercent": "Шанс кріта (%)",
      "critDamageMin": "Мін. множник криту",
      "critDamageMax": "Макс. множник криту",
      "range": "Дальність",
      "cells": "Кількість клітинок",
      "ignoreArmor": "Ігнорує броню",
      "hpPercent": "Відсоток здоров'я (%)",
      "duration": "Тривалість (ходи)",
      "healing": "Лікування",
      "shieldValue": "Захист щита"
    };
    
    // Показуємо тільки дозволені поля
    for (let key in level) {
      if (showKeys.includes(key) && level[key] !== null && level[key] !== undefined) {
        const label = translations[key] || key;
        desc += `• ${label}: ${level[key]}<br>`;
      }
    }
  
    // Вартість покращення
    if (level.upgradeCost !== null && level.upgradeCost !== undefined) {
      desc += `<br>🔮 Вартість відкриття: ${level.upgradeCost} мани`;
    } else if (level.level === ability.maxLevel) {
      desc += `<br>⭐ Максимальний рівень`;
    }
  
    return desc;
  }

/**
 * Відображає інформацію про героя
 */
function displayHeroInfo(heroData) {
  if (!heroData) return;
  
  currentHero = heroData;
  
  // Основна інформація
  // Основна інформація - генеруємо правильний колір
// Основна інформація - генеруємо правильний колір
const heroNameEn = heroIdToName[heroData.id];
const capitalizedColor = playerColor.charAt(0).toUpperCase() + playerColor.slice(1);
// ✅ ДОДАНО: версіонування для запобігання кешуванню
const timestamp = Date.now();
const coloredHeroImage = `../../img/heroes/heroesList/${heroNameEn}/${playerColor}/${heroNameEn}${capitalizedColor}.png?v=${timestamp}`;
heroImg.src = coloredHeroImage;
  heroNameDisplay.textContent = heroData.name;
  attackSpan.textContent = heroData.attack;
  armorSpan.textContent = heroData.armor;
  hpSpan.textContent = heroData.hp;
  rangeSpan.textContent = heroData.range;
  stepSpan.textContent = heroData.step;
  critSpan.textContent = heroData.critChance;
  critBlowSpan.textContent = heroData.critBlow;
  descriptHeroes.textContent = heroData.description;
  
  // Отримати здібності
  currentAbilities = getHeroAbilities(heroData);
  
  // Відобразити іконки здібностей
  if (currentAbilities[0]) {
    abilityIcon1.src = currentAbilities[0].img;
    abilityIcon1.style.opacity = "1";
  } else {
    abilityIcon1.style.opacity = "0.3";
  }
  
  if (currentAbilities[1]) {
    abilityIcon2.src = currentAbilities[1].img;
    abilityIcon2.style.opacity = "1";
  } else {
    abilityIcon2.style.opacity = "0.3";
  }
  
  if (currentAbilities[2]) {
    abilityIcon3.src = currentAbilities[2].img;
    abilityIcon3.style.opacity = "1";
  } else {
    abilityIcon3.style.opacity = "0.3";
  }
  
  // Автоматично вибрати першу здібність
  if (currentAbilities[0]) {
    selectAbility(currentAbilities[0]);
  } else {
    abilityName.textContent = "Немає здібностей";
    abilityDescription.textContent = "";
  }
}


/**
 * Вибирає та відображає здібність
 */
function selectAbility(ability) {
  currentAbility = ability;
  abilityName.textContent = ability.name;
  
  // ✅ ДОДАНО: Показуємо тип здібності
  const abilityType = ability.type === 'active' ? '⚡ Активна' : '🔄 Пасивна';
  const typeColor = ability.type === 'active' ? '#ff6b6b' : '#4ecdc4';
  
  abilityDescription.innerHTML = `
    <div style="color: ${typeColor}; font-weight: bold; margin-bottom: 5px;">${abilityType}</div>
    ${ability.description}
  `;
}

/**
 * Перевіряє чи всі слоти заповнені
 */
function checkIfAllSlotsFilled() {
  const allFilled = selectedHeroesSlots.every(slot => slot !== null);
  
  if (allFilled) {
    readyBtn.style.display = "block";
    readyBtn.innerHTML = "← Назад";
    readyBtn.style.backgroundColor = "#4CAF50"; // Зелений колір
    console.log('✅ Всі 3 герої вибрані!');
  } else {
    readyBtn.style.display = "none";
  }
}

// ========================================
// ОБРОБНИКИ ПОДІЙ
// ========================================

// Кнопка закрити
closeBtn.addEventListener("click", () => {
    // Повернутися на page2 без збереження
    if (confirm('❌ Вийти без збереження вибору героїв?')) {
      localStorage.removeItem('returningFromHeroesSelection');
      localStorage.removeItem('currentPlayerSelectingHeroes');
      window.location.href = '../page2/page2_2.html';
    }
  });

// Вибір здібностей
abilityIcon1.addEventListener("click", () => {
  if (currentAbilities[0]) {
    selectAbility(currentAbilities[0]);
  }
});

abilityIcon2.addEventListener("click", () => {
  if (currentAbilities[1]) {
    selectAbility(currentAbilities[1]);
  }
});

abilityIcon3.addEventListener("click", () => {
  if (currentAbilities[2]) {
    selectAbility(currentAbilities[2]);
  }
});

// Детальний опис здібності
detailBtn.addEventListener("click", () => {
  if (!currentAbility) {
    alert("Спочатку оберіть здібність!");
    return;
  }
  
  // Заповнити модальне вікно
  modalImg.src = currentAbility.img;
  modalName.textContent = currentAbility.name;
  
  // Описи рівнів (тепер 4 рівні)
  const levels = currentAbility.levels;
  
  // Рівень 1
  if (levels && levels.length >= 1) {
    modalTextLevel1.innerHTML = generateLevelDescription(currentAbility, 0);
  }
  
  // Рівень 2
  if (levels && levels.length >= 2) {
    modalTextLevel2.innerHTML = generateLevelDescription(currentAbility, 1);
  } else {
    modalTextLevel2.innerHTML = "Рівень недоступний";
  }
  
  // Рівень 3
  if (levels && levels.length >= 3) {
    modalTextLevel3.innerHTML = generateLevelDescription(currentAbility, 2);
  } else {
    modalTextLevel3.innerHTML = "Рівень недоступний";
  }
  
  // Рівень 4
  if (levels && levels.length >= 4) {
    modalTextLevel4.innerHTML = generateLevelDescription(currentAbility, 3);
  } else {
    modalTextLevel4.innerHTML = "Рівень недоступний";
  }
  
  // Показати модальне вікно
  modalWindow.style.display = "flex";
});

// Закрити модальне вікно
modalCloseBtn.addEventListener("click", () => {
  modalWindow.style.display = "none";
});

// Закрити модальне вікно при кліку на фон
modalWindow.addEventListener("click", (e) => {
  if (e.target === modalWindow) {
    modalWindow.style.display = "none";
  }
});

// Кнопка "Вибрати героя"
choiceBtn.addEventListener("click", () => {
  if (!currentHero) {
    alert("Спочатку оберіть героя!");
    return;
  }
  
  // Знайти перший вільний слот
  const emptySlotIndex = selectedHeroesSlots.findIndex(slot => slot === null);
  
  if (emptySlotIndex === -1) {
    alert("Всі слоти заповнені! Видаліть героя, щоб вибрати нового.");
    return;
  }
  
  // Перевірити чи герой вже вибраний
  const alreadySelected = selectedHeroesSlots.some(slot => slot && slot.id === currentHero.id);
  
  if (alreadySelected) {
    alert("Цей герой вже вибраний!");
    return;
  }
  
  // Додати героя до слоту (з правильним кольором)
  selectedHeroesSlots[emptySlotIndex] = currentHero;
  
  // Використовуємо img з правильним кольором
  // Використовуємо img з правильним кольором
const heroName = heroIdToName[currentHero.id];
const capitalizedColor = playerColor.charAt(0).toUpperCase() + playerColor.slice(1);
// ✅ ДОДАНО: версіонування для запобігання кешуванню
const timestamp = Date.now();
const coloredHeroImg = `../../img/heroes/heroesList/${heroName}/${playerColor}/${heroName}${capitalizedColor}.png?v=${timestamp}`;

heroSlots[emptySlotIndex].src = coloredHeroImg;
  
  checkIfAllSlotsFilled();
  
  console.log(`Герой ${currentHero.name} (${playerColor}) доданий у слот ${emptySlotIndex + 1}`);
});

// Кнопка "Готово"
readyBtn.addEventListener("click", () => {
    // Перевірити чи всі 3 героя вибрані
    const filledSlots = selectedHeroesSlots.filter(slot => slot !== null);
    
    if (filledSlots.length !== 3) {
      alert('❌ Виберіть всіх 3 героїв!');
      return;
    }
    
    // Зберегти вибраних героїв для поточного гравця
    const playerNum = localStorage.getItem('currentPlayerSelectingHeroes') || '1';
    
    // Зберегти ID героїв
   // Зберігаємо ІНДЕКСИ героїв, а не ID
const selectedHeroIds = selectedHeroesSlots.map(hero => {
  if (!hero) return null;
  // Знаходимо індекс героя в масиві window.heroes
  return window.heroes.findIndex(h => h.id === hero.id);
});
    
    localStorage.setItem('selectedHeroesForPlayer' + playerNum, JSON.stringify(selectedHeroIds));
    localStorage.setItem('returningFromHeroesSelection', 'true');
    
    console.log(`✅ Збережено вибір для Гравця ${playerNum}:`, selectedHeroIds);
    
    // Повернутися на page2
    window.location.href = '../page2/page2_2.html';
  });

// Клік на слоти (видалення героя)
heroSlots.forEach((slot, index) => {
  slot.addEventListener("click", () => {
    if (selectedHeroesSlots[index]) {
      const heroName = selectedHeroesSlots[index].name;
      
      if (confirm(`Видалити ${heroName} з вибору?`)) {
        selectedHeroesSlots[index] = null;
        slot.src = "";
        checkIfAllSlotsFilled();
      }
    }
  });
});

// Клік на героїв для вибору
heroTiles.forEach((tile, index) => {
  const heroIndex = index; // hero-4 це heroes[0], hero-5 це heroes[1] і т.д.
  
  tile.addEventListener("click", () => {
    if (window.heroes && window.heroes[heroIndex]) {
      displayHeroInfo(window.heroes[heroIndex]);
    }
  });
});

// ========================================
// ІНІЦІАЛІЗАЦІЯ
// ========================================

// Показати першого героя при завантаженні
window.addEventListener("DOMContentLoaded", () => {
  if (window.heroes && window.heroes.length > 0) {
    displayHeroInfo(window.heroes[0]);
  }
});