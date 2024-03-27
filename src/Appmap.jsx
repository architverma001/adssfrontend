import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";
import "./App.css";

const Appmap = ({ coordinate }) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyAhuKybZek9mjXlSXBqLV70VpHa_w2yJ24",
    });
    const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);
    return (
        <div className="apps">
            {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          zoom={10}
        >
          <Marker position={{ lat: 18.52043, lng: 73.856743 }} />
        </GoogleMap>
      )}
        </div>
    );
};

export default Appmap;
