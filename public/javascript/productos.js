import { fetchApi } from './fetchApi.js';
const d = document,
      cardsProducts = d.getElementById('cardsProducts'),
      formIngreso = d.getElementById('formIngreso'),
      title = d.getElementById('name'),
      description = d.getElementById('description'),
      price = d.getElementById('price'),
      thumbnail = d.getElementById('thumbnail'),
      stock = d.getElementById('stock'),
      codigo = d.getElementById('codigo'),
      idInput = d.getElementById('idInput'),
      metodoInput = d.getElementById('metodo'),
      btnCarrito = d.getElementById('btnCarrito'),
      carts = d.getElementById('carritos');

const admin = localStorage.getItem('admin');
console.log(admin);
let options = {
      body: {},
      headers: { 'content-type': 'application/json' },
};

const getProduct = async () => {
      let response = await fetchApi().get(`/api/productos?admin=${admin}`);
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
    <div class="agregar" id=${product._id}>Agregar al carrito</div>
    <div class="edit">
    <div class="editar" value="PUT" id=${product._id}>editar</div>
    <div class="borrar" id=${product._id}>borrar</div>
    </div>
  `;
            cardsProducts.appendChild(divProducts);
      });
      const edit = d.querySelectorAll('.edit');
      if (admin == 'true') {
            formIngreso.classList.remove('hidden');
            edit.forEach((element) => {
                  element.classList.remove('hidden');
            });
      } else {
            formIngreso.classList.add('hidden');
            edit.forEach((element) => {
                  element.classList.add('hidden');
            });
      }
};
const getCarritos = async () => {
      let response = await fetchApi().get('/api/carrito/');
      response.forEach((item) => {
            let option = d.createElement('option');
            option.value = item._id;
            option.innerText = item._id;
            carts.appendChild(option);
      });
};
getProduct();
getCarritos();
const editPost = async () => {
      options.body = {
            title: title.value,
            description: description.value,
            stock: stock.value,
            price: price.value,
            thumbnail: thumbnail.value,
            codigo: codigo.value,
            _id: idInput.value,
      };

      await fetchApi().put(
            `/api/productos/${idInput.value}?admin=true`,
            options
      );
      getProduct();
};
const newProduct = async () => {
      options.body = {
            title: title.value,
            description: description.value,
            stock: stock.value,
            price: price.value,
            thumbnail: thumbnail.value,
            codigo: codigo.value,
      };
      await fetchApi().post('/api/productos?admin=true', options);
};
const delet = async (id) => {
      await fetchApi().del(`/api/productos/${id}?admin=true`);
      location.reload();
};

const editForm = async (metodo, id) => {
      let response = await fetchApi().get(`/api/productos/${id}`);
      title.value = response.title;
      description.value = response.description;
      price.value = response.price;
      thumbnail.value = response.thumbnail;
      codigo.value = response.codigo;
      stock.value = response.stock;
      idInput.value = response._id;
      metodoInput.value = metodo;
};
const postInCart = async (id) => {
      options.body = { _id: id };
      await fetchApi().post(`/api/carrito/${carts.value}/productos`, options);
};
const newCart = async () => {
      await fetchApi().post('/api/carrito/');
      location.reload();
};
d.addEventListener('click', (e) => {
      if (e.target.matches('.editar')) {
            let metodo = e.target.getAttribute('value'),
                  id = e.target.id;
            editForm(metodo, id);
            title.focus();
      }
});
d.addEventListener('click', (e) => {
      if (e.target.matches('.borrar')) {
            let isOk = confirm('Seguro que quieres elimar el producto');
            isOk && delet(e.target.id);
      }
});
d.addEventListener('click', (e) => {
      if (e.target.matches('.agregar')) {
            postInCart(e.target.id);
      }
});
formIngreso.addEventListener('submit', (e) => {
      if (metodoInput.value === 'PUT') {
            editPost();
      } else {
            newProduct();
      }
});
btnCarrito.addEventListener('click', (e) => {
      newCart();
});
