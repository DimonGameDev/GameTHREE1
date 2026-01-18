// js/asset/units/unitsOrc/warrior/orcLevel.js
let demonSpiritImg = "../../img/units/demon/demonSpirit/red/demonSpiritRed.png";
// ельфи - Воїн (8 рівнів)
  //   let demonSpiritLevels = {
  //   level1: {
  //     unitId: "demon901", // Унікальний ID юніта (1XX - орки воїни)
  //     level: 1,
  //     name: "Дух",
  //     hp: 145,
  //     armor: 15,
  //     attack: 50,
  //     step: 4,
  //     range: 1,
  //     coin: 500,
  //     upgradeCost: 200,
  //     description: "Сильний воїн з важкою сокирою",
  //     img: demonSpiritImg,
  //     abilities: [
  //       { key: "markTarget", power: 3 },
  //     ],
  //     effects: []
  //   },
  //   level2: {
  //     unitId: "demon902",
  //     level: 2,
  //     name: "Дух", // Те саме ім'я!
  //     hp: 155,
  //     armor: 16,
  //     attack: 52,
  //     step: 4,
  //     range: 1,
  //     coin: 500,
  //     upgradeCost: 202,
  //     description: "Загартований в боях воїн",
  //     img: demonSpiritImg,
  //     abilities: [
  //       { key: "markTarget", power: 3 },
  //     ],
  //     effects: []
  //   },
  //   level3: {
  //     unitId: "demon903",
  //     level: 3,
  //     name: "Дух",
  //     hp: 162,
  //     armor: 18,
  //     attack: 55,
  //     step: 5,
  //     range: 1,
  //     coin: 500,
  //     upgradeCost: 203,
  //     description: "Майстер бойової сокири",
  //     img: demonSpiritImg,
  //     abilities: [
  //       { key: "markTarget", power: 4 },
  //     ],
  //     effects: []
  //   },
  //   level4: {
  //     unitId: "demon904",
  //     level: 4,
  //     name: "Дух", // Те саме ім'я!
  //     hp: 162,
  //     armor: 19,
  //     attack: 57,
  //     step: 5,
  //     range: 1,
  //     coin: 500,
  //     upgradeCost: 400,
  //     description: "Загартований в боях воїн",
  //     img: demonSpiritImg,
  //     abilities: [
  //       { key: "markTarget", power: 4 },
  //     ],
  //     effects: []
  //   },
  //   level5: {
  //       unitId: "demon905",
  //     level: 5,
  //     name: "Дух", // Те саме ім'я!
  //     hp: 162,
  //     armor: 20,
  //     attack: 59,
  //     step: 5,
  //     range: 1,
  //     coin: 500,
  //     upgradeCost: 400,
  //     description: "Загартований в боях воїн",
  //     img: demonSpiritImg,
  //     abilities: [
  //       { key: "markTarget", power: 5 },
  //     ],
  //     effects: []
  //   },
  //   level6: {
  //     unitId: "demon906",
  //     level: 6,
  //     name: "Дух", // Те саме ім'я!
  //     hp: 162,
  //     armor: 21,
  //     attack: 61,
  //     step: 5,
  //     range: 1,
  //     coin: 500,
  //     upgradeCost: 400,
  //     description: "Загартований в боях воїн",
  //     img: demonSpiritImg,
  //     abilities: [
  //       { key: "markTarget", power: 5 },
  //     ],
  //     effects: []
  //   },
  //   level7: {
  //     unitId: "demon907",
  //     level: 7,
  //     name: "Дух", // Те саме ім'я!
  //     hp: 162,
  //     armor: 22,
  //     attack: 63,
  //     step: 5,
  //     range: 1,
  //     coin: 500,
  //     upgradeCost: 400,
  //     description: "Загартований в боях воїн",
  //       img: demonSpiritImg,
  //     abilities: [
  //       { key: "markTarget", power: 6 },
  //     ],
  //     effects: []
  //   },
  //   level8: {
  //     unitId: "demon908",
  //     level: 8,
  //     name: "Дух",
  //     hp: 162,
  //     armor: 23,
  //     attack: 65,
  //     step: 5,
  //     range: 1,
  //     coin: 500,
  //     upgradeCost: null,
  //     description: "Легендарний воїн",
  //     img: demonSpiritImg,
  //     abilities: [
  //       { key: "markTarget", power: 6 },
  //     ],
  //     effects: []
  //   }
  // };
  
  // // Створюємо глобальний реєстр всіх юнітів за ID
  // window.unitsRegistry = window.unitsRegistry || {};
  // Object.values(demonSpiritLevels).forEach(unit => {
  //   window.unitsRegistry[unit.unitId] = unit;
  // });
  
  window.unitsRegistry = window.unitsRegistry || {};

  window.unitsRegistry["demon:spirit"] = {
    baseUnitKey: "demon:spirit",
    race: "demon",
    role: "mage",
    name: "Дух",
    img: "../../img/units/demon/demonSpirit/red/demonSpiritRed.png",
  
    maxLevel: 8,
  
    levels: {
      1: { hp: 114, armor: 7, attack: 60, step: 3, range: 2, coin: 250, upgradeCost: 55 },
      2: { hp: 119, armor: 9, attack: 60, step: 3, range: 2, coin: 250, upgradeCost: 68 },
      3: { hp: 134, armor: 11, attack: 54, step: 4, range: 3, coin: 250, upgradeCost: 223 },
      4: { hp: 144, armor: 14, attack: 57, step: 4, range: 3, coin: 250, upgradeCost: 400 },
      5: { hp: 154, armor: 17, attack: 60, step: 4, range: 3, coin: 250, upgradeCost: 400 },
      6: { hp: 156, armor: 20, attack: 62, step: 4, range: 3, coin: 250, upgradeCost: 400 },
      7: { hp: 156, armor: 23, attack: 65, step: 4, range: 3, coin: 250, upgradeCost: 400 },
      8: { hp: 156, armor: 26, attack: 65, step: 4, range: 3, coin: 250, upgradeCost: null }
    },
  
    abilities: [
      { key: "markTarget", power: 3 },
    ]
  };