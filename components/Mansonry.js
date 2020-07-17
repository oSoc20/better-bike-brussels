import LocationCard from "../components/LocationCard";

class Mansonry extends React.Component {
    
  render() {
    return (
      <div className="grid">


        {this.props.data.map(x => {
            return <div className="brick"><LocationCard data={x} lat={this.props.lat} lng={this.props.lng}/></div>
        })}

        <style jsx>{`
          .grid {
            display: grid;
            grid-template-columns: 50% 50%;
          }

          .brick {
            width:100%
          }
        `}</style>
      </div>
    );
  }
}
export default Mansonry;
