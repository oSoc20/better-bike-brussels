import Head from "next/head";
import dynamic from "next/dynamic";
import Link from "next/link";
import SearchBar from "../../components/SearchBar";
import Layout from "../../components/Layout";
import HomeEvent from "../../components/HomeEvent";
import HomeGeoLocation from "../../components/HomeGeoLocation";
import LanguageStorage from "../../components/LanguageStorage";

const Index = (props) => (
  <Layout language={props.language}>
    <LanguageStorage language={props.language} />
    <Head>
    <title>Home</title>

    <link rel="manifest" href="/manifest.json"/>

    <link href='/touch/favicon-16x16.png' rel='icon' type='image/png' sizes='16x16'/>
    <link href='/touch/favicon-32x32.png' rel='icon' type='image/png' sizes='32x32'/>
    <link href="shortcut icon" href="/touch/favicon.ico"/>

    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="apple-mobile-web-status-bar-style" content="black"/>
    <meta name="apple-mobile-web-app-title" content="BetterBike"/>
    <link rel="apple-touch-icon" href="/touch/apple-touch-icon.png"/>

    <meta name="theme-color" content="#003b8b"/>

    <meta name="Description" content="BetterBikeBrussels is the digital tool imagined by and made for 
    Brussels citizens to have a safe and hassle-free bike ride in the city. It is designed 
    to help you before and after your bike trip. You have a flat tire and need access to 
    an air pump or a bike service station? No problem. Just arrived at your destination but 
    there is no secure bike parking in sight? We got you! Ready to head out but not sure if 
    you need that raincoat? We’ll get you informed."/>

    </Head>
    <div className="container">
      <Link href="/[language]/settings" as={`/${props.language}/settings`}>
        <img className="infobutton" src="/icons/info.svg" />
      </Link>
        <div id="header">
        <div id="wrapper">
            <div id="c1">busy</div>
            <div className="wrapper__weather" id="c2">
                <img className="weather__img" src={ `/icons/weather/${props.weather.icon}.png`}/>
                <p >
                    {Math.round(props.weather.temperature*2)/2}°C | {props.weather.description}
                </p>
            </div>
        </div>
        ​
        <div id="position">
            You are at
            <p id="place">
                <img src="/place.svg" /> <strong>Mellery Street</strong>
            </p>
        </div>
    </div>

      <div className="wrapper__search">
      {props.language == "nl" ? <p className="sub">Wat zoekt u?</p> : null}
      {props.language == "en" ? <p className="sub">What do you want to find?</p> : null}
      {props.language == "fr" ? <p className="sub">TODO</p> : null}
          <SearchBar />
      </div>



      <HomeGeoLocation language={props.language} />

      <HomeEvent events={props.data} language={props.language} />

      <script type="text/javascript" src="/js/script.js"/>

      <style jsx>{`
        .box {
          display: flex;
          align: center;
          flex-wrap: wrap;
          text-align: center;
        }

        .sub {
          font-size:1.7rem;
          font-weight: 700;
          align-self: center;
          margin: 1rem 0;
        }

        .weather__img {
          margin-top: -1rem;
          margin-right: 1rem;
        }

        .wrapper__search {
          display: flex;
          // justify-content: center;
          // align-items: center;
          flex-flow: column;
          margin: 3rem 0;
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
          color: white;
          font-size: 1.2rem;
        }

        .wrapper__weather {
          display: flex;
          // align-items: center;
        }

        #place {
          font-size: 3rem;
          font-weight: bold;
          color: white;
        }

        #header {
          background: #003B8B;
          padding: 0 0 3rem 0;
        }

        #wrapper {
          padding: 10px;
          overflow: auto;
          color: white;
        }

        #wrapper div {
          margin: 5px;
        }

        #c1,
        #c2 {
          float: left;
          padding: 10px;
        }

        #c3 {
          float: right;
          border: 1px solid black;
          border-radius: 50%;
          padding: 5px;
        }
        ​ img {
          display: inline-block;
          margin-left: auto;
          margin-right: auto;
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

  let events = await getData(
    `${host}/api/v1/event/official?from=${Date.parse(startdate) / 1000}&to=${
      Date.parse(enddate) / 1000
    }`
  );

  let weather = await getData(
    `${host}/api/v1/weather/current?language=${query.language}`
  );

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
