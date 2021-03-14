class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 1500,
      breaktime: 300 };

    this.timeChange = this.timeChange.bind(this);
    this.timeReset = this.timeReset.bind(this);
  }

  timeReset() {
    this.setState({
      time: 1500,
      breaktime: 300 });

  }

  timeChange(e) {
    switch (e.target.id) {
      case "break-decrement":
        if (this.state.breaktime > 60) {
          this.setState({
            breaktime: this.state.breaktime - 60 });

        }
        break;
      case "break-increment":
        if (this.state.breaktime < 3600) {
          this.setState({
            breaktime: this.state.breaktime + 60 });

        }
        break;
      case "session-decrement":
        if (this.state.time > 60) {
          this.setState({
            time: this.state.time - 60 });

        }
        break;
      case "session-increment":
        if (this.state.time < 3600) {
          this.setState({
            time: this.state.time + 60 });

        }
        break;}

  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "clockbody" }, /*#__PURE__*/
      React.createElement("div", { id: "title" }, /*#__PURE__*/
      React.createElement("h1", null, "25 + 5 Clock")), /*#__PURE__*/

      React.createElement("div", { id: "break-label" }, "Break Length", /*#__PURE__*/

      React.createElement("div", { className: "lengthBox" }, /*#__PURE__*/
      React.createElement("input", { type: "button", onClick: this.timeChange, id: "break-decrement", value: "\u2193" }), /*#__PURE__*/
      React.createElement("h3", { id: "break-length" }, this.state.breaktime / 60), /*#__PURE__*/
      React.createElement("input", { type: "button", onClick: this.timeChange, id: "break-increment", value: "\u2191" }))), /*#__PURE__*/


      React.createElement("div", { id: "session-label" }, "Session Length", /*#__PURE__*/

      React.createElement("div", { className: "lengthBox" }, /*#__PURE__*/
      React.createElement("input", { type: "button", onClick: this.timeChange, id: "session-decrement", value: "\u2193" }), /*#__PURE__*/
      React.createElement("h3", { id: "session-length" }, this.state.time / 60), /*#__PURE__*/
      React.createElement("input", { type: "button", onClick: this.timeChange, id: "session-increment", value: "\u2191" }))), /*#__PURE__*/


      React.createElement(Timer, { session: this.state.time, break: this.state.breaktime, timeReset: this.timeReset })));



  }}


class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: this.props.session,
      counting: false,
      function: "",
      mode: "Work" };

    this.countDown = this.countDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.reset = this.reset.bind(this);
    this.playAudio = this.playAudio.bind(this);
  }

  countDown() {
    this.setState({
      time: this.state.time - 1 });


    if (this.state.time == 0) {
      this.playAudio();
    }

    if (this.state.time < 0 && this.state.mode == "Work") {
      this.setState({
        time: this.props.break,
        mode: "Rest" });

    } else
    if (this.state.time < 0 && this.state.mode == "Rest") {
      this.setState({
        time: this.props.session,
        mode: "Work" });

    }
  }

  handleClick() {
    if (!this.state.counting) {
      this.state.function = setInterval(this.countDown, 1000);
      this.setState({
        counting: !this.state.counting });

    } else
    if (this.state.counting) {
      clearInterval(this.state.function);
      this.setState({
        counting: !this.state.counting });

    }
  }

  reset() {
    clearInterval(this.state.function);
    this.setState({
      mode: "Work",
      counting: false });

    this.playAudio();
    this.props.timeReset();
  }

  playAudio() {
    var audio = document.getElementById("beep");
    if (this.state.counting) {
      audio.play();
    } else
    {
      audio.pause();
      audio.currentTime = 0;
    }
  }

  componentWillReceiveProps(props) {
    this.setState({ time: props.session,
      mode: "Work" });
  }

  render() {

    const minuteleft = Math.floor(this.state.time / 60).toString().padStart(2, "0");
    const secondleft = Math.floor(this.state.time % 60).toString().padStart(2, "0");

    return /*#__PURE__*/(
      React.createElement("div", { id: "timerbody" }, /*#__PURE__*/
      React.createElement("div", { id: "timer-label" }, /*#__PURE__*/
      React.createElement("h3", null, this.state.mode)), /*#__PURE__*/

      React.createElement("div", { id: "time-left" }, /*#__PURE__*/
      React.createElement("h2", null, minuteleft, ":", secondleft)), /*#__PURE__*/

      React.createElement("div", { className: "controlButton" }, /*#__PURE__*/
      React.createElement("div", { id: "start_stop", onClick: this.handleClick }, /*#__PURE__*/
      React.createElement("audio", { src: "https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Electronic%20Hits/82[kb]tek-beep-up.wav.mp3", id: "beep" }), "Start/ Stop"), /*#__PURE__*/


      React.createElement("div", { id: "reset", onClick: this.reset }, /*#__PURE__*/
      React.createElement("audio", { src: "https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Electronic%20Hits/82[kb]tek-beep-up.wav.mp3", id: "beep" }), "Reset"))));





  }}


ReactDOM.render( /*#__PURE__*/React.createElement(Clock, null), document.getElementById("clock"));