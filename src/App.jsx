import './App.css'
import Header from "./component/commons/Header.jsx";
import Footer from "./component/commons/Footer.jsx";
import Main from "./component/commons/Main.jsx";
import {useEffect, useState} from "react";
import {findLoginUserInfo} from "./api/SecurityApi.js";
import {findRaffleCount} from "./api/RaffleApi.js";

function App() {
    const [userInfo, setUserInfo] = useState(null)
    const [isLogin, setIsLogin] = useState(false);
    const [awardList, setAwardList] = useState([])
    const [raffleCount, setRaffleCount] = useState('……')

    useEffect(() => {
        // 查询登录用户信息
        findLoginUserInfo().then(data => {
            setUserInfo(data);
        })
        // 查询当前抽奖次数
        findRaffleCount().then(data => {
            setRaffleCount(data);
        })
    }, []);

    return (<>
        <Header
            userInfo={userInfo} setUserInfo={setUserInfo}
            isLogin={isLogin} setIsLogin={setIsLogin}
            awardList={awardList} setAwardList={setAwardList}
            raffleCount={raffleCount} setRaffleCount={setRaffleCount}
        />
        <Main
            userInfo={userInfo} setUserInfo={setUserInfo}
            isLogin={isLogin} setIsLogin={setIsLogin}
            awardList={awardList} setAwardList={setAwardList}
            raffleCount={raffleCount} setRaffleCount={setRaffleCount}
        />
        <Footer/>
    </>)
}

export default App

/**
 * - 活动领域
 *     - todo 用户可以手动取消活动单（后端接口已提供）
 */