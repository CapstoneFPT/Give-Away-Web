import React, { useState, useEffect } from 'react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    imageUrl: () => Promise<{ default: string }>;
    alt: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ imageUrl, alt, ...props }) => {
    const [loadedSrc, setLoadedSrc] = useState<string | null>(null);

    useEffect(() => {
        imageUrl().then((module) => setLoadedSrc(module.default));
    }, [imageUrl]);

    if (!loadedSrc) {
        return <div>Loading...</div>;
    }

    return <img src={loadedSrc} alt={alt} {...props} />;
};

export default LazyImage;