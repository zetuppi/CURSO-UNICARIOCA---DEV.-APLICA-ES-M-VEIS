import React from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";
const root = ReactDOM.createRoot(document.getElementById('root'));

class Clock extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("h1", null, "Ol\xE1, Mundo!"), /*#__PURE__*/
      React.createElement("h2", null, "Hor\xE1rio: ", this.props.date.toLocaleTimeString(), ".")));


  }}


function tick() {
  root.render( /*#__PURE__*/React.createElement(Clock, { date: new Date() }));
}
setInterval(tick, 1000);