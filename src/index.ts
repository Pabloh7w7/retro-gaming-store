import express from 'express';
import productsRoutes from './routes/products';
import cartRoutes from './routes/cart';

const app = express();
app.use(express.json());

app.use('/products', productsRoutes);
app.use('/cart', cartRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});