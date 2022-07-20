import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db';

import path from 'path';
dotenv.config({ path: './src/config/config.env' });


connectDB();


import dogRoutes from './routes/dogs';

const PORT = process.env.PORT || 5000;

const app = express();

// Parse JSON
app.use(express.json());

// display routes in console
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
};

app.use(express.static(path.join(__dirname, 'public')));

// Mount Routers
app.use('/api/v1/dogs', dogRoutes);


const server = app.listen(PORT, () => console.log(`Server is running ${process.env.NODE_ENV} mode on port ${PORT}`));

process.on('unhandledRejection', (err: Error) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
})