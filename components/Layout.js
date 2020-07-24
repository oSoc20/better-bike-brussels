import Navbar from './Navbar'
import Head from "next/head";
import Link from 'next/link';


const Layout = (props) => (
    <div lang={props.language}>

        <Navbar language={props.language}/>
        {props.children}
    </div>
)

export default Layout;