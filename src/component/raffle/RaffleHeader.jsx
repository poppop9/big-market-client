import {useEffect, useState} from "react";
import {doLogin, logoutByToken} from "../../api/SecurityApi.js";
import {findAwardList} from "../../api/RaffleApi.js";
import PropTypes from 'prop-types'; // 引入 prop-types

// 明确类型
RaffleHeader.propTypes = {
    userInfo: PropTypes.object,
    setUserInfo: PropTypes.func,
    setIsLogin: PropTypes.func,
    setAwardList: PropTypes.func,
    raffleCount: PropTypes.string
};

export default function RaffleHeader(props) {
    /**
     * 变量
     */
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false)
    const [loginError, setLoginError] = useState(false)
    const [isLoading, setIsLoading] = useState(false);

    /**
     * 方法
     */
    function doLoginAndRenderingData(userId, password) {
        setIsLoading(true);
        // 1. 执行登录接口
        doLogin(userId, password)
            .then(data => {
                props.setIsLogin(true);
                props.setUserInfo(data);

                // 2. 登录成功后，执行查询奖品列表接口
                findAwardList().then(awardList => {
                    props.setAwardList(awardList);
                    console.log("奖品列表: ", awardList);
                })

                // 3. 关闭 model
                setLoginSuccess(true);
                document.getElementById('login_model').close();
            })
            .catch(() => {
                setLoginError(true);
            });
        setIsLoading(false);
    }

    /**
     * 组件
     */
    return (<>
        {/* nav */}
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <ul className="menu menu-horizontal px-1">
                    <li><a className={"font-bold"}>💰 充值活动单</a></li>
                    <li>
                        <details>
                            <summary>Parent</summary>
                            <ul className="p-2">
                                <li><a>Submenu 1</a></li>
                                <li><a>Submenu 2</a></li>
                            </ul>
                        </details>
                    </li>
                    <li><a>Item 3</a></li>
                </ul>
            </div>
            <div className="navbar-center">
                <a className="text-3xl font-bold">🎁 抽奖活动平台 🎁</a>
            </div>
            <div className="navbar-end">
                {props.userInfo != null ? (
                    // 登录状态
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn m-1">👤 {props.userInfo.userName}</div>
                        <ul tabIndex={0}
                            className="dropdown-content menu bg-base-100 rounded-box z-1 p-2 shadow-base w-30">
                            <li><a>Item 1</a></li>
                            <li><a onClick={() => {
                                logoutByToken(props.userInfo.token);
                                window.location.reload();  // 刷新页面
                            }} className={"link link-error font-bold"}>🔚 退出登录</a></li>
                        </ul>
                    </div>
                ) : (
                    // 未登录状态
                    <div>
                        <button className="btn" onClick={() => document.getElementById('login_model').showModal()}>
                            👤 登录
                        </button>
                        <dialog id="login_model" className="modal">
                            <div className="modal-box w-xs p-0">
                                <fieldset className="fieldset bg-base-200 border border-base-300 p-4 rounded-box">
                                    {loginError && <div className="text-center text-error text-sm">❌ 登录失败</div>}
                                    <span className={"text-lg text-center text-gray-700"}>请登录后再进行抽奖</span>

                                    <label className="fieldset-label">账号</label>
                                    <input type="userId" className="input" placeholder="账号" value={userId}
                                           onChange={(e) => setUserId(e.target.value)}/>
                                    <label className="fieldset-label">密码</label>
                                    <input type="password" className="input" placeholder="密码" value={password}
                                           onChange={(e) => setPassword(e.target.value)}/>

                                    <div className={"flex justify-between"}>
                                        <div className="modal-action mt-4 w-5/11">
                                            <form method="dialog" className={"w-full"}>
                                                <button className="btn btn-soft btn-error w-full">❌ 取消</button>
                                            </form>
                                        </div>
                                        <button onClick={() => doLoginAndRenderingData(userId, password)}
                                                className="btn btn-soft btn-primary mt-4 w-5/11"
                                                disabled={isLoading}>✔️
                                            登录
                                        </button>
                                    </div>
                                </fieldset>
                            </div>
                        </dialog>
                    </div>
                )}
            </div>
        </div>

        {/* 状态 */}
        <div className="stats flex bg-white rounded-none">
            <div className="stat py-2">
                <div className="stat-figure">
                    <svg t="1739713387693" className="icon text-warning fill-amber-400" viewBox="0 0 1024 1024"
                         version="1.1"
                         xmlns="http://www.w3.org/2000/svg" p-id="4387" width="50">
                        <path
                            d="M535.845 390.344L512 274.266l-22.045 115.807c-24.025 4.319-47.06 15.746-65.687 34.283-48.41 48.501-48.41 126.965 0 175.375 48.411 48.41 126.965 48.41 175.375 0 48.501-48.501 48.501-126.965 0-175.375-18.086-18.086-40.402-29.513-63.797-34.013m256.178 401.681L615.659 615.659c-18.896 18.896-41.662 31.493-65.687 37.972l64.607 241.062C581.556 903.511 547.092 908.01 512 908.01s-69.466-4.589-102.489-13.317l64.607-241.062c-24.115-6.389-46.791-19.075-65.687-37.972L232.066 792.024c-50.93-50.93-85.123-112.477-102.399-177.534l240.882-64.517a146.534 146.534 0 0 1 0-75.855l-240.882-64.517c17.276-65.057 51.38-126.605 102.31-177.534l176.365 176.365c18.896-18.896 41.572-31.493 65.687-37.972l-64.517-241.062c33.023-8.728 67.396-13.317 102.489-13.317s69.466 4.589 102.579 13.317L549.973 370.46c24.025 6.389 46.791 19.075 65.687 37.972l176.365-176.365c49.941 49.941 84.943 110.948 102.669 177.444l-241.151 64.607a146.534 146.534 0 0 1 0 75.855l241.062 64.607c-17.726 66.496-52.64 127.505-102.579 177.444m38.15-598.11C745.143 108.971 632.215 62.18 512 62.18c-120.127 0-233.143 46.791-318.086 131.734C108.881 278.857 62.09 391.875 62.09 512c0 120.216 46.791 233.143 131.824 318.176C278.857 915.209 391.875 961.91 512 961.91c120.216 0 233.143-46.791 318.176-131.734C915.209 745.233 961.91 632.215 961.91 512c0-120.127-46.791-233.143-131.734-318.086z"
                            p-id="4388"></path>
                    </svg>
                </div>
                <div className="stat-title text-base">您当前已抽奖</div>
                <div className="stat-value text-warning text-2xl">{props.raffleCount} 次</div>
            </div>
            <div className="stat py-2">
                <div className="stat-figure text-secondary">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block h-8 w-8 stroke-current text-primary">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                </div>
                <div className="stat-title text-base">您剩余的抽奖次数</div>
                <div className="stat-value text-primary text-2xl">222 次</div>
            </div>
        </div>
    </>)
}