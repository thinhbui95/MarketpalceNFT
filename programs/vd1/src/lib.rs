use anchor_lang::prelude::*;
use anchor_lang::solana_program::{
    instruction::{
      Instruction,
    },
    program::{
      invoke,
      invoke_signed,
    },
  };
use anchor_spl::token::{Token, Mint, TokenAccount};
use mpl_token_metadata::instruction::{create_metadata_accounts_v3,create_master_edition_v3,mint_new_edition_from_master_edition_via_token};


use spl_token::{
    ID as TOKEN_PROGRAM_ID,
  };

declare_id!("35TKZPztLWEgif2x6RAYKTR5Tkqa7euB19sYSqrC3M6c");
#[derive(AnchorSerialize, AnchorDeserialize, Default)]
pub struct TransferTokenParams {
    pub instruction: u8,
    pub amount: u64,
}


fn transfer_token<'a>(
    amount: u64,
    from: &AccountInfo<'a>,
    to: &AccountInfo<'a>,
    authority: &AccountInfo<'a>,
    signer_seeds:  &[&[&[u8]]]
) -> std::result::Result<(), ProgramError> {
    let data = TransferTokenParams {
        instruction: 3,
        amount,
      };
      let instruction = Instruction {
        program_id : TOKEN_PROGRAM_ID,
        accounts: vec![
            AccountMeta::new(*from.key,false),
            AccountMeta::new(*to.key, false),
            AccountMeta::new(*authority.key, true)
        ],
        data : data.try_to_vec().unwrap(),
      };
      if signer_seeds.len() == 0 {
        invoke(&instruction, &[from.clone(), to.clone(), authority.clone()])
      }
      else {
        invoke_signed(&instruction, &[from.clone(), to.clone(), authority.clone()], &signer_seeds)
      }
}

#[program]
pub mod vd1 {
    use super::*;

    pub fn mint_nft(
        ctx: Context<MintNFT>,
        name: String,
        symbol: String,
        uri: String,
        seller_fee_basis_points: u16,
        max_supply: u64,
    ) -> std::result::Result<(), ProgramError> {
        msg!("Nft token minting:");
        
        let accounts = vec![
            ctx.accounts.token_metadata_account.clone(),
            ctx.accounts.mint.clone(),
            ctx.accounts.mint_authority.to_account_info(),
            ctx.accounts.payer.to_account_info(),
            ctx.accounts.update_authority.to_account_info(),
            ctx.accounts.system_program.to_account_info(),
        ];

        let creator = vec![
            mpl_token_metadata::state::Creator {
                address: ctx.accounts.mint_authority.key().clone(),
                verified: false,
                share: 100,
            }
        ];

        let instruction = create_metadata_accounts_v3(
            ctx.accounts.token_metadata_program.key().clone(),
            ctx.accounts.token_metadata_account.key().clone(),
            ctx.accounts.mint.key().clone(),
            ctx.accounts.mint_authority.key().clone(),
            ctx.accounts.payer.key().clone(),
            ctx.accounts.update_authority.key().clone(),
            name,
            symbol,
            uri,
            Some(creator),
            seller_fee_basis_points,
            false,
            false,
            None,
            None,
            None,
        );

        invoke(&instruction, &accounts)?;

        let accounts_master_edition = vec![
            ctx.accounts.master_edition_account.clone(),
            ctx.accounts.mint.clone(),
            ctx.accounts.update_authority.to_account_info(),
            ctx.accounts.mint_authority.to_account_info(),
            ctx.accounts.payer.to_account_info(),
            ctx.accounts.token_metadata_account.clone(),
            ctx.accounts.token_program.to_account_info(),
            ctx.accounts.system_program.to_account_info()
        ];

        let instruction_master_edition = create_master_edition_v3(
            ctx.accounts.token_metadata_program.key().clone(),
            ctx.accounts.master_edition_account.key().clone(),
            ctx.accounts.mint.key().clone(),
            ctx.accounts.update_authority.key().clone(),
            ctx.accounts.mint_authority.key().clone(),
            ctx.accounts.token_metadata_account.key().clone(),
            ctx.accounts.payer.key().clone(),
            Some(max_supply)
        );
        invoke(&instruction_master_edition, &accounts_master_edition)?;

        Ok(())
    }

