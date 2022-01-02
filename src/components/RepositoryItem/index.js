import './index.css'

const RepositoryItem = props => {
  const {repoDetails} = props
  const {name, avatarUrl, forksCount, starsCount, issuesCount} = repoDetails

  return (
    <li className="repository-item">
      <img src={avatarUrl} alt={name} className="avatar-url" />
      <h1 className="repo-name">{name}</h1>
      <div className="stars-count-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="stars"
        />
        <p className="stars-count">{starsCount} stars</p>
      </div>
      <div className="forks-count-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="forks"
        />
        <p className="forks-count">{forksCount} forks</p>
      </div>
      <div className="open-issues-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="open-issues"
        />
        <p className="issues-count">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
