import Link from "next/link";
import LanguageStorage from "../../components/LanguageStorage";

const Settings = (props) => (
  <div>
    <LanguageStorage language={props.language} />
    <header className="header">
      <Link href="/[language]/" as={`/${props.language}/`}>
        <img className="backbutton" src="/icons/back.svg" />
      </Link>
      <h1 className="title">settings and resources</h1>
    </header>
    <section>
      <h2 className="sub">settings</h2>
      <div className="wrapper">
        <Link className="link" href="/fr/settings">
          <a className="lang">Fr</a>
        </Link>
        <Link className="link" href="/nl/settings">
          <a className="lang">Nl</a>
        </Link>
        <Link className="link" href="/en/settings">
          <a className="lang">Eng</a>
        </Link>
      </div>
    </section>
    <section>
      <h2 className="sub">road code learnings</h2>
      <div>
          <a  href="https://www.gracq.org/le-code-de-la-route" className="rodecode">https://www.gracq.org/le-code-de-la-route </a>
          <a href="https://www.provelo.org/" className="rodecode">https://www.provelo.org/ </a>
          <a href="VIAS.be " className="rodecode">VIAS.be </a>
          <a href="https://www.code-de-la-route.be/" className="rodecode">https://www.code-de-la-route.be/ </a>
          <a href="https://mobilite-mobiliteit.brussels/fr" className="rodecode">https://mobilite-mobiliteit.brussels/fr </a>
      </div>
    </section>
    <style jsx>{`
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

        .link {
           
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
