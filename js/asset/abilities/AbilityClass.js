// Клас для створення екземплярів здібностей
class Ability {
  constructor(baseAbility, customValues = {}) {
    // Спочатку копіюємо базові властивості зі шаблону
    Object.assign(this, baseAbility);
    
    // 🔧 Якщо є power, використовуємо його для різних типів здібностей
    if (customValues.power !== undefined) {
      // Для лікування
      if (this.actionType === "heal") {
        this.healAmount = customValues.power;
      }
      
      if (this.actionType === "aura") {
        switch (this.type) {
          case "armor":
            this.armorBonus = customValues.power !== undefined ? customValues.power : (this.armorBonus || 0);
            break;
          case "attack":
            this.attackBonus = customValues.power !== undefined ? customValues.power : (this.attackBonus || 0);
            break;
          case "step":
            this.stepBonus = customValues.power !== undefined ? customValues.power : (this.stepBonus || 0);
            break;
          case "hp":
            this.healAmount = customValues.power !== undefined ? customValues.power : (this.healAmount || 0);
            break;
          case "mixed":
            if (typeof customValues.power === 'object') {
              // ✅ ВИПРАВЛЕННЯ: Перевіряємо обидва варіанти - attackBoostPercent та attackBoost
              this.attackBoost = customValues.power.attackBoost || customValues.power.attackBoostPercent || this.attackBoost;
              this.armorBoost = customValues.power.armorBoost || this.armorBoost;
              this.hpRegenPercent = customValues.power.hpRegenPercent || this.hpRegenPercent;
            }
            break;
        }
      }
      
      // Для баффів
      if (this.actionType === "buff") {
        switch (this.type) {
          case "step":
            this.stepBonus = customValues.power;
            break;
          case "attack":
            this.attackBonus = customValues.power;
            break;
          case "armor":
            this.armorBonus = customValues.power;
            break;
        }
      }
      // 🔴 ДОДАТИ: Для дебаффів
      if (this.actionType === "debuff") {
        switch (this.effect) {
          case "armorReduction":
            this.armorReduction = customValues.power;
            break;
          case "attackReduction":
            this.attackReduction = customValues.power;
            break;
        }
      }
      
      // 🔴 ДОДАТИ: Для контролю
      if (this.actionType === "control") {
        switch (this.effect) {
          case "immobilize":
            this.stepReduction = customValues.power || 999;
            break;
        }
      }
    }
    
    // Перезаписуємо інші кастомні значення юніта (крім power, який вже обробили)
    const { power, ...otherCustomValues } = customValues;
    Object.assign(this, otherCustomValues);
            // 🔧 Якщо є power, використовуємо його для різних типів здібностей
            if (customValues.power !== undefined) {
              // Для лікування
              if (this.actionType === "heal") {
                this.healAmount = customValues.power;
              }
              
              // Для аур
              if (this.actionType === "aura") {
                switch (this.type) {
                  case "armor":
                    this.armorBonus = customValues.power;
                    break;
                  case "attack":
                    this.attackBonus = customValues.power;
                    break;
                  case "step":
                    this.stepBonus = customValues.power;
                    break;
                  case "hp":
                    this.healAmount = customValues.power;
                    break;
                    case "mixed":
                      if (typeof customValues.power === 'object') {
                        // ✅ ВИПРАВЛЕННЯ: Перевіряємо обидва варіанти - attackBoostPercent та attackBoost
                        this.attackBoost = customValues.power.attackBoost || customValues.power.attackBoostPercent || this.attackBoost;
                        this.armorBoost = customValues.power.armorBoost || this.armorBoost;
                        this.hpRegenPercent = customValues.power.hpRegenPercent || this.hpRegenPercent;
                      }
                    break;
                }
              }
              
              // Для баффів
              if (this.actionType === "buff") {
                switch (this.type) {
                  case "step":
                    this.stepBonus = customValues.power;
                    break;
                  case "attack":
                    this.attackBonus = customValues.power;
                    break;
                  case "armor":
                    this.armorBonus = customValues.power;
                    break;
                }
              }
              // 🔴 ДОДАТИ: Для дебаффів
              if (this.actionType === "debuff") {
                switch (this.effect) {
                  case "armorReduction":
                    this.armorReduction = customValues.power;
                    break;
                  case "attackReduction":
                    this.attackReduction = customValues.power;
                    break;
                }
              }
              
              // 🔴 ДОДАТИ: Для контролю
              if (this.actionType === "control") {
                switch (this.effect) {
                  case "immobilize":
                    this.stepReduction = customValues.power || 999;
                    break;
                }
              }
            }
      
      // Ініціалізуємо cooldown
      this.currentCooldown = 0;
    }
  
