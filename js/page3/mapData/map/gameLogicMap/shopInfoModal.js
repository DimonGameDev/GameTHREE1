
const bottomLine = document.querySelector(".bottomLine");
const dimBottomLine = () => bottomLine && bottomLine.classList.add("dimmed");
const undimBottomLine = () => bottomLine && bottomLine.classList.remove("dimmed");
const overlay = document.querySelector(".overlay");
const activationUpgradesCoin = document.querySelector(".activationUpgradesCoin");
const activationUpgradesBtn = document.querySelector(".activationUpgradesBtn");

const upgradeSlots = Array.from(
    document.querySelectorAll(".bottomContainer .nextLevel")
  ).map((slot) => ({
    container: slot,
    img: slot.querySelector(".imgBoxLevel img"),
    name: slot.querySelector(".nameNextLevel"),
    number: slot.querySelector(".numberLevel"),
    description: slot.querySelector(".discriptionLevel"),
  }));
  
  const unitImg = boxImg ? boxImg.querySelector("img") : null;
  const descriptionParagraph = discripText ? discripText.querySelector("p") : null;
  
  let currentUpgradeList = [];
  let selectedUpgradeIndex = null;
let originalCloseShop = window.closeShop;

(function () {
  if (!modalBtnLineInfo || !modalInfoUnits) return;

  function renderUnitInfo(unit) {
    if (!unit) return;

    currentUpgradeList = Array.isArray(unit.upgrades) ? unit.upgrades : [];
    selectedUpgradeIndex = null;

    if (unitImg) unitImg.src = unit.img || "";
    if (nameUnits) nameUnits.textContent = unit.name || "";

    const topStats = { step: unit.step, range: unit.range, armor: unit.armor, hp: unit.hp, attack: unit.attack };
    Object.entries(topStats).forEach(([key, value]) => {
      const el = textUnit ? textUnit.querySelector(`.${key}`) : null;
      if (el) el.textContent = value ?? "-";
    });

    if (descriptionParagraph) descriptionParagraph.textContent = unit.description || "";
    if (activationUpgradesCoin) activationUpgradesCoin.textContent = unit.coin ?? "";

    upgradeSlots.forEach((slot, index) => {
      if (!slot || !slot.container) return;

      const upgrade = currentUpgradeList[index];
      slot.container.dataset.upgradeIndex = upgrade ? index : "";
      if (slot.img) slot.img.src = upgrade?.img || "";
      if (slot.name) slot.name.textContent = upgrade?.name || "";
      if (slot.number) slot.number.textContent = upgrade ? `Lv. ${upgrade.level}` : "";
      if (slot.description) slot.description.textContent = upgrade?.description || "";
    });

    
  }

  function openUnitsInfoModal(raceName) {
    if (!modalInfoUnits) return;

    if (typeof originalCloseShop === "function") {
      originalCloseShop();
    } else if (ModalWindowsShop) {
      ModalWindowsShop.style.display = "none";
    }
    if (ModalBtnBuyUnits) ModalBtnBuyUnits.style.display = "none";

    modalInfoUnits.style.display = "flex";
    if (overlay) overlay.style.display = "block";
    dimBottomLine();
    if (nameRase) nameRase.textContent = raceName || "";
    renderUnitInfo(raceUnits[currentUnitIndex]);
  }

  function closeUnitsInfoModal() {
    if (modalInfoUnits) modalInfoUnits.style.display = "none";
    if (overlay) overlay.style.display = "none";
    undimBottomLine();
  }

    function changeUnit(step) {
      if (!raceUnits.length) return;
      currentUnitIndex = (currentUnitIndex + step + raceUnits.length) % raceUnits.length;
      renderUnitInfo(raceUnits[currentUnitIndex]);
    }

    modalBtnLineInfo.addEventListener("click", () => {
      const currentPlayer = players[currentPlayerIndex];
      if (!currentPlayer) return;
      const raceKey = raceMap[currentPlayer.race];
      if (!raceKey || !races[raceKey] || !races[raceKey].length) {
        console.warn("No units for race:", currentPlayer.race);
        return;
      }
      raceUnits = races[raceKey];
      currentUnitIndex = 0;
      openUnitsInfoModal(currentPlayer.race);
    });

    if (arrowLeft) arrowLeft.addEventListener("click", () => changeUnit(-1));
    if (arrowRight) arrowRight.addEventListener("click", () => changeUnit(1));
    if (closeWindows) closeWindows.addEventListener("click", closeUnitsInfoModal);
    // if (BazaCloseModal) BazaCloseModal.addEventListener("click", closeUnitsInfoModal);
    if (overlay) overlay.addEventListener("click", closeUnitsInfoModal);

    const originalCloseShop = window.closeShop;
    window.closeShop = function (...args) {
      closeUnitsInfoModal();
      if (typeof originalCloseShop === "function") {
        return originalCloseShop.apply(this, args);
      }
    };

    window.closeUnitsInfoModal = closeUnitsInfoModal;
  })();