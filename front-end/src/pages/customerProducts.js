// 11 - Crie uma tela de produtos do cliente contendo uma barra de navegação - navbar -, que servirá também para demais telas das pessoas usuárias
// Observações técnicas
// Se oriente pela seguinte tela do protótipo: Comum / Produtos;
import React from 'react';

function CustomerProducts() {
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
      {/* describe(requirement(11), () => {
  test("O avaliador testará a existência dos data-testids referentes ao navbar", async () => {
    await expect(page).toFindElement(
      customerProductsPage.element.navbar.links.products
    );
    await expect(page).toFindElement(
      customerProductsPage.element.navbar.links.orders
    );
    await expect(page).toFindElement(
      customerProductsPage.element.navbar.userFullName
    );
    await expect(page).toFindElement(
      customerProductsPage.element.navbar.links.logout
    );
  });
}); */}
    </div>
  );
}

export default CustomerProducts;
