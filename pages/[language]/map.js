import Head from 'next/head'
import dynamic from 'next/dynamic'

import SearchBar from '../components/search_bar'
import Footer from '../components/footer'

const Map = dynamic(
  () => import('../components/map_component'),
  { ssr: false }
)

class MapPage extends React.Component {
  constructor(props) {
    super(props);
  }

  showBikeBumps = () => {
    this.map_component.showBikeBumps()
  };

  showWaterFountains = () => {
    this.map_component.showWaterFountains();
  };

  showParkings = () => {
    this.map_component.showParkings();
  };

  showRepairs = () => {
    this.map_component.showRepairs();
  };

  showVillos = () => {
    this.map_component.showVillos();
  };


  static async getInitialProps(ctx) {
    const server_url = process.env.SERVER_URL;
    let radius = 1000;
    let pos = {coords:{
      "latitude": 50.846859,
      "longitude": 4.352297,
      "accuracy": 5,
    }}

    let geolocation = "?lat=" + pos.coords.latitude + "&lng=" + pos.coords.longitude + "&radius=" + radius;      
    let url = server_url + "/api/v1/map/endpoints" + geolocation;

    const response = await fetch(url)
    const json = await response.json()
    const datapoints = json.success

    let reg = /\W(\w+)\W(\w+)\W(\w+)\W/;
    let result = []; 
                
    for(let i in datapoints) {
      let str = JSON.stringify(datapoints[i]);
      let feature = str.replace(reg, " ");
      result.push(feature);
    }

    pos = JSON.stringify(pos);
    return { position: pos }
  }


  render(){
    return (
      <div className="container">
        <Head>
          <link rel="stylesheet" href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css"
            integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
            crossOrigin=""/> 
  
          <script src="https://unpkg.com/leaflet@1.4.0/dist/leaflet.js"
            integrity="sha512-QVftwZFqvtRNi0ZyCtsznlKSWOStnDORoefr1enyq5mVL4tmKB3S/EnC3rRJcxCPavG10IcrVGSmPh6Qw5lwrg=="
            crossOrigin=""></script>

          <script type="text/javascript" src="https://leafletjs.com/examples/map-panes/eu-countries.js"></script>
        </Head>

        <SearchBar 
          showBikeBumps={this.showBikeBumps}
          showWaterFountains={this.showWaterFountains}
          showParkings={this.showParkings}
          showRepairs={this.showRepairs}
          showVillos={this.showVillos}
          />
        
        <Map onRef={ref => (this.map_component = ref)} />
  
        <Footer id="footer"/>
        <style jsx>{`
          #main {
              width: 100%;
              display: flex;
              align: center;
            }
          Footer {
            height: 20vh;
          }
          `}</style>
      </div>    
    )
  }
  
}

export default MapPage