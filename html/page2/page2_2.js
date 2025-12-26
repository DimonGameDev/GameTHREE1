// ============================================
// PAGE 2_2 - Вибір гравців (нова версія)
// ============================================

// ГРАВЕЦЬ 1
let btnP1RaceLeft = document.querySelector("#btnP1RaceLeft");
let btnP1RaceRight = document.querySelector("#btnP1RaceRight");
let imgP1Race = document.querySelector("#imgP1Race img");
let nameP1Race = document.querySelector("#nameP1Race");
let btnP1TypeLeft = document.querySelector("#btnP1TypeLeft");
let btnP1TypeRight = document.querySelector("#btnP1TypeRight");
let nameP1Type = document.querySelector("#nameP1Type");
let btnP1AllianceLeft = document.querySelector("#btnP1AllianceLeft");
let btnP1AllianceRight = document.querySelector("#btnP1AllianceRight");
let allianceP1 = document.querySelector("#allianceP1");
let btnHeroesP1 = document.querySelector("#btnHeroesP1");
let btnReadyP1 = document.querySelector("#btnReadyP1");

// ГРАВЕЦЬ 2
let btnP2RaceLeft = document.querySelector("#btnP2RaceLeft");
let btnP2RaceRight = document.querySelector("#btnP2RaceRight");
let imgP2Race = document.querySelector("#imgP2Race img");
let nameP2Race = document.querySelector("#nameP2Race");
let btnP2TypeLeft = document.querySelector("#btnP2TypeLeft");
let btnP2TypeRight = document.querySelector("#btnP2TypeRight");
let nameP2Type = document.querySelector("#nameP2Type");
let btnP2AllianceLeft = document.querySelector("#btnP2AllianceLeft");
let btnP2AllianceRight = document.querySelector("#btnP2AllianceRight");
let allianceP2 = document.querySelector("#allianceP2");
let btnHeroesP2 = document.querySelector("#btnHeroesP2");
let btnReadyP2 = document.querySelector("#btnReadyP2");

// ГРАВЕЦЬ 3
let btnP3RaceLeft = document.querySelector("#btnP3RaceLeft");
let btnP3RaceRight = document.querySelector("#btnP3RaceRight");
let imgP3Race = document.querySelector("#imgP3Race img");
let nameP3Race = document.querySelector("#nameP3Race");
let btnP3TypeLeft = document.querySelector("#btnP3TypeLeft");
let btnP3TypeRight = document.querySelector("#btnP3TypeRight");
let nameP3Type = document.querySelector("#nameP3Type");
let btnP3AllianceLeft = document.querySelector("#btnP3AllianceLeft");
let btnP3AllianceRight = document.querySelector("#btnP3AllianceRight");
let allianceP3 = document.querySelector("#allianceP3");
let btnHeroesP3 = document.querySelector("#btnHeroesP3");
let btnReadyP3 = document.querySelector("#btnReadyP3");

// ГРАВЕЦЬ 4
let btnP4RaceLeft = document.querySelector("#btnP4RaceLeft");
let btnP4RaceRight = document.querySelector("#btnP4RaceRight");
let imgP4Race = document.querySelector("#imgP4Race img");
let nameP4Race = document.querySelector("#nameP4Race");
let btnP4TypeLeft = document.querySelector("#btnP4TypeLeft");
let btnP4TypeRight = document.querySelector("#btnP4TypeRight");
let nameP4Type = document.querySelector("#nameP4Type");
let btnP4AllianceLeft = document.querySelector("#btnP4AllianceLeft");
let btnP4AllianceRight = document.querySelector("#btnP4AllianceRight");
let allianceP4 = document.querySelector("#allianceP4");
let btnHeroesP4 = document.querySelector("#btnHeroesP4");
let btnReadyP4 = document.querySelector("#btnReadyP4");

// НАЛАШТУВАННЯ (Gold та Units)
let settingGoldNumber = document.querySelector(".settingsBox .settingItem:nth-child(1) .settingNumber");
let btnGoldLeft = document.querySelector(".settingsBox .settingItem:nth-child(1) .arrowBtn:first-child");
let btnGoldRight = document.querySelector(".settingsBox .settingItem:nth-child(1) .arrowBtn:last-child");

let settingUnitsNumber = document.querySelector(".settingsBox .settingItem:nth-child(2) .settingNumber");
let btnUnitsLeft = document.querySelector(".settingsBox .settingItem:nth-child(2) .arrowBtn:first-child");
let btnUnitsRight = document.querySelector(".settingsBox .settingItem:nth-child(2) .arrowBtn:last-child");

