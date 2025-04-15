const inputNumber = document.getElementById("inputNumber");
const fromConv = document.getElementById("fromConv");
const toConv = document.getElementById("toConv");

document.getElementById("btnChange").addEventListener("click", () => {
  // Memanggil Element Html Ke JS
  const fromResult = document.getElementById("fromResult");
  const toResult = document.getElementById("toResult");
  const convInfo = document.getElementById("convertInfo");

  // Kode Penukaran Input Basis
  const temp = fromConv.value;
  fromConv.value = toConv.value;
  toConv.value = temp;

  // Merubah Interface Sesuai Penukaran Basis
  fromResult.textContent = `(${fromConv.value}) Number : 0`;
  toResult.textContent = `${toConv.value} Number : 0`;
  convInfo.textContent = `Converted From ${fromConv.value} to ${toConv.value}`;
});

// EventListener Untuk Menjalankan Fungsi Konversi Basis
document.getElementById("btnCalculate").addEventListener("click", () => {
  const number = inputNumber.value.trim();
  const fromBase = getBase(fromConv.value);
  const toBase = getBase(toConv.value);

  if (!number) {
    alert("Please enter a number to convert.");
    return;
  }

  if (fromBase === null || toBase === null) {
    alert("Invalid base selection.");
    return;
  }

  displayConversionProcess(number, fromBase, toBase);
});

// Fungsi Untuk Validasi dan Mengontrol Seluruh Fungsi
function displayConversionProcess(number, fromBase, toBase) {
  const fromResult = document.getElementById("fromResult");
  const toResult = document.getElementById("toResult");
  const convInfo = document.getElementById("convertInfo");
  const convSteps = document.getElementById("conversionSteps");

  convSteps.innerHTML = ""; // Clear previous steps

  if (!isValidNumber(number, fromBase)) {
    convSteps.innerHTML = "<p>Input Value Not Valid for the selected base!</p>";
    convInfo.textContent = "Input Value Not Valid!";
    return;
  }

  fromResult.innerHTML = `<p>${fromConv.value} Number : ${number}</p>`;

  if (fromBase === toBase) {
    toResult.innerHTML = `<p>${toConv.value} Number : ${number}</p>`;
    convInfo.textContent = `Converted from ${fromConv.value} to ${toConv.value}`;
    return;
  }

  if (fromBase === 10) {
    convertFromDecimal(number, toBase);
  } else if (toBase === 10) {
    convertToDecimal(number, fromBase);
  } else {
    const decimalValue = convertToDecimal(number, fromBase);
    convertFromDecimal(decimalValue, toBase);
  }

  convInfo.textContent = `Converted from ${fromConv.value} to ${toConv.value}`;
}

// Fungsi Untuk Menentukan Tipe Angka Basis
function getBase(type) {
  switch (type) {
    case "binary":
      return 2;
    case "octal":
      return 8;
    case "decimal":
      return 10;
    case "hexadecimal":
      return 16;
    default:
      return null;
  }
}

// Fungsi Untuk Validasi Angka dari Setiap Tipe Basis
function isValidNumber(number, fromBase) {
  const regexPatterns = {
    2: /^[01]+$/,
    8: /^[0-7]+$/,
    10: /^[0-9]+$/,
    16: /^[0-9A-Fa-f]+$/,
  };
  return regexPatterns[fromBase]?.test(number) ?? false;
}

// Fungsi Untuk Konversi Dari Tipe Basis Desimal Ke Tipe Basis Lain
function convertFromDecimal(number, toBase) {
  const toResult = document.getElementById("toResult");
  const convSteps = document.getElementById("conversionSteps");

  convSteps.innerHTML = `
    <h3>Conversion Steps</h3>
    <table border="1">
      <thead>
        <tr>
          <th>Step</th>
          <th>Operation</th>
          <th>Result</th>
        </tr>
      </thead>
      <tbody id="calcSteps"></tbody>
      <tfoot>
        <tr>
          <th colspan="2">Final Result</th>
          <th id="calcResult"></th>
        </tr>
      </tfoot>
    </table>`;

  let result = [];
  let temp = parseInt(number, 10);

  if (temp === 0) {
    result.push(0);
  } else {
    while (temp > 0) {
      const stepResult = temp % toBase;
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${temp} ÷ ${toBase}</td>
        <td>Remainder: ${stepResult}</td>
        <td>${Math.floor(temp / toBase)}</td>`;
      document.getElementById("calcSteps").appendChild(tr);

      result.push(stepResult.toString(toBase).toUpperCase());
      temp = Math.floor(temp / toBase);
    }
  }

  const reverseResult = result.reverse().join("");
  document.getElementById("calcResult").textContent = reverseResult;
  toResult.innerHTML = `<p>${toConv.value} Number : ${reverseResult}</p>`;
}

// Fungsi Untuk Konversi Dari Tipe Basis Lain Ke Basis Desimal
function convertToDecimal(number, fromBase) {
  const toResult = document.getElementById("toResult");
  const convSteps = document.getElementById("conversionSteps");

  convSteps.innerHTML = `
    <h3>Conversion Steps</h3>
    <table border="1">
      <thead>
        <tr>
          <th>Digit</th>
          <th>Base & Exponent</th>
          <th>Result</th>
        </tr>
      </thead>
      <tbody id="calcSteps"></tbody>
      <tfoot>
        <tr>
          <th colspan="2">Final Result</th>
          <th id="calcResult"></th>
        </tr>
      </tfoot>
    </table>`;

  let decimalValue = 0;
  let pow = number.length - 1;

  for (let i = 0; i < number.length; i++) {
    const digit = number[i];
    const stepResult = parseInt(digit, fromBase) * Math.pow(fromBase, pow);

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${digit}</td>
      <td>${digit} × ${fromBase}<sup>${pow}</sup></td>
      <td>${stepResult}</td>`;
    document.getElementById("calcSteps").appendChild(tr);

    decimalValue += stepResult;
    pow--;
  }

  document.getElementById("calcResult").textContent = decimalValue;
  toResult.innerHTML = `<p>Decimal Number : ${decimalValue}</p>`;
  return decimalValue;
}

//Button untuk Menjalankan Fungsi
document.getElementById("btnCalculate").addEventListener("click", () => {
  const fromResult = document.getElementById("fromResult");
  const toResult = document.getElementById("toResult");
  const convInfo = document.getElementById("convertInfo");

  const number = inputNumber.value;
  const fromBase = getBase(fromConv.value);
  const toBase = getBase(toConv.value);

  // Validasi Input
  if (number && fromBase && toBase) {
    const convertedNumber = convertNumber(number, fromBase, toBase);
    fromResult.textContent = `From ${fromConv.value} = ${number}`;
    toResult.textContent = `${convertedNumber} ${toConv.value}`;
    convInfo.textContent = `Converted From ${fromConv.value} to ${toConv.value}`;
  } else {
    convInfo.textContent =
      "Please enter a valid number and select conversion types.";
  }
});
