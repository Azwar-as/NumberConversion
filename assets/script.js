const inputNumber = document.getElementById("inputNumber");
const fromConv = document.getElementById("fromConv");
const toConv = document.getElementById("toConv");

// Menukar Tipe Input Basis
document.getElementById("btnChange").addEventListener("click", () => {
  const fromResult = document.getElementById("fromResult");
  const toResult = document.getElementById("toResult");
  const convInfo = document.getElementById("convertInfo");

  const temp = fromConv.value;
  fromConv.value = toConv.value;
  toConv.value = temp;

  fromResult.textContent = `From (${fromConv.value}) = 0`;
  toResult.textContent = `0 ${toConv.value}`;
  convInfo.textContent = `Converted From ${fromConv.value} to ${toConv.value}`;
});

// Menentukan Basis Angka
function getBase(type) {
  switch (type) {
    case "biner":
      return 2;
    case "oktal":
      return 8;
    case "desimal":
      return 10;
    case "hexa":
      return 16;
    default:
      return null;
  }
}

// Fungsi Untuk Konversi Number
function convertNumber(number, fromBase, toBase) {
  const decimalNumber = parseInt(number, fromBase);
  return decimalNumber.toString(toBase);
}

//Button Menjalankan Fungsi
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
