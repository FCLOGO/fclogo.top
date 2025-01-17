import React, { useState, useEffect, useRef } from 'react'
import { Link, useI18next } from 'gatsby-plugin-react-i18next'

import EnIcon from '../../../static/assets/icons/en.inline.svg'
import ZhIcon from '../../../static/assets/icons/zh.inline.svg'
import CaretDownIcon from '../../../static/assets/icons/caretDown.inline.svg'

const languageMap = {
  en: `English`,
  'zh-cn': `简体中文`
}

const flagIcons = {
  en: <EnIcon className="h-lg w-2xl" />,
  'zh-cn': <ZhIcon className="h-lg w-2xl" />
}

const LanguageSwitcher = () => {
  const languageRef = useRef()
  const { language, languages, originalPath, changeLanguage } = useI18next()
  const [selectedLanguage, setSelectedLanguage] = useState(language)
  const [showDropdown, setShowDropdown] = useState(false)

  // 组件挂载和语言变化时更新选择的语言
  useEffect(() => {
    setSelectedLanguage(language)
  }, [language])

  // 处理语言切换事件，更新选择的语言
  const handleLanguageChange = language => {
    setSelectedLanguage(language)
    changeLanguage(language)
    setShowDropdown(false)
  }

  // 处理点击组件外部的事件，当点击组件外部时，隐藏下拉菜单
  const handleClickOutside = event => {
    if (languageRef.current && !languageRef.current.contains(event.target)) {
      setShowDropdown(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <div className="flex items-center tablet:block tablet:w-full tablet:bg-gray tablet:py-sm">
      <div ref={languageRef} className="relative tablet:mx-3xl">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="inline-flex items-center justify-center align-middle p-sm rounded-sm hover:bg-dark-gray hover:bg-opacity-20 tablet:hover:bg-opacity-0 tablet:justify-start tablet:w-full tablet:py-md"
        >
          {flagIcons[selectedLanguage]}{' '}
          <span className="desktop:hidden inline text-dark-gray flex-auto font-bold">
            {languageMap[selectedLanguage]}
          </span>
          <CaretDownIcon className="desktop:hidden block w-md h-md fill-dark-gray" />
        </button>
        {showDropdown && (
          <ul className="block text-left absolute bg-white overflow-x-hidden overflow-y-auto min-w-[110px] max-h-[300px] shadow-lg rounded top-100 right-zero tablet:relative tablet:w-full tablet:top-zero tablet:bg-gray tablet:shadow-none">
            {languages.map(lng => (
              <li
                key={lng}
                onClick={() => handleLanguageChange(lng)}
                className={selectedLanguage === lng ? 'font-bold' : ''}
              >
                <Link
                  to={originalPath}
                  language={lng}
                  onClick={() => setSelectedLanguage(language)}
                  className="h-[40px] px-md leading-[40px] block hover:bg-dark-gray hover:bg-opacity-5"
                >
                  {languageMap[lng]}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default LanguageSwitcher
