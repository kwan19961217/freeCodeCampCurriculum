class MyApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: "Envy of other people shows how they are unhappy. Their continual attention to others behavior shows how they are boring.",
      author: "Seneca",
      color: '#16a085',
      randomQuoteArr: [
      { quote: "Envy of other people shows how they are unhappy. Their continual attention to others behavior shows how they are boring.",
        author: "Seneca" },
      { quote: "Make the man who does wrong aware that the decent man is not only his superior in decency, but his superior in strength.",
        author: "Teddy Rosevelt" },
      { quote: "Train your expectation to appreciation.",
        author: "Tony Robbins" },
      { quote: "Without noticing we’re doing it, we treat the future as intrinsically more valuable than the present. And yet the future never seems to arrive.",
        author: "Oliver Burkeman" },
      { quote: "To get what you want, deserve what you want. Trust, success, and admiration are earned.",
        author: "Charlie Munger" },
      { quote: "Study without desire spoils the memory, and it retains nothing that it takes in.",
        author: "Leonardo da Vinci" },
      { quote: "The truth is revealed by removing things which stand in its light, an art, not unlike sculpture, in which the artist creates, not by building, but by hacking away.",
        author: "Alan Watts" },
      { quote: "We shall never have more time. We have, and have always had, all the time there is.",
        author: "Arnold Bennett" }],

      randomColor: ['#16a085',
      '#27ae60',
      '#2c3e50',
      '#f39c12',
      '#e74c3c',
      '#9b59b6',
      '#FB6964',
      '#342224',
      '#472E32',
      '#BDBB99',
      '#77B1A9',
      '#73A857'] };



    this.newQuote = this.newQuote.bind(this);
  }

  newQuote() {
    let random = Math.ceil(Math.random() * this.state.randomQuoteArr.length - 1);
    let randomColorIndex = Math.ceil(Math.random() * this.state.color.length - 1);
    this.setState((state) => (
    {
      quote: this.state.randomQuoteArr[random].quote,
      author: this.state.randomQuoteArr[random].author,
      color: this.state.randomColor[randomColorIndex] }));

  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "containerA", style: { backgroundColor: this.state.color } }, /*#__PURE__*/
      React.createElement("h1", { id: "header" }, "Random Quote Machine"), /*#__PURE__*/
      React.createElement("div", { id: "quote-box" }, /*#__PURE__*/
      React.createElement("div", { className: "quote-text" }, /*#__PURE__*/
      React.createElement("q", { id: "text", style: { color: this.state.color } }, this.state.quote)), /*#__PURE__*/

      React.createElement("div", { className: "author-text", style: { color: this.state.color } }, /*#__PURE__*/
      React.createElement("i", null, "-", /*#__PURE__*/React.createElement("span", { id: "author" }, this.state.author))), /*#__PURE__*/

      React.createElement("div", { className: "row-button" }, /*#__PURE__*/
      React.createElement("button", { id: "new-quote", style: { backgroundColor: this.state.color, borderColor: this.state.color }, onClick: this.newQuote }, "New Quote!"), /*#__PURE__*/
      React.createElement("a", { href: "https://twitter.com/intent/tweet?text=" + this.state.quote + "  -" + this.state.author, id: "tweet-quote", target: "_top", style: { backgroundColor: this.state.color, borderColor: this.state.color } }, "Twitter"))), /*#__PURE__*/


      React.createElement("footer", { id: "footer" }, "By Connor Kwan")));


  }}
;
ReactDOM.render( /*#__PURE__*/React.createElement(MyApp, null), document.getElementById("main"));