// Система управління тимчасовими ефектами
class EffectsManager {
  
    // Застосувати всі аури юніта після руху
    static applyUnitAuras(unit) {
      if (!unit.abilityInstances || !Array.isArray(unit.abilityInstances)) {
        return;
      }
      
      if (!window.unitsOnMap) {
        console.error('❌ unitsOnMap не знайдено');
        return;
      }
      
      unit.abilityInstances.forEach(ability => {
        if (ability.actionType === "aura" && ability.mode === "passive") {
          ability.applyAura(unit, window.unitsOnMap);
        }
      });
    }
    

    // Замінити весь метод applyAllAuras в effectsManager.js
static applyAllAuras() {
  console.log('🔴 applyAllAuras ВИКЛИКАНО!');
  
  if (!window.unitsOnMap) {
    console.error('❌ unitsOnMap не знайдено');
    return;
  }
  
  console.log(`🔍 Юнітів на полі: ${window.unitsOnMap.length}`);
  
  let auraCount = 0;
  let unitCount = 0;
  
  window.unitsOnMap.forEach((unit, index) => {
    console.log(`🔍 [${index}] ${unit.name}: abilityInstances =`, unit.abilityInstances?.length || 0);
    
    if (unit.abilityInstances && Array.isArray(unit.abilityInstances)) {
      unit.abilityInstances.forEach((ability, abilityIndex) => {
        console.log(`  🔍 [${abilityIndex}] ${ability.name}: actionType=${ability.actionType}, mode=${ability.mode}`);
        
        if (ability.actionType === "aura" && ability.mode === "passive") {
          console.log(`  ✅ ЗАСТОСОВУЄМО АУРУ: ${ability.name}`);
          const result = ability.applyAura(unit, window.unitsOnMap);
          console.log(`  ✅ Результат:`, result);
          auraCount++;
        }
      });
      unitCount++;
    }
  });
  
  console.log(`✨ Підсумок: ${auraCount} аур для ${unitCount} юнітів`);
}


        // Застосувати аури для нового юніта (при покупці)
        static applyAurasForNewUnit(newUnit) {
          if (!window.unitsOnMap) {
            console.error('❌ unitsOnMap не знайдено');
            return;
          }
          
          // 1. Новий юніт впливає на інших
          // if (newUnit.abilityInstances && Array.isArray(newUnit.abilityInstances)) {
          //   newUnit.abilityInstances.forEach(ability => {
          //     if (ability.actionType === "aura" && ability.mode === "passive") {
          //       ability.applyAura(newUnit, window.unitsOnMap);
          //       console.log(`✨ Новий юніт ${newUnit.name} застосував ауру на інших`);
          //     }
          //   });
          // }
          
          // 2. Інші юніти впливають на нового
          window.unitsOnMap.forEach(unit => {
            if (unit.id === newUnit.id) return;
            
            if (unit.abilityInstances && Array.isArray(unit.abilityInstances)) {
              unit.abilityInstances.forEach(ability => {
                if (ability.actionType === "aura" && ability.mode === "passive") {
                  // Перевіряємо чи аура впливає на нового юніта
                  const distance = ability.calculateDistance(unit, newUnit);
                  if (distance <= ability.radius) {
                    // Створюємо ефект аури
                    const effect = ability.createAuraEffect(unit);
                    ability.addTemporaryEffect(newUnit, effect);
                    console.log(`✨ ${unit.name} вплинув на нового юніта ${newUnit.name}`);
                  }
                }
              });
            }
          });
        }


