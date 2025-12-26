
let savedUpgrades = localStorage.getItem("playersUpgrades");
if (savedUpgrades) {
    window.playersUpgrades = JSON.parse(savedUpgrades);
    // console.log("Loaded saved upgrades from localStorage");
} else {

// копія масиву з активними ефектами, їх тут нада буде активувать.
window.playersUpgrades = [
    {
      name: "Player 1",
      upgrades: {                  
        orcs: {         // ключ — раса
          rubak: JSON.parse(JSON.stringify(upgrades.orcs.rubak)),
          luchnik: JSON.parse(JSON.stringify(upgrades.orcs.luchnik)),
          shaman: JSON.parse(JSON.stringify(upgrades.orcs.Shaman)),
          wolf: JSON.parse(JSON.stringify(upgrades.orcs.Wolf))
        
    },
    //ельфи
    elves: {         // ключ — раса
          voin: JSON.parse(JSON.stringify(upgrades.elves.voin)),
          luchnik: JSON.parse(JSON.stringify(upgrades.elves.luchnik)),
          druit: JSON.parse(JSON.stringify(upgrades.elves.druit)),
          elfHorse: JSON.parse(JSON.stringify(upgrades.elves.elfHorse))
        
    },
   //люди
    humans: {         // ключ — раса
          voin: JSON.parse(JSON.stringify(upgrades.humans.voin)),
          luchnik: JSON.parse(JSON.stringify(upgrades.humans.luchnik)),
          shaman: JSON.parse(JSON.stringify(upgrades.humans.shaman)),
          horse: JSON.parse(JSON.stringify(upgrades.humans.horse))
    },
    // жуки
    undead: {         // ключ — раса
          voin: JSON.parse(JSON.stringify(upgrades.beetles.voin)),
          luchnik: JSON.parse(JSON.stringify(upgrades.beetles.luchnik)),
          shaman: JSON.parse(JSON.stringify(upgrades.beetles.shaman)),
          horse: JSON.parse(JSON.stringify(upgrades.beetles.horse))
        },
        // жуки
        demons: {         
            voin: JSON.parse(JSON.stringify(upgrades.demons.voin)),
            luchnik: JSON.parse(JSON.stringify(upgrades.demons.luchnik)),
            shaman: JSON.parse(JSON.stringify(upgrades.demons.shaman)),
            horse: JSON.parse(JSON.stringify(upgrades.demons.horse))
          }
      }
    },
    {
      name: "Player 2",
      upgrades: {                  
        orcs: {         // ключ — раса
          rubak: JSON.parse(JSON.stringify(upgrades.orcs.rubak)),
          luchnik: JSON.parse(JSON.stringify(upgrades.orcs.luchnik)),
          shaman: JSON.parse(JSON.stringify(upgrades.orcs.Shaman)),
          wolf: JSON.parse(JSON.stringify(upgrades.orcs.Wolf))
        
    },
    //ельфи
    elves: {         // ключ — раса
          voin: JSON.parse(JSON.stringify(upgrades.elves.voin)),
          luchnik: JSON.parse(JSON.stringify(upgrades.elves.luchnik)),
          druit: JSON.parse(JSON.stringify(upgrades.elves.druit)),
          elfHorse: JSON.parse(JSON.stringify(upgrades.elves.elfHorse))
        
    },
   //люди
    humans: {         // ключ — раса
          voin: JSON.parse(JSON.stringify(upgrades.humans.voin)),
          luchnik: JSON.parse(JSON.stringify(upgrades.humans.luchnik)),
          shaman: JSON.parse(JSON.stringify(upgrades.humans.shaman)),
          horse: JSON.parse(JSON.stringify(upgrades.humans.horse))
    },
    // жуки
    undead: {         // ключ — раса
          voin: JSON.parse(JSON.stringify(upgrades.beetles.voin)),
          luchnik: JSON.parse(JSON.stringify(upgrades.beetles.luchnik)),
          shaman: JSON.parse(JSON.stringify(upgrades.beetles.shaman)),
          horse: JSON.parse(JSON.stringify(upgrades.beetles.horse))
        },
        demons: {         
            voin: JSON.parse(JSON.stringify(upgrades.demons.voin)),
            luchnik: JSON.parse(JSON.stringify(upgrades.demons.luchnik)),
            shaman: JSON.parse(JSON.stringify(upgrades.demons.shaman)),
            horse: JSON.parse(JSON.stringify(upgrades.demons.horse))
          },
      }
    },
    {
      name: "Player 3",
      upgrades: {                  
        orcs: {         // ключ — раса
          rubak: JSON.parse(JSON.stringify(upgrades.orcs.rubak)),
          luchnik: JSON.parse(JSON.stringify(upgrades.orcs.luchnik)),
          shaman: JSON.parse(JSON.stringify(upgrades.orcs.Shaman)),
          wolf: JSON.parse(JSON.stringify(upgrades.orcs.Wolf))
        
    },
    //ельфи
    elves: {         // ключ — раса
          voin: JSON.parse(JSON.stringify(upgrades.elves.voin)),
          luchnik: JSON.parse(JSON.stringify(upgrades.elves.luchnik)),
          druit: JSON.parse(JSON.stringify(upgrades.elves.druit)),
          elfHorse: JSON.parse(JSON.stringify(upgrades.elves.elfHorse))
        
    },
   //люди
    humans: {         // ключ — раса
          voin: JSON.parse(JSON.stringify(upgrades.humans.voin)),
          luchnik: JSON.parse(JSON.stringify(upgrades.humans.luchnik)),
          shaman: JSON.parse(JSON.stringify(upgrades.humans.shaman)),
          horse: JSON.parse(JSON.stringify(upgrades.humans.horse))
    },
    // жуки
    undead: {         // ключ — раса
          voin: JSON.parse(JSON.stringify(upgrades.beetles.voin)),
          luchnik: JSON.parse(JSON.stringify(upgrades.beetles.luchnik)),
          shaman: JSON.parse(JSON.stringify(upgrades.beetles.shaman)),
          horse: JSON.parse(JSON.stringify(upgrades.beetles.horse))
        },
        demons: {         
            voin: JSON.parse(JSON.stringify(upgrades.demons.voin)),
            luchnik: JSON.parse(JSON.stringify(upgrades.demons.luchnik)),
            shaman: JSON.parse(JSON.stringify(upgrades.demons.shaman)),
            horse: JSON.parse(JSON.stringify(upgrades.demons.horse))
          }
      }
    },
    {
      name: "Player 4",
      upgrades: {                  
        orcs: {         // ключ — раса
          rubak: JSON.parse(JSON.stringify(upgrades.orcs.rubak)),
          luchnik: JSON.parse(JSON.stringify(upgrades.orcs.luchnik)),
          shaman: JSON.parse(JSON.stringify(upgrades.orcs.Shaman)),
          wolf: JSON.parse(JSON.stringify(upgrades.orcs.Wolf))
        
    },
    //ельфи
    elves: {         // ключ — раса
          voin: JSON.parse(JSON.stringify(upgrades.elves.voin)),
          luchnik: JSON.parse(JSON.stringify(upgrades.elves.luchnik)),
          druit: JSON.parse(JSON.stringify(upgrades.elves.druit)),
          elfHorse: JSON.parse(JSON.stringify(upgrades.elves.elfHorse))
        
    },
   //люди
    humans: {         // ключ — раса
          voin: JSON.parse(JSON.stringify(upgrades.humans.voin)),
          luchnik: JSON.parse(JSON.stringify(upgrades.humans.luchnik)),
          shaman: JSON.parse(JSON.stringify(upgrades.humans.shaman)),
          horse: JSON.parse(JSON.stringify(upgrades.humans.horse))
    },
    // жуки
    undead: {         // ключ — раса
          voin: JSON.parse(JSON.stringify(upgrades.beetles.voin)),
          luchnik: JSON.parse(JSON.stringify(upgrades.beetles.luchnik)),
          shaman: JSON.parse(JSON.stringify(upgrades.beetles.shaman)),
          horse: JSON.parse(JSON.stringify(upgrades.beetles.horse))
        },
        demons: {         
            voin: JSON.parse(JSON.stringify(upgrades.demons.voin)),
            luchnik: JSON.parse(JSON.stringify(upgrades.demons.luchnik)),
            shaman: JSON.parse(JSON.stringify(upgrades.demons.shaman)),
            horse: JSON.parse(JSON.stringify(upgrades.demons.horse))
          }
      }
    }
  ];
}
  // console.log(playersUpgrades[3].upgrades.beetles.voin[2]);