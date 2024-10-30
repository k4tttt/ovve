import React, { useEffect, useState } from 'react';
import PatchRow from './PatchRow';

const TradeList = () => {
    const [patches, setPatches] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPatches = async () => {
            try {
                const response = await fetch(`http://localhost:3001/get-all-trade-patches`); // Replace with actual endpoint
                if (response.ok) {
                    const data = await response.json();
                    setPatches(data);
                } else {
                    console.error('Failed to fetch patches');
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPatches();
    }, []);

    if (loading) return <p>Loading patches...</p>;

    return (
        <div className="patch-list">
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
