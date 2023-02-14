import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import ApexCharts from 'react-apexcharts';
import {useRecoilValue} from 'recoil';
import {isDarkAtom} from '../atoms';
interface ChartProps {
    coinId: string;
}
interface IDataHistory{
    time_open: number;
    time_close: number;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    market_cap: number;
}
interface ChartBarData{
    time_close: number;
    open: string;
    high: string;
    low: string;
    close: string;
}


export default function Chart({coinId}:ChartProps) {
    const isDark=  useRecoilValue(isDarkAtom);
    
    const {isLoading,data}=useQuery<IDataHistory[]>(['coinHistory',coinId],()=>fetchCoinHistory(coinId),{
        refetchInterval:10000,
    });
    
    const CHART_DATA  = data?.map((data:ChartBarData)=>{
         return {x:data.time_close*1000, y:[data.open, data.high, data.low,data.close]}})
    return (
        <>
        <div>
            {isLoading 
            ?"Loading..."
            :<ApexCharts 
                type='candlestick'
                series={[
                    {
                        data : CHART_DATA
                    }
                ]as unknown as number []}
                options={{
                    theme:{ 
                        mode : isDark ? 'dark' :'light'
                    },
                    chart:{
                        type:'candlestick',
                        height:400,
                        width:400,
                        background:'transparent',
                        toolbar: {
                            autoSelected: 'pan',
                            show: false
                          },
                    },
                    grid:{
                        show:false
                    },
                    title:{
                        align:'left',
                    },
                    yaxis:{
                        show:false,
                    },
                    xaxis:{
                        labels:{
                            show:false,
                        },
                        type:'datetime',
                        },
                }}
            />}
        </div>
        </>
    );
}