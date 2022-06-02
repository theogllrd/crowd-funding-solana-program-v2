import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { WalletConnectedContext } from './../App';
import { getCampaign } from './../api/get-campaign';
import { Campaign } from './../models/Campaign';
import { deleteCampaign } from '../api/delete-campaign';

export default function CampaignPage() {

    const [campaign, setCampaign] = useState(null);
    const navigate = useNavigate();

    let campaignId = useParams().campaignId;

    const handleDeleteCampaign = async () => {
        // we call the function to delete the campaign from the blockchain
        await deleteCampaign(campaign);
        // we call the callback function to update the campaign list
        //props.getCampaignList();
        navigate('/home');
    }

    async function getData() {
        const gettedCampaign = await getCampaign(campaignId);

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

                        <WalletConnectedContext.Consumer>
                            {isWalletConnected => isWalletConnected ?
                                isWalletConnected == campaign.author ?
                                    <div>
                                        <button
                                            className="inline-flex items-center py-2 px-3 m-1 text-sm font-medium text-center text-white bg-green-500 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300">
                                            Withdraw all
                                        </button>
                                        <button
                                            onClick={handleDeleteCampaign}
                                            className="inline-flex items-center py-2 px-3 m-1 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300">
                                            Delete
                                        </button>
                                    </div> :
                                    <button
                                        className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                                        Donate
                                    </button> : null}
                        </WalletConnectedContext.Consumer>
                    </div>
                </div>
            </div>


            : null
    );
}