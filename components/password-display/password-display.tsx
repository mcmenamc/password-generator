"use client"
import { Copy, Eye, EyeOff, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useClipboard } from "@/hooks/use-clipboard"
import { calculatePasswordStrength } from "@/utils/password-strength"
import { getFontFamily } from "@/utils/formatting"
import type { DisplaySettings } from "@/types/password"

interface PasswordDisplayProps {
  password: string
  displaySettings: DisplaySettings
  onDisplaySettingsChange: (settings: DisplaySettings) => void
}

export function PasswordDisplay({ password, displaySettings, onDisplaySettingsChange }: PasswordDisplayProps) {
  const { copyToClipboard } = useClipboard()
  const strength = calculatePasswordStrength(password)

  const togglePasswordVisibility = () => {
    onDisplaySettingsChange({
      ...displaySettings,
      showPassword: !displaySettings.showPassword,
    })
  }

  return (
    <Card className="border-2 border-black">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Shield className="h-6 w-6" />
          Generated Password
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Input
            value={displaySettings.showPassword ? password : "•".repeat(password.length)}
            readOnly
            placeholder="Click 'Generate Password' to create a password"
            className={`pr-20 border-2 border-gray-300 focus:border-black ${getFontFamily(displaySettings.fontFamily)}`}
            style={{ fontSize: `${displaySettings.fontSize}px` }}
          />
          <div className="absolute right-1 top-1 flex gap-1">
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0"
              onClick={togglePasswordVisibility}
              disabled={!password}
            >
              {displaySettings.showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0"
              onClick={() => copyToClipboard(password)}
              disabled={!password}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {password && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="font-medium">Password Strength</Label>
              <Badge variant="outline" className="flex items-center gap-1 border-black">
                {strength.icon}
                {strength.label}
              </Badge>
            </div>
            <Progress value={strength.score} className="h-3 border border-gray-300" />
            <div className="text-sm text-gray-600 space-y-1">
              {strength.feedback.map((feedback, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-black">•</span>
                  {feedback}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
