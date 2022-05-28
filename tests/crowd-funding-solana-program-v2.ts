import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { CrowdFundingSolanaProgramV2 } from "../target/types/crowd_funding_solana_program_v2";
import * as assert from "assert";
import * as bs58 from "bs58";

describe("crowd-funding-solana-program-v2", () => {

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());
  const program = anchor.workspace.CrowdFundingSolanaProgramV2 as Program<CrowdFundingSolanaProgramV2>;


  it('can create a new campaign', async () => {
    // We generate a new keypair for our campaign account.
    const campaign = anchor.web3.Keypair.generate();

    await program.rpc.createCampaign('Computer for my son', 'Help me get a brand new laptop for my son', {
      accounts: {
        campaign: campaign.publicKey,
        author: program.provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      signers: [campaign],
    });
    // Fetch the account details of the created tweet.
    const campaignAccount = await program.account.campaign.fetch(campaign.publicKey);

    assert.equal(campaignAccount.author.toBase58(), program.provider.wallet.publicKey.toBase58());
    assert.equal(campaignAccount.name, 'Computer for my son');
    assert.equal(campaignAccount.description, 'Help me get a brand new laptop for my son');
    assert.equal(campaignAccount.amountDonated, 0);
  });


  it('can create a new campaign without name', async () => {
    // We generate a new keypair for our campaign account.
    const campaign = anchor.web3.Keypair.generate();

    await program.rpc.createCampaign('', 'Help me get a brand new laptop for my son', {
      accounts: {
        campaign: campaign.publicKey,
        author: program.provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      signers: [campaign],
    });
    // Fetch the account details of the created tweet.
    const campaignAccount = await program.account.campaign.fetch(campaign.publicKey);

    assert.equal(campaignAccount.author.toBase58(), program.provider.wallet.publicKey.toBase58());
    assert.equal(campaignAccount.name, '');
    assert.equal(campaignAccount.description, 'Help me get a brand new laptop for my son');
    assert.equal(campaignAccount.amountDonated, 0);
  });


  it('can create a new campaign from a different author', async () => {
    // We generate another user and airdrop them some SOL.
    const otherUser = anchor.web3.Keypair.generate();
    const signature = await program.provider.connection.requestAirdrop(otherUser.publicKey, 1000000000);
    await program.provider.connection.confirmTransaction(signature);

    // We generate a new keypair for our campaign account.
    const campaign = anchor.web3.Keypair.generate();

    await program.rpc.createCampaign('Computer for my son', 'Help me get a brand new laptop for my son', {
      accounts: {
        campaign: campaign.publicKey,
        author: otherUser.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      signers: [otherUser, campaign],
    });
    // Fetch the account details of the created tweet.
    const campaignAccount = await program.account.campaign.fetch(campaign.publicKey);

    assert.equal(campaignAccount.author.toBase58(), otherUser.publicKey.toBase58());
    assert.equal(campaignAccount.name, 'Computer for my son');
    assert.equal(campaignAccount.description, 'Help me get a brand new laptop for my son');
    assert.equal(campaignAccount.amountDonated, 0);
  });


  it('cannot provide a name with more than 50 characters', async () => {
    try {
      const campaign = anchor.web3.Keypair.generate();
      const nameWith51Chars = 'x'.repeat(51);
      await program.rpc.createCampaign(nameWith51Chars, 'Help me get a brand new laptop for my son', {
        accounts: {
          campaign: campaign.publicKey,
          author: program.provider.wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        },
        signers: [campaign],
      });
    } catch (error) {
      assert.equal(error.error.errorMessage, 'The provided name should be 50 characters long maximum.');
      return;
    }
    assert.fail('The instruction should have failed with a 51-character name.');


  });


  it('cannot provide a description with more than 280 characters', async () => {
    try {
      const campaign = anchor.web3.Keypair.generate();
      const descriptionWith51Chars = 'y'.repeat(281);
      await program.rpc.createCampaign('help my buy a new car', descriptionWith51Chars, {
        accounts: {
          campaign: campaign.publicKey,
          author: program.provider.wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        },
        signers: [campaign],
      });
    } catch (error) {
      assert.equal(error.error.errorMessage, 'The provided description should be 280 characters long maximum.');
      return;
    }
    assert.fail('The instruction should have failed with a 281-character description.');


  });


  it('can fetch all campaigns', async () => {
    const campaignAccounts = program.account.campaign.all();
    assert.equal((await campaignAccounts).length, 3)
  });


  it('can filter campaigns by author', async () => {
    const authorPublicKey = program.provider.wallet.publicKey;
    const campaignAccounts = program.account.campaign.all([
      {
        memcmp: {
          offset: 8, // author data in campaignAccount starts at byte 8.
          bytes: authorPublicKey.toBase58(),
        }
      }
    ]);
    assert.equal((await campaignAccounts).length, 2);
    assert.ok((await campaignAccounts).every(campaignAccount => {
      return campaignAccount.account.author.toBase58() == authorPublicKey.toBase58()
    }))
  });


  it('can filter campaigns by name', async () => {
    const campaignAccounts = program.account.campaign.all([
      {
        memcmp: {
          offset: 8 + // Discriminator.
            32 + // Author public key.
            4, // Topic string prefix.
          bytes: bs58.encode(Buffer.from('Computer for my son')),
        }
      }
    ]);
    assert.equal((await campaignAccounts).length, 2);
    assert.ok((await campaignAccounts).every(campaign => {
      return campaign.account.name === 'Computer for my son'
    }));
  });
});
