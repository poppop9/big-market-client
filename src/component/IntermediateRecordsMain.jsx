import {useEffect, useState} from "react";
import axios from "../config/AxiosConfig.js";

export default function IntermediateRecordsMain(props) {
    const [awards, setAwards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [awards2, setAwards2] = useState([]);
    const [loading2, setLoading2] = useState(true);
    const [error2, setError2] = useState("");

    useEffect(() => {
        const fetchAwards = async () => {
            try {
                const res = await axios.get("/api/raffle/dispatch/v2/getWinningAwardsInfo", {
                    params: {activityId: 10001},
                });
                if (res.data.code === 100) {
                    setAwards(res.data.data.winningAwards);
                } else {
                    setError("获取数据失败: " + res.data.message);
                }
            } catch (err) {
                setError("请求出错: " + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAwards();
    }, []);

    useEffect(() => {
        const fetchAwards2 = async () => {
            try {
                const res = await axios.get("/api/reward/v1/findExchangePrizesLogList", {
                    params: {activityId: 10001},
                });
                if (res.data.code === 100) {
                    setAwards2(res.data.data.exchangePrizesLogBOList);
                } else {
                    setError2("获取数据失败: " + res.data.message);
                }
            } catch (err) {
                setError2("请求出错: " + err.message);
            } finally {
                setLoading2(false);
            }
        };

        fetchAwards2();
    }, []);

    return (
        <div className="bg-[#fa2255] bg-[url('src/assets/full-page.png')] bg-cover bg-center pt-8 pb-8">
            <div className="flex justify-center w-full px-8 py-6 space-x-6 h-128">
                {/* 左侧面板：中奖记录列表 */}
                <div className="basis-7/16 list bg-base-100 rounded-box shadow-md h-120 overflow-y-auto">
                    <h1 className="p-4 pb-2 text-xl font-bold text-center tracking-wide sticky top-0 bg-base-100 z-10">
                        🎉 中奖记录列表
                    </h1>
                    {loading ? (
                        <div className="text-center text-gray-500 p-4">加载中...</div>
                    ) : error ? (
                        <div className="text-center text-red-500 p-4">{error}</div>
                    ) : awards.length === 0 ? (
                        <div className="text-center text-gray-500 p-4">暂无中奖记录</div>
                    ) : (
                        <ul className="space-y-2">
                            {awards.map((award, index) => (
                                <li
                                    key={index}
                                    className="list-row flex justify-between px-4 py-2 items-center bg-base-100 hover:bg-base-200 rounded-md shadow-sm"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 font-bold text-primary">{index + 1}</div>
                                        <div className="font-medium">{award.awardTitle}</div>
                                    </div>
                                    <div className="text-sm text-gray-500 whitespace-nowrap">
                                        {new Date(award.createTime).toLocaleString()}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* 右侧面板 */}
                <div className="basis-7/16 list bg-base-100 rounded-box shadow-md h-120 overflow-y-auto">
                    <h1 className="p-4 pb-2 text-xl font-bold text-center tracking-wide sticky top-0 bg-base-100 z-10">
                        📝 兑奖记录列表
                    </h1>
                    {loading2 ? (
                        <div className="text-center text-gray-500 p-4">加载中...</div>
                    ) : error2 ? (
                        <div className="text-center text-red-500 p-4">{error}</div>
                    ) : awards2.length === 0 ? (
                        <div className="text-center text-gray-500 p-4">暂无中奖记录</div>
                    ) : (
                        <ul className="space-y-2">
                            {awards2.map((award, index) => (
                                <li
                                    key={index}
                                    className="list-row flex justify-between px-4 py-2 items-center bg-base-100 hover:bg-base-200 rounded-md shadow-sm"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 font-bold text-primary">{index + 1}</div>
                                        <div className="font-medium">{award.exchangePrizesName}</div>
                                    </div>
                                    <div className="text-sm text-gray-500 whitespace-nowrap">
                                        {new Date(award.createTime).toLocaleString()}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}