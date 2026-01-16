// js/asset/units/unitsOrc/warrior/orcLevel.js
let orcHorsemanImg = "../../img/units/orc/orcHorseman/blue/orcHorsemanBlue.png";
// ОРКИ - Воїн (8 рівнів)
// let orcHorsemanLevels = {
//     level1: {
//       unitId: "orc501", // Унікальний ID юніта (1XX - орки воїни)
//       level: 1,
//       name: "Вершник",
//       hp: 146,
//       armor: 20,
//       attack: 64,
//       step: 4,
//       range: 1,
//       coin: 400,
//       upgradeCost: 221,
//       description: "Чим він ближче, тим небезпечніший цей воїн, з гарною атакою і броньою",
//       img: orcHorsemanImg,
//       abilities: [
//         // { key: "arrowShot", power: 200},
//       ],
//       effects: []
//     },
//     level2: {
//       unitId: "orc502",
//       level: 2,
//       name: "Вершник", // Те саме ім'я!
//       hp: 156,
//       armor: 21,
//       attack: 67,
//       step: 4,
//       range: 1,
//       coin: 550,
//       upgradeCost: 222,
//       description: "Чим він ближче, тим небезпечніший цей воїн, з гарною атакою і броньою",
//       img: orcHorsemanImg,
//       abilities: [
//         // { key: "arrowShot", power: 250},
//         // { key: "rage", power: 100},
//       ],
//       effects: []
//     },
//     level3: {
//       unitId: "orc503",
//       level: 3,
//       name: "Вершник",
//       hp: 166,
//       armor: 23,
//       attack: 71,
//       step: 5,
//       range: 1,
//       coin: 400,
//       upgradeCost: 223,
//       description: "Чим він ближче, тим небезпечніший цей воїн, з гарною атакою і броньою",
//       img: orcHorsemanImg,
//       abilities: [
//         // { key: "arrowShot", power: 300},
//         // { key: "rage", power: 150},
//       ],
//       effects: []
//     },
//     level4: {
//       unitId: "orc504",
//       level: 4,
//       name: "Вершник", // Те саме ім'я!
//       hp: 166,
//       armor: 24,
//       attack: 74,
//       step: 5,
//       range: 1,
//       coin: 400,
//       upgradeCost: 400,
//       description: "Загартований воїн.Чим він ближче, тим небезпечніший цей воїн, з гарною атакою і броньою",
//       img: orcHorsemanImg,
//       abilities: [
//         // { key: "arrowShot", power: 250},
//         // { key: "rage", power: 100},
//       ],
//       effects: []
//     },
//     level5: {
//       unitId: "orc505",
//       level: 5,
//       name: "Вершник", // Те саме ім'я!
//       hp: 176,
//       armor: 26,
//       attack: 77,
//       step: 5,
//       range: 1,
//       coin: 400,
//       upgradeCost: 400,
//       description: "Загартований воїн.Чим він ближче, тим небезпечніший цей воїн, з гарною атакою і броньою",
//       img: orcHorsemanImg,
//       abilities: [
//         // { key: "arrowShot", power: 250},
//         // { key: "rage", power: 100},
//       ],
//       effects: []
//     },
//     level6: {
//       unitId: "orc506",
//       level: 6,
//       name: "Вершник", // Те саме ім'я!
//       hp: 182,
//       armor: 27,
//       attack: 80,
//       step: 5,
//       range: 1,
//       coin: 400,
//       upgradeCost: 400,
//       description: "Загартований воїн.Чим він ближче, тим небезпечніший цей воїн, з гарною атакою і броньою",
//       img: orcHorsemanImg,
//       abilities: [
//         // { key: "arrowShot", power: 250},
//         // { key: "rage", power: 100},
//       ],
//       effects: []
//     },
//     level7: {
//       unitId: "orc507",
//       level: 7,
//       name: "Вершник", // Те саме ім'я!
//       hp: 182,
//       armor: 29,
//       attack: 82,
//       step: 5,
//       range: 1,
//       coin: 400,
//       upgradeCost: 400,
//       description: "Загартований воїн.Чим він ближче, тим небезпечніший цей воїн, з гарною атакою і броньою",
//       img: orcHorsemanImg,
//       abilities: [
//         // { key: "arrowShot", power: 250},
//         // { key: "rage", power: 100},
//       ],
//       effects: []
//     },
//     level8: {
//       unitId: "orc508",
//       level: 8,
//       name: "Вершник",
//       hp: 182,
//       armor: 30,
//       attack: 84,
//       step: 5,
//       range: 1,
//       coin: 400,
//       upgradeCost: null,
//       description: "Легендарний воїн.Чим він ближче, тим небезпечніший цей воїн, з гарною атакою і броньою",
//       img: orcHorsemanImg,
//       abilities: [
//         // { key: "arrowShot", power: 600},
//         // { key: "rage", power: 500},
//         // { key: "berserk", power: 300},
//       ],
//       effects: []
//     }
//   };
  
  // Створюємо глобальний реєстр всіх юнітів за ID
  // window.unitsRegistry = window.unitsRegistry || {};
  // Object.values(orcHorsemanLevels).forEach(unit => {
  //   window.unitsRegistry[unit.unitId] = unit;
  // });
  
  // Для магазину показуємо тільки 1 рівень

// units/orcs/horseman.js
window.unitsRegistry = window.unitsRegistry || {};

window.unitsRegistry["orcs:horseman"] = {
  baseUnitKey: "orcs:horseman",
  race: "orc",
  role: "horseman",
  name: "Вершник",
  img: "../../img/units/orc/orcHorseman/blue/orcHorsemanBlue.png",

  maxLevel: 8,

  levels: {
    1: { hp: 150, armor: 20, attack: 60, step: 5, range: 1, coin: 500, upgradeCost: 200 },
    2: { hp: 160, armor: 22, attack: 62, step: 5, range: 1, coin: 500, upgradeCost: 400 },
    3: { hp: 170, armor: 24, attack: 65, step: 5, range: 1, coin: 500, upgradeCost: 800 },
    4: { hp: 180, armor: 26, attack: 67, step: 5, range: 1, coin: 500, upgradeCost: 400 },
    5: { hp: 185, armor: 28, attack: 69, step: 5, range: 1, coin: 500, upgradeCost: 400 },
    6: { hp: 185, armor: 30, attack: 71, step: 5, range: 1, coin: 500, upgradeCost: 400 },
    7: { hp: 185, armor: 32, attack: 73, step: 5, range: 1, coin: 500, upgradeCost: 400 },
    8: { hp: 185, armor: 34, attack: 75, step: 5, range: 1, coin: 500, upgradeCost: null }
  },

  abilities: [
    // { key: "arrowShot", power: 200}
  ]
};
 