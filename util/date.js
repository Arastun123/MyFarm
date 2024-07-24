export function getFormatedDate(date) {
    return date.toISOString().slice(0, 10);
}
export async function getUserData() {
    try {
        const role = await AsyncStorage.getItem('role');
        const token = await AsyncStorage.getItem('token');
        const username = await AsyncStorage.getItem('username');
        return { role, token, username };
    } catch (error) {
        console.error('Error retrieving user data', error);
    }
};