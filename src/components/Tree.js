import { Dummy } from './Dummy';
import '../styles/Tree.css';
import { useEffect } from 'react';

export const Tree = () => {

    useEffect(
        () => {
            const callback = (item) => console.log(item);
            Dummy.subscribe(callback)
            return () => {Dummy.unsubscribe(callback)};
        }
    , [])

    return(
        <div>

        </div>
    )
};