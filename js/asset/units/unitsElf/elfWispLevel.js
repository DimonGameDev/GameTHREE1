// js/asset/units/unitsBeetle/beetleWispLevel.js
let elfWispImg = "../../img/units/elf/elfWisp/blue/wispBlue.png";

// 
window.unitsRegistry = window.unitsRegistry || {};

window.unitsRegistry["elf:wisp"] = {
baseUnitKey: "elf:wisp",
race: "elf",
role: "wisp",
name: "Вісп",
img: "../../img/units/elf/elfWisp/blue/elfWispBlue.png",

maxLevel: 8,

levels: {
  1: { hp: 1000, armor: 7, attack: 60, step: 6, range: 1, coin: 250, upgradeCost: 55 },
  2: { hp: 1000, armor: 9, attack: 60, step: 6, range: 1, coin: 250, upgradeCost: 68 },
  3: { hp: 134, armor: 11, attack: 54, step: 4, range: 3, coin: 250, upgradeCost: 223 },
  4: { hp: 144, armor: 14, attack: 57, step: 4, range: 3, coin: 250, upgradeCost: 400 },
  5: { hp: 154, armor: 17, attack: 60, step: 4, range: 3, coin: 250, upgradeCost: 400 },
  6: { hp: 156, armor: 20, attack: 62, step: 4, range: 3, coin: 250, upgradeCost: 400 },
  7: { hp: 156, armor: 23, attack: 65, step: 4, range: 3, coin: 250, upgradeCost: 400 },
  8: { hp: 156, armor: 26, attack: 65, step: 4, range: 3, coin: 250, upgradeCost: null }
},

abilities: [
  { key: "supportAura", 
    power: { attackBoost: 3, armorBoost: 2, hpRegenPercent: 20 }
  }
]
};