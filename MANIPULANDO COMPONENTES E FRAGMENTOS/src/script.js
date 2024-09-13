import React from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";

class Header extends React.Component {
  render() {
    return (
      <header className="cabecalho">
        <h1 className="boasVindas">
          Bem vindo {this.props.name}
        </h1>
        <h2 className="titulo">
          Manipulando Componentes - Fragmentos
        </h2>
      </header>
    );
  }
}

ReactDOM.render(<Header name="Daniel Gomes" />, document.getElementById("root"));
