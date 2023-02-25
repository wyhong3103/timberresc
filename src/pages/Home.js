import '../styles/Home.css';
import { useNavigate } from 'react-router-dom';
import { Nav } from "../components/Nav"
// Home Page 
// Introduce TimberResc

export const Home = () => {

    const navigate = useNavigate();

    const toDashboard = () => {
        navigate('/dashboard');
    }

    return(
        <div className="home-page">
            <Nav/>
            <div className="home-main-container">
                <div className='hero'>
                    <div className='hero-left'>
                        <h2>
                            Protect our forests from wildfires with TimberResc.
                        </h2>
                    </div>
                    <img className='hero-right' src={require('../assets/timberresc.png')} alt="timberresc-logo"/>
                </div>


                <div className='home-problem-statement'>
                    <h3>
                        Problem Statement
                    </h3>
                    <p>
                        The delayed detection of forest fires poses a significant risk to human lives, property, and ecosystems. Despite the advancements in fire detection technology, the current methods used for early detection of forest fires are often inadequate and unreliable, especially in remote or inaccessible areas. Therefore, there is a critical need to develop a more effective and efficient forest fire detection system that can detect fires promptly and accurately, regardless of the location and time of day. Hence, Vizion present you, <strong>TimberResc</strong>.
                    </p>
                </div>
                <div className='home-sdg'>
                    <h3>
                        Sustainable Development Goals (SDG)
                    </h3>
                    <div className="home-sdg-flex">
                        <img src={require('../assets/sdg13p1.png')} alt="sdg13p1-logo"/>
                        <p>
                            Forest fire can devastate the forest, leading to loss of biodiversity, increased carbon emission, and other environmental impacts. TimberResc by Vizion aims to contribute to SDG Goal 13.1, which is to strengthen resilience and adaptive capacity to climate related disasters by preventing forest fire. With that, we can increase the resilience of forest ecosystems to climate-related hazards and natural disasters.
                        </p>
                    </div>
                </div>

                <div className='home-explanation'>
                    <h3>
                        How TimberResc Works?
                    </h3>
                    <div className='home-sensor'>
                        <div>
                            <img src={require('../assets/sensor.png')} alt="sensor-logo"/>
                        </div>
                        <div className='home-explanation-context'>
                            <h4>
                                Sensor Module
                            </h4>
                            <p>
                                The sensing module uses an advanced algorithm based on a minimum spanning tree to optimize the transmission of data between each module. This ensures that the data collected by each module is transmitted efficiently to the nearest module in the network, and then securely sent to the gateway. The resulting wireless monitoring network enables quick access to critical information on temperature, humidity, rain activity, and location, making the sensing module an invaluable tool for detecting environmental hazards such as forest fires and safeguarding the health and well-being of the ecosystem.
                            </p>
                        </div>
                    </div>
                    <div className='home-gateway'>
                        <div>
                            <img src={require('../assets/gateway.png')} alt="sensor-logo"/>
                        </div>
                        <div className='home-explanation-context'>
                            <h4>
                                Gateway
                            </h4>
                            <p>
                                 A gateway acts as a central point to collect data from the individual modules. The gateway receives data from the modules and ensures secure transmission to Cloud Firestore for storage and analysis. This streamlined process enables quick access to critical information on factors such as temperature, humidity, and other environmental parameters. 
                            </p>
                        </div>
                    </div>
                    <div className='home-monitor'>
                        <div>
                            <img src={require('../assets/monitor.png')} alt="sensor-logo"/>
                        </div>
                        <div className='home-explanation-context'>
                            <h4>
                                Monitoring Website
                            </h4>
                            <p>
                            A monitoring website is used to monitor and visualize every piece of data collected by the modules. The website retrieves data from Cloud Firestore and presents it in useful diagrams and visualizations, allowing for easy interpretation and analysis of factors such as temperature, humidity, and rain activity. With this centralized view of the data, users can quickly identify patterns, trends, and anomalies that may indicate potential environmental hazards such as forest fires
                            </p>
                        </div>
                    </div>
                </div>

                <div className='home-google-tech'>
                    <h3>
                        Google Technologies Used
                    </h3>
                    <div className='home-google-techs'>
                        <div className='home-google-techs-card'>
                            <img src={require('../assets/firebase.png')} alt="firebase-logo"/>
                            <h4>
                                Firebase
                            </h4>
                        </div>
                        <div className='home-google-techs-card'>
                            <img src={require('../assets/googlemap.png')} alt="googlemap-logo"/>
                            <h4>
                                Google Map
                            </h4>
                        </div>
                    </div>
                </div>

                <div className='home-lets-timberresc'>
                    <h3>
                        So, what are you waiting for ?
                    </h3>
                    <p>
                        Let's <a href="mailto:vizionteam03@gmail.com">connect</a> and start TimberResc-ueing!
                    </p>
                    <p>
                        If you're already one of us, then
                    </p>
                    <button className='home-to-dashboard' onClick={toDashboard}>
                        Let's Get Started
                    </button>
                </div>
            </div>
        </div>
    )
}