"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { PasswordOptions } from "@/types/password"

interface PasswordOptionsProps {
  options: PasswordOptions
  onChange: (options: PasswordOptions) => void
}

export function PasswordOptionsComponent({ options, onChange }: PasswordOptionsProps) {
  const updateOption = <K extends keyof PasswordOptions>(key: K, value: PasswordOptions[K]) => {
    onChange({ ...options, [key]: value })
  }

  return (
    <Card className="border-2 border-gray-300">
      <CardHeader>
        <CardTitle className="text-xl">Password Options</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label className="font-medium">Password Length: {options.length}</Label>
          <Slider
            value={[options.length]}
            onValueChange={(value) => updateOption("length", value[0])}
            min={4}
            max={50}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>4</span>
            <span>50</span>
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="uppercase"
              checked={options.includeUppercase}
              onCheckedChange={(checked) => updateOption("includeUppercase", checked as boolean)}
            />
            <Label htmlFor="uppercase" className="font-medium">
              Uppercase (A-Z)
            </Label>
          </div>

          <div className="flex items-center space-x-3">
            <Checkbox
              id="lowercase"
              checked={options.includeLowercase}
              onCheckedChange={(checked) => updateOption("includeLowercase", checked as boolean)}
            />
            <Label htmlFor="lowercase" className="font-medium">
              Lowercase (a-z)
            </Label>
          </div>

          <div className="flex items-center space-x-3">
            <Checkbox
              id="numbers"
              checked={options.includeNumbers}
              onCheckedChange={(checked) => updateOption("includeNumbers", checked as boolean)}
            />
            <Label htmlFor="numbers" className="font-medium">
              Numbers (0-9)
            </Label>
          </div>

          <div className="flex items-center space-x-3">
            <Checkbox
              id="symbols"
              checked={options.includeSymbols}
              onCheckedChange={(checked) => updateOption("includeSymbols", checked as boolean)}
            />
            <Label htmlFor="symbols" className="font-medium">
              Symbols (!@#$)
            </Label>
          </div>
        </div>

        <Separator />

        <div className="flex items-center space-x-3">
          <Checkbox
            id="excludeSimilar"
            checked={options.excludeSimilar}
            onCheckedChange={(checked) => updateOption("excludeSimilar", checked as boolean)}
          />
          <Label htmlFor="excludeSimilar" className="font-medium">
            Exclude similar characters (l, 1, I, 0, O, o)
          </Label>
        </div>
      </CardContent>
    </Card>
  )
}
