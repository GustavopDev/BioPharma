import { conectaApi } from "./conectaAPI.js";

const lista = document.querySelector("[data-lista]");

export default function constroiCard(titulo, preco, departamentos, imagem, avaliacao) {
    const produto = document.createElement("div");
    produto.className = "container-produtos";
    produto.innerHTML = `
        <div class="produto-card">
            <img src="${imagem}" alt="Imagem">
            <h2>${departamentos}</h2>
            <p>${titulo}</p>
            <div class="estrela-pai">
                <p>${avaliacao}</p>
                <i class="bi bi-star"></i>
            </div>
            <div class="botoes-produto">
                <p>${preco}</p>
                <button class="btn add-to-cart"><i class="bi bi-bag-check"></i></button>
            </div>
            <p class="categoria" hidden>${departamentos}</p>
        </div>
    `;
    return produto;
}

async function listaProduto() {
  const listaApi = await conectaApi.listaProdutos();
  listaApi.forEach((elemento) =>
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

listaProduto();
