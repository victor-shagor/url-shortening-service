import dotEnv from 'dotenv';
import { Joi } from 'celebrate'

dotEnv.config();

const envVarsSchema =  Joi.object().keys({
    MONGODB_URI: Joi.string().required(),
  
    PORT: Joi.number().default(5000),
  
    HOST_URL: Joi.string().required(),
}).unknown()

const { value: envVariables, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);
if (error) throw new Error(`Config validation error: ${error.message}`);


type ConfigTypes = {
    port: number,
    hostUrl: string,
    mongoUri: string,
  }

export const config: ConfigTypes = {
  port: envVariables.PORT,
  hostUrl: envVariables.HOST_URL,
  mongoUri: envVariables.MONGODB_URI,
};
