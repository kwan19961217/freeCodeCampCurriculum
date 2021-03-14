function telephoneCheck(str) {
  if (str[0] == "-") {
    return false;
  }
  else if (str[0] == "(" && str[str.length - 1] == ")") {
    return false;
  }
  if (/[()]/.test(str)) {
    if (str.indexOf("(") > str.indexOf(")")) {
      return false;
    }
    else if(!/[(]/.test(str) || !/[)]/.test(str)) {
      return false;
    }
  }
  var strArr = str.split(/[-()\s]/g);
  var convertedNumber = strArr.join("");
  if (/\D/.test(convertedNumber)) {
    return false;
  }

  else if (convertedNumber.length == 11 && convertedNumber[0] != 1) {
    return false;
  }

  else if (convertedNumber.length != 10 && convertedNumber.length != 11) {
    return false;
  }
  else {
    return true;
  }
}

telephoneCheck("(6054756961)");
