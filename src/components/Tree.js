import '../styles/Tree.css';
import { TreeGraphNode } from './TreeGraphNode';
import { TreeGraph } from './TreeGraph';
import { useState } from 'react';

export const Tree = ({treeID, setComponent, isDemo}) => {
    // if 0 show tree graph, 1 show individual node
    const [viewNode, setViewNode] = useState(0);
    // Node to be monitored
    const [node, setNode] = useState(0);

    return(
        <div className='tree-comp'>
            {
                viewNode === 0
                ?
                <TreeGraph id={treeID} setComponent={setComponent} setViewNode={setViewNode} setNode={setNode} isDemo={isDemo}/>
                :
                <TreeGraphNode treeID={treeID} nodeID={node} setViewNode={setViewNode} isDemo={isDemo} /> 
            }
        </div>
    )
};