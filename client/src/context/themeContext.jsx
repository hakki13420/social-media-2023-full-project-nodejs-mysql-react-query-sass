import { createContext, useEffect, useState } from 'react'

export const themeContext = createContext()

export const ThemeContextProvider = ({ children }) => {
  console.log('local storage  ===', window.localStorage.getItem('theme'))
  const [theme, setTheme] = useState(window.localStorage.getItem('theme') ? window.localStorage.getItem('theme') : 'light')
  useEffect(() => {
    window.localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme => theme === 'light' ? 'dark' : 'light')
  }
  return <themeContext.Provider value={{ theme, toggleTheme }}>
    {children}
  </themeContext.Provider>
}
