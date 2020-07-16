import React, {Component, Fragment} from "react"
import L from "leaflet"
import styled from "styled-components"

const Wrapper= styled.div`
  width:${props => props.width};
  height:${props => props.height};
`;

export default class Map extends Component{ 
  componentDidMount(){
    const server_url = process.env.SERVER_URL;
    let radius = 1000;

    this.map= L.map("map").setView([50.846859, 4.352297], 18);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((success),(error => {
        let pos = {coords:{
          "latitude": 50.846859,
          "longitude": 4.352297,
          "accuracy": 5,
        }}
        //success(pos);
        getEndpoints(pos, this.map);

        //TODO get user geolocation properly
        }
      ));
    }
    else {
      console.log("Geolocation is not supported by this browser.");
    }

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

    L.marker([50.846859, 4.352297]).addTo(this.map);

    function getEndpoints(pos, map){
      let position = "?lat=" + pos.coords.latitude + "&lng=" + pos.coords.longitude + "&radius=" + radius;      
      let url = server_url + "/api/v1/map/endpoints" + position;
      let endpoint_list = {};

      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          endpoint_list = json.success;
          getDataFromEndpoints(endpoint_list, position, map);
        })
        .catch((error) => console.log(error));
    }

    function getDataFromEndpoints(endpoint_list, position, map){
      let max_answers = 10;
      position = position + "&max_answers=" + max_answers;
      for (let endp = 0; endp < endpoint_list.length; endp++) {
        let endpoint_url = server_url + endpoint_list[endp] + position;
        console.log(endpoint_url);

        fetch(endpoint_url)
          .then((response) => response.json())
          .then((json) => {
            console.log(json);
            L.geoJSON(json, {
              pointToLayer: function (feature, latlng) {
                // Check if a image file exists
                let image = new Image();
                let url_image = process.env.APP_URL + "/" + json.icon;
                image.src = url_image;
                let endpoint_icon = url_image;
                
                if (image.width == 0) { // default image
                  endpoint_icon = process.env.APP_URL + "/vercel.svg" ;
                }

                endpoint_icon = new L.Icon({
                  iconUrl: process.env.APP_URL + "/" + json.icon,
                  iconSize: [25, 25],
                  iconAnchor: [22, 94],
                  popupAnchor: [-3, -76],
                });
                return L.marker(latlng, { icon: endpoint_icon });
              },
            }).addTo(map);
          });
      }
    }

    // TODO get user geolocation properly
    
    function success(pos) {
      var crd = pos.coords;
    
      console.log('Your current position is :');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude : ${crd.longitude}`);
      console.log(`Accuracy is ${crd.accuracy} meters.`);
    }
  }

  render(){
    return (
      <Fragment>
        <Wrapper width="100vw" height="75vh" id="map"></Wrapper>
      </Fragment>
    )
  }
    
} 