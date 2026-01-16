// js/asset/units/unitsOrc/warrior/orcLevel.js
// ведмідь
let orcMagImg = "../../img/units/orc/orcMag/blue/orcMagBlue.png";
// ОРКИ - Воїн (8 рівнів)
// let orcMagLevels = {
//     level1: {
//       unitId: "orc1001", // Унікальний ID юніта (1XX - орки воїни)
//       level: 1,
//       name: "Орчий маг",
//       hp: 145,
//       armor: 15,
//       attack: 50,
//       step: 4,
//       range: 1,
//       coin: 500,
//       upgradeCost: 200,
//       description: "Маг, може прискорювати союзників",
//     img: orcMagImg,
//       abilities: [
//         { key: "hasteAlly", power: 1 }
//       ],
//       effects: []
//     },
//     level2: {
//       unitId: "orc1002",
//       level: 2,
//       name: "Орчий маг", // Те саме ім'я!
//       hp: 155,
//       armor: 16,
//       attack: 52,
//       step: 4,
//       range: 1,
//       coin: 500,
//       upgradeCost: 202,
//       description: "Маг, може прискорювати союзників",
//       img: orcMagImg,
//       abilities: [
//         { key: "hasteAlly", power: 1 }
//       ],
//       effects: []
//     },
//     level3: {
//       unitId: "orc1003",
//       level: 3,
//       name: "Орчий маг",
//       hp: 162,
//       armor: 18,
//       attack: 55,
//       step: 5,
//       range: 1,
//       coin: 500,
//       upgradeCost: 203,
//       description: "Маг, може прискорювати союзників",
//       img: orcMagImg,
//       abilities: [
//         { key: "hasteAlly", power: 1 }
//       ],
//       effects: []
//     },
//     level4: {
//       unitId: "orc1004",
//       level: 4,
//       name: "Орчий маг", // Те саме ім'я!
//       hp: 162,
//       armor: 19,
//       attack: 57,
//       step: 5,
//       range: 1,
//       coin: 500,
//       upgradeCost: 400,
//       description: "Загартований Маг, може прискорювати союзників",
//       img: orcMagImg,
//       abilities: [
//         { key: "hasteAlly", power: 2 }
//       ],
//       effects: []
//     },
//     level5: {
//     unitId: "orc1005",
//       level: 5,
//       name: "Орчий маг", // Те саме ім'я!
//       hp: 162,
//       armor: 20,
//       attack: 59,
//       step: 5,
//       range: 1,
//       coin: 500,
//       upgradeCost: 400,
//       description: "Загартований Маг, може прискорювати союзників",
//       img: orcMagImg,
//       abilities: [
//         { key: "hasteAlly", power: 2 }
//       ],
//       effects: []
//     },
//     level6: {
//       unitId: "orc1006",
//       level: 6,
//       name: "Орчий маг", // Те саме ім'я!
//       hp: 162,
//       armor: 21,
//       attack: 61,
//       step: 5,
//       range: 1,
//       coin: 500,
//       upgradeCost: 400,
//       description: "Загартований Маг, може прискорювати союзників",
//       img: orcMagImg,
//       abilities: [
//         { key: "speedAura", power: 2 }
//       ],
//       effects: []
//     },
//     level7: {
//       unitId: "orc1007",
//       level: 7,
//       name: "Орчий маг", // Те саме ім'я!
//       hp: 162,
//       armor: 22,
//       attack: 63,
//       step: 5,
//       range: 1,
//       coin: 500,
//       upgradeCost: 400,
//       description: "Загартований Маг, може прискорювати союзників",
//       img: orcMagImg,
//       abilities: [
//         { key: "hasteAlly", power: 2 }
//       ],
//       effects: []
//     },
//     level8: {
//       unitId: "orc1008",
//       level: 8,
//       name: "Орчий маг",
//       hp: 162,
//       armor: 23,
//       attack: 65,
//       step: 5,
//       range: 1,
//       coin: 500,
//       upgradeCost: null,
//       description: "Легендаринй Маг, може прискорювати союзників",
//       img: orcMagImg,
//       abilities: [
//         { key: "hasteAlly", power: 2 }
//       ],
//       effects: []
//     }
//   };
  
  // Створюємо глобальний реєстр всіх юнітів за ID
  // window.unitsRegistry = window.unitsRegistry || {};
  // Object.values(orcMagLevels).forEach(unit => {
  //   window.unitsRegistry[unit.unitId] = unit;
  // });
  
  // Для магазину показуємо тільки 1 рівень

// units/orcs/mag.js
window.unitsRegistry = window.unitsRegistry || {};

window.unitsRegistry["orcs:mag"] = {
  baseUnitKey: "orcs:mag",
  race: "orc",
  role: "mage",
  name: "Орчий маг",
  img: "../../img/units/orc/orcMag/blue/orcMagBlue.png",

  maxLevel: 8,

  levels: {
    1: { hp: 150, armor: 20, attack: 60, step: 4, range: 2, coin: 500, upgradeCost: 200 },
    2: { hp: 155, armor: 21, attack: 62, step: 4, range: 2, coin: 500, upgradeCost: 202 },
    3: { hp: 165, armor: 22, attack: 65, step: 4, range: 2, coin: 500, upgradeCost: 203 },
    4: { hp: 170, armor: 23, attack: 67, step: 4, range: 2, coin: 500, upgradeCost: 400 },
    5: { hp: 170, armor: 24, attack: 69, step: 4, range: 2, coin: 500, upgradeCost: 400 },
    6: { hp: 170, armor: 25, attack: 71, step: 4, range: 2, coin: 500, upgradeCost: 400 },
    7: { hp: 170, armor: 26, attack: 73, step: 4, range: 2, coin: 500, upgradeCost: 400 },
    8: { hp: 170, armor: 27, attack: 75, step: 4, range: 2, coin: 500, upgradeCost: null }
  },

  abilities: [
    { key: "attackAura", power: 3 }
  ]
};
 