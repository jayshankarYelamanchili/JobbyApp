import './index.css'

import {BsStarFill} from 'react-icons/bs'
import {MdLocationOn, MdWork} from 'react-icons/md'

const SimilarJobsCard = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobDetails

  return (
    <li className="similar-job-item-container">
      <div className="company-logo-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="company-logo"
        />
        <div className="similar-job-description-container">
          <h1 className="job-title">{title}</h1>
          <div className="company-rating-container">
            <BsStarFill className="star-logo" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="similar-jobs-description-title">Description</h1>
      <p className="similar-job-description">{jobDescription}</p>
      <div className="similar-job-details-container">
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
      </div>
    </li>
  )
}

export default SimilarJobsCard
