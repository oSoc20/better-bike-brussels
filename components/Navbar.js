import Link from "next/link";

class Navbar extends React.Component{
  render(){
    var language = this.props.language;
    return(
      <div>
    <ul>
      <li key={"home"}>
        <Link href="/[language]/" as={`/${language}/`}>
          <a><img src="/home.svg" alt="home"/></a>
        </Link>
      </li>
      <li key={"map"}>
        <Link href="/[language]/map" as={`/${language}/map`}>
          <a><img src="/map.svg" alt="map"/></a>
        </Link>
      </li>
      <li key={"events"}>
        <Link href="/[language]/events" as={`/${language}/events`}>
          <a><img src="/events.svg" alt="events"/></a>
        </Link>
      </li>
    </ul>
    <style jsx>{`
      ul {
        background-color: #003B8B;
        position:fixed;
        bottom:0;
        z-index:9999 !important;
        display:flex;
        justify-content:space-around;
        width:100%;
      }

      li {
        display:flex;
        align-items:center;
        padding:5px 10px;
      }
    `}</style>
  </div>
    )
  }
}


export default Navbar;