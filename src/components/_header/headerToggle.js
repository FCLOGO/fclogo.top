import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { LocaleContext, LangSelector, LocalizedLink } from 'gatsby-plugin-usei18n'
import { ThemeToggler } from 'gatsby-plugin-dark-mode'

import SwitchLangIcon from '../../../static/assets/icons/language.inline.svg'
import DonateIcon from '../../../static/assets/icons/heart.inline.svg'
import CaretDownIcon from '../../../static/assets/icons/caretDown.inline.svg'

import {
  toggleModal,
  modalHidden,
  togglesWrappper,
  toggleTheme,
  spanWrapper,
  toggleThemeLabel,
  toggleThemeInput,
  themeIcon,
  themeText,
  langSelectorWrapper,
  langSelectorButton,
  langSelector,
  showMenu,
  switchLangIcon,
  langText,
  caretDownIcon,
  donateButton,
  donateIcon,
  donateText
} from './headerToggle.module.styl'

const HeaderToggle = ({ pageContext }) => {
  const intl = useIntl()
  const { handleLanguage } = React.useContext(LocaleContext)
  const path = pageContext.originalPath
  const [menuActive, setMenuActive] = useState(false)
  const toggleMenu = () => setMenuActive(!menuActive)
  return (
    <>
      <div
        className={`${toggleModal} ${menuActive ? `` : `${modalHidden}`}`}
        onClick={toggleMenu}
      ></div>
      <div className={togglesWrappper}>
        <div className={langSelectorWrapper}>
          <button onClick={toggleMenu} className={langSelectorButton}>
            <SwitchLangIcon className={switchLangIcon} />
            <span className={langText}>{intl.formatMessage({ id: 'switch.lang' })}</span>
            <CaretDownIcon className={caretDownIcon} />
          </button>
          <div className={`${langSelector} ${menuActive ? `${showMenu}` : ``}`}>
            <LangSelector path={path} toggleLanguage={handleLanguage} />
          </div>
        </div>
        <div className={toggleTheme}>
          <ThemeToggler>
            {({ theme, toggleTheme }) => {
              if (theme == null) {
                return null
              }
              return (
                <>
                  <label htmlFor="toggleTheme" className={toggleThemeLabel}>
                    <input
                      id="toggleTheme"
                      name="toggleTheme"
                      type="checkbox"
                      className={toggleThemeInput}
                      onChange={e => toggleTheme(e.target.checked ? 'dark' : 'light')}
                      checked={theme === 'dark'}
                    />
                    <div className={spanWrapper}>
                      <span className={themeIcon}></span>{' '}
                      <span className={themeText}>
                        {intl.formatMessage({ id: 'switch.theme' })}
                      </span>
                    </div>
                  </label>
                </>
              )
            }}
          </ThemeToggler>
        </div>
        <LocalizedLink to="/sponsor" className={donateButton}>
          <DonateIcon className={donateIcon} />
          <span className={donateText}>{intl.formatMessage({ id: 'header.sponsor' })}</span>
        </LocalizedLink>
      </div>
    </>
  )
}

export default HeaderToggle
