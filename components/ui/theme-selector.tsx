'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
          <span className="font-medium text-xs md:text-sm">
            {currentTheme.name}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-80 p-2" 
        align="end"
        side="bottom"
        sideOffset={8}
      >
        <DropdownMenuLabel className="text-sm font-semibold mb-2">
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
                <motion.div
                  className="w-full p-3 rounded-lg border-2 transition-all relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${preview?.gradientFrom || '#fef3c7'}, ${preview?.gradientTo || '#fed7aa'})`,
                    borderColor: isSelected ? (preview?.accent || '#f59e0b') : 'transparent',
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm mb-1 text-gray-900">
                        {theme.name}
                      </h4>
                      <p className="text-xs text-gray-700 line-clamp-2">
                        {theme.description}
                      </p>
                    </div>
                    
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ type: "spring", duration: 0.3 }}
                          className="ml-3 p-1 rounded-full"
                          style={{ backgroundColor: preview?.accent || '#f59e0b' }}
                        >
                          <Check className="w-3 h-3 text-white" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  {/* Color palette preview */}
                  <div className="flex gap-1 mt-2">
                    <div
                      className="w-3 h-3 rounded-full border border-white/20"
                      style={{ backgroundColor: preview?.gradientFrom }}
                    />
                    <div
                      className="w-3 h-3 rounded-full border border-white/20"
                      style={{ backgroundColor: preview?.gradientTo }}
                    />
                    <div
                      className="w-3 h-3 rounded-full border border-white/20"
                      style={{ backgroundColor: preview?.accent }}
                    />
                  </div>
                </motion.div>
              </DropdownMenuItem>
            )
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}