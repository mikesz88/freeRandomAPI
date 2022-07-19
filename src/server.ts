import express from 'express';
import dotenv from 'dotenv';

dotenv.config({ path: './config/config.env' });


const app = express();



const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log(`Server is running ${process.env.NODE_ENV} mode on port ${PORT}`));

process.on('unhandledRejection', (err: Error) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
})