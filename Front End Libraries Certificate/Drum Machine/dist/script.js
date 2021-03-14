function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}class MyApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "Press a key",
      pads: [{ name: "Hi Hat Closed", key: "Q", audio: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3", keyCode: 81, id: "hihatclosed" },
      { name: "Tom", key: "W", audio: "https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/909%20Extended/34[kb]909-HiTom-AD7.wav.mp3", keyCode: 87, id: "tom" },
      { name: "Crash", key: "E", audio: "https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/REAL%20LIVE%20KITS/Big%20and%20Heavy%20Real%20Drum%20Kit/102[kb]CRASH.aif.mp3", keyCode: 69, id: "crash" },
      { name: "Hi Hat Opened", key: "A", audio: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3", keyCode: 65, id: "hihatopened" },
      { name: "Snare", key: "S", audio: "https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/606%20Basic/25%5Bkb%5D606-snare1.wav.mp3", keyCode: 83, id: "snare" },
      { name: "Ride", key: "D", audio: "https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/909%20Extended/100[kb]909-Ride-D0.wav.mp3", keyCode: 68, id: "ride" },
      { name: "Hi Hat Hit", key: "Z", audio: "https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/STYLE%20KITS%20(Hip%20Hop,%20Etc)/Aggressive%20Electronic%20Kit/9[kb]hihat-pedal.wav.mp3", keyCode: 90, id: "hihathit" },
      { name: "Bass", key: "X", audio: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3", keyCode: 88, id: "bass" },
      { name: "Floor Tom", key: "C", audio: "https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/909%20Extended/30[kb]909-LoTom-3D0.wav.mp3", keyCode: 67, id: "floortom" }] };

    this.updateDisplay = this.updateDisplay.bind(this);
  }

  updateDisplay(e) {
    this.setState({ display: e });
  }

  render() {
    const drumpad = this.state.pads.map(pad => /*#__PURE__*/React.createElement(DrumPad, { n: pad.name, k: pad.key, a: pad.audio, i: pad.id, kc: pad.keyCode, updateDisplay: this.updateDisplay }));
    return /*#__PURE__*/(
      React.createElement("div", { className: "grid-container", id: "display" },
      drumpad, /*#__PURE__*/
      React.createElement("div", { id: "display", className: "display" }, /*#__PURE__*/React.createElement("i", null, this.state.display))));


  }}


class DrumPad extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "handleKeyDown",










    event => {
      if (event.keyCode === this.props.kc) {
        var audio = document.getElementById(this.props.k);
        audio.play();
        this.props.updateDisplay(this.props.n);
      }
    });this.playAudio = this.playAudio.bind(this);this.handleKeyDown = this.handleKeyDown.bind(this);}playAudio() {var audio = document.getElementById(this.props.k);audio.play();this.props.updateDisplay(this.props.n);}

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }


  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "drum-pad", onClick: this.playAudio, id: this.props.i }, /*#__PURE__*/
      React.createElement("audio", { className: "clip", src: this.props.a, id: this.props.k }),
      this.props.k));


  }}


ReactDOM.render( /*#__PURE__*/React.createElement(MyApp, null), document.getElementById("drum-machine"));