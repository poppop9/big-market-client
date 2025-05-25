import {useEffect, useState} from "react";
import axios from '../config/AxiosConfig.js'
import DevConstant from "../model/DevConstant.js";
import {findUserRewardAccountPoints} from "../api/RaffleApi.js";

export default function RewardMain(props) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [prizes, setPrizes] = useState([]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        axios.get("/api/reward/v1/findExchangePrizes", {
            params: {
                activityId: DevConstant.Activity.activityId,
            }
        })
            .then(res => {
                if (res.data.code === 100) {
                    setPrizes(res.data.data.exchangePrizes);
                } else {
                    console.error("接口响应异常：", res.data.message);
                }
            })
            .catch(err => {
                console.error("请求失败：", err);
            });
    }, []);

    const handleExchange = (exchangePrizesId) => {
        axios.get("/api/reward/v1/exchangePrizes", {
            params: {
                activityId: 10001,
                exchangePrizesId: exchangePrizesId
            }
        }).then(res => {
            if (res.data.code === 100) {
                alert("兑换成功！");
            } else {
                alert("兑换失败：" + res.data.message);
            }
            findUserRewardAccountPoints().then(data =>
                // eslint-disable-next-line react/prop-types
                props.setPoints(data.data.userRewardAccountPoints)
            )
        }).catch(err => {
            console.error("兑换请求失败：", err);
            alert("兑换请求异常");
        });
    }

    const chunkedPrizes = [];
    for (let i = 0; i < prizes.length; i += 4) {
        chunkedPrizes.push(prizes.slice(i, i + 4));
    }

    return (<>
        <div
            className={"bg-[#fa2255] bg-[url('src/assets/full-page.png')] bg-cover bg-center pt-12 pb-12 h-150"}>
            <div className="flex flex-col space-y-10 w-full">
                {chunkedPrizes.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex space-x-12 justify-center w-full">
                        {row.map(prize => (
                            <div key={prize.exchangePrizesId} className="card bg-base-100 w-80 shadow-sm">
                                <div className="card-body">
                                    <h2 className="card-title">{prize.exchangePrizesName}</h2>
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-primary"
                                                onClick={() => handleExchange(prize.exchangePrizesId)}>
                                            {prize.points} 积分兑换
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    </>)
}