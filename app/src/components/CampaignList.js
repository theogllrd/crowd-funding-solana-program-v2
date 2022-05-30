import CampaignCard from "./CampaignCard";
import React, { useEffect, useState } from 'react';
import { fetchCampaigns } from "./../api/fetch-campaigns";

import { WalletConnectedContext } from './../App';

export default function CampaignList() {

    const [campaignList, setCampaignList] = useState([]);

    const walletConnected = React.useContext(WalletConnectedContext);

    const listItems = campaignList.map((campaign, index) =>
        <CampaignCard key={index} campaign={campaign} />
    );

    const getCampaignList = async () => {
        console.log('Getting campaign list ...');
        try {
            fetchCampaigns().then((fetchedCampaigns => setCampaignList(fetchedCampaigns)));
        } catch (error) {
            console.log("Error in getting campaign list: ", error)
            setCampaignList(null);
        }
    }

    useEffect(() => {
        getCampaignList();
    }, [walletConnected]);

    return (
        <div className="w-screen p-4 grid md:grid-cols-3 gap-4 sm:grid-cols-1">
            {listItems}
        </div >
    );
}