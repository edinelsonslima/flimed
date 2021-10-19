import { connect } from 'mongoose';

async function connectMongodb(): Promise<void> {
    try {
        await connect(process.env.MONGO_CONNECT);
        console.log('MONGODB is connected');
    } catch (error) {
        console.log(`MONGODB fail connection, error: ${error}`);
    }
}

export { connectMongodb };
