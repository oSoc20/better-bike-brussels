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
      <div>
    <Link href="/fr/">
        <a>Français</a>
    </Link>
    <Link href="/nl/">
        <a>Nederlands</a>
    </Link>
    <Link href="/en/">
        <a>English</a>
    </Link>
      </div>
    );
  }
}

export default Index;