    // Допоміжний метод для розрахунку відстані (Манхеттенська відстань)
    calculateDistance(unit1, unit2) {
      return Math.abs(unit1.x - unit2.x) + Math.abs(unit1.y - unit2.y);
    }
  
    // Метод для застосування активного лікування союзника
    applyAllyHeal(caster, target) {
      if (this.actionType !== "heal" || this.mode !== "active") {
        return { success: false, message: "Це не здібність лікування" };
      }
  
      // Перевірка чи ціль - союзник
      if (target.playerIndex !== caster.playerIndex) {
        return { success: false, message: "Можна лікувати тільки союзників" };
      }
  
      // Перевірка відстані
      const distance = this.calculateDistance(caster, target);
      if (distance > this.range) {
        return { success: false, message: `Ціль занадто далеко (відстань: ${distance}, макс: ${this.range})` };
        
      }
  
      // Перевірка чи ціль потребує лікування
// ✅ ВИПРАВЛЕНО: Перевіряємо newhp або hp
const currentHp = target.newhp ?? target.hp;
if (currentHp >= target.maxHp) {
  return { success: false, message: "Ціль має повне здоров'я" };
}

// Перевірка cooldown (якщо є)
if (this.currentCooldown && this.currentCooldown > 0) {
  return { success: false, message: `Перезарядка: ${this.currentCooldown} ходів` };
}

// Визначаємо скільки лікувати
let healAmount = this.healAmount || 50;

// Якщо є healPercent, використовуємо його
if (this.healPercent) {
  const maxHp = target.maxHp || target.hp || 100; // Запасний варіант
  healAmount = Math.floor(maxHp * (this.healPercent / 100));
}

console.log("🔍 DEBUG target:", target);
console.log("🔍 DEBUG target.hp:", target.hp);
console.log("🔍 DEBUG target.maxHp:", target.maxHp);
console.log("🔍 DEBUG target.newhp:", target.newhp);
console.log("🔍 DEBUG healAmount:", healAmount);
console.log("🔍 DEBUG this.healAmount:", this.healAmount);

// ✅ ВИПРАВЛЕНО: Ініціалізуємо newhp якщо його немає
if (typeof target.newhp === 'undefined' || target.newhp === null) {
  target.newhp = target.hp;
}

const oldHp = target.newhp;
const maxHp = target.maxHp || target.hp || 100; // Запасний варіант
target.newhp = Math.min(target.newhp + healAmount, maxHp);
const actualHeal = target.newhp - oldHp;
  
      // Встановлюємо cooldown
      this.currentCooldown = this.cooldown || 0;
  
      console.log(`💚 ${caster.name} вилікував ${target.name} на ${actualHeal} HP`);
  
      return {
        success: true,
        message: `Вилікувано ${actualHeal} HP`,
        healedAmount: actualHeal,
        target: target
      };
    }

      // Метод для застосування активних баффів (прискорення, посилення атаки тощо)
  applyBuff(caster, target) {
    if (this.actionType !== "buff" || this.mode !== "active") {
      return { success: false, message: "Це не баф здібність" };
    }

    // Перевірка чи ціль - союзник (для баффів типу hasteAlly)
    if (this.targets === "ally" && target.playerIndex !== caster.playerIndex) {
      return { success: false, message: "Можна накласти баф тільки на союзника" };
    }

    // Перевірка відстані
    const distance = this.calculateDistance(caster, target);
    if (distance > this.range) {
      return { success: false, message: `Ціль занадто далеко (відстань: ${distance}, макс: ${this.range})` };
    }

    // Перевірка cooldown
    if (this.currentCooldown && this.currentCooldown > 0) {
      return { success: false, message: `Перезарядка: ${this.currentCooldown} ходів` };
    }

    // Створюємо ефект бафу
    const effect = this.createBuffEffect(caster);
    this.addTemporaryEffect(target, effect);

    // Встановлюємо cooldown
    this.currentCooldown = this.cooldown || 0;

    console.log(`✨ ${caster.name} наклав "${this.name}" на ${target.name}`);

    return {
      success: true,
      message: `Баф "${this.name}" накладено`,
      target: target,
      effect: effect
    };
  }

