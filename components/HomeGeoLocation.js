import Index from "../pages";
import { render } from "react-dom";

class HomeGeoLocation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayComponents: false,
      lat: 0,
      lng: 0,
    };
  }

  componentDidMount() {
    if (!navigator.geolocation) {
      console.log("geolocation not available");
      this.setState({
        displayComponents: false,
        lat: 50.8503,
        lng: 4.33517,
      });
      fetchLocationData().then(res => this.setState({
        displayComponents: true,
        lat: this.state.lat,
        lng: this.state.lng,
        data: res,
    }));
    } else {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.setState({
            displayComponents: false,
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
          fetchLocationData().then(res => this.setState({
              displayComponents: true,
              lat: this.state.lat,
              lng: this.state.lng,
              data: res,
          }));
        },
        () => {
          this.setState({
            displayComponents: false,
            lat: 50.8503,
            lng: 4.33517,
          });
          fetchLocationData().then(res => this.setState({
            displayComponents: true,
            lat: this.state.lat,
            lng: this.state.lng,
            data: res,
        }));
        }
      );
    }

    async function fetchLocationData() {
      let host = "http://localhost:8080";

      const endpoints = (await getData(`${host}/api/v1/map/endpoints`)).success;

      const promises = endpoints.map((endpoint) =>
        getData(
          `${host}${endpoint}?lat=50.849747&lng=4.3511706&radius=2000&max_answers=5`
        )
      );

      let data = await Promise.all(promises).then((responses) => {
        return responses;
      });
      console.log(data);
      return data;
    }

    function getData(url) {
      return fetch(url)
        .then((res) => res.json())
        .then((data) => {
          return data;
        });
    }
  }

  render() {
    let displayComponents = this.state.displayComponents;
    let latitude = this.state.lat;
    let longitude = this.state.lng;
    let data = this.state.data;

    return (
      <div>
        <h2>What do you want to find?</h2>
        <p>list view</p>

        <h2>
          Within a <i>2 km</i> radius from you
        </h2>

        {displayComponents ? (
          <div>
            {latitude}, {longitude}, {data[0].features[0].id}
          </div>
        ) : (
          "loading"
        )}

        <style jsx>{`
          i {
            background-color: yellow;
          }
        `}</style>
      </div>
    );
  }
}
export default HomeGeoLocation;
