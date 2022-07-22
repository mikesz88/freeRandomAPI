const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const path = require('path');
dotenv.config({ path: 'config/config.env' });


connectDB();


const dogRoutes = require('./routes/dogs');

const PORT = process.env.PORT || 5000;

const app = express();

// Parse JSON
app.use(express.json());

// display routes in console
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
};

app.use(mongoSanitize());
app.use(helmet());
app.use(xss());
app.use(hpp());
app.use(cors());

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 500, // Limit each IP to 500 request per 'window' (here, per 15 minutes)
});

app.use(limiter);

app.use(express.static(path.join(__dirname, 'public')));

// Mount Routers
app.use('/api/v1/dogs', dogRoutes);

// Error Handling
app.use(errorHandler)


const server = app.listen(PORT, () => console.log(`Server is running ${process.env.NODE_ENV} mode on port ${PORT}`));

process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
})