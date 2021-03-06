import { useState } from 'react';
import { createCampaign } from '../api/createCampaign';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

export default function CampaignForm({ classbackCampaignAdded }) {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image_link, setImageLink] = useState('');

    const { connection } = useConnection();
    const wallet = useWallet();

    const handleNameChange = event => {
        setName(event.target.value);
    };

    const handleDescriptionChange = event => {
        setDescription(event.target.value);
    };

    const handleimageLinkChange = event => {
        setImageLink(event.target.value);
    };

    const createNewCampaign = async event => {
        event.preventDefault();
        if (name) {
            // create the campaign in the blockchain
            await createCampaign(wallet, connection, name, description, image_link);

            // update campaignList
            classbackCampaignAdded();

            // set all the form inputs to blank
            setName('');
            setDescription('');
            setImageLink('');
        }
    };


    return (
        <>
            <div className="w-fit md:pt-4 pr-4">
                <div className="mt-5 md:mt-0 md:col-span-2">
                    <form>
                        <div className="shadow sm:rounded-md sm:overflow-hidden">
                            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">

                                <label htmlFor="campaign-name" className="block text-sm font-medium text-gray-700">
                                    Name of the campaign
                                </label>
                                <div className="mt-1 flex rounded-md shadow-sm">
                                    <input
                                        value={name}
                                        onChange={handleNameChange}
                                        type="text"
                                        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300 empty:border-red-500"
                                        placeholder="Why do you need money ?"

                                    />
                                </div>

                                <div>
                                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                                        Description for the campaign
                                    </label>
                                    <div className="mt-1">
                                        <textarea
                                            value={description}
                                            onChange={handleDescriptionChange}

                                            rows={6}
                                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                            placeholder="Tells use more about the project..."
                                        />
                                    </div>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Brief description for your campaign. URLs are hyperlinked.
                                    </p>
                                </div>

                                <div>
                                    <label htmlFor="campaign_image_link" className="block text-sm font-medium text-gray-700">
                                        Url of the picture
                                    </label>
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                        <input
                                            value={image_link}
                                            onChange={handleimageLinkChange}
                                            type="url"
                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                                            placeholder="https://"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-3 text-right sm:px-6">
                                <button
                                    onClick={createNewCampaign}
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Create Campaign
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}