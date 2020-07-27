import Link from "next/link";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let endpointarray = this.props.endpoint.map((x) => {
      return {
        endpoint: x,
        name: x.replace(/-/g, " "),
      };
    });
    let language = this.props.language;
    return (
      <div className="box">
        {endpointarray.map((x) => {
          return (
            <Link href={`/${language}/map?poi=${x.endpoint}`}>
              <button className={"btn-" + x.endpoint}>
                <img src={"/icons/map/" + x.endpoint + ".svg"} alt={x.name}/> <span>{x.name}</span>
              </button>
            </Link>
          );
        })}

        <style jsx>
          {`
            .box:first-child {
              margin-left: 1rem;
            }

            .box {
              display: flex;
              overflow: auto;
              white-space: nowrap;
            }

            .box button,
            .box div {
              display: inline-block;
              padding: 5px;
              margin: 3px;
            }

            .box div {
              background-color: transparent;
            }

            .box img {
              width: 15px;
              height: 15px;
            }

            form div {
              margin: 10px;
              text-align: center;
              font-size: 14px;
              align: center;
              -ms-flex: 1; /* IE 10 */
              flex: 1;
            }

            #search-input {
              padding: 0, 10%;
              border-radius: 25px;
              width: auto;
              height: 100%;
              background-color: #e9e9e9;
              text-align: center;
              color: black;
              display: inline-block;
              margin-right: 5px;
            }

            #search-button {
              color: white;
              background-color: #a5a5a5;
            }

            img {
              fill: white;
            }

            button {
              border-radius: 3rem;
              border: 0.5rem rgb(246, 246, 246) solid;
              margin: 0.5rem;
              padding: 1rem;
              display: flex;
              justify-content: center;
              background-color: rgb(246, 246, 246);
              font-size: 1.4rem;
            }
            .buttonClicked {
              // background-color: #9C9B9A;
              border: 0.5rem #9c9b9a solid;
              // color: white;
            }

            .buttonClicked > span::after {
              content: "✕";
              margin: 0 1rem;
            }
          `}
        </style>
      </div>
    );
  }
}

export default SearchBar;
