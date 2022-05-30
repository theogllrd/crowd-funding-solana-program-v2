import CampaignCard from "./CampaignCard";

export default function CampaignList() {

    let campainList = [{
        name: 'Hello1',
        description: 'desc1',
    },
    {
        name: 'Hello2',
        description: 'desc2',
    },
    {
        name: 'Hello3',
        description: 'desc3',
    },
    {
        name: 'Hello4',
        description: 'desc4',
    }];

    const listItems = campainList.map((campaign) =>
        <CampaignCard key={campaign.name} campaign={campaign} />
    );

    return (
        <div className="w-screen p-4 grid md:grid-cols-3 gap-4 sm:grid-cols-1">
            {listItems}
        </div >
    );
}