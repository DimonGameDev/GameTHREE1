// js/asset/units/unitsOrc/warrior/orcLevel.js
let demonShamanImg = "../../img/units/demon/demonMag/blue/demonShamanBlue.png";
// ельфи - Воїн (8 рівнів)
let demonShamanLevels = {
    level1: {
      unitId: "demon301", // Унікальний ID юніта (1XX - орки воїни)
      level: 1,
      name: "Шаман",
      hp: 115,
      armor: 5,
      attack: 46,
      step: 3,
      range: 3,
      coin: 300,
      upgradeCost: 221,
      description: "Сильний воїн з важкою сокирою",
      img: demonShamanImg,
      abilities: [
        { key: "allyHeal", power: 30 },
      ],
      effects: []
    },
    level2: {
      unitId: "demon302",
      level: 2,
      name: "Шаман", // Те саме ім'я!
      hp: 130,
      armor: 8,
      attack: 49,
      step: 3,
      range: 3,
      coin: 300,
      upgradeCost: 222,
      description: "Загартований в боях воїн",
      img: demonShamanImg,
      abilities: [
        { key: "allyHeal", power: 30 },
      ],
      effects: []
    },
    level3: {
      unitId: "demon303",
      level: 3,
      name: "Шаман",
      hp: 140,
      armor: 12,
      attack: 57,
      step: 4,
      range: 3,
      coin: 300,
      upgradeCost: 223,
      description: "Майстер бойової сокири",
      img: demonShamanImg,
      abilities: [
        { key: "allyHeal", power: 30 },
      ],
      effects: []
    },
    level4: {
      unitId: "demon304",
      level: 4,
      name: "Шаман", // Те саме ім'я!
      hp: 140,
      armor: 14,
      attack: 60,
      step: 4,
      range: 3,
      coin: 300,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: demonShamanImg,
      abilities: [
        { key: "allyHeal", power: 30 },
      ],
      effects: []
    },
    level5: {
      unitId: "demon305",
      level: 5,
      name: "Шаман", // Те саме ім'я!
      hp: 140,
      armor: 16,
      attack: 64,
      step: 4,
      range: 3,
      coin: 300,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: demonShamanImg,
      abilities: [
        { key: "allyHeal", power: 50 },
      ],
      effects: []
    },
    level6: {
      unitId: "demon306",
      level: 6,
      name: "Шаман", // Те саме ім'я!
      hp: 140,
      armor: 18,
      attack: 64,
      step: 4,
      range: 3,
      coin: 300,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: demonShamanImg,
      abilities: [
        { key: "allyHeal", power: 50 },
      ],
      effects: []
    },
    level7: {
      unitId: "demon307",
      level: 7,
      name: "Шаман", // Те саме ім'я!
      hp: 140,
      armor: 19,
      attack: 64,
      step: 4,
      range: 3,
      coin: 300,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: demonShamanImg,
      abilities: [
        { key: "allyHeal", power: 50 },
      ],
      effects: []
    },
    level8: {
      unitId: "demon308",
      level: 8,
      name: "Шаман",
      hp: 140,
      armor: 20,
      attack: 64,
      step: 4,
      range: 3,
      coin: 300,
      upgradeCost: null,
      description: "Легендарний воїн",
      img: demonShamanImg,
      abilities: [
        { key: "allyHeal", power: 50 },
      ],
      effects: []
    }
  };
  
  // Створюємо глобальний реєстр всіх юнітів за ID
  window.unitsRegistry = window.unitsRegistry || {};
  Object.values(demonShamanLevels).forEach(unit => {
    window.unitsRegistry[unit.unitId] = unit;
  });
  
 