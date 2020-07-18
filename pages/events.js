import Head from "next/head";
import dynamic from "next/dynamic";

import SearchBar from "./components/search_bar";
import Layout from "../components/Layout";
import HomeEvent from "../components/HomeEvent";
import HomeGeoLocation from "../components/HomeGeoLocation";
import EventCard from "../components/EventCard";

const Index = (props) => (
  <Layout>
    <div>
      
      <header>
          <h1>events</h1>
      </header>
      <article className="todayview">
        <h1>Ongoing events today</h1>
        <h2>{props.date}</h2>
        {props.today.map((x) => {
          return <EventCard key={x.id} event={x} />;
        })}
      </article>
      <article className="futureview">
        <h1>Other events in the future</h1>
        {props.future.map((x) => {
          return <EventCard key={x.id} event={x} />;
        })}
      </article>
      <style jsx>{`
        .todayview {
          background-color: rgb(246, 246, 246);
        }
        .futureview{
            padding-bottom: 100px;
        }
        article{
            padding: 20px 10px;
            background-color:white;
        }
      `}</style>
    </div>
  </Layout>
);

Index.getInitialProps = async function () {
  let host = "http://localhost:8080";

  let startdate = new Date();
  let tomorrow = new Date(startdate);
  tomorrow.setDate(tomorrow.getDate() + 1); //TODO FIX THIS

  let enddate = new Date(startdate);
  enddate.setDate(enddate.getDate() + 30); //TODO FIX THIS

  let today = await getData(
    `${host}/api/v1/event/official?from=${Date.parse(startdate) / 1000}&to=${
      Date.parse(tomorrow) / 1000
    }`
  );
  let future = await getData(
    `${host}/api/v1/event/official?from=${Date.parse(startdate) / 1000}&to=${
      Date.parse(enddate) / 1000
    }`
  );

  var date = new Date();
  let dd = String(date.getDate()).padStart(2, "0");
  let mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = date.getFullYear();
  date = dd + "-" + mm + "-" + yyyy;

  function getData(url) {
    return fetch(url)
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
  }

  return {
    today: today.events,
    future: future.events,
    date: date,
  };
};

export default Index;
