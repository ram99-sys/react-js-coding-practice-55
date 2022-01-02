import {Component} from 'react'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    activeOptionId: languageFiltersData[0].id,
    repositoryData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getLanguageData()
  }

  getLanguageData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {activeOptionId} = this.state
    const githubReposApiUrl = `https://apis.ccbp.in/popular-repos?language=${activeOptionId}`
    const response = await fetch(githubReposApiUrl)
    if (response.ok === true) {
      const data = await response.json()
      // console.log(data)
      const updateReposName = {
        popularRepos: data.popular_repos,
      }
      // console.log(updateReposName)
      const updatedData = updateReposName.popularRepos.map(eachObject => ({
        id: eachObject.id,
        name: eachObject.name,
        avatarUrl: eachObject.avatar_url,
        forksCount: eachObject.forks_count,
        starsCount: eachObject.stars_count,
        issuesCount: eachObject.issues_count,
      }))
      console.log(updatedData)
      this.setState({
        repositoryData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else if (response.status === 401) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  updateLanguage = id => {
    this.setState({activeOptionId: id}, this.getLanguageData)
  }

  renderSuccessView = () => {
    const {repositoryData} = this.state
    return (
      <ul className="repository-data-container">
        {repositoryData.map(eachRepository => (
          <RepositoryItem
            repoDetails={eachRepository}
            key={eachRepository.id}
          />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div>
      <img
        stc="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view"
      />
    </div>
  )

  renderInProgressView = () => (
    <div testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderApiData = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderInProgressView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  renderOptionsView = () => {
    const {activeOptionId} = this.state
    return (
      <div className="app-container">
        <h1 className="popular-heading">Popular</h1>
        <ul className="options-container">
          {languageFiltersData.map(eachLanguage => (
            <LanguageFilterItem
              languageDetails={eachLanguage}
              key={eachLanguage.id}
              activeLanguageId={activeOptionId === eachLanguage.id}
              updateLanguage={this.updateLanguage}
            />
          ))}
        </ul>
        {this.renderApiData()}
      </div>
    )
  }

  render() {
    return this.renderOptionsView()
  }
}

export default GithubPopularRepos
