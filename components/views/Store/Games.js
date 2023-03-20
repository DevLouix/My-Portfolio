import { useEffect, useState, useContext } from 'react';
import { StoreCategoryItemContainer } from '../../../styles/styled';
import StoreCard from './components/StoreCard';
import { getGames } from '../../../pages/api/firebase/store';

const Games = () => {
    const [game, setGames] = useState([]);

    useEffect(() => {
        games();
        async function games(){
            await getGames(game,setGames)
        }
    }, []);
    return (
        <StoreCategoryItemContainer>
            {game.map((game) => (
                <StoreCard
                    storeCategory={1}
                    key={game.id}
                    title={game.title}
                    timestamp={game.timestamp}
                    imagelink={game.imagelink}
                    description={game.description}
                    download_link={game.download_link}
                />
            ))}
        </StoreCategoryItemContainer>
    );
};

export default Games;
