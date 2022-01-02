import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, activeLanguageId, updateLanguage} = props
  const {id, language} = languageDetails
  console.log(activeLanguageId)
  const onClickLanguageName = () => {
    updateLanguage(id)
  }
  const isButtonClicked = activeLanguageId ? 'apply-border' : null

  return (
    <li className="list-item-value">
      <button
        type="button"
        className={`language-button ${isButtonClicked}`}
        onClick={onClickLanguageName}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
