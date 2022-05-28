export const missingRoutes = (req, res, next) => {
    // res.status(404).json({error: '404 Not Found'});
    const error = new Error("404 Not Found");
    error.status = 404;
    error.name = "Router Error";
    next(error);
};