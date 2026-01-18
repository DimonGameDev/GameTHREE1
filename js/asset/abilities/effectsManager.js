// Система управління тимчасовими ефектами
class EffectsManager {
  
    // Застосувати всі аури юніта після руху
       // Застосувати аури після руху юніта
       static applyUnitAuras(movedUnit) {
        console.log(`🎯 applyUnitAuras ВИКЛИКАНО для ${movedUnit.name}`);
        console.log(`🔍 movedUnit.abilityInstances:`, movedUnit.abilityInstances);
        
        if (!movedUnit.abilityInstances || !Array.isArray(movedUnit.abilityInstances)) {
            console.log(`❌ ${movedUnit.name} не має abilityInstances`);
            return;
        }
        
        if (!window.unitsOnMap) {
            console.error('❌ unitsOnMap не знайдено');
            return;
        }
        
        console.log(`🔍 Оновлення аур після руху ${movedUnit.name}`);
        
        // 1. Застосовуємо аури movedUnit на інших юнітів
        movedUnit.abilityInstances.forEach(ability => {
            if (ability.actionType === "aura" && ability.mode === "passive") {
                this.applySingleAura(ability, movedUnit, window.unitsOnMap);
            }
        });
        
        // 2. Оновлюємо аури інших юнітів на movedUnit
        this.updateAurasForUnit(movedUnit);
    }
    
    // Застосувати одну ауру на всіх юнітів в радіусі
       // Застосувати одну ауру на всіх юнітів в радіусі
       static applySingleAura(ability, sourceUnit, allUnits) {
        console.log(`🎯 applySingleAura ВИКЛИКАНО: ${ability.name} від ${sourceUnit.name}`);
        console.log(`🔍 ability об'єкт:`, {
            name: ability.name,
            type: ability.type,
            actionType: ability.actionType,
            mode: ability.mode,
            radius: ability.radius,
            targets: ability.targets,
            armorBonus: ability.armorBonus,
            attackBonus: ability.attackBonus,
            stepBonus: ability.stepBonus
        });
        console.log(`🔍 Аура "${ability.name}" від ${sourceUnit.name}, радіус: ${ability.radius}`);
      
      // Знаходимо всіх юнітів в радіусі
      const unitsInRadius = allUnits.filter(targetUnit => {
          if (targetUnit.id === sourceUnit.id) return false; // Не впливає на себе
          
          // Перевіряємо тип цілей
          if (ability.targets === "allies") {
              return targetUnit.playerIndex === sourceUnit.playerIndex;
          } else if (ability.targets === "enemies") {
              return targetUnit.playerIndex !== sourceUnit.playerIndex;
          }
          return false;
      }).filter(targetUnit => {
          // Перевіряємо дистанцію
          const distance = Math.abs(sourceUnit.x - targetUnit.x) + Math.abs(sourceUnit.y - targetUnit.y);
          return distance <= ability.radius;
      });
      
      console.log(`🔍 Знайдено ${unitsInRadius.length} юнітів в радіусі`);
      
      // Застосовуємо ауру на кожного юніта
      unitsInRadius.forEach(targetUnit => {
        if (typeof ability.createAuraEffect !== 'function') {
          console.error(`❌ ability.createAuraEffect не є функцією для ${ability.name}`);
          console.log('🔍 ability:', ability);
          return;
      }
          // Створюємо ефект аури
          const effect = ability.createAuraEffect(sourceUnit);
          // У методі applySingleAura, після рядка 55 додати:
console.log('🔍 Створений ефект аури:', {
  type: effect.type,
  source: effect.source,
  abilityName: effect.abilityName,
  armorBonus: effect.armorBonus,
  attackBonus: effect.attackBonus,
  stepBonus: effect.stepBonus,
  duration: effect.duration
});

// Перевірити чи ability має метод createAuraEffect
console.log('🔍 ability має createAuraEffect?', typeof ability.createAuraEffect);
console.log('🔍 ability об\'єкт:', {
  name: ability.name,
  type: ability.type,
  actionType: ability.actionType,
  mode: ability.mode,
  armorBonus: ability.armorBonus,
  attackBonus: ability.attackBonus
});
          // Перевіряємо чи вже є така аура
          const existingEffectIndex = targetUnit.activeEffects?.findIndex(e => 
              e.type === effect.type && 
              e.source === effect.source &&
              e.abilityName === effect.abilityName
          );
          
          if (existingEffectIndex !== undefined && existingEffectIndex >= 0) {
              // Оновлюємо існуючий ефект
              targetUnit.activeEffects[existingEffectIndex] = effect;
              console.log(`🔄 Оновлено ауру "${ability.name}" на ${targetUnit.name}`);
          } else {
              // Додаємо новий ефект
              if (!targetUnit.activeEffects) targetUnit.activeEffects = [];
              targetUnit.activeEffects.push(effect);
              console.log(`✨ Додано ауру "${ability.name}" на ${targetUnit.name}`);
          }
          
          // Перераховуємо стати
          window.recalcUnitStats(targetUnit);
      });
      
      // Видаляємо аури з юнітів, які вийшли з радіусу
      this.cleanupAuraEffects(ability, sourceUnit, allUnits);
  }
  
