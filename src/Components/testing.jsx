import React, { useState, useEffect } from 'react';
import style from '../Components/DropdownForDeviceId/Dropdownfordeviceid.module.css';
import { RiDeleteBin5Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { IoIosArrowDropupCircle } from "react-icons/io";

import { IoIosArrowDropdownCircle } from "react-icons/io";


const DropdownWithEditDelete = ({ initialNames, onNamesChange, docId }) => {
    const [names, setNames] = useState(initialNames || []);
    const [editIndex, setEditIndex] = useState(null);
    const [editName, setEditName] = useState('');
    const [newName, setNewName] = useState(''); // State for new name input
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [addidstatus, setAddidstatus] = useState(false)

    // Synchronize state with props
    useEffect(() => {
        
        console.log(initialNames,"initialnames,initialnames")
        setNames(initialNames || []);
    }, [initialNames]);

    const handleDelete = (index) => {
        // Show confirmation dialog
        const isConfirmed = window.confirm("Are you sure you want to delete this ID?");

        // Proceed with deletion if confirmed
        if (isConfirmed) {
            const updatedNames = names.filter((_, i) => i !== index);
            setNames(updatedNames);
            onNamesChange(updatedNames, docId); // Notify parent component about the change
        }
    };

    const handleEditChange = (e) => {
        setEditName(e.target.value);
    };

    const handleSave = (index) => {
        const updatedNames = names.map((item, i) => i === index ? editName : item);
        setNames(updatedNames);
        setEditIndex(null);
        setEditName('');
        onNamesChange(updatedNames, docId); // Notify parent component about the change
    };

    const handleAddNewName = () => {
        if (newName.trim() !== '') {
            const updatedNames = [...names, newName];
            setNames(updatedNames);
            setNewName('');
            setAddidstatus(!addidstatus);
            onNamesChange(updatedNames, docId); // Notify parent component about the change
        }
    };

    return (
        <div>
            <div className={`${style.button_dropdown}`}
                onClick={() => setDropdownOpen(!dropdownOpen)}>
                <div className={`d-flex align-items-center`}>
                    <div style={{ width: '80px', overflow: 'hidden', marginRight: '4px' }}>{!dropdownOpen?names[0] || "Device id's":"Device Id's"}</div>
                    {!dropdownOpen ? <IoIosArrowDropdownCircle /> : <IoIosArrowDropupCircle />}

                </div>
            </div>
            {dropdownOpen && (
                <>
                    <ul className={`${style.uolist_style}`}>
                        {names.map((name, index) => (
                            <li key={index} className={`${style.list_style}`}>
                                {editIndex === index ? (
                                    <>
                                        <input type="text" value={editName} onChange={handleEditChange} />
                                        <button className={`${style.button_options}`} onClick={() => handleSave(index)}>Save</button>
                                    </>
                                ) : (
                                    <>
                                        {name}
                                        <div className='ms-2 d-flex gap-1'>
                                        
                                            <button className={`${style.button_options_one}`} onClick={() => { setEditIndex(index); setEditName(name); }}><FiEdit style={{ color: '#6A6A6A' }} /></button>
                                            <button className={`${style.button_options_one} ${style.danger}`} onClick={() => handleDelete(index)}> <RiDeleteBin5Line style={{ color: '#6A6A6A'}} /></button>
                                            
                                        </div>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                    {addidstatus ?
                        <div className="d-flex gap-2">
                            <input
                                type="text"
                                placeholder="Enter new ID"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                className={`${style.input_style}`}
                            />
                            <button className={`${style.button_options}`} onClick={handleAddNewName}>Add</button>
                        </div> : ""
                    }

                    <button className={`${style.add_id_button}`}
                        onClick={() => setAddidstatus(!addidstatus)}>{addidstatus?"Cancel":"Add id"}</button>

                </>

            )}

        </div>
    );
};

export default DropdownWithEditDelete;
