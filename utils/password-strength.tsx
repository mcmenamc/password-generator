import { Shield, ShieldCheck, ShieldX } from "lucide-react"
import type { PasswordStrength } from "@/types/password"

export function calculatePasswordStrength(password: string): PasswordStrength {
  if (!password) {
    return {
      score: 0,
      label: "No Password",
      color: "bg-gray-400",
      icon: <ShieldX className="h-4 w-4" />,
      feedback: ["Generate a password to see strength analysis"],
    }
  }

  let score = 0
  const feedback: string[] = []
  const length = password.length

  // Length scoring and feedback
  if (length >= 8) {
    score += 20
  } else {
    feedback.push("Use at least 8 characters")
  }

  if (length >= 12) {
    score += 20
  } else if (length >= 8) {
    feedback.push("Consider using 12+ characters for better security")
  }

  if (length >= 16) {
    score += 15
  }

  // Character variety scoring and feedback
  const hasLower = /[a-z]/.test(password)
  const hasUpper = /[A-Z]/.test(password)
  const hasNumbers = /[0-9]/.test(password)
  const hasSymbols = /[^A-Za-z0-9]/.test(password)

  let varietyCount = 0
  if (hasLower) {
    score += 10
    varietyCount++
  }
  if (hasUpper) {
    score += 10
    varietyCount++
  }
  if (hasNumbers) {
    score += 10
    varietyCount++
  }
  if (hasSymbols) {
    score += 15
    varietyCount++
  }

  if (varietyCount < 2) {
    feedback.push("Add more character types (uppercase, lowercase, numbers, symbols)")
  } else if (varietyCount === 2) {
    feedback.push("Good variety - consider adding more character types")
  } else if (varietyCount >= 3) {
    feedback.push("Excellent character variety")
  }

  // Pattern detection
  const hasRepeating = /(.)\1{2,}/.test(password)
  if (hasRepeating) {
    score -= 10
    feedback.push("Avoid repeating characters")
  }

  const hasSequential =
    /(?:abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|123|234|345|456|567|678|789)/i.test(
      password,
    )
  if (hasSequential) {
    score -= 10
    feedback.push("Avoid sequential characters")
  }

  // Bonus for very long passwords
  if (length >= 20) {
    score += 10
    feedback.push("Excellent length for maximum security")
  }

  // Ensure score doesn't exceed 100
  score = Math.min(score, 100)

  if (score < 30) {
    return {
      score,
      label: "Weak",
      color: "bg-red-500",
      icon: <ShieldX className="h-4 w-4" />,
      feedback: feedback.length > 0 ? feedback : ["This password needs significant improvement"],
    }
  } else if (score < 60) {
    return {
      score,
      label: "Fair",
      color: "bg-yellow-500",
      icon: <Shield className="h-4 w-4" />,
      feedback: feedback.length > 0 ? feedback : ["This password is acceptable but could be stronger"],
    }
  } else if (score < 80) {
    return {
      score,
      label: "Good",
      color: "bg-blue-500",
      icon: <Shield className="h-4 w-4" />,
      feedback: feedback.length > 0 ? feedback : ["This is a good password"],
    }
  } else {
    return {
      score,
      label: "Strong",
      color: "bg-green-500",
      icon: <ShieldCheck className="h-4 w-4" />,
      feedback: feedback.length > 0 ? feedback : ["This is a very strong password"],
    }
  }
}
