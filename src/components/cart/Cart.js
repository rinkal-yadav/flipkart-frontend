import { Grid, Typography, Box, styled, Button } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import CartItem from './CartItem'
import EmptyCart from './EmptyCart'
import TotalBal from './TotalBal'

const Container = styled(Grid)(({theme})=>({
    padding:'35px 135px',
    display:'flex',
       [theme.breakpoints.down('md')]:{
        display:'flex',
        flexDirection:'column',
        width:'100%',
        padding:'10px',
    }
}))
   


const CartHead = styled(Box)(({theme})=>({
    display : 'flex',
    justifyContent:'space-between',
    alignItems : 'center',
    margin:'0 10px',
    [theme.breakpoints.down('md')]:{
        margin:'0 5px'
    }
}))
    

const LeftContainer =styled(Grid)`
box-shadow: -1px -1px 5px #000000;
height:fit-content;
`

const ButtonWrapper =styled(Box)`
    box-shadow: -1px -1px 5px #000000;
    background-color:#fff;
    padding:16px 22px;
`

const StyledButton = styled(Button)`
    margin-left:auto;
    display:flex;
    background-color: #fb641b;
    width: 200px;
    height: 40px;
    color: #fff;
    font-weight: 600;
    border-radius:2px;

`

const Cart = () => {
    const { CartItems } = useSelector(state => state.cart)

    return (
        <>
            {
                CartItems.length >= 1 ?
                    <Container >
                        <LeftContainer >
                            <CartHead>
                                <Typography style={{borderRight : '2px solid #878787',paddingRight:'20px'}}>My Cart ({CartItems.length}) </Typography>
                                <Typography> From Saved Addresses</Typography>
                                <Button> Enter Delivery Pincode</Button>
                            </CartHead>
                            {CartItems.map((item, index) => (

                                <CartItem cartItems={item} index={index} />

                            ))}
                            <ButtonWrapper>
                                <StyledButton>Place Order</StyledButton>
                            </ButtonWrapper>
                        </LeftContainer>

                        <Grid >
                            <TotalBal CartItems={CartItems} />
                        </Grid>

                    </Container>
                    : <EmptyCart/>
            }
        </>
    )
}

export default Cart