import { buscarProdutos } from "./conectaAPI.js";
import constroiCard from "./mostrarProdutos.js";

async function buscarProdutosHandler(evento) {
  evento.preventDefault();

  const dadosDePesquisa = document
    .querySelector("[data-pesquisa]")
    .value.toLowerCase();
  const produtos = await buscarProdutos();

  const produtosFiltrados = produtos.filter(
    (produto) =>
      produto.titulo.toLowerCase().includes(dadosDePesquisa) ||
      produto.departamentos.toLowerCase().includes(dadosDePesquisa)
  );

  const lista = document.querySelector("[data-lista]");

  // Limpa a lista de produtos
  while (lista.firstChild) {
    lista.removeChild(lista.firstChild);
  }

  // Adiciona os produtos filtrados à lista
  produtosFiltrados.forEach((elemento) =>
    lista.appendChild(
      constroiCard(
        elemento.titulo,
        elemento.preco,
        elemento.departamentos,
        elemento.imagem,
        elemento.avaliacao
      )
    )
  );
}
const botaoDePesquisa = document.querySelector("[data-botao-pesquisa]");
botaoDePesquisa.addEventListener("click", buscarProdutosHandler);


// ------------------------------------------------------------------------


// Função para filtrar produtos com base na categoria
function filtrarPorCategoria(filtro) {
    const produtos = document.querySelectorAll(".produto-card");
    let valorFiltro = filtro.toLowerCase();

    produtos.forEach(produto => {
        let categoria = produto.querySelector(".categoria").textContent.toLowerCase();

        if (valorFiltro === "tudo" || categoria.includes(valorFiltro)) {
            produto.parentElement.style.display = "block"; // Exibe o cartão completo
        } else {
            produto.parentElement.style.display = "none"; // Oculta o cartão completo
        }
    });
}
// Seleciona todos os botões de categoria
const botoesCategoria = document.querySelectorAll(".card-ajuda");

// Adiciona um evento de clique a cada botão de categoria
botoesCategoria.forEach((botao) => {
    let nomeCategoria = botao.getAttribute("name");
    botao.addEventListener("click", () => filtrarPorCategoria(nomeCategoria));
});
// Exemplo de adição de cards de produtos
const listaProdutos = document.querySelector("[data-lista]");

