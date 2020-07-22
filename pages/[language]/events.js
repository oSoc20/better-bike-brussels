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
    <div>
      <header className="title__wrapper">
        {props.language == "nl" ? <h1 className="events__title">evenementen</h1> : null}
        {props.language == "en" ? <h1 className="events__title">events</h1> : null}
        {props.language == "fr" ? <h1 className="events__title">TODO</h1> : null}
      </header>

      <EventWrapper language={props.language}/>

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
