import React from 'react';

const UserContext = React.createContext({
    username: null,
    jwt: null,
    updateUser: (username, jwt) => {}
});


export default UserContext;