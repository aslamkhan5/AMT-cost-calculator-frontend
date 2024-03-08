import { useState } from 'react';
import './App.css';
import './Responsive.css';
import Footer from './components/Footer';
import MainTable from './components/MainTable';
import Home from './pages/Home';
import Loading from './components/Loading';
import { useSelector } from 'react-redux';


function App() {

  const [feed, setFeed] = useState(0)
  const loader = useSelector(state => state.headFeed.loader)
  return (
    <>
        {loader ? ( <Loading />) : ''}
        <Home />
        <br />
        <MainTable feed={feed} />
        <br />
        <Footer />
    </>

  );
}

export default App;
