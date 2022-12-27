// @ts-ignore
import Modal from 'react-modal';
import {useState} from "react";
import {InfinitySpin} from "react-loader-spinner";

const customStyles = {
    overlay: {
        backgroundColor: "rgba(0,0,0,0.5)"

    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        width: '20%',
        minHeight: "30%",
        padding: 0,
        borderColor: "transparent",
        transform: 'translate(-50%, -50%)',
        backgroundColor: "transparent"
    },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

export default function LoadingModal(props: any) {
    const [modalIsOpen, setIsOpen] = useState(true);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Basket Modal"
            >
                <div style={{marginLeft: "auto", marginRight: "auto"}}>
                    <InfinitySpin
                        width='200'
                        color="#E55021"
                    />
                </div>

            </Modal>
        </div>
    );
}
