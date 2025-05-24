import './App.css'
import Header from "./component/commons/Header.jsx";
import Footer from "./component/commons/Footer.jsx";
import Main from "./component/commons/Main.jsx";
import {useEffect, useState} from "react";
import {findLoginUserInfo} from "./api/SecurityApi.js";
import {findAvailableRaffleCount, findRaffleCount, findUserRewardAccountPoints} from "./api/RaffleApi.js";

function App() {
    const [userInfo, setUserInfo] = useState(null)
    const [isLogin, setIsLogin] = useState(false);
    const [awardList, setAwardList] = useState([])
    const [raffleCount, setRaffleCount] = useState('……')
    const [availableRaffleCount, setAvailableRaffleCount] = useState(0)
    const [points, setPoints] = useState(0);

    useEffect(() => {
        // 查询登录用户信息
        findLoginUserInfo().then(data => {
            setUserInfo(data);
        })
        // 查询当前抽奖次数与可用的抽奖次数
        findRaffleCount().then(data => {
            setRaffleCount(data);
        })
        // 查询可用抽奖次数
        findAvailableRaffleCount().then(res => {
            if (res.code === 100 && res.data) {
                setAvailableRaffleCount(res.data.availableRaffleCount)
            }
        })
        // 查询用户积分
        findUserRewardAccountPoints().then(data => {
            setPoints(data.data.userRewardAccountPoints);
        })
    }, []);

    return (<>
        <Header
            userInfo={userInfo} setUserInfo={setUserInfo}
            isLogin={isLogin} setIsLogin={setIsLogin}
            awardList={awardList} setAwardList={setAwardList}
            raffleCount={raffleCount} setRaffleCount={setRaffleCount}
            availableRaffleCount={availableRaffleCount}
            points={points}
        />
        <Main
            userInfo={userInfo} setUserInfo={setUserInfo}
            isLogin={isLogin} setIsLogin={setIsLogin}
            awardList={awardList} setAwardList={setAwardList}
            raffleCount={raffleCount} setRaffleCount={setRaffleCount}
            availableRaffleCount={availableRaffleCount} setAvailableRaffleCount={setAvailableRaffleCount}
            setPoints={setPoints}
        />
        <Footer/>
    </>)
}

export default App

/**
 * - 活动领域
 *     - todo 用户可以手动取消活动单（后端接口已提供）
 */