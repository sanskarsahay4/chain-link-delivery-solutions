import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';

import authRoutes from './routes/auth.routes.js';
import rideRoutes from './routes/ride.routes.js';
import driverRoutes from './routes/driver.routes.js';

const app = express();

import morgan from 'morgan';  // ES module import
app.use(morgan('dev'));       // use morgan as middleware

app.use(cors({
  origin: 'http://localhost:5173', // your frontend URL
  credentials: true,               // allow cookies/auth headers
  methods: ['GET','POST','PUT','DELETE','OPTIONS'], // allow preflight requests
}));

app.use(bodyParser.json());

app.use(session({
  secret: process.env.SESSION_SECRET || 'session_secret_dev',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24*60*60*1000 } // 1 day
}));

app.get('/', (req, res) => res.json({ service: 'Chain Link Delivery Solutions - Backend' }));

app.use('/api/auth', authRoutes);
app.use('/api/rides', rideRoutes);
app.use('/api/driver', driverRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

export default app;
