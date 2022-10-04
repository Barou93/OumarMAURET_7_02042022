
import { useState } from "react";
import Follower from "../Profil/Follower";
import Following from "../Profil/Following";

import Activites from "./Post/Activites";

function Tabs() {
    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
    };

    return (
        <div>
            <div >
                <button
                    className={toggleState === 1 ? "tabs__button active" : "tabs__button"}
                    onClick={() => toggleTab(1)}
                >
                    Activités
                </button>
                <button
                    className={toggleState === 2 ? "tabs__button active" : "tabs__button"}
                    onClick={() => toggleTab(2)}
                >
                    Followers
                </button>
                <button
                    className={toggleState === 3 ? "tabs__button active" : "tabs__button"}
                    onClick={() => toggleTab(3)}
                >
                    Abonnements
                </button>
            </div>

            <div>
                <div
                >
                    <Activites />
                </div>

                <div
                    className={toggleState === 2 ? "content  active-content" : "content"}
                >
                    <Follower />

                </div>

                <div
                    className={toggleState === 3 ? "content  active-content" : "content"}
                >
                    <Following />

                </div>
            </div>
        </div>
    );
}

export default Tabs;

