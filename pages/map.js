import Head from 'next/head'
import dynamic from 'next/dynamic'

import SearchBar from './components/search_bar'
import Footer from './components/footer'

const Map = dynamic(
  () => import('./components/map_component'),
  { ssr: false }
)

export default function() {
  return (
    <div className="container">
      <Head>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css"
          integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
          crossOrigin=""/> 

        <script src="https://unpkg.com/leaflet@1.4.0/dist/leaflet.js"
          integrity="sha512-QVftwZFqvtRNi0ZyCtsznlKSWOStnDORoefr1enyq5mVL4tmKB3S/EnC3rRJcxCPavG10IcrVGSmPh6Qw5lwrg=="
          crossOrigin=""></script>
      </Head>

      <SearchBar></SearchBar>
      
      <main>
        <Map></Map>
      </main>

      <Footer id="footer"/>
      <style jsx>{`
        #main {
            width: 100%;
            display: flex;
            align: center;
          }
        Footer {
          height: 20vh;
        }
        
        `}</style>
    </div>    
  )
}
