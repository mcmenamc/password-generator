import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function SecurityTips() {
  return (
    <Card className="border-2 border-gray-300">
      <CardHeader>
        <CardTitle className="text-lg">Security Tips</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start gap-2">
            <span className="text-black font-bold">•</span>
            Use 12+ characters for optimal security
          </li>
          <li className="flex items-start gap-2">
            <span className="text-black font-bold">•</span>
            Mix uppercase, lowercase, numbers, and symbols
          </li>
          <li className="flex items-start gap-2">
            <span className="text-black font-bold">•</span>
            Use unique passwords for each account
          </li>
          <li className="flex items-start gap-2">
            <span className="text-black font-bold">•</span>
            Store passwords in a secure password manager
          </li>
          <li className="flex items-start gap-2">
            <span className="text-black font-bold">•</span>
            Enable two-factor authentication when available
          </li>
        </ul>
      </CardContent>
    </Card>
  )
}