  // Оновити аури для конкретного юніта (коли він рухається)
  static updateAurasForUnit(targetUnit) {
      if (!window.unitsOnMap) return;
      
      console.log(`🔍 Оновлення аур для ${targetUnit.name}`);
      
      // Знаходимо всіх юнітів з аурами
      window.unitsOnMap.forEach(sourceUnit => {
          if (sourceUnit.id === targetUnit.id) return;
          
          if (sourceUnit.abilityInstances && Array.isArray(sourceUnit.abilityInstances)) {
              sourceUnit.abilityInstances.forEach(ability => {
                  if (ability.actionType === "aura" && ability.mode === "passive") {
                      // Перевіряємо чи targetUnit в радіусі
                      const distance = Math.abs(sourceUnit.x - targetUnit.x) + Math.abs(sourceUnit.y - targetUnit.y);
                      
                      if (distance <= ability.radius) {
                          // Перевіряємо тип цілей
                          const isValidTarget = 
                              (ability.targets === "allies" && targetUnit.playerIndex === sourceUnit.playerIndex) ||
                              (ability.targets === "enemies" && targetUnit.playerIndex !== sourceUnit.playerIndex);
                          
                          if (isValidTarget) {
                              // Додаємо/оновлюємо ауру
                              const effect = ability.createAuraEffect(sourceUnit);
                              this.addOrUpdateAuraEffect(targetUnit, effect);
                          }
                      } else {
                          // Видаляємо ауру якщо вийшли з радіусу
                          this.removeAuraEffect(targetUnit, ability, sourceUnit);
                      }
                  }
              });
          }
      });
  }
  
  // Додати або оновити ефект аури
  static addOrUpdateAuraEffect(unit, effect) {
      if (!unit.activeEffects) unit.activeEffects = [];
      
      const existingIndex = unit.activeEffects.findIndex(e => 
          e.type === effect.type && 
          e.source === effect.source &&
          e.abilityName === effect.abilityName
      );
      
      if (existingIndex >= 0) {
          unit.activeEffects[existingIndex] = effect;
          console.log(`🔄 Оновлено ауру "${effect.abilityName}" на ${unit.name}`);
      } else {
          unit.activeEffects.push(effect);
          console.log(`✨ Додано ауру "${effect.abilityName}" на ${unit.name}`);
      }
      
      window.recalcUnitStats(unit);
  }
  
  // Видалити ефект аури
  static removeAuraEffect(unit, ability, sourceUnit) {
    if (!unit.activeEffects) return;
    
    const effectIndex = unit.activeEffects.findIndex(e => 
        e.type === ability.type && 
        (e.source === sourceUnit.id || e.sourceKey === (sourceUnit.baseUnitKey || `${sourceUnit.race}:${sourceUnit.role}`)) &&
        e.abilityName === ability.name
    );
    
    if (effectIndex >= 0) {
        unit.activeEffects.splice(effectIndex, 1);
        console.log(`🧹 Видалено ауру "${ability.name}" з ${unit.name}`);
        window.recalcUnitStats(unit);
    }
}
  
