const $e = {
  get amount() {
    return $id("amount");
  },
  get term() {
    return $id("term");
  },
  get termLabel() {
    return $id("term-label");
  },
  get rate() {
    return $id("rate");
  },
  get result() {
    return $id("result");
  }
};

function $id(id) {
  return document.getElementById(id);
}

$e.amount.addEventListener("input", calculateAndDisplay);
$e.term.addEventListener("input", handleTermInput);
$e.rate.addEventListener("input", calculateAndDisplay);

function handleTermInput(evt) {
  let val = parseInt(evt.target.value);

  if (!isNaN(val)) {
    $e.termLabel.textContent = val + " თვე";
    calculateAndDisplay();
  }
}

function calculateAndDisplay() {
  let amount = parseInt($e.amount.value);
  let term = parseInt($e.term.value);
  let rate = parseFloat($e.rate.value);
  if (isNaN(amount) || isNaN(term) || isNaN(rate)) return;

  let amountPerMonth = calculateLoan({ amount, term, rate }).toFixed(2);
  let amountTotal = (amountPerMonth * term).toFixed(2);
  let amountToPay = (amountTotal - amount).toFixed(2);

  $e.result.textContent =
    amountPerMonth + "/თვე, სულ: " + amountTotal + ", % - " + amountToPay;
}

function calculateLoan({ amount, rate, term }) {
  rate = rate / 1200;
  return (amount * rate) / (1 - Math.pow(1 / (1 + rate), term));
}

calculateAndDisplay();
