import getProgram from './getProgram';
import { Campaign } from '../models/Campaign';

export const getCampaign = async (wallet, connection, publicKey) => {
    const program = getProgram(wallet, connection);
    const account = await program.account.campaign.fetch(publicKey);
    return new Campaign(publicKey, account);
}