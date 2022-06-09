import { PublicKey } from '@solana/web3.js';
import { Program, AnchorProvider } from '@project-serum/anchor';
// import the idl file of our solana program
import idl from '../idl/crowd_funding_solana_program_v2.json';

// Controls how we want to acknowledge when a transaction is "done".
const preflightCommitment = 'processed'
const commitment = 'processed'

// Get our program's id from the IDL file.
const programID = new PublicKey(idl.metadata.address);

export default function GetProgram(wallet, connection) {
    const provider = new AnchorProvider(connection, wallet, { preflightCommitment, commitment })
    const program = new Program(idl, programID, provider)
    return program
}