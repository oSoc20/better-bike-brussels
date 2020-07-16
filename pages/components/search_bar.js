import React, {Component, Fragment} from "react"

class HeaderComponent extends Component {
    render() {
        return (
            <div id="flex-container">
                <form>
                    <div>
                        <input type="text" id="search-input" placeholder="What are you looking for?"/>
                        <button type="submit" id="search-button">search</button>
                    </div>
                </form>
                <div className="box">
                    <div id="position">
                        <img src="/place.svg" />&nbsp;
                        <strong>Mellory Street</strong>
                    </div>
                    <button>
                        <img src="/favicon.ico" />
                        Element 1
                    </button>
                    <button>
                        <img src="/favicon.ico" />
                        Element 2
                    </button>
                    <button>
                        <img src="/favicon.ico" />
                        Element 3
                    </button>
                    <button>
                        <img src="/favicon.ico" />
                        Element 4
                    </button>
                    <button>
                        <img src="/favicon.ico" />
                        Element 5
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
                        background-color: #E2E2E2;
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
                `}
                </style>
            </div>
            )
        }
    }
    export default HeaderComponent