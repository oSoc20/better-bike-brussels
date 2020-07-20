import Link from "next/link";
import LanguageStorage from "../../components/LanguageStorage";

const Settings = (props) => (
    <div>
    <LanguageStorage language={props.language}/>
    <Link href="/[language]/" as={`/${props.language}/`}>
        <img className="backbutton" src="/icons/back.svg" />
      </Link>
    <Link href="/fr/settings">
        <a>Français</a>
    </Link>
    <Link href="/nl/settings">
        <a>Nederlands</a>
    </Link>
    <Link href="/en/settings">
        <a>English</a>
    </Link>
    <style jsx>{`
        img.backbutton {
          width: 40px;
          height: 40px;
          position: fixed;
          top: 16px;
          left: 16px;

          border: #003b8b 3px solid;
          border-radius: 50%;
        }
      `}</style>
    </div>
)

Settings.getInitialProps = async ({query}) => {
    return {
        language: query.language,
    }
}

export default Settings;