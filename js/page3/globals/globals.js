let map = document.querySelector(".map");
let viewport = document.querySelector(".window");


// ВЕРХНЯ ЛІНІЯ-----------
// колір прапора гравця
let FlagColorPlayer = document.querySelector(".FlagColorPlayer");
// номер гравця
let flagTopNumberPlayer = document.querySelector(".flagTopNumberPlayer");
// скільки юнітів на полі зараз
let cauntNowUnits = document.querySelector(".cauntNowUnits");
// скільки юнітів на полі максимум
let maxUnits = document.querySelector(".maxUnits");


// Глобальні змінні гри
// let currentRound = 1;           // Поточний раунд гри
// let maxUnitsOnField = 0;        // Максимальна кількість юнітів на полі

// Глобальні змінні гри
let currentRound = 1;           // Поточний раунд гри
let maxUnitsOnField = 0;        // Максимальна кількість юнітів на полі
let currentPlayerIndex = 0;     // Поточний гравець
let players = [];               // Масив активних гравців
let unitsOnMap = [];            // Юніти на карті
let loadedFromSave = false;     // Чи завантажена гра зі збереження
let colorFlag = [               // Кольори прапорів для 4 гравців
    "rgb(255, 80, 80)",         // Гравець 1 - червоний
    "rgb(80, 80, 255)",         // Гравець 2 - синій  
    "rgb(80, 255, 80)",         // Гравець 3 - зелений
    "rgb(255, 220, 80)"         // Гравець 4 - жовтий
];

// Масив захоплених хаток золота
if (!window.capturedGoldHouses) {
  window.capturedGoldHouses = [];
}


// скільки золота
let goldNumber = document.querySelector(".goldNumber");

// картинка у клітинці
let cellImgInfo = document.querySelector(".cellImgInfo img");

// табло плюс броня
let tabloPlusArmor = document.querySelector(".tabloPlusArmor");

// табло назва юніта
let daniUnitsName = document.querySelector(".daniUnitsName");

// табло кількість ходу
let daniUnitsStep = document.querySelector(".daniUnitsStep");

// табло дальність атаки
let daniUnitsRange = document.querySelector(".daniUnitsRange");

// табло броня
let daniUnitsArmor = document.querySelector(".daniUnitsArmor");

let daniUnitsCrit = document.querySelector(".daniUnitsCrit");
// табло мани
let manaUnits = document.querySelector(".manaUnits");

let manaUnitsNow = document.querySelector(".manaUnitsNow");
let manaUnitsThreshold = document.querySelector(".manaUnitsThreshold");
let unitLevelNow = document.querySelector(".unitLevelNow");

// табло хп юніта зараз
let daniUnitsHp = document.querySelector(".daniUnitsHp");

// табло хп юніта після атак
let daniUnitsHpNew = document.querySelector(".daniUnitsHpNew");

// табло атаки юніта
let daniUnitsAtack = document.querySelector(".daniUnitsAtack");


// кнопка захопити хатку золота
let BtnActiveHauseGoldCapture = document.querySelector(".BtnActiveHauseGoldCapture");

// кнопка закінчити хід цим юнітом
let BtnActiveUnitEndTurn = document.querySelector(".BtnActiveUnitEndTurn");


// НИЖНЯ ЛІНІЯ---------------

// let bottomLine = document.querySelector(".bottomLine");
// кнопка ефектів всіх
// кнопка ефектів всіх
let BtnMagicUnitsTablo = document.querySelector("#BtnMagicUnitsTablo");

// 👇 ДОДАЙТЕ ЦЕ:
// модальне вікно ефектів всіх
let ModalMagicUnits = document.querySelector(".ModalMagicUnits");
let ModalMagicCentralBox = document.querySelector(".ModalMagicCentralBox");
let BtnModalMagicCentralActive = document.querySelector(".BtnModalMagicCentralActive");

// слоти для ефектів (4 картинки)
let modMagicItem1 = document.querySelector("#modMagicItem-1");
let modMagicItem2 = document.querySelector("#modMagicItem-2");
let modMagicItem3 = document.querySelector("#modMagicItem-3");
let modMagicItem4 = document.querySelector("#modMagicItem-4");


