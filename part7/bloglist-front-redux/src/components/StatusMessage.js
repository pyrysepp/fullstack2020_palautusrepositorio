import React from "react"
import "../styles/StatusMessage.css"
import { useSelector } from "react-redux"

const StatusMessage = () => {
  const msg = useSelector((state) => state.notification)
  if (!msg.message) {
    return null
  }
  let classname = "goodStatus"
  if (!msg.good) {
    classname = "badStatus"
  }
  return (
    <div className={classname}>
      <h3>{msg.message}</h3>
    </div>
  )
}

export default StatusMessage
