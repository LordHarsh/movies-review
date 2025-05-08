import database from '../../loaders/database';

export const handleGetAllMovies = async (): Promise<unknown> => {
    const db = await database();
    const movies = await db.collection('movies').find().toArray();
    console.log('movies', movies);
    return movies;
};

export const handleSearchMovies = async (query: string): Promise<unknown> => {
    const db = await database();
    const movies = await db.collection('movies').find({ title: { $regex: query, $options: 'i' } }).toArray();
    return movies;
}

export const handleGetMovieByImdbId = async (imdbId: string): Promise<unknown> => {
    const db = await database();
    const movie = await db.collection('movies').findOne({ imdbId });
    if (!movie) {
        throw { status: 404, message: 'Movie not found' };
    }
    const reviews = await db.collection('reviews2').find({ movieId: movie.imdbId }).toArray();
    return { ...movie, reviews };
}

export const handleAddReview = async (imdbId: string, reviewBody: string): Promise<unknown> => {
    const db = await database();
    const movie = await db.collection('movies').findOne({ imdbId });
    if (!movie) {
        throw { status: 404, message: 'Movie not found' };
    }
    const review = await db.collection('reviews2').insertOne({ movieId: movie.imdbId, body: reviewBody });
    return review;
}