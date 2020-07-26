import Mansonry from "../components/Mansonry";

class HomeGeoLocation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayComponents: false,
      lat: 50.846859,
      lng: 4.352297,
      displayStreet: false,
      street: "",
    };
  }

  componentDidMount() {
    var host = process.env.SERVER_URL;
    if (!navigator.geolocation) {
      console.log("geolocation not available");
      fetchLocationData(this.state.lat, this.state.lng).then((res) =>
        this.setState({
          displayComponents: true,
          lat: this.state.lat,
          lng: this.state.lng,
          data: res,
          displayStreet: this.state.displayStreet,
          street: this.state.street,
        })
      );
      getData(
        `${host}/api/v1/map/current-street?lat=${this.state.lat}&lng=${this.state.lng}`
      ).then((res) =>
        this.setState({
          displayComponents: this.state.displayComponents,
          lat: this.state.lat,
          lng: this.state.lng,
          data: this.state.data,
          displayStreet: true,
          street: res,
        })
      );
    } else {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.setState({
            displayComponents: false,
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            data: this.state.data,
            displayStreet: this.state.displayStreet,
            street: this.state.street,
          });
          fetchLocationData(this.state.lat, this.state.lng).then((res) =>
            this.setState({
              displayComponents: true,
              lat: this.state.lat,
              lng: this.state.lng,
              data: res,
              displayStreet: this.state.displayStreet,
              street: this.state.street,
            })
          );
          getData(
            `${host}/api/v1/map/current-street?lat=${this.state.lat}&lng=${this.state.lng}`
          ).then((res) =>
            this.setState({
              displayComponents: this.state.displayComponents,
              lat: this.state.lat,
              lng: this.state.lng,
              data: this.state.data,
              displayStreet: true,
              street: res,
            })
          );
        },
        () => {
          fetchLocationData(this.state.lat, this.state.lng).then((res) =>
            this.setState({
              displayComponents: true,
              lat: this.state.lat,
              lng: this.state.lng,
              data: res,
              displayStreet: this.state.displayStreet,
              street: this.state.street,
            })
          );
          getData(
            `${host}/api/v1/map/current-street?lat=${this.state.lat}&lng=${this.state.lng}`
          ).then((res) =>
            this.setState({
              displayComponents: this.state.displayComponents,
              lat: this.state.lat,
              lng: this.state.lng,
              data: this.state.data,
              displayStreet: true,
              street: res,
            })
          );
        }
      );
    }

    async function fetchLocationData(lat, lng) {
      let host = process.env.SERVER_URL;

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

    async function fetchStreetData(lat, lng) {
      let host = process.env.SERVER_URL;

      getData(`${host}/api/v1/map/current-street?lat=${lat}&lng=${lng}`).then(
        (res) =>
          this.setState({
            displayComponents: this.state.displayComponents,
            lat: this.state.lat,
            lng: this.state.lng,
            displayStreet: true,
            street: res,
          })
      );
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

    let displayStreet = this.state.displayStreet;
    let street = this.state.street;

    let language = this.props.language;

    return (
      <div className="wrapper">
        {/* <p>list view</p> */}

          {
              language == "fr" ? (
                  <h2 className="sub">À moins de <i>2 km</i> de vous</h2>
              ) : null
          }
          {
              language == "en" ? (
                  <h2 className="sub">Within a <i>2 km</i> <br></br> radius from you</h2>
              ) : null
          }
          {
              language == "nl" ? (
                  <h2 className="sub">Binnen een straal <br></br> van <i>2 km</i></h2>
              ) : null
          }

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
