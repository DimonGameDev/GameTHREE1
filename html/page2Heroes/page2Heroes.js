let imgHeroes = document.querySelector(".imgHeroes img")


// назва гравця
let boxNamePlayer = document.querySelector(".boxNamePlayer")
// назва героя
let topNameHeroes = document.querySelector(".topNameHeroes")



// кнопка закрити
let topBtnClose = document.querySelector(".topBtnClose")

let attackSpanBaza = document.querySelector(".attackSpanBaza")
let armorSpanBaza = document.querySelector(".armorSpanBaza")
let hpSpanBaza = document.querySelector(".hpSpanBaza")
let rangeSpanBaza = document.querySelector(".rangeSpanBaza")
let stepSpanBaza = document.querySelector(".stepSpanBaza")

// кріти
let critSpanBaza = document.querySelector(".critSpanBaza")
let critSpanBlow = document.querySelector(".critSpanBlow")

// опис героя
let descriptHeroes = document.querySelector(".descriptHeroes")

// ефекти
let efectOne = document.querySelector("#efectOne")
let efectTwo = document.querySelector("#efectTwo")
let efectThree = document.querySelector("#efectThree")
// let efectFour = document.querySelector("#efectFour")

// назва ефекту
let nameEfectBaza = document.querySelector(".nameEfectBaza")

let discriptionEfect = document.querySelector(".discriptionEfect")

// модальне вікно
let modalWindowHeroes = document.querySelector(".modalWindowHeroes")

// кнопка ГОТОВО, коли всі герої вибрані
let ChoiceHeroesBtnYes = document.querySelector(".ChoiceHeroesBtnYes")


// кнопка детального опису
let detalEfectBtn = document.querySelector(".detalEfectBtn")

let heroesNow1 = document.querySelector("#hero-1")
let heroesNow2 = document.querySelector("#hero-2")
let heroesNow3 = document.querySelector("#hero-3")
let heroesNew4 = document.querySelector("#hero-4")
let heroesNew5 = document.querySelector("#hero-5")
let heroesNew6 = document.querySelector("#hero-6")
let heroesNew7 = document.querySelector("#hero-7")
let heroesNew8 = document.querySelector("#hero-8")
let heroesNew9 = document.querySelector("#hero-9")
let heroesNew10 = document.querySelector("#hero-10")
let heroesNew11 = document.querySelector("#hero-11")
let heroesNew12 = document.querySelector("#hero-12")
let heroesNew13 = document.querySelector("#hero-13")
let heroesNew14 = document.querySelector("#hero-14")
let heroesNew15 = document.querySelector("#hero-15")
let heroesNew16 = document.querySelector("#hero-16")
let heroesNew17 = document.querySelector("#hero-17")
let heroesNew18 = document.querySelector("#hero-18")


// модальне вікно

let modalBoxImgEfect = document.querySelector(".modalBoxImgEfect img")
let modalNameEfect = document.querySelector(".modalNameEfect")

// закрити модальне вікно
let BtnModalCloseWindow = document.querySelector(".BtnModalCloseWindow")

// рівень ефекту
let modalTextEfectOne = document.querySelector(".modalTextEfectOne")
let modalTextEfectTwo = document.querySelector(".modalTextEfectTwo")
let modalTextEfectThree = document.querySelector(".modalTextEfectThree")
// let modalTextEfectFour = document.querySelector(".modalTextEfectFour")

// Функція для генерації опису рівня здібності

function generateLevelDescription(ability, levelIndex) {
  const level = ability.levels[levelIndex];
  if (!level) return "Опис недоступний";

  let desc = `<b>${ability.description}</b><br><br>`;
  if (level.customDescription) {
    desc += `<i>${level.customDescription}</i><br><br>`;
  }

  // універсальні поля, які обробляються автоматично
  const skipKeys = ["levelId", "level", "customDescription", "upgradeCost"];
  for (let key in level) {
    if (!skipKeys.includes(key) && level[key] !== null && level[key] !== undefined) {
      // красиві назви для деяких ключів
      let label = key;
      if (key === "damage") label = "Шкода";
      if (key === "poisonDuration") label = "Тривалість отрути (ходи)";
      if (key === "poisonDamage") label = "Шкода від отрути";
      if (key === "cooldown") label = "Перезарядка (ходи)";
      if (key === "critChance") label = "Шанс кріта (%)";
      if (key === "range") label = "Дальність дії";
      if (key === "cells") label = "Кількість клітинок";
   if (key === "ignoreArmor") label = "Ігнорує броню";
   if (key === "critBlow") label = "множник атаки";
      desc += `• ${label}: ${level[key]}<br>`;
    }
  }
 
 

   // ЗМІНЕНО: Показуємо вартість в мані замість золота
   if (level.upgradeCost !== null && level.upgradeCost !== undefined) {
    const manaCost = level.upgradeCost; // Використовуємо напряму як ману
    desc += `<br>🔮 Вартість відкриття: ${manaCost} мани`;
  } else if (level.level === ability.maxLevel) {
    desc += `<br>⭐️ Максимальний рівень`;
  }

  return desc;
}
// відкрити/закрити модальне вікно
// Обробники кліків на іконки здібностей
efectOne.addEventListener('click', () => {
  if (currentSelectedHero) {
    const abilities = window.getHeroAbilities(currentSelectedHero.name);
    currentSelectedAbility = abilities[0];
    currentAbilityIndex = 0;
    updateAbilityDisplay(abilities[0]);
  }
});

