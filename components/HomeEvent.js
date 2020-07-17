import EventCard from '../components/EventCard';


class HomeEvent extends React.Component {
  render() {
    var today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();
    today = dd + "-" + mm + "-" + yyyy;

    return (
      <div>
        <h1>Ongoing events today</h1>
        <h2>{today}</h2>

        {this.props.events.map(x => {
            return <EventCard key={x.id} event={x}/>
        })}

        <style jsx>{`
          div {
              color:white;
            background-color: #003b8b;
            padding:20px 10px 100px 10px;
          }
        `}</style>
      </div>
    );
  }
}

export default HomeEvent;
