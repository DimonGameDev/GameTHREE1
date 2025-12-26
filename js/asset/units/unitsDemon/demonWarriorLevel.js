// js/asset/units/unitsOrc/warrior/orcLevel.js
let demonWarriorImg = "../../img/units/demon/demonWarrior/blue/demonWarriorBlue.png";
// ельфи - Воїн (8 рівнів)
let demonWarriorLevels = {
    level1: {
      unitId: "demon101", // Унікальний ID юніта (1XX - орки воїни)
      level: 1,
      name: "Воїн",
      hp: 99,
      armor: 12,
      attack: 55,
      step: 3,
      range: 1,
      coin: 150,
      upgradeCost: 200,
      description: "Сильний воїн з важкою сокирою",
      img: demonWarriorImg,
      abilities: [
        // { key: "arrowShot", power: 200},
      ],
      effects: []
    },
    level2: {
      unitId: "demon102",
      level: 2,
      name: "Воїн", // Те саме ім'я!
      hp: 109,
      armor: 15,
      attack: 57,
      step: 3,
      range: 1,
      coin: 150,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: demonWarriorImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level3: {
      unitId: "demon103",
      level: 3,
      name: "Воїн",
      hp: 129,
      armor: 19,
      attack: 62,
      step: 4,
      range: 1,
      coin: 150,
      upgradeCost: 800,
      description: "Майстер бойової сокири",
      img: demonWarriorImg,
      abilities: [
        // { key: "arrowShot", power: 300},
        // { key: "rage", power: 150},
      ],
      effects: []
    },
    level4: {
      unitId: "demon104",
      level: 4,
      name: "Воїн", // Те саме ім'я!
      hp: 139,
      armor: 22,
      attack: 64,
      step: 4,
      range: 1,
      coin: 150,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: demonWarriorImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level5: {
      unitId: "demon105",
      level: 5,
      name: "Воїн", // Те саме ім'я!
      hp: 149,
      armor: 25,
      attack: 67,
      step: 4,
      range: 1,
      coin: 150,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: demonWarriorImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level6: {
      unitId: "demon106",
      level: 6,
      name: "Воїн", // Те саме ім'я!
      hp: 152,
      armor: 27,
      attack: 70,
      step: 4,
      range: 1,
      coin: 150,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: demonWarriorImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level7: {
      unitId: "demon107",
      level: 7,
      name: "Воїн", // Те саме ім'я!
      hp: 152,
      armor: 27,
      attack: 73,
      step: 4,
      range: 1,
      coin: 150,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: demonWarriorImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level8: {
      unitId: "demon108",
      level: 8,
      name: "Воїн",
      hp: 152,
      armor: 27,
      attack: 75,
      step: 4,
      range: 1,
      coin: 150,
      upgradeCost: null,
      description: "Легендарний воїн",
      img: demonWarriorImg,
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
  Object.values(demonWarriorLevels).forEach(unit => {
    window.unitsRegistry[unit.unitId] = unit;
  });
  
 
  