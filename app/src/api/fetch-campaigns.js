import { getProgram } from './getProgram';
import { Campaign } from './../models/Campaign';

export const fetchCampaigns = async (filters = []) => {
    const program = getProgram();
    const campaigns = await program.account.campaign.all();
    return campaigns.map(campaign => new Campaign(campaign.publicKey, campaign.account));
}