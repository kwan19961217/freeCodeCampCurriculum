function palindrome(str) {
  const checkPalindrome = (index1, index2) => {
    if (index1 == 0 && index2 == cleanStr.length - 1 && cleanStr[index1] == cleanStr[index2]) {
      return true;
    }
    else if (cleanStr[index1] !== cleanStr[index2]) {
      return false;
    }
    else {
      if(checkPalindrome(index1 - 1, index2 + 1)){
        return true;
      }
      else{
        return false;
      };
    }
  };
  str = str.toLowerCase();
  var strArr = str.split(/[^a-z0-9]+/gi);
  var cleanStr = strArr.join("");
  var cleanStrArr = cleanStr.split("");
  if (cleanStr.length % 2 == 0) {
    let i = cleanStr.length / 2 - 1;
    let j = i + 1;
    return checkPalindrome(i, j);
  }
  else {
    let i = cleanStr.length / 2 - 1.5;
    let j = i + 2;
    return checkPalindrome(i, j);
  }
}
palindrome("My age is 0, 0 si ega ym");
