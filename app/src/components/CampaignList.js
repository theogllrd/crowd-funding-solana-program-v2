import CampaignCard from "./CampaignCard";
import React from 'react';

export default function CampaignList({ campaignList, getCampaignList }) {

    const listItems = campaignList.map((campaign, index) =>
        <CampaignCard key={index} campaign={campaign} getCampaignList={getCampaignList} />
    );

    return (
        <div className="w-screen p-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {listItems}
        </div >
    );
}