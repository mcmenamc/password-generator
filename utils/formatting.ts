import type { PasswordOptions } from "@/types/password"

export function formatTimestamp(timestamp: Date): string {
  const now = new Date()
  const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60))

  if (diffInMinutes < 1) {
    return "Just now"
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`
  } else if (diffInMinutes < 1440) {
    const hours = Math.floor(diffInMinutes / 60)
    return `${hours}h ago`
  } else {
    const days = Math.floor(diffInMinutes / 1440)
    return `${days}d ago`
  }
}

export function getOptionsString(options: PasswordOptions): string {
  const parts = []
  if (options.includeUppercase) parts.push("A-Z")
  if (options.includeLowercase) parts.push("a-z")
  if (options.includeNumbers) parts.push("0-9")
  if (options.includeSymbols) parts.push("!@#")
  return `${options.length} chars, ${parts.join(", ")}`
}

export function getFontFamily(family: string): string {
  switch (family) {
    case "mono":
      return "font-mono"
    case "courier":
      return "font-['Courier_New',_monospace]"
    case "consolas":
      return "font-['Consolas',_monospace]"
    case "menlo":
      return "font-['Menlo',_monospace]"
    default:
      return "font-mono"
  }
}

export function getSecurityLevelColor(level: string): string {
  switch (level) {
    case "High":
      return "bg-green-100 text-green-800 border-green-200"
    case "Medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "Basic":
      return "bg-gray-100 text-gray-800 border-gray-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}
