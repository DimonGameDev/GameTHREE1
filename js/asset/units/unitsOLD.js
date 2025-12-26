

// === ОРКИ ===
let orcs = [
    {
      name: "рубак",
      hp: 110,
      newhp: 110,
      armor: 8,
      attack: 55,
      step: 3,
      range: 1,
    coin: 100,
    description: "сильний воїн з важкою сокирою, розриває ворогів у ближньому бою.",
      img: "../../img/units/orc/orcWarrior/blue/orcWarriorBlue.png",
    abilities: [
      { key: "arrowShot", power: 200},
      { key: "teleport"},
    ],
    effects: [],
    upgrades: upgrades.orcs.rubak
    
    },
   {
      name: "Лучник",
      hp: 110,
      newhp: 110,
      armor: 8,
      attack: 55,
      step: 3,
      range: 1,
    coin: 100,
    description: "стріляє з далекої відстані, але погано тримає удар.",
      img: "../../img/units/orc/orcArcher/orcArcher1.png",
    
    abilities: [
    { key: "rage", power: 300},
    { key: "stability", power: 9},
    ],
    effects: [],
    upgrades: upgrades.orcs.luchnik
    
      
    },
    {
      name: "шаман",
      hp: 70,
      newhp: 70,
      armor: 5,
      attack: 40,
      step: 2,
      range: 3,
    coin: 100,
    description: "сильний",
      img: "../../img/units/orc/orcShaman/blue/orcShamanBlue.png",
    abilities: [
    { key: "rage", power: 200},
    { key: "stability", power: 9},
    ],
    effects: [],
    upgrades: upgrades.orcs.Shaman
    
    },
    {
      name: "вовк",
      hp: 90,
      newhp: 90,
      armor: 5,
      attack: 50,
      step: 5,
      range: 1,
    coin: 100,
    description: "швидкий і агресивний, прориває ворожі ряди.",
      img: "../../img/units/orc/orcWolf/orcWolf1.png",
    abilities: [
    { key: "auraHeal", power: 9},
    { key: "rage", power: 404},
    { key: "teleport"},
    ],
    effects: [],
    upgrades: upgrades.orcs.Wolf
    
    }
  ];
  
  
  // === ЕЛЬФИ ===
  let elves = [
    {
      name: "вартовий",
      hp: 85,
      newhp: 85,
      armor: 10,
      attack: 40,
      step: 3,
      range: 1,
    coin: 100,
    description: "вправний боєць, швидкий і точний у ближньому бою.",
      img: "../../img/units/elf/elfWarrior/blue/elfWarriorBlue.png",
    abilities: [
    { key: "rage", power: 200},
    { key: "stability", power: 9},
    ],
    effects: [],
    upgrades: upgrades.elves.voin
    
    },
    {
      name: "лучниця",
      hp: 75,
      newhp: 75,
      armor: 5,
      attack: 45,
      step: 3,
      range: 4,
    coin: 100,
    description: "майстер лука, смертельний на відстані.",
      img: "../../img/units/elf/elfArcher/elfArcherBlue.png",
    abilities: [
    { key: "rage", power: 200},
    { key: "stability", power: 9},
    ],
    effects: [],
    upgrades: upgrades.elves.luchnik
    
    },
    {
      name: "друїд",
      hp: 70,
      newhp: 70,
      armor: 5,
      attack: 30,
      step: 2,
      range: 3,
    coin: 100,
    description: "слабкий тілом, але володіє потужними закляттями.",
      img: "../../img/units/elf/elfDruid/elfDruid2.jpg",
    abilities: [
    { key: "rage", power: 200},
    { key: "stability", power: 9},
    ],
    effects: [],
    upgrades: upgrades.elves.druit
    },
   {
      name: "єдиноріг",
      hp: 90,
      newhp: 90,
      armor: 5,
      attack: 50,
      step: 5,
      range: 1,
    coin: 100,
    description: "швидкий",
      img: "../../img/units/elf/elfHorse/elfHorse1.jpg",
    abilities: [
    { key: "rage", power: 200},
    { key: "stability", power: 9},
    ],
    effects: [],
    upgrades: upgrades.elves.elfHorse
    
    }
  ];
  
  
  // === ЛЮДИ ===
  let humans = [
  //бійці 1 рівня(біля назви стоїть 1)
    {
      name: "мечник",
      hp: 100,
      newhp: 100,
      armor: 10,
      attack: 45,
      step: 3,
      range: 1,
    coin: 100,
    description: "витривалий боєць із щитом, добре тримає лінію.",
      img: "../../img/units/pipl/piplWarrior/piplWarrior.png",
    abilities: [
    { key: "teleport"},
    { key: "stability", power: 9},
    ],
    effects: [],
    upgrades: upgrades.humans.voin
    
    },
    {
      name: "лучник",
      hp: 80,
      newhp: 80,
      armor: 5,
      attack: 35,
      step: 3,
      range: 3,
    coin: 100,
    description: "повільний, але його болти пробивають броню.",
      img: "../../img/units/pipl/piplArcher/piplArcher1.png",
    abilities: [
    { key: "rage", power: 200},
    { key: "stability", power: 9},
    ],
    effects: [],
    upgrades: upgrades.humans.luchnik
    
    },
   {
      name: "шаман",
      hp: 80,
      newhp: 80,
      armor: 5,
      attack: 35,
      step: 3,
      range: 3,
    coin: 100,
    description: "швидкий",
      img: "../../img/units/pipl/piplShaman/piplShaman1.jpg",
    abilities: [{ key: "rage", power: 200},
    { key: "stability", power: 9},
    ],
    effects: [],
    upgrades: upgrades.humans.shaman
    
    },
    {
      name: "кінь",
      hp: 120,
      newhp: 120,
      armor: 20,
      attack: 60,
      step: 4,
      range: 1,
    coin: 100,
    description: "важкоозброєний, грізний у наступі.",
      img: "../../img/units/pipl/piplHorse/blue/piplHorseBlue.png",
    abilities: [
    { key: "rage", power: 200},
    { key: "stability", power: 9},
    ],
    effects: [],
    upgrades: upgrades.humans.horse 
    
    }
  ];
  
  //console.log(humans[1].img)
  
  
  
  
  // === ЖУКИ ===
  let beetles = [
    {
      name: "ВОЇН",
      hp: 90,
      newhp: 90,
      armor: 10,
      attack: 40,
      step: 3,
      range: 1,
    coin: 100,
    description: "товстий панцир захищає його від більшості атак.",
      img: "../../img/units/beetle/beetleWarrior/beetleWarrior1.png",
    abilities: [
    { key: "rage", power: 200},
    { key: "stability", power: 9},
    ],
    
    
    //накладені ефекти
      effects: [
          {
            name: "Minus Armor",
           bonusType: "armor",
           bonusValue: -33,
           description: "-60 броні",
           duration: 3,// ходів триватиме
        img: "../../img/units/efectUnits/armor/armor2.jpg"
          },
       {
            name: "Minus Armor2",
           bonusType: "armor",
           bonusValue: -10,
           description: "-40 броні",
           duration: 3,// ходів триватиме
        img: "../../img/units/efectUnits/armor/armor2.jpg"
          },   
      ],
      
      // Удосконалення (level-up / апгрейди)
      upgrades: upgrades.beetles.voin
      
      
      
    },
   
    {
      name: "лучник",
      hp: 60,
      newhp: 60,
      armor: 13,
      attack: 35,
      step: 4,
      range: 1,
    coin: 100,
    description: "стріляє отруйними шипами з відстані.",
      img: "../../img/units/beetle/beetleArcher/beetleArcher1.jpg",
    abilities: [
    { key: "rage", power: 200},
    { key: "stability", power: 9},
    ],
    effects: [],
    upgrades: upgrades.beetles.luchnik
    
    },
    {
      name: "маг",
      hp: 80,
      newhp: 80,
      armor: 5,
      attack: 50,
      step: 2,
      range: 3,
    coin: 100,
    description: "сильний",
      img: "../../img/units/beetle/beetleMag/beetleMag1.jpg",
    abilities: [
    { key: "rage", power: 200},
    { key: "stability", power: 9},
    ],
    effects: [],
    upgrades: upgrades.beetles.shaman
    
    },
   {
      name: "кінь",
      hp: 60,
      newhp: 60,
      armor: 0,
      attack: 35,
      step: 4,
      range: 1,
    coin: 100,
    description: "кидається на ворога, жертвуючи захистом заради атаки.",
      img: "../../img/units/beetle/beetleHorse/beetleHorse1.png",
    abilities: [
    { key: "rage", power: 200},
    { key: "stability", power: 9},
    ],
    effects: [],
    upgrades: upgrades.beetles.horse
    
    },
		{
      name: "Пікінер",
      hp: 80,
      newhp: 80,
      armor: 5,
      attack: 50,
      step: 2,
      range: 3,
    coin: 100,
    description: "сильний",
      img: "../../img/units/beetle/beetlePikener/beetlePikenerBlue/beetlePikenerBlue.png",
    abilities: [
    { key: "rage", power: 200},
    { key: "stability", power: 9},
    ],
    effects: [],
    upgrades: upgrades.beetles.shaman
    
    },
  ];
  
  // === ДЕМОНИ ===
  let demons = [
    {
      name: "воїн",
      hp: 90,
      newhp: 90,
      armor: 10,
      attack: 40,
      step: 3,
      range: 1,
    coin: 100,
    description: "міцний та жорстокий, добре тримає бій.",
      img: "../../img/units/demon/demonWarrior/blue/demonWarriorBlue.png",
    abilities: [
    { key: "rage", power: 200},
    { key: "stability", power: 9},
    ],
    effects: [],
    upgrades: upgrades.demons.voin
    
    },
    {
      name: "лучник",
      hp: 60,
      newhp: 60,
      armor: 0,
      attack: 35,
      step: 4,
      range: 1,
    coin: 100,
    description: "дрібний і швидкий, вдаряє зненацька.",
      img: "../../img/units/demon/demonArcher/demonArcher1.jpg",
    abilities: [
    { key: "rage", power: 200},
    { key: "stability", power: 9},
    ],
    effects: [],
    upgrades: upgrades.demons.luchnik
    
    },
    {
      name: "маг",
      hp: 80,
      newhp: 80,
      armor: 5,
      attack: 50,
      step: 2,
      range: 3,
    coin: 100,
    description: "крихкий, але його темна магія нищить ворогів.",
      img: "../../img/units/demon/demonMag/demonMag1.jpg",
    abilities: [
    { key: "rage", power: 200},
    { key: "stability", power: 9},
    ],
    effects: [],
    upgrades: upgrades.demons.shaman
    
    },
   {
      name: "гончі",
      hp: 80,
      newhp: 80,
      armor: 5,
      attack: 50,
      step: 2,
      range: 3,
    coin: 100,
    description: "броньований",
      img: "../../img/units/demon/demonHorse/red/demonHorseRed.png",
    abilities: [
    { key: "rage", power: 200},
    { key: "stability", power: 9},
    ],
    effects: [],
    upgrades: upgrades.demons.horse
    
    },
  ];
  






  
  
  // let races = {
  //  orcs: orcs,
  //  elves: elves,
  //   humans: humans,
  //   undead: beetles,
  //  demons: demons
  // };