    pub fn print_nft(ctx: Context<PrintNFT>, amount: u64) -> std::result::Result<(), ProgramError> {
        let accounts_print = vec![
            ctx.accounts.new_token_metadata_account.clone(),
            ctx.accounts.new_token_edition_account.clone(),
            ctx.accounts.master_edition_account.clone(),
            ctx.accounts.new_mint.clone(),
            ctx.accounts.edition_marker.clone(),
            ctx.accounts.new_mint_authority.to_account_info(),
            ctx.accounts.payer.to_account_info(),
            ctx.accounts.token_account_owner.to_account_info(),
            ctx.accounts.token_account.clone(),
            ctx.accounts.new_metadata_authority.clone(),
            ctx.accounts.token_metadata_account.clone(),
            ctx.accounts.token_program.to_account_info(),
            ctx.accounts.system_program.to_account_info()
        ];

        let instruction_print = mint_new_edition_from_master_edition_via_token(
            ctx.accounts.token_metadata_program.key().clone(),
            ctx.accounts.new_token_metadata_account.key().clone(),
            ctx.accounts.new_token_edition_account.key().clone(),
            ctx.accounts.master_edition_account.key().clone(),
            ctx.accounts.new_mint.key().clone(),
            ctx.accounts.new_mint_authority.key().clone(),
            ctx.accounts.payer.key().clone(),
            ctx.accounts.token_account_owner.key().clone(),
            ctx.accounts.token_account.key().clone(),
            ctx.accounts.new_metadata_authority.key().clone(),
            ctx.accounts.token_metadata_account.key().clone(),
            ctx.accounts.metadata_mint.key().clone(),
            amount
        );
        invoke(&instruction_print, &accounts_print)?;
        Ok(())

    }

    pub fn init_marketplace(ctx:Context<InitMarket>,owner: Pubkey) -> Result<()>{
        let pool = &mut ctx.accounts.market;
        pool.mint_nft_pool = ctx.accounts.mint_nft_pool.key();
        pool.token_fee = ctx.accounts.mint_price.key();
        pool.owner = owner;



        Ok(())

    }
  
    pub fn list_nft(ctx:Context<ListNFT>, price:u64) -> Result<()>{
        ctx.accounts.price_nft.price = price;
        transfer_token(
            1,
            &ctx.accounts.token_account_nft_user.to_account_info(),
            &ctx.accounts.token_account_nft_pool.to_account_info(),
            &ctx.accounts.user.to_account_info(),
            &[],
        ).expect("transfer fail");
        Ok(())
    }
    
    pub fn buy_nft(ctx:Context<buyNft>,_bump: u8) -> Result<()>{
        let price  = &ctx.accounts.price_nft.price;
        let pool = &ctx.accounts.market;
        let owner = pool.owner;
        let mint_nft_pool = pool.mint_nft_pool;
        let mint_price = pool.token_fee;
        transfer_token(
            *price,
            &ctx.accounts.token_account_buyer.to_account_info(),
            &ctx.accounts.token_account_seller.to_account_info(),
            &ctx.accounts.buyer.to_account_info(),
            &[],
        ).expect("transfer fail");

        let seed : &[&[u8]] = &[
            b"marketplace_nft".as_ref(), 
            mint_nft_pool.as_ref(), 
            mint_price.as_ref(),
            owner.as_ref(),
            &[_bump]];

        transfer_token(
            1,
            &ctx.accounts.token_account_nft_market.to_account_info(),
            &ctx.accounts.token_account_nft_buyer.to_account_info(),
            &ctx.accounts.market.to_account_info(),
            &[&seed],
            ).expect("transfer fail");
            Ok(())
        }
    