  // Додати після методу applyBuff (після рядка 164)

// Метод для застосування контрольних ефектів (знерухомлення, оглушення)
applyControl(caster, target) {
  if (this.actionType !== "control" || this.mode !== "active") {
    return { success: false, message: "Це не контрольна здібність" };
  }

  // Перевірка чи ціль - ворог
  if (target.playerIndex === caster.playerIndex) {
    return { success: false, message: "Можна застосувати тільки на ворога" };
  }

  // Перевірка відстані
  const distance = this.calculateDistance(caster, target);
  if (distance > this.range) {
    return { success: false, message: `Ціль занадто далеко (відстань: ${distance}, макс: ${this.range})` };
  }

  // Перевірка cooldown
  if (this.currentCooldown && this.currentCooldown > 0) {
    return { success: false, message: `Перезарядка: ${this.currentCooldown} ходів` };
  }

  // Створюємо ефект контролю
  const effect = this.createControlEffect(caster);
  this.addTemporaryEffect(target, effect);

  // Встановлюємо cooldown
  this.currentCooldown = this.cooldown || 0;

  console.log(`🌿 ${caster.name} застосував "${this.name}" на ${target.name}`);

  return {
    success: true,
    message: `"${this.name}" накладено на ціль`,
    target: target,
    effect: effect
  };
}

// Метод для застосування дебаффів (зниження броні, атаки)
applyDebuff(caster, target) {
  if (this.actionType !== "debuff" || this.mode !== "active") {
    return { success: false, message: "Це не дебафф здібність" };
  }

  // Перевірка чи ціль - ворог
  if (target.playerIndex === caster.playerIndex) {
    return { success: false, message: "Можна застосувати тільки на ворога" };
  }

  // Перевірка відстані
  const distance = this.calculateDistance(caster, target);
  if (distance > this.range) {
    return { success: false, message: `Ціль занадто далеко (відстань: ${distance}, макс: ${this.range})` };
  }

  // Перевірка cooldown
  if (this.currentCooldown && this.currentCooldown > 0) {
    return { success: false, message: `Перезарядка: ${this.currentCooldown} ходів` };
  }

  // Створюємо ефект дебафу
  const effect = this.createDebuffEffect(caster);
  this.addTemporaryEffect(target, effect);

  // Встановлюємо cooldown
  this.currentCooldown = this.cooldown || 0;

  console.log(`💀 ${caster.name} наклав дебафф "${this.name}" на ${target.name}`);

  return {
    success: true,
    message: `Дебафф "${this.name}" накладено`,
    target: target,
    effect: effect
  };
}
    applyAura(caster, unitsOnMap) {
      if (this.actionType !== "aura" || this.mode !== "passive") {
        return { success: false, message: "Це не аура" };
      }
      // console.log('🔍 DEBUG supportAura ability:', {
      //   name: this.name,
      //   attackBoostPercent: this.attackBoostPercent,
      //   armorBoost: this.armorBoost,
      //   hpRegenPercent: this.hpRegenPercent,
      //   radius: this.radius,
      //   targets: this.targets,
      //   type: this.type
      // });
      const affectedUnits = [];
      
      // Знаходимо сусідів в радіусі
      const neighbors = this.findUnitsInRadius(caster, unitsOnMap, this.radius);
      console.log(`🔍 АУРА "${this.name}" від ${caster.name}:`, {
        radius: this.radius,
        targets: this.targets,
        casterPosition: `(${caster.x},${caster.y})`,
        totalUnits: unitsOnMap.length,
        neighbors: neighbors.length,
        neighborNames: neighbors.map(u => u.name),
        casterAbilities: caster.abilities, // Додати
        casterAbilityInstances: caster.abilityInstances // Додати
    });
      // Фільтруємо за типом цілей
      const validTargets = neighbors.filter(unit => {
        if (this.targets === "allies") {
          return unit.playerIndex === caster.playerIndex && unit.id !== caster.id;
        }
        if (this.targets === "enemies") {
          return unit.playerIndex !== caster.playerIndex;
        }
        return false;
      });
      
      // Застосовуємо ефект залежно від типу аури
      validTargets.forEach(target => {
        const effect = this.createAuraEffect(caster);
        this.addTemporaryEffect(target, effect);
        affectedUnits.push(target);
                // ДОДАЄМО ПІДСВІТКУ - НОВИЙ КОД
                this.highlightUnitWithAura(target);
      });
      
      console.log(`✨ ${this.name}: ${caster.name} вплинув на ${affectedUnits.length} юнітів`);
      
      return {
        success: true,
        message: `Аура вплинула на ${affectedUnits.length} юнітів`,
        affectedUnits: affectedUnits
      };
    }
    

