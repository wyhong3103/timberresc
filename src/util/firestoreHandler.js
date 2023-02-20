import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

// Only call it when user is logged in
const firestoreHandler = (() => {
    const auth = getAuth();
    const db = getFirestore();
    let forest = {};
    const subscribers = [];

    const fetchWatchlist = async () => { 
        const uid = auth.currentUser.uid;
        const watchlistSnapshot = await getDoc(doc(db, 'users', uid));
        return watchlistSnapshot.data().watchlist;
    }

    const fetchNodes = async (forestID) => { 
        const forestNodeSnapshot = await getDoc(doc(db, 'forestNode', forestID));
        return forestNodeSnapshot.data().nodes;
    }

    const getForest = async () => {
        const tempForest = {};

        const watchlist = await fetchWatchlist();

        for(let i = 0; i < watchlist.length; i++){
            const nodeArr = await fetchNodes(watchlist[i]);
            
            //Query forest name

            const forestNameSnapshot = await getDoc(doc(db, 'forestName', watchlist[i]));
            const forestName = forestNameSnapshot.data().name;

            tempForest[watchlist[i]] = {};
            tempForest[watchlist[i]]['forestName'] = forestName;
            
            //Get 10 latest data
            for(let j = 0; j < nodeArr.length; j++){


                const nodeDataRef = doc(db, 'forestData', watchlist[i], `${nodeArr[j]}`, 'data');
                const querySnapshot = await getDoc(nodeDataRef);
                
                tempForest[watchlist[i]][nodeArr[j]] = querySnapshot.data();
            }
        }

        forest = tempForest;
    };

    const subscribe = (fn) => {
        subscribers.push(fn);
    }

    const unsubscribe = (fn) => {
        const temp = [];
        for(const i of subscribers){
            if (i !== fn) temp.push(i);
        }
        const index = subscribers.indexOf(fn);
        subscribers.splice(index, 1);
    }

    setInterval(
        () => {
            (async () => {
                await getForest();
                for(let i = 0; i < subscribers.length; i++){
                    subscribers[i](forest);
                }
            })();
        }
    ,5000)

    return{
        subscribe,
        unsubscribe,
        getForest,
    }
})();

export default firestoreHandler;
