import {Route, Routes} from "react-router-dom";
import RaffleMain from "../RaffleMain.jsx";
import ActivityMain from "../ActivityMain.jsx";
import RewardMain from "../RewardMain.jsx";

export default function Main(props) {
    return (<>
        <Routes>
            <Route path={"/"} element={<RaffleMain
                isLogin={props.isLogin}
                awardList={props.awardList}
                setRaffleCount={props.setRaffleCount}
            />}/>
            <Route path={"/activity"} element={<ActivityMain/>}/>
            <Route path={"/reward"} element={<RewardMain/>}/>
            {/*<Route path={"/login"} element={<Login/>}/>*/}
            {/*<Route path={"/register"} element={<Register/>}/>*/}
        </Routes>
    </>)
}