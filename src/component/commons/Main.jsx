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
                raffleCount={props.raffleCount}
                setRaffleCount={props.setRaffleCount}
                setAvailableRaffleCount={props.setAvailableRaffleCount}
                setPoints={props.setPoints}
            />}/>
            <Route path={"/activity"} element={<ActivityMain
                setAvailableRaffleCount={props.setAvailableRaffleCount}
            />}/>
            <Route path={"/reward"} element={<RewardMain/>}/>
            {/*<Route path={"/login"} element={<Login/>}/>*/}
            {/*<Route path={"/register"} element={<Register/>}/>*/}
        </Routes>
    </>)
}