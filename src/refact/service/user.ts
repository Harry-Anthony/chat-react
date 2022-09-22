import React, { useState } from "react";



// export let user = JSON.parse(localStorage.getItem("user")!);
// export function setUser(newUser: any) {
//     user = newUser
// }
export const UserContext = React.createContext<any>(null);


// function Test(children: any) {
//     const [user, setUser] = useState("")
//     return (
//         <UserContext.Provider value={{value, setUser}}>
//         <UserContext>
//     )
// }