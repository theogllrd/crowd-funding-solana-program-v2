import { getProgram } from './getProgram';
import { Campaign } from './../models/Campaign';

export const getCampaign = async (publicKey) => {
    const program = getProgram();
    const account = await program.account.campaign.fetch(publicKey);
    return new Campaign(publicKey, account);
}