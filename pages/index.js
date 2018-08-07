import Head from 'next/head';
import fetch from 'isomorphic-unfetch';

const Home = ({ streams }) => {
  return (
    <div className="container">
      <Head>
        <title>mtv</title>
      </Head>
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
              <img src={s.icon} alt={s.id} />
              <h4>{s.name}</h4>
            </div>
          </a>
        </div>
      ))}
      <style jsx>{`
        .container {
          background: lightgray
          width: 890px;
          margin: auto;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: space-around;
        }
        .stream {
          background: black;
          width: 128px;
          text-align: center;
          padding: 16px;
          margin: 16px;
        }

        a {
          color: gray;
        }
        img {
          background: transparent;
          height: 106px;
        }
      `}</style>
    </div>
  );
};

Home.getInitialProps = async () => {
  const { MEDIABAG = 'http://192.168.2.14:8080/mediabag/' } = process.env;
  const response = await fetch(MEDIABAG);
  const streams = await response.json();
  return { streams: streams.filter(x => x.name !== 'm5') };
};

export default Home;
