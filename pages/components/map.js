import React, {Component, Fragment} from "react"; 
import L from "leaflet"
import styled from "styled-components"
import osmtogeojson from '../osmtogeojson.js'

const Wrapper= styled.div`
  width:${props => props.width};
  height:${props => props.height};
`;

export default class Map extends Component{ 
  componentDidMount(){

    this.map= L.map("map").setView([50.8503, 4.3517], 18);

    L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: "mapbox/streets-v11",
          tileSize: 512,
          zoomOffset: -1,
          accessToken:
            "pk.eyJ1Ijoid291dHZlcmJpZXN0IiwiYSI6ImNrY2J6M2hobzI5enIyc28wbjl3aDU3b3oifQ.RyMH0nBp_ewvl1yxXLogkg",
        }
    ).addTo(this.map);

    //getData(this.map);
    L.marker([50.846859, 4.352297]).addTo(this.map);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
      
    }
    else{
      alert("Geolocation is not supported by this browser.");
    }

    function showPosition(position) {
      console.log("");
      alert("Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude);
      L.marker([position.coords.latitude, position.coords.longitude]).addTo(this.map);
    }

    function getbbox(map) {
        let bounds = map.getBounds();
        console.log(map.getBounds());
        let south = bounds._southWest.lat.toFixed(3);
        let west = bounds._southWest.lng.toFixed(3);
        let north = bounds._northEast.lat.toFixed(3);
        let east = bounds._northEast.lng.toFixed(3);
    
        return `[bbox:${south},${west},${north},${east}]`;
    }

    function getData(map) {
        const url = `https://overpass-api.de/api/interpreter?data=[out:json][timeout:25]${getbbox(
          map
        )};(node[amenity=bicycle_parking];);out body;>;out skel qt;`;
        const url2 = `https://overpass-api.de/api/interpreter?data=[out:json][timeout:25]${getbbox(
          map
        )};(node[amenity=compressed_air];);out body;>;out skel qt;`;
    
        var parkingsstyle = {
          radius: 5,
          fillColor: "#ff00ff",
          color: "#000",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8,
        };
    
        fetch(url)
          .then((response) => response.json())
          .then((json) => {
    
            L.geoJSON(osmtogeojson(json), {
              pointToLayer: function (feature, latlng) {
                var parkingicon = new L.Icon({
                  iconUrl: "/parking.png",
                  iconSize: [25, 25],
                  iconAnchor: [22, 94],
                  popupAnchor: [-3, -76],
                });
                return L.marker(latlng, { icon: parkingicon });
              },
            }).addTo(map);
    
            console.log("done parking");
          })
          .catch((error) => console.log(error));
    
        var airpumpsstyle = {
          radius: 5,
          fillColor: "#ff7800",
          color: "#000",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8,
        };
    
        fetch(url2)
          .then((response) => response.json())
          .then((json) => {
            L.geoJSON(osmtogeojson(json), {
              pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, airpumpsstyle);
              },
            }).addTo(map);
            console.log("done airpumps");
          });
      }
  }

  render(){
    return (
      <Fragment>
        <div >
          <Wrapper width="50vw" height="50vh" id="map"></Wrapper>
        </div>
      </Fragment>
    )
  }
    
} 