import React, { useState, useEffect } from "https://esm.sh/react";
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

function ListaProdutos({ produtos, adicionarAoCarrinho, itensCarrinho }) {
  const [quantidades, setQuantidades] = useState({});

  const handleQuantidadeChange = (id, value) => {
    setQuantidades(prev => ({ ...prev, [id]: value }));
  };

  return /*#__PURE__*/(
    React.createElement("div", { className: "product-list" }, /*#__PURE__*/
    React.createElement("ul", { className: "produtos-lista" },
    produtos.map(produto => {
      // Encontrar a quantidade já no carrinho para este produto
      const itemNoCarrinho = itensCarrinho.find(item => item.id === produto.id);
      const quantidadeNoCarrinho = itemNoCarrinho ? itemNoCarrinho.quantidade : 0;
      const quantidadeDisponivel = produto.estoque - quantidadeNoCarrinho;

      return /*#__PURE__*/(
        React.createElement("li", { key: produto.id }, /*#__PURE__*/
        React.createElement("p", null, produto.nome), /*#__PURE__*/
        React.createElement("img", {
          src: produto.imagem,
          alt: produto.nome,
          className: "produto-imagem" }), /*#__PURE__*/

        React.createElement("div", { className: "produto-preco" }, "Pre\xE7o: ", formatarPreco(produto.preco)), /*#__PURE__*/
        React.createElement("p", null, "Validade: ", produto.validade), /*#__PURE__*/
        React.createElement("input", {
          type: "number",
          value: quantidades[produto.id] || 1,
          min: "1",
          max: quantidadeDisponivel > 0 ? quantidadeDisponivel : 0,
          onChange: e => {
            let valor = Number(e.target.value);
            // Garantir que o valor não exceda a quantidade disponível
            if (valor > quantidadeDisponivel) {
              valor = quantidadeDisponivel;
            }
            if (valor < 1) {
              valor = 1;
            }
            setQuantidades(prev => ({ ...prev, [produto.id]: valor }));
          },
          className: "produto-quantidade",
          disabled: quantidadeDisponivel <= 0 }), /*#__PURE__*/

        React.createElement("button", {
          onClick: () => {
            const quantidade = parseInt(quantidades[produto.id]) || 1;
            if (quantidade > quantidadeDisponivel) {
              alert(`Quantidade disponível: ${quantidadeDisponivel}`);
            } else {
              adicionarAoCarrinho(produto, quantidade);
            }
          },
          className: "btn-admin",
          disabled: quantidadeDisponivel <= 0 },

        quantidadeDisponivel > 0 ? "Adicionar ao Carrinho" : "Estoque Esgotado")));



    }))));



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
  const valorParaFreteGratis = 20 - total;

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
                Frete: ${temFreteGratis ? "Grátis" : formatarPreco(valorFrete)}
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
            let novaQuantidade = Number(e.target.value);
            // Garantir que a nova quantidade não exceda o estoque
            if (novaQuantidade > estoqueDisponivel + item.quantidade) {
              novaQuantidade = estoqueDisponivel + item.quantidade;
              alert(`Quantidade disponível: ${estoqueDisponivel + item.quantidade}`);
            }
            if (novaQuantidade < 1) {
              novaQuantidade = 1;
            }
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
    formatarPreco(valorParaFreteGratis), " para ganhar frete gr\xE1tis (a partir de R$ 20).")) : /*#__PURE__*/




    React.createElement("p", null, "Por favor, informe seu CEP para calcular o frete."), /*#__PURE__*/


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
      const response = await fetch(
      `https://viacep.com.br/ws/${cepLimpo}/json/`);

      const data = await response.json();
      if (data.erro) {
        setErro("CEP não encontrado.");
        setEndereco(null);
      } else {
        setEndereco(data);
      }
    } catch (error) {
      setErro("Erro ao buscar CEP.");
      setEndereco(null);
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

    React.createElement("button", { type: "submit", className: "botao-buscar", disabled: carregando },
    carregando ? "Buscando..." : "Buscar")),


    carregando && /*#__PURE__*/React.createElement("p", null, "Buscando endere\xE7o..."),
    erro && /*#__PURE__*/React.createElement("p", { className: "erro" }, erro)));


}

