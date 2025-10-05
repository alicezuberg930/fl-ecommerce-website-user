'use client'
import { m } from 'framer-motion';
// @mui
import { Button, Typography } from '@mui/material';
// components
import { MotionContainer, varBounce } from '@/components/animate';
// assets
import { PageNotFoundIllustration } from '@/assets/illustrations';
import NextLink from 'next/link'

// ----------------------------------------------------------------------

export default function Page404() {
    return (
        <>
            <MotionContainer sx={{ textAlign: 'center', my: 3 }}>
                <m.div variants={varBounce().in}>
                    <Typography variant='h3' paragraph>
                        Sorry, page not found!
                    </Typography>
                </m.div>

                <m.div variants={varBounce().in}>
                    <Typography sx={{ color: 'text.secondary' }}>
                        Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be
                        sure to check your spelling.
                    </Typography>
                </m.div>

                <m.div variants={varBounce().in}>
                    <PageNotFoundIllustration
                        sx={{
                            height: 260,
                            my: { xs: 5, sm: 10 },
                        }}
                    />
                </m.div>

                <Button component={NextLink} href='/' size='large' variant='contained'>
                    Go to Home
                </Button>
            </MotionContainer>
        </>
    );
}
