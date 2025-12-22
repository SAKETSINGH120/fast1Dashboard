import React, { useState } from 'react';
import style from '../Components/DropdownForDeviceId/Dropdownfordeviceid.module.css'

const DropdownWithEditDelete = () => {
    const initialNames = ['Alice', 'Bob', 'Charlie'];
    const [names, setNames] = useState(initialNames);
    const [editIndex, setEditIndex] = useState(null);
    const [editName, setEditName] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleDelete = (index) => {
        setNames(names.filter((_, i) => i !== index));
    };

    const handleEditChange = (e) => {
        setEditName(e.target.value);
    };

    const handleSave = (index) => {
        const newNames = names.map((item, i) => i === index ? editName : item);
        setNames(newNames);
        setEditIndex(null);
        setEditName('');
    };

    return (
        <div>
            <div className={`${style.button_dropdown}`}
                onClick={() => setDropdownOpen(!dropdownOpen)}>
                Device ids
            </div>
            {dropdownOpen && (
                <ul className={`${style.uolist_style}`}>
                    {names.map((name, index) => (
                        <li key={index}
                            className={`${style.list_style}`}>
                            {editIndex === index ? (
                                <>
                                    <input type="text" value={editName} onChange={handleEditChange} />
                                    <button className={`${style.button_options}`}
                                        onClick={() => handleSave(index)}>Save</button>
                                </>
                            ) : (
                                <>
                                    {name}
                                    <div className='d-flex gap-2'>
                                        <button className={`${style.button_options}`} onClick={() => { setEditIndex(index); setEditName(name); }}>Edit</button>
                                        <button className={`${style.button_options}`}
                                            onClick={() => handleDelete(index)}>Delete</button>
                                    </div>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            )}


        </div>
    );
};

export default DropdownWithEditDelete;