// НАВІГАЦІЯ
let navBtnBack = document.querySelector(".navBtn.back");
let navBtnNext = document.querySelector(".navBtn.next");

// Очищення старих даних вибору героїв при завантаженні сторінки
window.addEventListener('DOMContentLoaded', () => {
  // Якщо ми НЕ повертаємось з вибору героїв, очищаємо дані
  if (!localStorage.getItem('returningFromHeroesSelection')) {
    localStorage.removeItem('currentPlayerSelectingHeroes');
    localStorage.removeItem('currentPlayerAlliance');
    console.log('🧹 Очищено дані вибору героїв');
  }
});

// ============================================
// МАСИВИ ТА КОНСТАНТИ
// ============================================

let numberRasa = ["Орки", "Ельфи", "Люди", "Жуки", "Демони"];

let chuseTyp = ["Пусто", "Гравець"];

let numberClan = [1, 2, 3, 4];

let numberGoldArr = [500, 1000, 1500, 2000, 2500];

let numberUnitsArr = [10, 15, 20, 25, 30];

let photoTitle = [
  "../../img/units/orc/titleOrc.jpg",
  "../../img/units/elf/titleElf.jpg",
  "../../img/units/pipl/titlePiple.jpg",
  "../../img/units/beetle/titleBeetle.jpg",
  "../../img/units/demon/titleDemon.jpg",
];

// ============================================
// ЗМІННІ СТАНУ
// ============================================

// Індекси рас для кожного гравця
let cauntRaceP1 = 0;
let cauntRaceP2 = 0;
let cauntRaceP3 = 0;
let cauntRaceP4 = 0;

// Індекси типів (0 = Пусто, 1 = Гравець)
let cauntTypeP1 = 1; // За замовчуванням "Гравець"
let cauntTypeP2 = 1;
let cauntTypeP3 = 1;
let cauntTypeP4 = 1;

// Індекси кланів (альянсів)
let cauntAllianceP1 = 0; // Клан 1
let cauntAllianceP2 = 0; // Клан 1
let cauntAllianceP3 = 1; // Клан 2
let cauntAllianceP4 = 1; // Клан 2

// Статуси готовності
let readyP1 = false;
let readyP2 = false;
let readyP3 = false;
let readyP4 = false;

// Налаштування гри
let cauntGold = 1; // За замовчуванням 1000
let cauntUnits = 0; // За замовчуванням 10

// Вибрані герої для кожного гравця
let selectedHeroesP1 = [];
let selectedHeroesP2 = [];
let selectedHeroesP3 = [];
let selectedHeroesP4 = [];

// ============================================
// ФУНКЦІЇ ЗБЕРЕЖЕННЯ ТА ВІДНОВЛЕННЯ
// ============================================

function saveWindow2Settings() {
  const settings = {
    // Раси
    cauntRaceP1, cauntRaceP2, cauntRaceP3, cauntRaceP4,
    
    // Типи
    cauntTypeP1, cauntTypeP2, cauntTypeP3, cauntTypeP4,
    
    // Клани
    cauntAllianceP1, cauntAllianceP2, cauntAllianceP3, cauntAllianceP4,
    
    // Готовність
    readyP1, readyP2, readyP3, readyP4,
    
    // Налаштування
    cauntGold, cauntUnits,
    
    // Герої
    selectedHeroesP1, selectedHeroesP2, selectedHeroesP3, selectedHeroesP4
  };
  
  localStorage.setItem('window2Settings', JSON.stringify(settings));
  console.log('💾 Збережено налаштування:', settings);
}

