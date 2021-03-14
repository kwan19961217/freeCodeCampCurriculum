class MyCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: "",
      display: "0",
      numbers: [
      { digit: 0,
        name: "zero" },
      { digit: 1,
        name: "one" },
      { digit: 2,
        name: "two" },
      { digit: 3,
        name: "three" },
      { digit: 4,
        name: "four" },
      { digit: 5,
        name: "five" },
      { digit: 6,
        name: "six" },
      { digit: 7,
        name: "seven" },
      { digit: 8,
        name: "eight" },
      { digit: 9,
        name: "nine" }] };


    this.Input = this.Input.bind(this);
    this.DecimalInput = this.DecimalInput.bind(this);
    this.Clear = this.Clear.bind(this);
    this.Sign = this.Sign.bind(this);
    this.Equal = this.Equal.bind(this);
  }

  Input(e) {
    if (this.state.history === "") {
      this.setState({
        history: `${e.target.value}`,
        display: `${e.target.value}` });

    } else
    if (this.state.history === "0" && /[1-9]/.test(e.target.value) === true) {
      this.setState({
        history: `${e.target.value}`,
        display: `${e.target.value}` });

    } else

    if (this.state.history === "0" && e.target.value === "0") {
      return false;
    } else

    if (this.state.display === "+" || this.state.display === "-" || this.state.display === "/" || this.state.display === "*") {
      this.setState({
        history: `${this.state.history}${e.target.value}`,
        display: `${e.target.value}` });

    } else

    {
      this.setState({
        history: `${this.state.history}${e.target.value}`,
        display: `${this.state.display}${e.target.value}` });

    }
  }

  DecimalInput() {
    if (/\./.test(this.state.display) == true) {
      return false;
    } else
    if (this.state.history == "" || this.state.display === "+" || this.state.display === "-" || this.state.display === "/" || this.state.display === "*") {
      this.setState({
        history: `${this.state.history}0.`,
        display: `0.` });

    } else
    {
      this.setState({
        history: `${this.state.history}.`,
        display: `${this.state.display}.` });

    }
  }

  Sign(e) {
    switch (e.target.value) {
      case "+":
      case "*":
      case "/":
        if (this.state.display == "+" || this.state.display == "-" || this.state.display == "*" || this.state.display == "/") {
          if (/[+\-*/]/.test(this.state.history.slice(-2, -1)) && /[+\-*/]/.test(this.state.history.slice(-1))) {
            this.setState({
              history: `${this.state.history.slice(0, -2)}${e.target.value}`,
              display: e.target.value });

          } else
          {
            this.setState({
              history: `${this.state.history.slice(0, -1)}${e.target.value}`,
              display: e.target.value });

          }
        } else
        {
          this.setState({
            history: `${this.state.history}${e.target.value}`,
            display: e.target.value });

        }
        break;
      case "-":
        if (this.state.history.length == 1 && /[0-9]/.test(this.state.history) == false) {
          this.setState({
            history: e.target.value,
            display: e.target.value });

        } else
        if (/[+\-*/]/.test(this.state.history.slice(-2, -1)) && /[+\-*/]/.test(this.state.history.slice(-1))) {
          this.setState({
            history: `${this.state.history.slice(0, -2)}${e.target.value}`,
            display: e.target.value });

        } else
        {
          this.setState({
            history: `${this.state.history}${e.target.value}`,
            display: e.target.value });

        }
        break;}

  }

  Equal() {
    if (/--/.test(this.state.history)) {
      const arr = this.state.history.split("");
      let index = arr.indexOf("-");
      arr.splice(index + 1, 0, " ");
      let str = arr.join("");
      let answer = eval(str);
      this.setState({
        history: `${answer}`,
        display: answer });

    }
    let answer = eval(this.state.history);
    this.setState({
      history: `${answer}`,
      display: answer });

  }


  Clear() {
    this.setState({
      history: "",
      display: "0",
      answer: "" });

  }

  render() {

    const numberButton = this.state.numbers.map(number => /*#__PURE__*/React.createElement("input", { id: number.name, type: "button", onClick: this.Input, value: number.digit }));

    return /*#__PURE__*/(
      React.createElement("div", { id: "calBox" }, /*#__PURE__*/
      React.createElement("div", { class: "displayBox" }, /*#__PURE__*/
      React.createElement("div", { id: "history" },
      this.state.history), /*#__PURE__*/

      React.createElement("div", { id: "display" },
      this.state.display)), /*#__PURE__*/


      React.createElement("div", { class: "signButton", id: "equalButton" }, /*#__PURE__*/
      React.createElement("input", { id: "equals", type: "button", onClick: this.Equal, value: "=" })), /*#__PURE__*/

      React.createElement("div", { class: "signButton", id: "addButton" }, /*#__PURE__*/
      React.createElement("input", { id: "add", type: "button", onClick: this.Sign, value: "+" })), /*#__PURE__*/

      React.createElement("div", { class: "signButton", id: "subtractButton" }, /*#__PURE__*/
      React.createElement("input", { id: "subtract", type: "button", onClick: this.Sign, value: "-" })), /*#__PURE__*/

      React.createElement("div", { class: "signButton", id: "multiplyButton" }, /*#__PURE__*/
      React.createElement("input", { id: "multiply", type: "button", onClick: this.Sign, value: "*" })), /*#__PURE__*/

      React.createElement("div", { class: "signButton", id: "divideButton" }, /*#__PURE__*/
      React.createElement("input", { id: "divide", type: "button", onClick: this.Sign, value: "/" })), /*#__PURE__*/

      React.createElement("div", { class: "decimalButton" }, /*#__PURE__*/
      React.createElement("input", { id: "decimal", type: "button", onClick: this.DecimalInput, value: "." })), /*#__PURE__*/

      React.createElement("div", { class: "clearButton" }, /*#__PURE__*/
      React.createElement("input", { id: "clear", type: "button", onClick: this.Clear, value: "AC" })), /*#__PURE__*/

      React.createElement("div", { class: "numberButton" },
      numberButton)));



  }}



ReactDOM.render( /*#__PURE__*/React.createElement(MyCalculator, null), document.getElementById("calculator"));