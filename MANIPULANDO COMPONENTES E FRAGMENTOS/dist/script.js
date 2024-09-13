import React from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";

class Header extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("header", { className: "cabecalho" }, /*#__PURE__*/
      React.createElement("h1", { className: "boasVindas" }, "Bem vindo ",
      this.props.name), /*#__PURE__*/

      React.createElement("h2", { className: "titulo" }, "Manipulando Componentes - Fragmentos")));




  }}


ReactDOM.render( /*#__PURE__*/React.createElement(Header, { name: "Daniel Gomes" }), document.getElementById("root"));