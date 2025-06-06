import type { PasswordOptions } from "@/types/password"

export function generatePassword(options: PasswordOptions): string {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const lowercase = "abcdefghijklmnopqrstuvwxyz"
  const numbers = "0123456789"
  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?"

  // Similar characters to exclude: l, 1, I, 0, O, o
  const similarChars = options.excludeSimilar ? /[l1I0Oo]/g : null

  let charset = ""
  let requiredChars = ""

  if (options.includeUppercase) {
    let chars = uppercase
    if (similarChars) chars = chars.replace(similarChars, "")
    charset += chars
    if (chars.length > 0) {
      requiredChars += chars[Math.floor(Math.random() * chars.length)]
    }
  }
  if (options.includeLowercase) {
    let chars = lowercase
    if (similarChars) chars = chars.replace(similarChars, "")
    charset += chars
    if (chars.length > 0) {
      requiredChars += chars[Math.floor(Math.random() * chars.length)]
    }
  }
  if (options.includeNumbers) {
    let chars = numbers
    if (similarChars) chars = chars.replace(similarChars, "")
    charset += chars
    if (chars.length > 0) {
      requiredChars += chars[Math.floor(Math.random() * chars.length)]
    }
  }
  if (options.includeSymbols) {
    charset += symbols
    requiredChars += symbols[Math.floor(Math.random() * symbols.length)]
  }

  if (charset === "") {
    throw new Error("Please select at least one character type.")
  }

  let generatedPassword = requiredChars

  for (let i = requiredChars.length; i < options.length; i++) {
    generatedPassword += charset[Math.floor(Math.random() * charset.length)]
  }

  // Shuffle the password to avoid predictable patterns
  return generatedPassword
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("")
}
