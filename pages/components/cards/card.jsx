import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from './card.module.css';

const Card = (props) => {
    const {
        pokemon
    } = props;
    const router = useRouter();
    const [state, setState] = useState({
        sprites: {},
        moves: [{move: {}},{move: {}}]
    });
    useEffect(() => {
        axios.get(pokemon.url).then((response) => {
            setState(response.data);
        });
    }, []);
    const handleCardClick = () => {
        router.push(`/pokemon/${pokemon.name}`);
    };
    return (
        <div className={styles.card} onClick={handleCardClick}>
            <div className={styles.header}>
                <Image src={state.sprites.front_default} alt={pokemon.name} width={150} height={150} className={styles.image}/>
                <div className={styles.weight}>weight: {state.weight}kg</div>
            </div>
            <div className={styles.content}>
                <span className={styles.title}>{pokemon.name}</span>
                <div className={styles.tagCon}>
                    <span className={styles.tag}>#{state.moves[0].move.name}</span>
                    <span className={styles.tag}>#{state.moves[1].move.name}</span>
                </div>
            </div>
        </div>
    );
};

export default Card;