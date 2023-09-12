import './index.css'

import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import ProfileCard from '../ProfileCard'
import JobCard from '../jobCard'
import JobFilter from '../JobFilter'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobsList: [],
    selectedEmploymentType: [],
    selectedSalaryType: '',
    searchInput: '',
  }

  componentDidMount() {
    this.getJobsData()
  }

  getJobsData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {selectedSalaryType, selectedEmploymentType, searchInput} = this.state
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${selectedEmploymentType}&minimum_package=${selectedSalaryType}&search=${searchInput}`

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const modifiedData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        title: eachJob.title,
        rating: eachJob.rating,
      }))
      this.setState({
        jobsList: modifiedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderNoJobsFound = () => (
    <div className="no-jobs-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-img"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-description">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  renderJobsSuccessView = () => {
    const {jobsList} = this.state
    const emptyJobsList = jobsList.length === 0

    return (
      <>
        {emptyJobsList ? (
          this.renderNoJobsFound()
        ) : (
          <ul className="jobs-list-container">
            {jobsList.map(eachJob => (
              <JobCard jobDetails={eachJob} key={eachJob.id} />
            ))}
          </ul>
        )}
      </>
    )
  }

  onClickRetry = () => {
    this.getJobsData()
  }

  renderJobsFailureView = () => (
    <div className="jobs-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="retry-btn" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="jobs-loader" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobs = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsSuccessView()
      case apiStatusConstants.failure:
        return this.renderJobsFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  changeEmploymentType = (check, id) => {
    const {selectedEmploymentType} = this.state

    if (check) {
      this.setState(
        prevState => ({
          selectedEmploymentType: [...prevState.selectedEmploymentType, id],
        }),
        this.getJobsData,
      )
    } else {
      const filteredEmploymentType = selectedEmploymentType.filter(
        eachType => eachType !== id,
      )
      this.setState(
        {selectedEmploymentType: [...filteredEmploymentType]},
        this.getJobsData,
      )
    }
  }

  changeSalaryType = val => {
    this.setState({selectedSalaryType: val}, this.getJobsData)
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchBtn = () => {
    this.getJobsData()
  }

  renderSearchBar = () => {
    const {searchInput} = this.state

    return (
      <>
        <input
          type="search"
          className="search-input"
          placeholder="Search"
          value={searchInput}
          onChange={this.onChangeSearchInput}
        />
        <button
          type="button"
          data-testid="searchButton"
          className="search-btn"
          onClick={this.onClickSearchBtn}
        >
          <BsSearch className="search-icon" />
        </button>
      </>
    )
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="jobs-content-container">
            <div className="profile-and-sorting-container">
              <div className="mobile-search-bar">{this.renderSearchBar()}</div>
              <ProfileCard />
              <JobFilter
                changeEmploymentType={this.changeEmploymentType}
                changeSalaryType={this.changeSalaryType}
              />
            </div>
            <div className="search-bar-jobs-lists-container">
              <div className="desktop-search-bar">{this.renderSearchBar()}</div>
              {this.renderJobs()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
