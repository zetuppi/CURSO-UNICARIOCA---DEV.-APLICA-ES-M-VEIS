import React, { useState } from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";

const dadosProdutosIniciais = [
{
  id: 1,
  nome: "Maçã",
  preco: 1.5,
  imagem:
  "https://hortifruti.com.br/media/catalog/product/cache/90a67334732b2408839e146d4f241496/1/0/100171-maca-red-unidade.jpg",
  estoque: 10,
  validade: "10/12/2024" },

{
  id: 2,
  nome: "Banana",
  preco: 1.0,
  imagem:
  "https://bretasatacarejo.vtexassets.com/arquivos/ids/179184/657b23df38591a033ade7d34.jpg?v=638381657306900000",
  estoque: 5,
  validade: "10/12/2024" },

{
  id: 3,
  nome: "Laranja",
  preco: 2.0,
  imagem:
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-6RgR0LEHqaVoUKC7d2XkK8CfxMu-tWMdpw&s",
  estoque: 9,
  validade: "10/12/2024" },

{
  id: 4,
  nome: "Leite",
  preco: 3.0,
  imagem:
  "https://ser.vitao.com.br/wp-content/uploads/2017/07/shutterstock_342000047-1.jpg",
  estoque: 9,
  validade: "10/12/2024" },

{
  id: 5,
  nome: "Pão",
  preco: 2.5,
  imagem:
  "https://panattos.com.br/uploads/produtos/2017/07/pao-frances-fermentacao-curta-massa-congelada.jpg",
  estoque: 20,
  validade: "10/12/2024" }];



function formatarPreco(preco) {
  // Adicionado crases para template literal
  return `R$ ${preco.toFixed(2)}`;
}

function calcularFrete(total, endereco) {
  let valorFrete = 10; // Valor base do frete
  const regiao = endereco ? endereco.uf : null;

  if (total < 20) {
    if (regiao === "RJ") {
      valorFrete = 5;
    } else if (regiao === "SP") {
      valorFrete = 7;
    } else {
      valorFrete = 10;
    }
  } else {
    valorFrete = 0; // Frete grátis acima de R$ 20
  }


  if (valorFrete > total * 0.5) {
    valorFrete = total * 0.5;
  }

  return valorFrete;
}

function gerarNumeroPedido() {
  return Math.floor(Math.random() * 1000000); // Gera um número aleatório de pedido
}

function ListaProdutos({ produtos, adicionarAoCarrinho }) {
  const [quantidades, setQuantidades] = useState({});

  const handleQuantidadeChange = (id, value) => {
    setQuantidades(prev => ({ ...prev, [id]: value }));
  };

  return /*#__PURE__*/(
    React.createElement("div", { className: "product-list" }, /*#__PURE__*/
    React.createElement("ul", { className: "produtos-lista" },
    produtos.map((produto) => /*#__PURE__*/
    React.createElement("li", { key: produto.id }, /*#__PURE__*/
    React.createElement("p", null, produto.nome), /*#__PURE__*/
    React.createElement("img", {
      src: produto.imagem,
      alt: produto.nome,
      className: "produto-imagem" }), /*#__PURE__*/

    React.createElement("div", { className: "produto-preco" }, " Pre\xE7o:", formatarPreco(produto.preco)), /*#__PURE__*/

    React.createElement("p", null, "Validade:", produto.validade), /*#__PURE__*/
    React.createElement("input", {
      type: "number",
      value: quantidades[produto.id] || 1,
      min: "1",
      max: produto.estoque,
      onChange: e => {
        const valor = Math.min(
        Number(e.target.value),
        produto.estoque);

        handleQuantidadeChange(produto.id, valor);
      },
      className: "produto-quantidade" }), /*#__PURE__*/

    React.createElement("button", {
      onClick: () => {
        const quantidade = parseInt(quantidades[produto.id]) || 1;
        if (quantidade > produto.estoque) {
          // Adicionado crases para template literal
          alert(`Quantidade disponível: ${produto.estoque}`);
        } else {
          adicionarAoCarrinho(produto, quantidade);
        }
      },
      className: "produto-botao" }, "Adicionar ao Carrinho"))))));








}

