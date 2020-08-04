export default function isLoggedIn(user) {
    return Boolean(user && user.id);
}