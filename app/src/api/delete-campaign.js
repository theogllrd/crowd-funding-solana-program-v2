import { getProgram } from './getProgram';

export const deleteCampaign = async (campaign) => {
    const program = getProgram();
    await program.rpc.deleteCampaign({
        accounts: {
            author: window.solana.publicKey,
            campaign: campaign.publicKey,
        },
    })
}