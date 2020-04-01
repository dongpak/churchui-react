import React from 'react';
//import logo from './logo.svg';
import './App.css';
import AppContext from './AppContext.js';
import ManageChurch from './church/ManageChurch.js';
import ManageUser from './user/ManageUser.js';
import ManageMember from './member/ManageMember.js';



class AppContent extends React.Component {

    static contextType = AppContext;

    render() {
        return (
            <div className="App-content">
                <div className="App-content-body">
                    <AppSelectedContent name={this.context.appContent} />
                </div>
            </div>
        );
    }
}

function AppSelectedContent(props) {

    if (props.name === "Manage Churches") {
        return <ManageChurch/>
    }

    if (props.name === "Manage Users") {
        return <ManageUser/>
    }

    if (props.name === "Manage Members") {
        return <ManageMember/>
    }

    if (typeof props.name === null) {
        return (
            <p> Selected menu - {props.name} </p>
        );
    }

    return (
        <div>
            <h3> Mathew 25: 21 </h3>
            <p> His lord said unto him, Well done, thou good and faithful servant:
            thou hast been faithful over a few things, I will make thee ruler over many things:
            enter thou into the joy of thy lord. </p>

            <h3> 마태복음 25: 21 </h3>
            <p> 그 주인이 이르되 잘 하였도다 착하고 충성된 종아
             네가 작은 일에 충성하였으매 내가 많은 것으로 네게 맡기리니
             네 주인의 즐거움에 참예할찌어다 하고 </p>

            <h3> Lamentations 3: 21-23 </h3>
            <p> It is of the LORD's mercies that we are not consumed, because his compassions fail not.
                They are new every morning: great is thy faithfulness.</p>

            <h3> 예레미야애가 3: 21-23 </h3>
            <p> 여호와의 인자와 긍휼이 무궁하시므로 우리가 진멸되지 아니함이니이다
             이것들이 아침마다 새로우니 주의 성실하심이 크시도소이다 </p>
         </div>
    );
}

export default AppContent;
