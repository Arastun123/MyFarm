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
export function formatDate(dateString) {

    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
 
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}
