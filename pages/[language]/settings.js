import Link from "next/link";
import LanguageStorage from "../../components/LanguageStorage";

const Settings = (props) => (
  <div>
    <LanguageStorage language={props.language} />
    <header className="header">
      <Link href="/[language]/" as={`/${props.language}/`}>
        <img className="backbutton" src="/icons/back.svg" />
      </Link>
      {props.language == "nl" ? <h1 className="title">instellingen en hulpmiddelen</h1> : null}
      {props.language == "en" ? <h1 className="title">settings and resources</h1> : null}
      {props.language == "fr" ? <h1 className="title">TODO</h1> : null}
    </header>
    <section>
      {props.language == "nl" ? <h2 className="sub">instellingen</h2> : null}
      {props.language == "en" ? <h2 className="sub">settings</h2> : null}
      {props.language == "fr" ? <h2 className="sub">TODO</h2> : null}

      <div className="wrapper">
        <Link href="/fr/settings">
          <a className={props.language == "fr" ? "checked" : "lang"}>FR</a>
        </Link>
        <Link href="/nl/settings">
          <a className={props.language == "nl" ? "checked" : "lang"}>NL</a>
        </Link>
        <Link href="/en/settings">
          <a className={props.language == "en" ? "checked" : "lang"}>ENG</a>
        </Link>
      </div>
    </section>
    <section>
        {props.language == "nl" ? <h2 className="sub">verkeersregelgeving</h2> : null}
        {props.language == "en" ? <h2 className="sub">road code learnings</h2> : null}
        {props.language == "fr" ? <h2 className="sub">TODO</h2> : null}
      <div className="link__wrapper">
          <a  href="https://www.gracq.org/le-code-de-la-route" className="roadcode">https://www.gracq.org/le-code-de-la-route </a>
          <a href="https://www.provelo.org/" className="roadcode">https://www.provelo.org/ </a>
          <a href="VIAS.be " className="roadcode">VIAS.be </a>
          <a href="https://www.code-de-la-route.be/" className="roadcode">https://www.code-de-la-route.be/ </a>
          <a href="https://mobilite-mobiliteit.brussels/fr" className="roadcode">https://mobilite-mobiliteit.brussels/fr </a>
      <div>
        <a
          href="https://www.gracq.org/le-code-de-la-route"
          className="rodecode"
          target="_blank"
        >
          https://www.gracq.org/le-code-de-la-route{" "}
        </a>
        <br/>
        <a href="https://www.provelo.org/" className="rodecode" target="_blank">
          https://www.provelo.org/{" "}
        </a>
        <br/>
        <a href="VIAS.be " className="rodecode">
          VIAS.be{" "}
        </a>
        <br/>
        <a href="https://www.code-de-la-route.be/" className="rodecode" target="_blank">
          https://www.code-de-la-route.be/{" "}
        </a>
        <br/>
        <a href="https://mobilite-mobiliteit.brussels/fr" className="rodecode" target="_blank">
          https://mobilite-mobiliteit.brussels/fr{" "}
        </a>
      </div>
    </section>
    <section>
    <h2 className="sub">Emrgency numbers</h2>
    <div className="wrapper">
      <div className="number__wrapper">
        <p className="number__title">general</p>
        <p className="number">112</p>
      </div>
      <div className="number__wrapper">
        <p className="number__title">police</p>
        <p className="number">101</p>
      </div>
    </div>
    </section>
    <section>
    <h2 className="sub">Related apps</h2>
    </section>
    <style jsx>{`
      .wrapper {
        display: flex;
      }

        .number {
          font-size: 4rem;
          font-weight: 700;
        }

        .number__wrapper {
          display: flex;
          flex-flow: column;
          align-items: center;
        }

        .number__title {
          font-size: 1.6rem;
        }

        .number::before {
          content:"☎"
        }
        img.backbutton {
          width: 40px;
          height: 40px;
        //   position: fixed;
          margin-top: 16px;
          margin-left: 16px;
          margin-bottom: 2rem;

        //   border: #003b8b 3px solid;
          border-radius: 50%;
          align-self: start;
        }

        .sub {
            font-size:1.7rem;
            font-weight: 700;
            align-self: center;
            margin: 3rem 0 1rem 0;
            text-align: center;
          }

        .header {
            padding-bottom: 2rem;

        }

        .lang{
            font-size: 3rem;
            text-decoration: none;
            color: white;
            background-color: #003B8B;
            border-radius: 10px;
            padding: 2rem
        }

        .title {
            color: white;
            font-size: 3rem;
            padding: 0 2rem;
            font-weight: 700;
        }

        .wrapper {
            display: flex;
            width 100vw;
            justify-content: space-evenly;
            margin-top: 2rem;
            
        }

        .checked {
          font-size: 3rem;
          text-decoration: none;
          color: black;
          background-color: #F6F6F6;
          border-radius: 10px;
          padding: 2rem
        }

        .roadcode {
          font-size: 1.6rem;
          color: #003B8B;
          margin: 1rem 3rem;
        }

        .link__wrapper {
          display: flex;
          flex-flow: column;
        }
      `}</style>
  </div>
);

Settings.getInitialProps = async ({ query }) => {
  return {
    language: query.language,
  };
};

export default Settings;
