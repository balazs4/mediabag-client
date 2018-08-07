import fetch from 'isomorphic-unfetch';

const Home = ({ streams }) => {
  return (
    <div className="container">
      {streams.map(s => (
        <div key={s.id} className="stream">
          <a
            href={s.url.replace(
              'http://piserver:8080/mediabag/proxy/mediaklikk/',
              'https://mediaklikk.now.sh/'
            )}
            target="_new"
          >
            <div>
              <img src={s.icon} alt={s.id} style={{ height: '96px' }} />
              <h4>{s.name}</h4>
            </div>
          </a>
        </div>
      ))}
      <style jsx>{`
        .container {
          width: 1000px;
          margin: auto;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: space-around;
        }
        .stream {
          background: white;
          width: 192px;
          text-align: center;
          padding: 32px;
          border: 0.4px solid gray;
          margin: 16px;
        }

        a {
          color: gray;
        }
        img {
          background: lightgray;
        }
      `}</style>
    </div>
  );
};

Home.getInitialProps = async () => {
  const { MEDIABAG = 'http://192.168.2.14:8080/mediabag/' } = process.env;
  const response = await fetch(MEDIABAG);
  const streams = await response.json();
  return { streams };
};

export default Home;
