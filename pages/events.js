import Head from "next/head";
import dynamic from "next/dynamic";

import SearchBar from "./components/search_bar";
import Layout from "../components/Layout";
import HomeEvent from "../components/HomeEvent";
import HomeGeoLocation from "../components/HomeGeoLocation";
import EventCard from "../components/EventCard";
import EventWrapper from "../components/EventWrapper";

const Index = (props) => (
  <Layout>
    <div>
      <header>
        <h1>events</h1>
      </header>
      <EventWrapper/>
    </div>
  </Layout>
);

export default Index;
