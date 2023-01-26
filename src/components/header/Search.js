import React, { useEffect, useState } from 'react'
import { InputBase, Box, styled, List, ListItem } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { useSelector, useDispatch } from 'react-redux'
import { getProducts } from '../../redux/actions/productActions'
import { Link } from 'react-router-dom';

const SearchContainer = styled(Box)(({theme})=>({
    background:'#fff',
    width:'38%',
    marginLeft:'10px',
    borderRadius:'2px',
    display:'flex',
    [theme.breakpoints.down('md')]:{
        marginLeft:'auto',
    }
}))

const ListWrapper = styled(List)(({theme})=>({
    position:'absolute',
    background:'#ffffff',
    marginTop:'44px',
    color:'#000000',
    [theme.breakpoints.down('md')]:{
        marginLeft:'-189px',
        marginRight:'5px',
    }
}))

const InputSearchBase = styled(InputBase)`
    padding-left:20px;
    width:100%;
    font-size:unset;
`
const SearchIconWrapper = styled(Box)`
    color:blue;
    padding:5px;
    display:flex;
`


function Search() {
    const { products } = useSelector(state => state.getProducts)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])
    const [text, setText] = useState('')
    const getText = (text) => {
        setText(text)
    }
    return (
        <SearchContainer>
            <InputSearchBase
                placeholder='Search for products, brands and more'
                onChange={(e) => getText(e.target.value)}
                value={text }
            />
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            {
                text &&
                <ListWrapper>
                    {
                        products.filter(product => product.title.longTitle.toLowerCase().includes(text.toLocaleLowerCase())).map(product => (
                            <ListItem>
                                <Link
                                    to={`/product/${product.id}`}
                                    onClick={()=>setText('')}
                                    style={{textDecoration:'none',color:'inherit'}}
                                >
                                    {product.title.longTitle}
                                </Link>
                            </ListItem>
                        ))
                    }
                </ListWrapper>
            }
        </SearchContainer>
    )
}

export default Search