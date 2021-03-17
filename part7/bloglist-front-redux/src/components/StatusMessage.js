import React from "react"
import "../styles/StatusMessage.css"
import { useSelector } from "react-redux"
import { Typography } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
const StatusMessage = () => {
  const msg = useSelector((state) => state.notification)
  if (!msg.message) {
    return null
  }
  let classname = "goodStatus"
  if (!msg.good) {
    return (
      <Alert severity="error">
        <Typography variant="h3">{msg.message}</Typography>
      </Alert>
    )
  }
  return (
    <Alert severity="success">
      <Typography variant="p">{msg.message}</Typography>
    </Alert>
  )
}

export default StatusMessage
