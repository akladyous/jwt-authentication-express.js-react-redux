
export const logger = (req, res, next) => {
    console.log(
        "\x1b[33m%s\x1b[0m",
        `Server Logger: Http Verb -> ${req.method} Path: ${req.path}`
    );
    // req.headers.origin = req.headers.origin || req.headers.host
    // console.log("header: ", req.headers);
    next();
}