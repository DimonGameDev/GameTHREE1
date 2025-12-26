window.heroes = [
    {
      id: 1,
      name: "Туверан", 
      level: 1,
      LevelAttack: 1,
      LevelArmor: 1,
      attack: 65,
      armor: 22,
      hp: 140,
      range: 2,
      step: 7,
      critChance: 10,      // Шанс криту в % 
      critBlow: 1.4, // множник шкоди при криті
      img: "../../img/heroes/heroesList/tuveran/blue/tuveranBlue.png",
      description: "Майстер лука, що може вражати ворогів на відстані.",
      abilitiesProgress: [
        { abilityId: 12, currentLevel: 4 },  
        { abilityId: 1, currentLevel: 1 },  
        { abilityId: 2, currentLevel: 1 }  
      ],
      effects: []
    },
    {
      id: 2,
      name: "Тімер",
      level: 1,
      LevelAttack: 1,
      LevelArmor: 1,
      attack: 65,
      armor: 22,
      hp: 140,
      range: 1,
      step: 7,
      critChance: 10,      // Шанс криту в % 
      critBlow: 1.4,
      img: "../../img/heroes/heroesList/timer/blue/timerBlue.png",
      description: "Відважний лицар, який стоїть на передовій. Може обмінятися здоровʼям з союзником, що дає йому додаткові можливості для маневрів.",
      abilitiesProgress: [
        { abilityId: 13, currentLevel: 1 },  
        { abilityId: 1, currentLevel: 1  },  
        { abilityId: 2, currentLevel: 1 }  
      ],
      effects: []
    },
    {
      id: 3,
      name: "Дарест",
      level: 1,
      LevelAttack: 1,
      LevelArmor: 1,
      attack: 65,
      armor: 22,
      hp: 140,
      range: 2,
      step: 7,
      critChance: 10,      // Шанс криту в % 
      critBlow: 1.4,
      img: "../../img/heroes/heroesList/darest/blue/darestBlue.png",
      description: "Магічна атака на відстані робить його небезпечним. Хоть і не має активних здібностей, але вбити його потрібно двічі.",
      abilitiesProgress: [
        { abilityId: 10, currentLevel: 1 },  
        { abilityId: 1, currentLevel: 1  },  
        { abilityId: 2, currentLevel: 1 } 
      ],
      effects: []
    },
    {
      id: 4,
      name: "Крівер",
      level: 1,
      LevelAttack: 1,
      LevelArmor: 1,
      attack: 65,
      armor: 22,
      hp: 140,
      range: 1,
      step: 7,
      critChance: 10,      // Шанс криту в % 
      critBlow: 1.4,
      img: "../../img/heroes/heroesList/kriver/blue/kriverBlue.png",
      description: "Заточений під атаку але може вриватися в толпу, тому що чим більше поряд ворогів, тим більша в нього броня.",
      abilitiesProgress: [
        { abilityId: 26, currentLevel: 1 },
        { abilityId: 1, currentLevel: 1 },  
        { abilityId: 2, currentLevel: 1 }
      ],
      effects: []
    },
    {
      id: 5,
      name: "Спетрі",
      level: 1,
      LevelAttack: 1,
      LevelArmor: 1,
      attack: 65,
      armor: 22,
      hp: 140,
      range: 1,
      step: 7,
      critChance: 10,      // Шанс криту в % 
      critBlow: 1.4,
      img: "../../img/heroes/heroesList/spetri/blue/spetriBlue.png",
      description: "Воїн з самого пекла. Його коса - дуже небезпечна зброя, бо чим менше здоровʼя у її власника,тим сильніший удар.",
      abilitiesProgress: [
        { abilityId: 11, currentLevel: 1 },  
        { abilityId: 1, currentLevel: 1 },  
        { abilityId: 2, currentLevel: 1 }  
      ],
      effects: []
    },
    {
      id: 6,
      name: "Артеміс",
      level: 1,
      LevelAttack: 1,
      LevelArmor: 1,
      attack: 60,
      armor: 25,
      hp: 146,
      range: 1,
      step: 7,
      critChance: 15,      // Шанс криту в % 
      critBlow: 1.6,
      img: "../../img/heroes/heroesList/artemis/blue/artemisBlue.png",
      description: "Повільний, але сильний воїн. Атакує зразу декількох воїнів за один удар, добре підходить щоб проривати ряди ворогів.",
      abilitiesProgress: [
        { abilityId: 27, currentLevel: 1 },  
        { abilityId: 15, currentLevel: 1 },  
        { abilityId: 7, currentLevel: 1 } 
      ],
      effects: []
    },
    {
      id: 7,
      name: "Енагра",
      level: 1,
      LevelAttack: 1,
      LevelArmor: 1,
      attack: 60,
      armor: 25,
      hp: 146,
      range: 1,
      step: 7,
      critChance: 15,      // Шанс криту в % 
      critBlow: 1.6,
      img: "../../img/heroes/heroesList/enagra/blue/enagraBlue.png",
      description: "Лицарь в блискучій броні. Випускає шипи які повертають частину завданого урону ворогу. На цілий хід він стає тим, кого краще ігнорувати.",
      abilitiesProgress: [
        { abilityId: 14, currentLevel: 1 },  
        { abilityId: 15, currentLevel: 1 },
				{ abilityId: 7, currentLevel: 1 }
      ],
      effects: []
    },
    {
      id: 8,
      name: "Блістер",
      level: 1,
      LevelAttack: 1,
      LevelArmor: 1,
      attack: 60,
      armor: 25,
      hp: 146,
      range: 1,
      step: 7,
      critChance: 15,      // Шанс криту в % 
      critBlow: 1.6,
      img: "../../img/heroes/heroesList/blister/blue/blisterBlue.png",
      description: "Його зовнішій вигляд і так вражає, але ще до цього він може підняти свій щит і стати ще більш небезпечнішим.",
      abilitiesProgress: [
        { abilityId: 23, currentLevel: 1 },  
        { abilityId: 15, currentLevel: 1 },  
        { abilityId: 7, currentLevel: 1 }
      ],
      effects: []
    },
    {
      id: 9,
      name: "Генрі",
      level: 1,
      LevelAttack: 1,
      LevelArmor: 1,
      attack: 60,
      armor: 25,
      hp: 146,
      range: 1,
      step: 7,
      critChance: 15,      // Шанс криту в % 
      critBlow: 1.6,
      img: "../../img/heroes/heroesList/henri/blue/henriBlue.png",
      description: "Воїн з магічною броньою,його краще або зразу добити, або не трогати зовсім. Тому що напів живий він небезпечніший чим повністю здоровий.",
      abilitiesProgress: [
        { abilityId: 4, currentLevel: 1 },  
        { abilityId: 15, currentLevel: 1 },  
        { abilityId: 7, currentLevel: 1 } 
      ],
      effects: []
    },
    {
      id: 10,
      name: "Савагар",
      level: 1,
      LevelAttack: 1,
      LevelArmor: 1,
      attack: 60,
      armor: 25,
      hp: 146,
      range: 1,
      step: 7,
      critChance: 15,      // Шанс криту в % 
      critBlow: 1.6,
      img: "../../img/heroes/heroesList/savagar/blue/savagarBlue.png",
      description: "Бикоподібний воїн вражає своєю проривною здібністю. В момент телепортується до ворогів і глушить їх.",
      abilitiesProgress: [
        { abilityId: 16, currentLevel: 1 },
        { abilityId: 15, currentLevel: 1 },  
        { abilityId: 7, currentLevel: 1 }
      ],
      effects: []
    },
    {
      id: 11,
      name: "Майден",
      level: 1,
      LevelAttack: 1,
      LevelArmor: 1,
      attack: 60,
      armor: 19,
      hp: 146,
      range: 3,
      step: 7,
      critChance: 10,      // Шанс криту в % 
      critBlow: 1.3,
      img: "../../img/heroes/heroesList/mayden/blue/maydenBlue.png",
      description: "Хитрий і підступний, передбачає дії і ходи ворога на крок вперед. Відмічає майбутню позицію ворога і бʼє туди, ворог навіть не розуміє хто його атакував.",
      abilitiesProgress: [
        { abilityId: 19, currentLevel: 1 },  
        { abilityId: 21, currentLevel: 1 },  
        { abilityId: 20, currentLevel: 1 }
      ],
      effects: []
    },
    {
      id: 12,
      name: "Елдера",
      level: 1,
      LevelAttack: 1,
      LevelArmor: 1,
      attack: 60,
      armor: 19,
      hp: 146,
      range: 3,
      step: 7,
      critChance: 10,      // Шанс криту в % 
      critBlow: 1.3,
      img: "../../img/heroes/heroesList/elder/blue/elderBlue.png",
      description: "Магічна ворожка з самої тьми. Наділяє союзника шипами які повертають урон атакуючому ворогу.",
      abilitiesProgress: [
        { abilityId: 22, currentLevel: 1 },  
        { abilityId: 21, currentLevel: 1 },  
        { abilityId: 20, currentLevel: 1 }
      ],
      effects: []
    },
    {
      id: 13,
      name: "Дазара",
      level: 1,
      LevelAttack: 1,
      LevelArmor: 1,
      attack: 60,
      armor: 19,
      hp: 146,
      range: 3,
      step: 7,
      critChance: 10,      // Шанс криту в % 
      critBlow: 1.3,
          img: "../../img/heroes/heroesList/dazara/blue/dazaraBlue.png",
      description: "Майстриня дального бою, своєю косою дістає ворога з безпечної відстані. А союзника робить більш небезпечнішим на цілий хід.",
      abilitiesProgress: [
        { abilityId: 24, currentLevel: 1 },  
        { abilityId: 21, currentLevel: 1 },  
        { abilityId: 20, currentLevel: 1 }
      ],
      effects: []
    },
    {
      id: 14,
      name: "Сніпер",
      level: 1,
      LevelAttack: 1,
      LevelArmor: 1,
      attack: 60,
      armor: 19,
      hp: 146,
      range: 3,
      step: 7,
      critChance: 10,      // Шанс криту в % 
      critBlow: 1.3,
      img: "../../img/heroes/heroesList/sniper/blue/sniperBlue.png",
      description: "Темний ельф одинак, його вигнали за те, що він практикував темну магію. Він може накладати прокляття на ворога.",
      abilitiesProgress: [
        { abilityId: 25, currentLevel: 1 }, 
        { abilityId: 21, currentLevel: 1 },  
        { abilityId: 20, currentLevel: 1 }
      ],
      effects: []
    },
    {
      id: 15,
      name: "Некропіус",
      level: 1,
      LevelAttack: 1,
      LevelArmor: 1,
      attack: 60,
      armor: 10,
      hp: 146,
      range: 3,
      step: 7,
      critChance: 10,      // Шанс криту в % 
      critBlow: 1.3,
        img: "../../img/heroes/heroesList/nekropius/blue/nekropiusBlue.png",
      description: "Живий мрець,сам по собі і так небезпечний, але його здібність мінятися місцями з союзником, робить його майже не вловимим.",
      abilitiesProgress: [
        { abilityId: 17, currentLevel: 1 },
        { abilityId: 21, currentLevel: 1 },  
        { abilityId: 20, currentLevel: 1 }
      ],
      effects: []
    }
  ];

  // console.log(heroes); // масив доступний глобально
  // console.log(heroes[14].abilitiesProgress[0].abilityId);