// опис ефекту на зеленому фоні в модальному вікні
let modMagicBoxText = document.querySelector(".modMagicBoxText");

let modMagicBoxTextTitle = document.querySelector(".modMagicBoxTextTitle");
let modMagicBoxTextDescription = document.querySelector(".modMagicBoxTextDescription");
let ModMagicNumberLevel = document.querySelector(".ModMagicNumberLevel");
let ModMagicNameNextLevel = document.querySelector(".ModMagicNameNextLevel");
let ModMagicCloseModalMagic = document.querySelector(".ModMagicCloseModalMagic");
// кнопка ефектів юнітів
let BtnEfectUnitsTablo = document.querySelector("#BtnEfectUnitsTablo");

// кнопка ефектів героїв
let BtnEfectHeroesTablo = document.querySelector("#BtnEfectHeroesTablo");

let ManaHeroesTablo = document.querySelector(".ManaHeroesTablo");

// кнопка атака
let BtnAttackTablo = document.querySelector("#BtnAttackTablo");

// кнопка наступний юніт
let BtnNextTablo = document.querySelector("#BtnNextTablo");

// кнопка наступний хід
let btnNextTurn = document.querySelector("#BtnNextMoveGameTablo");






// -------МОДАЛЬНЕ ВІКНО ефектів ЮНІТІВ-------------
let modalEfectUnits = document.querySelector(".modalEfectUnits");

//кнопка закрити модальне вікно
let BoxModEfeUnitsTopLineClose = document.querySelector(".BoxModEfeUnitsTopLineClose");

//модальне вікно картинка ефекту
let modEfeUnitsItemsTitleImg = document.querySelector(".modEfeUnitsItemsTitle img");

//модальне вікно назва ефекту
let modEfeUnitsItemsTitle = document.querySelector(".modEfeUnitsItemsTitle span");

//кількість ходів до закінчення ефекту
let modEfeUnitsItmsColdwin = document.querySelector(".modEfeUnitsItmsColdwin");

//опис ефекту
let modEfeUnitsItemsDescription = document.querySelector(".modEfeUnitsItemsDescription");

// -------МОДАЛЬНЕ ВІКНО ГЕРОЇВ-------------
//кнопка закрити модальне вікно
let modalEfectHeroes = document.querySelector(".modalEfectHeroes");

let manaHeroesNow = document.querySelector(".manaHeroesNow");
let modalEfectHeroes1 = document.querySelector("#heroImgHero-1");
let modalEfectHeroes2 = document.querySelector("#heroImgHero-2");
let modalEfectHeroes3 = document.querySelector("#heroImgHero-3");

let modEfeHerNameHeroes = document.querySelector(".modEfeHerNameHeroes");

let BoxModEfeHerCloseBtn = document.querySelector(".BoxModEfeHeroesTopLineClose img");

let modEfeHerImg = document.querySelector(".modEfeHerCenterLeft img");

let modEfeHerItemStep = document.querySelector(".modEfeHerItemStep span");
let modEfeHerItemRange = document.querySelector(".modEfeHerItemRange span");
let modEfeHerItemAttack = document.querySelector(".modEfeHerItemAttack span");
let modEfeHerItemArmor = document.querySelector(".modEfeHerItemArmor span");
let modEfeHerItemHp = document.querySelector(".modEfeHerItemHp span");
let modEfeHerItemHpNew = document.querySelector(".modEfeHerItemHpNew");
let modEfeHerItemCriticalStrike = document.querySelector(".modEfeHerItemCriticalStrike span");
let modEfeHerItemCriticalBlow = document.querySelector(".modEfeHerItemCriticalBlow span");

let heroImgEfect1 = document.querySelector("#heroImgEfect-1");
let heroImgEfect2 = document.querySelector("#heroImgEfect-2");
let heroImgEfect3 = document.querySelector("#heroImgEfect-3");
// let heroImgEfect4 = document.querySelector("#heroImgEfect-4");

