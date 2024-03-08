import React, { useEffect, useState } from 'react'
import { useTableDataQuery } from '../api/features/api/feedApi';
import { useGetPlatFormQuery, useGetCategoriesQuery } from '../api/features/api/feedApi'; 
import { useSelector, useDispatch } from 'react-redux';
import { setCategory } from '../api/slices/feedSlice';

const MainTable = () => {

    
    const [equity, setequity] = useState(0)
    // const [feed, setFeed] = useState(0)
    const [tableActive, setTableActive] = useState(1)

    const per_side_data = useSelector(state => state.headFeed.per_side_contract)

    const totalPrice = () => {
        const prices = per_side_data?.map((item) => item.price)
        const total = prices.reduce((acc, curr) => acc + curr)
        return total ? total : 0;
    }

    const selected_cat = useSelector(state => state.headFeed.category_id)


    
    const equity_id = useSelector(state => state.headFeed.equity)
    const feed_data = useSelector(state => state.headFeed.data_feed)
    // const platform_id = useSelector(state => state.headFeed.platform)
    const version_id = useSelector(state => state.headFeed.version)
    // const subscription_id = useSelector(state => state.headFeed.subscription)

    const dispatch = useDispatch()
    
    const {data} = useTableDataQuery({b : feed_data, c: selected_cat, d: version_id})

    //api get all catgories
    const {data : categories} = useGetCategoriesQuery()

    // console.log('cate', categories);

    const [tableDataList, setTableDataList] = useState({
        stock_index: [], 
        currencies: [],
        energies: [],
        metals: [],
        financials: [],
        grains: [],
        softs: [],
        meats: []
    });

    const [platform, setPlatForm] = useState()
    const [version, setVersion] = useState()
    const [subscription, setSubscription] = useState()


    //call APis
    // const {data : platformList} = useGetPlatFormQuery()
   const  getfilteredData = () => {
        // Filter Stock Index Data 
        const stockIndexData = data?.data?.filter(item => item?.category_id === 1)
        const currencyData = data?.data?.filter(item => item?.category_id === 2)
        setTableDataList({...tableDataList, stock_index: stockIndexData})
        setTableDataList({...tableDataList, currencies: currencyData})
    }

    // useEffect(() => {
    //     getfilteredData()
    // },[])

  return (
    <div className='table__main my-4'>
        <div className='container'>
        <div className='table__tab__area'>
        {categories?.data?.map(item => (
            <div key={`cat-${item.id}`} className={`tab__single ${selected_cat === item?.id ? 'active' : ''}`} onClick={() => dispatch(setCategory({category : item?.id}))} >{item?.name}</div>
        ))}

        </div>

            <div className='table-responsive'>
                <table className='table table__content mb-4'>
                <thead>
                        <tr>
                            <th>Span</th>
                            <th>Sym</th>
                            <th>Exchange</th>
                            <th></th>
                            

                            {equity_id == 2 ? (
                                <>
                                <th>{'<'}1,000Contracts</th>
                                <th>1,001 - 4,999 Contracts</th>
                                <th>5,000 - 9,999 Contracts</th>
                                <th>{'>'}10,000 Contracts</th>
                                </>
                            ) : <>
                                <th>Per Side</th>
                                <th>Round Turn</th>
                            </>}
                        
                        </tr>
                </thead>

                    {/* <tbody> */}

                                {data?.data?.map((item, index) => (
                                        <tr key={`main-table-${index}`}>
                                            <td className='tbl-td'>{item?.name ? item?.name : 'Test name'}</td>
                                            <td className='tbl-td'>{item?.symbol}</td>
                                            <td className='tbl-td'>{item?.exchange}</td>
                                            <td className='tbl-td'>{item?.currency}</td>
                                            

                                            {equity_id == 2 ? (
                                                <>
                                                    <td className='tbl-td'>{item?.tier_one.toFixed(2)}</td>
                                                    <td className='tbl-td'>{item?.tier_two.toFixed(2)}</td>
                                                    <td className='tbl-td'>{item?.tier_three.toFixed(2)}</td>
                                                    <td className='tbl-td'>{item?.tier_four.toFixed(2)}</td>
                                                </>
                                            ) : (<>
                                                <td className='tbl-td'>{item?.flat_per_side.toFixed(2)}</td>
                                                <td className='tbl-td'>{item?.round_turn.toFixed(2)}</td>
                                            </>)}
                                        
                                        </tr>
                                    ))}
                        
                    {/* </tbody> */}

                </table>
            </div>
            
        </div>
    </div>
  )
}

export default MainTable