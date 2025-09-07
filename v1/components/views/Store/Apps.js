import { useContext, useEffect, useState } from 'react';
import StoreCard from './components/StoreCard';
import { StoreCategoryItemContainer } from '../../../styles/styled';
import { getApps } from '../../../pages/api/firebase/store';
import { LoadingMode } from '../../../context/LoadingContext';

const Apps = () => {
    const [app, setApp] = useState([]);
    const {setLoading} = useContext(LoadingMode)

    useEffect(() => {
        Apps();
        async function Apps() {
            setLoading(true)
            await getApps(app, setApp);
            setLoading(false)
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
