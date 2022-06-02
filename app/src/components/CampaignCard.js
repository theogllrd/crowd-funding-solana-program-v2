import { WalletConnectedContext } from './../App';
import { deleteCampaign } from '../api/delete-campaign';
import { Link } from "react-router-dom";

export default function CampaignCard(props) {

    const { name, description, amount_donated, author, publicKey, image_link } = props.campaign;


    const handleDeleteCampaign = async () => {
        // we call the function to delete the campaign from the blockchain
        await deleteCampaign(props.campaign);
        // we call the callback function to update the campaign list
        props.getCampaignList();
    }

    return (
        <div className="relative max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
            <div className="flex justify-center p-5">
                <Link
                    to={`/campaign/${publicKey}`}
                    key={name}
                >
                    <img className="rounded-lg" src={image_link} alt="" />
                </Link>
            </div>

            <div className="p-5">
                <Link
                    to={`/campaign/${publicKey}`}
                    key={name}
                >
                    <h5 className="break-words mb-2 text-clip overflow-hidden text-2xl font-bold tracking-tight text-gray-900 ">
                        {name}
                    </h5>
                </Link>
                <p className="break-words mb-10 font-normal text-gray-700">
                    {description.slice(0, 100) + '...'}
                </p>
                <div className="absolute bottom-5 right-5">
                    <WalletConnectedContext.Consumer>
                        {isWalletConnected => isWalletConnected ?
                            isWalletConnected == author ?
                                <button
                                    onClick={handleDeleteCampaign}
                                    className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300">
                                    Delete
                                </button>
                                :
                                <button
                                    className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                                    Donate
                                </button> : null}
                    </WalletConnectedContext.Consumer>
                </div>
            </div>
        </div>
    );
}