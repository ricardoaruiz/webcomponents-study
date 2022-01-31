import { Link } from 'react-router-dom'

const Home = () => {
  return (
      <>
        <h1>Using WebComponents in a React Project</h1>
        <ul>
            <li>
                <Link to="/directly">Using WebComponents directly</Link>
            </li>
            <li>
                <Link to="/byWrapper">Using WebComponents by React Wrapper</Link>
            </li>
        </ul>      
      </>
  );
};

export default Home;
