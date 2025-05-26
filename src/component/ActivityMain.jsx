import axios from '../config/AxiosConfig.js'
import {useEffect, useState} from "react";
import {findAvailableRaffleCount} from "../api/RaffleApi.js";

export default function ActivityMain(props) {
    const [quantity, setQuantity] = useState(0);

    const handleChange = (e) => {
        let value = e.target.value;
        // 去掉前导零，比如 "01" => "1"
        if (value.startsWith("0") && value.length > 1) {
            value = value.replace(/^0+/, '');
        }
        // 只允许整数输入
        const num = parseInt(value, 10);
        if (!isNaN(num) && num >= 0) {
            setQuantity(num);
        } else if (value === '') {
            // 用户删除了输入框内容
            setQuantity(0);
        }
    };

    const handlePurchase = async () => {
        try {
            const res = await axios.post("/api/activity/v1/rechargeAO", {
                activityId: 10001,
                activityOrderType: {activityOrderTypeName: "PAID_PURCHASE"},
                aoProductId: "1910937768625401856",
                purchaseQuantity: quantity
            });
            const {code, message} = res.data;

            if (code === 100) alert("充值活动单成功");
            else alert("充值活动单失败：" + message);

            const res2 = await findAvailableRaffleCount();
            const newAvailableCount = res2?.data?.availableRaffleCount ?? 0; // 安全访问，默认值设为0
            // eslint-disable-next-line react/prop-types
            props.setAvailableRaffleCount(newAvailableCount);  // 更新到 App 状态中
        } catch (err) {
            console.error("充值活动单异常", err);
            alert("充值活动单异常，请稍后再试");
        }
    };

    const handleSignIn = async () => {
        try {
            const response = await axios.post('/api/activity/v1/rechargeAO', {
                activityId: 10001,
                activityOrderType: {
                    activityOrderTypeName: "SIGN_IN_TO_CLAIM"
                }
            });

            console.log("签到成功:", response.data);
            alert("✅ 签到成功！");
            // 查询可用抽奖次数
            findAvailableRaffleCount().then(res => {
                if (res.code === 100 && res.data) {
                    // eslint-disable-next-line react/prop-types
                    props.setAvailableRaffleCount(res.data.availableRaffleCount)
                }
            })
        } catch (error) {
            console.error("签到失败:", error.response?.data || error.message);
            alert("❌ 签到失败，请稍后再试");
        }
    };

    const [orders, setOrders] = useState([]);
    const fetchPendingOrders = async () => {
        axios
            .get("/api/activity/v1/findAllPendingPaymentAO", {
                params: {
                    activityId: 10001, // 或 10001L，JS里没有 Long 类型，用数字就可以
                },
            })
            .then((res) => {
                if (res.data.code === 100) {
                    setOrders(res.data.data.activityOrderBOList || []);
                }
            })
            .catch((error) => {
                console.error("获取待支付订单失败：", error);
            });
    };

    useEffect(() => {
        fetchPendingOrders();
    }, []);

    return (<>
        <div
            className={"bg-[#fa2255] bg-[url('src/assets/full-page.png')] bg-cover bg-center pt-12 pb-12"}>
            <div className={"flex space-x-8 justify-center w-full"}>
                {/* 待支付活动单列表 */}
                <ul className="basis-7/16 list bg-base-100 rounded-box shadow-md h-120 overflow-y-auto">
                    <li className="p-4 pb-2 text-base text-center font-bold tracking-wide sticky top-0 bg-base-100 z-10">
                        待支付的活动单
                    </li>
                    {orders.map((order, index) => (
                        <li className="list-row flex justify-between gap-4 px-4 py-2 items-center"
                            key={order.activityOrderId}>
                            <div className="flex items-center gap-4">
                                <div className="w-6 font-bold">{index + 1}</div>
                                <div>{order.activityOrderIdStr}</div>
                                <div>购买数量 : {order.totalRaffleCount} </div>
                                <div className="text-left whitespace-nowrap">
                                    {new Date(order.activityOrderEffectiveTime).toLocaleString()}
                                </div>
                            </div>
                            <div className="ml-auto flex items-center gap-2">
                                <button className="btn btn-link btn-success px-0">支付订单</button>
                                <button
                                    className="btn btn-link btn-error px-0"
                                    onClick={async () => {
                                        try {
                                            const response = await axios.patch('/api/activity/v1/cancelAO', null, {
                                                params: {
                                                    activityOrderId: order.activityOrderIdStr,
                                                }
                                            });

                                            if (response.status === 200) alert('订单已成功取消');
                                            else alert(`取消失败: ${response.data.message || '未知错误'}`);
                                        } catch (error) {
                                            alert(`取消失败: ${error.response?.data?.message || error.message || '未知错误'}`);
                                        }
                                        fetchPendingOrders();
                                    }}>
                                    取消订单
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className={"basis-3/16 flex flex-col h-120"}>
                    {/* 签到领取活动单 */}
                    <div className={"flex-1 mb-5"}>
                        <div className="card bg-base-100 shadow-sm">
                            <p className={"text-base text-center font-bold pt-4 pl-4"}>签到领取活动单</p>
                            <div className="card-body">
                                <button className="btn btn-soft btn-success" onClick={handleSignIn}>✅ 签到</button>
                            </div>
                        </div>
                    </div>
                    {/* 兑换活动单 */}
                    <div className={"flex-2"}>
                        <div className="card bg-base-100 shadow-sm">
                            <p className={"text-base text-center font-bold pt-4 pl-4"}>兑换活动单</p>
                            <div className="card-body">
                                <fieldset className="fieldset flex items-center">
                                    <legend className="fieldset-legend">请输入兑换码</legend>
                                    <input type="text" className="input flex-1" placeholder="Type here"/>
                                    <button className="btn btn-soft btn-primary ml-2">✔️</button>
                                </fieldset>
                            </div>
                            <div className={"card-body"}>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                            </div>
                        </div>
                    </div>
                </div>
                {/* 充值活动单 */}
                <div className={"basis-5/16"}>
                    <div className="card bg-base-100 w-full shadow-sm">
                        <p className={"text-base text-center font-bold pt-4 pl-4"}>充值活动单</p>
                        <div className="card-body">
                            <h2 className={"text-base font-bold mt-4"}>购买数量</h2>
                            <input
                                type="number"
                                className="input w-full"
                                placeholder="请输入购买数量"
                                value={quantity === 0 ? '' : quantity}
                                onChange={handleChange}
                                min={0}
                            />
                            <p className={"mt-5 font-bold text-2xl text-end"}>{quantity * 10} 元</p>
                            <div className="card-actions justify-end mt-48.5">
                                <button className="btn btn-primary" onClick={handlePurchase}>
                                    确认购买
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}