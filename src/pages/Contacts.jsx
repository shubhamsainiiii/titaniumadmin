/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */

import React, {
    useEffect,
    useState,
} from "react";

import ContactTable from "../components/ContactTable";

import api from "../services/api";

import toast from "react-hot-toast";

const Contacts = () => {

    const [contacts, setContacts] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const getContacts = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const { data } =
                await api.get(
                    "/contact/all",
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`,
                        },
                    }
                );

            setContacts(
                data.contacts
            );

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Failed To Load Contacts"
            );

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {

        getContacts();

    }, []);

    return (
        <div>
            {loading ? (

                <div className="text-center text-white py-20">
                    Loading Contacts...
                </div>

            ) : (

                <ContactTable
                    contacts={contacts}
                    getContacts={getContacts}
                />

            )}

        </div>
    );
};

export default Contacts;