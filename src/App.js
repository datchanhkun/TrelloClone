import React from 'react'
import './App.scss'
import AppBar from 'components/AppBar/AppBar'
import BoardBar from 'components/BoardBar/BoardBar'
import BoardContent from 'components/BoardContent/BoardContent'
import Auth from 'components/Auth/Auth'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div className="trello-container">
            <AppBar/>
            <BoardBar/>
            <BoardContent/>
          </div>
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
      </Switch>
    </Router>
  )
}

export default App

