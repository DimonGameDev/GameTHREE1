// js/asset/units/unitsOrc/warrior/orcLevel.js
let elfHorsemanImg = "../../img/units/elf/elfHorseman/blue/elfHorsemanBlue.png";
// ельфи - Воїн (8 рівнів)
let elfHorsemanLevels = {
    level1: {
      unitId: "elf501", // Унікальний ID юніта (1XX - орки воїни)
      level: 1,
      name: "Вершник",
      hp: 143,
      armor: 20,
      attack: 65,
      step: 4,
      range: 1,
      coin: 400,
      upgradeCost: 221,
      description: "Сильний воїн з важкою сокирою",
      img: elfHorsemanImg,
      abilities: [
        // { key: "arrowShot", power: 200},
      ],
      effects: []
    },
    level2: {
      unitId: "elf502",
      level: 2,
      name: "Вершник", // Те саме ім'я!
      hp: 153,
      armor: 21,
      attack: 68,
      step: 4,
      range: 1,
      coin: 400,
      upgradeCost: 222,
      description: "Загартований в боях воїн",
      img: elfHorsemanImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level3: {
      unitId: "elf503",
      level: 3,
      name: "Вершник",
      hp: 163,
      armor: 23,
      attack: 72,
      step: 5,
      range: 1,
      coin: 400,
      upgradeCost: 223,
      description: "Майстер бойової сокири",
      img: elfHorsemanImg,
      abilities: [
        // { key: "arrowShot", power: 300},
        // { key: "rage", power: 150},
      ],
      effects: []
    },
    level4: {
      unitId: "elf504",
      level: 4,
      name: "Вершник", // Те саме ім'я!
      hp: 163,
      armor: 24,
      attack: 75,
      step: 5,
      range: 1,
      coin: 400,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: elfHorsemanImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level5: {
      unitId: "elf505",
      level: 5,
      name: "Вершник", // Те саме ім'я!
      hp: 173,
      armor: 26,
      attack: 78,
      step: 5,
      range: 1,
      coin: 400,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: elfHorsemanImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level6: {
      unitId: "elf506",
      level: 6,
      name: "Вершник", // Те саме ім'я!
      hp: 178,
      armor: 27,
      attack: 81,
      step: 5,
      range: 1,
      coin: 400,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: elfHorsemanImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level7: {
      unitId: "elf507",
      level: 7,
      name: "Вершник", // Те саме ім'я!
      hp: 178,
      armor: 29,
      attack: 83,
      step: 5,
      range: 1,
      coin: 400,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: elfHorsemanImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level8: {
      unitId: "elf508",
      level: 8,
      name: "Вершник",
      hp: 178,
      armor: 30,
      attack: 85,
      step: 5,
      range: 1,
      coin: 400,
      upgradeCost: null,
      description: "Легендарний воїн",
      img: elfHorsemanImg,
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
  Object.values(elfHorsemanLevels).forEach(unit => {
    window.unitsRegistry[unit.unitId] = unit;
  });
  
 