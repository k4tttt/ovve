import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';

const TradePost = ({ username, university, patch_name, patch_maker, patch_price }) => (
  <div className="patch-card">
    <h3 className="patch-name">{patch_name}</h3>
    <p><strong>Ägare:</strong> {username}</p>
    <p><strong>Universitet:</strong> {university}</p>
    <p><strong>Märkesskapare:</strong> {patch_maker}</p>
    <p><strong>Inköpspris:</strong> {patch_price} kr</p>
  </div>
);

TradePost.propTypes = {
  Ägare: PropTypes.string.isRequired,
  Universitet: PropTypes.string.isRequired,
  Märkesnamn: PropTypes.string.isRequired,
  Märkesskapare: PropTypes.string.isRequired,
  Inköpspris: PropTypes.number.isRequired
};

export default TradePost;