function LoginCliente({ setClienteLogado, clientes, setShowCadastro, setShowLoginAdmin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const handleLogin = () => {
    const clienteEncontrado = clientes.find(
    cliente => cliente.email === email && cliente.senha === senha);

    if (clienteEncontrado) {
      alert("Login de Cliente bem-sucedido!");
      setClienteLogado(true);
    } else {
      alert("Credenciais inválidas.");
    }
  };
  return /*#__PURE__*/(
    React.createElement("div", { className: "login-container login-form" }, /*#__PURE__*/
    React.createElement("h2", null, "Login Cliente"), /*#__PURE__*/
    React.createElement("input", {
      type: "email",
      placeholder: "Email",
      value: email,
      onChange: e => setEmail(e.target.value) }), /*#__PURE__*/

    React.createElement("input", {
      type: "password",
      placeholder: "Senha",
      value: senha,
      onChange: e => setSenha(e.target.value) }), /*#__PURE__*/

    React.createElement("button", { onClick: handleLogin }, "Entrar"), /*#__PURE__*/
    React.createElement("div", { className: "cadastro-container" }, /*#__PURE__*/
    React.createElement("button", { onClick: () => setShowCadastro(true), className: "botao-cadastro" }, "Cadastrar Cliente"), /*#__PURE__*/


    React.createElement("button", { onClick: () => setShowLoginAdmin(true), className: "botao-login-admin" }, "Login Admin"))));





}

function CadastroCliente({ setShowCadastro, setClientes, clientes }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleCadastro = () => {
    if (!nome || !email || !senha) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const emailExistente = clientes.find(cliente => cliente.email === email);
    if (emailExistente) {
      alert("Email já cadastrado.");
      return;
    }

    const novoCliente = { nome, email, senha };
    const novosClientes = [...clientes, novoCliente];
    setClientes(novosClientes);
    localStorage.setItem("clientes", JSON.stringify(novosClientes));

    alert(`Cliente cadastrado: ${nome}, ${email}`);
    setNome("");
    setEmail("");
    setSenha("");
    setShowCadastro(false);
  };

  return /*#__PURE__*/(
    React.createElement("div", { className: "login-container login-form" }, /*#__PURE__*/
    React.createElement("h2", null, "Cadastro Cliente"), /*#__PURE__*/
    React.createElement("input", {
      type: "text",
      placeholder: "Nome",
      value: nome,
      onChange: e => setNome(e.target.value) }), /*#__PURE__*/

    React.createElement("input", {
      type: "email",
      placeholder: "Email",
      value: email,
      onChange: e => setEmail(e.target.value) }), /*#__PURE__*/

    React.createElement("input", {
      type: "password",
      placeholder: "Senha",
      value: senha,
      onChange: e => setSenha(e.target.value) }), /*#__PURE__*/

    React.createElement("button", { onClick: handleCadastro }, "Cadastrar"), /*#__PURE__*/
    React.createElement("button", { onClick: () => setShowCadastro(false), className: "Cadastrar" }, "Voltar")));




}

function LoginAdmin({ setAdminLogado, setShowLoginAdmin, admins, setAdminAtual }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = () => {
    const adminEncontrado = admins.find(admin => admin.email === email && admin.senha === senha);
    if (adminEncontrado) {
      alert("Login de Admin bem-sucedido!");
      setAdminLogado(true);
      setAdminAtual(adminEncontrado); // Armazena o admin logado
      setShowLoginAdmin(false);
    } else {
      alert("Credenciais inválidas.");
    }
  };

  return /*#__PURE__*/(
    React.createElement("div", { className: "login-container login-form" }, /*#__PURE__*/
    React.createElement("h2", null, "Login Admin"), /*#__PURE__*/
    React.createElement("input", { type: "email", value: email, onChange: e => setEmail(e.target.value), placeholder: "Email" }), /*#__PURE__*/
    React.createElement("input", { type: "password", value: senha, onChange: e => setSenha(e.target.value), placeholder: "Senha" }), /*#__PURE__*/
    React.createElement("button", { className: "btn-admin", onClick: handleLogin }, "Entrar"), /*#__PURE__*/
    React.createElement("button", { className: "btn-admin", onClick: () => setShowLoginAdmin(false) }, "Voltar")));


}

function ListaProdutosAdmin({ produtos, editarProduto, excluirProduto, setTelaAdmin }) {
  return /*#__PURE__*/(
    React.createElement("div", { className: "lista-produtos-admin" }, /*#__PURE__*/
    React.createElement("h3", null, "Produtos Cadastrados"), /*#__PURE__*/
    React.createElement("ul", null,
    produtos.map((produto) => /*#__PURE__*/
    React.createElement("li", { key: produto.id }, /*#__PURE__*/
    React.createElement("img", { src: produto.imagem, alt: produto.nome, className: "produto-imagem" }), /*#__PURE__*/
    React.createElement("p", null, produto.nome), /*#__PURE__*/
    React.createElement("p", null, "Pre\xE7o: ", formatarPreco(produto.preco)), /*#__PURE__*/
    React.createElement("p", null, "Estoque: ", produto.estoque), /*#__PURE__*/
    React.createElement("p", null, "Validade: ", produto.validade), /*#__PURE__*/
    React.createElement("button", { className: "btn-admin", onClick: () => editarProduto(produto) }, "Editar"), /*#__PURE__*/
    React.createElement("button", { className: "btn-admin-excluir", onClick: () => excluirProduto(produto.id) }, "Excluir")))), /*#__PURE__*/



    React.createElement("button", { className: "btn-admin-logout", onClick: () => setTelaAdmin('dashboard') }, "Voltar")));




}

function CadastroAdmin({ setShowCadastroAdmin, setAdmins, admins, setTelaAdmin }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleCadastro = () => {
    if (!nome || !email || !senha) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    const emailExistente = admins.find(admin => admin.email === email);
    if (emailExistente) {
      alert("Email já cadastrado.");
      return;
    }
    const novoAdmin = { nome, email, senha };
    const novosAdmins = [...admins, novoAdmin];
    setAdmins(novosAdmins);
    localStorage.setItem("admins", JSON.stringify(novosAdmins));
    alert(`Admin cadastrado: ${nome}, ${email}`);
    setNome("");
    setEmail("");
    setSenha("");
    setShowCadastroAdmin(false);
  };

  return /*#__PURE__*/(
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("h2", null, "Cadastro Admin"), /*#__PURE__*/
    React.createElement("input", { type: "text", value: nome, onChange: e => setNome(e.target.value), placeholder: "Nome" }), /*#__PURE__*/
    React.createElement("input", { type: "email", value: email, onChange: e => setEmail(e.target.value), placeholder: "Email" }), /*#__PURE__*/
    React.createElement("input", { type: "password", value: senha, onChange: e => setSenha(e.target.value), placeholder: "Senha" }), /*#__PURE__*/
    React.createElement("button", { onClick: handleCadastro }, "Cadastrar"), /*#__PURE__*/
    React.createElement("button", { onClick: () => setTelaAdmin('dashboard'), className: "botao-voltar" }, "Voltar")));


}


