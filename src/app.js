require('@babel/register')({
    presets: ['@babel/preset-env']
  });

//----------------------------------------------------------------------------IMPORTS---------------------------------------------------------------------------->
import express from "express";
import config from "../config";
import { swaggerDocs } from "../swagger";
import authRoute from './routes/auth.routes'

//----------------------------------------------------------------------------SETTING---------------------------------------------------------------------------->
let port;
const expressApp = express();
const cors = require('cors');
expressApp.use(cors());
expressApp.set('port', config.port || 3000);
expressApp.use(express.json());
swaggerDocs(expressApp,config.port);
//----------------------------------------------------------------------------ROUTES---------------------------------------------------------------------------->

expressApp.use(authRoute)

module.exports = expressApp;