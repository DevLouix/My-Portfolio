import { useEffect, useState, useContext } from 'react';
import { StoreCategoryItemContainer } from '../../../styles/styled';
import StoreCard from './components/StoreCard';
import { getGames } from '../../../pages/api/firebase/store';
import { LoadingMode } from '../../../context/LoadingContext';

const Games = () => {
    const [game, setGames] = useState([]);
    const { setLoading } = useContext(LoadingMode);

    useEffect(() => {
        games();
        async function games() {
            setLoading(true);
            await getGames(game, setGames);
            setLoading(false);
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
