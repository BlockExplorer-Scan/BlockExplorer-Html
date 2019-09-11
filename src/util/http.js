import axios from 'axios';
import { MessageBox } from 'element-ui';
axios.defaults.timeout = 20000;
// axios.defaults.timeout = 5000;
// axios.defaults.baseURL = 'http://192.168.0.112:8080';//本地服务器
axios.defaults.baseURL = 'http://ngxb.haizhutoken.com/Search-Web';//测试服务器
// axios.defaults.baseURL = 'http://block.bitfpga.com/Search-Web';//正式服务器
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


// http request 拦截器
axios.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);


// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error)
    }
)


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url, params = {}) {
    return new Promise((resolve, reject) => axios.get(url, {
        params: params
    })
        .then(response => {
            resolve(response.data);
        })
        .catch(err => {
            reject(err)
        })
    )
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
                console.log(err)
            })
    })
}

/**
* 封装patch请求
* @param url
* @param data
* @returns {Promise}
*/

export function patch(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.patch(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}

/**
* 封装put请求
* @param url
* @param data
* @returns {Promise}
*/

export function put(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.put(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}