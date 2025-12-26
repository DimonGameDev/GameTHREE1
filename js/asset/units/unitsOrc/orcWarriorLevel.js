// js/asset/units/unitsOrc/warrior/orcLevel.js
let orcWarriorImg = "../../img/units/orc/orcWarrior/blue/orcWarriorBlue.png";
// ОРКИ - Воїн (8 рівнів)
let orcWarriorLevels = {
  level1: {
    unitId: "orc101", // Унікальний ID юніта (1XX - орки воїни)
    level: 1,
    name: "Воїн",
    hp: 123,
    armor: 14,
    attack: 45,
    step: 6,
    range: 1,
    coin: 150,
    upgradeCost: 200,
    description: "Сильний воїн з важкою сокирою",
    img: orcWarriorImg,
    abilities: [
      // { key: "arrowShot", power: 200},
			// { key: "rage", power: 100},
    ],
    effects: []
  },
  level2: {
    unitId: "orc102",
    level: 2,
    name: "Воїн", // Те саме ім'я!
    hp: 143,
    armor: 17,
    attack: 47,
    step: 4,
    range: 1,
    coin: 150,
    upgradeCost: 400,
    description: "Сильний воїн з важкою сокирою",
    img: orcWarriorImg,
    abilities: [
      // { key: "arrowShot", power: 250},
      // { key: "rage", power: 100},
    ],
    effects: []
  },
  level3: {
    unitId: "orc103",
    level: 3,
    name: "Воїн",
    hp: 153,
    armor: 21,
    attack: 52,
    step: 5,
    range: 2,
    coin: 150,
    upgradeCost: 800,
    description: "Сильний воїн з важкою сокирою",
    img: orcWarriorImg,
    abilities: [
      // { key: "arrowShot", power: 300},
      // { key: "rage", power: 150},
    ],
    effects: []
  },
  level4: {
    unitId: "orc104",
    level: 4,
    name: "Воїн", // Те саме ім'я!
    hp: 163,
    armor: 24,
    attack: 54,
    step: 3,
    range: 1,
    coin: 150,
    upgradeCost: 400,
    description: "Загартований в боях воїн",
    img: orcWarriorImg,
    abilities: [
      // { key: "arrowShot", power: 250},
      // { key: "rage", power: 100},
    ],
    effects: []
  },
  level5: {
    unitId: "orc105",
    level: 5,
    name: "Воїн", // Те саме ім'я!
    hp: 168,
    armor: 27,
    attack: 57,
    step: 3,
    range: 1,
    coin: 150,
    upgradeCost: 400,
    description: "Загартований в боях воїн",
    img: orcWarriorImg,
    abilities: [
      // { key: "arrowShot", power: 250},
      // { key: "rage", power: 100},
    ],
    effects: []
  },
  level6: {
    unitId: "orc106",
    level: 6,
    name: "Воїн", // Те саме ім'я!
    hp: 168,
    armor: 30,
    attack: 60,
    step: 3,
    range: 1,
    coin: 150,
    upgradeCost: 400,
    description: "Загартований в боях воїн",
    img: orcWarriorImg,
    abilities: [
      // { key: "arrowShot", power: 250},
      // { key: "rage", power: 100},
    ],
    effects: []
  },
  level7: {
    unitId: "orc107",
    level: 7,
    name: "Воїн", // Те саме ім'я!
    hp: 168,
    armor: 33,
    attack: 63,
    step: 3,
    range: 1,
    coin: 150,
    upgradeCost: 400,
    description: "Загартований в боях воїн",
    img: orcWarriorImg,
    abilities: [
      // { key: "arrowShot", power: 250},
      // { key: "rage", power: 100},
    ],
    effects: []
  },
  level8: {
    unitId: "orc108",
    level: 8,
    name: "Воїн",
    hp: 168,
    armor: 33,
    attack: 65,
    step: 4,
    range: 1,
    coin: 150,
    upgradeCost: null,
    description: "Легендарний воїн",
    img: orcWarriorImg,
    abilities: [
      // { key: "arrowShot", power: 600},
      // { key: "rage", power: 500},
      // { key: "berserk", power: 300},
    ],
    effects: []
  }
};

// Створюємо глобальний реєстр всіх юнітів за ID
window.unitsRegistry = window.unitsRegistry || {};
Object.values(orcWarriorLevels).forEach(unit => {
  window.unitsRegistry[unit.unitId] = unit;
});

// Для магазину показуємо тільки 1 рівень
