import axios from "axios";
import { useRouter } from "next/router";
import openAlertModal from "./components/alert_modal/openAlertModal";
import { closeLoading, openLoading } from "./components/loadingModal/loading";
import styles from '../styles/dashboard.module.css';
import Card from "./components/cards/card";
import ProfileModal from "./components/profileModal/profileModal";
import { useEffect, useState } from "react";


const Dashboard = (props) => {
    const {
        pokemon
    } = props;

    const [currentPage, setCurrentPage] = useState(1);
    const [pokemones, setPokemones] = useState([]);
    useEffect(() => {
        if (pokemon.results.length > 0) {
            setPokemones(pokemon.results.slice(0, 4));
        };
    }, [pokemon]);
    const nextHandler = () => {
        const totalItems = pokemon.results.length;
        const nextPage = currentPage + 1;
        const firstIndex = nextPage * 4;
        if (firstIndex === totalItems) return;
        const lastIndex = firstIndex + 4;
        const newPokemones = pokemon.results.slice(firstIndex, lastIndex);
        setPokemones(newPokemones);
        setCurrentPage(nextPage);
    };
    const prevHandler = () => {
        const prevPage = currentPage - 1;
        if (prevPage === 0) return;
        const firstIndex = prevPage * 4;
        const lastIndex = firstIndex + 4;
        const newPokemones = pokemon.results.slice(firstIndex, lastIndex);
        setPokemones(newPokemones);
        setCurrentPage(prevPage);
    };
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const handleLogout = async (e) => {
        e.preventDefault();
        openLoading();
        try {
            const response = await axios.post('/api/logout');
            router.push('/login');
        } catch (error) {
            openAlertModal('Error', error.response.data.message);
        };
        closeLoading();
    };
    const handleOpen = e => {
        e.preventDefault();
        setOpen(!open);
    };
    return (
        <div>
            <div className={styles.header }>
                <ProfileModal logout={handleLogout} open={open}/>
                <button onClick={handleOpen} className={styles.logoutBtn}>Profile</button>
            </div>
            <div className={styles.center}>
                {
                    pokemones.map((pokemon, index) => {
                        return (<Card key={index} pokemon={pokemon}/>);
                    })
                }
            </div>
            <div className={styles.footer}>
                <button onClick={prevHandler}>Prev</button>
                <button onClick={nextHandler}>Next</button>
            </div>
        </div>
    );
};

Dashboard.getInitialProps = async (ctx) => {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
    return {
        pokemon: response.data
    };
};

export default Dashboard;