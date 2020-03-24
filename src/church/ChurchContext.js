import React from 'react';

const ChurchContext = React.createContext({
    selection:          null,
    selected:           null,
    updateSelection:    (index, selected) => {}
});

export default ChurchContext;