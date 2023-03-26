import styles from "./Loading.module.css";

const Loading = (props) => {
    const {
        isOpen
    } = props;
    return (
        <div className={`${styles.container} ${isOpen && styles.open}`} id='loading'>
            <div className={styles.back}>
                <div className={styles.center}></div>
            </div>
        </div>
    );
};

export default Loading;