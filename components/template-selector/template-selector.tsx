"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { PASSWORD_TEMPLATES } from "@/constants/templates"
import { getSecurityLevelColor } from "@/utils/formatting"
import type { PasswordTemplate, PasswordOptions } from "@/types/password"

interface TemplateSelectorProps {
  onTemplateApply: (options: PasswordOptions) => void
}

export function TemplateSelector({ onTemplateApply }: TemplateSelectorProps) {
  const { toast } = useToast()

  const applyTemplate = (template: PasswordTemplate) => {
    onTemplateApply(template.options)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    toast({
      title: "Template Applied",
      description: `${template.name} settings have been applied.`,
    })
  }


  return (
    <Card className="border-2 border-gray-300">
      <CardHeader>
        <CardTitle className="text-xl">Password Templates</CardTitle>
        <CardDescription>Choose a preset configuration for your specific use case</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PASSWORD_TEMPLATES.map((template) => (
            <div
              key={template.id}
              className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer group"
              onClick={() => applyTemplate(template)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {template.icon}
                  <h3 className="font-medium text-sm">{template.name}</h3>
                </div>
                <Badge variant="outline" className={`text-xs ${getSecurityLevelColor(template.securityLevel)}`}>
                  {template.securityLevel}
                </Badge>
              </div>
              <p className="text-xs text-gray-600 mb-2">{template.description}</p>
              <p className="text-xs text-gray-500 mb-3">{template.useCase}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{template.options.length} chars</span>
                <div className="flex gap-1">
                  {template.options.includeUppercase && <span className="bg-gray-200 px-1 rounded">A-Z</span>}
                  {template.options.includeLowercase && <span className="bg-gray-200 px-1 rounded">a-z</span>}
                  {template.options.includeNumbers && <span className="bg-gray-200 px-1 rounded">0-9</span>}
                  {template.options.includeSymbols && <span className="bg-gray-200 px-1 rounded">!@#</span>}
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-3 opacity-0 group-hover:opacity-100 transition-opacity border-black hover:bg-black hover:text-white"
              >
                Apply Template
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
