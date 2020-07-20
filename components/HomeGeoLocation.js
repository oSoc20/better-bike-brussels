import Mansonry from "../components/Mansonry";

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
      fetchLocationData(this.state.lat, this.state.lng).then(res => this.setState({
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
          fetchLocationData(this.state.lat, this.state.lng).then(res => this.setState({
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
          fetchLocationData(this.state.lat, this.state.lng).then(res => this.setState({
            displayComponents: true,
            lat: this.state.lat,
            lng: this.state.lng,
            data: res,
        }));
        }
      );
    }

    async function fetchLocationData(lat, lng) {
      let host = "http://localhost:8080";

      const endpoints = (await getData(`${host}/api/v1/map/endpoints`)).success;

      const promises = endpoints.map((endpoint) =>
        getData(
          `${host}${endpoint}?lat=${lat}&lng=${lng}&radius=2000&max_answers=3`
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
      <div className="wrapper">
        {/* <p>list view</p> */}

        <h2 className="sub">
          Within a <i>2 km</i> <br></br> radius from you are
        </h2>

        {displayComponents ? (
          <div>
            {/* {latitude}, {longitude} */}
            <Mansonry data = {data} lat={latitude} lng={longitude}/>
          </div>
        ) : (
          "loading"
        )}

        <style jsx>{`
          i {
            background-color: #FDC400;
            padding: 0 .3rem
          }

          .wrapper {
            display: flex;
            flex-flow: column;
            align-items: center;
          }

          .sub {
            font-size:1.7rem;
            font-weight: 700;
            align-self: center;
            margin: 1rem 0;
            text-align: center;
          }
        `}</style>
      </div>
    );
  }
}
export default HomeGeoLocation;
