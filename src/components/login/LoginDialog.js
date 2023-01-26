import React,{useContext, useState} from 'react'
import Dialog from '@mui/material/Dialog';
import { Box, Button, TextField, Typography, styled } from '@mui/material';
import { authenticateSignup,authenticateLogin } from '../../service/api';
import { DataContext } from '../../context/DataProvider';


const Component = styled(Box)`
    width:90vh;
    height:76vh;
    display:flex;
`

const Image = styled(Box)`
    background:#2874f0 url(https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png) center 85% no-repeat;
    height:auto;
    width:30%;
    padding:45px 35px;
    &>p , &>h5{
        color:#ffffff;
        font-weight:600;
    }
`

const Wrapper = styled(Box)`
    display:flex;
    flex-direction:column;
    padding:15px 35px ;
    flex:1;
    & > div , & > button, & > p  {
        margin-top:20px;
        
    }
`
const LoginButton = styled(Button)`
    text-transform:none;
    background:#fb641b;
    color:#fff;
    height:48px;
    border-radius:2px;
    &:hover {
        background:#fb641b;
    }
`
const RequestOTP = styled(Button)`
    text-transform:none;
    background:#fff;
    color:#2874f0;
    height:48px;
    border-radius:2px;
    box-shadow:0 2px 4px 0 rgb(0 0 0/ 20%);
    &:hover {
        background:#fff;
    }
`
const Text = styled(Typography)`
    font-size:12px;
    color:#878787;
`
const accountInitialValue ={
    login:{
        view:'login',
        heading:'Login',
        subHeading:'Get access to your Orders, Wishlist and Recommendations'
    },
    signup:{
        view:'signup',
        heading:"Looks like you're new here!",
        subHeading:'Sign up with your mobile number to get started'
    }

}
const signupInitialValues={
    firstname:'',
    lastname:'',
    email:'',
    mobile:''
}
const loginIntialValues={
    email:'',
    password:''
}

const LoginDialog = ({ open, setOpen }) => {
    
   const [account,toggleAccount]= useState(accountInitialValue.login)
   const [signup,setSignup] =useState(signupInitialValues)
   const [login,setLogin]=useState(loginIntialValues)

    const {setAccount} =useContext(DataContext)

   const toggleSignup=()=>{
    toggleAccount(accountInitialValue.signup)
   }
   const toggleSignin=()=>{
    toggleAccount(accountInitialValue.login)
   }

    const handleClose = () => {
        setOpen(false)
        toggleAccount(accountInitialValue.login)

    }

    const onInputChange=(e)=>{
        setSignup({...signup,[e.target.name]: e.target.value})
        console.log(signup);
    }

    const signupUser=async ()=>{
      let response= await authenticateSignup(signup)
      if(!response) return
        handleClose();
        setAccount(signup.firstname)
    }

    const onvalueChange =(e)=>{
        setLogin({...login,[e.target.name]:e.target.value})
    }

    const loginUser=async ()=>{
      let response= await authenticateLogin(login);
      console.log(response);
      if(response.status === 200){
        handleClose();
        setAccount(response.data.data.firstname);
      }

    }

    
    return (
        <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { maxWidth: 'unset' } }}>
            <Component>
                <Image>
                    <Typography variant='h5'>{account.heading}</Typography>
                    <Typography style={{ marginTop: "20px" }}>{account.subHeading}</Typography>
                </Image>
                {
                    account.view==='login' ?
                    <Wrapper>
                        <TextField required variant='standard' name='email' onChange={(e)=>onvalueChange(e)} label='Enter Email/mobile Number' />
                        <TextField required variant='standard' type='password' name='password' onChange={(e)=>onvalueChange(e)} label='Enter Password' />
                        <Text>By continuing, you agree to Flipkart's Terms of Use and Privacy Policy. </Text>
                        <LoginButton onClick={()=>loginUser()}>Login</LoginButton>
                        <Typography style={{ textAlign: 'center' }}>OR</Typography>
                        <RequestOTP>Request OTP</RequestOTP>
                        <Typography  style={{ textAlign: 'center', fontSize: "14px",cursor:"pointer",color:'#2874f0' }} onClick={()=>toggleSignup()} >New to Flipkart? Create an account</Typography>
                    </Wrapper>
                    :
                    <div className='Scroll'>
                    <Wrapper>
                        <TextField required variant='standard' label='Enter firstname' name='firstname' onChange={(e)=>onInputChange(e)} />
                        <TextField required variant='standard' label='Enter lastname' name='lastname' onChange={(e)=>onInputChange(e)} />
                        <TextField required variant='standard' label='Enter Email Address' name='email' onChange={(e)=>onInputChange(e)} />
                        <TextField required variant='standard' type='password' label='Enter Password' name='password' onChange={(e)=>onInputChange(e)} />
                        <TextField required variant='standard' label='Enter Mobile Number' name='mobile' onChange={(e)=>onInputChange(e)} />
                        <Text>By continuing, you agree to Flipkart's Terms of Use and Privacy Policy. </Text>
                        <LoginButton onClick={()=>signupUser()} >CONTINUE</LoginButton>
                        <RequestOTP onClick={()=>toggleSignin()}>Existing User? Log in</RequestOTP>
                    </Wrapper>
                    </div>

                }

            </Component>
            
            


        </Dialog>
    )
}

export default LoginDialog