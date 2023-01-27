import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductDetails } from '../../redux/actions/productActions'
import { styled, Grid } from '@mui/material'
import ActionItems from './ActionItems';
import ProductDetail from './ProductDetail';


const Container = styled(Grid)(({theme})=>({
  display:'flex',
  [theme.breakpoints.down('md')]:{
    flexDirection:'column',
    flexWrap:'wrap',

  }
}))

const LeftContainer = styled(Grid)(({theme})=>({
  [theme.breakpoints.down('md')]:{
    maxWidth:'100%',

  }
}))


const RightContainer = styled(Grid)(({theme})=>({
    marginTop:'70px',
    [theme.breakpoints.down('md')]:{
      maxWidth:'100%',
      marginTop:'5px',
      
    }
  }))

const DetailView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, product } = useSelector(state => state.getProductDetails)

  useEffect(() => {
    if (product && id !== product.id)
      dispatch(getProductDetails(id))
  }, [dispatch, id, loading, product])

  // console.log(product);

  return (
    <>
      {
        product && Object.keys(product).length &&
        <Container container>
          <LeftContainer item lg={4} md={4} sm={8} xs={8}>
            <ActionItems product={product} />
          </LeftContainer>
          <RightContainer item lg={8} md={8} sm={8} xs={8}>            
            <ProductDetail product={product}/>
          </RightContainer>
        </Container>

      }


    </>
  )
}

export default DetailView