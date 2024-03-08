import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setHeadFeed, setPlatForm, setVersion, setSubscription, setEquity, setDataFeed, setExtraPrice, pushExtraPrice, pushExtraPriceMonth } from '../api/slices/feedSlice'
import { useGetPlatFormQuery, useGetVersionsQuery, useGetSubscriptionsQuery,useGetDataFeedQuery, useGetFeesDataQuery } from '../api/features/api/feedApi'
import TableBox from './TableBox'
export const Box = () => {

    // variable declaration
    const [templPlatform, setTempPlatform] = useState()
    const [tempVersion, setTempVersion] = useState()

    // get state from redux store
    const feed_data = useSelector(state => state.headFeed.data_feed)
    const platform_id = useSelector(state => state.headFeed.platform)
    const version_id = useSelector(state => state.headFeed.version)
    const subscription_id = useSelector(state => state.headFeed.subscription)

    const feedData = useSelector(state => state.headFeed.filterFeed)
    const selectedFeed = useSelector(state => state.headFeed.data_feed)

    const dispatch = useDispatch()

    const {data : dataFeed} = useGetDataFeedQuery()
    const {data: feesData} = useGetFeesDataQuery({data_feed : feed_data, subscription: subscription_id, version: version_id, platform_id: platform_id})
    // dispatch(setExtraPrice(data?.))

    console.log('my fess  data', feesData);

    const feedFilter = () => {
        const fFeed = dataFeed?.data?.find(itm => itm.id === feed_data)
        dispatch(setDataFeed({feed: fFeed}))
        const per_side = {
            name: fFeed?.per_contract_or_side_fee?.name,
            price: fFeed?.per_contract_or_side_fee?.price,
        }

        const monthly_platform = {
            name : fFeed?.third_party_monthly_platform_fee?.name,
            price : fFeed?.third_party_monthly_platform_fee?.price
        }

        dispatch(setExtraPrice({per_side, monthly_platform}))
    }

    useEffect(() => {
        feedFilter()
    },[feed_data])

    const setDefaultParam = () => {
        dispatch(setPlatForm(''))
        dispatch(setVersion(''))
        dispatch(setSubscription(''))
    }

 
    // fetch data from way
    const {data : platformList} = useGetPlatFormQuery(feed_data,{ refetchOnMountOrArgChange: true})
    const {data : versionList} = useGetVersionsQuery(platform_id)
    const {data : subscriptionsList} = useGetSubscriptionsQuery({platform_id,version_id})
    console.log('subscriptions-',version_id,subscriptionsList);

    const filterExtraPrice = (vid) => {
         console.log('selected version extra price', versionList?.data,'id', vid);
         const foundExtra = versionList?.data?.find(element => element.id === vid);
         if(foundExtra?.per_contract_or_side_fee?.name != undefined)
         {
            //  dispatch(pushExtraPrice({extraPerSide : foundExtra}))
            console.log('mew mew side',foundExtra?.per_contract_or_side_fee);
            const side_price = {
                name : foundExtra?.per_contract_or_side_fee?.name,
                price : foundExtra?.per_contract_or_side_fee?.price,
                type: 2
            }
            dispatch(pushExtraPrice({extraPerSide : side_price }))
         }
         if(foundExtra?.third_party_monthly_platform_fee?.name != undefined)
         {
            //  dispatch(pushExtraPrice({extraPerSide : foundExtra}))
            console.log('mew mew side month',foundExtra?.third_party_monthly_platform_fee);
            const side_priceMonnth = {
                name : foundExtra?.per_contract_or_side_fee?.name,
                price : foundExtra?.per_contract_or_side_fee?.price,
                type: 2
            }
            dispatch(pushExtraPriceMonth({extraPerSide : side_priceMonnth }))

         }
     }

     const filterExtraPriceMonthSubs = (sid) => {
        const foundExtra = subscriptionsList?.data?.find(element => element.id === sid);
        if(foundExtra?.per_contract_or_side_fee?.name !== undefined)
        {
            const monthlysubsSide = {
                name: foundExtra?.per_contract_or_side_fee?.name,
                price: foundExtra?.per_contract_or_side_fee?.price,
                type: 2
            }
            console.log('mew mew ', monthlysubsSide);
            dispatch(pushExtraPrice({extraPerSide : monthlysubsSide}))
        }

        if(foundExtra?.third_party_monthly_platform_fee?.name !== undefined)
        {
            const monthlysubs = {
                name: foundExtra?.third_party_monthly_platform_fee?.name,
                price: foundExtra?.third_party_monthly_platform_fee?.price,
                type: 2
            }
            console.log('monthly data -------------- ', monthlysubs);
            dispatch(pushExtraPriceMonth({extraPerSideMonth : monthlysubs}))
        }
        
    }
    const monthly_side_data = useSelector(state => state.headFeed.monthly_platforms)
    const per_side_data = useSelector(state => state.headFeed.per_side_contract)

  return (
    <div className='box__area'>
        <div className='box__header'> <h3>Platform Configuration</h3> </div>
        <div className='box__body'>
            <div className='row'>
                <div className='col-md-10 offset-md-1'>
                    <form action="">

                        <div className='row form-group mb-4'>
                            {/* col md 8 start */}
                            <div className='col-md-7'>
                                <div className='equity_label_area mb-3'>
                                    <label htmlFor="" class="equity_label">Initial Equity Deposit?</label>
                                </div>
                                 <div className="form-check form-check-inline mb-2 equity__radio__area">
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="1" onChange={(e) => dispatch(setEquity({equity : e.target.value}))} />
                                    <label className="form-check-label radio__label" for="inlineRadio1">Flat Rate - Minimum Equity Deposit: 10,000 (or USD equivalent)</label>
                                </div>
                                <div className="form-check form-check-inline mb-2 equity__radio__area">
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="2" onChange={(e) => dispatch(setEquity({equity : e.target.value}))} />
                                    <label className="form-check-label radio__label" for="inlineRadio2">Volume-Tiered - Minimum Equity Deposit: 100 (or USD equivalent)</label>
                                </div>

                                {/* data feed  */}
                                <div className='datafeed_label_area mt-3 mb-2'>
                                    <label htmlFor="" className='datafeed_label'>Which Data Feed?</label>
                                </div>
                                {dataFeed?.data?.map(item => (
                                    <div className="form-check form-check-inline" key={`data-feed-${item?.id}`}>
                                        <input onChange={(e) => {dispatch(setHeadFeed({feed_data: e.target.value})); setDefaultParam() }} className="form-check-input" type="radio" name="headFeed"   id={`feeddata${item?.id}`} value={item?.id} />
                                        <label className="form-check-label radio__label" for={`feeddata${item?.id}`}>{item?.feed_name}</label>
                                    </div>
                                ))}

                                {/* select filter dropdown area start  */}
                                <div className='mt-5'>
                                    {/* platform select area start  */}
                                    <div className='row form-group mb-3'>
                                        <div className='col-md-4'>
                                            <label htmlFor="">Which Platform?</label>
                                        </div>
                                        <div className='col-md-6'>
                                        {/* setTempPlatform(e.target.value); */}
                                            <div className='select__icon__group'>
                                                    <select name="" id="" className='form-control cal__select' onChange={(e) =>{ 
                                                        dispatch(setPlatForm({platform : e.target.value})); 
                                                        dispatch(setVersion({version : ''})); 
                                                        dispatch(setSubscription({subscription: ""}));
                                                        
                                                        }}>
                                                        <option value="" selected={platform_id === undefined}>Select</option>
                                                        {platformList?.data?.map((item, index) => (
                                                            <option key={`plat-${index}`} value={item?.id}>{item?.name}</option>
                                                        ))}
                                                    </select>
                                                    {/* <i class="far fa-angle-down"></i> */}
                                            </div>
                                        </div>
                                    </div>
                                    {/* platform select area end */}


                                    {/* version select area start  */}

                                    {versionList?.data?.length > 0 && (
                                         <div className='row form-group mb-3'>
                                            <div className='col-md-4'>
                                                <label htmlFor="">Version?</label>
                                            </div>
                                            <div className='col-md-6'>
                                                <select name="" id=""  className='form-control cal__select' onChange={(e) => {
                                                    dispatch(setVersion({version: e.target.value}));
                                                    dispatch(setSubscription({subscription: null}));
                                                    filterExtraPrice(e.target.value);
                                                   
    
                                                }}>
                                                    <option value="" selected={version_id === ""} >Select</option>
                                                    {versionList?.data?.map((item, index) => (
                                                        <option key={`version-${index}`} value={item?.id} >{item?.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    )}
                                   

                                    {/* version select area end  */}

                                    
                                    {/* subscription select area  start  */}
                                    {subscriptionsList?.data?.length > 0 && (
                                        <div className='row form-group mb-3'>
                                            <div className='col-md-4'>
                                                <label htmlFor="">Subscription?</label>
                                            </div>
                                            <div className='col-md-6'>
                                                <select name="" id="" className='form-control cal__select' onChange={(e) => {
                                                    dispatch(setSubscription({subscription : e.target.value}));
                                                    filterExtraPriceMonthSubs(e.target.value);
                                                    }}>
                                                    <option value="" selected={subscription_id === "" || subscription_id == undefined}>Select</option>
                                                    {subscriptionsList?.data?.map((item, index) => (
                                                        <option key={`subscription-${index}`} value={item?.id} >{item?.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    )}
                                    

                                    {/* subscription select area end  */}

                                </div>
                                {/* select filter dropdown area end  */}


                            </div> 
                            {/* col-md-8 end */}

                            <div className='col-md-5'>
                                 <div className='row mt-5'>

                                    {feesData?.data?.third_party_monthly_platform_fee?.length > 0 ? (
                                         <div className='col-md-12 mb-4'>
                                            <TableBox title="3rd Party Monthly Platform Fee" type="side_fee_month" data={feesData?.data?.third_party_monthly_platform_fee} />
                                        </div>
                                    ) : ''}

                                    {feesData?.data?.per_contract_or_side_fee?.length > 0 ? (
                                         <div className='col-md-12 mb-4'>
                                            <TableBox title="Per Contract / Side Fees | paid from AMP Trading Account " type="side_fee" data={feesData?.data?.per_contract_or_side_fee} />
                                        </div>
                                    ) : ''}

                                  

                                 

                                    {/* {
                                        selectedFeed == 3 ? (
                                            <>
                                                <div className='col-md-12 mb-4'>
                                                    <TableBox title="Per Contract / Side Fees | paid from AMP Trading Account" type="side_fee" data={feedData} />
                                                </div>
                                                <div className='col-md-12 mb-4'>
                                                    <TableBox title="3rd Party Monthly Platform Fee" type="platform_fee" data={feedData} />
                                                </div>
                                            </>
                                        ) : (

                                            <>
                                                {feedData?.per_contract_or_side_fee && (
                                                    <div className='col-md-12 mb-4'>
                                                        <TableBox title="Per Contract / Side Fees | paid from AMP Trading Account" type="side_fee" data={feedData} />
                                                    </div>
                                                )}



                                            </>
                                            
                                        )
                                    } */}


                                    {/* <div className='col-md-6 mb-4'>
                                        <TableBox title="3rd Party Monthly Platform Fee" />
                                    </div>
                                    <div className='col-md-6 mb-4'>
                                        <TableBox title="3rd Party Monthly Platform Fee" />
                                    </div> */}
                                    </div>
                            </div>
                        </div>


                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}
