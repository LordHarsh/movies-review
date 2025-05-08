import database from '../../loaders/database';
import { movieData } from './init-data';
import Logger from '../../loaders/logger';


export async function initializeMoviesCollection(): Promise<void> {
    try {
        // Connect to MongoDB
        const collection = (await database()).collection('movies');
        Logger.info('Connected to MongoDB for initialization check');

        // Check if collection is empty
        const count = await collection.countDocuments();

        if (count === 0) {
            Logger.info('Movies collection is empty. Importing sample data...');

            try {
                // Use the imported movieData instead of reading from a file
                const result = await collection.insertMany(movieData);
                Logger.info(`Successfully imported ${result.insertedCount} movies into the database.`);
            } catch (error) {
                Logger.error('Error importing sample data:', error);
                throw error;
            }
        } else {
            Logger.info(`Found ${count} existing movies in the database. Skipping import.`);
        }
    } catch (error) {
        Logger.error('Movies collection initialization failed:', error);
        throw error;
    }
}