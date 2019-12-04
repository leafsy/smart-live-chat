## Front End of Smart Live Chat Project 

## Admin Page
### Select Algorithm
User will be assigned chatroom based by selected algorithm. The algorithm should export uid (user id),vid (video id),cid (chatroom id)to Firebase.
### Avalaible Chatrooms
All available chatrooms will be listed. 
Selected chatrooms will be used to send bulk messages or send single ad-hoc message.
#### Send Bulk Message Function
To load messages to sent, in FireBase/bulkloadmessages, load messages with content, email, and offset. Offset is the time (in seconds) that the message is expected to be sent to selected chatrooms.
#### Send Ad-hoc message
This can send fake message to selected chatrooms. Note: email entered do not need to be registered for convenience.
