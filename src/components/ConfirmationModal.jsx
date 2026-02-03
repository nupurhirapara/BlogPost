import './ConfirmationModal.css';

const ConfirmationModal=({
    titlemodal,descmodal,onConfirm,onClose,confirmBtnText,
})=>{

    

    return(
        <>
        <div className='modal-backdrop'>
            <div className='modal'>
                <h2>{titlemodal}</h2>
                <p>{descmodal}</p>

                <div className='modal-actions'>
                    <button className='btn3 btn-cancel' onClick={onClose}>Cancel</button>
                    <button className='btn3 btn-delete' onClick={onConfirm}>{confirmBtnText}</button>
                </div>
            </div>
        </div>
        </>
    )
}
export default ConfirmationModal;