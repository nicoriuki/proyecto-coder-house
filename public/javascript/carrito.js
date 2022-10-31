import { fetchApi } from './fetchApi.js';
const d = document,
      btnCarrito = d.getElementById('btnCarrito'),
      btnBorrarCarrito = d.getElementById('btnBorrarCarrito'),
      carts = d.getElementById('carritos');
const getCarts = async () => {
      let response = await fetchApi().get('/api/carrito/');
      response.forEach((item) => {
            let option = d.createElement('option');
            option.value = item._id;
            option.innerText = item._id;
            carts.appendChild(option);
      });
      await getCartsProducts();
};
const getCartsProducts = async () => {
      let response = await fetchApi().get(
            `/api/carrito/${carts.value}/productos`
      );
      cardsProducts.innerHTML = '';
      response.forEach((product) => {
            let divProducts = d.createElement('div');
            divProducts.classList.add('porduct');
            divProducts.innerHTML = `            
    <div class="product__title">${product.title}</div>
    <div class="product__img">
      <img src="${product.thumbnail}" alt="${product.title}">
    </div>
    <div class="product__descript">${product.description}</div>
    <div class="product__price">$${product.price}</div>
    <div class="product__stock">${product.stock}</div>
    <div class="borrar"  id=${product._id}>borrar producto</div>
    </div>
  `;
            cardsProducts.appendChild(divProducts);
      });
};
const newCart = async () => {
      await fetchApi().post('/api/carrito/');
      /*     await fetch('/api/carrito/', {
            method: 'POST',
      }); */
      location.reload();
};
const deleteCart = async (id) => {
      await fetchApi().del(`/api/carrito/${id}`);
      location.reload();
};
const deleteProduct = async (idProduct, idCart) => {
      await fetchApi().del(`/api/carrito/${idCart}/productos/${idProduct}`);
      location.reload();
};

getCarts();

carts.addEventListener('change', (e) => {
      getCartsProducts(e.value);
});
btnCarrito.addEventListener('click', (e) => {
      newCart();
});
btnBorrarCarrito.addEventListener('click', (e) => {
      let isOk = confirm('Seguro que quieres elimar el producto del carrito');
      isOk && deleteCart(carts.value);
});
d.addEventListener('click', (e) => {
      if (e.target.matches('.borrar')) {
            let isOk = confirm(
                  'Seguro que quieres elimar el producto del carrito'
            );
            console.log(e.target.id, carts.value);
            isOk && deleteProduct(e.target.id, carts.value);
      }
});
