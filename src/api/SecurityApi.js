import axios from '../config/AxiosConfig.js'
import DevConstant from "../model/DevConstant.js";

/**
 * 登录
 */
export function doLogin(userId, password) {
    return axios.get('/api/security/user/v1/doLogin',
        {
            params: {
                activityId: DevConstant.Activity.activityId,
                userId: userId,
                password: password
            }
        })
        .then(res => {
            return res.data.data.userInfo;
        })
        .catch(err => {
            console.error(err);
            throw err;
        });
}

/**
 * 查询登录用户的信息
 */
export function findLoginUserInfo() {
    return axios.get('/api/security/user/v1/findLoginUserInfo')
        .then(res => {
            return res.data.data.userInfo;
        })
        .catch(err => {
            console.error(err);
            throw err;
        });
}

/**
 * 退出登录
 */
export function logoutByToken(token) {
    axios.delete('/api/security/user/v1/logoutByToken',
        {
            data: {
                token: token
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(() => {
            localStorage.setItem("isLogin", "false");
            localStorage.removeItem("userInfo");
        })
        .catch(err => {
            console.error(err);
            throw err;
        });
}

