import RaffleHeader from "./RaffleHeader.jsx";
import RaffleMain from "./RaffleMain.jsx";
import RaffleFooter from "./RaffleFooter.jsx";
import {useEffect, useState} from "react";
import {findLoginUserInfo} from "../../api/SecurityApi.js";

export default function Raffle() {
    const [userInfo, setUserInfo] = useState(null)

    const [isLogin, setIsLogin] = useState(false);
    const [awardList, setAwardList] = useState([])

    useEffect(() => {
        findLoginUserInfo().then(data => {
            setUserInfo(data);
        })
    }, []);

    return (
        <div className={"bg-[#fa2255] bg-[url('src/assets/full-page.png')] bg-cover bg-center"}>
            <RaffleHeader
                userInfo={userInfo} setUserInfo={setUserInfo}
                isLogin={isLogin} setIsLogin={setIsLogin}
                awardList={awardList} setAwardList={setAwardList}
            />
            <RaffleMain
                isLogin={isLogin}
                awardList={awardList}
            />
            <RaffleFooter/>
        </div>
    )
}