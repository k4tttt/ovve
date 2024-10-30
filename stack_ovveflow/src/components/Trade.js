import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import AddTradeOffer from './AddTradeOffer';
import TradeOfferDetails from './TradeOfferDetails';

function Trade({ user }) {
  const [add_trade_offer_active, set_add_trade_offer_active] = useState(false);
  const [trades, set_trades] = useState(null);
  const [trade_offer_patches, set_trade_offer_patches] = useState({});
  const [trade_view_active, set_trade_view_active] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/get-trade-offers-for-user?user_id=${user.id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        set_trades(data.result);
        data.result.forEach(trade_offer => {
          fetch(`http://localhost:3001/get-trade-offer-patches?trade_id=${trade_offer.id}`)
            .then((response) => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then((data) => {
              set_trade_offer_patches(prev_patches => ({
                ...prev_patches,
                [trade_offer.id]: data.result
              }));
            })
            .catch((error) => {
              console.log("ERROR when fetching trade offer patches: " + error);
            });
        });
      })
      .catch((error) => {
        console.log("ERROR when fetching trades: " + error);
      });
  }, [user.id]);

  return (
    <div>
      {add_trade_offer_active ? <AddTradeOffer user={user} set_add_trade_offer_active={set_add_trade_offer_active} /> : <></>}
      {trade_view_active !== null ? <TradeOfferDetails trade_content={trade_view_active} user={user} set_trade_view_active={set_trade_view_active} /> : <></>}
      <h1>Märketplace</h1>
      <h3>Aktiva byten</h3>
      <div style={{ display: 'flex', marginBottom: '30px' }}>
        {trades ? (trades.filter(trade => trade.approved === false).map(trade => (
          <div className='trade_card' key={trade.id} onClick={() => set_trade_view_active({ trade_offer: trade, trade_offer_patches: trade_offer_patches[trade.id] })}>
            <h4>Byte mellan {trade.sender_name} och {trade.receiver_name}</h4>
            <ul>
              {trade_offer_patches[trade.id] ? (
                trade_offer_patches[trade.id].map(patch => (
                  <li className='trade_offer_patch' key={patch.patch_id}>{patch.patch_name}</li>
                ))
              ) : <></>}
            </ul>
            {trade.sender_id === user.id ? <div className='tag gray'>Deras tur</div> : <div className='tag green'>Din tur</div>}
          </div>
        ))) : <></>}
      </div>

      <h3>Godkända byten</h3>
      <div style={{ display: 'flex', marginBottom: '30px' }}>
        {trades ? (trades.filter(trade => trade.approved === true).map(trade => (
          <div className='trade_card' key={trade.id} onClick={() => set_trade_view_active({ trade_offer: trade, trade_offer_patches: trade_offer_patches[trade.id] })}>
            <h4>Byte mellan {trade.sender_name} och {trade.receiver_name}</h4>
            <ul>
              {trade_offer_patches[trade.id] ? (
                trade_offer_patches[trade.id].map(patch => (
                  <li className='trade_offer_patch' key={patch.patch_id}>{patch.patch_name}</li>
                ))
              ) : <></>}
            </ul>
            <div className='tag green'>Godkänd</div>
          </div>
        ))) : <></>}
      </div>

      <Button variant='contained' onClick={() => set_add_trade_offer_active(true)}>Börja byta</Button>
    </div>
  );
}

export default Trade