function CadastroProduto({ adicionarProduto, produtoEditando, editarProduto, setTelaAdmin }) {
  const [nome, setNome] = useState(produtoEditando ? produtoEditando.nome : "");
  const [preco, setPreco] = useState(produtoEditando ? produtoEditando.preco : "");
  const [imagem, setImagem] = useState(produtoEditando ? produtoEditando.imagem : "");
  const [estoque, setEstoque] = useState(produtoEditando ? produtoEditando.estoque : "");
  const [validade, setValidade] = useState(produtoEditando ? produtoEditando.validade : "");

  useEffect(() => {
    if (produtoEditando) {
      setNome(produtoEditando.nome);
      setPreco(produtoEditando.preco);
      setImagem(produtoEditando.imagem);
      setEstoque(produtoEditando.estoque);
      setValidade(produtoEditando.validade);
    } else {
      setNome("");
      setPreco("");
      setImagem("");
      setEstoque("");
      setValidade("");
    }
  }, [produtoEditando]);

  const handleAdicionarProduto = () => {
    if (!nome || !preco || !imagem || !estoque || !validade) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    const novoProduto = {
      id: produtoEditando ? produtoEditando.id : Date.now(),
      nome,
      preco: parseFloat(preco),
      imagem,
      estoque: parseInt(estoque),
      validade };

    if (produtoEditando) {
      editarProduto(novoProduto);
      alert(`Produto "${nome}" atualizado com sucesso!`);
    } else {
      adicionarProduto(novoProduto);
      alert(`Produto "${nome}" adicionado com sucesso!`);
    }
    setTelaAdmin('dashboard');
  };

  return /*#__PURE__*/(
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("h2", null, produtoEditando ? "Editar Produto" : "Cadastrar Novo Produto"), /*#__PURE__*/
    React.createElement("input", { type: "text", value: nome, onChange: e => setNome(e.target.value), placeholder: "Nome do Produto" }), /*#__PURE__*/
    React.createElement("input", { type: "text", value: preco, onChange: e => setPreco(e.target.value), placeholder: "Pre\xE7o" }), /*#__PURE__*/
    React.createElement("input", { type: "text", value: imagem, onChange: e => setImagem(e.target.value), placeholder: "URL da Imagem" }), /*#__PURE__*/
    React.createElement("input", { type: "text", value: estoque, onChange: e => setEstoque(e.target.value), placeholder: "Estoque" }), /*#__PURE__*/
    React.createElement("input", { type: "text", value: validade, onChange: e => setValidade(e.target.value), placeholder: "Validade" }), /*#__PURE__*/
    React.createElement("button", { onClick: handleAdicionarProduto },
    produtoEditando ? "Atualizar Produto" : "Adicionar Produto"), /*#__PURE__*/

    React.createElement("button", { onClick: () => setTelaAdmin('dashboard') }, "Voltar")));


}

