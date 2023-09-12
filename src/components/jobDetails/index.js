import './index.css'

import {Component} from 'react'

import Cookies from 'js-cookie'

import {BsStarFill} from 'react-icons/bs'
import {MdLocationOn, MdWork} from 'react-icons/md'
import {BiLinkExternal} from 'react-icons/bi'

import Loader from 'react-loader-spinner'

import SimilarJobsCard from '../SimilarJobsCard'

import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobDetails extends Component {
  state = {
    jobDetailsList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`

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
      const jobDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        employmentType: data.job_details.employment_type,
        companyWebsiteUrl: data.job_details.company_website_url,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
        skills: data.job_details.skills.map(eachValue => ({
          imageUrl: eachValue.image_url,
          name: eachValue.name,
        })),
        lifeAtCompany: {
          description: data.job_details.life_at_company.description,
          imageUrl: data.job_details.life_at_company.image_url,
        },
      }
      const similarJobs = data.similar_jobs.map(eachValue => ({
        companyLogoUrl: eachValue.company_logo_url,
        employmentType: eachValue.employment_type,
        id: eachValue.id,
        jobDescription: eachValue.job_description,
        location: eachValue.location,
        rating: eachValue.rating,
        title: eachValue.title,
      }))

      const modifiedData = {jobDetails, similarJobs}
      this.setState({
        jobDetailsList: modifiedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderJobDetailsSuccessView = () => {
    const {jobDetailsList} = this.state
    const {jobDetails, similarJobs} = jobDetailsList

    const {
      companyLogoUrl,
      employmentType,
      companyWebsiteUrl,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      skills,
      lifeAtCompany,
    } = jobDetails

    return (
      <div className="job-item-bg-container">
        <div className="company-details-container">
          <div className="job-item-company-logo-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo"
            />
            <div className="job-description-container">
              <h1 className="job-title">{title}</h1>
              <div className="company-rating-container">
                <BsStarFill className="star-logo" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-details-container">
            <div className="location-job-type-container">
              <div className="location-container">
                <MdLocationOn className="location-icon" />
                <p className="location">{location}</p>
              </div>
              <div className="work-container">
                <MdWork className="work-logo" />
                <p className="employment-type">{employmentType}</p>
              </div>
            </div>
            <p className="job-package">{packagePerAnnum}</p>
          </div>
          <hr className="job-item-horizontal-line" />

          <div className="job-item-description-container">
            <h1 className="description-title">Description</h1>
            <a href={companyWebsiteUrl} rel="noreferrer" target="_blank">
              <p className="violet-text">
                Visit <BiLinkExternal className="visit" />
              </p>
            </a>
          </div>

          <p className="company-job-description">{jobDescription}</p>
          <h1 className="skills-heading">Skills</h1>
          <ul className="skills-list">
            {skills.map(eachItem => (
              <li className="skill-item" key={eachItem.name}>
                <img
                  src={eachItem.imageUrl}
                  className="skill-image"
                  alt={eachItem.name}
                />
                <p className="skill-name">{eachItem.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="life-at-company-heading">Life at Company</h1>
          <div className="life-at-company-holder">
            <p className="life-at-company-description">
              {lifeAtCompany.description}
            </p>
            <img
              src={lifeAtCompany.imageUrl}
              className="life-at-company-image"
              alt="life at company"
            />
          </div>
        </div>
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-jobs-list">
          {similarJobs.map(eachJob => (
            <SimilarJobsCard key={eachJob.id} similarJobDetails={eachJob} />
          ))}
        </ul>
      </div>
    )
  }

  onClickRetry = () => {
    this.getJobDetails()
  }

  renderJobDetailsFailureView = () => (
    <div className="jobs-details-failure-container">
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

  renderLoaderView = () => (
    <div className="jobs-details-loader" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsSuccessView()
      case apiStatusConstants.failure:
        return this.renderJobDetailsFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderJobDetails()}
      </>
    )
  }
}

export default JobDetails