// назва здібності
let modEfeHerTextLineTitle = document.querySelector(".modEfeHerTextLineTitle span");

// опис здібності
let modEfeHerTextLineDescription = document.querySelector(".modEfeHerTextLineDescription span");

// кнопка активації здібності
let efectHeroBtn1 = document.querySelector("#efectHeroBtn-1");
let efectHeroBtn2 = document.querySelector("#efectHeroBtn-2");
let efectHeroBtn3 = document.querySelector("#efectHeroBtn-3");
let efectHeroBtn4 = document.querySelector("#efectHeroBtn-4");

// опис рівня здібності
let efectHeroText1 = document.querySelector("#efectHeroText-1");
let efectHeroText2 = document.querySelector("#efectHeroText-2");
let efectHeroText3 = document.querySelector("#efectHeroText-3");
let efectHeroText4 = document.querySelector("#efectHeroText-4");


// ----------------МОДАЛЬНЕ ВІКНО МАГАЗИНУ-------------

//для відкриття магазину
let btnBuyCastle = document.querySelector(".btnBuyCastle")



//модальне вікно з низу
let ModalWindowsShop = document.querySelector(".ModalWindowsShop")

//кнопка інформація в магазині
let modalBtnLineInfo = document.querySelector(".modalBtnLineInfo")

//для назва поточної раси
let modalNameRace =  document.querySelector(".modalNameRace")


//для закриття магазину
let modalBtnClose =  document.querySelector(".modalBtnLineClose")



//модальне вікно з низу
let modalWinows = document.querySelector(".ModalWinows")



//кнопка покупки юніта в замку
let ModalBtnBuyUnits = document.querySelector(".ModalBtnBuyUnits")

//кнопка покупки юніта в замку
let topLineBtnBuyUnits = document.querySelector(".topLineBtnBuyUnits")

//кнопка покупки юніта в замку
let modalBtnBuyUnitsName = document.querySelector(".modalBtnBuyUnitsName span")


//кнопка покупки юніта,зявляється  при виборі юніта
let btnShopsBuy = document.querySelector(".btnShopsBuy")
// назва вибраного юніта на кнопці покупки
let nameUnitsBuy = document.querySelector(".nameUnitsBuy")




// місце для типу здібності
let typeAbility = document.querySelector(".typeAbility")

let modalBottomLineWrapper = document.querySelector(".modalBottomLine");


let scrollWrapper = document.querySelector(".scrollWrapper")

//весь ітем
let modalItem = document.querySelectorAll(".modalItem")

//картинка
let imgBoxModal = document.querySelector(".imgBoxModal img")

//тип/імя
let modalName = document.querySelector("#modalName")

//дальність ходу
let modalStep = document.querySelector("#modalStep")

//дальність атаки
let modalRange = document.querySelector("#modalRange")

//броня
let modalArmor = document.querySelector(".modalArmor span")

//хп
let modalHells = document.querySelector(".modalHells span")

//атака
let modalAtacks = document.querySelector(".modalAtacks span")


// ----------------МОДАЛЬНЕ ВІКНО інформації про ЮНІТІВ-------------
let modalInfoUnits = document.querySelector(".ModalInfoUnits")

let arrowLeft = document.querySelector(".arrowLeft")
let nameRase = document.querySelector(".nameRase")
let arrowRight = document.querySelector(".arrowRight")
let closeWindows = document.querySelector(".closeWindows")
let topContainer = document.querySelector(".topContainer")
let boxImg = document.querySelector(".boxImg")
let boxNameText = document.querySelector(".boxNameText")
let nameUnits = document.querySelector(".nameUnits")
let textUnit = document.querySelector(".textUnit")
let daniStep = document.querySelector(".daniStep")
let daniRange = document.querySelector(".daniRange")
let daniArmor = document.querySelector(".daniArmor")
let daniHp = document.querySelector(".daniHp")
let daniAttack = document.querySelector(".daniAttack")
let discripText = document.querySelector(".discripText")


