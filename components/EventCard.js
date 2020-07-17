import HomeEvent from "./HomeEvent";

class EventCard extends React.Component {
  render() {

    if (!this.props.event.media[0]) {
      var title = this.props.event.media.translations.en.title;
      var image = this.props.event.media.link;
    } else if (this.props.event.media[0].translations.en.title) {
      var title = this.props.event.media[0].translations.en.title;
      var image = this.props.event.media[0].link;
    }

    if (this.props.event.recurring) {
      var starttime = this.props.event.recurring.time_start;
      var endtime = this.props.event.recurring.time_end;
    } else {
      var starttime = this.props.event.dates.start;
      var endtime = this.props.event.dates.end;
    }

    var place = this.props.event.place.translations.en.address_city;

    return (
      <div>
        <img src={image} alt="title" />
        <article>
          <h3>{title}</h3>
          <p>{starttime.substring(0,5)} - {endtime.substring(0,5)} | {place}</p>
        </article>
        <p>icon</p>

        <style jsx>{`
          img {
            width: 60px;
            height: 60px;
            object-fit: cover;
            border-radius: 50%;
          }

          div {
            margin: 16px 8px;
            display: grid;
            grid-template-columns: min-content auto min-content;
          }

          article {
            padding: 8px;
          }
        `}</style>
      </div>
    );
  }
}

export default EventCard;
