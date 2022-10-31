import { Router } from 'express';
const router = Router();
import { Carrito } from './../../daos/index.js';
const cartController = Carrito;
/*Router para traer todos los carritos no lo pedian pero lo nesecitaba par ael frontend */
router.get('/', async (req, res, next) => {
      try {
            let response = await cartController.getAll();
            res.json(response);
      } catch (error) {
            next(error);
      }
});
/*Router para crear un carrito*/
router.post('/', async (req, res, next) => {
      try {
            const carrito = await cartController.newCart();
            res.json(carrito);
      } catch (error) {
            next(error);
      }
});
/*Router para eliminar un carrito*/
router.delete('/:id', async (req, res, next) => {
      try {
            const deleteC = await cartController.deleteItem(req.params.id);
            res.json(req.params.id);
      } catch (error) {
            next(error);
      }
});
/*Router para traer los productos de un carrito*/
router.get('/:id/productos', async (req, res, next) => {
      try {
            let response = await cartController.getByIdProduct(req.params.id);
            res.json(response);
      } catch (error) {
            next(error);
      }
});
/*Router para agregar un  producto a un carrito*/
router.post('/:id/productos', async (req, res, next) => {
      try {
            await cartController.newProductCart(req.params.id, req.body._id);
            let response = `agrego productos al carro ${req.params._id}`;
            res.json(response);
      } catch (error) {
            next(error);
      }
});
/*Router para eliminar un  producto a un carrito*/
router.delete('/:id/productos/:id_prod', async (req, res, next) => {
      try {
            await cartController.deleteProductById(
                  req.params.id,
                  req.params.id_prod
            );
            let response = `delete de producto${req.params.id_prod} al carro${req.params.id}`;
            res.json(response);
      } catch (error) {
            next(error);
      }
});
export default router;
