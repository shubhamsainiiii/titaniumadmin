/* eslint-disable no-unused-vars */

import React from "react";

import ContactTable from "../components/ContactTable";

const Contacts = () => {

    const contacts = [
        {
            _id: 1,

            name: "Shubham",

            email: "shubham@gmail.com",

            phone: "9876543210",

            message: "Need Product Details",
        },
    ];

    return (
        <div>

            <h2 className="text-4xl font-bold text-white mb-10">

                Contacts

            </h2>

            <ContactTable
                contacts={contacts}
            />

        </div>
    );
};

export default Contacts;