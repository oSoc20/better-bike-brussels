import Link from "next/link";

class LocationCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayComponents: false,
      title: ''
    };
    this.poi = '';
  }

  componentDidMount() {
    let language = localStorage.getItem('_language');
    
    switch (this.props.data.title) {
      case "Bicycle parking":
        this.poi = "bicycle_parking";
        if (language == "nl")
          this.setState({title: "Fietsenparkeren"});
        else if (language == "fr")
          this.setState({title: "Parking à vélos"});
        else
          this.setState({title: "Bicycle parking"});
        break;

      case "Villo station":
        this.poi = "villo_station";
        this.setState({title: "Villo"});
        break;

      case "Air pump":
        this.poi = "compressed_air";
        if (language == "nl")
          this.setState({title: "Fietspomp"});
        else if (language == "fr")
          this.setState({title: "Pompe à air"});
        else if (language == "en")
          this.setState({title: "Air pump"});
        break;

      case "Repair station":
        this.poi = "bicycle_repair_station";
        if (language == "nl")
        this.setState({title: "Fietsreparatie"});
        else if (language == "fr")
        this.setState({title: "Réparation de vélos"});
        else if (language == "en")
        this.setState({title: "Bicycle repair"});
        break;

      case "Bicycle shop":
        this.poi = "bicycle_shop";
        if (language == "nl")
          this.setState({title: "Fietswinkel"});
        else if (language == "fr")
          this.setState({title: "Magasin de vélos"});
        else if (language == "en")
          this.setState({title: "Bicycle shop"});
        break;

      case "Water tap":
        this.poi = "drinking_water";
        if (language == "nl")
          this.setState({title: "Waterfontein"});
        else if (language == "fr")
          this.setState({title: "Fontaine à eau"});
        else if (language == "en")
          this.setState({title: "Water fountain"});
        break;
    
      default:
        break;
    }
  }

  render() {
    let language = localStorage.getItem('_language');
    
    let valid = false;
    if(this.props.data.features && this.props.data.features[0]) 
      valid = true;
    
    return (
      <div className="card">
        <h1 className="title">{this.state.title}</h1>
        {valid ? this.props.data.features.map((x, i) => {
          if (x.id === undefined)
            x.id = (this.state.title + i);
          let lat = x.geometry.coordinates[1];
          let lng = x.geometry.coordinates[0];
          return <div key={x.id} className="grid">
            <p key={x.id} className="distance">
              <Link href={{ pathname: `/${language}/map`, query: { poi: this.poi, poi_lat: lat, poi_lng: lng } }}>
                <a>{x.properties.dist.distance}{x.properties.dist.unit}</a>
              </Link>
            </p>

          </div>;
        }) : (language == "nl") ? 'Niets in uw omgeving' 
           : (language == "fr") ? 'Rien dans votre région'
           : 'Nothing in your area'}

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