function restoreWindow2Settings() {
  const savedSettings = localStorage.getItem('window2Settings');
  
  if (!savedSettings) {
    console.log('ℹ️ Збережених налаштувань немає');
    return false;
  }
  
  const settings = JSON.parse(savedSettings);
  console.log('📂 Відновлення налаштувань:', settings);
  
  // Відновлюємо раси
  if (settings.cauntRaceP1 !== undefined) {
    cauntRaceP1 = settings.cauntRaceP1;
    updateRaceDisplay(1, cauntRaceP1);
  }
  if (settings.cauntRaceP2 !== undefined) {
    cauntRaceP2 = settings.cauntRaceP2;
    updateRaceDisplay(2, cauntRaceP2);
  }
  if (settings.cauntRaceP3 !== undefined) {
    cauntRaceP3 = settings.cauntRaceP3;
    updateRaceDisplay(3, cauntRaceP3);
  }
  if (settings.cauntRaceP4 !== undefined) {
    cauntRaceP4 = settings.cauntRaceP4;
    updateRaceDisplay(4, cauntRaceP4);
  }
  
  // Відновлюємо типи
  if (settings.cauntTypeP1 !== undefined) {
    cauntTypeP1 = settings.cauntTypeP1;
    nameP1Type.innerText = chuseTyp[cauntTypeP1];
  }
  if (settings.cauntTypeP2 !== undefined) {
    cauntTypeP2 = settings.cauntTypeP2;
    nameP2Type.innerText = chuseTyp[cauntTypeP2];
  }
  if (settings.cauntTypeP3 !== undefined) {
    cauntTypeP3 = settings.cauntTypeP3;
    nameP3Type.innerText = chuseTyp[cauntTypeP3];
  }
  if (settings.cauntTypeP4 !== undefined) {
    cauntTypeP4 = settings.cauntTypeP4;
    nameP4Type.innerText = chuseTyp[cauntTypeP4];
  }
  
  // Відновлюємо клани
  if (settings.cauntAllianceP1 !== undefined) {
    cauntAllianceP1 = settings.cauntAllianceP1;
    allianceP1.innerText = numberClan[cauntAllianceP1];
  }
  if (settings.cauntAllianceP2 !== undefined) {
    cauntAllianceP2 = settings.cauntAllianceP2;
    allianceP2.innerText = numberClan[cauntAllianceP2];
  }
  if (settings.cauntAllianceP3 !== undefined) {
    cauntAllianceP3 = settings.cauntAllianceP3;
    allianceP3.innerText = numberClan[cauntAllianceP3];
  }
  if (settings.cauntAllianceP4 !== undefined) {
    cauntAllianceP4 = settings.cauntAllianceP4;
    allianceP4.innerText = numberClan[cauntAllianceP4];
  }
  
  // Відновлюємо готовність
  if (settings.readyP1 !== undefined) {
    readyP1 = settings.readyP1;
    updateReadyButton(1, readyP1);
  }
  if (settings.readyP2 !== undefined) {
    readyP2 = settings.readyP2;
    updateReadyButton(2, readyP2);
  }
  if (settings.readyP3 !== undefined) {
    readyP3 = settings.readyP3;
    updateReadyButton(3, readyP3);
  }
  if (settings.readyP4 !== undefined) {
    readyP4 = settings.readyP4;
    updateReadyButton(4, readyP4);
  }
  
  // Відновлюємо налаштування
  if (settings.cauntGold !== undefined) {
    cauntGold = settings.cauntGold;
    settingGoldNumber.innerText = numberGoldArr[cauntGold];
  }
  if (settings.cauntUnits !== undefined) {
    cauntUnits = settings.cauntUnits;
    settingUnitsNumber.innerText = numberUnitsArr[cauntUnits];
  }
  
  // Відновлюємо героїв
  if (settings.selectedHeroesP1) selectedHeroesP1 = settings.selectedHeroesP1;
  if (settings.selectedHeroesP2) selectedHeroesP2 = settings.selectedHeroesP2;
  if (settings.selectedHeroesP3) selectedHeroesP3 = settings.selectedHeroesP3;
  if (settings.selectedHeroesP4) selectedHeroesP4 = settings.selectedHeroesP4;
  
  console.log('✅ Налаштування відновлено!');
  return true;
}

// ============================================
// ДОПОМІЖНІ ФУНКЦІЇ
// ============================================

function updateRaceDisplay(playerNum, raceIndex) {
  switch(playerNum) {
    case 1:
      nameP1Race.innerText = numberRasa[raceIndex];
      imgP1Race.src = photoTitle[raceIndex];
      break;
    case 2:
      nameP2Race.innerText = numberRasa[raceIndex];
      imgP2Race.src = photoTitle[raceIndex];
      break;
    case 3:
      nameP3Race.innerText = numberRasa[raceIndex];
      imgP3Race.src = photoTitle[raceIndex];
      break;
    case 4:
      nameP4Race.innerText = numberRasa[raceIndex];
      imgP4Race.src = photoTitle[raceIndex];
      break;
  }
}