           // Підсвітити юніта аурою
    highlightUnitWithAura(unit) {
      console.log(`🎯 Спроба підсвітити юніта: ${unit.name} на позиції (${unit.x}, ${unit.y})`);
      
      // Спробуємо знайти за data-unit-id
      const unitElement = document.querySelector(`[data-unit-id="${unit.id}"]`);
      
      if (!unitElement) {
        // Якщо немає data-unit-id, шукаємо wrapper на позиції
        const unitWrappers = document.querySelectorAll('.unit-wrapper');
        
        unitWrappers.forEach(wrapper => {
          const wrapperX = parseInt(wrapper.style.left) / cellSizeAll;
          const wrapperY = parseInt(wrapper.style.top) / cellSizeAll;
          
          if (Math.abs(wrapperX - unit.x) < 0.1 && Math.abs(wrapperY - unit.y) < 0.1) {
            unitElement = wrapper;
          }
        });
      }
      
      if (unitElement) {
        // Знаходимо зображення всередині
        const unitImg = unitElement.querySelector('img') || unitElement;
        
        // Додаємо клас підсвітки
        unitImg.classList.add('aura-highlight');
        console.log(`✅ Додано клас aura-highlight для ${unit.name}`);
        
        // Видаляємо клас через 1 секунду
        setTimeout(() => {
          unitImg.classList.remove('aura-highlight');
        }, 1000);
      } else {
        console.log(`❌ Не знайдено елемент для юніта ${unit.name}`);
      }
    }
    
            // Знайти юнітів в радіусі
    findUnitsInRadius(centerUnit, unitsOnMap, radius) {
      const result = [];
      
      // Генеруємо всі можливі позиції
      for (let dx = -radius; dx <= radius; dx++) {
        for (let dy = -radius; dy <= radius; dy++) {
          // Пропускаємо центральну клітинку
          if (dx === 0 && dy === 0) continue;
          
          // Манхеттенська відстань
          const manhattanDistance = Math.abs(dx) + Math.abs(dy);
          
          // Максимальна діагональна складова
          const maxDiagonal = Math.min(Math.abs(dx), Math.abs(dy));
          
          // Умова: загальна відстань ≤ radius І діагональ ≤ 1
          if (manhattanDistance <= radius && maxDiagonal <= 1) {
            // Знаходимо юніта на цій позиції
            const targetX = centerUnit.x + dx;
            const targetY = centerUnit.y + dy;
            
            const targetUnit = unitsOnMap.find(u => 
              u.x === targetX && u.y === targetY
            );
            
            if (targetUnit) {
              result.push(targetUnit);
            }
          }
        }
      }
      
      return result;
    }
    
    // Створити ефект аури залежно від типу
    createAuraEffect(source) {
      const activePlayers = window.players ? window.players.length : 4;
      const effect = {
        source: source.id,
        sourceKey: source.baseUnitKey || `${source.race}:${source.role}`, // НОВЕ ПОЛЕ
        sourceName: source.name,
        abilityName: this.name,
        duration: 1,
        type: this.type,
        appliedByPlayer: source.playerIndex
      };
      
      // Додаємо конкретні значення залежно від типу
      switch (this.type) {
        case "armor":
          effect.armorBonus = this.armorBonus || this.power || 0;  // ← Спочатку armorBonus, потім power!
          break;
        case "attack":
          effect.attackBonus = this.attackBonus || this.power || 0; // ← Спочатку attackBonus, потім power!
          break;
        case "step":
          effect.stepBonus = this.stepBonus || this.power || 0;     // ← Спочатку stepBonus, потім power!
          break;
        case "hp":
          effect.healAmount = this.healAmount || this.power || 0;   // ← Спочатку healAmount, потім power!
          break;
        case "mixed":
          effect.attackBoost = this.attackBoost || 0;
          effect.armorBoost = this.armorBoost || 0;
          effect.hpRegenPercent = this.hpRegenPercent || 0;
          break;
      }
      
      return effect;
    }

