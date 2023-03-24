export const Dummy = (() => {
    const forest = {};
    const nodesCoord = [];
    const subscribers = [];

    //init function
    (() => {
        // Generate dummy coordinate
        for(let i = 0; i < 15; i++){
            nodesCoord.push(
                [
                101.644966 + (Math.random() * 0.1) * (Math.floor(Math.random() * 2) === 0 ? 1 : -1),  
                2.924874 + (Math.random() * 0.1) * (Math.floor(Math.random() * 2) === 0 ? 1 : -1)  
                ]
            )
        }
        forest["demo"] = {};
    })();

    const calcHeatIndex = (temp, hum) => {
        const fahrenheit = ((temp * 9/5) + 32)

        const T2 = fahrenheit * fahrenheit;
        const H2 = hum * hum;

        const C1 = [ -42.379, 2.04901523, 10.14333127, -0.22475541, -6.83783e-03, -5.481717e-02, 1.22874e-03, 8.5282e-04, -1.99e-06]

        const heatindex1 = C1[0] + (C1[1] * fahrenheit) + (C1[2] * hum) + (C1[3] * fahrenheit * hum) + (C1[4] * T2) + (C1[5] * H2) + (C1[6] * T2 * hum) + (C1[7] * fahrenheit * H2) + (C1[8] * T2 * H2)

        return ((heatindex1 - 32) * 5/9);
    }


    const genForestData = () => {
        forest["demo"]['name'] = "Demo";
        for(let i = 0; i < 15; i++){
            const temp = Math.round((29 + (Math.floor(Math.random() * 2) === 1 ? -1 : 1) * (Math.random() * 3)) * 100) / 100;
            const humid = Math.round((85 + (Math.floor(Math.random() * 2) === 1 ? -1 : 1) * (Math.random() * 10)) * 100) / 100;

            forest["demo"][`${i}`] = {
                "nodeID" : `${i}`,
                "lon" : nodesCoord[i][0],
                "lat" : nodesCoord[i][1],
                "batStat" : "3.5V",
                "temp" : temp,
                "humid" : humid,
                "heatIndex" : Math.round(calcHeatIndex(temp, humid) * 100) / 100,
                "timestamp" : Date.now(),
                "rain" : Math.floor(Math.random() * 2),
                "isGateway" : (i === 0 ? true : false),
            }
        }
    }

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

    setInterval(
        () => {
            genForestData();
            for(let i = 0; i < subscribers.length; i++){
                console.log(forest);
                subscribers[i](forest);
            }
        }
    ,5000)

    return{
        subscribe,
        unsubscribe,
        getForest
    }
})();

export default Dummy;