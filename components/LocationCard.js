import Link from "next/link";

class LocationCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayComponents: false,
    };
    this.pois = '';
  }

  componentDidMount() {
    switch (this.props.data.title) {
      case "Bicycle parking":
        this.pois = "";
        break;
    
      default:
        break;
    }
    /*

        if(this.props.data.features && this.props.data.features[0]){
            fetchStreetData(this.props.data);
        }

        //console.log(fetchStreetData(this.props.data));

        async function fetchStreetData(pointData){
            //console.log(pointData.features);
            let host = "http://localhost:8080";            

            const promises = pointData.features.map(feature => {
                getData(`${host}/api/v1/map/current-street?lat=${feature.geometry.coordinates[0]}&lng=${feature.geometry.coordinates[1]}`);
            })
            console.log(promises);

            let data = await Promise.all(promises).then((responses)=>{
                return responses;
            })

            console.log(data);
            return data;
        }*/

    function getData(url) {
      return fetch(url)
        .then((res) => res.json())
        .then((data) => {
          return data;
        });
    }
  }

  render() {
    let lat = this.props.lat;
    let lng = this.props.lng;
    let language = localStorage.getItem('_language');
    console.log(this.props.data.features);
    if(this.props.data.features && this.props.data.features[0]){
      var valid = true;
    }
    return (
      <div className="card">
        <h1 className="title">{this.props.data.title}</h1>
        {valid ? this.props.data.features.map((x) => {
          // console.log(x.id);
          return <div key={x.id} className="grid">
            <p key={x.id} className="distance">
              <Link href={`/${language}/map/?lat=${lat}&lng=${lng}&pois=${this.props.data.title}`}>
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
