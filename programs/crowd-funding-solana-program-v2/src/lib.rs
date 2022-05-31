use anchor_lang::prelude::*;

declare_id!("Go9AcEhLBcyF8i79tXPJRQJi2ETg8mKnSCxzVxpQejJP");

#[program]
pub mod crowd_funding_solana_program_v2 {
    use super::*;

    pub fn create_campaign(
        ctx: Context<CreateCampaign>,
        name: String,
        description: String,
    ) -> Result<()> {
        // We get all the account from the context.
        let campaign: &mut Account<Campaign> = &mut ctx.accounts.campaign;
        let author: &Signer = &ctx.accounts.author;

        // Guarding against invalid data.
        if name.chars().count() > 50 {
            return Err(ErrorCode::NameTooLong.into());
        }
        if description.chars().count() > 280 {
            return Err(ErrorCode::DescriptionTooLong.into());
        }

        // Set all the values in the campaign account.
        campaign.author = *author.key;
        campaign.name = name;
        campaign.description = description;
        campaign.amount_donated = 0;
        Ok(())
    }

    pub fn delete_campaign(ctx: Context<DeleteTweet>) -> Result<()> {
        Ok(())
    }
}

// Definition of the context.
#[derive(Accounts)]
pub struct CreateCampaign<'info> {
    #[account(init, payer = author, space = Campaign::LEN)]
    pub campaign: Account<'info, Campaign>, // means this is an account of type Campaign.
    #[account(mut)]
    pub author: Signer<'info>, // the signer of the transaction.
    pub system_program: Program<'info, System>, // the official System_Program.
}
#[derive(Accounts)]
pub struct DeleteTweet<'info> {
    #[account(mut, has_one = author, close = author)]
    pub campaign: Account<'info, Campaign>,
    pub author: Signer<'info>,
}

// Definition of the structure of the campaign account.
#[account]
pub struct Campaign {
    pub author: Pubkey,
    pub name: String,
    pub description: String,
    pub amount_donated: u64,
}

// Usefull constants for sizing properties.
const DISCRIMINATOR_LENGTH: usize = 8;
const PUBLIC_KEY_LENGTH: usize = 32;
const STRING_LENGTH_PREFIX: usize = 4; // Stores the size of the string.
const MAX_NAME_LENGTH: usize = 50 * 4; // 50 chars max for the campaign name.
const MAX_DESCRIPTION_LENGTH: usize = 280 * 4; // 280 chars max for the campaign description.
const MAX_AMOUNT_DONATED_LENGTH: usize = 8;

impl Campaign {
    const LEN: usize = DISCRIMINATOR_LENGTH
        + PUBLIC_KEY_LENGTH // Author.
        + STRING_LENGTH_PREFIX + MAX_NAME_LENGTH // Name.
        + STRING_LENGTH_PREFIX + MAX_DESCRIPTION_LENGTH // Description.
        + MAX_AMOUNT_DONATED_LENGTH; // Amount donated.
}

#[error_code]
pub enum ErrorCode {
    #[msg("The provided name should be 50 characters long maximum.")]
    NameTooLong,
    #[msg("The provided description should be 280 characters long maximum.")]
    DescriptionTooLong,
}
