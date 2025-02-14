import {useEffect, useState} from "react";
import {doLogin, logoutByToken} from "../../api/SecurityApi.js";
import {findAwardList} from "../../api/RaffleApi.js";
import PropTypes from 'prop-types'; // 引入 prop-types

// 明确类型
RaffleHeader.propTypes = {
    userInfo: PropTypes.object,
    setUserInfo: PropTypes.func,
    setIsLogin: PropTypes.func,
    setAwardList: PropTypes.func
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
    </>)
}