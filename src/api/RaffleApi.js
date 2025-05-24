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
export function findRaffleCount() {
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

/**
 * 查询用户的可用抽奖次数
 */
export async function findAvailableRaffleCount() {
    try {
        const res = await axios.get('/api/activity/v1/findAvailableRaffleCount', {
            params: {
                activityId: 10001
            }
        });
        return res.data; // 返回格式：{ code: 100, message: "请求成功", data: { availableRaffleCount: 21 } }
    } catch (error) {
        console.error('获取可用抽奖次数失败:', error);
        throw error;
    }
}

/**
 * 查询用户积分
 */
export async function findUserRewardAccountPoints() {
    try {
        const res = await axios.get('/api/reward/v1/findUserRewardAccountPoints', {
            params: {
                activityId: 10001
            }
        });
        return res.data;
    } catch (error) {
        console.error('获取用户积分失败:', error);
        throw error;
    }
}
