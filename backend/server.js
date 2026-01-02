import dotenv from 'dotenv';
dotenv.config();

import app from './src/app.js';
import sequelize from './src/config/db.js';

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.sync({ alter: true });
    app.listen(PORT, () => {
      console.log(`Chain Link Delivery Solutions Backend running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
})();



// // backend/server.js
// import express from 'express';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import sequelize from './src/config/db.js';
// import rideRoutes from './src/routes/rideRoutes.js';
// import dotenv from 'dotenv';

// dotenv.config();

// const app = express();

// app.use(bodyParser.json());
// app.use(cors());

// app.use('/rides', rideRoutes);

// sequelize.sync({ alter: true }).then(() => {
//   app.listen(process.env.PORT || 5000, () => {
//     console.log(`🚀 Backend running on port ${process.env.PORT || 5000}`);
//   });
// });
