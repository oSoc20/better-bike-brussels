import React, {Component, Fragment} from "react"
import L from "leaflet"
import styled from "styled-components"

const Wrapper= styled.div`
  width:${props => props.width};
  height:${props => props.height};
`;

class Map extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      map: {},
      radius: 1000,
      pos: [50.846859, 4.352297],
      max_answers: 30,
      first_load: true
    };

    this.pois_layer = {
      bike_bump: {},
      water_fountain: {},
      parking: {},
      repair: {},
      villo: {},
      shop: {}
    };

    this.single_poi = {};

    this.endpoint = {
      bike_bump: 'air-pump',
      water_fountain: 'drinking-water',
      parking: 'bicycle-parking',
      repair: 'bicycle-repair-station',
      villo: 'villo-stations',
      shop: 'bicycle-shop'
    };
  }

  static async getInitialProps({query}) {
    return {
      language: query.language,
      poi: query.poi, 
      poi_lat: query.poi_lat, 
      poi_lng: query.poi_lng
    };
  }

  componentDidMount(){
    this.props.onRef(this);

    let pos = {coords:{
      "latitude": this.state.pos[0],
      "longitude": this.state.pos[1],
    }}

    this.map= L.map("map").setView([pos.coords.latitude, pos.coords.longitude], 11);
    
    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/light-v10",
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          "pk.eyJ1Ijoid291dHZlcmJpZXN0IiwiYSI6ImNrY2J6M2hobzI5enIyc28wbjl3aDU3b3oifQ.RyMH0nBp_ewvl1yxXLogkg",
      }
    ).addTo(this.map);


    // USER LOCATION

    function onLocationFound(e) {
      var radius = e.accuracy;

      L.marker(e.latlng).addTo(this)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

      L.circle(e.latlng, radius).addTo(this);
      this.setView([e.latitude, e.longitude], 18);
    }
    function onLocationError(e) {
      let endpoint_icon = new L.Icon({
        iconUrl: process.env.APP_URL + "/place.svg",
        iconSize: [35, 35],
        iconAnchor: [12, 12],
        popupAnchor: [-3, -76],
      });
      console.log(L.marker([pos.coords.latitude, pos.coords.longitude], { icon: endpoint_icon }));
      L.marker([pos.coords.latitude, pos.coords.longitude], { icon: endpoint_icon }).addTo(this);
      this.setView([pos.coords.latitude, pos.coords.longitude], 18);
    }

    this.map.locate({setView: true, maxZoom: 18});
    this.map.on('locationfound', onLocationFound);
    this.map.on('locationerror', onLocationError);
    

    // Show single POI or every POIs on the map

    if(this.props.poi !== undefined && this.props.poi_lat !== undefined && this.props.poi_lng !== undefined)
      this.showSinglePOI(this.props.poi, this.props.poi_lat, this.props.poi_lng);
    else if(this.props.poi !== undefined){
      //show all poi's in map
    } else {
      this.showAllPOIs(true);
    }
      

    this.state.map = this.map;
  }

  showSinglePOI(poi, poi_lat, poi_lng) {
    let pois_icon = new L.Icon({
      iconUrl: process.env.APP_URL + "/" + poi + ".svg",
      iconSize: [25, 25],
      iconAnchor: [12, 12],
      popupAnchor: [-3, -76],
    });
    let single_poi = L.marker([poi_lat, poi_lng], { icon: pois_icon });
    single_poi.addTo(this.map);
    this.single_poi = single_poi;

    //Maybe focus on this point, not always visible!
  }

  showAllPOIs(bool) {
    if (bool) {
      this.getDataFromEndpoint(this.endpoint.bike_bump);
      this.getDataFromEndpoint(this.endpoint.water_fountain);
      this.getDataFromEndpoint(this.endpoint.parking);
      this.getDataFromEndpoint(this.endpoint.repair);
      this.getDataFromEndpoint(this.endpoint.villo);
      this.getDataFromEndpoint(this.endpoint.shop);
    } else {
      hideAllPOIs();
    }
  }

  hideAllPOIs() {
    for (let key in this.pois_layer) {
      let layer = this.pois_layer[key];
      this.state.map.removeLayer(layer);
    }
    this.state.map.removeLayer(this.single_poi);
    this.single_poi = {};
  }

  firstLoad() {
    this.hideAllPOIs();
    this.state.first_load = false;
  }

  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  showPOICategory(title, isShown) {
    console.log(title, isShown);
    if (this.state.first_load) this.firstLoad();
    if (isShown) {
      console.log(this.endpoint[title]);
      this.getDataFromEndpoint(this.endpoint[title])
    }
    else {
      //this has to remove the layer
      
      this.map.removeLayer(this.pois_layer[title])
    }
  }


  getDataFromEndpoint(endpoint) {
    let position = "?lat=" + this.state.pos[0] + "&lng=" + this.state.pos[1] + "&radius=" + this.state.radius
    let endpoint_url = "http://localhost:8080" + "/api/v1/map/" + endpoint + "/" + position + "&max_answers=" + this.state.max_answers;
    
    fetch(endpoint_url)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        let pois_layer = L.geoJSON(json, {
          pointToLayer: function (feature, latlng) {
            // Check if a image file exists
            let image = new Image();
            let icon_url = process.env.APP_URL + "/" + json.icon;
            image.src = icon_url;
            let endpoint_icon = process.env.APP_URL + "/favicon.ico";

            if (image != null && image.width != 0)
              endpoint_icon = icon_url;

            endpoint_icon = new L.Icon({
              iconUrl: process.env.APP_URL + "/" + json.icon,
              iconSize: [25, 25],
              iconAnchor: [12, 12],
              popupAnchor: [-3, -76],
            });
            return L.marker(latlng, { icon: endpoint_icon });
          }
        });
        pois_layer.addTo(this.state.map);
        
        this.saveEndpoint(endpoint, pois_layer);
      });
  }

  saveEndpoint(endpoint, pois_layer) {
    switch (endpoint) {
      case this.endpoint.bike_bump:
        this.pois_layer.bike_bump = pois_layer;
        break;

      case this.endpoint.water_fountain:
        this.pois_layer.water_fountain = pois_layer;
        break;

      case this.endpoint.parking:
        this.pois_layer.parking = pois_layer;
        break;

      case this.endpoint.repair:
        this.pois_layer.repair = pois_layer;
        break;

      case this.endpoint.villo:
        this.pois_layer.villo = pois_layer;
        break;

      case this.endpoint.shop:
        this.pois_layer.shop = pois_layer;
        break;
    
      default:
        break;
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

export default Map