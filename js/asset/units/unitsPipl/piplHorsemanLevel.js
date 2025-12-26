// js/asset/units/unitsOrc/warrior/orcLevel.js
let piplHorsemanImg = "../../img/units/pipl/piplHorseman/blue/piplHorsemanBlue.png";
// ОРКИ - Воїн (8 рівнів)
let piplHorsemanLevels = {
    level1: {
      unitId: "pipl501", // Унікальний ID юніта (1XX - орки воїни)
      level: 1,
      name: "Вершник",
      hp: 150,
      armor: 25,
      attack: 60,
      step: 4,
      range: 1,
      coin: 400,
      upgradeCost: 221,
      description: "Сильний воїн з важкою сокирою",
      img: piplHorsemanImg,
      abilities: [
        // { key: "arrowShot", power: 200},
      ],
      effects: []
    },
    level2: {
      unitId: "pipl502",
      level: 2,
      name: "Вершник", // Те саме ім'я!
      hp: 160,
      armor: 27,
      attack: 62,
      step: 4,
      range: 1,
      coin: 400,
      upgradeCost: 222,
      description: "Загартований в боях воїн",
      img: piplHorsemanImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level3: {
      unitId: "pipl503",
      level: 3,
      name: "Вершник",
      hp: 170,
      armor: 29,
      attack: 65,
      step: 5,
      range: 1,
      coin: 400,
      upgradeCost: 223,
      description: "Майстер бойової сокири",
      img: piplHorsemanImg,
      abilities: [
        // { key: "arrowShot", power: 300},
        // { key: "rage", power: 150},
      ],
      effects: []
    },
    level4: {
      unitId: "pipl504",
      level: 4,
      name: "Вершник", // Те саме ім'я!
      hp: 180,
      armor: 31,
      attack: 67,
      step: 5,
      range: 1,
      coin: 400,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: piplHorsemanImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level5: {
      unitId: "pipl505",
      level: 5,
      name: "Вершник", // Те саме ім'я!
      hp: 185,
      armor: 33,
      attack: 69,
      step: 5,
      range: 1,
      coin: 400,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: piplHorsemanImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level6: {
      unitId: "pipl506",
      level: 6,
      name: "Вершник", // Те саме ім'я!
      hp: 185,
      armor: 31,
      attack: 71,
      step: 5,
      range: 1,
      coin: 400,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: piplHorsemanImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level7: {
      unitId: "pipl507",
      level: 7,
      name: "Вершник", // Те саме ім'я!
      hp: 185,
      armor: 35,
      attack: 73,
      step: 5,
      range: 1,
      coin: 400,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: piplHorsemanImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level8: {
    unitId: "pipl508",
      level: 8,
      name: "Вершник",
      hp: 185,
      armor: 35,
      attack: 75,
      step: 5,
      range: 1,
      coin: 400,
      upgradeCost: null,
      description: "Легендарний воїн",
      img: piplHorsemanImg,
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
  Object.values(piplHorsemanLevels).forEach(unit => {
    window.unitsRegistry[unit.unitId] = unit;
  });
  
