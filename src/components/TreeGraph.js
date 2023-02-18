import { getMST } from "../util/MST"
import { Dummy } from "../util/Dummy"
import ForceGraph2D from 'react-force-graph-2d';
import { useEffect, useState } from "react"

export const TreeGraph = ({id}) => {
    const [graphData, setGraphData] = useState({
        nodes : [],
        links : []
    });

    useEffect(
        () => {
            const nodes = [];
            const tree = Dummy.getForest()[id];
                
            for(const i of Object.keys(tree)){
                if (i === 'forestName') continue;

                const nodeObj = tree[i][tree[i].length-1];
                nodes.push([nodeObj.nodeID, [nodeObj.lat, nodeObj.lon]])
            }
            const to = getMST(nodes, nodes[0][0]);

            const tempGraphData = {
                "nodes" : [],
                "links" : []
            }

            tempGraphData.nodes.push(
                {
                    id : nodes[0][0],
                    name : "Gateway",
                    val : 3
                }
            )

            for(const i of Object.keys(to)){
                tempGraphData.nodes.push(
                    {
                        id : i,
                        name : "Sensor Node",
                        val : 1
                    }
                )                
                tempGraphData.links.push(
                    {
                        source : i,
                        target : to[i][0],
                        name : to[i][1],
                        value : 2
                    }
                )                
            }                
            console.log(tempGraphData);

            setGraphData({...tempGraphData});
        }
    ,[])

    return(
        <div>
            <ForceGraph2D

                nodeColor={
                    (node) => {
                        return node.name === "Gateway" ? "#171717" : "#3f3f46"
                    }
                } 

                linkDirectionalParticles="value"
                linkDirectionalParticleSpeed={d => d.value * 0.001}

                graphData={graphData}

            />
        </div>
    )


}