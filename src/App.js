import { Switch, Route } from 'react-router-dom';
import './App.css';
import UserNamePage from './components/UserNamePage';
import GameBoardPage from './components/GameBoardPage';

function App() {
  return (
    <Switch>
      <Route path="/" exact component={UserNamePage} />
      <Route path="/game" exact component={GameBoardPage} />
    </Switch>
  );
}

export default App;
