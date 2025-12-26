// js/asset/units/unitsOrc/warrior/orcLevel.js
let elfWarriorImg = "../../img/units/elf/elfWarrior/blue/elfWarriorBlue.png";
// ельфи - Воїн (8 рівнів)
let elfWarriorLevels = {
    level1: {
      unitId: "elf101", // Унікальний ID юніта (1XX - орки воїни)
      level: 1,
      name: "Воїн",
      hp: 105,
      armor: 15,
      attack: 50,
      step: 3,
      range: 1,
      coin: 150,
      upgradeCost: 200,
      description: "Сильний воїн з важкою сокирою",
      img: elfWarriorImg,
      abilities: [
        // { key: "arrowShot", power: 200},
      ],
      effects: []
    },
    level2: {
      unitId: "elf102",
      level: 2,
      name: "Воїн", // Те саме ім'я!
      hp: 115,
      armor: 18,
      attack: 52,
      step: 3,
      range: 1,
      coin: 150,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: elfWarriorImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level3: {
      unitId: "elf103",
      level: 3,
      name: "Воїн",
      hp: 135,
      armor: 22,
      attack: 57,
      step: 4,
      range: 1,
      coin: 150,
      upgradeCost: 800,
      description: "Майстер бойової сокири",
      img: elfWarriorImg,
      abilities: [
        // { key: "arrowShot", power: 300},
        // { key: "rage", power: 150},
      ],
      effects: []
    },
    level4: {
      unitId: "elf104",
      level: 4,
      name: "Воїн", // Те саме ім'я!
      hp: 145,
      armor: 25,
      attack: 59,
      step: 4,
      range: 1,
      coin: 150,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: elfWarriorImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level5: {
      unitId: "elf105",
      level: 5,
      name: "Воїн", // Те саме ім'я!
      hp: 156,
      armor: 28,
      attack: 62,
      step: 4,
      range: 1,
      coin: 150,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: elfWarriorImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level6: {
      unitId: "elf106",
      level: 6,
      name: "Воїн", // Те саме ім'я!
      hp: 156,
      armor: 31,
      attack: 65,
      step: 4,
      range: 1,
      coin: 150,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: elfWarriorImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level7: {
      unitId: "elf107",
      level: 7,
      name: "Воїн", // Те саме ім'я!
      hp: 156,
      armor: 31,
      attack: 68,
      step: 4,
      range: 1,
      coin: 150,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: elfWarriorImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level8: {
      unitId: "elf108",
      level: 8,
      name: "Воїн",
      hp: 156,
      armor: 31,
      attack: 70,
      step: 4,
      range: 1,
      coin: 150,
      upgradeCost: null,
      description: "Легендарний воїн",
      img: elfWarriorImg,
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
  Object.values(elfWarriorLevels).forEach(unit => {
    window.unitsRegistry[unit.unitId] = unit;
  });
  
  // Для магазину показуємо тільки 1 рівень
  