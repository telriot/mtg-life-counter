Create a ws server

User connects on loading main page

ROOM
users:[user]
maxUsers:number
password:string

USER
username:string, 
_id:string, 
life:number, 
position:number

User requires room through modal
DB: if !room create room
DB: if newUser===oldUser copy oldUser data then pull oldUser
DB: room.users.push newUser

WS: emit new rooms
WS: to room: emit new user stats

CL: listen to api changes