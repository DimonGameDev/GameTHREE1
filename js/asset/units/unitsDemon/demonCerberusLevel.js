// js/asset/units/unitsOrc/warrior/orcLevel.js
let demonCerberusImg = "../../img/units/demon/demonCerberus/red/demonCerberusRed.png";
// ельфи - Воїн (8 рівнів)
    let demonCerberusLevels = {
    level1: {
      unitId: "demon1001", // Унікальний ID юніта (1XX - орки воїни)
      level: 1,
      name: "Цербер",
      hp: 150,
      armor: 20,
      attack: 60,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 200,
      description: "Сильний воїн з важкою сокирою",
      img: demonCerberusImg,
      abilities: [
        { key: "attackAura", power: 3 }
      ],
      effects: []
    },
    level2: {
      unitId: "demon1002",
      level: 2,
      name: "Цербер", // Те саме ім'я!
      hp: 155,
      armor: 21,
      attack: 62,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 202,
      description: "Загартований в боях воїн",
      img: demonCerberusImg,
      abilities: [
        { key: "attackAura", power: 3 }
      ],
      effects: []
    },
    level3: {
      unitId: "demon1003",
      level: 3,
      name: "Цербер",
      hp: 165,
      armor: 22,
      attack: 65,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 203,
      description: "Майстер бойової сокири",
      img: demonCerberusImg,
      abilities: [
        { key: "attackAura", power: 3 }
      ],
      effects: []
    },
    level4: {
      unitId: "demon1004",
      level: 4,
      name: "Цербер", // Те саме ім'я!
      hp: 170,
      armor: 23,
      attack: 67,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: demonCerberusImg,
      abilities: [
        { key: "attackAura", power: 5 }
      ],
      effects: []
    },
    level5: {
        unitId: "demon1005",
      level: 5,
      name: "Цербер", // Те саме ім'я!
      hp: 170,
      armor: 24,
      attack: 69,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: demonCerberusImg,
      abilities: [
        { key: "attackAura", power: 5 }
      ],
      effects: []
    },
    level6: {
      unitId: "demon1006",
      level: 6,
      name: "Цербер", // Те саме ім'я!
      hp: 170,
      armor: 25,
      attack: 71,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: demonCerberusImg,
      abilities: [
        { key: "attackAura", power: 5 }
      ],
      effects: []
    },
    level7: {
      unitId: "demon1007",
      level: 7,
      name: "Цербер", // Те саме ім'я!
      hp: 170,
      armor: 26,
      attack: 73,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
        img: demonCerberusImg,
      abilities: [
        { key: "attackAura", power: 5 }
      ],
      effects: []
    },
    level8: {
    unitId: "demon1008",
      level: 8,
      name: "Цербер",
      hp: 170,
      armor: 27,
      attack: 75,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: null,
      description: "Легендарний воїн",
      img: demonCerberusImg,
      abilities: [
        { key: "attackAura", power: 5 }
      ],
      effects: []
    }
  };
  
  // Створюємо глобальний реєстр всіх юнітів за ID
  window.unitsRegistry = window.unitsRegistry || {};
  Object.values(demonCerberusLevels).forEach(unit => {
    window.unitsRegistry[unit.unitId] = unit;
  });
  
 