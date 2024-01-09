const nodemailer = require('nodemailer');

// Configuración del transporte
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tu_correo@gmail.com',
    pass: 'tu_contraseña',
  },
});

// Detalles del correo electrónico
const mailOptions = {
  from: 'tu_correo@gmail.com',
  to: 'correo_destino@example.com',
  subject: 'Asunto del correo',
  text: 'Contenido del correo',
};

// Envío del correo electrónico
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error(error);
  } else {
    console.log('Correo enviado: ' + info.response);
  }
});
