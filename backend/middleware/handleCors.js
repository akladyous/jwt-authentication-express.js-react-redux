import cors from 'cors';
import { corsOptions } from '../config/corsOptions.js';

export const handleCors = () =>{
    return cors(corsOptions);
};

