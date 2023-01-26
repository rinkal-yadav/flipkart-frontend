import { Box, Button, styled } from '@mui/material'
import React, { useState } from 'react'
import { FlashOn as Flash, ShoppingCart as Cart } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/actions/cartAction';

import { payUsingPaytm } from '../../service/api';
import { post } from '../../utils/paytm'


const LeftContainer = styled(Box)(({theme})=>({
  minWidth: '40%',
  padding: '40px 0px 0px 50px',
  [theme.breakpoints.down('md')]:{
    padding:'20px',
  }
}))
const Image = styled('img')({
    padding: '15px 0px'
})

const ImageBox = styled(Box)(({theme})=>({
  padding: '15px 20px',
  border: '1px solid #f0f0f0f0',
  
  [theme.breakpoints.down('md')]:{
      width:'100%',
      padding:'0px',
      marginBottom:'10px',
  }
}))
const ButtonStyle = styled(Button)(({theme})=>({
    width:'210px',
    height:"40px",
    marginRight: '10px',
    [theme.breakpoints.down('md')]:{
      width: '47%',
      fontSize: '10px',
      height: '25px',
      marginBottom: '7px',
      padding: '10px 0px',
      alignItems:'center',
    
    }
  }))   

const ActionItems = ({ product }) => {
  const { id } = product
  const [quantity] = useState(1)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const addItemToCart = async () => {
    await dispatch(addToCart(id, quantity))

    await navigate('/cart')
  }
  const buyNow = async () => {
    let response = await payUsingPaytm({ amount: 500, email: "rinkal95@gmail.com" });
    let information = {
      action: "https://securegw-stage.paytm.in/order/process",
      params: response
    }
    post(information)
  }

  return (
    <LeftContainer>
      <ImageBox ><Image src={product.detailUrl} alt='detail_Image' /> </ImageBox>
      <ButtonStyle variant="contained" onClick={() => addItemToCart()} style={{ background: '#ff9f00' }} ><Cart /> ADD TO CART </ButtonStyle>
      <ButtonStyle variant="contained" onClick={() => buyNow()} style={{ background: '#fb641b' }}><Flash /> BUY NOW </ButtonStyle>
    </LeftContainer>
  )
}

export default ActionItems