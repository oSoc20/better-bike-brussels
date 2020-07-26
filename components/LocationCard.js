import Link from "next/link";

class LocationCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayComponents: false,
    };
    this.poi = '';
  }

  componentDidMount() {
    switch (this.props.data.title) {
      case "Bicycle parking":
        this.poi = "bicycle_parking";
        break;

      case "Villo station":
        this.poi = "villo_station";
        break;

      case "Air pump":
        this.poi = "compressed_air";
        break;

      case "Repair station":
        this.poi = "bicycle_repair_station";
        break;

      case "Bicycle shop":
        this.poi = "bicycle_shop";
        break;

        case "Water tap":
          this.poi = "drinking_water";
          break;
    
      default:
        break;
    }
  }

  render() {
    let language = localStorage.getItem('_language');
    console.log(this.props.data.features);
    if(this.props.data.features && this.props.data.features[0]){
      var valid = true;
    }
    return (
      <div className="card">
        <h1 className="title">{this.props.data.title}</h1>
        {valid ? this.props.data.features.map((x) => {
          let lat = x.geometry.coordinates[1];
          let lng = x.geometry.coordinates[0];
          return <div key={x.id} className="grid">
            <p key={x.id} className="distance">
              <Link href={{ pathname: `/${language}/map`, query: { poi: this.poi, poi_lat: lat, poi_lng: lng } }}>
                <a>{x.properties.dist.distance}{x.properties.dist.unit}</a>
              </Link>
            </p>

          </div>;
        }) : 'Nothing in your area'}

        <style jsx>{`
          .card {
            background-color: rgb(246, 246, 246);
            border-radius: 10px;
            display: flex;
            flex-flow: column;
            align-items: center;

            margin: 8px;
            padding: 16px;
          }

          .title {
            font-size: 1.6rem;
            font-weight: 700;
            align-self: center;
            text-align: center;
          }

          .distance {
            font-size: 1.4rem;
            margin: .5rem;
            text-decoration: underline;
            color: #003B8B;
          }
        `}</style>
      </div>
    );
  }
}
export default LocationCard;
