import IConfig from './IConfig';
import { config } from 'dotenv';

config();

const envVars: NodeJS.ProcessEnv = process.env;

const configuration: IConfig = Object.freeze({
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    mongoUrl: envVars.MONGO_URL,
    thersholdValue: Number(envVars.THERSHOLD_VALUE),
    host: envVars.HOSTNAME
});

export default configuration;
