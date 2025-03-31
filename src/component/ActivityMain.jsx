export default function ActivityMain() {
    return (<>
        <div
            className={"bg-[#fa2255] bg-[url('src/assets/full-page.png')] bg-cover bg-center pt-12 pb-12"}>
            <div className={"flex space-x-10 justify-center w-full"}>
                {/* 待支付活动单列表 */}
                <ul className="basis-5/16 grow-0 list bg-base-100 rounded-box shadow-md h-120 overflow-y-auto">
                    <li className="p-4 pb-2 text-base text-center font-bold tracking-wide sticky top-0 bg-base-100 z-10">待支付的活动单</li>
                    <li className="list-row">
                        <div className={"flex items-center"}>活动单类型</div>
                        <div className={"flex items-center"}>购买时间</div>
                        <button className="btn btn-link px-0">查看订单详情</button>
                        <button className="btn btn-link btn-error px-0">取消订单</button>
                        <button className="btn btn-link btn-success px-0"> 支付订单</button>
                    </li>
                </ul>
                <div className={"basis-3/16 grow-0 flex flex-col h-120"}>
                    {/* 签到领取活动单 */}
                    <div className={"flex-1 mb-5"}>
                        <div className="card bg-base-100 w-96 shadow-sm">
                            <p className={"text-base text-center font-bold pt-4 pl-4"}>签到领取活动单</p>
                            <div className="card-body">
                                <button className="btn btn-soft btn-success">✅ 签到</button>
                            </div>
                        </div>
                    </div>
                    {/* 兑换活动单 */}
                    <div className={"flex-2"}>
                        <div className="card bg-base-100 w-96 shadow-sm">
                            <p className={"text-base text-center font-bold pt-4 pl-4"}>兑换活动单</p>
                            <div className="card-body">
                                <fieldset className="fieldset flex items-center">
                                    <legend className="fieldset-legend">请输入兑换码</legend>
                                    <input type="text" className="input flex-1" placeholder="Type here"/>
                                    <button className="btn btn-soft btn-primary ml-2">✔️</button>
                                </fieldset>
                            </div>
                            <div className={"card-body"}>
                                <p>……</p>
                                <p>……</p>
                                <p>……</p>
                                <p>……</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* 充值活动单 */}
                <div className={"basis-5/16 grow-0"}>
                    <div className="card bg-base-100 w-full shadow-sm">
                        <p className={"text-base text-center font-bold pt-4 pl-4"}>充值活动单</p>
                        <div className="card-body">
                            <h2 className={"text-base font-bold"}>活动单类型</h2>
                            <div>
                                <input type="radio" name="radio-3" className="radio radio-neutral radio-sm mr-2"
                                       defaultChecked/>
                                <span className={"mr-5"}>一抽活动单</span>
                                <input type="radio" name="radio-3" className="radio radio-neutral radio-sm mr-2"/>
                                <span className={"mr-5"}>十抽活动单</span>
                                <input type="radio" name="radio-3" className="radio radio-neutral radio-sm mr-2"/>
                                <span className={"mr-5"}>一百抽活动单</span>
                            </div>
                            <h2 className={"text-base font-bold mt-4"}>购买数量</h2>
                            <input type="number" className="input w-full" placeholder="Type here"/>
                            <p className={"mt-5 font-bold text-2xl text-end"}>0 元</p>
                            <div className="card-actions justify-end mt-33.5">
                                <button className="btn btn-primary">确认购买</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}