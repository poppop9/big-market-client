import {useState, useRef, useEffect} from 'react'
import {LuckyWheel} from '@lucky-canvas/react'
import {findAwardList, raffle} from "../../api/RaffleApi.js";
import PropTypes from 'prop-types'; // 引入 prop-types

// 明确类型
RaffleMain.propTypes = {
    awardList: PropTypes.array,
};

export default function RaffleMain(props) {
    const [blocks] = useState([
        {padding: '10px', background: '#f3e21c'}
    ])
    const [prizes, setPrizes] = useState([
        {background: '#b8c5f2', fonts: [{text: '0', top: '15px'}]},
        {background: '#b8c5f2', fonts: [{text: '1', top: '15px'}]},
        {background: '#b8c5f2', fonts: [{text: '2', top: '15px'}]},
        {background: '#b8c5f2', fonts: [{text: '3', top: '15px'}]},
        {background: '#b8c5f2', fonts: [{text: '4', top: '15px'}]},
        {background: '#b8c5f2', fonts: [{text: '5', top: '15px'}]},
        {background: '#b8c5f2', fonts: [{text: '6', top: '15px'}]},
        {background: '#b8c5f2', fonts: [{text: '7', top: '15px'}]},
        {background: '#b8c5f2', fonts: [{text: '8', top: '15px'}]},
    ])
    const [buttons] = useState([
        {radius: '40%', background: '#f3e21c'},
        {radius: '35%', background: '#afc8ff'},
        {
            radius: '30%', background: '#FA2255',
            pointer: true,
            fonts: [
                {
                    text: '抽奖',
                    top: '-14px',
                    fontWeight: 'bold',
                    fontSize: '25px',
                    fontColor: '#fff'
                }
            ]
        }
    ])
    const myLucky = useRef()

    /**
     * 根据奖品排序选择背景颜色
     */
    function selectBackgroundColor(awardSort) {
        if (awardSort === 1) {
            return '#e9e8fe';
        } else if (awardSort === 2 || awardSort === 3 || awardSort === 4 || awardSort === 5) {
            return '#FFB3B3';
        } else if (awardSort === 6 || awardSort === 7 || awardSort === 8) {
            return '#FF6666';
        } else if (awardSort === 9) {
            return '#f3e21c';
        }
    }

    useEffect(() => {
        findAwardList()
            .then(awardList => {
                setPrizes(awardList.map(((item, index) => {
                    return {
                        awardIdStr: item.awardIdStr,
                        index: index,
                        background: selectBackgroundColor(item.awardSort),
                        fonts: [
                            {text: item.awardTitle, top: '15px'},
                            {
                                text: item.awardSubtitle == null ? '' : item.awardSubtitle + ' 🔒',
                                fontColor: 'rgb(55,53,53)',
                                top: '70px',
                                fontSize: '12px',
                            }
                        ]
                    }
                })));
            })
    }, []);

    useEffect(() => {
        if (props.awardList.length > 0) {
            setPrizes(props.awardList.map(((item, index) => {
                return {
                    awardIdStr: item.awardIdStr,
                    index: index,
                    background: selectBackgroundColor(item.awardSort),
                    fonts: [
                        {text: item.awardTitle, top: '14px'},
                        {
                            text: item.awardSubtitle == null ? '' : item.awardSubtitle + ' 🔒',
                            fontColor: 'rgb(55,53,53)',
                            top: '70px',
                            fontSize: '12px',
                        }
                    ]
                }
            })));
        }
    }, [props.awardList]);

    return (<>
        <br/>
        <br/>
        <br/>
        <div className={"flex justify-center"}>
            <LuckyWheel
                ref={myLucky}
                width="500px"
                height="500px"
                blocks={blocks}
                prizes={prizes}
                buttons={buttons}
                onStart={() => {  // 点击抽奖时触发
                    myLucky.current.play()  // 调用该方法时，游戏才会开始
                    setTimeout(() => {
                        raffle()
                            .then(awardIdStr => {
                                console.log("awardIdStr: ", JSON.stringify(awardIdStr));

                                const index = prizes
                                    .find(item => item.awardIdStr === awardIdStr)
                                    .index;
                                console.log("index: ", index);
                                myLucky.current.stop(index)
                            })
                            .catch(err => {
                                alert("抽奖失败，请重试 : " + JSON.stringify(err.response))
                                myLucky.current.stop()
                                throw err;
                            })
                    }, 2500)
                }}
                onEnd={prize => {  // 抽奖结束时触发
                    var prizeString = JSON.stringify(prize);
                    console.log("prize: ", prizeString);
                    alert('恭喜你抽到 👉👉👉' + prize.fonts[0].text + ' 👈👈👈 奖品')
                }}
            />
        </div>
        <br/>
        <br/>
        <br/>
    </>)
}