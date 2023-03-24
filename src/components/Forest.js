import uniqid from 'uniqid';
import firestoreHandler from '../util/firestoreHandler';
import Dummy from '../util/Dummy';
import { useState, useEffect } from 'react';
import '../styles/Forest.css';

export const Forest = ({setComponent, setTree, setDemo}) => {
    const [demoData, setDemoData] = useState([]);
    const [demoAlert, setDemoAlert] = useState([]);
    const [data, setData] = useState([]);
    const [alert, setAlert] = useState([]);

    const monitorTree = (forestID, isDemo) => {
        if (isDemo) setDemo(true);
        else setDemo(false);
        setComponent(1);
        setTree(forestID);
    }

    const updDataDemo = (forest) => {
        const tempData = [];
        const tempAlert = []
        for(const i of Object.keys(forest)){
            let alertTrack = 0
            const temp = {
                forestID : i,
                forestName : "",
                status : [
                    0,
                    0,
                    0,
                    0
                ]
            };

            for(const j of Object.keys(forest[i])){
                if (j === "name"){
                    temp.forestName = forest[i][j];
                }else if (forest[i][j].isGateway === false){
                    alertTrack |= (forest[i][j].temp >= 35 || forest[i][j].humid <= 25);
                    temp.status[0] += forest[i][j].temp;
                    temp.status[1] += forest[i][j].humid;
                    temp.status[2] += forest[i][j].heatIndex;
                    temp.status[3] += forest[i][j].rain;
                }
            }

            // Get the average
            for(let j = 0; j < 3; j++){
                temp.status[j] /= Object.keys(forest[i]).length-1;
            } 

            // If majority rains, consider it raining
            temp.status[3] = (temp.status[3] >= Math.floor((Object.keys(forest[i]).length-1)/2) ? 1 : 0);

            tempData.push(temp);
            tempAlert.push(alertTrack);
        }
        setDemoData([...tempData]);
        setDemoAlert([...tempAlert]);
    }

    const updData = (forest) => {
        const tempData = [];
        const tempAlert = [];
        for(const i of Object.keys(forest)){
            let alertTrack = 0
            const temp = {
                forestID : i,
                forestName : "",
                status : [
                    0,
                    0,
                    0,
                    0
                ]
            };

            for(const j of Object.keys(forest[i])){
                if (j === "name"){
                    temp.forestName = forest[i][j];
                }else if (forest[i][j].isGateway === false){
                    alertTrack |= (forest[i][j].temp >= 35 || forest[i][j].humid <= 25);
                    temp.status[0] += forest[i][j].temp;
                    temp.status[1] += forest[i][j].humid;
                    temp.status[2] += forest[i][j].heatIndex;
                    temp.status[3] += forest[i][j].rain;
                }
            }

            // Get the average
            for(let j = 0; j < 3; j++){
                temp.status[j] /= Object.keys(forest[i]).length-1;
            } 

            // If majority rains, consider it raining
            temp.status[3] = (temp.status[3] >= Math.floor((Object.keys(forest[i]).length-1)/2) ? 1 : 0);

            tempData.push(temp);
            tempAlert.push(alertTrack);
        }
        setData([...tempData]);
        setAlert([...tempAlert]);
    }

    useEffect(
        () => {
            firestoreHandler.setRead();
            firestoreHandler.subscribe(updData);
            Dummy.subscribe(updDataDemo);
            
            return () => {
                firestoreHandler.unsetRead();
                firestoreHandler.unsubscribe(updData);
                Dummy.unsubscribe();
            }
        }
    , [])


    return(
        <div className="forest-comp">
            <div className="forest-top">
                <h1>
                    Watchlist
                </h1>
            </div>
            <div className="forest-card-container">
                {
                    demoData.map((item, index) => {
                        return(
                            <div key={uniqid()} className="forest-card" onClick={() => monitorTree(item.forestID, true)}>
                                <h3 className={`forest-card-name ${demoAlert[index] ? 'forest-name-alert' : null}`}>
                                    {
                                        demoAlert[index] ? 
                                        `${item.forestName} !!!`
                                        :
                                        item.forestName
                                    }
                                </h3>
                                <div className="forest-card-temp">
                                    <p className='forest-card-prop-title'>Temperature</p>
                                    <p className='forest-card-prop-val'>{`${item.status[0].toFixed(2)} °C`}</p>
                                </div>
                                <div className="forest-card-humid">
                                    <p className='forest-card-prop-title'>Humidity</p>
                                    <p className='forest-card-prop-val'>{`${item.status[1].toFixed(2)} %`}</p>
                                </div>
                                <div className="forest-card-heat">
                                    <p className='forest-card-prop-title'>Heat Index</p>
                                    <p className='forest-card-prop-val'>{`${item.status[2].toFixed(2)} °C`}</p>
                                </div>
                                <p className='forest-card-rain'>Rain Status : {(item.status[3] === 1 ? "Raining" : "Not Raining")}</p>
                            </div>
                        )
                    })
                }
                {
                    data.map((item, index) => {
                        return(
                            <div key={uniqid()} className="forest-card" onClick={() => monitorTree(item.forestID, false)}>
                                <h3 className={`forest-card-name ${alert[index] ? 'forest-name-alert' : null}`}>
                                    {
                                        alert[index] ? 
                                        `${item.forestName} !!!`
                                        :
                                        item.forestName
                                    }
                                </h3>
                                <div className="forest-card-temp">
                                    <p className='forest-card-prop-title'>Temperature</p>
                                    <p className='forest-card-prop-val'>{`${item.status[0].toFixed(2)} °C`}</p>
                                </div>
                                <div className="forest-card-humid">
                                    <p className='forest-card-prop-title'>Humidity</p>
                                    <p className='forest-card-prop-val'>{`${item.status[1].toFixed(2)} %`}</p>
                                </div>
                                <div className="forest-card-heat">
                                    <p className='forest-card-prop-title'>Heat Index</p>
                                    <p className='forest-card-prop-val'>{`${item.status[2].toFixed(2)} °C`}</p>
                                </div>
                                <p className='forest-card-rain'>Rain Status : {(item.status[3] === 1 ? "Raining" : "Not Raining")}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>    
    )
};