function Carrinho({
  itensCarrinho,
  produtos,
  atualizarQuantidade,
  removerDoCarrinho,
  endereco })
{
  const total = itensCarrinho.reduce(
  (acc, item) => acc + item.preco * item.quantidade,
  0);

  const valorFrete = endereco ? calcularFrete(total, endereco) : 0; // Calcular frete somente se o endereço estiver definido
  const temFreteGratis = total >= 20;

  const finalizarCompra = () => {
    if (!endereco) {
      alert("Por favor, informe o CEP para finalizar a compra.");
    } else {
      const numeroPedido = gerarNumeroPedido();
      const mensagem = `
        Pedido nº: ${numeroPedido}
        Endereço: ${endereco.logradouro}, ${endereco.bairro}, ${endereco.localidade} - ${endereco.uf}
        Produtos: ${itensCarrinho.
      map(item => `${item.nome} (x${item.quantidade})`).
      join(", ")}
        Total dos Produtos: ${formatarPreco(total)}
        Frete: ${
      temFreteGratis ? "Grátis" : formatarPreco(valorFrete)
      }
        Total da Compra: ${formatarPreco(
      total + (temFreteGratis ? 0 : valorFrete))
      }
      `;
      alert(mensagem);
    }
  };

  return /*#__PURE__*/(
    React.createElement("div", { className: "carrinho" }, /*#__PURE__*/
    React.createElement("h2", null, "Carrinho de Compras"),
    itensCarrinho.length === 0 ? /*#__PURE__*/
    React.createElement("p", null, "Seu carrinho est\xE1 vazio.") : /*#__PURE__*/

    React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement("ul", null,
    itensCarrinho.map(item => {
      const produtoAtual = produtos.find(p => p.id === item.id);
      const estoqueDisponivel = produtoAtual ?
      produtoAtual.estoque :
      0;
      return /*#__PURE__*/(
        React.createElement("li", { key: item.id }, /*#__PURE__*/
        React.createElement("img", {
          src: produtoAtual.imagem,
          alt: item.nome,
          className: "produto-imagem" }),

        item.nome, " - ", formatarPreco(item.preco), " x", /*#__PURE__*/
        React.createElement("input", {
          type: "number",
          value: item.quantidade,
          min: "1",
          max: estoqueDisponivel + item.quantidade,
          onChange: e => {
            const novaQuantidade = Math.min(
            Number(e.target.value),
            estoqueDisponivel + item.quantidade);

            atualizarQuantidade(item.id, novaQuantidade);
          },
          style: { width: "50px", marginLeft: "5px" } }), /*#__PURE__*/

        React.createElement("button", {
          onClick: () => removerDoCarrinho(item.id),
          className: "remove-btn" }, "Remover")));





    })), /*#__PURE__*/

    React.createElement("h3", null, "Total: ", formatarPreco(total)),
    endereco ? /*#__PURE__*/
    React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement("h3", null, "Frete: ", formatarPreco(valorFrete)),
    temFreteGratis ? /*#__PURE__*/
    React.createElement("p", { className: "entrega-gratis" }, "Parab\xE9ns! Voc\xEA ganhou frete gr\xE1tis.") : /*#__PURE__*/



    React.createElement("p", null, "Adicione mais ",
    formatarPreco(20 - total), " para ganhar frete gr\xE1tis (a partir de R$ 20).")) : /*#__PURE__*/





    React.createElement("p", null, "Por favor, informe seu CEP para calcular o frete."),

    !temFreteGratis && endereco && /*#__PURE__*/
    React.createElement("p", null, "Adicione mais ", formatarPreco(20 - total), " para ganhar frete gr\xE1tis."), /*#__PURE__*/

    React.createElement("button", { onClick: finalizarCompra, className: "finalizar-btn" }, "Finalizar Compras"))));






}

