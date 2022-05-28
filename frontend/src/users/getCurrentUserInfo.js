import { getCurrentUser } from "../auth/getCurrentUser.js";
import { getUserInfo } from './getUserInfo.js'

export const getCurrentUserInfo = async () => {
    const currentUser = getCurrentUser();
    if (!currentUser) return null

    return await getUserInfo(currentUser.id);
}