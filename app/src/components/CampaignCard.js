import { WalletConnectedContext } from './../App';
import { deleteCampaign } from '../api/delete-campaign';

export default function CampaignCard(props) {

    const { name, description, amount_donated, author } = props.campaign;

    const handleDeleteCampaign = async () => {
        // we call the function to delete the campaign from the blockchain
        await deleteCampaign(props.campaign);
        // we call the callback function to update the campaign list
        props.getCampaignList();
    }


    return (
        <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <img className="rounded-t-lg" src="https://cache.marieclaire.fr/data/photo/w1000_ci/1bj/cagnotte-en-ligne.jpg" alt="" />
            </a>
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{description}</p>
                <WalletConnectedContext.Consumer>
                    {isWalletConnected => isWalletConnected ?
                        isWalletConnected == author ?
                            <a
                                onClick={handleDeleteCampaign}
                                className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Delete
                            </a> :
                            <a
                                className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Donate
                            </a> : null}
                </WalletConnectedContext.Consumer>
            </div>
        </div>
    );
}