function BuscarEndereco({ setEndereco }) {
  const [cep, setCep] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  const handleBuscar = async e => {
    e.preventDefault();
    const cepLimpo = cep.replace(/\D/g, "");
    if (cepLimpo.length !== 8) {
      setErro("CEP inválido. Deve conter 8 dígitos.");
      setEndereco(null);
      return;
    }

    setCarregando(true);
    setErro(null);

    try {
      // Adicionado crases para template literal
      const response = await fetch(
      `https://viacep.com.br/ws/${cepLimpo}/json/`);

      const data = await response.json();
      if (data.erro) {
        setErro("CEP não encontrado.");
        setEndereco(null);
      } else {
        setEndereco(data);
      }
    } catch (err) {
      setErro("Erro ao buscar o CEP. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  };

  return /*#__PURE__*/(
    React.createElement("div", { className: "buscar-endereco" }, /*#__PURE__*/
    React.createElement("h2", null, "Buscar Endere\xE7o pelo CEP"), /*#__PURE__*/
    React.createElement("form", { onSubmit: handleBuscar }, /*#__PURE__*/
    React.createElement("input", {
      type: "text",
      value: cep,
      onChange: e => setCep(e.target.value),
      placeholder: "Digite o CEP (ex: 01001-000)",
      maxLength: "9",
      className: "input-cep" }), /*#__PURE__*/

    React.createElement("button", { type: "submit", className: "botao-buscar" }, "Buscar")),



    carregando && /*#__PURE__*/React.createElement("p", null, "Buscando endere\xE7o..."),
    erro && /*#__PURE__*/React.createElement("p", { className: "erro" }, erro)));


}

function App() {
  const [produtos, setProdutos] = useState(dadosProdutosIniciais);
  const [itensCarrinho, setItensCarrinho] = useState([]);
  const [endereco, setEndereco] = useState(null);

  const adicionarAoCarrinho = (produto, quantidade) => {
    setItensCarrinho(prevItens => {
      const itemExistente = prevItens.find(item => item.id === produto.id);
      if (itemExistente) {
        return prevItens.map((item) =>
        item.id === produto.id ?
        { ...item, quantidade: item.quantidade + quantidade } :
        item);

      } else {
        return [
        ...prevItens,
        { id: produto.id, nome: produto.nome, preco: produto.preco, quantidade }];

      }
    });

    setProdutos((prevProdutos) =>
    prevProdutos.map((p) =>
    p.id === produto.id ? { ...p, estoque: p.estoque - quantidade } : p));


  };

  const atualizarQuantidade = (id, novaQuantidade) => {
    setItensCarrinho((prevItens) =>
    prevItens.map(item => {
      if (item.id === id) {
        const itemAtual = prevItens.find(i => i.id === id);
        const diferenca = novaQuantidade - itemAtual.quantidade;
        const produto = produtos.find(p => p.id === id);
        const novoEstoque = produto.estoque - diferenca;

        setProdutos((prevProdutos) =>
        prevProdutos.map((p) =>
        p.id === id ? { ...p, estoque: novoEstoque } : p));



        return { ...item, quantidade: novaQuantidade };
      }
      return item;
    }));

  };

  const removerDoCarrinho = id => {
    const itemRemovido = itensCarrinho.find(item => item.id === id);
    if (itemRemovido) {
      setProdutos((prevProdutos) =>
      prevProdutos.map((p) =>
      p.id === id ? { ...p, estoque: p.estoque + itemRemovido.quantidade } : p));


    }

    setItensCarrinho(prevItens => prevItens.filter(item => item.id !== id));
  };

  return /*#__PURE__*/(
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("img", { src: "https://github.com/zetuppi/CURSO-UNICARIOCA---DEV.-APLICA-ES-M-VEIS/blob/main/unnamed.png?raw=true", class: "imagem-banner" }), /*#__PURE__*/

    React.createElement(ListaProdutos, { produtos: produtos, adicionarAoCarrinho: adicionarAoCarrinho }), /*#__PURE__*/
    React.createElement(Carrinho, {
      itensCarrinho: itensCarrinho,
      produtos: produtos,
      atualizarQuantidade: atualizarQuantidade,
      removerDoCarrinho: removerDoCarrinho,
      endereco: endereco }), /*#__PURE__*/

    React.createElement(BuscarEndereco, { setEndereco: setEndereco }),
    endereco && /*#__PURE__*/
    React.createElement("div", { className: "resultado-endereco" }, /*#__PURE__*/
    React.createElement("p", null, /*#__PURE__*/
    React.createElement("strong", null, "Endere\xE7o:"), " ", endereco.logradouro, ", ", endereco.bairro), /*#__PURE__*/

    React.createElement("p", null, /*#__PURE__*/
    React.createElement("strong", null, "Cidade:"), " ", endereco.localidade, " - ", endereco.uf))));





}

// Atualizado para React 18 usando createRoot
const rootElement = document.getElementById("root");
ReactDOM.render( /*#__PURE__*/React.createElement(App, null), rootElement);