function steamrollArray(arr) {
  var flattedArr = [];
  const checkArr = (element) => {
    if (!Array.isArray(element)) {
      flattedArr.push(element);
    }
    else {
      for (let i = 0; i < element.length; i++) {
        checkArr(element[i]);
      };
    }
  };
  checkArr(arr);
  console.log(flattedArr);
  return flattedArr;
}

steamrollArray([1, [2], [3, [[4]]]]);
