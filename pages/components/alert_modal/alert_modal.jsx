import styles from './alert_modal.module.css';

const AlertModal = ({ open, title, message, onConfirm }) => {
    return (
        <div className={`${styles.alertModal} ${styles[open]}`} id='alert-modal'>
            <div className={styles.alertContainer}>
                <h1 id='modal-title'>{title}</h1>
                <p id='modal-body'>{message}</p>
                <div id='modal-footer'>
                    <button onClick={onConfirm}>OK</button>
                </div>
            </div>
        </div>
    );
};

export default AlertModal;