function updateReadyButton(playerNum, isReady) {
  let btn;
  switch(playerNum) {
    case 1: btn = btnReadyP1; break;
    case 2: btn = btnReadyP2; break;
    case 3: btn = btnReadyP3; break;
    case 4: btn = btnReadyP4; break;
  }
  
  if (isReady) {
    btn.style.backgroundColor = "#4CAF50"; // Зелений
    btn.innerText = "✓ Готов";
  } else {
    btn.style.backgroundColor = ""; // Дефолтний колір
    btn.innerText = "Готов";
  }
}

// Функція оновлення стану кнопки героїв
function updateHeroesButtonState(playerNum) {
  let btn, selectedHeroes;
  
  switch(playerNum) {
    case 1: 
      btn = btnHeroesP1; 
      selectedHeroes = selectedHeroesP1;
      break;
    case 2: 
      btn = btnHeroesP2; 
      selectedHeroes = selectedHeroesP2;
      break;
    case 3: 
      btn = btnHeroesP3; 
      selectedHeroes = selectedHeroesP3;
      break;
    case 4: 
      btn = btnHeroesP4; 
      selectedHeroes = selectedHeroesP4;
      break;
  }
  
  if (selectedHeroes && selectedHeroes.length === 3) {
    btn.style.backgroundColor = "#2196F3"; // Синій
    btn.innerText = "✓ Герої вибрані";
  } else {
    btn.style.backgroundColor = ""; // Дефолтний колір
    btn.innerText = "Герої";
  }
}

// Функція перевірки чи всі активні гравці готові
function checkAllPlayersReady() {
  const players = [
    { type: cauntTypeP1, ready: readyP1, heroes: selectedHeroesP1, alliance: cauntAllianceP1 },
    { type: cauntTypeP2, ready: readyP2, heroes: selectedHeroesP2, alliance: cauntAllianceP2 },
    { type: cauntTypeP3, ready: readyP3, heroes: selectedHeroesP3, alliance: cauntAllianceP3 },
    { type: cauntTypeP4, ready: readyP4, heroes: selectedHeroesP4, alliance: cauntAllianceP4 }
  ];
  
  const activePlayers = players.filter((p, i) => {
    const typeIndex = [cauntTypeP1, cauntTypeP2, cauntTypeP3, cauntTypeP4][i];
    return chuseTyp[typeIndex] === "Гравець";
  });
  
  // Перевірка: чи є хоч один активний гравець
  if (activePlayers.length === 0) {
    return { allReady: false, message: "❌ Немає активних гравців!\n\nВстановіть хоча б двом гравцям тип 'Гравець'." };
  }
  
  // Перевірка: чи є мінімум 2 гравці
  if (activePlayers.length < 2) {
    return { 
      allReady: false, 
      message: "❌ Недостатньо гравців!\n\nДля гри потрібно мінімум 2 гравці." 
    };
  }
  
  // Перевірка: чи є гравці з різних альянсів
  const alliances = activePlayers.map(p => p.alliance);
  const uniqueAlliances = [...new Set(alliances)];
  
  if (uniqueAlliances.length < 2) {
    return { 
      allReady: false, 
      message: "⚔️ Всі гравці в одному альянсі!\n\nДля гри потрібно мінімум 2 різних альянси (команди)." 
    };
  }
  
  // Перевірка: чи всі вибрали героїв
  const withoutHeroes = activePlayers.filter(p => !p.heroes || p.heroes.length !== 3);
  
  if (withoutHeroes.length > 0) {
    return { 
      allReady: false, 
      message: `⚠️ Не всі гравці вибрали героїв!\n\nГравців без героїв: ${withoutHeroes.length}` 
    };
  }
  
  // Перевірка: чи всі готові
  const notReady = activePlayers.filter(p => !p.ready);
  
  if (notReady.length > 0) {
    return { 
      allReady: false, 
      message: `⏳ Не всі гравці готові!\n\nЧекаємо ще ${notReady.length} ${notReady.length === 1 ? 'гравця' : 'гравців'}` 
    };
  }
  
  return { allReady: true, message: "" };
}

