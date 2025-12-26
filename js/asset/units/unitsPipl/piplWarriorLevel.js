// js/asset/units/unitsOrc/warrior/orcLevel.js
let piplWarriorImg = "../../img/units/pipl/piplWarrior/blue/piplWarriorBlue.png";
// ОРКИ - Воїн (8 рівнів)
let piplWarriorLevels = {
    level1: {
      unitId: "pipl101", // Унікальний ID юніта (1XX - орки воїни)
      level: 1,
      name: "Воїн",
      hp: 117,
      armor: 11,
      attack: 50,
      step: 3,
      range: 1,
      coin: 150,
      upgradeCost: 200,
      description: "Сильний воїн з важкою сокирою",
      img: piplWarriorImg,
      abilities: [
        // { key: "arrowShot", power: 200},
      ],
      effects: []
    },
    level2: {
      unitId: "pipl102",
      level: 2,
      name: "Воїн", // Те саме ім'я!
      hp: 127,
      armor: 14,
      attack: 52,
      step: 3,
      range: 1,
      coin: 150,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: piplWarriorImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level3: {
      unitId: "pipl103",
      level: 3,
      name: "Воїн",
      hp: 147,
      armor: 18,
      attack: 57,
      step: 4,
      range: 1,
      coin: 150,
      upgradeCost: 800,
      description: "Майстер бойової сокири",
      img: piplWarriorImg,
      abilities: [
        // { key: "arrowShot", power: 300},
        // { key: "rage", power: 150},
      ],
      effects: []
    },
    level4: {
      unitId: "pipl104",
      level: 4,
      name: "Воїн", // Те саме ім'я!
      hp: 157,
      armor: 21,
      attack: 59,
      step: 4,
      range: 1,
      coin: 150,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: piplWarriorImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level5: {
      unitId: "pipl105",
      level: 5,
      name: "Воїн", // Те саме ім'я!
      hp: 164,
      armor: 24,
      attack: 62,
      step: 4,
      range: 1,
      coin: 150,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: piplWarriorImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level6: {
      unitId: "pipl106",
      level: 6,
      name: "Воїн", // Те саме ім'я!
      hp: 164,
      armor: 27,
      attack: 65,
      step: 4,
      range: 1,
      coin: 150,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: piplWarriorImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level7: {
      unitId: "pipl107",
      level: 7,
      name: "Воїн", // Те саме ім'я!
      hp: 164,
      armor: 29,
      attack: 68,
      step: 4,
      range: 1,
      coin: 150,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: piplWarriorImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level8: {
    unitId: "pipl108",
      level: 8,
      name: "Воїн",
      hp: 164,
      armor: 29,
      attack: 70,
      step: 4,
      range: 1,
      coin: 150,
      upgradeCost: null,
      description: "Легендарний воїн",
      img: piplWarriorImg,
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
  Object.values(piplWarriorLevels).forEach(unit => {
    window.unitsRegistry[unit.unitId] = unit;
  });
  
  // Для магазину показуємо тільки 1 рівень
  