efectTwo.addEventListener('click', () => {
  if (currentSelectedHero) {
    const abilities = window.getHeroAbilities(currentSelectedHero.name);
    currentSelectedAbility = abilities[1];
    currentAbilityIndex = 1;
    updateAbilityDisplay(abilities[1]);
  }
});

efectThree.addEventListener('click', () => {
  if (currentSelectedHero) {
    const abilities = window.getHeroAbilities(currentSelectedHero.name);
    currentSelectedAbility = abilities[2];
    currentAbilityIndex = 2;
    updateAbilityDisplay(abilities[2]);
  }
});

// efectFour.addEventListener('click', () => {
//   if (currentSelectedHero) {
//     const abilities = window.getHeroAbilities(currentSelectedHero.name);
//     currentSelectedAbility = abilities[3];
//     currentAbilityIndex = 3;
//     updateAbilityDisplay(abilities[3]);
//   }
// });

// Функція оновлення відображення здібності
function updateAbilityDisplay(ability) {
  if (ability) {
    nameEfectBaza.textContent = ability.name;
    discriptionEfect.textContent = ability.shortDesc || ability.description;
  }
}

// відкрити/закрити модальне вікно
// відкрити/закрити модальне вікно
detalEfectBtn.onclick = () => {
  if (!currentSelectedAbility) {
    alert('Спочатку виберіть здібність!');
    return;
  }
  
  // Заповнити модальне вікно даними здібності
  modalBoxImgEfect.src = currentSelectedAbility.img;
  modalNameEfect.textContent = currentSelectedAbility.name;
  
  // Заповнити описи для кожного рівня
  const levels = currentSelectedAbility.levels;
  if (levels && levels.length >= 3) {
    modalTextEfectOne.textContent = generateLevelDescription(currentSelectedAbility, 0);
    modalTextEfectTwo.textContent = generateLevelDescription(currentSelectedAbility, 1);
    modalTextEfectThree.textContent = generateLevelDescription(currentSelectedAbility, 2);
    // modalTextEfectFour.textContent = generateLevelDescription(currentSelectedAbility, 3);
  } else {
    // Fallback якщо немає рівнів
    modalTextEfectOne.textContent = currentSelectedAbility.description;
    modalTextEfectTwo.textContent = "Дані рівня недоступні";
    modalTextEfectThree.textContent = "Дані рівня недоступні";
    // modalTextEfectFour.textContent = "Дані рівня недоступні";
  }
  
  modalWindowHeroes.style.display = "block";
}

BtnModalCloseWindow.onclick = () => {
  modalWindowHeroes.style.display = "none";
}

// Змінна для зберігання поточно вибраного героя
let currentSelectedHero = null;
let selectedHeroesSlots = [null, null, null]; // Три слоти для вибраних героїв
let currentSelectedAbility = null; // Зберігаємо вибрану здібність
let currentAbilityIndex = 0; // Індекс здібності (0-3)


// Функція відображення інформації про героя
// Функція відображення інформації про героя
function displayHeroInfo(heroData) {
  currentSelectedHero = heroData;
  
  // Основна інформація
  imgHeroes.src = heroData.img;
  topNameHeroes.textContent = heroData.name;
  attackSpanBaza.textContent = heroData.attack;
  armorSpanBaza.textContent = heroData.armor;
  hpSpanBaza.textContent = heroData.hp;  
  rangeSpanBaza.textContent = heroData.range;
  stepSpanBaza.textContent = heroData.step;
  critSpanBaza.textContent = heroData.critChance + "%";
  critSpanBlow.textContent = "x" + heroData.critBlow;
  descriptHeroes.textContent = heroData.description;
  
  // Отримати здібності героя
  const abilities = window.getHeroAbilities(heroData.name);
  
  // Відобразити іконки здібностей
  if (abilities[0]) efectOne.src = abilities[0].img;
  if (abilities[1]) efectTwo.src = abilities[1].img;
  if (abilities[2]) efectThree.src = abilities[2].img;
  // if (abilities[3]) efectFour.src = abilities[3].img;
  
  // Автоматично вибрати першу здібність
  if (abilities[0]) {
    currentSelectedAbility = abilities[0];
    currentAbilityIndex = 0;
    updateAbilityDisplay(abilities[0]);
  }
}
// Додати обробники для всіх героїв на вибір (hero-4 до hero-18)
for (let i = 4; i <= 18; i++) {
  const heroElement = document.querySelector(`#hero-${i}`);
  const heroIndex = i - 4; // hero-4 → index 0, hero-5 → index 1, і т.д.
  
  if (heroElement && heroes[heroIndex]) {
    heroElement.addEventListener('click', () => {
      displayHeroInfo(heroes[heroIndex]);
    });
  }
}

