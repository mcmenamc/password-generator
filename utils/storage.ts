import type { PasswordHistoryItem, DisplaySettings } from "@/types/password"

export const STORAGE_KEYS = {
  PASSWORD_HISTORY: "passwordHistory",
  DISPLAY_SETTINGS: "displaySettings",
} as const

export function savePasswordHistory(history: PasswordHistoryItem[]): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.PASSWORD_HISTORY, JSON.stringify(history))
  }
}

export function loadPasswordHistory(): PasswordHistoryItem[] {
  if (typeof window === "undefined") return []

  try {
    const saved = localStorage.getItem(STORAGE_KEYS.PASSWORD_HISTORY)
    if (saved) {
      const parsed = JSON.parse(saved)
      return parsed.map((item: any) => ({
        ...item,
        timestamp: new Date(item.timestamp),
      }))
    }
  } catch (error) {
    console.error("Failed to load password history:", error)
  }
  return []
}

export function saveDisplaySettings(settings: DisplaySettings): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.DISPLAY_SETTINGS, JSON.stringify(settings))
  }
}

export function loadDisplaySettings(): DisplaySettings | null {
  if (typeof window === "undefined") return null

  try {
    const saved = localStorage.getItem(STORAGE_KEYS.DISPLAY_SETTINGS)
    return saved ? JSON.parse(saved) : null
  } catch (error) {
    console.error("Failed to load display settings:", error)
    return null
  }
}

export function clearPasswordHistory(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEYS.PASSWORD_HISTORY)
  }
}
