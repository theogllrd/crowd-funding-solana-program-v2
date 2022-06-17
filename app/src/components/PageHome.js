import CampaignForm from './CampaignForm';
import CampaignList from './CampaignList';
import React, { useEffect, useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import fetchCampaigns from '../api/fetchCampaigns';

export default function PageHome() {

    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const wallet = useWallet();

    const [campaignList, setCampaignList] = useState([]);

    const getCampaignList = async () => {
        console.log('Getting campaign list ...');
        try {
            fetchCampaigns(wallet, connection).then((fetchedCampaigns => setCampaignList(fetchedCampaigns)));
            console.log(campaignList);
        } catch (error) {
            console.log("Error in getting campaign list: ", error)
            setCampaignList(null);
        }
    }

    useEffect(() => {
        getCampaignList();
    }, [publicKey]);

    const addCampaign = () => {
        getCampaignList();
    }

    return (
        <div className="flex">
            <CampaignList campaignList={campaignList} getCampaignList={getCampaignList} />
            {publicKey ? (<CampaignForm classbackCampaignAdded={addCampaign} />) : null}
        </div >
    );
}