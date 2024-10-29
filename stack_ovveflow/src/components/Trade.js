import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import AddTradeOffer from './AddTradeOffer';


function Trade({ user }) {

  const [add_trade_offer_active, set_add_trade_offer_active] = useState(false);

  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      {add_trade_offer_active ? <AddTradeOffer user={user} set_add_trade_offer_active={set_add_trade_offer_active} /> : <></>}
      <Button variant='contained' onClick={() => set_add_trade_offer_active(true)}>Börja byta</Button>
    </div>
  );
}

export default Trade