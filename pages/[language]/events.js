import Head from "next/head";
import dynamic from "next/dynamic";

import Layout from "../../components/Layout";
import HomeEvent from "../../components/HomeEvent";
import HomeGeoLocation from "../../components/HomeGeoLocation";
import EventCard from "../../components/EventCard";
import EventWrapper from "../../components/EventWrapper";
import LanguageStorage from "../../components/LanguageStorage";

const Index = (props) => (
  <Layout language={props.language}>
    <LanguageStorage language={props.language}/>
    <Head>
      <title>Events</title>

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

    <div>
      <header className="title__wrapper">
        {props.language == "nl" ? <h1 className="events__title">evenementen</h1> : null}
        {props.language == "en" ? <h1 className="events__title">events</h1> : null}
        {props.language == "fr" ? <h1 className="events__title">évènement</h1> : null}
      </header>

      <EventWrapper language={props.language}/>

      <script type="text/javascript" src="/js/script.js"/>

      <style jsx>{`
        .events__title {
          font-size: 3rem;
          font-weight: 700;
        }

        .title__wrapper {
          display:flex;
          height: 13rem;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  </Layout>
);

Index.getInitialProps = async ({ query }) => {
  return {
    language: query.language,
  };
};



export default Index;
