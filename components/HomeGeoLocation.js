import Mansonry from "../components/Mansonry";

class HomeGeoLocation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayComponents: false,
      lat: 0,
      lng: 0,
      displayStreet: false,
      street: "",
    };
  }

  componentDidMount() {
    var host = "http://localhost:8080";
    if (!navigator.geolocation) {
      console.log("geolocation not available");
      this.setState({
        displayComponents: false,
        lat: 50.8503,
        lng: 4.33517,
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
          this.setState({
            displayComponents: false,
            lat: 50.8503,
            lng: 4.33517,
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

    async function fetchStreetData(lat, lng) {
      let host = "http://localhost:8080";

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
      <div>
        <header>
          {displayStreet && language == "nl" ? (
            <div>
              <p>U bevindt zich hier</p>
              <h1>{street.streetname_nl}</h1>
            </div>
          ) : (
            ""
          )}
          {displayStreet && language == "fr" ? (
            <div>
              <p>Vous êtes sur</p>
              <h1>{street.streetname_fr}</h1>
            </div>
          ) : (
            ""
          )}
          {displayStreet && language == "en" ? (
            <div>
              <p>You are at</p>
              <h1>{street.streetname_fr} - {street.streetname_nl}</h1>
            </div>
          ) : (
            ""
          )}
        </header>

        {
          language == "nl" ? (
            <h2>Wat zoekt u?</h2>
          ) : null
        }
        {
          language == "en" ? (
            <h2>What do you want to find?</h2>
          ) : null
        }
        {
          language == "fr" ? (
            <h2>TODO</h2>
          ) : null
        }

        <p>list</p>

        {
          language == "nl" ? (
            <h2>Binnen een straal van <i>2 km</i></h2>
          ) : null
        }
        {
          language == "en" ? (
            <h2>Within a <i>2 km</i> radius from you</h2>
          ) : null
        }
        {
          language == "fr" ? (
            <h2>TODO</h2>
          ) : null
        }

        {displayComponents ? (
          <div>
            <Mansonry data={data} lat={latitude} lng={longitude} />
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
