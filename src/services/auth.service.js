import axios from "axios";

const API_URL = "http://localhost:8070/api/";

class AuthService {
    /**
     * login del sistema
     * @param username
     * @param password
     * @returns {Promise<AxiosResponse<any>>}
     */
    login(username, password) {
        return axios
            .post(API_URL + "login", {
                username,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    /**
     * salir del sistema
     */
    logout() {
        localStorage.removeItem("user");
    }

    /**
     * registrar nuevo usuario
     * @param username
     * @param email
     * @param password
     * @param telefono
     * @param perfil
     * @param estatus
     * @returns {Promise<AxiosResponse<any>>}
     */
    register(username, email, password, telefono, perfil, estatus) {

        return axios.post(API_URL + "registrar", {
            username,
            email,
            password,
            telefono,
            perfil,
            estatus
        });
    }

    /**
     * desactivar usuario
     * @param userId
     * @returns {Promise<AxiosResponse<any>>}
     */
    disable(userId) {
        return axios.post(API_URL + "desactivar", {
            userId,
        });
    }

    /***
     * reactivar usuario
     * @param userId
     * @returns {Promise<AxiosResponse<any>>}
     */
    enable(userId) {
        return axios.post(API_URL + "activar", {
            userId,
        });
    }

    /**
     * editar usuario
     * @param username
     * @param email
     * @param password
     * @param telefono
     * @param perfil
     * @param estatus
     * @param id
     * @returns {Promise<AxiosResponse<any>>}
     */
    edit(username, email, password, telefono, perfil, estatus, id) {
        return axios.post(API_URL + "editar", {
            username,
            email,
            password,
            telefono,
            perfil,
            estatus,
            id
        });
    }

    /**
     * obtener los datos del usuario para mostrar mi perfil
     * @todo generar las funciones de perfil
     * @returns {any}
     */
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
        ;
    }
}

export default new AuthService();
