import '../styles/TreeGraphNode.css';
import { Chart } from './Chart';
import { Map } from './Map';
import { useState, useEffect } from 'react';
import { timestampToTimeString } from "../util/util";
import { Dummy } from "../util/Dummy";

export const TreeGraphNode = ({treeID, nodeID, setViewNode}) => {

    const [batStat, setBatStat] = useState(0);
    const [rainStat, setRainStat] = useState(0);
    const [coord, setCoord] = useState([0,0]);
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

        const tempDataT = {...tempData};
        const humidDataT = {...humidData};
        const heatIndexDataT = {...heatIndexData};

        const last = node.length-1;
        if (tempDataT.labels.length === 10) {
            tempDataT.labels.shift();
            tempDataT.labels.push(timestampToTimeString(node[last].timestamp));
            tempDataT.datasets[0].data.shift();
            tempDataT.datasets[0].data.push(node[last].temp);

            humidDataT.labels.shift();
            humidDataT.labels.push(timestampToTimeString(node[last].timestamp));
            humidDataT.datasets[0].data.shift();
            humidDataT.datasets[0].data.push(node[last].humid);

            heatIndexDataT.labels.shift();
            heatIndexDataT.labels.push(timestampToTimeString(node[last].timestamp));
            heatIndexDataT.datasets[0].data.shift();
            heatIndexDataT.datasets[0].data.push(node[last].heatIndex);
        }else{
            tempDataT.labels.push(timestampToTimeString(node[last].timestamp));
            tempDataT.datasets[0].data.push(node[last].temp);

            humidDataT.labels.push(timestampToTimeString(node[last].timestamp));
            humidDataT.datasets[0].data.push(node[last].humid);

            heatIndexDataT.labels.push(timestampToTimeString(node[last].timestamp));
            heatIndexDataT.datasets[0].data.push(node[last].heatIndex);
        }

        setTempData({...tempDataT});
        setHumidData({...humidDataT});
        setHeatIndexData({...heatIndexDataT});
        setBatStat(node[last].batStat);
        setRainStat(node[last].rain);
        setCoord([node[last].lat, node[last].lon]);
    }

    useEffect(
        () => {
            Dummy.subscribe(updData);
            return () => {
                 Dummy.unsubscribe(updData);
            }
        }
    ,[])

    return(
        <div className='tree-graph-node-comp'>
            <div className='tree-graph-node-container'>
                <div className="tree-graph-node-chart chart-comp-container">
                    <h3>Temperature</h3>
                    <Chart data={tempData}/>
                </div>
                <div className="tree-graph-node-chart chart-comp-container">
                    <h3>Humidity</h3>
                    <Chart data={humidData}/>
                </div>
                <div className="tree-graph-node-chart chart-comp-container">
                    <h3>Heat Index</h3>
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