const { Organization } = require('../models/index');

const requireApiKey = async (req, res, next) => {
  try {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey) return res.status(401).json({ message: 'API key required' });

    const org = await Organization.findOne({ where: { apiKey } });
    if (!org) return res.status(403).json({ message: 'Invalid API key' });

    req.organization = org;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'API Key auth failed', error: err.message });
  }
};

module.exports = requireApiKey;
