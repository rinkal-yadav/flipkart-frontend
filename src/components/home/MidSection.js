
import React from 'react'
import imageURL from '../constants/Data'
import { Grid, styled } from '@mui/material'

const Wrapper = styled(Grid)`
  margin-top:10px;
  
`
const Image = styled('img')(({ theme }) => ({
  marginTop:'10px',
  width:'100%',
  [theme.breakpoints.down('md')]:{
    objectFit:'cover',
    height:'120px'
  }
 
}))

const MidSection = () => {
  const url = 'https://rukminim1.flixcart.com/flap/3006/433/image/4789bc3aefd54494.jpg?q=50';
  return (
    <>
    <Wrapper container lg={12} sm={12} md={12} xs={12} >
      {
        imageURL.map(value => (
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <img src={value} alt='midsection-img' style={{ width: '100%' }} />

          </Grid>
        ))
      }
    </Wrapper>
    <Image src={url}/>
    </>
  )
}

export default MidSection