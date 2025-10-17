import express from 'express';
import cors from 'cors';
import productsRoutes from './routes/products';
import cartRoutes from './routes/cart';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/products', productsRoutes);
app.use('/cart', cartRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});