  // Очистити застарілі аури
  static cleanupAuraEffects(ability, sourceUnit, allUnits) {
    allUnits.forEach(unit => {
        if (unit.id === sourceUnit.id) return;
        
        // Знаходимо аури від цього sourceUnit за sourceKey або source
        const auraEffects = unit.activeEffects?.filter(e => 
            e.type === ability.type && 
            (e.source === sourceUnit.id || e.sourceKey === (sourceUnit.baseUnitKey || `${sourceUnit.race}:${sourceUnit.role}`)) &&
            e.abilityName === ability.name
        );
        
        if (!auraEffects || auraEffects.length === 0) return;
        
        // Перевіряємо чи юніт ще в радіусі
        const distance = Math.abs(sourceUnit.x - unit.x) + Math.abs(sourceUnit.y - unit.y);
        
        if (distance > ability.radius) {
            // Видаляємо ауру
            this.removeAuraEffect(unit, ability, sourceUnit);
        }
    });
}
    // Замінити весь метод applyAllAuras в effectsManager.js
    // Застосувати всі аури (тільки при завантаженні гри)
    static applyAllAuras() {
      console.log('🔴 applyAllAuras ВИКЛИКАНО!');
      
      if (!window.unitsOnMap) {
          console.error('❌ unitsOnMap не знайдено');
          return;
      }
      
      console.log(`🔍 Юнітів на полі: ${window.unitsOnMap.length}`);
      
      // Для кожного юніта застосовуємо його аури
      window.unitsOnMap.forEach(unit => {
          if (unit.abilityInstances && Array.isArray(unit.abilityInstances)) {
              unit.abilityInstances.forEach(ability => {
                  if (ability.actionType === "aura" && ability.mode === "passive") {
                      this.applySingleAura(ability, unit, window.unitsOnMap);
                  }
              });
          }
      });
      
      console.log('✨ Всі аури застосовані');
  }

    // Застосувати аури для нового юніта
    static applyAurasForNewUnit(newUnit) {
      if (!window.unitsOnMap) {
          console.error('❌ unitsOnMap не знайдено');
          return;
      }
      
      console.log(`🔍 Застосування аур для нового юніта ${newUnit.name}`);
      
      // 1. Інші юніти впливають на нового
      this.updateAurasForUnit(newUnit);
      
      // 2. Новий юніт впливає на інших (якщо має аури)
      if (newUnit.abilityInstances && Array.isArray(newUnit.abilityInstances)) {
          newUnit.abilityInstances.forEach(ability => {
              if (ability.actionType === "aura" && ability.mode === "passive") {
                  this.applySingleAura(ability, newUnit, window.unitsOnMap);
              }
          });
      }
  }
       


