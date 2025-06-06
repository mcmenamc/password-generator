"use client"

import { Settings } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { DisplaySettings } from "@/types/password"

interface DisplaySettingsProps {
  settings: DisplaySettings
  onChange: (settings: DisplaySettings) => void
}

export function DisplaySettingsComponent({ settings, onChange }: DisplaySettingsProps) {
  const updateSetting = <K extends keyof DisplaySettings>(key: K, value: DisplaySettings[K]) => {
    onChange({ ...settings, [key]: value })
  }

  return (
    <Card className="border-2 border-gray-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Settings className="h-5 w-5" />
          Display Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="font-medium">Font Family</Label>
          <Select value={settings.fontFamily} onValueChange={(value) => updateSetting("fontFamily", value)}>
            <SelectTrigger className="border-2 border-gray-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mono">Monospace</SelectItem>
              <SelectItem value="courier">Courier New</SelectItem>
              <SelectItem value="consolas">Consolas</SelectItem>
              <SelectItem value="menlo">Menlo</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="font-medium">Font Size: {settings.fontSize}px</Label>
          <Slider
            value={[settings.fontSize]}
            onValueChange={(value) => updateSetting("fontSize", value[0])}
            min={12}
            max={24}
            step={1}
            className="w-full"
          />
        </div>
      </CardContent>
    </Card>
  )
}
