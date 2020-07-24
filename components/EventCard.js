import HomeEvent from "./HomeEvent";
import Link from 'next/link';

class EventCard extends React.Component {
  render() {
    if(this.props.event.media !== undefined){
    try{
      if (!this.props.event.media[0]) {
        var title = this.props.event.media.translations.en.title;
        var image = this.props.event.media.link;
      } else if (this.props.event.media[0].translations.en.title) {
        var title = this.props.event.media[0].translations.en.title;
        console.log(this.props.event.media)
        var image = this.props.event.media[0].link;
      }
    } catch(error) {
      console.log(error)
    }
  }else if(this.props.event.media === undefined){
    var image = "../images/placeholder_minified.jpg"
  }

    try{
      if (this.props.event.recurring) {
        var starttime = this.props.event.recurring.time_start;
        var endtime = this.props.event.recurring.time_end;
      } else {
        var starttime = this.props.event.dates.start;
        var endtime = this.props.event.dates.end;
        var date = this.props.event.date_start;
      }
    } catch(error) {
      console.log(error)
    }

    

    var place = this.props.event.place.translations.en.address_city;

    return (
      <div className="event">
        <img src={image} alt="title" />
        {console.log(image)}
        <article className="info">
          <h3 className="event__title">{title}</h3>
          <p className="event__info">{starttime} - {endtime} | {date} | {place}</p>
          <div className="tag__container">
          <p className="event__tag">official</p>
          </div>
        </article>
        <Link href="/[language]/event/[id]" as={`/${this.props.language}/event/${this.props.event.id}`}>
        <img className="more__info" src="/icons/detail.svg" />
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
            font-size:1.4rem;
          }
        .info {
          padding: 0 2rem
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
          border: .2rem #003b8b solid;
          border-radius: 5rem;
        }
        `}</style>
      </div>
    );
  }
}

export default EventCard;
