import { Document } from 'mongoose';

interface IHosting extends Document {
    hostname: string,
    ipAddress: string,
    active: boolean,
    createdAt: Date,
    updatedAt?: Date,
}

export default IHosting;
