import { User, Organization } from '../models/index.js';
import { hashPassword, comparePassword } from '../utils/hash.js';
import jwt from 'jsonwebtoken';
import env from '../config/env.config.js';

// Register (only exposed to admins or superadmin in production; for MVP allow open)
export const register = async (req, res) => {
  try {
    const { name, email, password, role, organizationId } = req.body;
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    const passwordHash = await hashPassword(password);
    const user = await User.create({ name, email, passwordHash, role, organizationId });
    res.json({ id: user.id, name: user.name, role: user.role });
  } catch (err) {
    console.error('Register error', err);
    res.status(500).json({ message: 'Register failed', error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const ok = await comparePassword(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    // create jwt token for API use
    const token = jwt.sign({ id: user.id, role: user.role }, env.JWT_SECRET, { expiresIn: '1d' });

    // create session for web
    req.session.userId = user.id;

    res.json({ message: 'Login successful', token, user: { id: user.id, name: user.name, role: user.role } });
  } catch (err) {
    console.error('Login error', err);
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

export const logout = async (req, res) => {
  try {
    req.session.destroy(() => {});
    res.json({ message: 'Logged out' });
  } catch (err) {
    res.status(500).json({ message: 'Logout failed', error: err.message });
  }
};
