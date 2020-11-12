
import {BrowserRouter as Router, Route, Switch}  from 'react-router-dom';
import Itemview from './Components/Itemview';

import {Login} from './Components/Login';
import {Registeration} from './Components/Registeration';
import {Navigation} from './Components/Navigation';
import ItemDetails from './Components/ItemDetails';






function App() {
  return (
    <Router>
    <div>
      <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/registeration" component={Registeration} />
      <Route path="/itemview" component={Itemview} />
      <Route path="/navigation" component={Navigation} />
      <Route path="/itemdetails" component={ItemDetails} />
      </Switch>
    </div>
    </Router>
  );
}

export default App;
