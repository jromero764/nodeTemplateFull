import app from "./app";

import '../sequelizeConfig';

const { swaggerDocs: V1SwaggerDocs } = require('../swagger')
let port = app.get('port')

app.listen(app.get('port'), () => {
    console.log('Se inicia backend');
    V1SwaggerDocs(app, port)
});

