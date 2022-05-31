import CampaignForm from './CampaignForm';
import CampaignList from './CampaignList';
import React, { useEffect, useState } from 'react';
import { fetchCampaigns } from "./../api/fetch-campaigns";

import { WalletConnectedContext } from './../App';

export default function PageHome() {

    const [campaignList, setCampaignList] = useState([]);
    const walletConnected = React.useContext(WalletConnectedContext);

    const getCampaignList = async () => {
        console.log('Getting campaign list ...');
        try {
            fetchCampaigns().then((fetchedCampaigns => setCampaignList(fetchedCampaigns)));
            console.log(campaignList);
        } catch (error) {
            console.log("Error in getting campaign list: ", error)
            setCampaignList(null);
        }
    }

    useEffect(() => {
        getCampaignList();
    }, [walletConnected]);

    const addCampaign = () => {
        getCampaignList();
    }

    return (
        <div className="flex">
            <CampaignList campaignList={campaignList} />
            <WalletConnectedContext.Consumer>
                {isWalletConnected => isWalletConnected ? (<CampaignForm classbackCampaignAdded={addCampaign} />) : null}
            </WalletConnectedContext.Consumer>
        </div >
    );
}