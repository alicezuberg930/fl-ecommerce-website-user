'use client'
import React, { useRef } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
// components
import Carousel, { CarouselDots, CarouselArrows } from '@/components/carousel';
import Image from '@/components/image';
import { Settings } from 'react-slick';

// ----------------------------------------------------------------------

type Props = {
    children: React.ReactNode
    dots?: boolean
    slidesToShow?: number
};

export default function CarouselList({ children, dots = false, slidesToShow = 1 }: Props) {
    const theme = useTheme();

    const carouselRef = useRef<Carousel | null>(null);

    const carouselSettings: Settings = {
        dots,
        arrows: false,
        autoplay: true,
        slidesToShow,
        slidesToScroll: 1,
        rtl: Boolean(theme.direction === 'rtl'),
        ...CarouselDots({
            rounded: true,
            sx: { mb: 4 },
        }),
    }

    const handlePrev = () => {
        carouselRef.current?.slickPrev();
    };

    const handleNext = () => {
        carouselRef.current?.slickNext();
    };

    return (
        <Box
            sx={{
                position: 'relative',
                '& .slick-list': {
                    borderRadius: 2,
                    boxShadow: theme.customShadows.z16
                }
            }}
        >
            <CarouselArrows filled shape="rounded" onNext={handleNext} onPrevious={handlePrev}>
                <Carousel ref={carouselRef} {...carouselSettings}>
                    {children}
                </Carousel>
            </CarouselArrows>
        </Box>
    );
}