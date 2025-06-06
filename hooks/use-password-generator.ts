"use client"

import { useState, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"
import { generatePassword } from "@/utils/password-generator"
import type { PasswordOptions, PasswordHistoryItem } from "@/types/password"

interface UsePasswordGeneratorProps {
  options: PasswordOptions
  onPasswordGenerated: (password: string, historyItem: PasswordHistoryItem) => void
}

export function usePasswordGenerator({ options, onPasswordGenerated }: UsePasswordGeneratorProps) {
  const { toast } = useToast()
  const [password, setPassword] = useState("")

  const generate = useCallback(() => {
    try {
      const newPassword = generatePassword(options)
      setPassword(newPassword)

      const historyItem: PasswordHistoryItem = {
        id: Date.now().toString(),
        password: newPassword,
        timestamp: new Date(),
        options: { ...options },
      }

      onPasswordGenerated(newPassword, historyItem)
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate password",
        variant: "destructive",
      })
    }
  }, [options, onPasswordGenerated, toast])

  return {
    password,
    generate,
  }
}
