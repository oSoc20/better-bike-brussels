import Link from 'next/link'
import Router from 'next/router';

class Index extends React.Component {

    componentDidMount(){
        const data = localStorage.getItem('_language')
        if(data){
            Router.push(`/${data}`)
        }
    }

  render() {
    return (
      <div className="wrapper">
    <Link href="/fr/">
    <a className="lang">Fr</a>
    </Link>
    <Link href="/nl/">
    <a className="lang">Nl</a>
    </Link>
    <Link href="/en/">
    <a className="lang">Eng</a>
    </Link>

    <style jsx>{`
        .lang{
            font-size: 3rem;
            text-decoration: none;
            color: white;
            background-color: #003B8B;
            border-radius: 10px;
            padding: 2rem
        }

        .wrapper {
          display: flex;
          width: 100vw;
          height: 100vh;
          justify-content: space-evenly;
          align-items: center
        }

        .checked {
          font-size: 3rem;
          text-decoration: none;
          color: black;
          background-color: #F6F6F6;
          border-radius: 10px;
          padding: 2rem
        }
      `}</style>
      </div>
    );
  }
}

export default Index;
