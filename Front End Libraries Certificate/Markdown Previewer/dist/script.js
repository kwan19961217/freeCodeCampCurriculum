const renderer = new marked.Renderer();

marked.setOptions({ breaks: true });

class MyApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: defaulttext };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      content: e.target.value });

  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "container" }, /*#__PURE__*/
      React.createElement("div", { className: "header" }, /*#__PURE__*/
      React.createElement("h1", null, "Editor"), /*#__PURE__*/
      React.createElement("h1", null, "Previewer")), /*#__PURE__*/

      React.createElement("div", { className: "textContainer" }, /*#__PURE__*/
      React.createElement(Editor, { value: this.state.content, onChange: this.handleChange }), /*#__PURE__*/
      React.createElement(Previewer, { value: this.state.content }))));



  }}
;

const Editor = props => {
  return /*#__PURE__*/(
    React.createElement("div", { className: "container", id: "editorContainer" }, /*#__PURE__*/
    React.createElement("textarea", { rows: "65", cols: "70", id: "editor", value: props.value, onChange: props.onChange })));


};

const Previewer = props => {
  return /*#__PURE__*/(
    React.createElement("div", { className: "container", id: "previewerContainer" }, /*#__PURE__*/
    React.createElement("div", { dangerouslySetInnerHTML: {
        __html: marked(props.value, { renderer: renderer }) },
      id: "preview" })));


};

const defaulttext = `# Header1 
## Header2
[link to freecodecamp](https://www.freecodecamp.org/learn)

Inline Code \`<div></div>\`

Code Block
\`\`\`
<div>
  <h1></h1>
  <p></p>
</div>
\`\`\`
1. first item

2. second item

3. third item

> blockquote
>> blockquote 2

![image](https://news.cgtn.com/news/77416a4e3145544d326b544d354d444d3355444f31457a6333566d54/img/37d598e5a04344da81c76621ba273915/37d598e5a04344da81c76621ba273915.jpg)

**bold text**
`;
ReactDOM.render( /*#__PURE__*/React.createElement(MyApp, null), document.getElementById("main"));