import React, { useState } from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Modal, ModalBody } from "reactstrap";
import { GoInfo } from "react-icons/go";

export const DeleteButton = ({ onDelete, display, confirmation, data, ...props }) => {

    let [dialog, setDialog] = useState(false)

    return (
        <>

            <DeleteOutlineIcon onClick={() => {
                confirmation ? setDialog(true) : onDelete(data ? data : null)
            }} {...props} className="pointer" />

            <Modal centered isOpen={dialog}>
                <ModalBody>
                    <div className='py-4'>
                        <div className='d-flex justify-content-center'>
                            <GoInfo className='text-danger' size={40} />
                        </div>
                        <div className='text-center mt-3'>Are you sure want to delete this {display}?</div>
                    </div>
                    <div className='d-flex justify-content-end gap-3'>
                        <button className='btn btn-sm border' onClick={() => {
                            setDialog(false)

                        }}>Cancel</button>
                        <button className='btn btn-sm btn-primary' onClick={() => {
                            onDelete(data ? data : null)
                            setDialog(false)
                        }}>Delete</button>
                    </div>
                </ModalBody>
            </Modal>

        </>
    )
}

