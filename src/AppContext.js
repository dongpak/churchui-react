import React from 'react';

const UserContext = React.createContext({
    username:           null,
    jwt:                null,
    updateUser:         (username, jwt) => {},

    apiCaller:          null,
    updateApiCaller:    (apiCaller) => {},

    appContent:         null,
    updateAppContent:   (appContent) => {}
});

export default UserContext;