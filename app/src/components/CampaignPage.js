import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { getCampaign } from '../api/getCampaign';
import { Campaign } from './../models/Campaign';
import { deleteCampaign } from '../api/deleteCampaign';

export default function CampaignPage() {

    const [campaign, setCampaign] = useState(null);
    const navigate = useNavigate();

    const { connection } = useConnection();
    const wallet = useWallet();

    let campaignId = useParams().campaignId;

    const handleDeleteCampaign = async () => {
        // we call the function to delete the campaign from the blockchain
        await deleteCampaign(wallet, connection, campaign);
        navigate('/home');
    }

    async function getData() {
        const gettedCampaign = await getCampaign(wallet, connection, campaignId);

        const campaign = new Campaign(gettedCampaign.publicKey, gettedCampaign);
        setCampaign(campaign);
        console.log(campaign);
    }

    useEffect(() => {
        getData();
    }, [campaignId]);


    return (
        campaign ?
            <div className="w-screen p-5 gap-5 flex justify-center">
                <div className="max-w-sm rounded-lg border border-gray-200 shadow-md">
                    <div className="flex justify-center p-5">
                        <img className="rounded-lg" src={campaign.image_link} alt="" />
                    </div>
                    <div className="p-5">

                        <h5 className="break-words mb-2 text-2xl font-bold tracking-tight text-gray-900">
                            {campaign.name}
                        </h5>

                        <p className="break-words mb-3 font-normal text-gray-700">
                            {campaign.description}
                        </p>
                        <p className="break-words mb-3 font-normal text-gray-700">
                            Author: {campaign.author_display}
                        </p>
                        {wallet.connected ? wallet.publicKey.toBase58() == campaign.author ? <button
                            onClick={handleDeleteCampaign}
                            className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300">
                            Delete
                        </button>
                            :
                            <button
                                className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                                Donate
                            </button> : null}

                    </div>
                </div>
            </div>


            : null
    );
}