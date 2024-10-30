import { useEffect, useState } from 'react';
import { Button } from '@mui/material';

const TradeOfferDetails = ({ user, trade_content, set_trade_view_active }) => {
  const [other_user, set_other_user] = useState(null);

  useEffect(() => {
    if (trade_content.trade_offer.sender_name === user.username) {
      set_other_user({ name: trade_content.trade_offer.receiver_name, email: trade_content.trade_offer.receiver_email });
    } else {
      set_other_user({ name: trade_content.trade_offer.sender_name, email: trade_content.trade_offer.sender_email });
    }
  }, []);

  const handle_confirmed_trade = () => {

  }

  return (
    <div>
      <div className='overlay' onClick={() => set_trade_view_active(null)}></div>
      <div className='add_patch'>
        <h3>Byte mellan {trade_content.trade_offer.sender_name} och {trade_content.trade_offer.receiver_name}</h3>

        {trade_content.trade_offer.approved && other_user ? <div>
          <div className='tag green'>Godkänd</div>
          <p className='small_text'>Kontakta {other_user.name} via mejl för att genomföra bytet</p>
          <br/>
          <div className='tag'>{other_user.email}</div>
          <hr/>
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

        {trade_content.trade_offer.receiver_id === user.id ?
          <Button variant='contained' onClick={handle_confirmed_trade}>Godkänn byte</Button>
          : <></>}
      </div>
    </div>
  );
}

export default TradeOfferDetails;
