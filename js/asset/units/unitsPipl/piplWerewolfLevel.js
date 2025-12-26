// js/asset/units/unitsOrc/warrior/orcLevel.js
let piplWerewolfImg = "../../img/units/pipl/piplWerewolf/blue/piplWerewolfBlue.png";
// ОРКИ - Воїн (8 рівнів)
let piplWerewolfLevels = {
    level1: {
      unitId: "pipl801", // Унікальний ID юніта (1XX - орки воїни)
      level: 1,
      name: "Оборотень",
      hp: 145,
      armor: 25,
      attack: 51,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 200,
      description: "Сильний воїн з важкою сокирою",
      img: piplWerewolfImg,
      abilities: [
        { key: "armorAura", power: 3 }
      ],
      effects: []
    },
    level2: {
      unitId: "pipl802",
      level: 2,
      name: "Оборотень", // Те саме ім'я!
      hp: 155,
      armor: 26,
      attack: 54,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 200,
      description: "Загартований в боях воїн",
      img: piplWerewolfImg,
      abilities: [
        { key: "armorAura", power: 3 }
      ],
      effects: []
    },
    level3: {
      unitId: "pipl803",
      level: 3,
      name: "Оборотень",
      hp: 165,
      armor: 30,
      attack: 56,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 203,
      description: "Майстер бойової сокири",
      img: piplWerewolfImg,
      abilities: [
        { key: "armorAura", power: 3 }
      ],
      effects: []
    },
    level4: {
      unitId: "pipl804",
      level: 4,
      name: "Оборотень", // Те саме ім'я!
      hp: 170,
      armor: 31,
      attack: 59,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: piplWerewolfImg,
      abilities: [
        { key: "armorAura", power: 5 }
      ],
      effects: []
    },
    level5: {
      unitId: "pipl805",
      level: 5,
      name: "Оборотень", // Те саме ім'я!
      hp: 170,
      armor: 32,
      attack: 62,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: piplWerewolfImg,
      abilities: [
        { key: "armorAura", power: 5 }
      ],
      effects: []
    },
    level6: {
      unitId: "pipl806",
      level: 6,
      name: "Оборотень", // Те саме ім'я!
      hp: 170,
      armor: 33,
      attack: 65,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: piplWerewolfImg,
      abilities: [
        { key: "armorAura", power: 5 }
      ],
      effects: []
    },
    level7: {
      unitId: "pipl807",
      level: 7,
      name: "Оборотень", // Те саме ім'я!
      hp: 170,
      armor: 34,
      attack: 68,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: piplWerewolfImg,
      abilities: [
        { key: "armorAura", power: 5 }
      ],
      effects: []
    },
    level8: {
    unitId: "pipl808",
      level: 8,
      name: "Оборотень",
      hp: 170,
      armor: 35,
      attack: 70,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: null,
      description: "Легендарний воїн",
      img: piplWerewolfImg,
      abilities: [
        { key: "armorAura", power: 5 }
      ],
      effects: []
    }
  };
  
  // Створюємо глобальний реєстр всіх юнітів за ID
  window.unitsRegistry = window.unitsRegistry || {};
  Object.values(piplWerewolfLevels).forEach(unit => {
    window.unitsRegistry[unit.unitId] = unit;
  });
  
  // Для магазину показуємо тільки 1 рівень
 