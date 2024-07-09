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


//------------------------------------------------------------------------------


document.addEventListener("DOMContentLoaded", function () {
    function loadCart() {
        const savedCart = localStorage.getItem("cartItems");
        if (savedCart) {
            return JSON.parse(savedCart);
        }
        return [];
    }

    function saveCart(cart) {
        localStorage.setItem("cartItems", JSON.stringify(cart));
    }

    function displayCartItems() {
        const cart = loadCart();
        const cartContainer = document.getElementById("cart-container");
        const templateCard = document.querySelector(".product-card.template");

        cartContainer.innerHTML = ""; // Limpa o container, exceto o template

        cart.forEach((item, index) => {
            // Clone o template
            const productCard = templateCard.cloneNode(true);
            productCard.classList.remove("template");

            // Preencha os detalhes do item
            productCard.querySelector(".product-image").src = item.imagem;
            productCard.querySelector(".product-name").textContent = item.titulo;
            productCard.querySelector(".product-price").textContent = item.preco;

            // Defina o valor inicial da quantidade
            const quantityInput = productCard.querySelector('.quantity-input');
            quantityInput.value = item.quantidade || 1;

            // Atualize o preço total do item baseado na quantidade
            const updateItemTotalPrice = () => {
                const itemQuantity = parseInt(quantityInput.value);
                const itemPrice = parseFloat(item.preco.replace("R$", "").replace(",", "."));
                const itemTotalPrice = itemPrice * itemQuantity;
                productCard.querySelector(".total-price").textContent = `R$ ${itemTotalPrice.toFixed(2).replace(".", ",")}`;
                item.quantidade = itemQuantity;
                saveCart(cart);
                updateCartSummary(cart);
            };

            // Adicione os event listeners para aumentar e diminuir a quantidade
            const increaseButton = productCard.querySelector('.quantity-up');
            const decreaseButton = productCard.querySelector('.quantity-down');

            increaseButton.addEventListener('click', function () {
                quantityInput.value = parseInt(quantityInput.value) + 1;
                updateItemTotalPrice();
            });

            decreaseButton.addEventListener('click', function () {
                if (quantityInput.value > 1) {
                    quantityInput.value = parseInt(quantityInput.value) - 1;
                    updateItemTotalPrice();
                }
            });

            // Adicione o event listener para mudança no input de quantidade
            quantityInput.addEventListener('input', updateItemTotalPrice);

            // Adiciona evento para remover o item
            const deleteIcon = productCard.querySelector('.delete-icon');
            deleteIcon.addEventListener('click', function () {
                cart.splice(index, 1); // Remove o item do array
                saveCart(cart); // Salva o carrinho atualizado no localStorage
                productCard.remove(); // Remove o cartão do DOM
                updateCartSummary(cart); // Atualiza o resumo do carrinho
            });

            // Remove o cabeçalho "Entrega - BioPharma" para todos os itens, exceto o primeiro
            if (index > 0) {
                productCard.querySelector(".product-header").remove();
            }

            // Adicione o cartão preenchido ao container
            cartContainer.appendChild(productCard);

            // Atualize o preço total do item inicialmente
            updateItemTotalPrice();
        });
    }

    function updateCartSummary(cart) {
        const totalPriceElement = document.getElementById("total-price");
        const totalQuantidadeElement = document.getElementById("total-quantidade");

        let totalItems = 0;
        let totalValue = 0.0;

        cart.forEach((item) => {
            const itemQuantity = item.quantidade || 1;
            const itemPrice = parseFloat(item.preco.replace("R$", "").replace(",", "."));
            totalItems += itemQuantity;
            totalValue += itemPrice * itemQuantity;
        });

        totalPriceElement.textContent = `R$ ${totalValue.toFixed(2).replace(".", ",")}`;
        totalQuantidadeElement.textContent = totalItems;
    }

    // Adiciona um event listener ao botão "Finalizar Compra"
    const finalizarCompraBtn = document.querySelector('.finalizar-btn');
    finalizarCompraBtn.addEventListener('click', function () {
        // Recupera os dados do formulário
        const formData = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            telefone: document.getElementById('telefone').value,
            rua: document.getElementById('rua').value,
            numero: document.getElementById('numero').value,
            cep: document.getElementById('cep').value
        };

        // Recupera os dados do carrinho
        const cartData = loadCart();

        // Combina os dados do formulário e do carrinho em um único objeto
        const orderData = {
            formData: formData,
            cartData: cartData
        };

        // Cria a mensagem de pedido
        let orderMessage = `Dados do Pedido:\n\n`;
        orderMessage += `Nome: ${formData.nome}\n`;
        orderMessage += `Email: ${formData.email}\n`;
        orderMessage += `Telefone: ${formData.telefone}\n`;
        orderMessage += `Endereço: ${formData.rua}, ${formData.numero}\n`;
        orderMessage += `CEP: ${formData.cep}\n\n`;
        orderMessage += `Itens do Carrinho:\n`;
        cartData.forEach(item => {
            orderMessage += `${item.titulo} - Quantidade: ${item.quantidade}, Preço: ${item.preco}\n`;
        });

        // Codifica a mensagem para uso na URL
        const encodedMessage = encodeURIComponent(orderMessage);

        // Cria a URL do WhatsApp
        const whatsappURL = `https://wa.me/5511940758759?text=${encodedMessage}`;

        // Redireciona o usuário para a URL do WhatsApp
        window.location.href = whatsappURL;

        // Limpa o localStorage após finalizar a compra (opcional)
        localStorage.removeItem('cartItems');
    });

    // Ao carregar a página, exibe os itens do carrinho
    displayCartItems();
});


//------------------------------------------------------------------------------


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