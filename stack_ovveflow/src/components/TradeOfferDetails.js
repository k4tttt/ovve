import { useEffect, useState } from 'react';
import { Button } from '@mui/material';

const TradeOfferDetails = ({ user, trade_content, set_trade_view_active, set_counter_offer_active }) => {
  const [other_user, set_other_user] = useState(null);

  useEffect(() => {
    if (trade_content.trade_offer.sender_name === user.username) {
      set_other_user({ name: trade_content.trade_offer.receiver_name, email: trade_content.trade_offer.receiver_email });
    } else {
      set_other_user({ name: trade_content.trade_offer.sender_name, email: trade_content.trade_offer.sender_email });
    }
  }, [trade_content, user]);

  const handle_counter_offer = () => {
    set_trade_view_active(null);
    set_counter_offer_active(trade_content.trade_offer.id);
  };

  const handle_confirmed_trade = async () => {
    try {
      const response = await fetch('http://localhost:3001/set-trade-offer-to-approved', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ trade_id: trade_content.trade_offer.id }),
      });

      if (!response.ok) {
        throw new Error('Failed to update trade status');
      }

      const data = await response.json();
      console.log('Update successful:', data);
    } catch (error) {
      console.log('An error occurred:', error.message);
    }
    set_trade_view_active(null);
  }

  const handle_denied_trade = async () => {
    try {
      const response = await fetch('http://localhost:3001/set-trade-offer-to-denied', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ trade_id: trade_content.trade_offer.id }),
      });

      if (!response.ok) {
        throw new Error('Failed to update trade status');
      }

      const data = await response.json();
      console.log('Update successful:', data);
    } catch (error) {
      console.log('An error occurred:', error.message);
    }
    set_trade_view_active(null);
  }

  return (
    <div>
      <div className='overlay' onClick={() => set_trade_view_active(null)}></div>
      <div className='add_patch'>
        <h3>Byte mellan {trade_content.trade_offer.sender_name} och {trade_content.trade_offer.receiver_name}</h3>

        {trade_content.trade_offer.approved && other_user ? <div>
          <div className='tag green'>Godkänd</div>
          <p className='small_text'>Kontakta {other_user.name} via mejl för att genomföra bytet</p>
          <br />
          <div className='tag'>{other_user.email}</div>
          <hr />
        </div> : <></>}

        <div style={{ marginBottom: '30px' }}>
          <h4>{trade_content.trade_offer.sender_name} vill byta</h4>
          <table>
            <thead>
              <tr>
                <th>Märke</th>
                <th>Skapare</th>
                <th>Inköpspris</th>
                <th>Markerat som bytbart</th>
              </tr>
            </thead>
            <tbody>
              {trade_content.trade_offer_patches
                .filter(patch => patch.owner_id === trade_content.trade_offer.sender_id)
                .map((patch, index) => (
                  <tr key={index}>
                    <td>{patch.patch_name}</td>
                    <td>{patch.patch_creator}</td>
                    <td>{patch.patch_price} kr</td>
                    <td>{patch.tradeable === true ? "Ja" : "Nej"}</td>
                  </tr>
                ))}
            </tbody>
          </table>

          <h4>mot</h4>
          <table>
            <thead>
              <tr>
                <th>Märke</th>
                <th>Skapare</th>
                <th>Inköpspris</th>
                <th>Markerat som bytbart</th>
              </tr>
            </thead>
            <tbody>
              {trade_content.trade_offer_patches
                .filter(patch => patch.owner_id === trade_content.trade_offer.receiver_id)
                .map((patch, index) => (
                  <tr key={index}>
                    <td>{patch.patch_name}</td>
                    <td>{patch.patch_creator}</td>
                    <td>{patch.patch_price} kr</td>
                    <td>{patch.tradeable === true ? "Ja" : "Nej"}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {trade_content.trade_offer.receiver_id === user.id &&
          (
            <div>
              <Button variant='contained' onClick={handle_confirmed_trade} sx={{marginRight: '20px'}}>Godkänn byte</Button>
              <Button variant='contained' onClick={handle_counter_offer} sx={{marginRight: '20px'}}>Föreslå annat byte</Button>
              <Button variant='contained' onClick={handle_denied_trade}>Neka byte</Button>
            </div>
          )}
      </div>
    </div>
  );
}

export default TradeOfferDetails;
