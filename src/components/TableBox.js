import React from 'react'
import { useSelector } from 'react-redux'
import { useGetVersionsQuery } from '../api/features/api/feedApi'

const TableBox = ({title, data, type}) => {
    // const per_side_data = useSelector(state => state.headFeed.per_side_contract)
    const monthly_side_data = useSelector(state => state.headFeed.monthly_platforms)
    const version_id = useSelector(state => state.headFeed.version)
    const platform_id = useSelector(state => state.headFeed.platform)

    const {data : versionList} = useGetVersionsQuery(platform_id)


    console.log('my versiob list', versionList);
    console.log('monthly-data new', monthly_side_data);
    const totalPrice = (mData) => {
        console.log('price data', mData);
        const prices = mData?.map((item) => item.price)
        const total = prices.reduce((acc, curr) => (acc === undefined ? 0 : acc) + (curr === undefined ? 0 : curr))
        return total ? total : 0;
    }

  return (
    <div className='box__area'>
        <div className='box__header'> <h4>{title}</h4> </div>
        <div className='box__body__small'>
            <table className='table half__table'>
                <tr>
                    <th><div>Name</div></th>
                    <th className='float-right'><div>Price</div></th>
                </tr>


                {data?.map(item => (
                    <tr className='pb-2'>
                        <td>{item?.name}</td>
                        <td className='float-right'>{item?.price}</td>
                    </tr>
                ))}
                
                {/* {type == "side_fee" ? (
                    <>
                        {data?.map(item => (
                            <tr className='pb-2'>
                                <td>{item?.name}</td>
                                <td className='float-right'>{item?.price}</td>
                            </tr>
                        ))}
                        
                    </>
                    
                ) : (
                    
                    <>
                        {monthly_side_data?.filter(itm1 => itm1.name !== undefined).map(item2 => (
                             <tr className='pb-2'>
                                <td>{item2?.name}</td>
                                <td className='float-right'>{item2?.price}</td>
                            </tr>
                        ))}
                       
                    </>
                )} */}
               
               {type === "side_fee" ? (
                <>
                      <tr className='pb-2'>
                        <td>Total (USD)</td>
                        <td className='float-right'>{totalPrice(data).toFixed(2)}</td>
                    </tr>
                </>
               ) : (
                <>
                     <tr className='pb-2'>
                        <td>Total (USD)</td>
                        <td className='float-right'>{totalPrice(data).toFixed(2)}</td>
                    </tr>
                </>
               )}
              
            </table>
        </div>
    </div>
  )
}

export default TableBox