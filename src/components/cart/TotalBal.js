import { Box, styled, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

const Container = styled(Box)(({theme})=>({
    backgroundColor:'#fff',
    marginLeft:'25px',
    boxShadow: '0px 0px 5px #000000',
    height:'372px',
   [theme.breakpoints.down('md')]:{
        marginLeft:0,
        marginTop:'10px'
   } 
}))
const Header = styled(Box)`
    border-bottom: 1px solid #f0f0f0;
    padding:15px 24px;
`

const Heading = styled(Typography)`
        color:#878787;
`
const Content = styled(Box)`
    padding: 15px 24px ;
    & >p {
        margin-bottom:20px;
        font-size:14px;
    }
    & >h6{
        margin-bottom:20px;
    }
    
`

const Price = styled(Box)`
    float:right;
`

const Discount = styled(Typography)`
    color:green;
    font-weight:500;
`

const TotalBal = ({ CartItems }) => {
    const [price, setPrice] = useState(0)
    const [discount, setDiscount] = useState(0)


    const totalAmount = () => {
        let price = 0, discount = 0;
        CartItems.map((item) => {
            return( price = price + (item.price.mrp),
            discount += (item.price.mrp - item.price.cost))
        })
        setPrice((price));

        setDiscount(discount);
    }

    useEffect(() => {
        totalAmount()
    })

    return (
        <Container>
            <Header>
                <Heading >PRICE DETAILS</Heading>
            </Header>
            <Content>
                <Typography>Price ({CartItems?.length} item) 
                    <Price component='span'>₹{price}</Price>
                </Typography>
                <Typography>Discount
                    <Price component='span'>-₹{discount}</Price>
                </Typography>
                <Typography>Delivery Charges
                    <Price component='span'>₹40</Price>
                </Typography>
                <Typography variant='h6'>Total Amount
                    <Price component='span'>₹{price - discount + 40}</Price>
                </Typography>
                <Discount>You will save ₹{discount - 40} on this order </Discount>
            </Content>
        </Container>
    )
}

export default TotalBal