function AdminDashboard({ setTelaAdmin }) {
  return /*#__PURE__*/(
    React.createElement("div", { className: "admin-dashboard" }, /*#__PURE__*/
    React.createElement("h3", { className: "texto-admin" }, "Dashboard do Administrador"), /*#__PURE__*/
    React.createElement("img", { className: "img-admin", src: "https://github.com/andreza02111/Imagens--trabalho/blob/Python/Imagem-Admin.png?raw=true" }), /*#__PURE__*/
    React.createElement("button", { onClick: () => setTelaAdmin('cadastrarProduto'), className: "btn-admin" }, "Cadastrar Produto"), /*#__PURE__*/
    React.createElement("button", { className: "btn-admin", onClick: () => setTelaAdmin('cadastrarAdmin') }, "Cadastrar Admin"), " ", /*#__PURE__*/

    React.createElement("button", { className: "btn-admin", onClick: () => setTelaAdmin('verProdutos') }, "Ver Produtos")));


}

function App() {
  const [produtos, setProdutos] = useState(() => {
    const produtosSalvos = localStorage.getItem("produtos");
    return produtosSalvos ? JSON.parse(produtosSalvos) : dadosProdutosIniciais;
  });

  const [clientes, setClientes] = useState(() => {
    const clientesSalvos = localStorage.getItem("clientes");
    return clientesSalvos ? JSON.parse(clientesSalvos) : [];
  });

  const [admins, setAdmins] = useState(() => {
    const adminsSalvos = localStorage.getItem("admins");
    let admins = adminsSalvos ? JSON.parse(adminsSalvos) : [];
    const adminPadrao = { nome: "Admin Padrão", email: "admin", senha: "admin123" };
    const adminExistente = admins.find(admin => admin.email === adminPadrao.email);
    if (!adminExistente) {
      admins = [...admins, adminPadrao];
      localStorage.setItem("admins", JSON.stringify(admins));
    }
    return admins;
  });

  const [itensCarrinho, setItensCarrinho] = useState([]);
  const [endereco, setEndereco] = useState(null);
  const [clienteLogado, setClienteLogado] = useState(false);
  const [showCadastro, setShowCadastro] = useState(false);
  const [showLoginAdmin, setShowLoginAdmin] = useState(false);
  const [adminLogado, setAdminLogado] = useState(false);
  const [adminAtual, setAdminAtual] = useState(null);
  const [telaAdmin, setTelaAdmin] = useState('dashboard');
  const [produtoEditando, setProdutoEditando] = useState(null);

  useEffect(() => {
    localStorage.setItem("produtos", JSON.stringify(produtos));
  }, [produtos]);

  const adicionarAoCarrinho = (produto, quantidade) => {
    setItensCarrinho(prevItens => {
      const itemExistente = prevItens.find(item => item.id === produto.id);
      if (itemExistente) {
        if (itemExistente.quantidade + quantidade > produto.estoque) {
          alert(`Quantidade disponível: ${produto.estoque - itemExistente.quantidade}`);
          return prevItens;
        }
        return prevItens.map(item => item.id === produto.id ? { ...item, quantidade: item.quantidade + quantidade } : item);
      } else {
        return [...prevItens, { ...produto, quantidade }];
      }
    });
  };

  const atualizarQuantidade = (id, novaQuantidade) => {
    setItensCarrinho(prevItens => prevItens.map(item => item.id === id ? { ...item, quantidade: novaQuantidade } : item));
  };

  const removerDoCarrinho = id => {
    setItensCarrinho(prevItens => prevItens.filter(item => item.id !== id));
  };

  const adicionarProduto = novoProduto => {
    setProdutos(prev => [...prev, novoProduto]);
  };

  const editarProduto = produtoEditado => {
    setProdutos(prev => prev.map(produto => produto.id === produtoEditado.id ? produtoEditado : produto));
  };

  const excluirProduto = id => {
    setProdutos(prev => prev.filter(produto => produto.id !== id));
  };

  const logoutCliente = () => {
    setClienteLogado(false);
    setItensCarrinho([]);
    setEndereco(null);
  };

  const logoutAdmin = () => {
    setAdminLogado(false);
    setAdminAtual(null);
    setTelaAdmin('dashboard');
  };

  const renderizarConteudo = () => {
    if (clienteLogado) {
      return /*#__PURE__*/(
        React.createElement("div", null, /*#__PURE__*/
        React.createElement("button", { onClick: logoutCliente }, "Logout Cliente"),
        endereco && /*#__PURE__*/
        React.createElement("div", null, /*#__PURE__*/
        React.createElement("p", null, "Endere\xE7o: ", endereco.logradouro, ", ", endereco.bairro), /*#__PURE__*/
        React.createElement("p", null, "Cidade: ", endereco.localidade, " - ", endereco.uf)), /*#__PURE__*/


        React.createElement(ListaProdutos, { produtos: produtos, adicionarAoCarrinho: adicionarAoCarrinho, itensCarrinho: itensCarrinho }), /*#__PURE__*/
        React.createElement(Carrinho, { itensCarrinho: itensCarrinho, produtos: produtos, atualizarQuantidade: atualizarQuantidade, removerDoCarrinho: removerDoCarrinho, endereco: endereco }), /*#__PURE__*/
        React.createElement(BuscarEndereco, { setEndereco: setEndereco })));



    } else if (adminLogado) {
      return /*#__PURE__*/(
        React.createElement("div", null, /*#__PURE__*/
        React.createElement("button", { onClick: logoutAdmin }, "Logout Admin"), /*#__PURE__*/
        React.createElement("p", null, "Bem-vindo, ", adminAtual.nome, "!"),
        telaAdmin === 'cadastrarProduto' && /*#__PURE__*/
        React.createElement(CadastroProduto, { adicionarProduto: adicionarProduto, produtoEditando: produtoEditando, editarProduto: editarProduto, setTelaAdmin: setTelaAdmin }),

        telaAdmin === 'cadastrarAdmin' && /*#__PURE__*/
        React.createElement(CadastroAdmin, { setShowCadastroAdmin: setShowCadastroAdmin, setAdmins: setAdmins, admins: admins, setTelaAdmin: setTelaAdmin }),

        telaAdmin === 'verProdutos' && /*#__PURE__*/
        React.createElement(ListaProdutosAdmin, { produtos: produtos, editarProduto: produto => {setProdutoEditando(produto);setTelaAdmin('cadastrarProduto');}, excluirProduto: excluirProduto, setTelaAdmin: setTelaAdmin }),

        telaAdmin === 'dashboard' && /*#__PURE__*/
        React.createElement(AdminDashboard, { setTelaAdmin: setTelaAdmin })));



    } else {
      return /*#__PURE__*/(
        React.createElement("div", null,
        showCadastro ? /*#__PURE__*/
        React.createElement(CadastroCliente, { setShowCadastro: setShowCadastro, setClientes: setClientes, clientes: clientes }) :
        showLoginAdmin ? /*#__PURE__*/
        React.createElement(LoginAdmin, { setAdminLogado: setAdminLogado, setShowLoginAdmin: setShowLoginAdmin, admins: admins, setAdminAtual: setAdminAtual }) : /*#__PURE__*/

        React.createElement(LoginCliente, { setClienteLogado: setClienteLogado, clientes: clientes, setShowCadastro: setShowCadastro, setShowLoginAdmin: setShowLoginAdmin })));



    }
  };
  return /*#__PURE__*/(
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("img", {
      src: "https://github.com/zetuppi/CURSO-UNICARIOCA---DEV.-APLICA-ES-M-VEIS/blob/main/unnamed.png?raw=true",
      className: "imagem-banner",
      alt: "Banner" }),

    renderizarConteudo()));


}

const rootElement = document.getElementById("root");
ReactDOM.render( /*#__PURE__*/React.createElement(App, null), rootElement);