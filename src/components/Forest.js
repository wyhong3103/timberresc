import uniqid from 'uniqid';
import firestoreHandler from '../util/firestoreHandler';
import { useState, useEffect } from 'react';
import '../styles/Forest.css';

export const Forest = ({setComponent, setTree}) => {
    const [data, setData] = useState([]);

    const monitorTree = (forestID) => {
        setComponent(1);
        setTree(forestID);
    }

    const updData = (forest) => {
        const temp = [];
        for(const i of Object.keys(forest)){
            const temp2 = {
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
                    temp2.forestName = forest[i][j];
                }else if (forest[i][j].isGateway === false){
                    temp2.status[0] += forest[i][j].temp;
                    temp2.status[1] += forest[i][j].humid;
                    temp2.status[2] += forest[i][j].heatIndex;
                    temp2.status[3] += forest[i][j].rain;
                }
            }

            // Get the average
            for(let j = 0; j < 3; j++){
                temp2.status[j] /= Object.keys(forest[i]).length-1;
            } 

            // If majority rains, consider it raining
            temp2.status[3] = (temp2.status[3] >= Math.floor((Object.keys(forest[i]).length-1)/2) ? 1 : 0);

            temp.push(temp2);
        }
        setData([...temp]);
    }

    useEffect(
        () => {
        }
    ,[])

    useEffect(
        () => {
            firestoreHandler.setRead();
            firestoreHandler.subscribe(updData);

            return () => {
                firestoreHandler.unsetRead();
                firestoreHandler.unsubscribe(updData);
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
                    data.length === 0 ? 
                    
                    <div className='forest-empty'>
                        It's empty!
                    </div>

                    :

                    data.map(item => {
                        return(
                            <div key={uniqid()} className="forest-card" onClick={() => monitorTree(item.forestID)}>
                                <h3 className='forest-card-name'>{item.forestName}</h3>
                                <div className="forest-card-temp">
                                    <p className='forest-card-prop-title'>Temperature</p>
                                    <p className='forest-card-prop-val'>{item.status[0].toFixed(2)}</p>
                                </div>
                                <div className="forest-card-humid">
                                    <p className='forest-card-prop-title'>Humidity</p>
                                    <p className='forest-card-prop-val'>{item.status[1].toFixed(2)}</p>
                                </div>
                                <div className="forest-card-heat">
                                    <p className='forest-card-prop-title'>Heat Index</p>
                                    <p className='forest-card-prop-val'>{item.status[2].toFixed(2)}</p>
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