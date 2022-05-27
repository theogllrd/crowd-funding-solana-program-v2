import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { CrowdFundingSolanaProgramV2 } from "../target/types/crowd_funding_solana_program_v2";

describe("crowd-funding-solana-program-v2", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.CrowdFundingSolanaProgramV2 as Program<CrowdFundingSolanaProgramV2>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
