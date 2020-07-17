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
        displayComponents: true,
        lat: 50.8503,
        lng: 4.33517,
      });
    } else {
      navigator.geolocation.getCurrentPosition((pos) => {
        this.setState({
          displayComponents: true,
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      }, ()=>{
        this.setState({
            displayComponents: true,
            lat: 50.8503,
            lng: 4.33517,
          });
      });
    }
  }

  render() {
    let displayComponents = this.state.displayComponents;
    let latitude = this.state.lat;
    let longitude = this.state.lng;

    return <div>
        
        <h2>What do you want to find?</h2>

        <h2>Within a <i>2 km</i> radius from you</h2>
        
        {displayComponents ? <div>{latitude}, {longitude}</div> : ""}
        

        <style jsx>{`
          i{
              background-color:yellow;
          }
        `}</style>
        </div>;
  }
}
export default HomeGeoLocation;
