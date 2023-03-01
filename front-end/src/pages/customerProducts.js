// 11 - Crie uma tela de produtos do cliente contendo uma barra de navegação - navbar -, que servirá também para demais telas das pessoas usuárias
// Observações técnicas
// Se oriente pela seguinte tela do protótipo: Comum / Produtos;
import React, { useEffect } from 'react';

function CustomerProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => (
    setProducts()
  ));

  return (
    <div>
      <nav>
        {/* Elemento genérico que seja um item de menu para página de produtos; */}
        <button
          data-testid="customer_products__element-navbar-link-products"
          type="button"
        >
          PRODUTOS

        </button>
        {/* Elemento genérico que seja um item de menu para página de pedidos; */}
        <button
          data-testid="customer_products__element-navbar-link-orders"
          type="button"
        >
          MEUS PEDIDOS

        </button>
        {/* Elemento genérico para o nome da pessoa usuária; */}
        <button
          data-testid="customer_products__element-navbar-user-full-name"
          type="button"
        >
          Nome da pessoa

        </button>
        {/* Elemento genérico que seja um item de menu para o logout. */}
        <button
          data-testid="customer_products__element-navbar-link-logout"
          type="button"
        >
          Sair

        </button>
      </nav>
      <div>
        { products.map((element) => (
          <div key={ element.id }>
            <p data-testid={ `customer_products__element-card-price-${element.id}` }>
              { element.price }
            </p>
            <img
              data-testid={ `customer_products__img-card-bg-image-${element.id}` }
              src={ element.urlImage }
              alt={ element.name }
            />
            <p data-testid={ `customer_products__element-card-title-${element.id}` }>
              { element.name }
            </p>
            <button
              data-testid={ `customer_products__button-card-rm-item-${element.id}` }
              type="button"
            >
              -

            </button>
            <input
              data-testid={ `customer_products__input-card-quantity-${element.id}` }
            />
            <button
              data-testid={ `customer_products__button-card-add-item-${element.id}` }
              type="button"
            >
              +

            </button>
          </div>
        ))}
      </div>
      <div>
        <button
          data-testid="customer_products__button-cart"
          type="button"
        >
          <p data-testid="customer_products__checkout-bottom-value">
            Ver Carrinho: R$

          </p>
        </button>
      </div>
    </div>
  );
}

export default CustomerProducts;
