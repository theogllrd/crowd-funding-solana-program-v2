import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { Program, AnchorProvider } from '@project-serum/anchor';

// import the idl file of our solana program
import idl from '../idl/crowd_funding_solana_program_v2.json';
// Set our network to devnet.
const network = clusterApiUrl('devnet');

// Controls how we want to acknowledge when a transaction is "done".
const preflightCommitment = 'processed'
const commitment = 'processed'

// Get our program's id from the IDL file.
const programID = new PublicKey(idl.metadata.address);

export const getProgram = () => {
    const wallet = window.solana | undefined
    //const connection = new Connection('http://127.0.0.1:8899', commitment)
    const connection = new Connection(network, commitment)
    const provider = new AnchorProvider(connection, wallet, { preflightCommitment, commitment })
    const program = new Program(idl, programID, provider)
    return program
}