// Функція оновлення стану кнопки "Далі"
function updateNextButtonState() {
  const status = checkAllPlayersReady();
  
  if (status.allReady) {
    navBtnNext.style.opacity = "1";
    navBtnNext.style.cursor = "pointer";
    navBtnNext.style.backgroundColor = "#4CAF50"; // Зелений
    navBtnNext.disabled = false;
  } else {
    navBtnNext.style.opacity = "0.5";
    navBtnNext.style.cursor = "not-allowed";
    navBtnNext.style.backgroundColor = ""; // Дефолтний
    navBtnNext.disabled = false; // Залишаємо enabled для показу підказки
  }
}
// ============================================
// ГРАВЕЦЬ 1 - РАСА
// ============================================

btnP1RaceLeft.onclick = () => {
  cauntRaceP1--;
  if (cauntRaceP1 < 0) cauntRaceP1 = numberRasa.length - 1;
  updateRaceDisplay(1, cauntRaceP1);
};

btnP1RaceRight.onclick = () => {
  cauntRaceP1++;
  if (cauntRaceP1 >= numberRasa.length) cauntRaceP1 = 0;
  updateRaceDisplay(1, cauntRaceP1);
};

// ГРАВЕЦЬ 1 - ТИП

btnP1TypeLeft.onclick = () => {
  cauntTypeP1--;
  if (cauntTypeP1 < 0) cauntTypeP1 = 0;
  nameP1Type.innerText = chuseTyp[cauntTypeP1];
};

btnP1TypeRight.onclick = () => {
  cauntTypeP1++;
  if (cauntTypeP1 >= chuseTyp.length) cauntTypeP1 = chuseTyp.length - 1;
  nameP1Type.innerText = chuseTyp[cauntTypeP1];
};

// ГРАВЕЦЬ 1 - АЛЬЯНС

btnP1AllianceLeft.onclick = () => {
  cauntAllianceP1--;
  if (cauntAllianceP1 < 0) cauntAllianceP1 = 0;
  allianceP1.innerText = numberClan[cauntAllianceP1];
};

btnP1AllianceRight.onclick = () => {
  cauntAllianceP1++;
  if (cauntAllianceP1 >= numberClan.length) cauntAllianceP1 = numberClan.length - 1;
  allianceP1.innerText = numberClan[cauntAllianceP1];
};

// ГРАВЕЦЬ 1 - КНОПКА ГОТОВНОСТІ

btnReadyP1.onclick = () => {
  // Перевіряємо чи вибрані герої
  if (!selectedHeroesP1 || selectedHeroesP1.length !== 3) {
    alert('❌ Спочатку виберіть 3 героїв!');
    return;
  }
  
  readyP1 = !readyP1;
  updateReadyButton(1, readyP1);
  updateNextButtonState();
  saveWindow2Settings();
};

// ============================================
// ГРАВЕЦЬ 2 - РАСА
// ============================================

btnP2RaceLeft.onclick = () => {
  cauntRaceP2--;
  if (cauntRaceP2 < 0) cauntRaceP2 = numberRasa.length - 1;
  updateRaceDisplay(2, cauntRaceP2);
};

btnP2RaceRight.onclick = () => {
  cauntRaceP2++;
  if (cauntRaceP2 >= numberRasa.length) cauntRaceP2 = 0;
  updateRaceDisplay(2, cauntRaceP2);
};

// ГРАВЕЦЬ 2 - ТИП

btnP2TypeLeft.onclick = () => {
  cauntTypeP2--;
  if (cauntTypeP2 < 0) cauntTypeP2 = 0;
  nameP2Type.innerText = chuseTyp[cauntTypeP2];
};

btnP2TypeRight.onclick = () => {
  cauntTypeP2++;
  if (cauntTypeP2 >= chuseTyp.length) cauntTypeP2 = chuseTyp.length - 1;
  nameP2Type.innerText = chuseTyp[cauntTypeP2];
};

// ГРАВЕЦЬ 2 - АЛЬЯНС

btnP2AllianceLeft.onclick = () => {
  cauntAllianceP2--;
  if (cauntAllianceP2 < 0) cauntAllianceP2 = 0;
  allianceP2.innerText = numberClan[cauntAllianceP2];
};

btnP2AllianceRight.onclick = () => {
  cauntAllianceP2++;
  if (cauntAllianceP2 >= numberClan.length) cauntAllianceP2 = numberClan.length - 1;
  allianceP2.innerText = numberClan[cauntAllianceP2];
};

// ГРАВЕЦЬ 2 - КНОПКА ГОТОВНОСТІ

btnReadyP2.onclick = () => {
  if (!selectedHeroesP2 || selectedHeroesP2.length !== 3) {
    alert('❌ Спочатку виберіть 3 героїв!');
    return;
  }
  
  readyP2 = !readyP2;
  updateReadyButton(2, readyP2);
  updateNextButtonState();
  saveWindow2Settings();
};

