import { Request, Response, NextFunction } from 'express';
import { CONSTANTS } from '../../shared/constants';
import { handleAddReview, handleGetAllMovies, handleGetMovieByImdbId, handleSearchMovies } from './movie.service';

export const getMovies = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const movies = await handleGetAllMovies();
        res.status(CONSTANTS.FETCHED_MOVIES_SUCCESSFULLY.code).send({
            success: CONSTANTS.FETCHED_MOVIES_SUCCESSFULLY.message.success,
            message: CONSTANTS.FETCHED_MOVIES_SUCCESSFULLY.message.description,
            movies,
        });
    } catch (error) {
        next(error);
    }
};

export const searchMovies = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { query } = req.params;
        const movies = await handleSearchMovies(query);
        res.status(CONSTANTS.SEARCH_MOVIES_SUCCESSFULLY.code).send({
            success: CONSTANTS.SEARCH_MOVIES_SUCCESSFULLY.message.success,
            message: CONSTANTS.SEARCH_MOVIES_SUCCESSFULLY.message.description,
            movies,
        });
    } catch (error) {
        next(error);
    }
}

export const getMovieByImdbId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { imdbId } = req.params;
        const movie = await handleGetMovieByImdbId(imdbId);
        res.status(CONSTANTS.FETCHED_MOVIE_SUCCESSFULLY.code).send({
            success: CONSTANTS.FETCHED_MOVIE_SUCCESSFULLY.message.success,
            message: CONSTANTS.FETCHED_MOVIE_SUCCESSFULLY.message.description,
            movie,
        });
    } catch (error) {
        next(error);
    }
}

export const addReview = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { imdbId, reviewBody } = req.body;
        const movie = await handleAddReview(imdbId, reviewBody);
        res.status(CONSTANTS.ADDED_REVIEW_SUCCESSFULLY.code).send({
            success: CONSTANTS.ADDED_REVIEW_SUCCESSFULLY.message.success,
            message: CONSTANTS.ADDED_REVIEW_SUCCESSFULLY.message.description,
            movie,
        });
    } catch (error) {
        next(error);
    }
}