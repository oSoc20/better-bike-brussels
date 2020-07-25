import React, { Component, Fragment } from "react";
import L from "leaflet";
import styled from "styled-components";

const Wrapper = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      map: {},
      radius: 1000,
      pos: [50.846859, 4.352297],
      max_answers: 30,
      first_load: true,
    };

    this.pois_layer = {};

    this.single_poi = {};
  }  

  getData(url) {
    return fetch(url)
      .then((response) => response.json())
      .then((json) => {
        return json;
      });
  }

  componentDidMount() {
    this.props.onRef(this);

    let pos = {
      coords: {
        latitude: this.state.pos[0],
        longitude: this.state.pos[1],
      },
    };

    this.map = L.map("map").setView(
      [pos.coords.latitude, pos.coords.longitude],
      11
    );

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

      L.marker(e.latlng)
        .addTo(this)
        .bindPopup("You are within " + radius + " meters from this point")
        .openPopup();

      L.circle(e.latlng, radius).addTo(this);
      this.setView([e.latitude, e.longitude], 18);
    }

    function onLocationError(e) {
      let endpoint_icon = new L.Icon({
        iconUrl: process.env.APP_URL + "/place.svg",
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [-3, -76],
      });
      console.log(
        L.marker([pos.coords.latitude, pos.coords.longitude], {
          icon: endpoint_icon,
        })
      );
      L.marker([pos.coords.latitude, pos.coords.longitude], {
        icon: endpoint_icon,
      }).addTo(this);
      this.setView([pos.coords.latitude, pos.coords.longitude], 18);
    }

    this.map.locate({ setView: true, maxZoom: 18 });
    this.map.on("locationfound", onLocationFound);
    this.map.on("locationerror", onLocationError);

    if (
      //show single poi
      this.props.poi !== undefined &&
      this.props.poi_lat !== undefined &&
      this.props.poi_lng !== undefined
    )
      this.showSinglePOI(
        this.props.poi,
        this.props.poi_lat,
        this.props.poi_lng
      );
    else if (this.props.poi !== undefined) {
      //show a poi category on the map

      let endpointname = this.props.poi
        .split("")
        .filter(function (c) {
          return c != "-";
        })
        .join("");

      try {
        var endpoint = this.props.endpoint[endpointname];
        if (endpoint !== undefined) this.getDataFromEndpoint(endpoint);
        else this.showAllPOIs();
      } catch (err) {
        this.showAllPOIs();
      }
    } else {
      this.showAllPOIs();
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

  showAllPOIs() {
    for (const key in this.props.endpoint) {
      this.getDataFromEndpoint(this.props.endpoint[key]);
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
    this.props.onRef(undefined);
  }

  showPOICategory(title, isShown) {
    if (this.state.first_load) this.firstLoad();
    if (isShown) {
      let endpointname = title
        .split("")
        .filter(function (c) {
          return c != "-";
        })
        .join("");

      this.getDataFromEndpoint(this.props.endpoint[endpointname]);
    } else {
      let endpointname = title
        .split("")
        .filter(function (c) {
          return c != "-";
        })
        .join("");

      this.map.removeLayer(this.pois_layer[this.props.endpoint[endpointname]]);
    }
  }

  getDataFromEndpoint(endpoint) {
    let position =
      "?lat=" +
      this.state.pos[0] +
      "&lng=" +
      this.state.pos[1] +
      "&radius=" +
      this.state.radius;

    let endpoint_url =
      process.env.SERVER_URL +
      endpoint +
      "/" +
      position +
      "&max_answers=" +
      this.state.max_answers;

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

            if (image != null && image.width != 0) endpoint_icon = icon_url;

            endpoint_icon = new L.Icon({
              iconUrl: process.env.APP_URL + "/" + json.icon,
              iconSize: [25, 25],
              iconAnchor: [12, 12],
              popupAnchor: [-3, -76],
            });
            return L.marker(latlng, { icon: endpoint_icon });
          },
        });
        pois_layer.addTo(this.state.map);

        this.saveEndpoint(endpoint, pois_layer);
      });
  }

  saveEndpoint(endpoint, pois_layer) {
    this.pois_layer[endpoint] = pois_layer;
  }

  render() {
    return (
      <Fragment>
        <Wrapper width="100vw" height="75vh" id="map"></Wrapper>
      </Fragment>
    );
  }
}

export default Map;
