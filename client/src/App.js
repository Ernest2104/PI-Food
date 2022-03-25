import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage.jsx';
import Home from './components/Home.jsx';
import RecipeCreate from './components/RecipeCreate.jsx';
import RecipeDetail from './components/RecipeDetail.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={ LandingPage } />
          <Route exact path='/home' component={ Home } />
          <Route path='/recipes' component={ RecipeCreate } />
          <Route path='/home/:id' component={ RecipeDetail } />
        </Switch>
      </div>
      </BrowserRouter>
  );
}

export default App;
