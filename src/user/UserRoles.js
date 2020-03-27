import React from 'react';


const forSuper      = ["SUPER", "ADMIN", "CLERK", "OFFICIAL", "MEMBER", "NONMEMBER"];
const forAdmin      = ["ADMIN", "CLERK", "OFFICIAL", "MEMBER", "NONMEMBER"];
const forClerk      = ["OFFICIAL", "MEMBER", "NONMEMBER"];
const forOfficial   = ["OFFICIAL", "MEMBER"];
const forMember     = ["MEMBER"];
const forOther      = ["NONMEMBER"];


function UserRoles(apiCaller) {

    let     userRoles   = [];
    let     roles       = forOther;

    if (apiCaller !== null) {
        userRoles = apiCaller.roles;
    }

    if (userRoles.includes("SUPER")) {
        roles = forSuper;
    }
    else if (userRoles.includes("ADMIN")) {
        roles = forAdmin;
    }
    else if (userRoles.includes("CLERK")) {
        roles = forClerk;
    }
    else if (userRoles.includes("OFFICIAL")) {
        roles = forOfficial;
    }
    else if (userRoles.includes("MEMBER")) {
        roles = forMember;
    }

    return roles.map((role) => {
        if (userRoles.includes(role)) {
            return (
                <option value={role} selected>{role}</option>
            );
        }

        return (
            <option value={role}>{role}</option>
        );
    });
}

export default UserRoles;