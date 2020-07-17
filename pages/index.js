import Head from "next/head";
import dynamic from "next/dynamic";

import SearchBar from "./components/search_bar";
import Layout from "../components/Layout";
import HomeEvent from "../components/HomeEvent";
import HomeGeoLocation from "../components/HomeGeoLocation";

const Map = dynamic(() => import("./components/map_component"), { ssr: false });

const Index = (props) => (
  <Layout>
    <div className="container">
      <div id="header">
        <div id="wrapper">
          <div id="c1">busy</div>
          <div id="c2">bring a light coat</div>
          <div id="c3">i</div>
        </div>
        ​
        <div id="position">
          You are at
          <p id="place">
            <img src="/place.svg" /> <strong>Mellery Street</strong>
          </p>
        </div>
        <SearchBar />
      </div>

      <div className="box">
        <div className="interest">
          <div className="interest-name">Pitstops</div>
          <div>
            <div>
              <span>bike pumps</span>
            </div>
            <ul>
              <li>Street_name</li>
              <li>Street_name</li>
            </ul>
          </div>
          <div>
            <div>
              <span>repair shops</span>
            </div>
            <ul>
              <li>Street_name</li>
              <li>Street_name</li>
            </ul>
          </div>
        </div>
        <div className="interest">
          <div className="interest-name">Parking spaces</div>
          <ul>
            <li>Street_name</li>
            <li>Street_name</li>
            <li>Street_name</li>
          </ul>
        </div>
        <div className="interest">
          <div className="interest-name">Water taps</div>
          <ul>
            <li>Street_name</li>
            <li>Street_name</li>
          </ul>
        </div>
        <div className="interest">
          <div className="interest-name">Road obstructions</div>
          <ul>
            <li>Street_name</li>
            <li>Street_name</li>
          </ul>
        </div>
      </div>
      <HomeGeoLocation/>

      <HomeEvent events={props.data}/>


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
          height: 30px;
        }
      `}</style>
    </div>
  </Layout>
);

Index.getInitialProps = async function () {
  let host = "http://localhost:8080";


  let startdate = new Date();
  let enddate =  new Date(startdate);

  
  enddate.setDate(enddate.getDate() + 1);//TODO THIS SHOWS EVENTS OF TOMORROW


  console.log(Date.parse(startdate)/1000,Date.parse(enddate)/1000);


  let events = (await getData(`${host}/api/v1/event/official?from=${Date.parse(startdate)/1000}&to=${Date.parse(enddate)/1000}`))



  //console.log(events);

  function getData(url) {
    return fetch(url)
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
  }

  return {
    data : events.events  }
}

export default Index;
