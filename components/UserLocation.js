import React from 'react';

class UserLocation extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
          lat: 50.846859,
          lng: 4.352297
        };
    }

    async componentDidMount() {
        this.props.onRef(this);
        await this.locateUser();
        let language = this.props.language;
        let lat = this.state.lat;
        let lng = this.state.lng;
    
        let url = `${process.env.SERVER_URL}/api/v1/map/current-street?lat=${lat}&lng=${lng}`;
        fetch(url)
          .then((response) => response.json())
          .then((json) => {
            let street = json;
    
            if (language == "fr") street = street.streetname_fr;
            else if (language == "nl") street = street.streetname_nl;
            else street = street.streetname_fr + " - " + street.streetname_nl;

            let location = {
                lat: lat,
                lng: lng,
                street: street
            };
            this.props.location(location);
        });
        
    }

    locateUser() {
        return new Promise((resolve) => {
          navigator.geolocation.getCurrentPosition(
            (location) => {
                resolve(this.setState({
                  lat: location.coords.latitude,
                  lng: location.coords.longitude
                }));
            }, () => {resolve()}
          );
        });
      }

    render() {
        return "";
    }
}

export default UserLocation;