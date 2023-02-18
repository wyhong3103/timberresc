// Pub Sub DUMMY
export const Dummy = (() => {
    
    let subscribers = [];
    const forest = {};

    // Initialization
    (() => {
        for(let i = 0; i < 3; i++)
        {
            forest[`${i}`] = {};
            forest[`${i}`].forestName = `Forest ${i}`;
            for(let j = 0; j < 5; j++)
            {
                forest[`${i}`][`${j}`] = [];
                for(let k = 0; k < 10; k++){
                    forest[`${i}`][`${j}`].push({
                        batHealth : "3.5V",
                        heatIndex : Math.floor(Math.random() * 100),
                        humid : Math.floor(Math.random() * 100),
                        temp : Math.floor(Math.random() * 100),
                        lat : Math.random() * 100,
                        lon : Math.random() * 100,
                        nodeID : `${j}`,
                        rain : Math.floor(Math.random() * 2),
                        timestamp : Date.now()
                    });
                }
            }
        }
    })();

    const subscribe = (fn) => {
        subscribers.push(fn);
    }

    const unsubscribe = (fn) => {
        const temp = [];
        for(const i of subscribers){
            if (i !== fn) temp.push(i);
        }
        subscribers = [...temp];
    }
    
    const getForest = () => forest;

    // Random generate data every 3 seconds
    setInterval(
        () => {
            for(const i of Object.keys(forest)){
                for(const j of Object.keys(forest[i])){
                    if (j === 'forestName') continue;

                    forest[i][j].shift();
                    forest[i][j].push(
                        {
                            batHealth : "3.5V",
                            heatIndex : Math.floor(Math.random() * 100),
                            humid : Math.floor(Math.random() * 100),
                            temp : Math.floor(Math.random() * 100),
                            lat : Math.random() * 100,
                            lon : Math.random() * 100,
                            nodeID : `${j}`,
                            timestamp : Date.now()
                        }
                    )
                }
            }
            subscribers.forEach(fn => {
                fn(forest);
            })
        }
    , 3000)



    return{
        subscribe,
        unsubscribe,
        getForest
    }
})()