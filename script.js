(function () {
  const valueInput = document.getElementById("valueInput");
  const animateInput = document.getElementById("animateInput");
  const hideInput = document.getElementById("hideInput");
  const progressBlock = document.getElementById("progressBlock");
  const ringValue = document.querySelector(".ring-value");

  const radius = Number(ringValue.getAttribute("r"));
  const circumference = 2 * Math.PI * radius;

  ringValue.style.strokeDasharray = String(circumference);

  function clampValue(value) {
    if (!Number.isFinite(value)) {
      return 0;
    }
    return Math.min(100, Math.max(0, value));
  }

  const progressApi = {
    setValue(value) {
      const normalized = clampValue(Number(value));
      const offset = circumference - (normalized / 100) * circumference;
      ringValue.style.strokeDashoffset = String(offset);
      valueInput.value = String(normalized);
    },
    setAnimated(enabled) {
      progressBlock.classList.toggle("is-animated", Boolean(enabled));
    },
    setHidden(enabled) {
      progressBlock.classList.toggle("is-hidden", Boolean(enabled));
    },
  };

  valueInput.addEventListener("input", function () {
    progressApi.setValue(valueInput.value);
  });

  valueInput.addEventListener("blur", function () {
    progressApi.setValue(valueInput.value);
  });

  animateInput.addEventListener("change", function () {
    progressApi.setAnimated(animateInput.checked);
  });

  hideInput.addEventListener("change", function () {
    progressApi.setHidden(hideInput.checked);
  });

  progressApi.setValue(valueInput.value);

  window.progressApi = progressApi;
})();
