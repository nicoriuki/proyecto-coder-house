import mongoosse, { Schema } from 'mongoose';

const producto = new Schema({
      title: { type: String, required: true },
      description: { type: String, required: true },
      stock: { type: Number, required: true },
      price: { type: Number, required: true },
      codigo: { type: Number, required: true, index: true, unique: true },
      thumbnail: { type: String, required: true },
      timestamp: { type: String, required: true },
});

export default mongoosse.model('Producto', producto);
