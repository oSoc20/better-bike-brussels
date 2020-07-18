import Link from "next/link";
import Head from "next/head";

const Event = (props) => {
  try {
    var title = props.event.translations[props.language].name;
  } catch (err) {
    console.log(err);
    var title = "unknown";
  }

  try {
    if (props.event.translations[props.language].longdescr !== null) {
      var description = props.event.translations[props.language].longdescr;
    } else if (props.event.translations[props.language].shortdescr !== null) {
      var description = props.event.translations[props.language].shortdescr;
    } else {
      var description = "description unknown";
    }
  } catch (err) {
    console.log(err);
    var description = "description unknown";
  }

  try {
    if (props.event.organizer.translations[props.language].name !== null) {
      var organizer = props.event.organizer.translations[props.language].name;
    } else {
      var organizer = "unknown";
    }
  } catch (err) {
    console.log(err);
    var organizer = "unknown";
  }

  try {
    if (props.event.media[0]) {
      if (["photo", "poster"].includes(props.event.media[0].type)) {
        var image = props.event.media[0].link;
      } else {
        var image = "/images/placeholder.jpg";
      }
    } else if (props.event.media) {
      if (["photo", "poster"].includes(props.event.media.type)) {
        var image = props.event.media.link;
      } else {
        var image = "/images/placeholder.jpg";
      }
    } else {
      var image = "/images/placeholder.jpg";
    }
  } catch (err) {
    var image = "/images/placeholder.jpg";
    console.log(err);
  }

  try {
    var agenda = props.event.translations[props.language].agenda_url;
  } catch (err) {
    console.log(err);
  }

  return (
    <div>
      <Head>
        <title>Event</title>
      </Head>
      <Link href="/events">
        <img className="backbutton" src="/icons/back.svg" />
      </Link>

      <img className="banner" src={image} />

      <article>
        <h1>{title}</h1>
        <p>{description}</p>
        {props.language == "nl" ? (
          <p>
            <b>georganiseerd door: </b>
            {organizer}
          </p>
        ) : null}
        {props.language == "fr" ? (
          <p>
            <b>TODO: </b>
            {organizer}
          </p>
        ) : null}
        {props.language == "en" ? (
          <p>
            <b>organized by: </b>
            {organizer}
          </p>
        ) : null}

        <div className="buttonwrapper">
          {props.language == "en" ? (
            <a className="button" href={agenda} target="_blank">
              More info
            </a>
          ) : null}
          {props.language == "nl" ? (
            <a className="button" href={agenda} target="_blank">
              Meer informatie
            </a>
          ) : null}
          {props.language == "fr" ? (
            <a className="button" href={agenda} target="_blank">
              TODO
            </a>
          ) : null}
        </div>
      </article>

      <style jsx>{`
        b {
          font-weight: bold;
        }

        img.banner {
          width: 100%;
          height: 45vh;
          object-fit: cover;
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

        a.button {
          background-color: #003b8b;
          color: white;
          display: inline-block;
          padding: 10px;
          text-align: center;
          border-radius: 8px;
          margin: 16px;
          text-decoration:none;
        }
        div.buttonwrapper{
          display:grid;
          place-items:center;
        }
      `}</style>
    </div>
  );
};

Event.getInitialProps = async ({ query }) => {
  let host = "http://localhost:8080";

  let event = await getData(`${host}/api/v1/event/official/id/${query.id}`);

  function getData(url) {
    return fetch(url)
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
  }

  return {
    id: query.id,
    language: query.language,
    event: event.event,
  };
};

export default Event;