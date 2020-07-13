import Head from 'next/head'
import dynamic from 'next/dynamic'

const Map = dynamic(() => import('./components/map'))

export default function Home() {
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
      
      <main>
        <Map></Map>
      </main>

      <footer></footer>
    </div>    
  )
}
