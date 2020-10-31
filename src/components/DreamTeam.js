import React from 'react';
import Friend from "./Friend";
import {friends} from "../utils/Constants"

const DreamTeam = () => {
    return (
        <section className="float-right w-50 row no-gutters border">
            <h2 className="col-12 text-center">Dream Team</h2>
            {friends.map((item, index) => {
                return <Friend picture={item} key={index} pos={index+1}/>
            })}
        </section>
    );
};

export default DreamTeam;