function Navbar() {
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
    </div>
  );
}

export default Navbar;
