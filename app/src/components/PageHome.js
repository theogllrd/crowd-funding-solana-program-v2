import CampaignForm from './CampaignForm';
import CampaignList from './CampaignList';

import { WalletConnectedContext } from './../App';

export default function PageHome() {
    return (
        <div className="flex">
            <CampaignList />
            <WalletConnectedContext.Consumer>
                {isWalletConnected => isWalletConnected ? (<CampaignForm />) : null}
            </WalletConnectedContext.Consumer>

        </div >
    );
}