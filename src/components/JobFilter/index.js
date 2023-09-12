import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const JobFilter = props => (
  <>
    <hr className="horizontal-line" />
    <h1 className="filter-headings">Type of Employment</h1>
    <ul className="filter-list-container">
      {employmentTypesList.map(eachType => {
        const {changeEmploymentType} = props

        const onChangeEmploymentType = event => {
          changeEmploymentType(event.target.checked, eachType.employmentTypeId)
        }

        return (
          <li className="filter-type" key={eachType.employmentTypeId}>
            <input
              type="checkbox"
              id={eachType.label}
              className="employment-checkbox"
              onChange={onChangeEmploymentType}
            />
            <label htmlFor={eachType.label} className="label">
              {eachType.label}
            </label>
          </li>
        )
      })}
    </ul>
    <hr className="horizontal-line" />
    <h1 className="filter-headings">Salary Range</h1>
    <ul className="filter-list-container">
      {salaryRangesList.map(eachType => {
        const {changeSalaryType} = props

        const onChangeSalaryType = () => {
          changeSalaryType(eachType.salaryRangeId)
        }

        return (
          <li className="filter-type" key={eachType.salaryRangeId}>
            <input
              type="radio"
              id={eachType.label}
              className="salary-checkbox"
              name="salary"
              value={eachType.label}
              onChange={onChangeSalaryType}
            />
            <label htmlFor={eachType.label} className="label">
              {eachType.label}
            </label>
          </li>
        )
      })}
    </ul>
  </>
)

export default JobFilter
