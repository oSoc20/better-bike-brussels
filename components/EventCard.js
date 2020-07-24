import HomeEvent from "./HomeEvent";
import Link from "next/link";

class EventCard extends React.Component {
  render() {

    //title
    try {
      var title = this.props.event.translations[this.props.language].name;
    } catch (err) {
      console.log(err);
      var title = "unknown";
    }

    //image
    try {
      if (!this.props.event.media) {
        var image = "../images/placeholder_minified.jpg";
      } else if (!this.props.event.media[0]) {
        if (["photo", "poster"].includes(this.props.event.media.type)) {
          var image = this.props.event.media.link;
        }
      } else if (this.props.event.media[0]) {
        var imageList = [];
        for (let i = 0; i < this.props.event.media.length; i++) {
          if (["photo", "poster"].includes(this.props.event.media[0].type)) {
            imageList.push(this.props.event.media[i].link);
          }
        }
        if (imageList.length > 0) var image = imageList[0];
        else var image = "/images/placeholder_minified.jpg";
      } else {
        var image = "/images/placeholder_minified.jpg";
      }
    } catch (err) {
      console.log(err);
      var image = "/images/placeholder_minified.jpg";
    }

    //start & endtime
    try {
      if (this.props.event.recurring) {
        var starttime = this.props.event.recurring.time_start;
        var endtime = this.props.event.recurring.time_end;
        
      } else {
        var starttime = this.props.event.dates.start;
        var endtime = this.props.event.dates.end;
        var date = this.props.event.date_start;
      }

      if (this.props.event.recurring) {
        var starttime = this.props.event.recurring.time_start;
        var endtime = this.props.event.recurring.time_end;
      } else if (Array.isArray(this.props.event.dates)) {
        for (let i = 0; i < this.props.event.dates.length; i++) {
          if (this.props.event.dates[i].day == this.props.event.date_next) {
            var starttime = this.props.event.dates[i].start;
            var endtime = this.props.event.dates[i].end;
          }
        }
      } else if (this.props.event.dates.start && this.props.event.dates.end) {
        var starttime = this.props.event.dates.start;
        var endtime = this.props.event.dates.end;
      }
    } catch (error) {
      console.log(error);
      var starttime = "NA";
      var endtime = "NA";
    }
    if (starttime == null) var starttime = "NA";
    if (endtime == null) var endtime = "NA";

    var place = this.props.event.place.translations.en.address_city;

    return (
      <div className="event">
        <img src={image} alt={title} />
        <article className="info">
          <h3 className="event__title">{title}</h3>
          <p className="event__info">
            {starttime.substr(0, 5)} - {endtime.substr(0, 5)} | {date} | {place}
          </p>
          <div className="tag__container">
            <p className="event__tag">official</p>
          </div>
        </article>
        <Link
          href="/[language]/event/[id]"
          as={`/${this.props.language}/event/${this.props.event.id}`}
        >
          <img className="more__info" src="/icons/detail.svg" alt="details" />
        </Link>

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

          .event__title {
            font-size: 1.4rem;
            font-weight: 700;
          }

          .event__info {
            font-size: 1.4rem;
          }
          .info {
            padding: 0 2rem;
          }

          .more__info {
            width: 3rem;
            height: 3rem;
          }

          .event {
            padding: 2.5rem 0 0 0;
          }

          .event__tag {
            background-color: #003b8b;
            color: white;
            padding: 0.1rem 1rem;
            border: 0.2rem #003b8b solid;
            border-radius: 5rem;
          }
        `}</style>
      </div>
    );
  }
}

export default EventCard;
