import express from 'express';
import cors from 'cors';
import productsRoutes from './routes/products';
import cartRoutes from './routes/cart';
import authRoutes from './routes/auth';
import dotenv from 'dotenv';
import orderRoutes from './routes/order';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/products', productsRoutes);
app.use('/cart', cartRoutes);
app.use('/auth', authRoutes);
app.use('/order', orderRoutes);
dotenv.config();

const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
  res.send('API de Retro Gaming Store funcionando');
});
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});