// ============================================
// ГРАВЕЦЬ 3 - РАСА
// ============================================

btnP3RaceLeft.onclick = () => {
  cauntRaceP3--;
  if (cauntRaceP3 < 0) cauntRaceP3 = numberRasa.length - 1;
  updateRaceDisplay(3, cauntRaceP3);
};

btnP3RaceRight.onclick = () => {
  cauntRaceP3++;
  if (cauntRaceP3 >= numberRasa.length) cauntRaceP3 = 0;
  updateRaceDisplay(3, cauntRaceP3);
};

// ГРАВЕЦЬ 3 - ТИП

btnP3TypeLeft.onclick = () => {
  cauntTypeP3--;
  if (cauntTypeP3 < 0) cauntTypeP3 = 0;
  nameP3Type.innerText = chuseTyp[cauntTypeP3];
};

btnP3TypeRight.onclick = () => {
  cauntTypeP3++;
  if (cauntTypeP3 >= chuseTyp.length) cauntTypeP3 = chuseTyp.length - 1;
  nameP3Type.innerText = chuseTyp[cauntTypeP3];
};

// ГРАВЕЦЬ 3 - АЛЬЯНС

btnP3AllianceLeft.onclick = () => {
  cauntAllianceP3--;
  if (cauntAllianceP3 < 0) cauntAllianceP3 = 0;
  allianceP3.innerText = numberClan[cauntAllianceP3];
};

btnP3AllianceRight.onclick = () => {
  cauntAllianceP3++;
  if (cauntAllianceP3 >= numberClan.length) cauntAllianceP3 = numberClan.length - 1;
  allianceP3.innerText = numberClan[cauntAllianceP3];
};

// ГРАВЕЦЬ 3 - КНОПКА ГОТОВНОСТІ

btnReadyP3.onclick = () => {
  if (!selectedHeroesP3 || selectedHeroesP3.length !== 3) {
    alert('❌ Спочатку виберіть 3 героїв!');
    return;
  }
  
  readyP3 = !readyP3;
  updateReadyButton(3, readyP3);
  updateNextButtonState();
  saveWindow2Settings();
};

// ============================================
// ГРАВЕЦЬ 4 - РАСА
// ============================================

btnP4RaceLeft.onclick = () => {
  cauntRaceP4--;
  if (cauntRaceP4 < 0) cauntRaceP4 = numberRasa.length - 1;
  updateRaceDisplay(4, cauntRaceP4);
};

btnP4RaceRight.onclick = () => {
  cauntRaceP4++;
  if (cauntRaceP4 >= numberRasa.length) cauntRaceP4 = 0;
  updateRaceDisplay(4, cauntRaceP4);
};

// ГРАВЕЦЬ 4 - ТИП

btnP4TypeLeft.onclick = () => {
  cauntTypeP4--;
  if (cauntTypeP4 < 0) cauntTypeP4 = 0;
  nameP4Type.innerText = chuseTyp[cauntTypeP4];
};

btnP4TypeRight.onclick = () => {
  cauntTypeP4++;
  if (cauntTypeP4 >= chuseTyp.length) cauntTypeP4 = chuseTyp.length - 1;
  nameP4Type.innerText = chuseTyp[cauntTypeP4];
};

// ГРАВЕЦЬ 4 - АЛЬЯНС

btnP4AllianceLeft.onclick = () => {
  cauntAllianceP4--;
  if (cauntAllianceP4 < 0) cauntAllianceP4 = 0;
  allianceP4.innerText = numberClan[cauntAllianceP4];
};

btnP4AllianceRight.onclick = () => {
  cauntAllianceP4++;
  if (cauntAllianceP4 >= numberClan.length) cauntAllianceP4 = numberClan.length - 1;
  allianceP4.innerText = numberClan[cauntAllianceP4];
};

// ГРАВЕЦЬ 4 - КНОПКА ГОТОВНОСТІ

btnReadyP4.onclick = () => {
  if (!selectedHeroesP4 || selectedHeroesP4.length !== 3) {
    alert('❌ Спочатку виберіть 3 героїв!');
    return;
  }
  
  readyP4 = !readyP4;
  updateReadyButton(4, readyP4);
  updateNextButtonState();
  saveWindow2Settings();
};