    // ЗАМІНИТИ весь метод cleanupExpiredEffects (рядки 104-152) на:
static cleanupExpiredEffects(playerIndex) {
  if (!window.unitsOnMap) return;
  
  let cleanedCount = 0;
  
  window.unitsOnMap.forEach(unit => {
      if (!unit.activeEffects || unit.activeEffects.length === 0) return;
      
      const effectsToRemove = [];
      
      unit.activeEffects.forEach(effect => {
          // Перевіряємо чи це ефект цього гравця
          const isPlayersEffect = 
              effect.appliedByPlayer === playerIndex || 
              effect.appliedByPlayerIndex === playerIndex;
          
          if (!isPlayersEffect) return;
          
          // Зменшуємо тривалість для ефектів з duration
          if (effect.duration !== undefined) {
              effect.duration--;
              console.log(`⏳ Ефект "${effect.type}" (${effect.abilityName || 'без назви'}): тривалість зменшено до ${effect.duration}`);
              
              if (effect.duration <= 0) {
                  effectsToRemove.push(effect);
              }
          }
          
          // Control-ефекти знімаємо одразу
          if (effect.type === "control") {
              effectsToRemove.push(effect);
              console.log(`🔄 Control-ефект від гравця ${playerIndex + 1} закінчився`);
          }
      });
      
      // Видаляємо позначені ефекти
      effectsToRemove.forEach(effect => {
          const index = unit.activeEffects.indexOf(effect);
          if (index !== -1) {
              unit.activeEffects.splice(index, 1);
              cleanedCount++;
              console.log(`🧹 Ефект "${effect.type}" закінчився у ${unit.name}`);
          }
      });
      
      // Якщо щось видалили - перераховуємо стати
      if (effectsToRemove.length > 0) {
          window.recalcUnitStats(unit);
      }
  });
  
  if (cleanedCount > 0) {
      console.log(`🧹 Очищено ${cleanedCount} ефектів на початку ходу гравця ${playerIndex + 1}`);
  }
}
    
// Додати після рядка 161
static removeEffect(unit, effect) {
  if (!unit.activeEffects) return;
  
  // Знаходимо індекс ефекту
  const effectIndex = unit.activeEffects.findIndex(e => 
      e.source === effect.source && 
      e.abilityName === effect.abilityName &&
      e.type === effect.type
  );
  
  if (effectIndex === -1) {
      console.log(`⚠️ Ефект не знайдено для видалення: ${effect.abilityName}`);
      return;
  }
  
  // Видаляємо ефект з масиву
  unit.activeEffects.splice(effectIndex, 1);
  console.log(`🧹 Видалено ефект "${effect.abilityName}" з ${unit.name}`);
  
  // Перераховуємо стати
  window.recalcUnitStats(unit);
}

// Додати після removeEffect() (після рядка 231)
static getBaseAttackFromTemplate(unit) {
    // Шукаємо шаблон юніта
    if (window.unitsRegistry) {
      const unitKey = unit.baseUnitKey || unit.unitId;
      const template = window.unitsRegistry[unitKey];
        if (template) {
            // Перевіряємо нову структуру з levels
            if (template.levels) {
                const level = unit.level || 1;
                const levelData = template.levels[level];
                if (levelData && levelData.attack !== undefined) {
                    console.log(`🔍 Знайдено шаблон для ${unit.name} рівень ${level}: атака=${levelData.attack}`);
                    return levelData.attack;
                }
            }
            // Запасний варіант для старої структури
            if (template.attack !== undefined) {
                console.log(`🔍 Знайдено шаблон для ${unit.name}: атака=${template.attack} (без levels)`);
                return template.attack;
            }
        }
    }
    
    // Для героїв
    if (unit.isHero && unit.heroTemplateId && window.heroes) {
        const heroTemplate = window.heroes[unit.heroTemplateId - 1];
        if (heroTemplate) {
            console.log(`🔍 Знайдено шаблон героя для ${unit.name}: атака=${heroTemplate.attack}`);
            return heroTemplate.attack;
        }
    }
    
    console.log(`⚠️ Не знайдено шаблон для ${unit.name}`);
    return undefined;
  }
    
    // Перевірити чи має юніт хоча б одну ауру
    static hasAuraAbility(unit) {
        if (!unit.abilityInstances) return false;
        return unit.abilityInstances.some(ability => 
          ability.actionType === "aura" && ability.mode === "passive"
        );
      }
  
      // Очистити ефекти від померлого юніта
      static cleanupEffectsFromDeadUnit(deadUnitId, deadUnitBaseKey) {
          if (!window.unitsOnMap) return;
          
          let cleanedCount = 0;
          
          window.unitsOnMap.forEach(unit => {
              if (!unit.activeEffects || unit.activeEffects.length === 0) return;
              
              const initialLength = unit.activeEffects.length;
              
              // Видаляємо ефекти за source або sourceKey
              unit.activeEffects = unit.activeEffects.filter(effect => 
                  effect.source !== deadUnitId && 
                  effect.sourceKey !== deadUnitBaseKey
              );
              
              if (unit.activeEffects.length !== initialLength) {
                  cleanedCount += (initialLength - unit.activeEffects.length);
                  console.log(`🧹 Видалено ефекти від померлого юніта з ${unit.name}`);
                  
                  if (window.recalcUnitStats) {
                      window.recalcUnitStats(unit);
                  }
              }
          });
          
          if (cleanedCount > 0) {
              console.log(`✅ Очищено ${cleanedCount} ефектів від померлого юніта`);
          }
      }
    }


  
  
  // Глобальний доступ
  window.EffectsManager = EffectsManager;

  // Додати після рядка 278 в effectsManager.js
