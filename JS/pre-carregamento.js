// Codigo criar animacao de reload no comeco //
window.addEventListener("load", () => {
  const pre_carregamento = document.querySelector("div.pre-carregamento");

  function preCarregamento() {
    setTimeout(() => {
      pre_carregamento.style.opacity = "0";
      setTimeout(() => {
        pre_carregamento.style.display = "none";
      }, 500);
    }, 2000);
  }

  preCarregamento();
});


// ------------------------------------------------------------------------


// Codigo criar animacao no header //
let lastScrollTop = 0;
let isHeaderFixed = false;
const header = document.querySelector(".container-header");
const headerHeight = header.clientHeight;

header.style.opacity = "1";

document.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;

  if (currentScroll > lastScrollTop && !isHeaderFixed) {
    if (currentScroll > headerHeight) {
      isHeaderFixed = true;
      header.style.opacity = "0";
      setTimeout(() => {
        header.classList.add("show-header");
        header.style.opacity = "";
      }, 700);
    }
  } else if (currentScroll <= lastScrollTop && isHeaderFixed) {
    const scrollThreshold = headerHeight / 2;
    if (currentScroll <= scrollThreshold) {
      isHeaderFixed = false;
      header.classList.remove("show-header");
      header.style.opacity = "1";
    }
  }
  lastScrollTop = currentScroll;
});


// ------------------------------------------------------------------------


// Codigo criar animacao de itens na tela //
const elements = document.querySelectorAll(".hidden");

const myObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});

elements.forEach((element) => myObserver.observe(element));

document.querySelectorAll(".paragrafo-nav").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
      });
    }
  });
});


// ------------------------------------------------------------------------


// Scroll suave para o botão "voltar ao topo"
document
  .querySelector(".icone-voltar-topo")
  .addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
      });
    }
  });


// ------------------------------------------------------------------------


// Cursor do mouse animado //
const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");

window.addEventListener("mousemove", function (e) {
  const posX = e.clientX;
  const posY = e.clientY;

  cursorDot.style.left = `${posX}px`;
  cursorDot.style.top = `${posY}px`;

  cursorOutline.animate(
    {
      left: `${posX}px`,
      top: `${posY}px`,
    },
    { duration: 300, fill: "forwards" }
  );
});


// ------------------------------------------------------------------------


// Animacao de botao para voltar ao topo
document.addEventListener("DOMContentLoaded", function () {
  const header = document.getElementById("inicio"); // Elemento de referência (header)
  const scrollTopButton = document.querySelector(".icone-voltar-topo");

  function handleScroll() {
    if (window.scrollY > header.offsetHeight) {
      scrollTopButton.style.bottom = "30px"; // Mostra o botão quando rola para baixo
    } else {
      scrollTopButton.style.bottom = "-50px"; // Esconde o botão ao voltar ao topo
    }
  }

  window.addEventListener("scroll", handleScroll);

  // Adicionando uma classe para a transição suave
  scrollTopButton.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
      });
    }
  });
});


// ------------------------------------------------------------------------


document.addEventListener("DOMContentLoaded", function () {
  function loadCart() {
      const savedCart = localStorage.getItem("cartItems");
      if (savedCart) {
          cart = JSON.parse(savedCart);
      }
  }

  function saveCart() {
      localStorage.setItem("cartItems", JSON.stringify(cart));
  }

  function updateCart() {
      const totalItemsElement = document.querySelector(".total-itens");
      const totalValueElement = document.getElementById("total-value");
      const cartItemsElement = document.getElementById("cart-items");

      let totalItems = 0;
      let totalValue = 0.0;

      cartItemsElement.innerHTML = "";

      cart.forEach((item, index) => {
          totalItems += 1;
          totalValue += parseFloat(item.preco.replace("R$", "").replace(",", "."));

          const cartItemElement = document.createElement("div");
          cartItemElement.className = "cart-item";
          cartItemElement.innerHTML = `
              <img src="${item.imagem}" alt="Imagem do produto">
              <div class="item-details">
                  <p class="titulo-nome-produto">${item.titulo}</p>
                  <p class="valor-unidade-produto">${item.preco}</p>
              </div>
              <button class="remove-item"><i class="bi bi-trash3"></i></button>
          `;
          cartItemsElement.appendChild(cartItemElement);

          cartItemElement
              .querySelector(".remove-item")
              .addEventListener("click", function () {
                  removeItemFromCart(index);
                  cartItemElement.remove();  // Remove o elemento do DOM
              });
      });

      totalItemsElement.textContent = totalItems;
      totalValueElement.textContent = `R$ ${totalValue.toFixed(2).replace(".", ",")}`;

      saveCart();
  }

  let cart = [];

  function removeItemFromCart(index) {
      cart.splice(index, 1);
      updateCart();
  }

  document.addEventListener("click", function (e) {
      if (e.target && (e.target.classList.contains("add-to-cart") || e.target.closest(".add-to-cart"))) {
          const produtoCard = e.target.closest(".produto-card");
          const titulo = produtoCard.querySelector("p").textContent;
          const preco = produtoCard.querySelector(".botoes-produto p").textContent;
          const imagem = produtoCard.querySelector("img").src;

          cart.push({ titulo, preco, imagem });

          updateCart();
      }
  });

  document.querySelector(".checkout-button").addEventListener("click", function() {
      saveCart();
      window.location.href = "index2.html";
  });

  function renderProduct(imagem, departamentos, titulo, avaliacao, preco) {
      const produtosElement = document.getElementById("produto");
      const produtoCardHTML = `
          <div class="produto-card">
              <img src="${imagem}" alt="Imagem">
              <h2>${departamentos}</h2>
              <p>${titulo}</p>
              <div class="estrela-pai">
                  <p>${avaliacao}</p>
                  <i class="bi bi-star"></i></div>
              <div class="botoes-produto">
                  <p>${preco}</p>
                  <button class="btn add-to-cart"><i class="bi bi-bag-check"></i></button>
              </div>
              <p class="categoria" hidden>${departamentos}</p>
          </div>
      `;
      produtosElement.innerHTML += produtoCardHTML;
  }

  loadCart();
  updateCart();
});



// -------------------------------------------------------------------------------------


// Levar para outro site //
document
  .querySelector(".checkout-button")
  .addEventListener("click", function () {
    window.location.href = "index2.html"; // substitua com o caminho do seu HTML
  });

function increment() {
  var quantityInput = document.getElementById("quantity");
  quantityInput.value = parseInt(quantityInput.value) + 1;
}

function decrement() {
  var quantityInput = document.getElementById("quantity");
  if (quantityInput.value > 1) {
    quantityInput.value = parseInt(quantityInput.value) - 1;
  }
}