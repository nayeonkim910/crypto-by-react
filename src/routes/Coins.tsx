import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { fetchCoins } from '../api';
import { Helmet } from 'react-helmet';
import {BsMoonStarsFill} from 'react-icons/bs';
import {useSetRecoilState} from 'recoil';
import {isDarkAtom} from '../atoms';

    
const Title =styled.h1`
font-size: 60px;
font-weight: bold;
margin-bottom: 25px;
width: 100%;
color: ${(props)=>props.theme.textColor};
`

const Container =styled.div`
    margin: auto;
    display: flex;
    padding: 20px;
    flex-direction: column;
    align-items: center;
    max-width: 1200px;
    max-height: 900px;
`;

const Header =styled.header`
    height: 10vh;
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
`;

const CoinsList=styled.ul`
   &::-webkit-scrollbar {
   background-color: #2f3542;
   }
   &::-webkit-scrollbar-thumb {
     border-radius: 5px;
     background-color: ${(props)=>props.theme.accentColor};
    }
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    /* box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px; */
    overflow-y: scroll;
    margin-top: 10px ;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`;

const Img = styled.img`
    width: 55px;
    height: 55px;
    padding: 2px;
    margin: 70px auto;
    border-radius: 100%;
`
const Coin =styled.li`
    width:  150px;
    height: 150px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    background-color: #15141415;
    border-radius: 5px;
    color: ${(props)=>props.theme.textColor};
    margin: 5px;
    font-weight:bold;
    font-size: 15px;
    display: flex;
    flex-direction: column;
    text-align: center;
    position: relative;
    a{
        padding: 15px;
        transition: color 100ms ease-in;
        display: block;
        width: 100%;
        height: 100%;
        z-index: 3;
        position: absolute;
        background-color:transparent;
    }
    &:hover{
        a{
            background-color:#f2df0d4a ;
        }
        ${Img}{
            transform: scale(1.3);
            border: 2px solid gold;
        }
    }
`;
const BtnTheme =styled.button`
    font-size: 30px;
    background-color: transparent;
    padding: 5px;
    border: none;

    &:hover{
        color: gold;
        transform: scale(1.3);
        cursor: pointer;
        }
`

const Loader = styled.span`
    text-align: center;
    display: block;
`

interface ICoin{
    id:string,
    name:string,
    symbol:string,
    rank:number,
    is_new:boolean,
    is_active:boolean,
    tyle:string,
}

export default function Coins(){
    const {isLoading, data} =useQuery<ICoin[]>('allCoins',fetchCoins);
    const SetDarkMode = useSetRecoilState(isDarkAtom);
    const toggleDarkMode =()=>SetDarkMode(prev=>!prev);
    return(
        <>
        <Container>
            <Helmet>
                <title>CRYPTO 암호화폐</title>
            </Helmet>
            <Header>
                <Title>CRYPTO</Title>
                <BtnTheme onClick={toggleDarkMode}><BsMoonStarsFill/></BtnTheme>
            </Header>
           {isLoading?<Loader>Loading....</Loader>:( 
            <CoinsList>
            {data?.slice(0, 100).map((coin)=>(
                <Coin key={coin.id}> 
                    <Link to={{
                     pathname:`/${coin.id}`,
                     state:{name:coin.name},
                    }}>
                    {coin.name}
                    </Link>
                    <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} 
                    alt="" />
                </Coin>))}
            </CoinsList>)}
        </Container>
        </>
    )
}