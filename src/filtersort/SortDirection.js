import React from 'react';


const directions = ["NONE", "ASC", "DESC" ];



function SortDirection(prefix, dir) {

    const   key = prefix + "SortDirection-";


    return directions.map((item) => {

        return (
            <option key={key+item} value={item}>{item}</option>
        );
    });
}
/*
        if (userRoles.includes(role)) {
            return (
                <option key={key+role} value={role} selected>{role}</option>
            );
        }
*/

export default SortDirection;