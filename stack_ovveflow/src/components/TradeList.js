import React, { useEffect, useState } from 'react';
import PatchRow from './TradePost';

const TradeList = () => {
    const [patches, set_patches] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/get-all-trade-patches')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                set_patches(data.result); // Assuming data.result contains the array of patches
            })
            .catch((error) => {
                console.log("ERROR when fetching patches: " + error);
            });
    }, []);

    return (
        <div className="patch-list">
            <h1>Patches for trade!</h1>
            {patches.map((patch, index) => (
                <PatchRow
                    key={index}
                    username={patch.username}
                    university={patch.university}
                    patch_name={patch.patch_name}
                    patch_maker={patch.patch_maker}
                    patch_price={patch.patch_price}
                />
            ))}
        </div>
    );
};

export default TradeList;
