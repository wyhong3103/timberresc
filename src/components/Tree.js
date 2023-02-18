import '../styles/Tree.css';
import { TreeGraph } from './TreeGraph';
import { useState, useEffect } from 'react';

export const Tree = ({treeID}) => {
    // if 0 show tree graph, 1 show individual node
    const [component, setComponent] = useState(0);
    // Node to be monitored
    const [node, setNode] = useState(0);

    return(
        <div className='tree-comp'>
            <TreeGraph id={treeID} />
        </div>
    )
};