    // Очистити ефекти на початку ходу гравця
    static cleanupExpiredEffects(playerIndex) {
      if (!window.unitsOnMap) return;
      
      let cleanedCount = 0;
      
      window.unitsOnMap.forEach(unit => {
          if (!unit.activeEffects || unit.activeEffects.length === 0) return;
          
          unit.activeEffects = unit.activeEffects.filter(effect => {
              // ✅ НОВИЙ ПІДХІД: Ефект знімається коли настає хід того, хто його застосував
              if (effect.appliedByPlayer !== undefined && effect.appliedByPlayer === playerIndex) {
                  this.removeEffect(unit, effect);
                  cleanedCount++;
                  console.log(`🔄 Ефект від гравця ${playerIndex + 1} закінчився`);
                  return false;
              }
              
               // Старий підхід для ефектів з duration
               if (effect.duration !== undefined) {
                // ✅ ВИПРАВЛЕНО: Для control ефектів зменшуємо duration тільки коли настає хід того, хто наклав
                if (effect.type === "control" && effect.appliedByPlayerIndex === playerIndex) {
                    effect.duration--;
                    if (effect.duration <= 0) {
                        this.removeEffect(unit, effect);
                        cleanedCount++;
                        return false;
                    }
                }
                // Для інших ефектів - стара логіка
                else if (effect.type !== "control") {
                    effect.duration--;
                    if (effect.duration <= 0) {
                        this.removeEffect(unit, effect);
                        cleanedCount++;
                        return false;
                    }
                }
            }
              return true;
          });
      });
      
      if (cleanedCount > 0) {
          console.log(`🧹 Очищено ${cleanedCount} ефектів на початку ходу гравця ${playerIndex + 1}`);
      }
  }
    
    // Зняти ефект з юніта
    // Зняти ефект з юніта
static removeEffect(unit, effect) {
  switch (effect.type) {
    case "armor":
      unit.armor = Math.max(0, unit.armor - effect.armorBonus);
      console.log(`🛡️ ${unit.name} втратив +${effect.armorBonus} броні`);
      break;
    case "attack":
      unit.attack = Math.max(0, unit.attack - effect.attackBonus);
      console.log(`⚔️ ${unit.name} втратив +${effect.attackBonus} атаки`);
      break;
    case "step":
      unit.step = Math.max(0, unit.step - effect.stepBonus);
      console.log(`👟 ${unit.name} втратив +${effect.stepBonus} кроків`);
      break;

      case "mixed":
    // 1. Зняти фіксований бонус атаки (не відсоток!)
    if (effect.attackBoost && effect.attackBoost > 0) {
        unit.attack = Math.max(0, unit.attack - effect.attackBoost);
        console.log(`⚔️ ${unit.name} втратив +${effect.attackBoost} атаки`);
    }
    
    // 2. Зняти фіксований бонус броні
    if (effect.armorBoost && effect.armorBoost > 0) {
        unit.armor = Math.max(0, unit.armor - effect.armorBoost);
        console.log(`🛡️ ${unit.name} втратив +${effect.armorBoost} броні`);
    }
    break;

      case "control":
  if (effect.effectType === "immobilize") {
    if (unit.originalStep !== undefined) {
      unit.step = unit.originalStep;
      delete unit.originalStep;
      console.log(`🌿 ${unit.name} звільнено від знерухомлення!`);
    }
  } else if (effect.effectType === "disarm") {
    // 🔴 ПРОСТО ЗМІНИТИ: Повертаємо можливість атакувати
    unit.attacked = false;
    console.log(`🔓 ${unit.name} звільнено від наручників!`);
  }
  break;
    case "debuff":
      // Повертаємо значення назад
      if (effect.effectType === "armorReduction") {
        unit.armor = (unit.armor || 0) + effect.armorReduction;
        console.log(`🔼 ${unit.name} відновив ${effect.armorReduction} броні`);
      } else if (effect.effectType === "attackReduction") {
        unit.attack = (unit.attack || 0) + effect.attackReduction;
        console.log(`🔼 ${unit.name} відновив ${effect.attackReduction} атаки`);
    } else if (effect.effectType === "stepReduction") {
        unit.step = (unit.step || 0) + effect.stepReduction;
        delete unit.originalStepBeforeAoe;
        console.log(`🔼 ${unit.name} відновив ${effect.stepReduction} кроків`);
    }
      break;
  }
}
    
    // Перевірити чи має юніт хоча б одну ауру
    static hasAuraAbility(unit) {
      if (!unit.abilityInstances) return false;
      return unit.abilityInstances.some(ability => 
        ability.actionType === "aura" && ability.mode === "passive"
      );
    }
  }



  
  
  // Глобальний доступ
  window.EffectsManager = EffectsManager;