let bottomContainer = document.querySelector(".bottomContainer")
let nextLevel = document.querySelector(".nextLevel")
let lineNameMagic = document.querySelector(".lineNameMagic")
let imgBoxLevel = document.querySelector(".imgBoxLevel")

let nameNextLevel = document.querySelector(".nameNextLevel")
let numberLevel = document.querySelector(".numberLevel")
let discriptionLevel = document.querySelector(".discriptionLevel")




// 1 блок
let leftSideOneImg = document.querySelector(".leftSideOneImg")
let leftSideOneName = document.querySelector(".leftSideOneName")
let leftSideOneNumber = document.querySelector(".leftSideOneNumber")
let leftSideOneDescription = document.querySelector(".leftSideOneDescription")


// 2 блок
let leftSideTwoImg = document.querySelector(".leftSideTwoImg")
let leftSideTwoName = document.querySelector(".leftSideTwoName")
let leftSideTwoNumber = document.querySelector(".leftSideTwoNumber")
let leftSideTwoDescription = document.querySelector(".leftSideTwoDescription")

// 3 блок
let leftSideThreeImg = document.querySelector(".leftSideThreeImg")
let leftSideThreeName = document.querySelector(".leftSideThreeName")
let leftSideThreeNumber = document.querySelector(".leftSideThreeNumber")
let leftSideThreeDescription = document.querySelector(".leftSideThreeDescription")

// 4 блок
let leftSideFourImg = document.querySelector(".leftSideFourImg")
let leftSideFourName = document.querySelector(".leftSideFourName")
let leftSideFourNumber = document.querySelector(".leftSideFourNumber")
let leftSideFourDescription = document.querySelector(".leftSideFourDescription")  

// 5 блок
let rightSideOneImg = document.querySelector(".rightSideOneImg")
let rightSideOneName = document.querySelector(".rightSideOneName")
let rightSideOneNumber = document.querySelector(".rightSideOneNumber")
let rightSideOneDescription = document.querySelector(".rightSideOneDescription")

// 6 блок
let rightSideTwoImg = document.querySelector(".rightSideTwoImg")
let rightSideTwoName = document.querySelector(".rightSideTwoName")
let rightSideTwoNumber = document.querySelector(".rightSideTwoNumber")
let rightSideTwoDescription = document.querySelector(".rightSideTwoDescription")

// 7 блок
let rightSideThreeImg = document.querySelector(".rightSideThreeImg")
let rightSideThreeName = document.querySelector(".rightSideThreeName")
let rightSideThreeNumber = document.querySelector(".rightSideThreeNumber")
let rightSideThreeDescription = document.querySelector(".rightSideThreeDescription")

// 8 блок
let rightSideFourImg = document.querySelector(".rightSideFourImg")
let rightSideFourName = document.querySelector(".rightSideFourName")
let rightSideFourNumber = document.querySelector(".rightSideFourNumber")
let rightSideFourDescription = document.querySelector(".rightSideFourDescription")





// console.log("vvvvvvvvvvvvv");



