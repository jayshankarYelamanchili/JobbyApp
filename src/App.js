import './App.css'

import {Switch, Route, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Jobs from './components/Jobs'
import ProtectRoutes from './components/ProtectedRoute'
import JobDetails from './components/jobDetails'
import NotFound from './components/NotFound'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectRoutes exact path="/" component={Home} />
    <ProtectRoutes exact path="/jobs" component={Jobs} />
    <ProtectRoutes exact path="/jobs/:id" component={JobDetails} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
