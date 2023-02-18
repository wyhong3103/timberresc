import "../styles/Map.css";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api"

export const Map = ({coord}) => {
    
    const {isLoaded} = useLoadScript(
        {
            googleMapsApiKey : process.env.REACT_APP_GOOGLE_MAP_API_KEY
        }
    );

    return(
        <div className="google-map-container">
            {
                !isLoaded
                ?
                <div>
                 Loading...
                </div>
                :
                <GoogleMap zoom={10} center={{lat : coord[0], lng : coord[1]}} mapContainerClassName="map-container">
                    <MarkerF position={{lat : coord[0], lng:coord[1]}}/>
                </GoogleMap>
            }
        </div>
    )
}