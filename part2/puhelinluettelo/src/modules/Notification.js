import React from 'react'

export const NotificationMessage = ({message}) => {
    const notificationStyleGreen = {
        background: '#e8e8e8',
        border: '2px solid green',
        padding: '10px'
    }
    const notificationStyleRed = {
        background: '#e8e8e8',
        border: '2px solid red',
        padding: '10px'
    }
   
    if(message === null) {
        return( null )
    } else {
        if(message.good){
            return(
                <div style={notificationStyleGreen}>
                    {message.message}
                </div>
            )
        } else {
            return(
                <div style={notificationStyleRed}>
                    {message.message}
                </div>
            )
        }
       
    }
}
