'use client'

import * as React from 'react'
import { Palette, Check } from 'lucide-react'
import { useMovieTheme } from '@/components/movie-theme-provider'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface ThemePreview {
  themeId: string
  gradientFrom: string
  gradientTo: string
  accent: string
}

const themePreviewData: Record<string, ThemePreview> = {
  default: {
    themeId: 'default',
    gradientFrom: '#fef3c7',
    gradientTo: '#fed7aa',
    accent: '#f59e0b',
  },
  bladeRunner: {
    themeId: 'bladeRunner',
    gradientFrom: '#0f172a',
    gradientTo: '#334155',
    accent: '#f97316',
  },
  moonlight: {
    themeId: 'moonlight',
    gradientFrom: '#0c1429',
    gradientTo: '#0e3a5f',
    accent: '#06b6d4',
  },
  grandBudapest: {
    themeId: 'grandBudapest',
    gradientFrom: '#fdf2f8',
    gradientTo: '#fce7f3',
    accent: '#f43f5e',
  },
  matrix: {
    themeId: 'matrix',
    gradientFrom: '#000000',
    gradientTo: '#052e16',
    accent: '#10b981',
  },
  pulpFiction: {
    themeId: 'pulpFiction',
    gradientFrom: '#fffbeb',
    gradientTo: '#fef3c7',
    accent: '#f59e0b',
  },
}

interface ThemeSelectorProps {
  className?: string
}

export function ThemeSelector({ className }: ThemeSelectorProps) {
  const { currentTheme, setTheme, availableThemes } = useMovieTheme()
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={`relative overflow-hidden border-2 hover:scale-105 transition-transform ${className}`}
          style={{
            background: `linear-gradient(45deg, ${
              themePreviewData[currentTheme.id]?.gradientFrom || '#fef3c7'
            }, ${themePreviewData[currentTheme.id]?.gradientTo || '#fed7aa'})`,
            borderColor: themePreviewData[currentTheme.id]?.accent || '#f59e0b',
          }}
        >
          <Palette className="w-4 h-4 mr-2" />
          <span 
            className="font-medium text-xs md:text-sm"
            style={{ 
              color: currentTheme.colors.foreground === "0 0% 3.9%" ? "#000000" : "#ffffff" 
            }}
          >
            {currentTheme.name}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-64 md:w-80 p-2" 
        align="center"
        side="bottom"
        sideOffset={8}
      >
        <DropdownMenuLabel 
          className="text-xs md:text-sm font-semibold mb-2"
          style={{ 
            color: currentTheme.colors.foreground === "0 0% 3.9%" ? "#000000" : "#ffffff" 
          }}
        >
          Choose Movie Theme
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <div className="grid gap-2 py-2">
          {availableThemes.map((theme) => {
            const preview = themePreviewData[theme.id]
            const isSelected = currentTheme.id === theme.id

            return (
              <DropdownMenuItem
                key={theme.id}
                className="p-0 cursor-pointer"
                onSelect={() => setTheme(theme.id)}
              >
                <div
                  className="w-full p-2 md:p-3 rounded-lg border-2 transition-all relative overflow-hidden hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${preview?.gradientFrom || '#fef3c7'}, ${preview?.gradientTo || '#fed7aa'})`,
                    borderColor: isSelected ? (preview?.accent || '#f59e0b') : 'transparent',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 
                        className="font-semibold text-xs md:text-sm mb-1"
                        style={{ 
                          color: theme.colors.foreground === "0 0% 3.9%" ? "#000000" : "#ffffff" 
                        }}
                      >
                        {theme.name}
                      </h4>
                      <p 
                        className="text-xs line-clamp-1 md:line-clamp-2"
                        style={{ 
                          color: theme.colors.foreground === "0 0% 3.9%" ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.8)" 
                        }}
                      >
                        {theme.description}
                      </p>
                    </div>
                    
                    {isSelected && (
                      <div
                        className="ml-3 p-1 rounded-full"
                        style={{ backgroundColor: preview?.accent || '#f59e0b' }}
                      >
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  
                  {/* Color palette preview */}
                  <div className="flex gap-1 mt-1 md:mt-2">
                    <div
                      className="w-2 h-2 md:w-3 md:h-3 rounded-full border border-white/20"
                      style={{ backgroundColor: preview?.gradientFrom }}
                    />
                    <div
                      className="w-2 h-2 md:w-3 md:h-3 rounded-full border border-white/20"
                      style={{ backgroundColor: preview?.gradientTo }}
                    />
                    <div
                      className="w-2 h-2 md:w-3 md:h-3 rounded-full border border-white/20"
                      style={{ backgroundColor: preview?.accent }}
                    />
                  </div>
                </div>
              </DropdownMenuItem>
            )
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}