let mapData = [
    [6,6,6,6,6,6,6,6,6,0,0,0,2,0,1,0,2,0,0,0,6,6,6,6,6,6,6,6,6],
  [6,5,0,0,0,5,0,2,6,0,0,0,0,0,6,0,0,0,0,0,6,2,0,5,0,0,0,5,6],
  [6,0,0,0,0,0,0,4,6,0,0,0,0,0,6,0,0,0,0,0,6,4,0,0,0,0,0,0,6],
 [6,0,0,0,0,3,3,3,6,0,0,0,6,6,6,6,6,0,0,0,6,3,3,3,0,0,0,0,6],
 [6,0,0,0,6,6,6,6,6,6,6,6,6,3,3,3,6,6,6,6,6,6,6,6,6,0,0,0,6],
 [6,5,0,3,6,0,0,0,0,6,3,3,3,0,0,0,3,3,3,6,0,0,0,0,6,3,0,5,6],
  [6,0,0,3,6,0,5,0,0,6,3,0,0,0,0,0,0,0,3,6,0,0,5,0,6,3,0,0,6],
  [6,2,4,3,6,0,0,0,0,6,6,6,6,6,6,6,6,6,6,6,0,0,0,0,6,3,4,2,6],
 [6,6,6,6,6,0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,6,6,6,6,6],
 [0,0,0,0,6,6,6,6,0,0,0,3,0,0,6,0,0,3,0,0,0,6,6,6,6,0,0,0,0],
 [0,0,0,0,6,3,3,6,0,0,3,0,0,0,2,0,0,0,3,0,0,6,3,3,6,0,0,0,0],
  [0,0,0,0,6,3,0,6,0,3,0,5,0,0,3,0,0,5,0,3,0,6,0,3,6,0,0,0,0],
  [2,0,0,6,6,3,0,6,0,0,0,0,4,0,3,0,4,0,0,0,0,6,0,3,6,6,0,0,2],
 [0,0,0,6,3,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0,0,3,6,0,0,0],
 [1,6,6,6,3,0,0,6,6,6,2,3,3,0,0,0,3,3,2,6,6,6,0,0,3,6,6,6,1],
 [0,0,0,6,3,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0,0,3,6,0,0,0],
  [2,0,0,6,6,3,0,6,0,0,0,0,4,0,3,0,4,0,0,0,0,6,0,3,6,6,0,0,2],
  [0,0,0,0,6,3,0,6,0,3,0,5,0,0,3,0,0,5,0,3,0,6,0,3,6,0,0,0,0],
 [0,0,0,0,6,3,3,6,0,0,3,0,0,0,2,0,0,0,3,0,0,6,3,3,6,0,0,0,0],
 [0,0,0,0,6,6,6,6,0,0,0,3,0,0,6,0,0,3,0,0,0,6,6,6,6,0,0,0,0],
 [6,6,6,6,6,0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,6,6,6,6,6],
 [6,2,4,3,6,0,0,0,0,6,6,6,6,6,6,6,6,6,6,6,0,0,0,0,6,3,4,2,6],
 [6,0,0,3,6,0,5,0,0,6,3,0,0,0,0,0,0,0,3,6,0,0,5,0,6,3,0,0,6],
 [6,5,0,3,6,0,0,0,0,6,3,3,3,0,0,0,3,3,3,6,0,0,0,0,6,3,0,5,6],
 [6,0,0,0,6,6,6,6,6,6,6,6,6,3,3,3,6,6,6,6,6,6,6,6,6,0,0,0,6],
 [6,0,0,0,0,3,3,3,6,0,0,0,6,6,6,6,6,0,0,0,6,3,3,3,0,0,0,0,6],
 [6,0,0,0,0,0,0,4,6,0,0,0,0,0,6,0,0,0,0,0,6,4,0,0,0,0,0,0,6],
 [6,5,0,0,0,5,0,2,6,0,0,0,0,0,6,0,0,0,0,0,6,2,0,5,0,0,0,5,6],
 [6,6,6,6,6,6,6,6,6,0,0,0,2,0,1,0,2,0,0,0,6,6,6,6,6,6,6,6,6],
 
];


let cellSizeAll = 60;

