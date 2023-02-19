import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, query, orderBy, limit, collection, getDocs } from 'firebase/firestore';

// Only call it when user is logged in
const firestoreHandler = (() => {
    const auth = getAuth();
    const db = getFirestore();
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
        const forest = {};

        const watchlist = await fetchWatchlist();

        for(let i = 0; i < watchlist.length; i++){
            const nodeArr = await fetchNodes(watchlist[i]);
            
            //Query forest name

            const forestNameSnapshot = await getDoc(doc(db, 'forestName', watchlist[i]));
            const forestName = forestNameSnapshot.data().name;

            forest[watchlist[i]] = {};
            forest[watchlist[i]]['forestName'] = forestName;
            
            //Get 10 latest data
            for(let j = 0; j < nodeArr.length; j++){

                forest[watchlist[i]][nodeArr[j]] = [];

                const q = query(collection(db, 'forestData', watchlist[i], `${nodeArr[j]}`), orderBy('timestamp', 'desc'), limit(10));
                const querySnapshot = await getDocs(q);
                
                const tempData = [];

                querySnapshot.forEach(
                    (doc) => {
                        tempData.push(
                            doc.data()
                        );
                    }
                )
                
                for(let k = tempData.length-1; k >= 0; k--){
                    forest[watchlist[i]][j].push(tempData[k]);
                }
            }
        }

        return forest;
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
            console.log("hi");
            (async () => {
                for(let i = 0; i < subscribers.length; i++){
                    const forest = await getForest();
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
