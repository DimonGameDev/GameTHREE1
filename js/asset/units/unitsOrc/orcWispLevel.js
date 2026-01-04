// js/asset/units/unitsBeetle/beetleWispLevel.js
let orcWispImg = "../../img/units/orc/orcWisp/blue/wispBlue.png";

let orcWispLevels = {
    level1: {
      unitId: "orc1101",
      level: 1,
      name: "Вісп",
      hp: 80,
      armor: 5,
      attack: 40,
      step: 5,
      range: 2,
      coin: 60,
      upgradeCost: 120,
      description: "дух світла",
        img: orcWispImg,
      abilities: [
        { 
          key: "supportAura", 
          power: { attackBoost: 3, armorBoost: 2, hpRegenPercent: 20 }
        },
      ],
      effects: []
    },
    level2: {
      unitId: "orc1102",
      level: 2,
      name: "Вісп",
      hp: 90,
      armor: 6,
      attack: 45,
      step: 5,
      range: 2,
      coin: 70,
      upgradeCost: 145,
      description: "дух світла",
      img: orcWispImg,
      abilities: [
        { 
          key: "supportAura", 
          power: { attackBoost: 3, armorBoost: 2, hpRegenPercent: 20 }
        },
      ],
      effects: []
    },
    level3: {
        unitId: "orc1103",
        level: 2,
        name: "Вісп",
        hp: 90,
        armor: 6,
        attack: 45,
        step: 5,
        range: 2,
        coin: 80,
        upgradeCost: 155,
        description: "дух світла",
        img: orcWispImg,
        abilities: [
          { 
            key: "supportAura", 
            power: { attackBoost: 3, armorBoost: 2, hpRegenPercent: 20 }
          },
        ],
        effects: []
      },
      level4: {
        unitId: "orc1104",
        level: 2,
        name: "Вісп",
        hp: 90,
        armor: 6,
        attack: 45,
        step: 5,
        range: 2,
        coin: 90,
        upgradeCost: 165,
        description: "Посилений дух світла",
        img: orcWispImg,
        abilities: [
          { 
            key: "supportAura", 
            power: { attackBoost: 3, armorBoost: 2, hpRegenPercent: 20 }
          },
        ],
        effects: []
      },
      level5: {
        unitId: "orc1105",
        level: 2,
        name: "Вісп",
        hp: 90,
        armor: 6,
        attack: 45,
        step: 5,
        range: 2,
        coin: 100,
        upgradeCost: 175,
        description: "Посилений дух світла",
        img: orcWispImg,
        abilities: [
          { 
            key: "supportAura", 
            power: { attackBoost: 3, armorBoost: 2, hpRegenPercent: 20 }
          },
        ],
        effects: []
      },
      level6: {
        unitId: "orc1106",
        level: 2,
        name: "Вісп",
        hp: 90,
        armor: 6,
        attack: 45,
        step: 5,
        range: 2,
        coin: 110,
        upgradeCost: 185,
        description: "Посилений дух світла",
        img: orcWispImg,
        abilities: [
          { 
            key: "supportAura", 
            power: { attackBoost: 5, armorBoost: 4, hpRegenPercent: 30 }
          },
        ],
        effects: []
      },
      level7: {
        unitId: "orc1107",
        level: 2,
        name: "Вісп",
        hp: 90,
        armor: 6,
        attack: 45,
        step: 5,
        range: 2,
        coin: 120,
        upgradeCost: 195,
        description: "Посилений дух світла",
        img: orcWispImg,
        abilities: [
          { 
            key: "supportAura", 
            power: { attackBoost: 5, armorBoost: 4, hpRegenPercent: 30 }
              },
        ],
        effects: []
      },
    level8: {
      unitId: "orc1108",
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
      img: orcWispImg,
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
Object.values(orcWispLevels).forEach(unit => {
  window.unitsRegistry[unit.unitId] = unit;
});