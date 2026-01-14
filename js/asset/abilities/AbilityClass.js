// Клас для створення екземплярів здібностей
class Ability {
    constructor(baseAbility, customValues = {}) {
      // Копіюємо базові властивості зі шаблону
      Object.assign(this, baseAbility);
      
      // Перезаписуємо кастомними значеннями юніта
      Object.assign(this, customValues);
      
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
    sourceName: source.name,
    abilityName: this.name,
    // duration: activePlayers,
    duration: 1,
    type: this.type,
    appliedByPlayer: source.playerIndex  // ⬅️ ДОДАТИ: зберігаємо хто застосував
  };
  
  // Додаємо конкретні значення залежно від типу
  switch (this.type) {
    case "armor":
      effect.armorBonus = this.armorBonus || 0;
      break;
    case "attack":
      effect.attackBonus = this.attackBonus || 0;
      break;
    case "step":
      effect.stepBonus = this.stepBonus || 0;
      break;
    case "hp":
      effect.healAmount = this.healAmount || 0;
      break;
      case "mixed":
        effect.attackBoost = this.attackBoost || 0;      // ← Було attackBoostPercent
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
          sourceName: source.name,
          abilityName: this.name,
          duration: this.duration || 1,
          appliedByPlayerIndex: source.playerIndex, // 🔴 ДОДАТИ: Хто наклав ефект
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
    sourceName: source.name,
    abilityName: this.name,
    duration: this.duration || 1, // Тривалість в ходах
    appliedByPlayerIndex: source.playerIndex, // Хто наклав ефект
    type: "control",
    effectType: this.effect  // immobilize, stun, etc.
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
        sourceName: source.name,
        abilityName: this.name,
        duration: this.duration || 1,
        type: "debuff",
        effectType: this.effect,
    appliedByPlayerIndex: source.playerIndex, // 🔴 ДОДАТИ: Хто наклав ефект
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
      
      unit.activeEffects.push(effect);
      
      // Одразу застосовуємо ефект
      // Одразу застосовуємо ефект
switch (effect.type) {
  case "armor":
    unit.armor = (unit.armor || 0) + effect.armorBonus;
    console.log(`🛡️ ${unit.name} отримав +${effect.armorBonus} броні від "${effect.abilityName}"`);
    this.showAuraEffect(unit, 'armor');  // 🆕 ДОДАТИ ЦЕЙ РЯДОК
    break;
  case "attack":
    unit.attack = (unit.attack || 0) + effect.attackBonus;
    console.log(`⚔️ ${unit.name} отримав +${effect.attackBonus} атаки від "${effect.abilityName}"`);
    this.showAuraEffect(unit, 'attack');  // 🆕 ДОДАТИ ЦЕЙ РЯДОК
    break;
  case "step":
    unit.step = (unit.step || 0) + effect.stepBonus;
    console.log(`👟 ${unit.name} отримав +${effect.stepBonus} кроків від "${effect.abilityName}"`);
    this.showAuraEffect(unit, 'step');  // 🆕 ДОДАТИ ЦЕЙ РЯДОК
    break;
  case "hp":
    const oldHp = unit.newhp || unit.hp;
    unit.newhp = Math.min(oldHp + effect.healAmount, unit.maxHp);
    console.log(`💚 ${unit.name} вилікувався на ${effect.healAmount} HP від "${effect.abilityName}"`);
    if (typeof window.updateUnitHealthBar === 'function') {
      window.updateUnitHealthBar(unit);
    }
    this.showAuraEffect(unit, 'hp');  // 🆕 ДОДАТИ ЦЕЙ РЯДОК
    break;

    case "mixed":
    // 1. ФІКСОВАНИЙ бонус до атаки (не відсоток!)
    if (effect.attackBoost && effect.attackBoost > 0) {
        unit.attack = (unit.attack || 0) + effect.attackBoost;
        console.log(`⚔️ ${unit.name} отримав +${effect.attackBoost} атаки від "${effect.abilityName}"`);
    }
    
    // 2. Фіксований бонус до броні (залишається як є)
    if (effect.armorBoost && effect.armorBoost > 0) {
        unit.armor = (unit.armor || 0) + effect.armorBoost;
        console.log(`🛡️ ${unit.name} отримав +${effect.armorBoost} броні від "${effect.abilityName}"`);
    }
    
    // 3. Відсотковий реген HP (залишається як є)
    if (effect.hpRegenPercent && effect.hpRegenPercent > 0) {
        const maxHp = unit.maxHp || unit.hp;
        const healAmount = Math.floor(maxHp * (effect.hpRegenPercent / 100));
        const currentHp = unit.newhp ?? unit.hp;
        unit.newhp = Math.min(currentHp + healAmount, maxHp);
        console.log(`💚 ${unit.name} відновив ${healAmount} HP (${effect.hpRegenPercent}%) від "${effect.abilityName}"`);
        if (typeof window.updateUnitHealthBar === 'function') {
            window.updateUnitHealthBar(unit);
        }
    }
    
    this.showAuraEffect(unit, 'mixed');
    break;


    case "control":
      if (effect.effectType === "immobilize") {
        if (!unit.originalStep) {
          unit.originalStep = unit.step;
        }
        unit.step = Math.max(0, unit.step - effect.stepReduction);
        console.log(`🌿 ${unit.name} знерухомлено! Крок: ${unit.step}`);
        this.showAuraEffect(unit, 'control');
      } else if (effect.effectType === "disarm") {
        // 🔴 ВИПРАВЛЕНО: Зберігаємо originalAttack та встановлюємо canAttack = false
        if (!unit.originalAttack) {
            unit.originalAttack = unit.attack;
        }
        // 🔴 ДОДАТИ: Зберігаємо originalRange
        if (!unit.originalRange) {
            unit.originalRange = unit.range;
        }
        
        unit.attack = 0;
        unit.range = 0; // 🔴 ДОДАТИ: Встановлюємо дальність в 0
        unit.canAttack = false; // 🔴 ДОДАТИ: блокуємо можливість атакувати
        console.log(`🔒 ${unit.name} в наручниках! Атака: 0 (було: ${unit.originalAttack}), Дальність: 0 (було: ${unit.originalRange}), canAttack: false`);
        this.showAuraEffect(unit, 'disarm');
    }
      break;
      case "debuff":
        if (effect.effectType === "armorReduction") {
          if (!unit.originalArmor) {
            unit.originalArmor = unit.armor || 0;
          }
          unit.armor = Math.max(0, (unit.armor || 0) - effect.armorReduction);
          console.log(`🔻 ${unit.name} втратив ${effect.armorReduction} броні від "${effect.abilityName}" (було: ${unit.originalArmor}, стало: ${unit.armor})`);
          this.showAuraEffect(unit, 'debuff-armor');
        } else if (effect.effectType === "attackReduction") {
          if (!unit.originalAttack) {
            unit.originalAttack = unit.attack || 0;
          }
          unit.attack = Math.max(0, (unit.attack || 0) - effect.attackReduction);
          console.log(`🔻 ${unit.name} втратив ${effect.attackReduction} атаки від "${effect.abilityName}" (було: ${unit.originalAttack}, стало: ${unit.attack})`);
          this.showAuraEffect(unit, 'debuff-attack');
        }
        break;
}
    }
    showAuraEffect(unit, effectType) {
      // Знаходимо візуальний елемент юніта
      const wrapper = document.querySelector(`.unit-wrapper[data-unit-id="${unit.id}"]`);
      if (!wrapper) {
        console.warn(`⚠️ Wrapper для юніта ${unit.name} не знайдено`);
        return;
      }
      
      // Додаємо клас для анімації
      const className = `aura-effect-${effectType}`;
      wrapper.classList.add(className);
      
      // Видаляємо клас через 1.5 секунди
      setTimeout(() => {
        wrapper.classList.remove(className);
      }, 1500);
      
      console.log(`✨ Візуальний ефект "${effectType}" показано для ${unit.name}`);
    }
  }
  
  // Фабрика для створення здібностей юніта
  class AbilityFactory {
    static createAbilities(unit) {
      if (!unit.abilities || !Array.isArray(unit.abilities)) {
        return [];
      }
  
      return unit.abilities.map(abilityData => {
        const baseAbility = abilities[abilityData.key];
        
        if (!baseAbility) {
          console.warn(`Ability "${abilityData.key}" not found in abilities template`);
          return null;
        }
  
        return new Ability(baseAbility, abilityData);
      }).filter(ability => ability !== null);
    }
  }
  
  // Додаємо до window для глобального доступу
  window.Ability = Ability;
  window.AbilityFactory = AbilityFactory;