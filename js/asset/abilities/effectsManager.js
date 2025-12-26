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
                  effect.duration--;
                  if (effect.duration <= 0) {
                      this.removeEffect(unit, effect);
                      cleanedCount++;
                      return false;
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
        // 1. Зняти відсотковий бонус атаки
        if (effect.attackBoostPercent && effect.attackBoostPercent > 0) {
          const attackBonus = Math.floor((unit.attack || 0) * (effect.attackBoostPercent / (100 + effect.attackBoostPercent)));
          unit.attack = Math.max(0, unit.attack - attackBonus);
          console.log(`⚔️ ${unit.name} втратив +${effect.attackBoostPercent}% атаки`);
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