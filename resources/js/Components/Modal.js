import React, { useContext, useState } from 'react';
import { Modal as AntdModal } from 'antd';
import { useTranslation } from 'react-i18next';

const ModalContext = React.createContext();

function Modal({ onOk = () => {}, onCancel = () => {}, children }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOk = () => {
        onOk();
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        onCancel();
        setIsModalOpen(false);
    };
    return (
        <ModalContext.Provider
            value={{ isModalOpen, setIsModalOpen, handleCancel, handleOk }}
        >
            <div>{children}</div>
        </ModalContext.Provider>
    );
}
const Trigger = ({ children }) => {
    const { setIsModalOpen } = useContext(ModalContext);
    return (
        <>
            <div onClick={() => setIsModalOpen(true)}>{children}</div>
        </>
    );
};

const Content = ({ children }) => {
    const { isModalOpen, handleCancel, handleOk } = useContext(ModalContext);
    const [t] = useTranslation();
    return (
        <AntdModal
            open={isModalOpen}
            onCancel={handleCancel}
            footer={
                <>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded"
                        onClick={handleOk}
                    >
                        {t('ok')}
                    </button>
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-2 rounded"
                        onClick={handleCancel}
                    >
                        {t('Cancel')}
                    </button>
                </>
            }
        >
            {children}
        </AntdModal>
    );
};

Modal.Trigger = Trigger;
Modal.Content = Content;

export default Modal;
