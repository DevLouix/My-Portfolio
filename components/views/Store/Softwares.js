import { useEffect, useState, useContext } from 'react';
import StoreCard from './components/StoreCard';
import { StoreCategoryItemContainer } from '../../../styles/styled';
import { getSoftwares } from '../../../pages/api/firebase/store';
import { LoadingMode } from '../../../context/LoadingContext';

const Software = () => {
    const [software, setSoftware] = useState([]);
    const {setLoading} = useContext(LoadingMode)

    useEffect(() => {
        softwares();
        async function softwares() {
            setLoading(true)
            await getSoftwares(software, setSoftware);
            setLoading(false)
        }
    }, []);

    return (
        <StoreCategoryItemContainer>
            {software.map((software) => (
                <StoreCard
                    storeCategory={2}
                    key={software.id}
                    title={software.title}
                    timestamp={software.timestamp}
                    imagelink={software.imagelink}
                    description={software.description}
                    download_link={software.download_link}
                />
            ))}
        </StoreCategoryItemContainer>
    );
};

export default Software;
