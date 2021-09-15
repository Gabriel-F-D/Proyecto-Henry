import './App.css';
// import LosDoggos from './components/LosDoggos/LosDoggos'
import {Switch, Route} from 'react-router-dom'
import HomePage from './components/HomePage/HomePage'
import LandingPage from './components/LandingPage/LandingPage';
import Doggo from './components/Doggo/Doggo'
import AddDoggo from './components/AddDoggo/AddDoggo';

function App() {
  return (
    <>
      <Switch>
        <Route path="/doggoDetail/:id" component={Doggo} />
        <Route path="/createDoggo" component={AddDoggo} />
        <Route path="/home" component={HomePage} />
        <Route path="/" component={LandingPage} />
      </Switch>
    </>
  );
}

export default App;
