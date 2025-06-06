"use client"

import { History, Trash2, Copy, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useClipboard } from "@/hooks/use-clipboard"
import { formatTimestamp, getOptionsString } from "@/utils/formatting"
import type { PasswordHistoryItem } from "@/types/password"

interface PasswordHistoryProps {
  history: PasswordHistoryItem[]
  onClearHistory: () => void
}

export function PasswordHistory({ history, onClearHistory }: PasswordHistoryProps) {
  const { copyToClipboard } = useClipboard()

  if (history.length === 0) {
    return null
  }

  return (
    <Card className="border-2 border-gray-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <History className="h-5 w-5" />
            Recent Passwords
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={onClearHistory}
            className="border-red-300 text-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription>Last {history.length} generated</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-64">
          <div className="space-y-3">
            {history.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <code className="font-mono text-sm bg-gray-100 px-2 py-1 rounded truncate max-w-[120px]">
                    {item.password}
                  </code>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0"
                    onClick={() => copyToClipboard(item.password)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatTimestamp(item.timestamp)}
                  </div>
                  <div>{getOptionsString(item.options)}</div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
