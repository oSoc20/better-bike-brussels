import Head from "next/head";
import dynamic from "next/dynamic";
import Link from "next/link";
import SearchBar from "../components/search_bar";
import Layout from "../../components/Layout";
import HomeEvent from "../../components/HomeEvent";
import HomeGeoLocation from "../../components/HomeGeoLocation";
import LanguageStorage from "../../components/LanguageStorage";

const Index = (props) => (
  <Layout language={props.language}>
    <LanguageStorage language={props.language} />
    <Head>
    <title>Home</title>
    </Head>
    <div className="container">
      <Link href="/[language]/settings" as={`/${props.language}/settings`}>
        <img className="infobutton" src="/icons/info.svg" />
      </Link>

      <div id="header">
          <div>
            <img src={`/icons/weather/${props.weather.icon}.png`} />
            <p>
              {props.weather.temperature} &amp; {props.weather.description}
            </p>
          </div>
      </div>

      <HomeGeoLocation language={props.language} />

      <HomeEvent events={props.data} language={props.language} />

      <style jsx>{`
        .box {
          display: flex;
          align: center;
          flex-wrap: wrap;
          text-align: center;
        }

        .box div.interest {
          display: inline-block;
          padding: 5px;
          margin: 10px;
          width: 40%;
          background-color: #dfdfdf;
        }

        .interest-name {
          font-weight: bold;
        }

        #position {
          text-align: center;
        }

        #place {
          font-size: 32px;
        }

        #header {
          background: #bcbaba;
        }

        #wrapper {
          padding: 10px;
          margin: 10px;
          overflow: auto;
        }

        #wrapper div {
          margin: 5px;
        }

        #c1,
        #c2 {
          float: left;
          padding: 10px;
        }

        
        ​
        img {
          height: 30px;
          width: 30px;
        }
        img {
          height: 30px;
          width: 30px;
        }

        

        

        img.infobutton {
          width: 30px;
          height: 30px;
          position: absolute;
          top: 16px;
          right: 16px;
        }
      `}</style>
    </div>
  </Layout>
);

Index.getInitialProps = async function ({ query }) {
  let host = "http://localhost:8080";

  let startdate = new Date();
  startdate.setHours(0);
  startdate.setMinutes(0);
  startdate.setSeconds(0);
  startdate.setUTCMilliseconds(0);
  let enddate = new Date(startdate);

  enddate.setDate(enddate.getDate() + 1);

  console.log(Date.parse(startdate) / 1000, Date.parse(enddate) / 1000);

  let events = await getData(
    `${host}/api/v1/event/official?from=${Date.parse(startdate) / 1000}&to=${
      Date.parse(enddate) / 1000
    }`
  );

  let weather = await getData(
    `${host}/api/v1/weather/current?language=${query.language}`
  );

  //console.log(events);

  function getData(url) {
    return fetch(url)
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
  }

  return {
    data: events.events,
    language: query.language,
    weather: weather,
  };
};

export default Index;
