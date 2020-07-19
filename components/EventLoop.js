import EventCard from "./EventCard";

class EventLoop extends React.Component {
    
  render() {
    return (
            <div>
        {this.props.data.map(x => {
            return <div><EventCard event={x}/></div>
        })}
        </div>
    );
  }
}
export default EventLoop;
