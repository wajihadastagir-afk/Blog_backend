const isProduction = process.env.NODE_ENV === 'production';

// Helper to provide safe dev defaults but require env vars in production
const getConfigValue = (value, fallback, name) => {
  if (value) return value;
  if (!isProduction && fallback) return fallback;
  throw new Error(`${name} is not set`);
};

module.exports = {
  MONGODB_URI: getConfigValue(process.env.MONGODB_URI, 'mongodb://localhost:27017/blogapp', 'MONGODB_URI'),
  JWT_SECRET: getConfigValue(process.env.JWT_SECRET, 'dev-secret-change-me', 'JWT_SECRET'),
  PORT: getConfigValue(process.env.PORT, '3001', 'PORT')
};
