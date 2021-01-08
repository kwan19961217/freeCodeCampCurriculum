function convertToRoman(num) {
    let romanArr = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
    let numberArr = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    let convertedArr = [];
    let i = 0;
    const converter = (n) => {
        if (n == numberArr[i]) {
            convertedArr.push(romanArr[i]);
            return convertedArr;
            
        }
        else if (n / numberArr[i] >= 1) {
            convertedArr.push(romanArr[i]);
            converter(n - numberArr[i]);
            return convertedArr;
        }
        else {
            i++;
            converter(n);
        }
    }
    converter(num);
 return convertedArr.join("");
}

convertToRoman(39);
