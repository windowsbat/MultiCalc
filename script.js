const display = document.getElementById("display");
const buttons = document.querySelectorAll(".calc-btn");
const tabs = document.querySelectorAll(".tab");
const modeContainers = document.querySelectorAll(".mode");
let currentMode = "basic";

// === Переключение режимов ===
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    currentMode = tab.dataset.mode;
    modeContainers.forEach(container => container.classList.add("hidden"));
    document.getElementById(`${currentMode}-mode`).classList.remove("hidden");
  });
});

// === Обычный калькулятор ===
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.textContent;

    if (value === "=") {
      try {
        const expression = display.value
          .replace(/\^/g, "**") // поддержка степени
          .replace(/×/g, "*")
          .replace(/÷/g, "/");

        display.value = eval(expression);
      } catch {
        display.value = "Ошибка";
      }
    } else if (value === "C") {
      display.value = ""; // очистка
    } else if (value === "←") {
      display.value = display.value.slice(0, -1); // удаление последнего символа
    } else {
      display.value += value;
    }
  });
});

// === Остальные режимы (заглушки) ===
const placeholderMessage = "🔧 Этот калькулятор пока в разработке 🔧";

["fractions", "time", "mass", "distance", "currency"].forEach(mode => {
  const container = document.getElementById(`${mode}-mode`);
  container.innerHTML = `
    <div class="placeholder">
      <h2>${placeholderMessage}</h2>
      <p>Здесь скоро появится калькулятор: <b>${mode}</b></p>
    </div>
  `;
});
