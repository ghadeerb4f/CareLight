import { useContext } from "react"
import { MessageContext } from "../contexts/MessagesContext"

export function useMessage() {
  const context = useContext(MessageContext)

  if (!context) {
    throw new Error("useMessage must be used within a UserProvider")
  }

  return context
}
