import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box,Link,Typography, styled } from '@mui/material';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductDetails } from '../redux/actions/productActions'



const ProductImage = styled('img')({
  paddingTop: '25px',
  width: 'auto',
  height: '150px',
  marginRight: '15px'
});

const Text = styled(Typography)`
    font-size:13px;
    margin-top:5px;
`

const ViewAll = () => {
  // const { category } = useParams();
  // const { products } = useSelector(state => state.getProducts)
  // console.log(products);
  // console.log(products.filter((value)=>value.category==='offers'));
  // const dispatch = useDispatch();
  // useEffect(() => {
  //     dispatch(getProducts())
  // }, [dispatch])

  const dispatch = useDispatch();
  const { category } = useParams();
  const { loading, product } = useSelector(state => state.getProductDetails)
  useEffect(() => {
    if (product && category !== product.category)
      dispatch(getProductDetails(category))
  }, [dispatch, category, loading, product])
  return (
    <>
      { product.category===category ?
        product.map((product)=>(
          <Link to={`product/${product.id}`} style={{ textDecoration: 'none' }}>
          <Box style={{ textAlign: 'center' }}>
              <ProductImage src={product.url} alt='product' />
              <Text style={{ fontWeight: 600, color: '#212121' }}>{product.title.shortTitle}</Text>
              <Text style={{ color: 'green' }}>{product.discount}</Text>
              <Text style={{ color: '#212121', opacity: '.6' }}>{product.tagline}</Text>


          </Box>
      </Link>

        ))
        :
        <span>no data found</span>
      }

      {/* products.map((product) => (
                     <Link to={`product/${product.id}`} style={{ textDecoration: 'none' }}>
                         <Box style={{ textAlign: 'center' }}>
                             <ProductImage src={product.url} alt='product' />
                             <Text style={{ fontWeight: 600, color: '#212121' }}>{product.title.shortTitle}</Text>
                             <Text style={{ color: 'green' }}>{product.discount}</Text>
                             <Text style={{ color: '#212121', opacity: '.6' }}>{product.tagline}</Text>


                         </Box>
                     </Link>
                 ))) */}
     
 
   
   </>
  )
}

export default ViewAll