window.recalcUnitStats = function(unit) {
  if (!unit.baseStats) {
      // Якщо немає baseStats, створюємо з поточних значень
      unit.baseStats = {
          attack: unit.attack || 0,
          armor: unit.armor || 0,
          step: unit.step || 0,
          range: unit.range || 0,
          maxHp: unit.maxHp || unit.hp || 100
      };
  }
  
  // Починаємо з базових значень
  let attack = unit.baseStats.attack || 0;
  let armor = unit.baseStats.armor || 0;
  let step = unit.baseStats.step || 0;
  let range = unit.baseStats.range || 0;
  let maxHp = unit.baseStats.maxHp || 100;
  
  // Додаткові змінні для спеціальних ефектів
  let canAttack = true;
  let canMove = true;
  
  // Застосовуємо всі активні ефекти
  if (unit.activeEffects && unit.activeEffects.length > 0) {
      unit.activeEffects.forEach(effect => {
          switch (effect.type) {
              case "attack":
                  attack += effect.attackBonus || 0;
                  break;
              case "armor":
                  armor += effect.armorBonus || 0;
                  break;
              case "step":
                  step += effect.stepBonus || 0;
                  break;
              case "mixed":
                  attack += effect.attackBoost || 0;
                  armor += effect.armorBoost || 0;
                  // hpRegenPercent обробляється окремо
                  break;
              case "control":
                  if (effect.effectType === "immobilize") {
                      step = Math.max(0, step - (effect.stepReduction || 999));
                  } else if (effect.effectType === "disarm") {
                      canAttack = false;
                  }
                  break;
              case "debuff":
                  if (effect.effectType === "attackReduction") {
                      attack = Math.max(0, attack - (effect.attackReduction || 0));
                  } else if (effect.effectType === "armorReduction") {
                      armor = Math.max(0, armor - (effect.armorReduction || 0));
                  } else if (effect.effectType === "stepReduction") {
                      step = Math.max(0, step - (effect.stepReduction || 0));
                  }
                  break;
          }
      });
  }
  
  // Застосовуємо обмеження (не може бути менше 0)
  unit.attack = Math.max(0, attack);
  unit.armor = Math.max(0, armor);
  unit.step = Math.max(0, step);
  unit.range = Math.max(0, range);
  unit.maxHp = Math.max(1, maxHp);
  unit.canAttack = canAttack;
  unit.canMove = step > 0;
  
  // Перевіряємо HP
  if (unit.hp > unit.maxHp) {
      unit.hp = unit.maxHp;
  }
  if (unit.newhp > unit.maxHp) {
      unit.newhp = unit.maxHp;
  }
  
  console.log(`🔄 ${unit.name} перераховано: A=${unit.attack}, D=${unit.armor}, S=${unit.step}`);
};


// Додати після рядка 282
window.initializeUnitBaseStats = function(unit) {
  if (!unit.baseStats) {
      unit.baseStats = {
          attack: unit.attack || 0,
          armor: unit.armor || 0,
          step: unit.step || 0,
          range: unit.range || 0,
          maxHp: unit.maxHp || unit.hp || 100
      };
      console.log(`📊 Ініціалізовано baseStats для ${unit.name}`);
  }
  
  // Видаляємо старі властивості
  delete unit.originalAttack;
  delete unit.originalArmor;
  delete unit.originalStep;
  delete unit.originalRange;
  
  // Перераховуємо стати
  window.recalcUnitStats(unit);
};

window.initializeAllUnitsBaseStats = function() {
  if (!window.unitsOnMap) {
      console.error('❌ unitsOnMap не знайдено');
      return;
  }
  
  console.log(`📊 Ініціалізація baseStats для ${window.unitsOnMap.length} юнітів`);
  window.unitsOnMap.forEach(unit => {
      window.initializeUnitBaseStats(unit);
  });
  
  console.log('✅ Всі юніти ініціалізовані з новою системою ефектів');
};

// Автоматична ініціалізація
if (window.unitsOnMap && window.unitsOnMap.length > 0) {
  setTimeout(() => {
      if (window.initializeAllUnitsBaseStats) {
          window.initializeAllUnitsBaseStats();
      }
  }, 1000);
}



// console.log('✅ effectsManager.js завантажено');

// Додати в кінець effectsManager.js
console.log('✅ effectsManager.js завантажено');
if (window.EffectsManager) {
    console.log('✅ EffectsManager доступний');
    // Автоматичний тест через 2 секунди
    setTimeout(() => {
        if (window.unitsOnMap && window.unitsOnMap.length > 0) {
            console.log('🚀 Автоматичний тест аур...');
            window.EffectsManager.applyAllAuras();
        }
    }, 2000);
}