import jwt from 'jsonwebtoken';
import env from '../config/env.config.js';
import { User } from '../models/index.js';

export const requireLogin = async (req, res, next) => {
  try {
    // 1️⃣ Check if the session exists
    if (req.session && req.session.userId) {
      const user = await User.findByPk(req.session.userId);
      if (!user) return res.status(401).json({ message: 'Invalid session' });
      req.user = user;
      return next();
    }

    // 2️⃣ Otherwise, check Bearer token (JWT)
    const header = req.headers['authorization'];
    if (!header) return res.status(401).json({ message: 'Authentication required' });

    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, env.JWT_SECRET);

    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(401).json({ message: 'Invalid token' });

    req.user = user;
    next();
  } catch (err) {
    console.error('auth.middleware error:', err);
    return res.status(401).json({ message: 'Unauthorized', error: err.message });
  }
};
