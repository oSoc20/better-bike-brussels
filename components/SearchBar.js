import React, {Component, Fragment} from "react"

class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.buttonColor = {
            default: "#E2E2E2",
            clicked: "#00BFFF"
        }
        this.state = {
            bikeBump: true,
            waterFountain: true,
            parking: true,
            repair: true,
            villo: true
         }
    };

    showBikeBumps() {
        this.setState({bikeBump: !this.state.bikeBump})
        this.props.showBikeBumps(this.state.bikeBump);
    }

    showWaterFountains() {
        this.setState({waterFountain: !this.state.waterFountain});
        this.props.showWaterFountains(this.state.waterFountain);
    }

    showParkings() {
        this.setState({parking: !this.state.parking})
        this.props.showParkings(this.state.parking);
    }

    showRepairs() {
        this.setState({repair: !this.state.repair})
        this.props.showRepairs(this.state.repair);
    }

    showVillos() {
        this.setState({villo: !this.state.villo})
        this.props.showVillos(this.state.villo);
    }

    render() {
        let btn_bike_bump = this.state.bikeBump ? "" : "buttonClicked";
        let btn_water_fountain = this.state.waterFountain ? "" : "buttonClicked";
        let btn_parking = this.state.parking ? "" : "buttonClicked";
        let btn_repair = this.state.repair ? "" : "buttonClicked";
        let btn_villo = this.state.villo ? "" : "buttonClicked";
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
                        <img src="/compressed_air.svg" /> <span>bike bump</span>
                    </button>
                    <button className={btn_water_fountain} onClick={this.showWaterFountains.bind(this)}>
                        <img src="/drinking_water.svg" /> <span>water fountain</span>
                    </button>
                    <button className={btn_parking} onClick={this.showParkings.bind(this)}>
                        <img src="/bicycle_parking.svg" /> <span>parking</span>
                    </button>
                    <button className={btn_repair} onClick={this.showRepairs.bind(this)}>
                        <img src="/bicycle_repair_station.svg" /> <span>repair</span>
                    </button>
                    <button className={btn_villo} onClick={this.showVillos.bind(this)}>
                        <img src="/villo_station.svg" /> <span>villo</span>
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