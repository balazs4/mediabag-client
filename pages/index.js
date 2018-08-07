import fetch from 'isomorphic-unfetch';

const Home = ({ streams }) => {
  return (
    <div>
      {streams.map(s => (
        <a
          href={s.url.replace(
            'http://piserver:8080/mediabag/proxy/mediaklikk/',
            'https://mediaklikk.now.sh/'
          )}
          target="_new"
        >
          <div key={s.id}>
            <h1>{s.name}</h1>
            <img src={s.icon} alt={s.id} style={{ height: '106px' }} />
          </div>
        </a>
      ))}
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
