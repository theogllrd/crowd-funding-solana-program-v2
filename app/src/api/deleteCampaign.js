import getProgram from './getProgram';

export const deleteCampaign = async (wallet, connection, campaign) => {
    const program = getProgram(wallet, connection);
    await program.rpc.deleteCampaign({
        accounts: {
            author: wallet.publicKey,
            campaign: campaign.publicKey,
        },
    })
}