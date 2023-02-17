import {createContext} from 'react';

export const AccountContext = createContext(
    {
        loggedIn : false,
        username : "",
        userID : "",
        pfp : ""
    }
)