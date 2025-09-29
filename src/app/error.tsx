'use client';
import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Error in BestSellingProducts:', error);
    }, [error]);

    return (
        <div className="error-container" style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Something Went Wrong</h1>
            <p>{error.message}</p>
            <button
                onClick={() => reset()}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#0070f3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                Try Again
            </button>
        </div>
    );
}