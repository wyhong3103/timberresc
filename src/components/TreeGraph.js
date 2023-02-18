import '../styles/TreeGraph.css';
import { getMST } from "../util/MST"
import { Dummy } from "../util/Dummy"
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

            setGraphData({...tempGraphData});
        }
    ,[])

    
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
                backgroundColor="#faf9f6"

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