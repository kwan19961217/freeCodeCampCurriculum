function rot13(str) {
  var strArr = str.split("");
  var decryptedArr = [];
  for (let i = 0; i < strArr.length; i++) {
    if (/[A-M]/.test(strArr[i])) {
      decryptedArr[i] = String.fromCharCode(str[i].charCodeAt() + 13);
    }
    else if (/[N-Z]/.test(strArr[i])) {
      decryptedArr[i] = String.fromCharCode(str[i].charCodeAt() - 13);
    }
    else {
      decryptedArr[i] = str[i];
    }
  }
  decryptedArr = decryptedArr.join("");
  return decryptedArr;
}

rot13("SERR PBQR PNZC");
