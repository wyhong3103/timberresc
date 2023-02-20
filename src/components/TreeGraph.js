import '../styles/TreeGraph.css';
import { getMST } from "../util/MST"
import firestoreHandler from '../util/firestoreHandler';
import ForceGraph2D from 'react-force-graph-2d';
import { useEffect, useRef, useState } from "react"

export const TreeGraph = ({id, setComponent, setViewNode, setNode}) => {
    const [graphData, setGraphData] = useState({
        nodes : [],
        links : []
    });

    const [dimension, setDimension] = useState([0,0]);

    const parentContainer = useRef();

    const backToForest = () => {
        setComponent(0);
    }

    const viewNode = (nodeID) => {
        setViewNode(1);
        setNode(nodeID);
    }

    useEffect(
        () => {
            (async () => {
                const nodes = [];
                const tree = (firestoreHandler.getForest())[id];
                    
                let gateway = "";

                for(const i of Object.keys(tree)){
                    if (i === 'name') continue;

                    const nodeObj = tree[i];
                    if (nodeObj.isGateway === true) gateway = `${nodeObj.nodeID}`;
                    nodes.push([`${nodeObj.nodeID}`, [nodeObj.lat, nodeObj.lon]])
                }
                const to = getMST(nodes, gateway);

                const tempGraphData = {
                    "nodes" : [],
                    "links" : []
                }

                tempGraphData.nodes.push(
                    {
                        id : `${gateway}`,
                        name : "Gateway",
                        val : 3
                    }
                )

                for(const i of Object.keys(to)){
                    tempGraphData.nodes.push(
                        {
                            id : i,
                            name : `Sensor Node ${i}`,
                            val : 1
                        }
                    )                
                    tempGraphData.links.push(
                        {
                            source : `${i}`,
                            target : `${to[i][0]}`,
                            name : to[i][1],
                            value : 2
                        }
                    )                
                }                

                setGraphData({...tempGraphData});
            })();
        }
    ,[id])

    
    useEffect(() => {
        if (!parentContainer.current) return; 

        const resizeObserver = new ResizeObserver(() => {
            setDimension([parentContainer.current.clientWidth, parentContainer.current.clientHeight]);
        });
        resizeObserver.observe(parentContainer.current);
        return () => resizeObserver.disconnect(); // clean up 
    }, []);

    return(
        <div ref={parentContainer} className="tree-graph-comp">
            <ForceGraph2D

                width={dimension[0]}
                height={dimension[1]}

                onNodeClick={
                    (node) => 
                        node.name !== "Gateway"
                        ?
                        viewNode(node.id)
                        :
                        null
                }

                nodeColor={
                    (node) => {
                        return node.name === "Gateway" ? "#171717" : "#3f3f46"
                    }
                } 

                linkDirectionalParticles="value"
                linkDirectionalParticleSpeed={d => d.value * 0.001}

                graphData={graphData}

            />
            <button className='back-to-forest-btn' onClick={backToForest}>
                Back
            </button>
        </div>
    )


}