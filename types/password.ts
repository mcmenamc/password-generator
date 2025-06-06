import type React from "react"
export interface PasswordOptions {
  length: number
  includeUppercase: boolean
  includeLowercase: boolean
  includeNumbers: boolean
  includeSymbols: boolean
  excludeSimilar: boolean
}

export interface PasswordStrength {
  score: number
  label: string
  color: string
  icon: React.ReactNode
  feedback: string[]
}

export interface PasswordHistoryItem {
  id: string
  password: string
  timestamp: Date
  options: PasswordOptions
}

export interface DisplaySettings {
  fontFamily: string
  fontSize: number
  showPassword: boolean
}

export interface PasswordTemplate {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  securityLevel: "High" | "Medium" | "Basic"
  options: PasswordOptions
  useCase: string
}
