"use client"

import { useState, useEffect } from "react"
import { RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { usePasswordGenerator } from "@/hooks/use-password-generator"
import { PasswordDisplay } from "@/components/password-display/password-display"
import { PasswordOptionsComponent } from "@/components/password-options/password-options"
import { TemplateSelector } from "@/components/template-selector/template-selector"
import { DisplaySettingsComponent } from "@/components/display-settings/display-settings"
import { PasswordHistory } from "@/components/password-history/password-history"
import { SecurityTips } from "@/components/security-tips/security-tips"
import {
  savePasswordHistory,
  loadPasswordHistory,
  saveDisplaySettings,
  loadDisplaySettings,
  clearPasswordHistory,
} from "@/utils/storage"
import type { PasswordOptions, PasswordHistoryItem, DisplaySettings } from "@/types/password"

export default function PasswordGenerator() {
  const { toast } = useToast()
  const [options, setOptions] = useState<PasswordOptions>({
    length: 12,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: false,
    excludeSimilar: false,
  })
  const [passwordHistory, setPasswordHistory] = useState<PasswordHistoryItem[]>([])
  const [displaySettings, setDisplaySettings] = useState<DisplaySettings>({
    fontFamily: "mono",
    fontSize: 16,
    showPassword: true,
  })

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedHistory = loadPasswordHistory()
    const savedDisplaySettings = loadDisplaySettings()

    setPasswordHistory(savedHistory)
    if (savedDisplaySettings) {
      setDisplaySettings(savedDisplaySettings)
    }
  }, [])

  // Save data to localStorage when they change
  useEffect(() => {
    if (passwordHistory.length > 0) {
      savePasswordHistory(passwordHistory)
    }
  }, [passwordHistory])

  useEffect(() => {
    saveDisplaySettings(displaySettings)
  }, [displaySettings])

  const handlePasswordGenerated = (password: string, historyItem: PasswordHistoryItem) => {
    setPasswordHistory((prev) => {
      const newHistory = [historyItem, ...prev]
      return newHistory.slice(0, 20) // Keep only the last 20 passwords
    })
  }

  const { password, generate } = usePasswordGenerator({
    options,
    onPasswordGenerated: handlePasswordGenerated,
  })

  const handleClearHistory = () => {
    setPasswordHistory([])
    clearPasswordHistory()
    toast({
      title: "History Cleared",
      description: "Password history has been cleared.",
    })
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl p-6 space-y-8">
        {/* Header */}
        <div className="text-center border-b pb-8">
          <h1 className="text-5xl font-bold text-black mb-2">Password Generator</h1>
          <p className="text-lg text-gray-600">Create secure passwords with advanced customization</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Main Generator - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Generated Password */}
            <PasswordDisplay
              password={password}
              displaySettings={displaySettings}
              onDisplaySettingsChange={setDisplaySettings}
            />

            {/* Generate Button */}
            <Button onClick={generate} className="w-full bg-black hover:bg-gray-800 text-white" size="lg">
              <RefreshCw className="mr-2 h-5 w-5" />
              Generate Password
            </Button>

            {/* Password Options */}
            <PasswordOptionsComponent options={options} onChange={setOptions} />

            {/* Template Selection */}
            <TemplateSelector onTemplateApply={setOptions} />
          </div>

          {/* Settings and History - Right Column */}
          <div className="space-y-6">
            {/* Display Settings */}
            {/* <DisplaySettingsComponent settings={displaySettings} onChange={setDisplaySettings} /> */}

            {/* Password History */}
            <PasswordHistory history={passwordHistory} onClearHistory={handleClearHistory} />

            {/* Security Tips */}
            {/* <SecurityTips /> */}
          </div>
        </div>
      </div>
    </div>
  )
}
