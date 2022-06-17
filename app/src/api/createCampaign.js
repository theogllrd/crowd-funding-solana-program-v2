import { web3 } from '@project-serum/anchor'
import { Campaign } from '../models/Campaign'
import getProgram from './getProgram';

export const createCampaign = async (wallet, connection, name, description, image_link) => {

    const program = getProgram(wallet, connection);

    // Generate a new Keypair for our new campaign account.
    const campaign = web3.Keypair.generate();

    // Send a "createCampaign" instruction with the right data and the right accounts.
    try {
        await program.rpc.createCampaign(name, description, image_link, {
            accounts: {
                author: wallet.publicKey,
                campaign: campaign.publicKey,
                systemProgram: web3.SystemProgram.programId,
            },
            signers: [campaign]
        });

    } catch (error) {
        alert(error);
    }

    // Fetch the newly created account from the blockchain.
    const campaignAccount = await program.account.campaign.fetch(campaign.publicKey);

    // Wrap the fetched account in a Campaign model so our frontend can display it.
    return new Campaign(campaign.publicKey, campaignAccount);
}