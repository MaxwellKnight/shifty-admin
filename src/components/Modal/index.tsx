import { ReactNode } from 'react'
import './_modal.scss'

const Modal = ({ children, closeModal }: { children: ReactNode, closeModal: () => void }) => {
    return (
        <div className="modal">
            <div className="modal__container">
                <button className='btn' onClick={closeModal}>סגור</button>
                {children}
            </div>
        </div>
    )
}

export default Modal