// Кліки на слоти вибраних героїв - видалити героя
for (let i = 1; i <= 3; i++) {
  const slotElement = document.querySelector(`#hero-${i}`);
  slotElement.addEventListener('click', () => {
    if (selectedHeroesSlots[i - 1]) {
      if (confirm(`Видалити ${selectedHeroesSlots[i - 1].name}?`)) {
        selectedHeroesSlots[i - 1] = null;
        slotElement.src = ""; // Повернути дефолтну картинку
      }
    }
  });
}

// Показати першого героя при завантаженні
if (heroes.length > 0) {
  displayHeroInfo(heroes[0]);
}





// ========================================
// ІНТЕГРАЦІЯ З СИСТЕМОЮ ВИБОРУ
// ========================================

// Ініціалізація системи при завантаженні сторінки
document.addEventListener('DOMContentLoaded', () => {
  // Ініціалізуємо систему вибору
  if (typeof window.initHeroesSelection === 'function') {
    window.initHeroesSelection();
  }
});

// Модифікуємо функцію вибору героя
const originalChoiceBtn = document.querySelector('.choiceHeroesBtn');
if (originalChoiceBtn) {
  originalChoiceBtn.addEventListener('click', () => {
    if (!currentSelectedHero) {
      alert('❌ Спочатку виберіть героя!');
      return;
    }
    
    // Знайти індекс героя в масиві heroes
    const heroIndex = window.heroes.findIndex(h => h.id === currentSelectedHero.id);
    
    if (heroIndex === -1) {
      // alert('❌ Помилка: герой не знайдений!');
      return;
    }
    
    // Додаємо героя до вибору через систему
    if (window.addHeroToSelection(heroIndex)) {
      // Знайти перший вільний слот (hero-1, hero-2, hero-3)
      const currentPlayerKey = `player${window.heroesSelectionSystem.currentPlayer}`;
      const selectedCount = window.heroesSelectionSystem.selectedHeroes[currentPlayerKey].length;
      
      // Відобразити в UI
      const slotElement = document.querySelector(`#hero-${selectedCount}`);
      if (slotElement) {
        slotElement.src = currentSelectedHero.img;
      }
      
      // console.log(`✅ Герой ${currentSelectedHero.name} доданий у слот ${selectedCount}`);
    }
  });
}

// Обробник кнопки ГОТОВО
const readyBtn = document.querySelector('.ChoiceHeroesBtnYes');
if (readyBtn) {
  readyBtn.addEventListener('click', () => {
    window.confirmSelection();
  });
}

// Обробник кліків на вже вибраних героїв (для скасування вибору)
for (let i = 1; i <= 3; i++) {
  const slotElement = document.querySelector(`#hero-${i}`);
  if (slotElement) {
    slotElement.addEventListener('click', () => {
      const currentPlayerKey = `player${window.heroesSelectionSystem.currentPlayer}`;
      const selectedHeroes = window.heroesSelectionSystem.selectedHeroes[currentPlayerKey];
      
      // Знаходимо героя в слоті
      const heroIndexInSlot = selectedHeroes[i - 1];
      
      if (heroIndexInSlot !== undefined) {
        if (confirm(`Видалити ${window.heroes[heroIndexInSlot].name} з вибору?`)) {
          // Видаляємо героя
          window.removeHeroFromSelection(heroIndexInSlot);
          
          // Очищаємо слот
          slotElement.src = '';
          
          // Перебудовуємо слоти
          rebuildSlots();
        }
      }
    });
  }
}

/**
 * Перебудувати відображення слотів після видалення
 */
function rebuildSlots() {
  const currentPlayerKey = `player${window.heroesSelectionSystem.currentPlayer}`;
  const selectedHeroes = window.heroesSelectionSystem.selectedHeroes[currentPlayerKey];
  
  // Очищаємо всі слоти
  for (let i = 1; i <= 3; i++) {
    const slot = document.querySelector(`#hero-${i}`);
    if (slot) slot.src = '';
  }
  
  // Заповнюємо знову
  selectedHeroes.forEach((heroIndex, slotIndex) => {
    const slot = document.querySelector(`#hero-${slotIndex + 1}`);
    if (slot && window.heroes[heroIndex]) {
      slot.src = window.heroes[heroIndex].img;
    }
  });
}