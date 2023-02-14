
const BASE_URL = 'https://api.coinpaprika.com/v1';
export async function fetchCoins(){
    const res = await fetch(`${BASE_URL}/coins`);
    return await res.json();
}
export  async function fetchCoinInfo(coinId:string){
    const res = await fetch(`${BASE_URL}/coins/${coinId}`);
    return await res.json();
} 
export  async function fetchCoinPrice(coinId:string){
    const res = await fetch(`${BASE_URL}/tickers/${coinId}`);
    return await res.json();
} 
export async function fetchCoinHistory(coinId:string){
    const res = await fetch(`https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`);
    return await res.json();

}