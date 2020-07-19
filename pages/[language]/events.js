import Head from "next/head";
import dynamic from "next/dynamic";

import SearchBar from "../components/search_bar";
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
      <header>
        {props.language == "nl" ? <h1>evenementen</h1> : null}
        {props.language == "en" ? <h1>events</h1> : null}
        {props.language == "fr" ? <h1>TODO</h1> : null}
      </header>

      <EventWrapper language={props.language}/>
    </div>
  </Layout>
);

Index.getInitialProps = async ({ query }) => {
  return {
    language: query.language,
  };
};

export default Index;
