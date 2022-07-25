import { message } from 'antd';
import axios, { Axios, AxiosError, AxiosResponse } from 'axios';
export default class RequestManager {
    private constructor() {}
    /* A function that is called when the request is fulfilled. */
    private static fulfillFn = (res: AxiosResponse<any>) => {
        return res.data;
    };
    private static rejectFn = (error: AxiosError) => {
        if (error.response) {
            const status = error.response.status;
            switch (status) {
                case 400:
                    if ('message' in error.response.data) {
                        message.error(error.response.data.message);
                    }
                    break;
                case 401:
                    message.error(error.response.data.message ?? 'Unauthorized');
                    //Todo: Log user out
                    break;
                case 403:
                    message.error(error.response.data.message ?? 'Permission denied');
                    break;
                case 404:
                    message.error(error.response.data.message ?? 'Resource request not found');
                    break;

                default:
                    message.error(error.response.data.message ?? 'Server error occurred');
                    break;
            }

            return Promise.reject(error.response.data);
        } else if (error.request) {
            message.error('Network error!. Check internet connection and try again');
            return Promise.reject(error);
        } else {
            message.error(error.message);

            return Promise.reject(error);
        }
    };
    private static _instance: Axios;
    private static _initialize() {
        this._instance = axios.create({});
        this._instance.interceptors.response.use(this.fulfillFn, this.rejectFn);
        return this._instance;
    }
    public static put(url: string, data: any) {
        if (!this._instance) {
            this._initialize();
        }
        return this._instance.put(url, data);
    }
    public static post(url: string, data: any) {
        if (!this._instance) {
            this._initialize();
        }
        return this._instance.post(url, data);
    }
    public static patch(url: string, data: any) {
        if (!this._instance) {
            this._initialize();
        }
        return this._instance.patch(url, data);
    }
    public static get<T = any>(url: string) {
        if (!this._instance) {
            this._initialize();
        }
        return this._instance.get<any, T>(url);
    }
    public static delete(url: string) {
        if (!this._instance) {
            this._initialize();
        }
        return this._instance.delete(url);
    }
}
