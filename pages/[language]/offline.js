
const Offline = () => (
   <div className="wrapper">
       <img alt="logo" src="../images/logo.png"></img>
       <p>You are offline right now.</p>

      <style jsx>{`
        .wrapper {
            display: flex;
            flex-flow: column;
            align-items center;
            justify-content: center;
            width 100vw;
            // height: 100vh;
            background-color: #003B8B;
            height: 100vh;
        }
        img {
            width: 30rem;
            height: 30rem;
        }

        p {
            font-size: 3rem;
            color white;
            padding: 1rem 3rem;
            text-align: center;
            font-weight: 700;
        }

      `}</style>
    </div>
);

Offline.getInitialProps = async ({ query }) => {
  return {
    language: query.language,
  };
};



export default Offline;
