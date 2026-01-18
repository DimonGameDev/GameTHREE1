// js/asset/units/unitsBeetle/beetleWispLevel.js
let demonWispImg = "../../img/units/demon/demonWisp/blue/demonWispBlue.png";

// let demonWispLevels = {
//     level1: {
//       unitId: "demon1101",
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
//         img: demonWispImg,
//       abilities: [
//         { 
//           key: "supportAura", 
//           power: { attackBoost: 3, armorBoost: 2, hpRegenPercent: 20 }
//         },
//       ],
//       effects: []
//     },
//     level2: {
//       unitId: "demon1102",
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
//       img: demonWispImg,
//       abilities: [
//         { 
//           key: "supportAura", 
//           power: { attackBoost: 3, armorBoost: 2, hpRegenPercent: 20 }
//         },
//       ],
//       effects: []
//     },
//     level3: {
//         unitId: "demon1103",
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
//         img: demonWispImg,
//         abilities: [
//           { 
//             key: "supportAura", 
//             power: { attackBoost: 3, armorBoost: 2, hpRegenPercent: 20 }
//           },
//         ],
//         effects: []
//       },
//       level4: {
//         unitId: "demon1104",
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
//         img: demonWispImg,
//         abilities: [
//           { 
//             key: "supportAura", 
//             power: { attackBoost: 3, armorBoost: 2, hpRegenPercent: 20 }
//           },
//         ],
//         effects: []
//       },
//       level5: {
//         unitId: "demon1105",
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
//         img: demonWispImg,
//         abilities: [
//           { 
//             key: "supportAura", 
//             power: { attackBoost: 3, armorBoost: 2, hpRegenPercent: 20 }
//           },
//         ],
//         effects: []
//       },
//       level6: {
//         unitId: "demon1106",
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
//         img: demonWispImg,
//         abilities: [
//           { 
//             key: "supportAura", 
//             power: { attackBoost: 5, armorBoost: 4, hpRegenPercent: 30 }
//           },
//         ],
//         effects: []
//       },
//       level7: {
//         unitId: "demon1107",
//         level: 2,
//         name: "Вісп",
//         hp: 90,
//         armor: 6,
//         attack: 45,
//         step: 5,
//         range: 2,
//         coin: 120,
//           upgradeCost: 195,
//         description: "Посилений дух світла",
//         img: demonWispImg,
//         abilities: [
//           { 
//             key: "supportAura", 
//             power: { attackBoost: 5, armorBoost: 4, hpRegenPercent: 30 }
//           },
//         ],
//         effects: []
//       },
//     level8: {
//       unitId: "demon1108",
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
//       img: demonWispImg,
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
// Object.values(demonWispLevels).forEach(unit => {
//   window.unitsRegistry[unit.unitId] = unit;
// });

window.unitsRegistry = window.unitsRegistry || {};

window.unitsRegistry["demon:wisp"] = {
  baseUnitKey: "orcs:archer",
  race: "orc",
  role: "wisp",
  name: "Вісп",
  img: "../../img/units/demon/demonWisp/blue/demonWispBlue.png",

  maxLevel: 8,

  levels: {
    1: { hp: 1000, armor: 7, attack: 60, step: 6, range: 2, coin: 250, upgradeCost: 55 },
    2: { hp: 1000, armor: 9, attack: 60, step: 6, range: 2, coin: 250, upgradeCost: 68 },
    3: { hp: 134, armor: 11, attack: 54, step: 4, range: 3, coin: 250, upgradeCost: 223 },
    4: { hp: 144, armor: 14, attack: 57, step: 4, range: 3, coin: 250, upgradeCost: 400 },
    5: { hp: 154, armor: 17, attack: 60, step: 4, range: 3, coin: 250, upgradeCost: 400 },
    6: { hp: 156, armor: 20, attack: 62, step: 4, range: 3, coin: 250, upgradeCost: 400 },
    7: { hp: 156, armor: 23, attack: 65, step: 4, range: 3, coin: 250, upgradeCost: 400 },
    8: { hp: 156, armor: 26, attack: 65, step: 4, range: 3, coin: 250, upgradeCost: null }
  },

  abilities: [
    // { key: "arrowShot", power: 200}
  ]
};