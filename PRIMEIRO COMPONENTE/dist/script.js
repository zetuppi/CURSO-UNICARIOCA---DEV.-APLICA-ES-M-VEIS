import React from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";

class Ola extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("h1", null, "Ol\xE1, ", this.props.name, "!");
  }}


class OlaComEstado extends React.Component {

  constructor(props) {
    super(props);

    let firstName = this.props.name.split(" ")[0];
    this.state = { name: firstName };
  }
  render() {return /*#__PURE__*/React.createElement("h1", null, "Ol\xE1, ", this.state.name, "!");}}


ReactDOM.render( /*#__PURE__*/React.createElement(Ola, { name: "Maria Madalena" }), document.getElementById('principal'));

ReactDOM.render( /*#__PURE__*/React.createElement(OlaComEstado, { name: "Maria" }), document.getElementById('principalComEstado'));