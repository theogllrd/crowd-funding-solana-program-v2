import { web3 } from '@project-serum/anchor'
import { Campaign } from './../models/Campaign'
import { getProgram } from './getProgram';

// 1. Define the CreateCampaign endpoint.
export const CreateCampaign = async (name, description, image_link) => {

    const program = getProgram();

    // Generate a new Keypair for our new campaign account.
    const campaign = web3.Keypair.generate()

    // Send a "createCampaign" instruction with the right data and the right accounts.
    try {
        await program.rpc.createCampaign(name, description, image_link, {
            accounts: {
                author: window.solana.publicKey,
                campaign: campaign.publicKey,
                systemProgram: web3.SystemProgram.programId,
            },
            signers: [campaign]
        });

    } catch (error) {
        alert(error);
    }

    // Fetch the newly created account from the blockchain.
    const campaignAccount = await program.account.campaign.fetch(campaign.publicKey)

    // Wrap the fetched account in a Campaign model so our frontend can display it.
    return new Campaign(campaign.publicKey, campaignAccount)
}