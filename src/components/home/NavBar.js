import { Box,styled, Typography } from '@mui/material'
import React from 'react'
import { navData } from '../constants/Data'

const Component=styled(Box)(({theme})=>({
    display: 'flex',
    margin:'30px 100px 0px 100px',
    justifyContent:'space-between',
       [theme.breakpoints.down('md')]:{
        margin:'0px',
        display: '-webkit-inline-box',
    }
}))
const Container=styled(Box)`
    padding:12px 8px;
    text-align:center;
`
const Text=styled(Typography)`
    font-size:14px;
    font-weight:600;
    font-family:inherit;
`
const NavBar = () => {
  return (
    <div className='Scroll2'>

        <Component >

            {
                navData.map(data=>(
                    <Container>
                        <img src={data.url} alt='nav' style={{width:"64px"}}/>
                        <Text> {data.text} </Text>
                    </Container>
                ))
            }

        </Component>
        </div>
    
  )
}

export default NavBar