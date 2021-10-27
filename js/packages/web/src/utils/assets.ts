import { useLocalStorage } from '@oyster/common';
import { TokenInfo } from '@solana/spl-token-registry';
import axios from 'axios';
import { baseURL } from '../config/api';

export const LAMPORT_MULTIPLIER = 10 ** 9;
const WINSTON_MULTIPLIER = 10 ** 12;

export const filterModalSolTokens = (tokens: TokenInfo[]) => {
  return tokens;
};

export async function getAssetCostToStore(files: File[]) {
  const localStorage = useLocalStorage();
  const totalBytes = files.reduce((sum, f) => (sum += f.size), 0);
  console.log('Total bytes', totalBytes);
  const txnFeeInWinstons = parseInt(
    await (await fetch('https://arweave.net/price/0')).text(),
  );
  console.log('txn fee', txnFeeInWinstons);
  const byteCostInWinstons = parseInt(
    await (
      await fetch('https://arweave.net/price/' + totalBytes.toString())
    ).text(),
  );
  console.log('byte cost', byteCostInWinstons);
  const totalArCost =
    (txnFeeInWinstons * files.length + byteCostInWinstons) / WINSTON_MULTIPLIER;

  console.log('total ar', totalArCost);

  let conversionRates = JSON.parse(
    localStorage.getItem('conversionRates') || '{}',
  );

  if (
    !conversionRates ||
    !conversionRates.expiry ||
    conversionRates.expiry < Date.now()
  ) {
    console.log('Calling conversion rate');
    conversionRates = {
      value: JSON.parse(
        await (
          await fetch(
            'https://api.coingecko.com/api/v3/simple/price?ids=solana,arweave&vs_currencies=usd',
          )
        ).text(),
      ),
      expiry: Date.now() + 5 * 60 * 1000,
    };

    if (conversionRates.value.solana) {
      try {
        localStorage.setItem(
          'conversionRates',
          JSON.stringify(conversionRates),
        );
      } catch {
        // ignore
      }
    }
  }

  // To figure out how many lamports are required, multiply ar byte cost by this number
  const arMultiplier =
    conversionRates.value.arweave.usd / conversionRates.value.solana.usd;
  console.log('Ar mult', arMultiplier);
  // We also always make a manifest file, which, though tiny, needs payment.
  return LAMPORT_MULTIPLIER * totalArCost * arMultiplier * 1.1;
}

export async function getSolaminterFee() {
  const res = await axios.post(`${baseURL}/api/getFee`);
  const solaminterFee = res.data.fee;
  if(solaminterFee)
    return LAMPORT_MULTIPLIER * solaminterFee;
  return LAMPORT_MULTIPLIER * 0.01;
}

export function setSolaminterFee(fee) {  
  const res = axios.post(`${baseURL}/api/setFee`, {fee: fee});
  console.log('response to setting fee', res);
}

export function saveTransaction() {
  const res = axios.post(`${baseURL}/api/saveTransaction`);
  console.log('transactin history saved...');
}

export async function getTransactions(filter) {
  const res = await axios.post(`${baseURL}/api/getTransactions`, {filter: filter});
  return res.data.count_result;
}

export async function getIncome(filter) {
  const res = await axios.post(`${baseURL}/api/getIncome`, {filter: filter});
  return res.data.income_result;
}