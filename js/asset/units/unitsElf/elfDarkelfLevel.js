// js/asset/units/unitsOrc/warrior/orcLevel.js
let elfDarkelfImg = "../../img/units/elf/elfDarkelf/blue/elfDarkelfBlue.png";
// ельфи - Воїн (8 рівнів)
let elfDarkelfLevels = {
    level1: {
      unitId: "elf1001", // Унікальний ID юніта (1XX - орки воїни)
      level: 1,
      name: "Темний ельф",
      hp: 150,
      armor: 20,
      attack: 60,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 200,
      description: "Сильний воїн з важкою сокирою",
      img: elfDarkelfImg,
      abilities: [
        { key: "attackAura", power: 3 } 
      ],
      effects: []
    },
    level2: {
      unitId: "elf1002",
      level: 2,
      name: "Темний ельф", // Те саме ім'я!
      hp: 155,
      armor: 21,
      attack: 62,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 202,
      description: "Загартований в боях воїн",
      img: elfDarkelfImg,
      abilities: [
        { key: "attackAura", power: 3 }
      ],
      effects: []
    },
    level3: {
      unitId: "elf1003",
      level: 3,
      name: "Темний ельф",
      hp: 165,
      armor: 22,
      attack: 65,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 203,
      description: "Майстер бойової сокири",
      img: elfDarkelfImg,
      abilities: [
        { key: "attackAura", power: 3 }
      ],
      effects: []
    },
    level4: {
        unitId: "elf1004",
      level: 4,
      name: "Темний ельф", // Те саме ім'я!
      hp: 170,
      armor: 23,
      attack: 67,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: elfDarkelfImg,
      abilities: [
        { key: "attackAura", power: 5 }
      ],
      effects: []
    },
    level5: {
            unitId: "elf1005",
      level: 5,
      name: "Темний ельф", // Те саме ім'я!
      hp: 170,
      armor: 24,
      attack: 69,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: elfDarkelfImg,
      abilities: [
        { key: "attackAura", power: 5 }
      ],
      effects: []
    },
    level6: {
      unitId: "elf1006",
      level: 6,
      name: "Темний ельф", // Те саме ім'я!
      hp: 170,
      armor: 25,
      attack: 71,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: elfDarkelfImg,
      abilities: [
        { key: "attackAura", power: 5 }
      ],
      effects: []
    },
    level7: {
      unitId: "elf1007",
      level: 7,
      name: "Темний ельф", // Те саме ім'я!
      hp: 170,
      armor: 26,
      attack: 73,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: elfDarkelfImg,
      abilities: [
        { key: "attackAura", power: 5 }
      ],
      effects: []
    },
    level8: {
        unitId: "elf1008",
      level: 8,
      name: "Темний ельф",
      hp: 170,
      armor: 27,
      attack: 75,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: null,
      description: "Легендарний воїн",
      img: elfDarkelfImg,
      abilities: [
        { key: "attackAura", power: 5 }
      ],
      effects: []
    }
  };
  
  // Створюємо глобальний реєстр всіх юнітів за ID
  window.unitsRegistry = window.unitsRegistry || {};
  Object.values(elfDarkelfLevels).forEach(unit => {
    window.unitsRegistry[unit.unitId] = unit;
  });
  
 