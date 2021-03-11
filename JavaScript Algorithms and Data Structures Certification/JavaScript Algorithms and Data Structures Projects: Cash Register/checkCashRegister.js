function checkCashRegister(price, cash, cid) {
  var change = [];
  var changeAmount = cash - price;
  var cashAvailable = 0;
  var result = {status: "",change: [],
  }
  const currency = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];
  const unit = ["ONE HUNDRED", "TWENTY", "TEN", "FIVE", "ONE", "QUARTER", "DIME", "NICKEL", "PENNY"];
  var i = 0;
  const changeCounter = (amount, change) => {
    if ((amount * 100) % (currency[i] * 100) == 0) {
   
      if (amount == change[change.length - i - 1][1]) {
        result.status = "CLOSED";
        result.change = cid;
        return result;
      }
      else if (change[change.length - i - 1][1] > amount) {
        result.status = "OPEN";
        result.change.push([unit[i], (currency[i] * Math.floor(amount / currency[i]))]);
        return result;
      }
      else if (i != currency.length - 1) {
        if (amount < change[change.length - i - 1][1]) {
          result.change.push([unit[i], (currency[i] * Math.floor(amount / currency[i]))]);
          amount = amount - change[change.length - i - 1][1];
        }
        i++;
        changeCounter(amount, change);
        return result;
      }
      else {
        result.status = "INSUFFICIENT_FUNDS";
        result.change = [];
        return result;
      }
    }
    else if (Math.floor(amount / currency[i]) > 0) {
      if (change[change.length - i - 1][1] >= (currency[i] * Math.floor(amount / currency[i]))) {
        result.change.push([unit[i], (currency[i] * Math.floor(amount / currency[i]))]);
        amount = Math.round((amount - currency[i] * Math.floor(amount / currency[i])) * 100) / 100;
      }
      else {
        result.change.push([unit[i], change[change.length - i - 1][1]]);
        amount = Math.round((amount - change[change.length - i - 1][1]) * 100) / 100;
      }
      i++;
      changeCounter(amount, change);
      return result;
    }
    else {
      i++;
      changeCounter(amount, change);
      return result;
    }
  };
  for (let i = 0; i < cid.length - 1; i++) {
    cashAvailable += cid[i][1];
  }

  if (changeAmount > cashAvailable){
    result.status = "INSUFFICIENT_FUNDS";
    result.change = [];
    return result;
  }
  return changeCounter(changeAmount, cid);
}

checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);
