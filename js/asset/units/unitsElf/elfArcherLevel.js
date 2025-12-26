// js/asset/units/unitsOrc/warrior/orcLevel.js
let elfArcherImg = "../../img/units/elf/elfArcher/blue/elfArcherBlue.png";
// ельфи - Воїн (8 рівнів)
let elfArcherLevels = {
    level1: {
      unitId: "elf201", // Унікальний ID юніта (1XX - орки воїни)
      level: 1,
      name: "Лучник",
      hp: 102,
      armor: 6,
      attack: 50,
      step: 3,
      range: 2,
      coin: 250,
      upgradeCost: 221,
      description: "Сильний воїн з важкою сокирою",
      img: elfArcherImg,
      abilities: [
        // { key: "arrowShot", power: 200},
      ],
      effects: []
    },
    level2: {
      unitId: "elf202",
      level: 2,
      name: "Лучник", // Те саме ім'я!
      hp: 107,
      armor: 8,
      attack: 53,
      step: 3,
      range: 2,
      coin: 250,
      upgradeCost: 222,
      description: "Загартований в боях воїн",
      img: elfArcherImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level3: {
      unitId: "elf203",
      level: 3,
      name: "Лучник",
      hp: 122,
      armor: 10,
      attack: 59,
      step: 4,
      range: 3,
      coin: 250,
      upgradeCost: 223,
      description: "Майстер бойової сокири",
      img: elfArcherImg,
      abilities: [
        // { key: "arrowShot", power: 300},
        // { key: "rage", power: 150},
      ],
      effects: []
    },
    level4: {
      unitId: "elf204",
      level: 4,
      name: "Лучник", // Те саме ім'я!
      hp: 132,
      armor: 13,
      attack: 62,
      step: 4,
      range: 3,
      coin: 250,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: elfArcherImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level5: {
      unitId: "elf205",
      level: 5,
      name: "Лучник", // Те саме ім'я!
      hp: 142,
      armor: 16,
      attack: 65,
      step: 4,
      range: 3,
      coin: 250,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: elfArcherImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level6: {
      unitId: "elf206",
      level: 6,
      name: "Лучник", // Те саме ім'я!
      hp: 148,
      armor: 19,
      attack: 67,
      step: 4,
      range: 3,
      coin: 250,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: elfArcherImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level7: {
      unitId: "elf207",
      level: 7,
      name: "Лучник", // Те саме ім'я!
      hp: 148,
      armor: 22,
      attack: 69,
      step: 4,
      range: 3,
      coin: 250,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: elfArcherImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level8: {
      unitId: "elf208",
      level: 8,
      name: "Лучник",
      hp: 148,
      armor: 23,
      attack: 70,
      step: 4,
      range: 3,
      coin: 250,
      upgradeCost: null,
      description: "Легендарний воїн",
      img: elfArcherImg,
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
  Object.values(elfArcherLevels).forEach(unit => {
    window.unitsRegistry[unit.unitId] = unit;
  });
  
  