import CampaignCard from "./CampaignCard";
import React from 'react';

export default function CampaignList({ campaignList, getCampaignList }) {

    const listItems = campaignList.map((campaign, index) =>
        <CampaignCard key={index} campaign={campaign} getCampaignList={getCampaignList} />
    );

    return (
        <div className="w-screen p-4 grid md:grid-cols-3 gap-4 sm:grid-cols-1">
            {listItems}
        </div >
    );
}