import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import hideIcon from "../public/assets/hidePass.png";
import openAlertModal from "./components/alert_modal/openAlertModal";
import { closeLoading, openLoading } from "./components/loadingModal/loading";
import styles from '../styles/login.module.css';
import Image from "next/image";

const Login = () => {
    const [showPass, setShowPass] = useState(false);
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const router = useRouter();
    const handleSubmit = async(e) => {
        e.preventDefault();
        openLoading();
        const verifyEmail = (email) => {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        };
        if (credentials.email === '') {
            openAlertModal('Error', 'Email is required');
            return false;
        }
        if (!verifyEmail(credentials.email)) {
            openAlertModal('Error', 'Email is invalid');
            return false;
        }
        if (credentials.password === '') {
            openAlertModal('Error', 'Password is required');
            return false;
        }
        try {
            const response = await axios.post('/api/login', credentials);
            router.push('/dashboard');
        } catch (error) {
            openAlertModal('Error', error.response.data.message);
        };
        closeLoading();
    };
    const handleChanges = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };
    const handleShowPass = () => {
        setShowPass(!showPass);
    };
    return (
        <div className={styles.loginContainer}>
            <div>
                <form action="login" onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" className={styles.input} onChange={handleChanges}/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <div className={styles.inputPassword}>
                            <input type={showPass ? 'text' : 'password'} name="password" id="password" className={styles.input} onChange={handleChanges}/>
                            <Image src={hideIcon} className={styles.iconHide} onClick={handleShowPass}/>
                        </div>
                    </div>
                    <div>
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;