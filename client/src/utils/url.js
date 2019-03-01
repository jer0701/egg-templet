const host = '127.0.0.1:7001';

const auth = () => `http://${host}/auth`;
const login = () => `http://${host}/login`;
const register = () => `http://${host}/register`;
const logout = () => `http://${host}/logout`;

export default {
    auth,
    login,
    register,
    logout
}