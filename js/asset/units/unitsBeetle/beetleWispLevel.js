// js/asset/units/unitsBeetle/beetleWispLevel.js
let beetleWispImg = "../../img/units/beetle/beetleWisp/blue/beetleWispBlue.png";

// let beetleWispLevels = {
//     level1: {
//       unitId: "beetle1101",
//       level: 1,
//       name: "Вісп",
//       hp: 1000,
//       armor: 5,
//       attack: 40,
//       step: 5,
//       range: 2,
//       coin: 60,
//       upgradeCost: 120,
//       description: "Швидкий дух світла",
//       img: beetleWispImg,
//       abilities: [
//         { 
//           key: "supportAura", 
//           power: { attackBoost: 3, armorBoost: 2, hpRegenPercent: 20 }
//         },
//       ],
//       effects: []
//     },
//     level2: {
//       unitId: "beetle1102",
//       level: 2,
//       name: "Вісп",
//       hp: 90,
//       armor: 6,
//       attack: 45,
//       step: 5,
//       range: 2,
//       coin: 70,
//       upgradeCost: 145,
//       description: "Посилений дух світла",
//       img: beetleWispImg,
//       abilities: [
//         { 
//           key: "supportAura", 
//           power: { attackBoost: 3, armorBoost: 2, hpRegenPercent: 20 }
//         },
//       ],
//       effects: []
//     },
//     level3: {
//         unitId: "beetle1103",
//         level: 2,
//         name: "Вісп",
//         hp: 90,
//         armor: 6,
//         attack: 45,
//         step: 5,
//         range: 2,
//         coin: 80,
//         upgradeCost: 155,
//         description: "Посилений дух світла",
//         img: beetleWispImg,
//         abilities: [
//           { 
//             key: "supportAura", 
//             power: { attackBoost: 3, armorBoost: 2, hpRegenPercent: 20 }
//           },
//         ],
//         effects: []
//       },
//       level4: {
//         unitId: "beetle1104",
//         level: 2,
//         name: "Вісп",
//         hp: 90,
//         armor: 6,
//         attack: 45,
//         step: 5,
//         range: 2,
//         coin: 90,
//         upgradeCost: 165,
//         description: "Посилений дух світла",
//         img: beetleWispImg,
//         abilities: [
//           { 
//             key: "supportAura", 
//             power: { attackBoost: 3, armorBoost: 2, hpRegenPercent: 20 }
//           },
//         ],
//         effects: []
//       },
//       level5: {
//         unitId: "beetle1105",
//         level: 2,
//         name: "Вісп",
//         hp: 90,
//         armor: 6,
//         attack: 45,
//         step: 5,
//         range: 2,
//         coin: 100,
//         upgradeCost: 175,
//         description: "Посилений дух світла",
//         img: beetleWispImg,
//         abilities: [
//           { 
//             key: "supportAura", 
//             power: { attackBoost: 3, armorBoost: 2, hpRegenPercent: 20 }
//           },
//         ],
//         effects: []
//       },
//       level6: {
//         unitId: "beetle1106",
//         level: 2,
//         name: "Вісп",
//         hp: 90,
//         armor: 6,
//         attack: 45,
//         step: 5,
//         range: 2,
//         coin: 110,
//         upgradeCost: 185,
//         description: "Посилений дух світла",
//         img: beetleWispImg,
//         abilities: [
//           { 
//             key: "supportAura", 
//             power: { attackBoost: 5, armorBoost: 4, hpRegenPercent: 30 }
//           },
//         ],
//         effects: []
//       },
//       level7: {
//         unitId: "beetle1107",
//         level: 2,
//         name: "Вісп",
//         hp: 90,
//         armor: 6,
//         attack: 45,
//         step: 5,
//         range: 2,
//         coin: 120,
//         upgradeCost: 195,
//         description: "Посилений дух світла",
//         img: beetleWispImg,
//         abilities: [
//           { 
//             key: "supportAura", 
//             power: { attackBoost: 5, armorBoost: 4, hpRegenPercent: 30 }
//           },
//         ],
//         effects: []
//       },
//     level8: {
//       unitId: "beetle1108",
//       level: 8,
//       name: "Вісп",
//       hp: 150,
//       armor: 12,
//       attack: 70,
//       step: 6,
//       range: 3,
//       coin: 130,
//       upgradeCost: null,
//       description: "Легендарний дух",
//       img: beetleWispImg,
//       abilities: [
//         { 
//           key: "supportAura", 
//           power: { attackBoost: 5, armorBoost: 4, hpRegenPercent: 30 }
//         },
//       ],
//       effects: []
//     }
// };

// window.unitsRegistry = window.unitsRegistry || {};
// Object.values(beetleWispLevels).forEach(unit => {
//   window.unitsRegistry[unit.unitId] = unit;
// });
window.unitsRegistry = window.unitsRegistry || {};

window.unitsRegistry["beetle:wisp"] = {
  baseUnitKey: "beetle:wisp",
  race: "beetle",
  role: "wisp",
  name: "Вісп",
  img: "../../img/units/beetle/beetleWisp/blue/beetleWispBlue.png",

  maxLevel: 8,

  levels: {
    1: { hp: 1000, armor: 7, attack: 60, step: 6, range: 2, coin: 250, upgradeCost: 55 },
    2: { hp: 119, armor: 9, attack: 60, step: 3, range: 2, coin: 250, upgradeCost: 68 },
    3: { hp: 134, armor: 11, attack: 54, step: 4, range: 3, coin: 250, upgradeCost: 223 },
    4: { hp: 144, armor: 14, attack: 57, step: 4, range: 3, coin: 250, upgradeCost: 400 },
    5: { hp: 154, armor: 17, attack: 60, step: 4, range: 3, coin: 250, upgradeCost: 400 },
    6: { hp: 156, armor: 20, attack: 62, step: 4, range: 3, coin: 250, upgradeCost: 400 },
    7: { hp: 156, armor: 23, attack: 65, step: 4, range: 3, coin: 250, upgradeCost: 400 },
    8: { hp: 156, armor: 26, attack: 65, step: 4, range: 3, coin: 250, upgradeCost: null }
  },

  abilities: [
    { key: "supportAura" }
  ]
};