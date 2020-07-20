import Link from "next/link";

const Navbar = () => (
  <div>
    <ul>
      <li>
        <Link href="/">
          <a><img src="/home.svg" /></a>
        </Link>
      </li>
      <li>
        <Link href="/map">
          <a><img src="/map.svg" /></a>
        </Link>
      </li>
      <li>
        <Link href="/event">
          <a><img src="/events.svg" /></a>
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
);

export default Navbar;