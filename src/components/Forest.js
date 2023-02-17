import '../styles/Forest.css';

export const Forest = () => {
    const dummy = [
        {
            "forestName" : "Forest 1",
            "status" : [
                29.1,
                26.3,
                93.3,
                "Not Raining"
            ]
        },
        {
            "forestName" : "Forest 2",
            "status" : [
                29.9,
                28.7,
                89.0,
                "Raining"
            ]
        },
        {
            "forestName" : "Forest 3",
            "status" : [
                28.4,
                30.1,
                85.2,
                "Not Raining"
            ]
        },
    ]

    return(
        <div className="forest-comp">
            <h1>
                Forests
            </h1>
            {
                dummy.map(item => {
                    return(
                        <div className="forest-card">
                            <h3>{item.forestName}</h3>
                            <div className="forest-card-temp">
                                <p>Temperature</p>
                                <p>{item.status[0]}</p>
                            </div>
                            <div className="forest-card-humid">
                                <p>Humidity</p>
                                <p>{item.status[1]}</p>
                            </div>
                            <div className="forest-card-humid">
                                <p>Humidity</p>
                                <p>{item.status[2]}</p>
                            </div>
                            <p>Rain Status : {item.status[3]}</p>
                        </div>
                    )
                })
            }
        </div>    
    )
};