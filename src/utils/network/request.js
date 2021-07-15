import axios from 'axios'

const constBaseURL1 = '/api';
//
const constBaseURL2 = 'http://121.4.23.119:18080';
//const constBaseURL2 = 'http://1.15.112.44:18080';
//const constBaseURL2 = 'http://81.69.218.201:18080';
export function axiosGet(config) {
    //创建axios示例
    const axiosGet = axios.create({
        baseURL: constBaseURL2,
    });


    axiosGet.interceptors.request.use(
        config => {

            config.headers.common['Authentication-Token'] = localStorage.getItem('token');
            return config;
        },
        error => {
            console.log(error);
            return Promise.reject();
        }
    );

    axiosGet.interceptors.response.use(
        response => {
            if (response.status === 200) {
                if (response.data.status === 403) {
                    localStorage.removeItem("token");

                }
                return response.data;
            }
            else {
                console.log(response);
                Promise.reject();
            }
        },
        error => {
            console.log(error);
            return Promise.reject();
        });

    //请求
    return axiosGet(config);
}

export function axiosPost(url, data = {}) {
    const axiosPost = axios.create({
        baseURL: constBaseURL2,
        // baseURL : 'http://1.15.112.44:18080',
        // timeout: 5000
    });

    axiosPost.interceptors.request.use(
        config => {
            config.headers.common['Authentication-Token'] = localStorage.getItem('token');
            return config;
        },
        error => {
            console.log(error);
            return Promise.reject();
        }
    );

    axiosPost.interceptors.response.use(
        response => {
            if (response.status === 200) {
                if (response.data.status === 403) {
                    localStorage.removeItem("token");

                }
                return response.data;

            } else {
                console.log(response);
                Promise.reject();
            }
        },
        error => {
            console.log(error);
            //   return Promise.reject();
        });
    return axiosPost.post(url, data);
}

export function instance3() {

}
