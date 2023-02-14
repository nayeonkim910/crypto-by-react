import {Switch,
        Route,
        useLocation,
        useParams,
        Link,
        useRouteMatch} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import styled from 'styled-components';
import Chart from './Chart';
import Price from './Price';
import { useQuery } from 'react-query';
import { fetchCoinInfo, fetchCoinPrice } from '../api';
import {MdOutlineArrowBackIosNew} from 'react-icons/md';
// import {BsFillSunFill} from 'react-icons/bs';
import {BsMoonStarsFill} from 'react-icons/bs';
const Title =styled.h1`
    font-size: 50px;
    margin-bottom: 10px;
    width: 90%;
    display: flex;
    justify-content: center;
    color: ${(props)=>props.theme.textColor};
    
`
const Container =styled.div`
    margin-top: 10px;
    display: flex;
    padding: 50px;
    flex-direction: column;
    max-height: 700px;
    
`;
const Header =styled.header`
    height: 10vh;
    display: flex;
    width: 90%;
    margin: auto;
    text-align: center;
    justify-content: center;
    align-items: center;
`;

const Loader = styled.span`
    text-align: center;
    display: block;
`
const DataContainer =styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-height: 500px;

`
const Statistics =styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px;
    min-width: 450px;
    align-items: center;

`
const DisplayInfoBox=styled.ul`
    width: 100%;
    color: ${(props)=>props.theme.textColor};
    display: flex;
    flex-direction: column;
    padding: 10px;
    font-weight: bold;
    margin: 10px;
    border-radius: 5px;
`
const SetBox=styled.div`
    display: flex;
    flex-wrap: wrap;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
    align-items: center;
    width: 100%;
    padding: 10px;
    justify-content: space-around;
    background-color:#75757520;
    max-width: 1200px;
    margin: 20px auto;
`
const Back =styled.p`
    font-size: 50px;
`
const InfoItem =styled.li`
    max-height: 700px;
    font-size: 15px;
    margin: 2px;
    background-color: #fffcfc71;
    border-radius: 5px;
    padding: 5px;
    display: flex;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    align-items: center;
    justify-content: space-around;
    span:first-child{
        font-size: 19px;
    }
`
const Txt = styled.div`
    border-radius: 5px;
    background-color: #fffcfc71;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

    font-size: 15px;
    padding: 5px;
    width: 100%;
    max-width: 400px;
    max-height: 250px;
    margin: 5px;
    text-align: center;
    overflow-y:scroll;
    &::-webkit-scrollbar {
   display: none;
   }
`
const Nav=styled.div`
    display: flex;
    max-width: 400px;
    justify-content: space-between;
    width: 100%;
    height: 60px;
    margin: 0px auto;
    padding: 5px;
`
const NavItem =styled.div<{isActive:boolean}>`
    padding: 5px;
    margin: 2px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    width: 40%;
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    border-radius: 5px;
    transition: transform 200ms ease-in;
    background-color: #ffffff63;
    color:${(props)=>props.isActive?props.theme.accentColor:props.theme.textColor};
    &:hover{
        background-color: black;
        color: wheat;
        transform: scale(1.1);
    }
`
const BtnTheme =styled.div`
    text-align: left;
    font-size: 30px;
    padding: 2px;
    margin-left: 10px;
    &:hover{
        color: gold;
        transform: scale(1.3);
        cursor: pointer;
        }
`
interface RouteParams {
    coinId:string;
}
interface RouteState{
    name:string
}

interface InfoData{
id: string;
name: string;
symbol: string;
rank: number;
is_new: boolean;
is_active: boolean;
type: string;
logo: string;
description: string;
message: string;
open_source: boolean;
started_at: string;
evelopment_status: string;
hardware_wallet: boolean;
proof_type: string;
org_structure: string;
hash_algorithm: string;
links: object;
links_extended: object;
whitepaper: object;
first_data_at: string;
last_data_at: string;
}

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

const LogoImg =styled.img`
    width: 45px;
    height: 45px;
    margin: 15px;
    background-color: transparent;
    border-radius: 100%;
`

export default function Coin(){
    const {coinId}= useParams<RouteParams>(); //url에서 가져옴
    const {state} = useLocation<RouteState>(); //Link to로 받은 state
    const {isLoading: infoLoading, data:infoData} = useQuery<InfoData>([coinId,'info'],()=>fetchCoinInfo(coinId));
    const {isLoading: priceLoading, data:priceData} = useQuery<PriceData>(
        [coinId,'price'],
        ()=>fetchCoinPrice(coinId),
        {refetchInterval:5000,});
    const priceMatch =useRouteMatch('/:coinId/price');
    const chartMatch =useRouteMatch('/:coinId/chart');
    const loading = infoLoading || priceLoading;
    return (
        <Container>
            <Helmet>
               <title>{state?.name? state.name: loading?'loading....': infoData?.name}</title> 
            </Helmet>
             <Header>
                 <Back><Link to={`/`}><MdOutlineArrowBackIosNew/></Link></Back>
                 <Title>
                    <LogoImg src={infoData?.logo} alt="" />
                    {state?.name? state.name: loading?'loading....': infoData?.name}
                 </Title>
                 {/* <BtnTheme><BsMoonStarsFill/></BtnTheme> */}
             </Header>
            {loading 
            ?<Loader>Loading....</Loader>
            :(
                 <SetBox>
                         <DataContainer>
                                 <DisplayInfoBox>
                                     <InfoItem>
                                         <span>Price:</span>
                                         <span>{priceData?.quotes.USD.price.toFixed(2)}</span>
                                     </InfoItem>
                                     <InfoItem>
                                         <span>Rank :</span>
                                         <span>{infoData?.rank}</span>
                                     </InfoItem>
                                     <InfoItem>
                                         <span>Symbol :</span>
                                         <span>{infoData?.symbol}</span>
                                      </InfoItem>
                                 </DisplayInfoBox>
                                 <DisplayInfoBox>
                                     <InfoItem>
                                         <span>Total Supply :</span>                    
                                         <span>{priceData?.total_supply}</span>
                                     </InfoItem>
                                     <InfoItem>
                                         <span>MAX Supply :</span>                    
                                         <span>{priceData?.max_supply}</span>
                                     </InfoItem>
                                 </DisplayInfoBox>
                                 <Txt>
                                 {infoData?.description || 'No description'}
                                </Txt>
                            </DataContainer>

                            <Statistics>    
                                <Nav>
                                   <NavItem isActive={chartMatch!==null}><Link to={`/${coinId}/chart`}>Chart</Link></NavItem>
                                   <NavItem isActive={priceMatch!==null}><Link to={`/${coinId}/price`}>Price</Link></NavItem>
                                </Nav>
                                <Switch>
                                    <Route path={`/:coinId/price`}>
                                        <Price coinId={coinId}/>
                                    </Route>
                                    <Route path={`/:coinId/chart`}>
                                        <Chart coinId={coinId}/>
                                    </Route>
                                </Switch>
                            </Statistics>
                 </SetBox>
            )}
       </Container>
    )
}
