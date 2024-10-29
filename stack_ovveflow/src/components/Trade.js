import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import AddTradeOffer from './AddTradeOffer';

function Trade({ user }) {
  const [add_trade_offer_active, set_add_trade_offer_active] = useState(false);
  const [active_trades, set_active_trades] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/get-active-trade-offers-for-user?user_id=${user.id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        set_active_trades(data.result);
      })
      .catch((error) => {
        console.log("ERROR when fetching active trades: " + error);
      });
  }, [user.id]);

  return (
    <div>
      {add_trade_offer_active ? <AddTradeOffer user={user} set_add_trade_offer_active={set_add_trade_offer_active} /> : <></>}
      <h1>Märketplace</h1>
      <h3>Aktiva trades</h3>
      
      <Button variant='contained' onClick={() => set_add_trade_offer_active(true)}>Börja byta</Button>
    </div>
  );
}

export default Trade