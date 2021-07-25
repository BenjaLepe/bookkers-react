import React from 'react';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        position: 'fixed',
        transform: 'translate(-50%, -50%)',
        zIndex: 1 /* Sit on top */,
        backgroundColor: '#fff' /* Black w/ opacity */,
        padding: '20px',
        borderRadius: '10px'
    },
    background: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 101 /* Sit on top */,
        display: 'flex',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.7)'
    }
};


function DeleteModal(props) {
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function handleDelete() {
        setIsOpen(false);
        props.handleDelete();
    }

    return (
        <div>
            <button className="delete" onClick={openModal}>Delete</button>
            { (modalIsOpen) ? (
            <div style={customStyles.background}>
                <div style={customStyles.content}>
                    <h2>¿Estás seguro que quieres eliminar el libro?</h2>
                    <div className="button-container">
                        <button className="cancelar" onClick={closeModal}>Cancelar</button>
                        <button className="delete" onClick={handleDelete}>Eliminar</button>
                    </div>
                </div>
            </div>
            ):null}
        </div>
    );
}

export default DeleteModal;