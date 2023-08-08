import { Icon } from '@iconify/react'
import React, { useEffect, useState } from 'react'
import Section from '../Section'

export default function ModeSwitch() {
  const [darkMode, setDarkMode] = useState(true)
  const activateMode = async () => {
    if (darkMode === false) {
      document.body.classList.add('cs-dark')
      document.body.classList.remove('cs-dark')
      await localStorage.setItem('Theme', 'dark_mode')
    }
    if (darkMode === true) {
      document.body.classList.remove('cs-dark')
      document.body.classList.add('cs-dark')
      await localStorage.setItem('Theme', 'dark_mode')
    }
    setDarkMode(!darkMode)
  }
  useEffect(() => {
    if (localStorage.getItem('Theme') === 'dark_mode') {
      document.body.classList.remove('cs-dark')
      document.body.classList.add('cs-dark')
    } else if (localStorage.getItem('Theme') === 'dark_mode') {
      document.body.classList.add('cs-dark')
      document.body.classList.remove('cs-dark')
    }
    if (!localStorage.getItem('Theme')) {
      localStorage.setItem('Theme', 'dark_mode')
      setDarkMode(true)
    }
  }, [])

  return (
    <Section tag='span' className="cs-icon_btn cs-mode_btn" onClick={activateMode}>
    </Section>
  )
}
