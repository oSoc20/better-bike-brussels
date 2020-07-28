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

  forceUpdateHandler() {
    this.forceUpdate();
  }

  componentDidMount() {
    this.props.onRef(this);

    this.map = L.map("map").setView([this.props.lat, this.props.lng], 17);

    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        minZoom: 12,
        maxZoom: 18,
        id: "mapbox/light-v10",
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          "pk.eyJ1Ijoid291dHZlcmJpZXN0IiwiYSI6ImNrY2J6M2hobzI5enIyc28wbjl3aDU3b3oifQ.RyMH0nBp_ewvl1yxXLogkg",
      }
    ).addTo(this.map);

    let endpoint_icon = new L.Icon({
      iconUrl: "/place.svg",
      iconSize: [36, 36],
      iconAnchor: [18, 36],
      popupAnchor: [-3, -76],
    });

    L.marker([this.props.lat, this.props.lng], {
      icon: endpoint_icon,
    }).addTo(this.map);

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
      iconUrl: "/" + poi + ".svg",
      iconSize: [25, 25],
      iconAnchor: [12, 12],
      popupAnchor: [-3, -76],
    });
    let single_poi = L.marker([poi_lat, poi_lng], { icon: pois_icon });
    single_poi.addTo(this.map);
    this.single_poi = single_poi;

    this.map.setView([poi_lat, poi_lng], 13);
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
      this.props.lat +
      "&lng=" +
      this.props.lng +
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
        let pois_layer = L.geoJSON(json, {
          pointToLayer: function (feature, latlng) {
            // Check if a image file exists
            let image = new Image();
            let icon_url = "/" + json.icon;
            image.src = icon_url;
            let endpoint_icon = "/favicon.ico";

            if (image != null && image.width != 0) endpoint_icon = icon_url;

            endpoint_icon = new L.Icon({
              iconUrl: "/" + json.icon,
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
