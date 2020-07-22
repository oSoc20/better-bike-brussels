import Head from 'next/head'
import dynamic from 'next/dynamic'
import SearchBar from '../../components/SearchBar'
import Layout from '../../components/Layout'

const Map = dynamic(
  () => import('../../components/Map'),
  { ssr: false }
)

class MapPage extends React.Component {
  constructor(props) {
    super(props);
  }

  showBikeBumps = (bool) => {
    this.map_component.showBikeBumps(bool)
  };

  showWaterFountains = (bool) => {
    this.map_component.showWaterFountains(bool);
  };

  showParkings = (bool) => {
    this.map_component.showParkings(bool);
  };

  showRepairs = (bool) => {
    this.map_component.showRepairs(bool);
  };

  showVillos = (bool) => {
    this.map_component.showVillos(bool);
  };

  render(){
    return (
        <Layout>
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
        </Layout>
    )
  }
  
}

export default MapPage