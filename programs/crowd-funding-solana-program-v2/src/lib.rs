use anchor_lang::prelude::*;

declare_id!("Go9AcEhLBcyF8i79tXPJRQJi2ETg8mKnSCxzVxpQejJP");

#[program]
pub mod crowd_funding_solana_program_v2 {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
