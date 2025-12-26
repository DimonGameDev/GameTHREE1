// js/asset/units/unitsOrc/warrior/orcLevel.js
let demonSupervisorImg = "../../img/units/demon/demonSupervisor/red/demonSupervisorRed.png";
// ельфи - Воїн (8 рівнів)
    let demonSupervisorLevels = {
    level1: {
      unitId: "demon801", // Унікальний ID юніта (1XX - орки воїни)
      level: 1,
      name: "Наглядач",
      hp: 151,
      armor: 23,
      attack: 51,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 200,
      description: "Сильний воїн з важкою сокирою",
      img: demonSupervisorImg,
      abilities: [
        { key: "armorAura", power: 3 }
      ],
      effects: []
    },
    level2: {
      unitId: "demon802",
      level: 2,
      name: "Наглядач", // Те саме ім'я!
      hp: 161,
      armor: 24,
      attack: 54,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 202,
      description: "Загартований в боях воїн",
      img: demonSupervisorImg,
      abilities: [
        { key: "armorAura", power: 3 }
      ],
      effects: []
    },
    level3: {
      unitId: "demon803",
      level: 3,
      name: "Наглядач",
      hp: 171,
      armor: 27,
      attack: 57,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 203,
      description: "Майстер бойової сокири",
      img: demonSupervisorImg,
      abilities: [
        { key: "armorAura", power: 3 }
      ],
      effects: []
    },
    level4: {
      unitId: "demon804",
      level: 4,
      name: "Наглядач", // Те саме ім'я!
      hp: 178,
      armor: 28,
      attack: 60,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: demonSupervisorImg,
      abilities: [
        { key: "armorAura", power: 5 }
      ],
      effects: []
    },
    level5: {
        unitId: "demon805",
      level: 5,
      name: "Наглядач", // Те саме ім'я!
      hp: 178,
      armor: 29,
      attack: 63,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: demonSupervisorImg,
      abilities: [
        { key: "armorAura", power: 5 }
      ],
      effects: []
    },
    level6: {
      unitId: "demon806",
      level: 6,
      name: "Наглядач", // Те саме ім'я!
      hp: 178,
      armor: 30,
      attack: 66,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: demonSupervisorImg,
      abilities: [
        { key: "armorAura", power: 5 }
      ],
      effects: []
    },
    level7: {
      unitId: "demon807",
      level: 7,
      name: "Наглядач", // Те саме ім'я!
      hp: 178,
      armor: 31,
      attack: 69,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: demonSupervisorImg,
      abilities: [
        { key: "armorAura", power: 5 }
      ],
      effects: []
    },
    level8: {
      unitId: "demon808",
      level: 8,
      name: "Наглядач",
      hp: 178,
      armor: 32,
      attack: 71,
      step: 4,
      range: 2,
      coin: 500,
      upgradeCost: null,
      description: "Легендарний воїн",
      img: demonSupervisorImg,
      abilities: [
        { key: "armorAura", power: 5 }
      ],
      effects: []
    }
  };
  
  // Створюємо глобальний реєстр всіх юнітів за ID
  window.unitsRegistry = window.unitsRegistry || {};
  Object.values(demonSupervisorLevels).forEach(unit => {
    window.unitsRegistry[unit.unitId] = unit;
  });
  
 