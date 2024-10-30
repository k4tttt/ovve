import React from 'react';
import PropTypes from 'prop-types';

const PatchRow = ({ username, university, patch_name, patch_maker, patch_price }) => (
    <div class_name="patch-row">
        <h3>{patch_name}</h3>
        <p><strong>Maker:</strong> {patch_maker}</p>
        <p><strong>Owner:</strong> {username}</p>
        <p><strong>University:</strong> {university}</p>
        <p><strong>Price:</strong> {patch_price} kr</p>
    </div>
);

PatchRow.propTypes = {
    username: PropTypes.string.isRequired,
    university: PropTypes.string.isRequired,
    patch_name: PropTypes.string.isRequired,
    patch_maker: PropTypes.string.isRequired,
    patch_price: PropTypes.number.isRequired
};

export default TradePost;
