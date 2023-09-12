import './index.css'

import {Component} from 'react'

import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    showErrorMsg: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderUsernameInput = () => {
    const {username} = this.state

    return (
      <div className="input-container">
        <label htmlFor="username" className="label">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="input"
          placeholder="Username"
          onChange={this.onChangeUsername}
          value={username}
        />
      </div>
    )
  }

  renderPasswordInput = () => {
    const {password} = this.state

    return (
      <div className="input-container">
        <label htmlFor="password" className="label">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="input"
          placeholder="Password"
          onChange={this.onChangePassword}
          value={password}
        />
      </div>
    )
  }

  onSubmitSucces = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  submitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state

    const apiUrl = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const jwtToken = data.jwt_token
      this.onSubmitSucces(jwtToken)
    } else {
      this.setState({errorMsg: data.error_msg, showErrorMsg: true})
    }
  }

  render() {
    const {errorMsg, showErrorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <form className="form" onSubmit={this.submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo-img"
          />
          {this.renderUsernameInput()}
          {this.renderPasswordInput()}
          <button type="submit" className="login-btn">
            Login
          </button>
          {showErrorMsg && <p className="error-msg">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