// ============================================
// НАЛАШТУВАННЯ - ЗОЛОТО
// ============================================

btnGoldLeft.onclick = () => {
  cauntGold--;
  if (cauntGold < 0) cauntGold = 0;
  settingGoldNumber.innerText = numberGoldArr[cauntGold];
};

btnGoldRight.onclick = () => {
  cauntGold++;
  if (cauntGold >= numberGoldArr.length) cauntGold = numberGoldArr.length - 1;
  settingGoldNumber.innerText = numberGoldArr[cauntGold];
};

// ============================================
// НАЛАШТУВАННЯ - ЮНІТИ
// ============================================

btnUnitsLeft.onclick = () => {
  cauntUnits--;
  if (cauntUnits < 0) cauntUnits = 0;
  settingUnitsNumber.innerText = numberUnitsArr[cauntUnits];
};

btnUnitsRight.onclick = () => {
  cauntUnits++;
  if (cauntUnits >= numberUnitsArr.length) cauntUnits = numberUnitsArr.length - 1;
  settingUnitsNumber.innerText = numberUnitsArr[cauntUnits];
};

// ============================================
// ВИБІР ГЕРОЇВ (НОВА ЛОГІКА)
// ============================================

// Функція переходу на вибір героїв для конкретного гравця
function goToHeroSelection(playerNum) {
  console.log('='.repeat(50));
  console.log('🎯 НАТИСНУТО кнопку "Герої" для гравця:', playerNum);
  
  // Зберігаємо поточні налаштування
  saveWindow2Settings();
  
  // Зберігаємо номер гравця, який вибирає героїв
  localStorage.setItem('currentPlayerSelectingHeroes', playerNum.toString());
  console.log('✅ Збережено в localStorage currentPlayerSelectingHeroes:', playerNum.toString());
  
  // Визначаємо альянс (клан) гравця
  let playerAlliance;
  switch(playerNum) {
    case 1: playerAlliance = cauntAllianceP1; break;
    case 2: playerAlliance = cauntAllianceP2; break;
    case 3: playerAlliance = cauntAllianceP3; break;
    case 4: playerAlliance = cauntAllianceP4; break;
  }
  
  console.log('📊 Альянс гравця:', playerAlliance);
  
  // Зберігаємо альянс гравця для визначення кольору героїв
  localStorage.setItem('currentPlayerAlliance', playerAlliance.toString());
  console.log('✅ Збережено в localStorage currentPlayerAlliance:', playerAlliance.toString());
  
  // Маркер що ми пішли на вибір героїв
  localStorage.setItem('returningFromHeroesSelection', 'true');
  
  console.log(`➡️ Гравець ${playerNum} (Альянс ${playerAlliance + 1}) йде вибирати героїв`);
  console.log('='.repeat(50));
  
  // Перехід на сторінку вибору героїв
  window.location.href = '../page2Heroes/page2_1heroes.html';
}
// Кнопки вибору героїв для кожного гравця
btnHeroesP1.onclick = () => {
  if (chuseTyp[cauntTypeP1] !== "Гравець") {
    alert('❌ Спочатку встановіть тип "Гравець" для Гравця 1');
    return;
  }
  goToHeroSelection(1);
};

btnHeroesP2.onclick = () => {
  if (chuseTyp[cauntTypeP2] !== "Гравець") {
    alert('❌ Спочатку встановіть тип "Гравець" для Гравця 2');
    return;
  }
  goToHeroSelection(2);
};

btnHeroesP3.onclick = () => {
  if (chuseTyp[cauntTypeP3] !== "Гравець") {
    alert('❌ Спочатку встановіть тип "Гравець" для Гравця 3');
    return;
  }
  goToHeroSelection(3);
};

btnHeroesP4.onclick = () => {
  if (chuseTyp[cauntTypeP4] !== "Гравець") {
    alert('❌ Спочатку встановіть тип "Гравець" для Гравця 4');
    return;
  }
  goToHeroSelection(4);
};

// ============================================
// НАВІГАЦІЯ
// ============================================

navBtnBack.onclick = () => {
  // Очищаємо всі дані перед поверненням
  localStorage.removeItem('window2Settings');
  localStorage.removeItem('returningFromHeroesSelection');
  localStorage.removeItem('currentPlayerSelectingHeroes');
  
  console.log('🗑️ Очищено дані перед поверненням');
  window.location.href = "../page1/page1.html";
};

