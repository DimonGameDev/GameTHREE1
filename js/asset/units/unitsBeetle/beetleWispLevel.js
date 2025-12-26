// js/asset/units/unitsBeetle/beetleWispLevel.js
let beetleWispImg = "../../img/units/beetle/beetleWisp/blue/wispBlue.png";

let beetleWispLevels = {
    level1: {
      unitId: "beetle1101",
      level: 1,
      name: "Вісп",
      hp: 80,
      armor: 5,
      attack: 40,
      step: 5,
      range: 2,
      coin: 60,
      upgradeCost: 120,
      description: "Швидкий дух світла",
      img: beetleWispImg,
      abilities: [
        { 
          key: "supportAura", 
          power: { attackBoostPercent: 3, armorBoost: 2, hpRegenPercent: 30 }
        },
      ],
      effects: []
    },
    level2: {
      unitId: "beetle1102",
      level: 2,
      name: "Вісп",
      hp: 90,
      armor: 6,
      attack: 45,
      step: 5,
      range: 2,
      coin: 0,
      upgradeCost: 240,
      description: "Посилений дух світла",
      img: beetleWispImg,
      abilities: [
        { 
          key: "supportAura", 
          power: { attackBoostPercent: 3, armorBoost: 2, hpRegenPercent: 30 }
        },
      ],
      effects: []
    },
    level3: {
        unitId: "beetle1103",
        level: 2,
        name: "Вісп",
        hp: 90,
        armor: 6,
        attack: 45,
        step: 5,
        range: 2,
        coin: 0,
        upgradeCost: 240,
        description: "Посилений дух світла",
        img: beetleWispImg,
        abilities: [
          { 
            key: "supportAura", 
            power: { attackBoostPercent: 3, armorBoost: 2, hpRegenPercent: 30 }
          },
        ],
        effects: []
      },
      level4: {
        unitId: "beetle1104",
        level: 2,
        name: "Вісп",
        hp: 90,
        armor: 6,
        attack: 45,
        step: 5,
        range: 2,
        coin: 0,
        upgradeCost: 240,
        description: "Посилений дух світла",
        img: beetleWispImg,
        abilities: [
          { 
            key: "supportAura", 
            power: { attackBoostPercent: 3, armorBoost: 2, hpRegenPercent: 30 }
          },
        ],
        effects: []
      },
      level5: {
        unitId: "beetle1105",
        level: 2,
        name: "Вісп",
        hp: 90,
        armor: 6,
        attack: 45,
        step: 5,
        range: 2,
        coin: 0,
        upgradeCost: 240,
        description: "Посилений дух світла",
        img: beetleWispImg,
        abilities: [
          { 
            key: "supportAura", 
            power: { attackBoostPercent: 3, armorBoost: 2, hpRegenPercent: 30 }
          },
        ],
        effects: []
      },
      level6: {
        unitId: "beetle1106",
        level: 2,
        name: "Вісп",
        hp: 90,
        armor: 6,
        attack: 45,
        step: 5,
        range: 2,
        coin: 0,
        upgradeCost: 240,
        description: "Посилений дух світла",
        img: beetleWispImg,
        abilities: [
          { 
            key: "supportAura", 
            power: { attackBoostPercent: 5, armorBoost: 4, hpRegenPercent: 50 }
          },
        ],
        effects: []
      },
      level7: {
        unitId: "beetle1107",
        level: 2,
        name: "Вісп",
        hp: 90,
        armor: 6,
        attack: 45,
        step: 5,
        range: 2,
        coin: 0,
        upgradeCost: 240,
        description: "Посилений дух світла",
        img: beetleWispImg,
        abilities: [
          { 
            key: "supportAura", 
            power: { attackBoostPercent: 5, armorBoost: 4, hpRegenPercent: 50 }
          },
        ],
        effects: []
      },
    level8: {
      unitId: "beetle1108",
      level: 8,
      name: "Вісп",
      hp: 150,
      armor: 12,
      attack: 70,
      step: 6,
      range: 3,
      coin: 0,
      upgradeCost: null,
      description: "Легендарний дух",
      img: beetleWispImg,
      abilities: [
        { 
          key: "supportAura", 
          power: { attackBoostPercent: 5, armorBoost: 4, hpRegenPercent: 50 }
        },
      ],
      effects: []
    }
};

window.unitsRegistry = window.unitsRegistry || {};
Object.values(beetleWispLevels).forEach(unit => {
  window.unitsRegistry[unit.unitId] = unit;
});