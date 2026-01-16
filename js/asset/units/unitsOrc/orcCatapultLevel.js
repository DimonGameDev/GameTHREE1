// js/asset/units/unitsOrc/warrior/orcLevel.js
let orcCatapultImg = "../../img/units/orc/orcCatapult/blue/orcCatapultBlue.png";
// ОРКИ - Воїн (8 рівнів)
// let orcCatapultLevels = {
//     level1: {
//       unitId: "orc601", // Унікальний ID юніта (1XX - орки воїни)
//       level: 1,
//       name: "Катапульта",
//       hp: 115,
//       armor: 10,
//       attack: 65,
//       step: 3,
//       range: 5,
//       coin: 600,
//       upgradeCost: 50,
//       description: "Сильний юніт. Дальня і сильна атака - сильна сторона, але повільний. Або стриляє, або рухається.",
//       img: orcCatapultImg,
//       abilities: [
//         // { key: "arrowShot", power: 200},
//       ],
//       effects: []
//     },
//     level2: {
//       unitId: "orc602",
//       level: 2,
//       name: "Катапульта", // Те саме ім'я!
//       hp: 125,
//       armor: 11,
//       attack: 67,
//       step: 3,
//       range: 5,
//       coin: 600,
//       upgradeCost: 100,
//       description: "Сильний юніт. Дальня і сильна атака - сильна сторона, але повільний. Або стриляє, або рухається.",
//       img: orcCatapultImg,
//       abilities: [
//         // { key: "arrowShot", power: 250},
//         // { key: "rage", power: 100},
//       ],
//       effects: []
//     },
//     level3: {
//       unitId: "orc603",
//       level: 3,
//       name: "Катапульта",
//       hp: 140,
//       armor: 13,
//       attack: 72,
//       step: 4,
//       range: 6,
//       coin: 600,
//       upgradeCost: 223,
//       description: "Сильний юніт. Дальня і сильна атака - сильна сторона, але повільний. Або стриляє, або рухається.",
//       img: orcCatapultImg,
//       abilities: [
//         // { key: "arrowShot", power: 300},
//         // { key: "rage", power: 150},
//       ],
//       effects: []
//     },
//     level4: {
//       unitId: "orc604",
//       level: 4,
//       name: "Катапульта", // Те саме ім'я!
//       hp: 140,
//       armor: 14,
//       attack: 72,
//       step: 4,
//       range: 6,
//       coin: 600,
//       upgradeCost: 400,
//       description: "Загартований юніт. Дальня і сильна атака - сильна сторона, але повільний. Або стриляє, або рухається.",
//       img: orcCatapultImg,
//       abilities: [
//         // { key: "arrowShot", power: 250},
//         // { key: "rage", power: 100},
//       ],
//       effects: []
//     },
//     level5: {
//       unitId: "orc605",
//       level: 5,
//       name: "Катапульта", // Те саме ім'я!
//       hp: 140,
//       armor: 16,
//       attack: 72,
//       step: 4,
//       range: 6,
//       coin: 600,
//       upgradeCost: 400,
//       description: "Загартований юніт. Дальня і сильна атака - сильна сторона, але повільний. Або стриляє, або рухається.",
//       img: orcCatapultImg,
//       abilities: [
//         // { key: "arrowShot", power: 250},
//         // { key: "rage", power: 100},
//       ],
//       effects: []
//     },
//     level6: {
//       unitId: "orc606",
//       level: 6,
//       name: "Катапульта", // Те саме ім'я!
//       hp: 140,
//       armor: 17,
//       attack: 76,
//       step: 4,
//       range: 6,
//       coin: 600,
//       upgradeCost: 400,
//       description: "Загартований юніт. Дальня і сильна атака - сильна сторона, але повільний. Або стриляє, або рухається.",
//       img: orcCatapultImg,
//       abilities: [
//         // { key: "arrowShot", power: 250},
//         // { key: "rage", power: 100},
//       ],
//       effects: []
//     },
//     level7: {
//       unitId: "orc607",
//       level: 7,
//       name: "Катапульта", // Те саме ім'я!
//       hp: 140,
//       armor: 18,
//       attack: 78,
//       step: 4,
//       range: 6,
//       coin: 600,
//       upgradeCost: 400,
//       description: "Загартований юніт. Дальня і сильна атака - сильна сторона, але повільний. Або стриляє, або рухається.",
//       img: orcCatapultImg,
//       abilities: [
//         // { key: "arrowShot", power: 250},
//         // { key: "rage", power: 100},
//       ],
//       effects: []
//     },
//     level8: {
//       unitId: "orc608",
//       level: 8,
//       name: "Катапульта",
//       hp: 140,
//       armor: 18,
//       attack: 80,
//       step: 4,
//       range: 6,
//       coin: 600,
//       upgradeCost: null,
//       description: "Легендарний воїн.Загартований юніт. Дальня і сильна атака - сильна сторона, але повільний. Або стриляє, або рухається. ",
//       img: orcCatapultImg,
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
  // Object.values(orcCatapultLevels).forEach(unit => {
  //   window.unitsRegistry[unit.unitId] = unit;
  // });
  
  // Для магазину показуємо тільки 1 рівень

// units/orcs/catapult.js
window.unitsRegistry = window.unitsRegistry || {};

window.unitsRegistry["orcs:catapult"] = {
  baseUnitKey: "orcs:catapult",
  race: "orc",
  role: "catapult",
  name: "Катапульта",
  img: "../../img/units/orc/orcCatapult/blue/orcCatapultBlue.png",

  maxLevel: 8,

  levels: {
    1: { hp: 150, armor: 20, attack: 60, step: 2, range: 4, coin: 500, upgradeCost: 200 },
    2: { hp: 160, armor: 22, attack: 62, step: 2, range: 4, coin: 500, upgradeCost: 400 },
    3: { hp: 170, armor: 24, attack: 65, step: 2, range: 4, coin: 500, upgradeCost: 800 },
    4: { hp: 180, armor: 26, attack: 67, step: 2, range: 4, coin: 500, upgradeCost: 400 },
    5: { hp: 185, armor: 28, attack: 69, step: 2, range: 4, coin: 500, upgradeCost: 400 },
    6: { hp: 185, armor: 30, attack: 71, step: 2, range: 4, coin: 500, upgradeCost: 400 },
    7: { hp: 185, armor: 32, attack: 73, step: 2, range: 4, coin: 500, upgradeCost: 400 },
    8: { hp: 185, armor: 34, attack: 75, step: 2, range: 4, coin: 500, upgradeCost: null }
  },

  abilities: [
    // { key: "arrowShot", power: 200}
  ]
};