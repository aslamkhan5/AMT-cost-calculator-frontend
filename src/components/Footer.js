import React from 'react'

const Footer = () => {
  return (
    <div className='footer__area'>
        <div className='container'>
            <h3 className='footer__notes'>Notes:</h3>
            <ul>
                <li>This chart does not include Monthly Platform or Monthly Exchange Data Fees (Separate)</li>
                <li>Commission rates depicted in the table above are quoted on a per-contract, per-side basis.</li>
                <li>Rates apply to self-directed online trader accounts.</li>
                <li>Commissions, Clearing, Exchange and Regulatory fees apply to all order types.</li>
                <li>All commissions and fees are charged in the currency of the traded product.</li>
                <li>Please reference our Fee Schedule for additional fees that may apply to your account.</li>
                <li>Options Trading Pricing will vary from the above “Futures” Pricing based off the exchange fees. For options trading, the above AMP’s charges, such as clearing & commissions remain the same. If the options exchange fee is less than the futures contract exchange fee your total round turn cost will be less due to the cheaper exchange fee on options. If the options exchange fee is higher than the futures contract exchange fee your total round turn cost will be higher due to the higher exchange fee on options. You can use the CME Fee Finder to confirm the option exchange fee: http://www.cmegroup.com/company/clearing-fees/fee-finder.html</li>
            </ul>
        </div>
    </div>
  )
}

export default Footer