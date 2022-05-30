export const decodeToken = (token) => {
    return new Promise((resolve, reject) => {
        try {
            const encodedPayload = token.split(".")[1];
            const decoded = JSON.parse(window.atob(encodedPayload));

            if (Date.now() >= decoded.exp * 1000) {
                reject("Authentication Error - access token expired");
            }
            resolve(decoded);
        } catch (err) {
            reject(err);
        }
    });
};
