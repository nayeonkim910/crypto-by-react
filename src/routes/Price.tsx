import { useQuery } from 'react-query';
import styled from 'styled-components';
import { fetchCoinPrice } from '../api';

interface PriceData{
    id:string;
    name:string;
    symbol:string;
    rank:number;
    circulating_supply:number;
    total_supply:number;
    max_supply:number;
    beta_value:number;
    first_data_at:string;
    last_updated:string;
    quotes:{
        USD:{
            ath_date:number;
            ath_price:number;
            market_cap: number;
            market_cap_change_24h:number;
            percent_change_1h:number;
            percent_change_1y:number;
            percent_change_6h:number;
            percent_change_7d:number;
            percent_change_12h:number;
            percent_change_15m:number;
            percent_change_24h:number;
            percent_change_30d:number;
            percent_change_30m:number;
            percent_from_price_ath:number;
            price:number;    
            volume_24h:number;    
            volume_24h_change_24h:number;    
        }
    };
    }
interface PriceProps {
    coinId:string;
}
const PriceContainer=styled.div`
    width: 600px;
    display: flex;
    flex-wrap: wrap;
    max-width: 700px;
    justify-content: center;
`
const ItemBox =styled.div`
    margin: 15px;
    padding:20px;
    display: flex;
    width: 30%;
    height: 110px;
    border-radius:20px;
    align-items: center;
    flex-direction: column;
    justify-content: space-evenly;
    font-size: 20px;
    font-weight: bold;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    color: ${(props)=>props.theme.accentColor};
    
`
const NameTag =styled.div`
    font-size: 18px;
    color: ${(props)=>props.theme.textColor};
`

export default function Price({coinId}:PriceProps) {
    const {isLoading, data}=useQuery<PriceData>(['coinPrice',coinId],()=>fetchCoinPrice(coinId),{refetchInterval:10000,});
    
    return (
        <>
        {isLoading
            ?'PriceData Loading.....'
            : (<PriceContainer>
                <ItemBox><NameTag>총시가</NameTag>${data?.quotes.USD.market_cap}</ItemBox>
                <ItemBox><NameTag>현 시세</NameTag>${data?.quotes.USD.price.toFixed(2)} </ItemBox>
                <ItemBox><NameTag>24H 거래량</NameTag>{data?.quotes.USD.volume_24h.toFixed(2)}</ItemBox>
                <ItemBox><NameTag>24H 거래 변동률</NameTag>{data?.quotes.USD.volume_24h_change_24h}% </ItemBox>
                <ItemBox><NameTag>1H ago</NameTag>{data?.quotes.USD.percent_change_1h}%</ItemBox>
                <ItemBox><NameTag> 24H ago</NameTag>{data?.quotes.USD.percent_change_24h}%</ItemBox>
              </PriceContainer>)
        }
        </>
    );
}

