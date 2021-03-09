import './App.css';
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home';
import ShopList from './pages/ShopList'
import Resources from './pages/Resources';
import Recipes from './pages/Recipes';
import PageNotFound from './pages/PageNotFound';
import Profile from './components/Profile'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        {/* <Profile /> */}
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/resources" exact component={Resources}/>
          <Route path="/enterprise-waste" exact component={Home}/>
          <Route path="/communities" exact component={Home}/>
          <Route path="/shop-list" exact component={ShopList}/>
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
