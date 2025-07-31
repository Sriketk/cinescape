'use client'

import * as React from 'react'
import { createContext, useContext, useEffect, useState } from 'react'
import { MovieTheme, getTheme, movieThemes } from '@/lib/movie-themes'

interface MovieThemeContextType {
  currentTheme: MovieTheme
  setTheme: (themeId: string) => void
  availableThemes: MovieTheme[]
}

const MovieThemeContext = createContext<MovieThemeContextType | undefined>(undefined)

export function useMovieTheme() {
  const context = useContext(MovieThemeContext)
  if (context === undefined) {
    throw new Error('useMovieTheme must be used within a MovieThemeProvider')
  }
  return context
}

interface MovieThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: string
}

export function MovieThemeProvider({ children, defaultTheme = 'default' }: MovieThemeProviderProps) {
  const [currentThemeId, setCurrentThemeId] = useState(defaultTheme)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('movie-theme')
    if (savedTheme && movieThemes[savedTheme]) {
      setCurrentThemeId(savedTheme)
    }
    setIsLoaded(true)
  }, [])

  // Apply CSS variables when theme changes
  useEffect(() => {
    if (!isLoaded) return

    const theme = getTheme(currentThemeId)
    const root = document.documentElement

    // Temporarily disable transitions to prevent flash
    document.body.classList.add('no-transition')

    // Apply color variables
    Object.entries(theme.colors).forEach(([key, value]) => {
      const cssVar = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`
      root.style.setProperty(cssVar, value)
    })

    // Apply background glow variables
    if (theme.effects?.backgroundGlow) {
      root.style.setProperty('--theme-glow-color', theme.effects.backgroundGlow.color)
      root.style.setProperty('--theme-glow-from', theme.effects.backgroundGlow.from)
      root.style.setProperty('--theme-glow-to', theme.effects.backgroundGlow.to)
      root.style.setProperty('--theme-glow-secondary', theme.effects.backgroundGlow.secondary)
    }

    // Apply font family based on typography settings  
    const fontClass = theme.typography.primary === 'serif' ? 'font-serif' : 
                      theme.typography.primary === 'mono' ? 'font-mono' : 
                      theme.typography.primary === 'figtree' ? 'font-figtree' : 'font-sans'
    
    // Remove existing font classes and add new one [[memory:4428205]]
    document.body.classList.remove('font-sans', 'font-serif', 'font-mono', 'font-figtree')
    document.body.classList.add(fontClass)

    // Store theme in localStorage
    localStorage.setItem('movie-theme', currentThemeId)

    // Re-enable transitions after a short delay
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.body.classList.remove('no-transition')
      })
    })
  }, [currentThemeId, isLoaded])

  const setTheme = (themeId: string) => {
    if (movieThemes[themeId]) {
      setCurrentThemeId(themeId)
    }
  }

  const currentTheme = getTheme(currentThemeId)
  const availableThemes = Object.values(movieThemes)

  // Don't render until themes are loaded to prevent flash
  if (!isLoaded) {
    return null
  }

  return (
    <MovieThemeContext.Provider value={{ 
      currentTheme, 
      setTheme, 
      availableThemes 
    }}>
      {children}
    </MovieThemeContext.Provider>
  )
}