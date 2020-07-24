import Link from "next/link";
import Head from "next/head";
import LanguageStorage from "../../../../components/LanguageStorage";
import AddToCalendar from "react-add-to-calendar";
import React from "react";

class Event extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayComponent: false,
      event: {},
    };
  }

  componentDidMount() {
    let host = process.env.SERVER_URL;

    getData(`${host}/api/v1/event/official/id/${this.props.id}`).then((res) =>
      this.setState({
        event: res.event,
        displayComponent: true,
      })
    );

    function getData(url) {
      return fetch(url)
        .then((res) => res.json())
        .then((data) => {
          return data;
        });
    }
  }

  render() {
    let language = this.props.language;
    let displayComponent = this.state.displayComponent;
    if (displayComponent) {
      //title
      try {
        var title = this.state.event.translations[this.props.language].name;
      } catch (err) {
        console.log(err);
        var title = "unknown";
      }

      //image
      try {
        if (!this.state.event.media) {
          var image = "../images/placeholder_minified.jpg";
        } else if (!this.state.event.media[0]) {
          if (["photo", "poster"].includes(this.state.event.media.type)) {
            var image = this.state.event.media.link;
          }
        } else if (this.state.event.media[0]) {
          var imageList = [];
          for (let i = 0; i < this.state.event.media.length; i++) {
            if (["photo", "poster"].includes(this.state.event.media[0].type)) {
              imageList.push(this.state.event.media[i].link);
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
        if (this.state.event.recurring) {
          var starttime = this.state.event.recurring.time_start;
          var endtime = this.state.event.recurring.time_end;
        } else {
          var starttime = this.state.event.dates.start;
          var endtime = this.state.event.dates.end;
          var date = this.state.event.date_start;
        }

        if (this.state.event.recurring) {
          var starttime = this.state.event.recurring.time_start;
          var endtime = this.state.event.recurring.time_end;
        } else if (Array.isArray(this.state.event.dates)) {
          for (let i = 0; i < this.state.event.dates.length; i++) {
            if (this.state.event.dates[i].day == this.state.event.date_next) {
              var starttime = this.state.event.dates[i].start;
              var endtime = this.state.event.dates[i].end;
            }
          }
        } else if (this.state.event.dates.start && this.state.event.dates.end) {
          var starttime = this.state.event.dates.start;
          var endtime = this.state.event.dates.end;
        }
      } catch (error) {
        console.log(error);
        var starttime = "NA";
        var endtime = "NA";
      }
      if (starttime == null) var starttime = "NA";
      if (endtime == null) var endtime = "NA";

      //description
      try {
        if (this.state.event.translations[language].longdescr) {
          var description = this.state.event.translations[language].longdescr;
        } else if (this.state.event.translations.fr.longdescr) {
          var description = this.state.event.translations.fr.longdescr;
        } else if (this.state.event.translations.nl.longdescr) {
          var description = this.state.event.translations.nl.longdescr;
        } else if (this.state.event.translations.en.longdescr) {
          var description = this.state.event.translations.en.longdescr;
        } else {
          var description = "description unknown";
        }
      } catch (err) {
        console.log(err);
        var description = "description unknown";
      }

      //agenda_url
      try {
        var agenda = this.state.event.translations[language].agenda_url;
      } catch (err) {
        console.log(err);
      }

      //place
      try {
        var place = this.state.event.place.translations.en.address_city;
      } catch (err) {
        console.log(err);
      }

      //organizer
      try {
        if (this.state.event.organizer.translations[language].name) {
          var organizer = this.state.event.organizer.translations[language]
            .name;
        } else {
          var organizer = "unknown";
        }
      } catch (err) {
        console.log(err);
        var organizer = "unknown";
      }

      //calendar event
      var calendarEvent = {
        title: title,
        description: description,
        location: this.state.event.place.translations.en.address_street_name
          ? this.state.event.place.translations.en.address_street_name
          : null +
            " " +
            this.state.event.place.translations.en.address_street_number
          ? this.state.event.place.translations.en.address_street_number
          : null + " " + this.state.event.place.translations.en.address_city,
        startTime: new Date(date + "T" + starttime),
        endTime: new Date(date + "T" + endtime),
      };

      console.log(calendarEvent);
    }
    return (
      <div>
        <Head>
          <title>Event</title>
        </Head>
        <LanguageStorage language={language} />
        <Link href="/[language]/events" as={`/${language}/events`}>
          <img className="backbutton" src="/icons/back.svg" />
        </Link>

        <header className="wrapper__header">
          {displayComponent ? (
            <img className="banner" src={image} />
          ) : (
            <img className="banner" src={"/images/placeholder.jpg"} />
          )}
          {displayComponent ? (
            <h1 className="header__title">{title}</h1>
          ) : (
            <h1 className="header__title">loading</h1>
          )}
          {displayComponent ? (
            <p className="event__info">
              {starttime.substr(0, 5)} - {endtime.substr(0, 5)} | {date} |{" "}
              {place}
            </p>
          ) : (
            <p className="event__info">loading</p>
          )}
        </header>

        {displayComponent ? (
          <article>
            <p className="description">{description}</p>
            {language == "nl" ? (
              <p className="organize">
                <b>georganiseerd door: </b>
                {organizer}
              </p>
            ) : null}
            {language == "fr" ? (
              <p className="organize">
                <b>TODO: </b>
                {organizer}
              </p>
            ) : null}
            {language == "en" ? (
              <p className="organize">
                <b>organized by: </b>
                {organizer}
              </p>
            ) : null}
          </article>
        ) : (
          "loading"
        )}

        <article>
          <div className="buttonwrapper">
            {displayComponent ? (
              language === "en" ? (
                <a className="button" href={agenda} target="_blank">
                  More info
                </a>
              ) : language === "nl" ? (
                <a className="button" href={agenda} target="_blank">
                  Meer informatie
                </a>
              ) : language === "fr" ? (
                <a className="button" href={agenda} target="_blank">
                  TODO
                </a>
              ) : null
            ) : null}
            {displayComponent ? <AddToCalendar event={calendarEvent} /> : null}
          </div>
        </article>

        <style jsx>{`
        b {
          font-weight: bold;
        }

        .organize {
          font-size 1.6rem;
        }

        .description {
          font-size: 1.6rem;
          margin-bottom: 2rem;
        }

        .banner {
          border-radius: 50%;
          width: 10rem;
          height: 10rem;
          margin: 2rem;
          align-self: center;
        }

        img.backbutton {
          width: 40px;
          height: 40px;
          position: fixed;
          top: 16px;
          left: 16px;
          border: #003b8b 3px solid;
          border-radius: 50%;
        }

        article {
          padding: 16px;
        }

        a.button{
          background-color: #003b8b;
          color: white;
          display: inline-block;
          padding: 10px;
          text-align: center;
          border-radius: 8px;
          margin: 8px;
          text-decoration: none;
          font-size: 1.6rem;
        }

        div.buttonwrapper {
          display: grid;
          grid-template-columns: 100%
        }

        .wrapper__header {
          background-color: #003b8b;
          padding: 2rem 0;
        }

        .header__title {
          font-size: 2rem;
          font-weight: 700;
          padding: 0 2rem;
        }

        .event__info {
          font-size: 1.6rem;
          padding: 2rem
        }
      `}</style>
      </div>
    );
  }
}

Event.getInitialProps = async ({ query }) => {
  return {
    id: query.id,
    language: query.language,
  };
};

export default Event;
