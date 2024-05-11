import { Modal } from 'antd';
import React, { useState } from 'react'

const PopUpConfirm = ({title, text, handleConfirm }) => {
    
    const [isModalOpen, setIsModalOpen] = useState(true);

    const handleOk = () => {
        setIsModalOpen(false);
        handleConfirm()
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div>
            <Modal title={title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>{text}</p>
            </Modal>
        </div>
    )
}

export default PopUpConfirm