navBtnNext.onclick = () => {
  // Перевіряємо готовність всіх гравців
  const status = checkAllPlayersReady();
  
  if (!status.allReady) {
    alert(status.message);
    return;
  }
  
  // Очищаємо старий стан гри
  localStorage.removeItem("gameState");
  
  let initialGold = numberGoldArr[cauntGold];
  
  let gameSettings = {
    players: [
      {
        race: numberRasa[cauntRaceP1],
        type: chuseTyp[cauntTypeP1],
        clan: numberClan[cauntAllianceP1],
        gold: initialGold,
        heroes: selectedHeroesP1,
        ready: readyP1,
        active: chuseTyp[cauntTypeP1] === "Гравець"
      },
      {
        race: numberRasa[cauntRaceP2],
        type: chuseTyp[cauntTypeP2],
        clan: numberClan[cauntAllianceP2],
        gold: initialGold,
        heroes: selectedHeroesP2,
        ready: readyP2,
        active: chuseTyp[cauntTypeP2] === "Гравець"
      },
      {
        race: numberRasa[cauntRaceP3],
        type: chuseTyp[cauntTypeP3],
        clan: numberClan[cauntAllianceP3],
        gold: initialGold,
        heroes: selectedHeroesP3,
        ready: readyP3,
        active: chuseTyp[cauntTypeP3] === "Гравець"
      },
      {
        race: numberRasa[cauntRaceP4],
        type: chuseTyp[cauntTypeP4],
        clan: numberClan[cauntAllianceP4],
        gold: initialGold,
        heroes: selectedHeroesP4,
        ready: readyP4,
        active: chuseTyp[cauntTypeP4] === "Гравець"
      }
    ],
    units: numberUnitsArr[cauntUnits]
  };
  
  console.log('✅ Всі гравці готові!');
  console.log('📦 gameSettings для передачі:', gameSettings);
  
  localStorage.setItem("gameSettings", JSON.stringify(gameSettings));
  
  // Очищаємо тимчасові дані
  localStorage.removeItem('window2Settings');
  localStorage.removeItem('returningFromHeroesSelection');
  localStorage.removeItem('currentPlayerSelectingHeroes');
  
  console.log('🗑️ Очищено тимчасові дані');
  console.log('➡️ Перехід на page3');
  
  window.location.href = "../page3/page3.html";
};

// ============================================
// ІНІЦІАЛІЗАЦІЯ ПРИ ЗАВАНТАЖЕННІ
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Перевіряємо чи повертаємось з вибору героїв
  const returningFromHeroes = localStorage.getItem('returningFromHeroesSelection');
  
  if (returningFromHeroes === 'true') {
    console.log('🔙 Повернення з вибору героїв');
    
    // Відновлюємо налаштування
    restoreWindow2Settings();
    
    // Перевіряємо чи були вибрані герої
    const playerNum = localStorage.getItem('currentPlayerSelectingHeroes');
    const selectedHeroes = localStorage.getItem('selectedHeroesForPlayer' + playerNum);
    
    if (selectedHeroes) {
      const heroes = JSON.parse(selectedHeroes);
      console.log(`✅ Завантажено героїв для Гравця ${playerNum}:`, heroes);
      
      // Зберігаємо героїв у відповідну змінну
      switch(playerNum) {
        case '1': selectedHeroesP1 = heroes; break;
        case '2': selectedHeroesP2 = heroes; break;
        case '3': selectedHeroesP3 = heroes; break;
        case '4': selectedHeroesP4 = heroes; break;
      }
      
      // Оновлюємо стан кнопки героїв
      updateHeroesButtonState(parseInt(playerNum));
      
      // Очищаємо тимчасові дані героїв
      localStorage.removeItem('selectedHeroesForPlayer' + playerNum);
    }
    
  } else {
    console.log('🆕 Свіжий старт page2_2');
    
    // Встановлюємо початкові значення
    settingGoldNumber.innerText = numberGoldArr[cauntGold];
    settingUnitsNumber.innerText = numberUnitsArr[cauntUnits];
    
    // Очищаємо старі налаштування
    localStorage.removeItem('window2Settings');
  }
  
  // Оновлюємо стан кнопок героїв для всіх гравців
  updateHeroesButtonState(1);
  updateHeroesButtonState(2);
  updateHeroesButtonState(3);
  updateHeroesButtonState(4);
  
  // Оновлюємо стан кнопки "Далі"
  updateNextButtonState();
});