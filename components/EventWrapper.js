import EventCard from "../components/EventCard";

class EventWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayFutureComponent: false,
      displayTodayComponent: false,
      today: [],
      future: [],
    };
  }

  componentDidMount() {
    let host = "http://localhost:8080";

    let startdate = new Date();
    startdate.setHours(0);
    startdate.setMinutes(0);
    startdate.setSeconds(0);
    startdate.setUTCMilliseconds(0);

    let tomorrow = new Date(startdate);
    tomorrow.setDate(tomorrow.getDate() + 1);

    let enddate = new Date(startdate);
    enddate.setDate(enddate.getDate() + 30);

    getData(
      `${host}/api/v1/event/official?from=${Date.parse(startdate) / 1000}&to=${
        Date.parse(tomorrow) / 1000
      }`
    ).then((res) =>
      this.setState({
        displayTodayComponent: true,
        today: res.events,
        displayFutureComponent: this.state.displayFutureComponent,
        furute: this.state.future,
      })
    );

    getData(
      `${host}/api/v1/event/official?from=${Date.parse(tomorrow) / 1000}&to=${
        Date.parse(enddate) / 1000
      }`
    ).then((res) =>
      this.setState({
        displayTodayComponent: this.state.displayTodayComponent,
        today: this.state.today,
        displayFutureComponent: true,
        future: res.events,
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
    var date = new Date();
    let dd = String(date.getDate()).padStart(2, "0");
    let mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = date.getFullYear();
    date = dd + "-" + mm + "-" + yyyy;

    let displayTodayComponent = this.state.displayTodayComponent;
    let displayFutureComponent = this.state.displayFutureComponent;

    let todayEvents = this.state.today;
    let futureEvents = this.state.future;

    let language = this.props.language;

    return (
      <div>
        <article className="todayview">
          {language == "nl" ? <h1 className="title__ongoing">Lopende evenementen</h1> : null}
          {language == "en" ? <h1 className="title__ongoing">Ongoing events today</h1> : null}
          {language == "fr" ? <h1 className="title__ongoing">Évènement se déroulant aujourd'hui</h1> : null}

          <h2 className="date">{date}</h2>
          {displayTodayComponent ? (
            todayEvents.map((x) => {
              return (
                <div key={x.id}>
                  <EventCard event={x} language={this.props.language} />
                </div>
              );
            })
          ) : (
            <p>loading</p>
          )}
        </article>
        <article className="futureview">
          {language == "nl" ? <h1 className="title__ongoing">Andere evenementen in de toekomst</h1> : null}
          {language == "en" ? <h1 className="title__ongoing">Other events in the future</h1> : null}
          {language == "fr" ? <h1 className="title__ongoing">Autres évènement à venir</h1> : null}

          {displayFutureComponent ? (
            futureEvents.map((x) => {
              return (
                <div key={x.id}>
                  <EventCard event={x} language={this.props.language} />
                </div>
              );
            })
          ) : (
            <p>loading</p>
          )}
        </article>

        <style jsx>{`
          .todayview {
            background-color: rgb(246, 246, 246);
            display: flex;
            flex-flow: column;
            align-items: center;
          }
          .futureview {
            padding-bottom: 100px;
            display: flex;
            flex-flow: column;
            align-items: center;
          }
          article {
            padding: 20px 10px;
            background-color: white;
          }

          .title__ongoing {
            font-size: 2rem;
            font-weight: 700;
          }

          .date {
            font-size: 1.4rem;
            padding: 1rem;
          }
        `}</style>
      </div>
    );
  }
}

export default EventWrapper;
