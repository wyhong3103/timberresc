import { Chart } from './Chart';
import { useState, useEffect, useRef } from 'react';
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
                label : "Temperature",
                data : [],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ]
    });

    const [humidData, setHumidData] = useState({
        labels : [],
        datasets : [
            {
                label : "Humidity",
                data : [],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ]
    });

    const [heatIndexData, setHeatIndexData] = useState({
        labels : [],
        datasets : [
            {
                label : "Heat Index",
                data : [],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ]
    });

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
                <div className='tree-graph-node-bat-stat'>
                    <p className='bat-stat-title'>
                        Battery Status
                    </p>
                    <p className='bat-stat-result'>
                        {batStat}
                    </p>
                </div>
                <div className='tree-graph-node-map'>
                    Google Map Placeholder, {coord}
                </div>
                <Chart data={tempData}/>
                <Chart data={humidData}/>
                <Chart data={heatIndexData}/>
                <div className='tree-graph-node-rain'>
                    Is Raining : {rainStat}
                </div>
            </div>
        </div>
    )


};