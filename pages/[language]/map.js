import Head from "next/head";
import dynamic from "next/dynamic";
import SearchBar from "../../components/SearchBar";
import Layout from "../../components/Layout";
import LanguageStorage from "../../components/LanguageStorage"

const Map = dynamic(() => import("../../components/Map"), { ssr: false });

class MapPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lat: 50.8503,
      lng: 4.33517,
      street: "",
    }; 
  }

  showBikeBumps = (bool) => {
    this.map_component.showBikeBumps(bool);
  }

  showWaterFountains = (bool) => {
    this.map_component.showWaterFountains(bool);
  }

  showParkings = (bool) => {
    this.map_component.showParkings(bool);
  }

  showRepairs = (bool) => {
    this.map_component.showRepairs(bool);
  }

  showVillos = (bool) => {
    this.map_component.showVillos(bool);
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.setState({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        }
      );
    }

    let language = this.props.language;
    let lat = this.state.lat;
    let lng = this.state.lng;
    let url = `${process.env.SERVER_URL}/api/v1/map/current-street?lat=${lat}&lng=${lng}`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        let street = json;

        if(language == "fr")
          street = street.streetname_fr;
        else if(language == "nl")
          street = street.streetname_nl;
        else
          street = street.streetname_fr + " - " + street.streetname_nl;

        this.setState({
          street: street,
        });
      });    
  }

  render() {
    return (
      <Layout language={this.props.language}>
          <LanguageStorage language={this.props.language} />
        <div className="container">
          <Head>
            <link
              rel="stylesheet"
              href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css"
              integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
              crossOrigin=""
            />

            <script
              src="https://unpkg.com/leaflet@1.4.0/dist/leaflet.js"
              integrity="sha512-QVftwZFqvtRNi0ZyCtsznlKSWOStnDORoefr1enyq5mVL4tmKB3S/EnC3rRJcxCPavG10IcrVGSmPh6Qw5lwrg=="
              crossOrigin=""
            ></script>

            <script
              type="text/javascript"
              src="https://leafletjs.com/examples/map-panes/eu-countries.js"
            ></script>
          </Head>

          <div className="search__wrapper">
            <p id="place">
            <img src="/place.svg" /> <strong>{this.state.street}</strong>
            </p>
            <SearchBar
              showBikeBumps={this.showBikeBumps}
              showWaterFountains={this.showWaterFountains}
              showParkings={this.showParkings}
              showRepairs={this.showRepairs}
              showVillos={this.showVillos}
            />
          </div>
          <Map onRef={(ref) => (this.map_component = ref)} />

          {/* <Footer /> */}
          <style jsx>{`
            #main {
              width: 100%;
              display: flex;
              align: center;
              // margin-top: 2rem;
            }

            #place {
              display: flex;
              align-items: center;
              align-self: center;
              color: white;
              font-weight: 700;
              font-size: 1.4rem;
              margin-bottom: 2rem;
            }

            #place img {
              margin-right: 1rem;

            }

            Footer {
              height: 20vh;
            }

            .search__wrapper {
              display: flex;
              flex-flow: column;
              padding: 3rem 0;
              // padding-left: 1rem;
              background-color: #003b8b;
            }
          `}</style>
        </div>
      </Layout>
    );
  }
}

MapPage.getInitialProps = async function ({ query }) {
  return {
    language: query.language,
  };
};

export default MapPage;
