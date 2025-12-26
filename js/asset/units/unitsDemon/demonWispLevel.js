// js/asset/units/unitsBeetle/beetleWispLevel.js
let demonWispImg = "../../img/units/demon/demonWisp/blue/wispBlue.png";

let demonWispLevels = {
    level1: {
      unitId: "demon1101",
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
        img: demonWispImg,
      abilities: [
        { 
          key: "supportAura", 
          power: { attackBoostPercent: 3, armorBoost: 2, hpRegenPercent: 30 }
        },
      ],
      effects: []
    },
    level2: {
      unitId: "demon1102",
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
      img: demonWispImg,
      abilities: [
        { 
          key: "supportAura", 
          power: { attackBoostPercent: 3, armorBoost: 2, hpRegenPercent: 30 }
        },
      ],
      effects: []
    },
    level3: {
        unitId: "demon1103",
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
        img: demonWispImg,
        abilities: [
          { 
            key: "supportAura", 
            power: { attackBoostPercent: 3, armorBoost: 2, hpRegenPercent: 30 }
          },
        ],
        effects: []
      },
      level4: {
        unitId: "demon1104",
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
        img: demonWispImg,
        abilities: [
          { 
            key: "supportAura", 
            power: { attackBoostPercent: 3, armorBoost: 2, hpRegenPercent: 30 }
          },
        ],
        effects: []
      },
      level5: {
        unitId: "demon1105",
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
        img: demonWispImg,
        abilities: [
          { 
            key: "supportAura", 
            power: { attackBoostPercent: 3, armorBoost: 2, hpRegenPercent: 30 }
          },
        ],
        effects: []
      },
      level6: {
        unitId: "demon1106",
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
        img: demonWispImg,
        abilities: [
          { 
            key: "supportAura", 
            power: { attackBoostPercent: 5, armorBoost: 4, hpRegenPercent: 50 }
          },
        ],
        effects: []
      },
      level7: {
        unitId: "demon1107",
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
        img: demonWispImg,
        abilities: [
          { 
            key: "supportAura", 
            power: { attackBoostPercent: 5, armorBoost: 4, hpRegenPercent: 50 }
          },
        ],
        effects: []
      },
    level8: {
      unitId: "demon1108",
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
      img: demonWispImg,
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
Object.values(demonWispLevels).forEach(unit => {
  window.unitsRegistry[unit.unitId] = unit;
});