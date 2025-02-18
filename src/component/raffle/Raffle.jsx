import RaffleHeader from "./RaffleHeader.jsx";
import RaffleMain from "./RaffleMain.jsx";
import RaffleFooter from "./RaffleFooter.jsx";
import {useEffect, useState} from "react";
import {findLoginUserInfo} from "../../api/SecurityApi.js";
import {findRaffleCount} from "../../api/RaffleApi.js";

export default function Raffle() {
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


    return (
        <div className={"bg-[#fa2255] bg-[url('src/assets/full-page.png')] bg-cover bg-center"}>
            <RaffleHeader
                userInfo={userInfo} setUserInfo={setUserInfo}
                isLogin={isLogin} setIsLogin={setIsLogin}
                awardList={awardList} setAwardList={setAwardList}
                raffleCount={raffleCount} setRaffleCount={setRaffleCount}
            />
            <RaffleMain
                isLogin={isLogin}
                awardList={awardList}
                setRaffleCount={setRaffleCount}
            />
            <RaffleFooter/>
        </div>
    )
}