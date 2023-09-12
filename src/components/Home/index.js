import './index.css'

import {withRouter, Link} from 'react-router-dom'
import Header from '../Header'

const Home = () => (
  <>
    <Header />
    <div className="home-container">
      <div className="description-container">
        <h1 className="home-heading">Find the Job that Fits Your Life</h1>
        <p className="home-description">
          Millions of people are searching for jobs, salary information ,
          company reviews. Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs">
          <button type="button" className="find-jobs-btn">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </>
)
export default withRouter(Home)
