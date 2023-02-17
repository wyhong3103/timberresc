import '../styles/Forest.css';

export const Forest = ({setComponent, setTree}) => {
    const dummy = [
        {
            "forestName" : "Forest 1",
            "status" : [
                29.1,
                93.3,
                26.3,
                "Not Raining"
            ],
            "forestID" : 1
        },
        {
            "forestName" : "Forest 2",
            "status" : [
                29.9,
                89.0,
                28.7,
                "Raining"
            ],
            "forestID" : 2
        },
        {
            "forestName" : "Forest 3",
            "status" : [
                28.4,
                85.2,
                30.1,
                "Not Raining"
            ],
            "forestID" : 3
        },
    ]

    const monitorTree = (forestID) => {
        setComponent(1);
        setTree(forestID);
    }


    return(
        <div className="forest-comp">
            <div className="forest-top">
                <h1>
                    Watchlist
                </h1>
                <button className='add-to-watchlist-btn'>
                    Add To Watchlist
                </button>
            </div>
            <div className="forest-card-container">
                {
                    dummy.length === 0 ? 
                    
                    <div className='forest-empty'>
                        It's empty!
                    </div>

                    :

                    dummy.map(item => {
                        return(
                            <div className="forest-card" onClick={() => monitorTree(item.forestID)}>
                                <h3 className='forest-card-name'>{item.forestName}</h3>
                                <div className="forest-card-temp">
                                    <p className='forest-card-prop-title'>Temperature</p>
                                    <p className='forest-card-prop-val'>{item.status[0]}</p>
                                </div>
                                <div className="forest-card-humid">
                                    <p className='forest-card-prop-title'>Humidity</p>
                                    <p className='forest-card-prop-val'>{item.status[1]}</p>
                                </div>
                                <div className="forest-card-heat">
                                    <p className='forest-card-prop-title'>Heat Index</p>
                                    <p className='forest-card-prop-val'>{item.status[2]}</p>
                                </div>
                                <p className='forest-card-rain'>Rain Status : {item.status[3]}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>    
    )
};