import { collection } from "firebase/firestore";

export const getUserInfo = async userID => {
    const userInfoDoc = collection('users').doc(userID).get();
        const userInfo = userInfoDoc.data();
        if (!userInfo) return null;
        return {
            ...userInfo,
            id: userInfoDoc.id,
        }
};