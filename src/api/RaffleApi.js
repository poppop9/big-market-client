import axios from '../config/AxiosConfig.js'
import DevConstant from "../model/DevConstant.js";

/**
 * 获取奖品列表
 */
export function findAwardList() {
    return axios.get('/api/raffle/assemble/v2/queryAwardList',
        {
            params: {
                activityId: DevConstant.Activity.activityId
            }
        })
        .then(res => {
            console.log("奖品列表: ", res.data.data.awardBOs);
            return res.data.data.awardBOs; // 返回奖品列表
        })
        .catch(err => {
            console.error(err);
            throw err;
        });
}

/**
 * 抽奖
 */
export function raffle() {
    return axios.get('/api/raffle/dispatch/v2/raffle', {
        params: {
            activityId: DevConstant.Activity.activityId,
        }
    }).then(res => {
        return res.data.data.awardBO.awardIdStr;
    }).catch(err => {
        console.log(err);
        throw err;
    });
}

/**
 * 查询当前的抽奖次数
 */
export function findRaffleCount(){
    return axios.get('/api/raffle/assemble/v1/findRaffleCount', {
        params: {
            activityId: DevConstant.Activity.activityId,
        }
    }).then(res => {
        return res.data.data.raffleCount;
    }).catch(err => {
        console.log(err);
        throw err;
    });
}
