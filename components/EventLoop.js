import EventCard from "./EventCard";

class EventLoop extends React.Component {
    
  render() {
    return (
            <div>
        {this.props.data.map(x => {
            return <div><EventCard event={x} language={this.props.language}/></div>
        })}
        </div>
    );
  }
}
export default EventLoop;
