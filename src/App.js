import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './Home';
import Navbar from './Components/Navbar';
import Upload from './Upload';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/upload">
            <Upload />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
