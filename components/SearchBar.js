import React, {Component, Fragment} from "react"

class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.buttonColor = {
            default: "#E2E2E2",
            clicked: "#00BFFF"
        }
        this.state = {
            bike_pump: true,
            water_fountain: true,
            parking: true,
            repair: true,
            villo: true,
            shop: true
         }
    }

    static async getInitialProps({ query }) {
        return {
          language: query.language
        };
    }

    showBikeBumps() {
        this.setState({bike_pump: !this.state.bike_pump})
        this.props.showPOICategory("air-pump", this.state.bike_pump);
    }

    showWaterFountains() {
        this.setState({water_fountain: !this.state.water_fountain});
        this.props.showPOICategory("drinking-water", this.state.water_fountain);
    }

    showParkings() {
        this.setState({parking: !this.state.parking})
        this.props.showPOICategory("bicycle-parking", this.state.parking);
    }

    showRepairs() {
        this.setState({repair: !this.state.repair})
        this.props.showPOICategory("bicycle-repair-station", this.state.repair);
    }

    showVillos() {
        this.setState({villo: !this.state.villo})
        this.props.showPOICategory("villo-stations", this.state.villo);
    }

    showShops() {
        this.setState({shop: !this.state.shop})
        this.props.showPOICategory("bicycle-shop", this.state.shop);
    }

    render() {
        let btn_bike_bump = this.state.bike_pump ? "" : "buttonClicked";
        let btn_water_fountain = this.state.water_fountain ? "" : "buttonClicked";
        let btn_parking = this.state.parking ? "" : "buttonClicked";
        let btn_repair = this.state.repair ? "" : "buttonClicked";
        let btn_villo = this.state.villo ? "" : "buttonClicked";
        let btn_shop = this.state.shop ? "" : "buttonClicked";
        let language = this.props.language;
        return (
            <div id="flex-container">
                {/* <form>
                    <div>
                        <input type="text" id="search-input" placeholder="What are you looking for?"/>
                        <button type="submit" id="search-button">search</button>
                    </div>
                </form> */}
                <div className="box">
                    <button className={btn_bike_bump} onClick={this.showBikeBumps.bind(this)}>
                        <img src="/compressed_air.svg" />&nbsp;
                        {language == "fr" ? <span>pompe à vélo</span> : ""}
                        {language == "nl" ? <span>fietspomp</span> : ""}
                        {language == "en" ? <span>bike pump</span> : ""}
                    </button>
                    <button className={btn_water_fountain} onClick={this.showWaterFountains.bind(this)}>
                        <img src="/drinking_water.svg" />&nbsp;
                        {language == "fr" ? <span>fontaine à eau</span> : ""}
                        {language == "nl" ? <span>waterfontein</span> : ""}
                        {language == "en" ? <span>water fountain</span> : ""}
                    </button>
                    <button className={btn_parking} onClick={this.showParkings.bind(this)}>
                        <img src="/bicycle_parking.svg" />&nbsp;
                        {language == "nl" ? <span>parkeren</span> : ""}
                        {language != "nl" ? <span>parking</span> : ""}
                    </button>
                    <button className={btn_repair} onClick={this.showRepairs.bind(this)}>
                        <img src="/bicycle_repair_station.svg" />&nbsp;
                        {language == "fr" ? <span>réparation</span> : ""}
                        {language == "nl" ? <span>reparatie</span> : ""}
                        {language == "en" ? <span>repair</span> : ""}
                    </button>
                    <button className={btn_villo} onClick={this.showVillos.bind(this)}>
                        <img src="/villo_station.svg" />&nbsp;
                        <span>villo</span>
                    </button>
                    <button className={btn_shop} onClick={this.showShops.bind(this)}>
                        <img src="/bicycle_shop.svg" />&nbsp;
                        {language == "fr" ? <span>magasin</span> : ""}
                        {language == "nl" ? <span>winkel</span> : ""}
                        {language == "en" ? <span>shop</span> : ""}
                    </button>
                </div>
                <style jsx>{`

                    .box:first-child {
                        margin-left: 1rem;
                    }

                    .box {
                        display: flex;
                        overflow: auto;
                        white-space: nowrap;
                    }
                    
                    .box button, .box div {
                        display: inline-block;
                        padding: 5px;
                        margin: 3px;
                    }

                    .box div {
                        background-color: transparent;
                    }

                    .box img {
                        width: 10px;
                        height: 15px;
                    }

                    form div {
                        margin: 10px;
                        text-align: center;
                        font-size: 14px;
                        align: center;
                        -ms-flex: 1;  /* IE 10 */  
                        flex: 1;
                    }

                    #search-input {
                        padding: 0, 10%;
                        border-radius: 25px;
                        width: auto;
                        height:100%;
                        background-color: #E9E9E9;
                        text-align: center;
                        color: black;
                        display: inline-block;
                        margin-right: 5px;
                    }

                    #search-button {
                        color: white;
                        background-color: #A5A5A5;
                    }

                    img {
                        fill: white;
                    }

                    button {
                        border-radius: 3rem;
                        border: .5rem rgb(246,246,246) solid;
                        margin: .5rem;
                        padding: 1rem;
                        display: flex;
                        justify-content: center;
                        background-color: rgb(246,246,246);
                        font-size: 1.4rem;
                    }

                    // button span {
                    //     font-size: 1.4rem;

                    // }

                    .buttonClicked {
                        // background-color: #9C9B9A;
                        border: .5rem #9C9B9A solid;
                        // color: white;
                        
                    }

                    .buttonClicked > span::after {
                        content: "✕";
                        margin: 0 1rem;
                    }
                `}
                </style>
            </div>
            )
        }
    }
    export default HeaderComponent