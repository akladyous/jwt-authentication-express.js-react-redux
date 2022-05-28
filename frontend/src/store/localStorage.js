export const loadState = (slice=null) => {
    try {
        const state = localStorage.getItem('state');
        if (state === null) {
            return undefined;
        }
        return JSON.parse(state);
        // const serializedState = JSON.parse(state);
        // const x = slice ? serializedState[slice] : serializedState;
        // return slice ?  serializedState[slice] : serializedState;
    } catch (err) {
        return undefined;
        // throw new Error(err);
    }
};

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("state", serializedState);
    } catch (err) {
        // throw new Error(err);
    };
};
