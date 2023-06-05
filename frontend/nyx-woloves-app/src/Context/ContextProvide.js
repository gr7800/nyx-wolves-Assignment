import React, { createContext, useState } from 'react'

export const addData = createContext();
export const updateData = createContext();
export const deletData = createContext();


export const ContextProvider = ({ children }) => {
    const [userAdd, setUserAdd] = useState("");
    const [update, setUpdate] = useState("");
    const [deletdata, setDeletData] = useState(""); // corrected typo

    return (
        <div>
            <addData.Provider value={{ userAdd, setUserAdd }}> {/* updated property name */}
                <updateData.Provider value={{ update, setUpdate }}> {/* updated property name */}
                    <deletData.Provider value={{ deletdata, setDeletData }}> {/* corrected typo */}
                        {children}
                    </deletData.Provider> {/* corrected typo */}
                </updateData.Provider> {/* updated property name */}
            </addData.Provider> {/* updated property name */}
        </div>
    );
};
