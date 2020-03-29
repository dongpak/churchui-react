import React from 'react';


const forSuper      = ["SUPER", "ADMIN", "CLERK", "OFFICIAL", "MEMBER", "NONMEMBER"];
const forAdmin      = ["ADMIN", "CLERK", "OFFICIAL", "MEMBER", "NONMEMBER"];
const forClerk      = ["OFFICIAL", "MEMBER", "NONMEMBER"];
const forOfficial   = ["OFFICIAL", "MEMBER"];
const forMember     = ["MEMBER"];
const forOther      = ["NONMEMBER"];


function UserRoles(apiCaller, roles) {

    const   key = "UserRoles-option";

    let     apiCallerRoles  = [];
    let     mainRoles       = forOther;
    let     userRoles       = [];

    if (apiCaller !== null) {
        apiCallerRoles = apiCaller.roles;
    }

    if (apiCallerRoles.includes("SUPER")) {
        mainRoles = forSuper;
    }
    else if (apiCallerRoles.includes("ADMIN")) {
        mainRoles = forAdmin;
    }
    else if (apiCallerRoles.includes("CLERK")) {
        mainRoles = forClerk;
    }
    else if (apiCallerRoles.includes("OFFICIAL")) {
        mainRoles = forOfficial;
    }
    else if (apiCallerRoles.includes("MEMBER")) {
        mainRoles = forMember;
    }

    if (typeof roles !== "undefined") {
        if (roles !== null) {
            userRoles = roles.split(",");
        }
    }

    return mainRoles.map((role) => {

        if (userRoles.includes(role)) {
            return (
                <option key={key+role} value={role} selected>{role}</option>
            );
        }

        return (
            <option key={key+role} value={role}>{role}</option>
        );
    });
}

export default UserRoles;