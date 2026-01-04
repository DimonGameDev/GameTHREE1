// js/asset/units/unitsBeetle/beetleWispLevel.js
let elfWispImg = "../../img/units/elf/elfWisp/blue/wispBlue.png";

let elfWispLevels = {
    level1: {
      unitId: "elf1101",
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
        img: elfWispImg,
      abilities: [
        { 
          key: "supportAura", 
          power: { attackBoost: 3, armorBoost: 2, hpRegenPercent: 20 }
        },
      ],
      effects: []
    },
    level2: {
      unitId: "elf1102",
      level: 2,
      name: "Вісп",
      hp: 90,
      armor: 6,
      attack: 45,
      step: 5,
      range: 2,
      coin: 70,
      upgradeCost: 240,
      description: "Посилений дух світла",
      img: elfWispImg,
      abilities: [
        { 
          key: "supportAura", 
          power: { attackBoost: 3, armorBoost: 2, hpRegenPercent: 20 }
        },
      ],
      effects: []
    },
    level3: {
        unitId: "elf1103",
        level: 2,
        name: "Вісп",
        hp: 90,
        armor: 6,
        attack: 45,
        step: 5,
        range: 2,
        coin: 80,
        upgradeCost: 145,
        description: "Посилений дух світла",
        img: elfWispImg,
        abilities: [
          { 
            key: "supportAura", 
            power: { attackBoost: 3, armorBoost: 2, hpRegenPercent: 20 }
          },
        ],
        effects: []
      },
      level4: {
        unitId: "elf1104",
        level: 2,
        name: "Вісп",
        hp: 90,
        armor: 6,
        attack: 45,
        step: 5,
        range: 2,
        coin: 90,
        upgradeCost: 155,
        description: "Посилений дух світла",
        img: elfWispImg,
        abilities: [
          { 
            key: "supportAura", 
            power: { attackBoost: 3, armorBoost: 2, hpRegenPercent: 20 }
          },
        ],
        effects: []
      },
      level5: {
        unitId: "elf1105",
        level: 2,
        name: "Вісп",
        hp: 90,
        armor: 6,
        attack: 45,
        step: 5,
        range: 2,
        coin: 100,
        upgradeCost: 165,
        description: "Посилений дух світла",
        img: elfWispImg,
        abilities: [
          { 
            key: "supportAura", 
            power: { attackBoost: 3, armorBoost: 2, hpRegenPercent: 20 }
          },
        ],
        effects: []
      },
      level6: {
        unitId: "elf1106",
        level: 2,
        name: "Вісп",
        hp: 90,
        armor: 6,
        attack: 45,
        step: 5,
        range: 2,
        coin: 110,
        upgradeCost: 175,
        description: "Посилений дух світла",
        img: elfWispImg,
        abilities: [
          { 
            key: "supportAura", 
            power: { attackBoost: 5, armorBoost: 4, hpRegenPercent: 30 }
          },
        ],
        effects: []
      },
      level7: {
        unitId: "elf1107",
        level: 2,
        name: "Вісп",
        hp: 90,
        armor: 6,
        attack: 45,
        step: 5,
        range: 2,
        coin: 120,
        upgradeCost: 185,
        description: "Посилений дух світла",
        img: elfWispImg,
        abilities: [
          { 
            key: "supportAura", 
            power: { attackBoost: 5, armorBoost: 4, hpRegenPercent: 30 }
          },
        ],
        effects: []
      },
    level8: {
      unitId: "elf1108",
      level: 8,
      name: "Вісп",
      hp: 150,
      armor: 12,
      attack: 70,
      step: 6,
      range: 3,
      coin: 130,
      upgradeCost: null,
      description: "Легендарний дух",
      img: elfWispImg,
      abilities: [
        { 
          key: "supportAura", 
          power: { attackBoost: 5, armorBoost: 4, hpRegenPercent: 30 }
        },
      ],
      effects: []
    }
};

window.unitsRegistry = window.unitsRegistry || {};
Object.values(elfWispLevels).forEach(unit => {
  window.unitsRegistry[unit.unitId] = unit;
});