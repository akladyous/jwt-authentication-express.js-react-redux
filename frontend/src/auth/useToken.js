import { useState } from "react"

export function useToken() {
    const [token, setInternalToken] = useState(() => {
        return localStorage.get('token');
    });

    const setToken = newToken => {
        localStorage.setItem('token', newToken);
        setInternalToken(newToken);
    };

    return [token, setToken];
}