      // Створити ефект бафу
      createBuffEffect(source) {
        const effect = {
          source: source.id,
          sourceKey: source.baseUnitKey || `${source.race}:${source.role}`, // НОВЕ ПОЛЕ
          sourceName: source.name,
          abilityName: this.name,
          duration: this.duration || 1,
          appliedByPlayerIndex: source.playerIndex,
          type: this.type
        };
        
        // 🔴 ДОДАТИ: Розраховуємо expiresOnRound
        if (window.currentRound !== undefined) {
          effect.expiresOnRound = window.currentRound + (this.duration || 1);
        }
    
    // Додаємо конкретні значення залежно від типу бафу
    switch (this.type) {
      case "step":
        effect.stepBonus = this.stepBonus || 0;
        break;
      case "attack":
        effect.attackBonus = this.attackBonus || 0;
        break;
      case "armor":
        effect.armorBonus = this.armorBonus || 0;
        break;
    }
    
    return effect;
  }
  // Створити ефект контролю
// Знайдіть функцію createControlEffect (рядки 459-482) і додайте expiresOnRound:

createControlEffect(source) {
  const activePlayers = window.players ? window.players.length : 4;
  
  const effect = {
    source: source.id,
    sourceKey: source.baseUnitKey || `${source.race}:${source.role}`, // НОВЕ ПОЛЕ
    sourceName: source.name,
    abilityName: this.name,
    duration: this.duration || 1,
    appliedByPlayerIndex: source.playerIndex,
    type: "control",
    effectType: this.effect
  };
  
  // 🔴 ДОДАТИ: Розраховуємо expiresOnRound
  if (window.currentRound !== undefined) {
    effect.expiresOnRound = window.currentRound + (this.duration || 1);
  }
  
  // Додаємо конкретні значення залежно від типу контролю
  if (this.effect === "immobilize") {
    effect.stepReduction = this.stepReduction || 999;
  } else if (this.effect === "disarm") {
    effect.canAttack = false;
    effect.attackReduction = 999; // Зменшуємо атаку до 0
  }
  
  return effect;
}

    // Створити ефект дебафу
    createDebuffEffect(source) {
      const activePlayers = window.players ? window.players.length : 4;
      
      const effect = {
        source: source.id,
        sourceKey: source.baseUnitKey || `${source.race}:${source.role}`, // НОВЕ ПОЛЕ
        sourceName: source.name,
        abilityName: this.name,
        duration: this.duration || 1,
        type: "debuff",
        effectType: this.effect,
    appliedByPlayerIndex: source.playerIndex,
      };
      
      // 🔴 ДОДАТИ: Розраховуємо expiresOnRound
      if (window.currentRound !== undefined) {
        effect.expiresOnRound = window.currentRound + (this.duration || 1);
      }
      
      // Додаємо конкретні значення залежно від типу дебафу
      switch (this.effect) {
        case "armorReduction":
          effect.armorReduction = this.armorReduction || 0;
          break;
        case "attackReduction":
          effect.attackReduction = this.attackReduction || 0;
          break;
      }
      
      return effect;
    }
  
    
    // Додати тимчасовий ефект юніту
   
    addTemporaryEffect(unit, effect) {
      if (!unit.activeEffects) {
          unit.activeEffects = [];
      }
      
      // Перевіряємо чи вже є такий ефект за sourceKey або source
      const alreadyHasEffect = unit.activeEffects.some(existingEffect => 
          existingEffect.abilityName === effect.abilityName && 
          (existingEffect.source === effect.source || existingEffect.sourceKey === effect.sourceKey)
      );
      
      if (alreadyHasEffect) {
          console.log(`⏭️ ${unit.name} вже має ефект "${effect.abilityName}" від юніта ${effect.source}`);
          return;
      }
      
      // Додаємо ефект
      unit.activeEffects.push(effect);
      console.log(`✨ ${unit.name} отримав ефект "${effect.abilityName}"`);
      
      // Перераховуємо стати
      if (window.recalcUnitStats) {
          window.recalcUnitStats(unit);
      } else {
          console.error('❌ recalcUnitStats не знайдено!');
      }
      
      // Показуємо візуальний ефект
      this.highlightUnitWithAura(unit);
    }
}

// Експортуємо клас глобально
window.Ability = Ability;