    pub fn remove_nft(ctx:Context<RemoveNFT>,_bump: u8) -> Result<()>{
        let pool = &ctx.accounts.market;
        let owner = pool.owner;
        let mint_nft_pool = pool.mint_nft_pool;
        let mint_price = pool.token_fee;
        let seed : &[&[u8]] = &[
            b"marketplace_nft".as_ref(), 
            mint_nft_pool.as_ref(), 
            mint_price.as_ref(),
            owner.as_ref(),
            &[_bump]];
        transfer_token(
            1,
            &ctx.accounts.token_account_nft_pool.to_account_info(),
            &ctx.accounts.token_account_nft_user.to_account_info(),
            &ctx.accounts.market.to_account_info(),
            &[&seed],
        ).expect("transfer fail");
        Ok(())
    }
}


#[account]
#[derive( Default)]
pub struct Market {
    mint_nft_pool: Pubkey,
    token_fee: Pubkey,
    owner: Pubkey

}

#[account]
#[derive( Default)]
pub struct PriceNft {
    price: u64
}

#[derive(Accounts)]
pub struct InitMarket<'info> {
    #[account(
        init,
        payer = payer,
        seeds=[b"marketplace_nft".as_ref(),mint_nft_pool.key().as_ref(),mint_price.key().as_ref(),payer.key().as_ref()],
        bump,
        space = 32 + 32 + 32 + 8,
    )]
    market: Account<'info, Market>,
    
    //Token account of pool including nft
    #[account(
        init,
        payer = payer,
        seeds=[b"account nft".as_ref(),mint_nft_pool.key().as_ref(),mint_price.key().as_ref(), payer.key().as_ref()],
        bump,
        token::mint = mint_nft_pool,
        token::authority = market,
    )]
    token_account_nft: Account<'info, TokenAccount>,
    //Mint account of nft
    #[account(mut)]
    mint_nft_pool: Account<'info, Mint>,
    //Mint of token used for payment
    #[account(mut)]
    mint_price: Account<'info, Mint>,
    #[account(mut)]
    payer: Signer<'info>,
    system_program: Program<'info, System>,
    token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct ListNFT<'info> {
    #[account(mut)]
    mint_nft_pool: Account<'info, Mint>,
    #[account(
        mut,
        has_one = mint_nft_pool.key()  ,
        has_one = token_fee.key() ,
    )]
    market: Account<'info, Market>,
    #[account(mut)]
    /// CHECK: This is not dangerous because we don't read or write from this account
    token_fee: AccountInfo<'info>,

    #[account(
        mut,
        constraint=token_account_nft_pool.owner == market.key() ,
        constraint=token_account_nft_pool.mint == mint_nft_pool.key(),
    )]
    token_account_nft_pool:Account<'info, TokenAccount>,

    #[account(
        mut,
        constraint=token_account_nft_user.owner == user.key() ,
        constraint=token_account_nft_user.mint == mint_nft_pool.key(),
    )]
    token_account_nft_user: Account<'info, TokenAccount>,
    #[account(mut)]
    user: Signer<'info>,
    #[account(
        init,
        payer = user,
        space = 8 + 8,
    )]
    price_nft: Account<'info, PriceNft>,
    system_program: Program<'info, System>,
    token_program: Program<'info, Token>,

}


