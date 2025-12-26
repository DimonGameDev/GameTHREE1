// js/asset/units/unitsOrc/warrior/orcLevel.js
let elfHorsesImg = "../../img/units/elf/elfHorse/blue/elfHorseBlue.png";
// ельфи - Воїн (8 рівнів)
let elfHorsesLevels = {
    level1: {
      unitId: "elf401", // Унікальний ID юніта (1XX - орки воїни)
      level: 1,
      name: "Єдиноріг",
      hp: 122,
      armor: 22,
      attack: 60,
      step: 4,
      range: 1,
      coin: 350,
      upgradeCost: 221,
      description: "Сильний воїн з важкою сокирою",
      img: elfHorsesImg,
      abilities: [
        // { key: "arrowShot", power: 200},
      ],
      effects: []
    },
    level2: {
      unitId: "elf402",
      level: 2,
      name: "Єдиноріг", // Те саме ім'я!
      hp: 142,
      armor: 23,
      attack: 63,
      step: 4,
      range: 1,
      coin: 350,
      upgradeCost: 222,
      description: "Загартований в боях воїн",
      img: elfHorsesImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level3: {
      unitId: "elf403",
      level: 3,
      name: "Єдиноріг",
      hp: 152,
      armor: 25,
      attack: 70,
      step: 5,
      range: 1,
      coin: 350,
      upgradeCost: 223,
      description: "Майстер бойової сокири",
      img: elfHorsesImg,
      abilities: [
        // { key: "arrowShot", power: 300},
        // { key: "rage", power: 150},
      ],
      effects: []
    },
    level4: {
      unitId: "elf404",
      level: 4,
      name: "Єдиноріг", // Те саме ім'я!
      hp: 152,
      armor: 27,
      attack: 73,
      step: 5,
      range: 1,
      coin: 350,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: elfHorsesImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level5: {
      unitId: "elf405",
      level: 5,
      name: "Єдиноріг", // Те саме ім'я!
      hp: 162,
      armor: 29,
      attack: 76,
      step: 5,
      range: 1,
      coin: 350,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: elfHorsesImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level6: {
      unitId: "elf406",
      level: 6,
      name: "Єдиноріг", // Те саме ім'я!
      hp: 172,
      armor: 33,
      attack: 82,
      step: 5,
      range: 1,
      coin: 350,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: elfHorsesImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level7: {
      unitId: "elf407",
      level: 7,
      name: "Єдиноріг", // Те саме ім'я!
      hp: 172,
      armor: 33,
      attack: 82,
      step: 5,
      range: 1,
      coin: 350,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: elfHorsesImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level8: {
      unitId: "elf408",
      level: 8,
      name: "Єдиноріг",
      hp: 172,
      armor: 35,
      attack: 82,
      step: 5,
      range: 1,
      coin: 350,
      upgradeCost: null,
      description: "Легендарний воїн",
      img: elfHorsesImg,
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
  Object.values(elfHorsesLevels).forEach(unit => {
    window.unitsRegistry[unit.unitId] = unit;
  });
  
 