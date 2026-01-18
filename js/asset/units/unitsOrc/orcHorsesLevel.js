// js/asset/units/unitsOrc/warrior/orcLevel.js
let orcHorsesImg = "../../img/units/orc/orcHorse/blue/orcHorseBlue.png";

//опис воїна
let orcHorseDescr = "Кавард - це загартований воїн який швидко зближається з ворогом. Серед воїнів також типу, у орків вони мають найбільшу атаку. "
// ОРКИ - Воїн (8 рівнів)
// let orcHorsesLevels = {
//     level1: {
//       unitId: "orc401", // Унікальний ID юніта (1XX - орки воїни)
//       level: 1,
//       name: "Кавард",
//       hp: 123,
//       armor: 22,
//       attack: 63,
//       step: 4,
//       range: 1,
//       coin: 450,
//       upgradeCost: 221,
//       description: orcHorseDescr,
//       img: orcHorsesImg,
//       abilities: [
//         // { key: "arrowShot", power: 200},
//       ],
//       effects: []
//     },
//     level2: {
//       unitId: "orc402",
//       level: 2,
//       name: "Кавард", // Те саме ім'я!
//       hp: 133,
//       armor: 23,
//       attack: 66,
//       step: 4,
//       range: 1,
//       coin: 350,
//       upgradeCost: 222,
//       description: orcHorseDescr,
//       img: orcHorsesImg,
//       abilities: [
//             // { key: "arrowShot", power: 250},
//             // { key: "rage", power: 100},
//       ],
//       effects: []
//     },
//     level3: {
//       unitId: "orc403",
//       level: 3,
//       name: "Кавард",
//       hp: 143,
//       armor: 25,
//       attack: 73,
//       step: 5,
//       range: 1,
//       coin: 350,
//       upgradeCost: 223,
//       description: orcHorseDescr,
//       img: orcHorsesImg,
//       abilities: [
//         // { key: "arrowShot", power: 300},
//         // { key: "rage", power: 150},
//       ],
//       effects: []
//     },
//     level4: {
//       unitId: "orc404",
//       level: 4,
//       name: "Кавард", // Те саме ім'я!
//       hp: 143,
//       armor: 27,
//       attack: 76,
//       step: 5,
//       range: 1,
//       coin: 350,
//       upgradeCost: 400,
//       description: orcHorseDescr,
//       img: orcHorsesImg,
//       abilities: [
//         // { key: "arrowShot", power: 250},
//         // { key: "rage", power: 100},
//       ],
//       effects: []
//     },
//     level5: {
//       unitId: "orc405",
//       level: 5,
//       name: "Кавард", // Те саме ім'я!
//       hp: 153,
//       armor: 29,
//       attack: 79,
//       step: 5,
//       range: 1,
//       coin: 350,
//       upgradeCost: 400,
//       description: orcHorseDescr,
//       img: orcHorsesImg,
//       abilities: [
//         // { key: "arrowShot", power: 250},
//         // { key: "rage", power: 100},
//       ],
//       effects: []
//     },
//     level6: {
//       unitId: "orc406",
//       level: 6,
//       name: "Кавард", // Те саме ім'я!
//       hp: 160,
//       armor: 31,
//       attack: 82,
//       step: 5,
//       range: 1,
//       coin: 350,
//       upgradeCost: 400,
//       description: orcHorseDescr,
//       img: orcHorsesImg,
//       abilities: [
//         // { key: "arrowShot", power: 250},
//         // { key: "rage", power: 100},
//       ],
//       effects: []
//     },
//     level7: {
//       unitId: "orc407",
//       level: 7,
//       name: "Кавард", // Те саме ім'я!
//       hp: 160,
//       armor: 33,
//       attack: 85,
//       step: 5,
//       range: 1,
//       coin: 350,
//       upgradeCost: 400,
//       description: orcHorseDescr,
//       img: orcHorsesImg,
//       abilities: [
//         // { key: "arrowShot", power: 250},
//         // { key: "rage", power: 100},
//       ],
//       effects: []
//     },
//     level8: {
//       unitId: "orc408",
//       level: 8,
//       name: "Кавард",
//       hp: 160,
//       armor: 35,
//       attack: 85,
//       step: 5,
//       range: 1,
//       coin: 350,
//       upgradeCost: null,
//       description: orcHorseDescr,
//       img: orcHorsesImg,
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
  // Object.values(orcHorsesLevels).forEach(unit => {
  //   window.unitsRegistry[unit.unitId] = unit;
  // });
  
  // Для магазину показуємо тільки 1 рівень

// units/orcs/horses.js
window.unitsRegistry = window.unitsRegistry || {};

window.unitsRegistry["orcs:horse"] = {
  baseUnitKey: "orcs:horse",
  race: "orc",
  role: "horse",
  name: "Кінь",
  img: "../../img/units/orc/orcHorse/blue/orcHorseBlue.png",

  maxLevel: 8,

  levels: {
    1: { hp: 150, armor: 20, attack: 60, step: 6, range: 1, coin: 500, upgradeCost: 200 },
    2: { hp: 160, armor: 22, attack: 62, step: 6, range: 1, coin: 500, upgradeCost: 400 },
    3: { hp: 170, armor: 24, attack: 65, step: 6, range: 1, coin: 500, upgradeCost: 800 },
    4: { hp: 180, armor: 26, attack: 67, step: 6, range: 1, coin: 500, upgradeCost: 400 },
    5: { hp: 185, armor: 28, attack: 69, step: 6, range: 1, coin: 500, upgradeCost: 400 },
    6: { hp: 185, armor: 30, attack: 71, step: 6, range: 1, coin: 500, upgradeCost: 400 },
    7: { hp: 185, armor: 32, attack: 73, step: 6, range: 1, coin: 500, upgradeCost: 400 },
    8: { hp: 185, armor: 34, attack: 75, step: 6, range: 1, coin: 500, upgradeCost: null }
  },

  abilities: [
    // { key: "arrowShot", power: 200}
  ]
};
 