import { Campaign } from '../models/Campaign';
import getProgram from './getProgram'

async function fetchCampaigns(wallet, connection) {
    const program = getProgram(wallet, connection);
    const campaigns = await program.account.campaign.all();
    return campaigns.map(campaign => new Campaign(campaign.publicKey, campaign.account));
}

export default fetchCampaigns;