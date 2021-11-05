import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8070/api/';

class UserService {

  /**
   * obtener informacion publica
   * @returns {Promise<AxiosResponse<any>>}
   */
    getPublicContent() {
        return axios.get(API_URL + 'all');
    }

  /**
   * obtener la lista de usuarios
   * @returns {Promise<AxiosResponse<any>>}
   */
  getUsers() {
        return axios.get(API_URL + 'obtenerusuarios', {headers: authHeader()});
    }

  /**
   * obtener la lista de perfiles
   * @returns {Promise<AxiosResponse<any>>}
   */
    getProfiles() {
        return axios.get(API_URL + 'obtenerperfiles', {headers: authHeader()});
    }

  /**.
   * obtener el usuario para editar
   * @param userId
   * @returns {Promise<AxiosResponse<any>>}
   */
    getUser(userId) {
        return axios.post(API_URL + "obtenerusuario", {userId}, {headers: authHeader()});
    }

  /**
   * obtener el panel de usuarios
   * @returns {Promise<AxiosResponse<any>>}
   */
    getUserBoard() {
        return axios.get(API_URL + 'user', {headers: authHeader()});
    }

  /**
   * obtener el poanel de moderador
   * @returns {Promise<AxiosResponse<any>>}
   */
    getModeratorBoard() {
        return axios.get(API_URL + 'mod', {headers: authHeader()});
    }

  /**
   * obtener el panel administrativo
   * @returns {Promise<AxiosResponse<any>>}
   */
    getAdminBoard() {
        return axios.get(API_URL + 'admin', {headers: authHeader()});
    }
}

export default new UserService();
