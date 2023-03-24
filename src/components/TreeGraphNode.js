import '../styles/TreeGraphNode.css';
import { Chart } from './Chart';
import { Map } from './Map';
import { useState, useEffect } from 'react';
import { timestampToTimeString } from "../util/util";
import firestoreHandler from '../util/firestoreHandler';
import Dummy from '../util/Dummy';

export const TreeGraphNode = ({treeID, nodeID, setViewNode, isDemo}) => {

    const [batStat, setBatStat] = useState(0);
    const [rainStat, setRainStat] = useState(0);
    const [coord, setCoord] = useState([0,0]);
    const [alert, setAlert] = useState([false, false]);
    const [tempData, setTempData] = useState({
        labels : [],
        datasets : [
            {
                label : `Node ${nodeID}`,
                data : [],
                borderColor: '#3f3f46',
                backgroundColor: '#171717;',
            }
        ]
    });

    const [humidData, setHumidData] = useState({
        labels : [],
        datasets : [
            {
                label : `Node ${nodeID}`,
                data : [],
                borderColor: '#3f3f46',
                backgroundColor: '#171717;',
            }
        ]
    });

    const [heatIndexData, setHeatIndexData] = useState({
        labels : [],
        datasets : [
            {
                label : `Node ${nodeID}`,
                data : [],
                borderColor: '#3f3f46',
                backgroundColor: '#171717;',
            }
        ]
    });

    const backToTree = () => {
        setViewNode(0);
    }

    const updData = (forest) => {
        const node = forest[treeID][nodeID];

        const tempAlert = [node.temp >= 35, node.humid <= 25];
        const tempDataT = {...tempData};
        const humidDataT = {...humidData};
        const heatIndexDataT = {...heatIndexData};

        if (tempDataT.labels.length === 10) {
            tempDataT.labels.shift();
            tempDataT.labels.push(timestampToTimeString(node.timestamp));
            tempDataT.datasets[0].data.shift();
            tempDataT.datasets[0].data.push(node.temp);

            humidDataT.labels.shift();
            humidDataT.labels.push(timestampToTimeString(node.timestamp));
            humidDataT.datasets[0].data.shift();
            humidDataT.datasets[0].data.push(node.humid);

            heatIndexDataT.labels.shift();
            heatIndexDataT.labels.push(timestampToTimeString(node.timestamp));
            heatIndexDataT.datasets[0].data.shift();
            heatIndexDataT.datasets[0].data.push(node.heatIndex);
        }else{
            tempDataT.labels.push(timestampToTimeString(node.timestamp));
            tempDataT.datasets[0].data.push(node.temp);

            humidDataT.labels.push(timestampToTimeString(node.timestamp));
            humidDataT.datasets[0].data.push(node.humid);

            heatIndexDataT.labels.push(timestampToTimeString(node.timestamp));
            heatIndexDataT.datasets[0].data.push(node.heatIndex);
        }

        setTempData({...tempDataT});
        setAlert([...tempAlert]);
        setHumidData({...humidDataT});
        setHeatIndexData({...heatIndexDataT});
        setBatStat(node.batStat);
        setRainStat(node.rain);
        setCoord([node.lat, node.lon]);
    }

    useEffect(
        () => {
            if (!isDemo){
                firestoreHandler.setRead();
                firestoreHandler.subscribe(updData);
                return () => {
                    firestoreHandler.unsetRead();
                    firestoreHandler.unsubscribe(updData);
                }
            }else{
                Dummy.subscribe(updData);
                return () => {
                    Dummy.unsubscribe();
                }
            }
        }
    ,[])


    return(
        <div className='tree-graph-node-comp'>
            <div className='tree-graph-node-container'>
                <div className={`tree-graph-node-chart chart-comp-container ${(alert[0] ? 'tree-graph-node-name-alert' : null)}`}>
                    <h3>
                        Temperature (°C){(alert[0] ? ' !!!' : null)}
                    </h3>
                    <Chart data={tempData}/>
                </div>
                <div className={`tree-graph-node-chart chart-comp-container ${(alert[1] ? 'tree-graph-node-name-alert' : null)}`}>
                    <h3>
                        Humidity (%){(alert[1] ? ' !!!' : null)}
                    </h3>
                    <Chart data={humidData}/>
                </div>
                <div className="tree-graph-node-chart chart-comp-container">
                    <h3>Heat Index (°C)</h3>
                    <Chart data={heatIndexData}/>
                </div>
                <div className='tree-graph-node-rain'>
                    <h3 className='rain-stat-title'>
                        Rain Status
                    </h3>
                    <p className='rain-stat-result'>
                        {(rainStat === 1 ? "Raining" : "Not Raining")}
                    </p>
                </div>
                <div className='tree-graph-node-map'>
                    <h3>Map</h3>
                    <Map coord={coord}/>
                </div>
                <div className='tree-graph-node-bat-stat'>
                    <h3 className='bat-stat-title'>
                        Battery Status
                    </h3>
                    <p className='bat-stat-result'>
                        {batStat}
                    </p>
                </div>
            </div>
            <button className='back-to-tree-btn' onClick={backToTree}>
                Back
            </button>
        </div>
    )


};