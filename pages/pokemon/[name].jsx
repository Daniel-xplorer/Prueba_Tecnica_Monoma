import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "../../styles/pokemon.module.css";

const Pokemon = (props) => {
    const {
        pokemon
    } = props;
    const router = useRouter();
    const { name } = router.query;
    const spriteNames = Object.keys(pokemon.sprites);
    return (
        <div className={styles.container}>
            <div>
                {
                    spriteNames.map((spriteName, index) => {
                        if (!pokemon.sprites[spriteName] || typeof pokemon.sprites[spriteName] === 'object' ) return;
                        console.log(spriteName, pokemon.sprites[spriteName]);
                        return (
                            <Image key={index} src={pokemon.sprites[spriteName]} alt={pokemon.name} width={150} height={150} className={styles.image}/>
                        );
                    })
                }
            </div>
            <div className={styles.list}>
                <div>
                    <span className={styles.title}>name: </span>
                    <span className={styles.title}>{pokemon.name}</span>
                </div>
                <div>
                    <span className={styles.title}>weight: </span>
                    <span className={styles.title}>{pokemon.weight}</span>
                </div>
                <div>
                    <span className={styles.title}>height: </span>
                    <span className={styles.title}>{pokemon.height}</span>
                </div>
                <div>
                    <span className={styles.title}>base experience: </span>
                    <span className={styles.title}>{pokemon.base_experience}</span>
                </div>
                <div>
                    <span className={styles.title}>abilities: </span>
                    <ul>
                        {
                            pokemon.abilities.map((ability, index) => {
                                return (
                                    <li key={index} className={styles.title}>{ability.ability.name}</li>
                                );
                            })
                        }
                    </ul>
                </div>
                <div >
                    <span className={styles.title}>moves: </span>
                    <ul>
                        {
                            pokemon.moves.map((move, index) => {
                                return (
                                    <li key={index} className={styles.title}>{move.move.name}</li>
                                );
                            })

                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

Pokemon.getInitialProps = async (ctx) => {
    const { name } = ctx.query;
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        return {
            pokemon: response.data
        };
    } catch (error) {
        console.log(error);
    };
    return {};
};

export default Pokemon;