let tileImages = [
  "../../img/map/grass/grass.jpeg",
  "../../img/map/castle/castleStartFon/castleStartFon.jpeg",
  "../../img/map/hausGold/hausGoldStartFon/hausGoldStartFon.jpeg",
  "../../img/map/water/water1.jpeg",
 "../../img/map/hausArmor/hausArmor1.jpeg",
 "../../img/map/hausRegenHp/hausRegenHp.jpeg",
 "../../img/map/road/road1.jpeg"
]
  let tileInfo = {
    0: { name: "Трава",   effects: [] },
    1: { name: "Замок",   effects: [
      { type: "Захист", value: 30 },
      { type: "Регенерація", value: 30 },
      { type: "Золото", value: 50 },
      ] },
    2: { name: "Будинок золота", effects: [  
     { type: "Захист", value: 20 },
     { type: "Регенерація", value: 20 },
     { type: "Золото", value: 30 }
   ] },
    3: { name: "Вода",    effects: [ { type: "Перешкода", value: 0 } ] },
    4: { name: "Будинок броні", effects: [ 
      { type: "Броня", value: 20 } ] },
    5: { name: "Будинок лікування", effects: [
     { type: "Захист", value: 15 },
     { type: "Регенерація", value: 30 },
   ] },
    6: { name: "Дорога", effects: [] }
  };
  
  
  
  let castles = [
    { x: 14, y: 0,    playerIndex: 0 }, // верхній замок → гравець 1 (червоний)
    { x: 28, y: 14,   playerIndex: 1 }, // правий замок → гравець 2 (синій)
    { x: 14, y: 28,   playerIndex: 2 }, // нижній замок → гравець 3 (зелений) - повернуто назад
    { x: 0,  y: 14,   playerIndex: 3 }  // лівий замок → гравець 4 (жовтий) - повернуто назад
  ];

  // Мапа рас
const raceMap = {
  "Орки": "orcs",
  "Ельфи": "elves",
  "Люди": "humans",
  "Жуки": "undead",
  "Демони": "demons"
};



// === Генеруємо карту 20x30 клітинок ===
if (map) {
  for (let y = 0; y < mapData.length; y++) {
    for (let x = 0; x < mapData[y].length; x++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");

      let tileType = mapData[y][x];
      cell.style.backgroundImage = `url(${tileImages[tileType]})`;
      cell.style.backgroundSize = "cover";
      cell.style.backgroundRepeat = "no-repeat";
      cell.style.backgroundPosition = "center";
      cell.dataset.x = x;
      cell.dataset.y = y;

      map.appendChild(cell);
    }
  }
  // console.log("✅ Карта створена успішно!");
} else {
  console.error("❌ Елемент .map не знайдено!");
}

// let castleImages = [
//   "../../img/map/castle/red/castleRed.jpeg",      // Гравець 1 - червоний (верх)
//   "../../img/map/castle/blue/castleBlue.jpeg",    // Гравець 2 - синій (право)
//   "../../img/map/castle/green/castleGreen.jpeg",  // Гравець 3 - зелений (низ)
//   "../../img/map/castle/yellow/castleYellow.jpeg" // Гравець 4 - жовтий (ліво)
// ];

// // Нейтральне зображення замку для неактивних гравців
// const neutralCastleImage = "../../img/map/castle/castleStartFon/castleStartFon.jpeg";

// castles.forEach(castle => {
//   const cells = map.querySelectorAll('.cell');
//   cells.forEach(cell => {
//     const cellX = parseInt(cell.dataset.x);
//     const cellY = parseInt(cell.dataset.y);
    
//     if (cellX === castle.x && cellY === castle.y) {
//       // ✅ ВИПРАВЛЕНО: Перевіряємо чи є активні гравці
//       const originalIndex = castle.playerIndex;
//       const activePlayer = players.find(p => p.originalIndex === originalIndex);
      
//       if (activePlayer) {
//         // Гравець активний - показуємо його колір
//         cell.style.backgroundImage = `url(${castleImages[originalIndex]})`;
//         console.log(`🏰 Замок на (${cellX}, ${cellY}) - Гравець ${originalIndex + 1} (${['червоний', 'синій', 'зелений', 'жовтий'][originalIndex]})`);
//       } else {
//         // Гравець неактивний - показуємо нейтральний замок
//         cell.style.backgroundImage = `url(${neutralCastleImage})`;
//         console.log(`🏰 Замок на (${cellX}, ${cellY}) - Нейтральний (гравець ${originalIndex + 1} не грає)`);
//       }
//     }
//   });
// });

  // ============================================
// МАПА РАС ДЛЯ ВИКОРИСТАННЯ В РІЗНИХ ФАЙЛАХ
// ============================================

// const raceMap = {
//   "Орки": "orcs",
//   "Ельфи": "elves",
//   "Люди": "humans",
//   "Жуки": "undead",
//   "Демони": "demons"
// };