#[derive(Accounts)]
pub struct RemoveNFT<'info> {
    #[account(mut)]
    mint_nft_pool: Account<'info, Mint>,
    #[account(
        mut,
        has_one = mint_nft_pool.key()  ,
        has_one = token_fee.key() ,
    )]
    market: Account<'info, Market>,
    #[account(mut)]
    /// CHECK: This is not dangerous because we don't read or write from this account
    token_fee: AccountInfo<'info>,

    #[account(
        mut,
        constraint=token_account_nft_pool.owner == market.key() ,
        constraint=token_account_nft_pool.mint == mint_nft_pool.key(),
    )]
    token_account_nft_pool:Account<'info, TokenAccount>,

    #[account(
        mut,
        constraint=token_account_nft_user.owner == user.key() ,
        constraint=token_account_nft_user.mint == mint_nft_pool.key(),
    )]
    token_account_nft_user: Account<'info, TokenAccount>,
    #[account(mut)]
    user: Signer<'info>,
    #[account(mut)]
    price_nft: Account<'info, PriceNft>,
    system_program: Program<'info, System>,
    token_program: Program<'info, Token>,

}
#[derive(Accounts)]
pub struct buyNft<'info>{
    #[account(mut)]
    buyer: Signer<'info>,
    #[account(mut)]
    mint_nft_pool: Box<Account<'info, Mint>>,
    #[account(
        mut,
        has_one = mint_nft_pool.key(),
        has_one = token_fee.key(),
    )]
    market: Box<Account<'info, Market>>,
    #[account(mut)]
    token_fee: Box<Account<'info, Mint>>,
    #[account(mut)]
    price_nft: Box<Account<'info, PriceNft>>,
    #[account(
        mut,
        constraint=token_account_seller.mint == token_fee.key(),
        constraint = token_account_seller.owner == market.owner ,
    )]
    token_account_seller: Account<'info, TokenAccount>,

    #[account(
        mut,
        constraint=token_account_buyer.owner == buyer.key(),
        constraint=token_account_buyer.mint == token_fee.key(),
    )]
    token_account_buyer: Account<'info, TokenAccount>,
    #[account(
        mut,
        constraint=token_account_nft_market.mint == mint_nft_pool.key(),
        constraint=token_account_nft_market.owner == market.key(),
    )]
    token_account_nft_market: Account<'info, TokenAccount>,
    #[account(
        mut,
        constraint=token_account_nft_buyer.mint == mint_nft_pool.key(),
        constraint=token_account_nft_buyer.owner == buyer.key(),
    )]
    token_account_nft_buyer: Account<'info, TokenAccount>,
    system_program: Program<'info, System>,
    token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct MintNFT<'info> {
    #[account(mut)]
    pub mint_authority: Signer<'info>,
     /// CHECK: This is not dangerous because we don't read or write from this account
     #[account(mut)]
    pub mint: AccountInfo<'info>,
    /// CHECK: This is not dangerous because we don't read or write from this account
    pub token_metadata_program: AccountInfo<'info>,
    pub token_program:Program<'info,Token>,
     /// CHECK: This is not dangerous because we don't read or write from this account
    #[account(mut)]
    token_metadata_account: AccountInfo<'info>,
     /// CHECK: This is not dangerous because we don't read or write from this account
    #[account(mut)]
    master_edition_account: AccountInfo<'info>,
    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info, System>,
     #[account(mut)]
    pub update_authority: Signer<'info>,
 
}

#[derive(Accounts)]
pub struct PrintNFT<'info> {
    /// CHECK: This is not dangerous because we don't read or write from this account
    #[account(mut)]
    new_token_metadata_account: AccountInfo<'info>,
    /// CHECK: This is not dangerous because we don't read or write from this account
    #[account(mut)]
    new_token_edition_account: AccountInfo<'info>,    
    /// CHECK: This is not dangerous because we don't read or write from this account
    #[account(mut)]
    master_edition_account: AccountInfo<'info>,
    /// CHECK: This is not dangerous because we don't read or write from this account
    #[account(mut)]
    new_mint: AccountInfo<'info>,
    #[account(mut)]
    new_mint_authority:  Signer<'info>,
    #[account(mut)]
    payer: Signer<'info>,
    #[account(mut)]
    token_account_owner: Signer<'info>,
    /// CHECK: This is not dangerous because we don't read or write from this account
    #[account(mut)]
    token_account: AccountInfo<'info>,
    /// CHECK: This is not dangerous because we don't read or write from this account
    #[account(mut)]
    new_metadata_authority: AccountInfo<'info>,
    /// CHECK: This is not dangerous because we don't read or write from this account
    #[account(mut)]
    token_metadata_account: AccountInfo<'info>,
    /// CHECK: This is not dangerous because we don't read or write from this account
    #[account(mut)]
    metadata_mint: AccountInfo<'info>,
    /// CHECK: This is not dangerous because we don't read or write from this account
    #[account(mut)]
    edition_marker: AccountInfo<'info>,
    /// CHECK: This is not dangerous because we don't read or write from this account
    token_metadata_program: AccountInfo<'info>,
    system_program: Program<'info, System>,
    token_program: Program<'info, Token>,

    
}
























