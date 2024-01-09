const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;


export const generateToken = (payload) => {
  console.log(JWT_SECRET)
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }

    // Decodificado exitosamente, puedes acceder a la información del usuario en "decoded".
    req.user = decoded;

    next();
  });
}