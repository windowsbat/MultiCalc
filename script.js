const display = document.getElementById("display");
const tabs = document.querySelectorAll(".tab");
const allModes = document.querySelectorAll(".mode, .buttons");

// === Переключение вкладок ===
let currentMode = "basic";

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    currentMode = tab.dataset.mode;

    allModes.forEach(m => m.classList.add("hidden"));
    document.getElementById(`${currentMode}-mode`).classList.remove("hidden");

    if (currentMode === "basic") display.value = "";
  });
});

// === Обычный калькулятор ===
document.querySelectorAll("#basic-mode .btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const val = btn.textContent;

    if (val === "C") {
      display.value = "";
    } else if (val === "←") {
      display.value = display.value.slice(0, -1);
    } else if (val === "=") {
      try {
        let exp = display.value
          .replace(/×/g, "*")
          .replace(/÷/g, "/")
          .replace(/−/g, "-")
          .replace(/\^/g, "**");
        display.value = eval(exp);
      } catch {
        display.value = "Ошибка";
      }
    } else {
      display.value += val;
    }
  });
});

// === Простой калькулятор валют ===
document.querySelector(".convert").addEventListener("click", () => {
  const amount = parseFloat(document.getElementById("currency-amount").value);
  const from = document.getElementById("from-currency").value;
  const to = document.getElementById("to-currency").value;
  const result = document.getElementById("currency-result");

  if (isNaN(amount)) {
    result.textContent = "Введите сумму!";
    return;
  }

  // Пример простых курсов (фиктивные)
  const rates = {
    USD: 1,
    EUR: 0.9,
    RUB: 100,
    MDL: 17.5
  };

  if (!rates[from] || !rates[to]) {
    result.textContent = "Ошибка конвертации";
    return;
  }

  const converted = (amount / rates[from]) * rates[to];
  result.textContent = `${amount} ${from} = ${converted.toFixed(2)} ${to}`;
});
