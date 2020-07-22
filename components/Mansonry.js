import LocationCard from "../components/LocationCard";

class Mansonry extends React.Component {
  render() {
    return (
      <div className="grid">
        {this.props.data.map((x) => {
          return (
            <div key={x.title} className="brick">
              {console.log(x.title)}
              <LocationCard
                data={x}
                lat={this.props.lat}
                lng={this.props.lng}
              />
            </div>
          );
        })}

        <style jsx>{`
          .grid {
            // display: grid;
            // grid-template-columns: 50% 50%;
            column-count: 2;
            column-gap: 0rem;
            margin: 1rem;
            margin-bottom: 5rem;
          }

          .brick {
            // width: 100%;
            // margin: 0 0 1em;
            // background-color: #eee;
            display: inline-block;
            // margin: 0 0 1em;
            width: 100%;
          }
        `}</style>
      </div>
    );
  }
}
export default Mansonry;
