import { useEffect, useState, useContext } from 'react';
import StoreCard from './components/StoreCard';
import { StoreCategoryItemContainer } from '../../../styles/styled';
import { getSoftwares } from '../../../pages/api/firebase/store';

const Software = () => {
    const [software, setSoftware] = useState([]);

    useEffect(() => {
        softwares();
        async function softwares() {
            await getSoftwares(software, setSoftware);
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
