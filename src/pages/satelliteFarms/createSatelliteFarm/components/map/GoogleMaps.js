import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import GoogleMapReact from "google-map-react";
import Marker from "./marker";
import './GoogleMaps.css';
import {BiSearchAlt2} from 'react-icons/bi';

const SimpleMap = ({ setUserCoordinates, setLandmark}) => {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: "",
    lng: "",
  });
  const [center, setCenter] = useState({ lat: 12.905991, lng: -279.773995 });
  const [zoom, setZoom] = useState(15);

  const getMapOptions = (maps) => {
    return {
      disableDefaultUI: true,
      mapTypeControl: true,
      streetViewControl: true,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "on" }],
        },
      ],
    };
  };
  const locationChangeHandler = async (value) => {
    const result = await geocodeByAddress(value);
    const latlng = await getLatLng(result[0]);
    setAddress(value);
    setLandmark(value)
    setCoordinates(latlng);
  };

  const clickHandler = ({ x, y, lat, lng, event }) => {
    setCoordinates({ lat: lat, lng: lng });
  };

  const getCoordinates = () => {
    setUserCoordinates(coordinates);
  }
  return (
    <>
   
    <div style={{ height: "95%", width: "100%",marginTop:"10px" }}>
      
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={locationChangeHandler}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="map-search-container">
            <div style={{ position: "absolute", bottom: "30%", left: "0" }}>
              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active ? "rgb(37, 211, 102)" : "white",
                  color: suggestion.active ? "white" : "black",
                  padding: "7px 10px",
                  cursor: "pointer",
                  borderBottom: "1px solid #dddddd9c",
                };
                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
            <div className="map-search-footer">
            <div className="map-search-input-container">
            <BiSearchAlt2/>
            <span></span>
                <input
                  {...getInputProps({
                    placeholder: "Search Location",
                  })}
                  className="address-search-gmaps"
                  required
                />               
              </div>
              <p onClick={getCoordinates}>Search</p>
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCgmP4r0cA5YJPLW-ztJiJO9S1pC0n0Na8" }}
        defaultCenter={center}
        center={center}
        defaultZoom={zoom}
        options={getMapOptions}
        onClick={clickHandler}
      >
        <Marker
          lat={coordinates.lat}
          lng={coordinates.lng}
          name="My Marker"
          color="blue"
        />
      </GoogleMapReact>
    </div>
    </>
  );
};

export default SimpleMap;