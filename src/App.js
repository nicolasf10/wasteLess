import './App.css';
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home';
import ShopList from './pages/ShopList';
import Resources from './pages/Resources';
import Communities from './pages/Communities';
import CommunitiesPosts from './pages/CommunitiesPosts';
import CovidGuidelines from './pages/CovidGuidelines';
import PageNotFound from './pages/PageNotFound';
import {HashRouter, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <HashRouter basename='/'>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" component={Home}/>
          <Route path="/resources" exact component={Resources}/>
          <Route path="/enterprise-waste" exact component={Home}/>
          <Route path='/covid-guidelines' exact component={CovidGuidelines}/>
          <Route path="/communities" exact component={Communities}/>
          <Route path="/communities-posts/:community_id" exact component={CommunitiesPosts}/>
          <Route path="/shop-list" exact component={ShopList}/>
          <Route component={Home} />
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
