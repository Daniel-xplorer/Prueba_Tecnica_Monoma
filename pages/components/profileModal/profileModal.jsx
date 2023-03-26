import axios from 'axios';
import { useEffect, useState } from 'react';
import { closeLoading, openLoading } from '../loadingModal/loading';
import styles from './profileModal.module.css';

const ProfileModal = (props) => {
    const {
        open,
        logout
    } = props;
    const [state, setState] = useState({
        name: '',
        email: '',
        id : ''
    });
    useEffect(() => {
        openLoading();
        axios.get('/api/user').then((response) => {
            setState(response.data.user);
            closeLoading();
        });
        closeLoading();
    }, []);
    return (
        <div className={`${styles.modal} ${open && styles.open}`}>
            <div className={styles.name}>{state.name}</div>
            <div className={styles.text}>{state.email}</div>
            <div className={styles.text}>id: {state.id}</div>
            <button className={styles.logoutBtn} onClick={logout}>logout</button>
        </div>
    );
};

export default ProfileModal;