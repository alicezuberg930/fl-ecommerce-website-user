'use client'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/api/store'
import '@/app/styles/css/catalog.menu.list.css'
import Link from 'next/link'
import { Container, Grid } from '@mui/material'
import { useSettingsContext } from '@/components/settings'

type Props = {
  isHovered: boolean
}

const CatalogMenuList = ({ isHovered }: Props) => {
  const categories = useSelector((state: RootState) => state.CategoryList.categories)
  const { themeStretch } = useSettingsContext();

  return (
    <Container maxWidth={themeStretch ? false : 'xl'}
      sx={{
        transition: '.3s ease-in-out', zIndex: 999,
        position: 'absolute', top: '100%', left: 0, right: 0,
        bgcolor: (theme) => theme.palette.common.white,
        opacity: isHovered ? 1 : 0, pointerEvents: isHovered ? 'auto' : 'none',
      }}
    >
      <Grid container sx={{ boxShadow: (theme) => theme.customShadows.dropdown }}>
        <div className='catalog-menu-container'>
          {
            categories?.map(category => {
              return (
                <Link className='catalog-menu-item' key={category._id} href={{ pathname: '/products', query: { 'category': category._id } }}>
                  <div className='catalog-menu-title'>
                    <img src={category.thumbnail ?? './public/assets/foryou1.png'} />
                    {category.name}
                  </div>
                </Link>
              )
            })
          }
        </div>
      </Grid>
    </Container >
  )
}

export default CatalogMenuList