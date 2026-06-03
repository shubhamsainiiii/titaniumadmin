/* eslint-disable no-unused-vars */

import React from "react";

const ContactTable = ({
    contacts,
}) => {

    return (
        <div className="overflow-x-auto bg-[#111827] border border-white/10 rounded-3xl">

            <table className="w-full text-white">

                <thead>

                    <tr>

                        <th className="p-5 text-left">
                            Name
                        </th>

                        <th className="p-5 text-left">
                            Email
                        </th>

                        <th className="p-5 text-left">
                            Phone
                        </th>

                        <th className="p-5 text-left">
                            Message
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {contacts.map((item) => (

                        <tr
                            key={item._id}
                            className="border-b border-white/5"
                        >

                            <td className="p-5">
                                {item.name}
                            </td>

                            <td className="p-5">
                                {item.email}
                            </td>

                            <td className="p-5">
                                {item.phone}
                            </td>

                            <td className="p-5">
                                {item.message}
                            </td>

                        </tr>
                    ))}

                </tbody>

            </table>

        </div>
    );
};

export default ContactTable;