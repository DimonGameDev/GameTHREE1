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
                      this.attackBoostPercent = customValues.power.attackBoostPercent || this.attackBoostPercent;
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
  healAmount = Math.floor(target.maxHp * (this.healPercent / 100));
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
target.newhp = Math.min(target.newhp + healAmount, target.maxHp);
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
      });
      
      console.log(`✨ ${this.name}: ${caster.name} вплинув на ${affectedUnits.length} юнітів`);
      
      return {
        success: true,
        message: `Аура вплинула на ${affectedUnits.length} юнітів`,
        affectedUnits: affectedUnits
      };
    }
    
    // Знайти юнітів в радіусі
    findUnitsInRadius(centerUnit, unitsOnMap, radius) {
      const result = [];
      
      // Генеруємо всі можливі позиції в радіусі
      for (let dx = -radius; dx <= radius; dx++) {
        for (let dy = -radius; dy <= radius; dy++) {
          // Пропускаємо центральну клітинку (сам юніт)
          if (dx === 0 && dy === 0) continue;
          
          // Для radius=1 це буде 8 сусідніх клітинок
          const targetX = centerUnit.x + dx;
          const targetY = centerUnit.y + dy;
          
          const unit = unitsOnMap.find(u => u.x === targetX && u.y === targetY);
          if (unit) {
            result.push(unit);
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
    duration: activePlayers,
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
    case "mixed":  // ⬅️ ДОДАТИ ЦЕЙ БЛОК
      effect.attackBoostPercent = this.attackBoostPercent || 0;
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
      type: this.type
    };
    
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
  // Створити ефект контролю
createControlEffect(source) {
  const activePlayers = window.players ? window.players.length : 4; // 🔴 ДОДАТИ
  
  const effect = {
    source: source.id,
    sourceName: source.name,
    abilityName: this.name,
    duration: this.duration ? this.duration * activePlayers : activePlayers, // 🔴 ЗМІНИТИ
    type: "control",
    effectType: this.effect  // immobilize, stun, etc.
  };
  
  // Додаємо конкретні значення залежно від типу контролю
  if (this.effect === "immobilize") {
    effect.stepReduction = this.stepReduction || 999;
  } else if (this.effect === "disarm") {  // 🔴 ДОДАТИ
    effect.canAttack = false;
  }
  
  return effect;
}

  // Створити ефект дебафу
  createDebuffEffect(source) {
    const activePlayers = window.players ? window.players.length : 4; // 🔴 ДОДАТИ ЦЕЙ РЯДОК
    
    const effect = {
      source: source.id,
      sourceName: source.name,
      abilityName: this.name,
      duration: this.duration ? this.duration * activePlayers : activePlayers, // 🔴 ЗМІНИТИ ЦЕЙ РЯДОК
      type: "debuff",
      effectType: this.effect
    };
    
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
      // 1. Відсотковий бонус до атаки
      if (effect.attackBoostPercent && effect.attackBoostPercent > 0) {
        const attackBonus = Math.floor((unit.attack || 0) * (effect.attackBoostPercent / 100));
        unit.attack = (unit.attack || 0) + attackBonus;
        console.log(`⚔️ ${unit.name} отримав +${effect.attackBoostPercent}% атаки (${attackBonus}) від "${effect.abilityName}"`);
      }
      
      // 2. Фіксований бонус до броні
      if (effect.armorBoost && effect.armorBoost > 0) {
        unit.armor = (unit.armor || 0) + effect.armorBoost;
        console.log(`🛡️ ${unit.name} отримав +${effect.armorBoost} броні від "${effect.abilityName}"`);
      }
      
      // 3. Відсотковий реген HP
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
        // 🔴 ПРОСТО ЗМІНИТИ: Встановлюємо прапорець attacked
        unit.attacked = true;
        console.log(`🔒 ${unit.name} в наручниках! Не може атакувати`);
        this.showAuraEffect(unit, 'disarm');
      }
      break;
    case "debuff":
      if (effect.effectType === "armorReduction") {
        unit.armor = Math.max(0, (unit.armor || 0) - effect.armorReduction);
        console.log(`🔻 ${unit.name} втратив ${effect.armorReduction} броні від "${effect.abilityName}"`);
        this.showAuraEffect(unit, 'debuff-armor');
      } else if (effect.effectType === "attackReduction") {
        unit.attack = Math.max(0, (unit.attack || 0) - effect.attackReduction);
        console.log(`🔻 ${unit.name} втратив ${effect.attackReduction} атаки від "${effect.abilityName}"`);
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