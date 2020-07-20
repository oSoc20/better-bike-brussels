import React, {Component, Fragment} from "react"

class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.buttonColor = {
            default: "#E2E2E2",
            clicked: "#00BFFF"
        }
        this.state = {
            defaultColor: true,
            bikeBumpColor: true,
            waterFountainColor: true,
            parkingColor: true,
            repairColor: true,
            villoColor: true
         }
    };

    changeColor(){
        this.setState({defaultColor: !this.state.defaultColor})
    }


    showBikeBumps() {
        //this.changeColor();
        this.setState({bikeBumpColor: !this.state.bikeBumpColor})
        this.props.showBikeBumps();
    }

    showWaterFountains = () => {
        //this.changeColor();
        this.setState({waterFountainColor: !this.state.waterFountainColor})
        this.props.showWaterFountains();
    }

    showParkings = () => {
        //this.changeColor();
        this.setState({parkingColor: !this.state.parkingColor})
        this.props.showParkings();
    }

    showRepairs = () => {
        //this.changeColor();
        this.setState({repairColor: !this.state.repairColor})
        this.props.showRepairs();
    }

    showVillos = () => {
        //this.changeColor();
        this.setState({villoColor: !this.state.villoColor})
        this.props.showVillos();
    }

    render() {
        let btn_bike_bump = this.state.bikeBumpColor ? "" : "buttonClicked";
        let btn_water_fountain = this.state.waterFountainColor ? "" : "buttonClicked";
        let btn_parking = this.state.parkingColor ? "" : "buttonClicked";
        let btn_repair = this.state.repairColor ? "" : "buttonClicked";
        let btn_villo = this.state.villoColor ? "" : "buttonClicked";
        return (
            <div id="flex-container">
                <form>
                    <div>
                        <input type="text" id="search-input" placeholder="What are you looking for?"/>
                        <button type="submit" id="search-button">search</button>
                    </div>
                </form>
                <div className="box">
                    <button className={btn_bike_bump} onClick={this.showBikeBumps.bind(this)}>
                        <img src="/compressed_air.svg" /> bike bump
                    </button>
                    <button className={btn_water_fountain} onClick={this.showWaterFountains.bind(this)}>
                        <img src="/drinking_water.svg" /> water fountain
                    </button>
                    <button className={btn_parking} onClick={this.showParkings.bind(this)}>
                        <img src="/bicycle_parking.svg" /> parking
                    </button>
                    <button className={btn_repair} onClick={this.showRepairs.bind(this)}>
                        <img src="/bicycle_repair_station.svg" /> repair
                    </button>
                    <button className={btn_villo} onClick={this.showVillos.bind(this)}>
                        <img src="/villo_station.svg" /> villo
                    </button>
                </div>
                <style jsx>{`
                    #flex-container {
                        background-color: #C4C4C4;
                        height: 10vh;
                    }

                    form {
                        width: 100%;
                        display: flex;
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

                    button {
                        border-radius: 15px;
                    }

                    .buttonClicked {
                        background-color: #00BFFF;
                        color: yellow;
                    }
                `}
                </style>
            </div>
            )
        }
    }
    export default HeaderComponent