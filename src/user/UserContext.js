import React from 'react';

const UserContext = React.createContext({
    selection:          null,
    selected:           null,
    updateSelection:    (index, selected) => {}
});


export default UserContext;