import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

// Only call it when user is logged in
const firestoreHandler = (() => {
    let inRead = false;
    const auth = getAuth();
    const db = getFirestore();
    let forest = {};
    const subscribers = [];

    const fetchWatchlist = async () => { 
        const uid = auth.currentUser.uid;
        const watchlistSnapshot = await getDoc(doc(db, 'users', uid));
        return watchlistSnapshot.data().watchlist;
    }

    const updForest = async () => {
        const tempForest = {};

        const watchlist = await fetchWatchlist();

        for(let i = 0; i < watchlist.length; i++){
            const forestSnapshot = await getDoc(doc(db, 'forest', watchlist[i]));
            tempForest[watchlist[i]] = forestSnapshot.data();
        }

        forest = tempForest;
    };

    const getForest = () => {
        return forest;
    }

    const subscribe = (fn) => {
        subscribers.push(fn);
    }

    const unsubscribe = (fn) => {
        const index = subscribers.indexOf(fn);
        subscribers.splice(index, 1);
    }

    const setRead = () => {
        inRead = true;
    }

    const unsetRead = () => {
        inRead = false
    }

    setInterval(
        () => {
            if (inRead){
                (async () => {
                    await updForest();
                    for(let i = 0; i < subscribers.length; i++){
                        subscribers[i](forest);
                    }
                })();
            }
        }
    ,5000)

    return{
        subscribe,
        unsubscribe,
        getForest,
        setRead,
        unsetRead
    }
})();

export default firestoreHandler;
