const anchor = require('@project-serum/anchor');
const {solanaWeb3 ,clusterApiUrl,Connection}= require("@solana/web3.js")
import { PublicKey } from "@solana/web3.js";
import {SolanaConfigService} from "@coin98/solana-support-library/config"
import { createMint, getOrCreateAssociatedTokenAccount, mintTo, getAccount } from '@solana/spl-token';
const { SystemProgram } = anchor.web3;


let wallet = anchor.web3.Keypair.generate();
let connection = new Connection(clusterApiUrl("devnet"));
import {
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
before(async () => {
  wallet = await SolanaConfigService.getDefaultAccount()
  console.log(wallet.publicKey.toString())
})
describe('implement' ,() => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.Vd1;

  const TOKEN_METADATA_PROGRAM_ID = new anchor.web3.PublicKey(
    "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
  );

  it("mintNFT" , async () => {
    //Create token mint nft
    // const mint_nft = await createMint(
    //   connection,
    //   wallet,
    //   wallet.publicKey,
    //   wallet.publicKey,
    //   0
    // );
    // console.log("mintAccount_nft:" , mint_nft)

    const mint_nft = new anchor.web3.PublicKey("2EDy4jJeddBVtPJbs6nQa3Ms2NHcvCCdtvKqqysR98KP")
      console.log("mintAccount_nft:" , mint_nft)

    // //Create token account x
    // const tokenAccount_nft = await getOrCreateAssociatedTokenAccount(
    //   connection,
    //   wallet,
    //   mint_nft,
    //   wallet.publicKey
    // )
    // console.log("tokenAccount_nft" , tokenAccount_nft.address.toBase58())
    // const tokenAccount_nft = new anchor.web3.PublicKey("7YH8juk1HCfbRpW3LTKutGtHanU3rMjqrKVYxF35DZEQ")
    const tokenAccount_nft = new anchor.web3.PublicKey("DgcVaDN27smqX11eq1nhZFrh4fKzyF4LoetW6knxBurm")
    console.log("tokenAccount_nft:" , tokenAccount_nft)

    //Mint token x for user
    // await mintTo(
    //   connection,
    //   wallet,
    //   mint_nft,
    //   tokenAccount_nft,
    //   wallet,
    //   new anchor.BN(1)
    // )
    //check balance token x
    // const tokenAccountInfo_x = await getAccount(
    //   connection,
    //   tokenAccount_nft
    // )
    // console.log("tokenAccount_nft:" , tokenAccountInfo_x.amount);

    

    //Create token used for payment
    // const mint_price = await createMint(
    //   connection,
    //   wallet,
    //   wallet.publicKey,
    //   wallet.publicKey,
    //   9
    // );
    // console.log("mint_price:" , mint_price)

    const mint_price = new anchor.web3.PublicKey("BUAs2JDXcnPBU1Kj5AekbRLZCvH49JYyKUFQSbTTR2oP")
    console.log("mint_price:" , mint_price)

    //   //Create token account x
    // const tokenAccount_price = await getOrCreateAssociatedTokenAccount(
    //   connection,
    //   wallet,
    //   mint_price,
    //   wallet.publicKey
    // )
    // console.log("tokenAccount_price" , tokenAccount_price.address.toBase58())

    const tokenAccount_price = new anchor.web3.PublicKey("69JgrY427Jj5o2g312VtTGW6mmWAffNUzSPapjkviUtc")
    console.log("tokenAccount_price:" , tokenAccount_price)

    //Mint tokenAccount_price for user
    // await mintTo(
    //   connection,
    //   wallet,
    //   mint_price,
    //   tokenAccount_price,
    //   wallet,
    //   new anchor.BN(1000000000000000)
    // )
    // //check balance token x
    // const tokenAccountInfo_price = await getAccount(
    //   connection,
    //   tokenAccount_price
    // )
    // console.log("tokenAccount_price:" , tokenAccountInfo_price.amount);



    //Create token metaaccount 
    // const [pda_meta_account, _bump_meta] = await PublicKey.findProgramAddressSync([Buffer.from("metadata"),TOKEN_METADATA_PROGRAM_ID.toBuffer(),mint_nft.toBuffer()],TOKEN_METADATA_PROGRAM_ID);
    // const [pda_master_edition_account, _bump_master] = await PublicKey.findProgramAddressSync([Buffer.from("metadata"),TOKEN_METADATA_PROGRAM_ID.toBuffer(),mint_nft.toBuffer(),Buffer.from("edition")],TOKEN_METADATA_PROGRAM_ID);
    // try {
    // const tx =await program.rpc.mintNft(
    //   "hello".toString(),
    //   "HLL".toString(),
    //   "https://raw.githubusercontent.com/Thinhbp/nft/main/1.json?token=GHSAT0AAAAAAB7J7DJEFSGGJV3UWX7NY6QGY75QZ3Q".toString(),
    //   new anchor.BN(600),
    //   new anchor.BN(10),
    //   {
    //     accounts:{
    //       mintAuthority: wallet.publicKey,
    //       mint: mint_nft,
    //       tokenMetadataProgram:TOKEN_METADATA_PROGRAM_ID,
    //       tokenProgram: TOKEN_PROGRAM_ID,
    //       tokenMetadataAccount: pda_meta_account,
    //       masterEditionAccount: pda_master_edition_account,
    //       payer: wallet.publicKey,
    //       systemProgram: SystemProgram.programId,
    //       updateAuthority:wallet.publicKey

    //     },
    //     signer:[wallet,wallet],
    //   });
    //   console.log("tokenMetadataAccount :" ,pda_meta_account);
    //   console.log("masterEditionAccount :" ,pda_master_edition_account);
    // } catch (error) {
    //   console.log(error)
    // }

    const token_Metadata_Account = new anchor.web3.PublicKey("RVijNFQsZW88YmmpS8tLLKmMDrkKeMseJuLtAgrreDa")
    console.log("token_Metadata_Account:" , token_Metadata_Account)

    const master_Edition_Account = new anchor.web3.PublicKey("6jdXzXYzUWHCkFSs5dp55gaGkKGUpNxiPFFiEMW5kPqw")
    console.log("master_Edition_Account:" , master_Edition_Account)

    //Create new Metadata
    const [pda_new_meta_account, _bump_meta] = await PublicKey.findProgramAddressSync([Buffer.from("metadata"),TOKEN_METADATA_PROGRAM_ID.toBuffer(),mint_nft.toBuffer()],TOKEN_METADATA_PROGRAM_ID);
    //Create new Edition
    const [pda_new_edition_account, _bump_edition] = await PublicKey.findProgramAddressSync([Buffer.from("metadata"),TOKEN_METADATA_PROGRAM_ID.toBuffer(),mint_nft.toBuffer(),Buffer.from("edition")],TOKEN_METADATA_PROGRAM_ID);
    //Create Edition Mark Pda
    const amount = new anchor.BN(10)
    const [pda_edition_mark_account, _bump_mark] = await PublicKey.findProgramAddressSync([Buffer.from("metadata"),TOKEN_METADATA_PROGRAM_ID.toBuffer(),master_Edition_Account.toBuffer(),Buffer.from("edition"),Buffer.from([amount%248])],TOKEN_METADATA_PROGRAM_ID);
    //Create new_mint
    // const new_mint = await createMint(
    //   connection,
    //   wallet,
    //   wallet.publicKey,
    //   wallet.publicKey,
    //   0
    // );
    // const new_mint = new anchor.web3.PublicKey("BSXH2ed1X2zVtUK9smt79KxsMtESJbKCux3dE7u7og6m")
    // console.log("new_mint_nft:" , new_mint)


    // try {
    //   await program.rpc.printNft(
    //     amount,
    //     {
    //       accounts:{
    //         newTokenMetadataAccount: pda_new_meta_account,
    //         newTokenEditionAccount: pda_new_edition_account,
    //         masterEditionAccount:master_Edition_Account,
    //         newMint: new_mint,
    //         newMintAuthority: wallet.publicKey,
    //         payer: wallet.publicKey,
    //         tokenAccountOwner: wallet.publicKey,
    //         tokenAccount: tokenAccount_nft,
    //         newMetadataAuthority:wallet.publicKey,
    //         tokenMetadataAccount:token_Metadata_Account,
    //         metadataMint: mint_nft,
    //         editionMarker: pda_edition_mark_account,
    //         systemProgram: SystemProgram.programId,
    //         tokenProgram: TOKEN_PROGRAM_ID,
    //         tokenMetadataProgram:TOKEN_METADATA_PROGRAM_ID,
            
    //       },
    //       signer:[wallet,wallet,wallet],
    //     });
    //     console.log("pda_new_meta_account :" ,pda_new_meta_account);
    //     console.log("pda_new_edition_account :" ,pda_new_edition_account);
    //     console.log("pda_edition_mark_account :" ,pda_edition_mark_account);
    // } catch (error) {
    //   console.log(error)
    // }

    //Create market 
    const [pda_market, bump1] = await PublicKey.findProgramAddressSync([Buffer.from("marketplace_nft"),mint_nft.toBuffer(),mint_price.toBuffer(), wallet.publicKey.toBuffer()],program.programId);
    // const [pda_token_account_nft, bump2] = await PublicKey.findProgramAddressSync([Buffer.from("account nft"),mint_nft.toBuffer(),mint_price.toBuffer(),wallet.publicKey.toBuffer()],program.programId);
    // try {
    //   await program.rpc.initMarketplace(
    //     wallet.publicKey,
    //     {
    //       accounts: {
    //         market: pda_market,
    //         tokenAccountNft:pda_token_account_nft,
    //         mintNftPool: mint_nft,
    //         mintPrice: mint_price,
    //         payer: wallet.publicKey,
    //         systemProgram: SystemProgram.programId,
    //         tokenProgram: TOKEN_PROGRAM_ID
    //       },
    //       signer:[wallet],
    //     });
    //       console.log("pda_market :" ,pda_market);
    //       console.log("pda_token_account_nft :" ,pda_token_account_nft);
    // }catch (error) {
    //   console.log(error);
    // }

    // const pda_market_new = new anchor.web3.PublicKey("BpLbtBRQTUi3KhYPkTkRTF17bQuUbVtss5ZkM3foEe7S");
    // const pda_token_account_nft =  new anchor.web3.PublicKey("7k1rXm5qxoRvRnLmBzAgWMRDpGDk4B7YkVrAhi9i22xC");

    const pda_market_new = new anchor.web3.PublicKey("83Hh2HBkyJL6CinHgNjqP3Q4BJwmSMqmfLa8NWbzuFi4");
    const pda_token_account_nft =  new anchor.web3.PublicKey("2n5Qr3AyRoQFeSQ3vjAviWZoym4gv1eiv9k2A5TfE3bn");
    console.log("pda_market :" ,pda_market);
    console.log("pda_token_account_nft :" ,pda_token_account_nft);
    // const price_nft = anchor.web3.Keypair.generate();

    // try {
    //   await program.rpc.listNft(
    //      new anchor.BN(1),
    //      {
    //       accounts: {
    //         mintNftPool:mint_nft,
    //         market:pda_market,
    //         tokenFee:mint_price,
    //         tokenAccountNftPool:pda_token_account_nft,
    //         tokenAccountNftUser: tokenAccount_nft,
    //         user: wallet.publicKey,
    //         priceNft: price_nft.publicKey,
    //         systemProgram: SystemProgram.programId,
    //         tokenProgram: TOKEN_PROGRAM_ID

    //       },
    //       signers:[wallet,price_nft],
    //      });
    //      console.log("price_nft:", price_nft.publicKey)
    // }catch (error){
    //   console.log(error);
    // }



    const price_nft = new anchor.web3.PublicKey("64sUUsUWLrZ1WsuypenjYcQiLzGSLtqyJKQnJmQhcMU5");

    // let buyer = new anchor.web3.PublicKey("DkC3kCYBu8B7cMQCjQqyr8i3Kw1MYLSewBgzMewY6Sov");;
    // console.log("walle_buyer:", buyer)



    // const token_account_nft_buyer = new anchor.web3.PublicKey("DgcVaDN27smqX11eq1nhZFrh4fKzyF4LoetW6knxBurm");
    // const token_account_fee_buyer = new anchor.web3.PublicKey("6px33U1VieLyYYkFxFuYEPcCforA4YZjn5Fvei3mkxct");
    // try{
    //   await program.rpc.buyNft(
    //     bump1,
    //     {
    //       accounts:{
    //         buyer: wallet.publicKey,
    //         mintNftPool: mint_nft,
    //         market:pda_market_new,
    //         tokenFee: mint_price,
    //         priceNft: price_nft,
    //         tokenAccountSeller: tokenAccount_price,
    //         tokenAccountBuyer:token_account_fee_buyer,
    //         tokenAccountNftMarket:pda_token_account_nft,
    //         tokenAccountNftBuyer:token_account_nft_buyer ,
    //         systemProgram: SystemProgram.programId,
    //         tokenProgram: TOKEN_PROGRAM_ID

    //       },
    //       signer:[wallet],
    //     });
    //   } catch (error){
    //     console.log(error);
    //   }

    try {
      await program.rpc.removeNft(
        bump1,
         {
          accounts: {
            mintNftPool:mint_nft,
            market:pda_market,
            tokenFee:mint_price,
            tokenAccountNftPool:pda_token_account_nft,
            tokenAccountNftUser: tokenAccount_nft,
            user: wallet.publicKey,
            priceNft: price_nft,
            systemProgram: SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID

          },
          signer:[wallet],
         });
    }catch (error){
      console.log(error);
    }
    
    })
});



