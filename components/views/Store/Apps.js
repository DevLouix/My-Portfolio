import { useContext, useEffect, useState } from 'react';
import StoreCard from './components/StoreCard';
import { StoreCategoryItemContainer } from '../../../styles/styled';
import { getApps } from '../../../pages/api/firebase/store';

const Apps = () => {
    const [app, setApp] = useState([]);

    useEffect(() => {
        Apps();
        async function Apps() {
            await getApps(app, setApp);
        }
    }, []);

    return (
        <StoreCategoryItemContainer id="store_item_container">
            {app.map((app) => (
                <StoreCard
                    storeCategory={0}
                    key={app.id}
                    title={app.title}
                    timestamp={app.timestamp}
                    imagelink={app.imagelink}
                    description={app.description}
                    download_link={app.download_link}
                />
            ))}
        </StoreCategoryItemContainer>
    );
};

export default Apps;
