"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export function MessageForm() {
  const [sent, setSent] = useState(false)
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  function handleSend(e: React.FormEvent) {
    e.preventDefault()
    setSent(true)
  }
  if (sent) {
    return (
      <div className="p-4 bg-green-100 border border-green-400 rounded text-green-800 text-center">
        Message sent to the seller successfully!
      </div>
    )
  }
  return (
    <form className="space-y-2" onSubmit={handleSend}>
      <Input type="email" placeholder="Your email" value={email} onChange={e => setEmail(e.target.value)} required />
      <Textarea placeholder="I want to buy your bike!" value={message} onChange={e => setMessage(e.target.value)} required />
      <Button className="w-full mt-2" type="submit">Send</Button>
    </form>
  )
} 