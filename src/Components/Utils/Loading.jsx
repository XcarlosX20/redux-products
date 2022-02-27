import styled from '@emotion/styled'
// import { useState } from 'react';
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
const Loader = styled.div`
border-radius: 50%;
width: ${props => (props.width || '11rem')};
height:  ${props => (props.height || '11rem')};
&:after {
  border-radius: 50%;
  width: 10em;
  height: 10em;
}
  margin: 60px auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(0,0,0, 0.2);
  border-right: 1.1em solid rgba(0,0,0, 0.2);
  border-bottom: 1.1em solid rgba(0,0,0, 0.2);
  border-left: 1.1em solid #000000;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1s infinite linear;
  animation: load8 1s infinite ease-out;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
`
const Loading = ({token, width, height}) => {
  // let dispatch = useDispatch();
  // const authRx = useSelector(state => state.auth.auth)
  // const [redirect, setRedirect] = useState(false)
  // useEffect(()=>{
  //   if(auth == false){
  //     setRedirect(true)
  //     console.log('no auth ', auth, authRx)
  //   }
  // },[auth, authRx, dispatch])
    return ( 
        <>
        <Loader width={width} height={height}/>
        {!token ?
          <Redirect to="/login"/> : null }
        </>
     );
}
 
export default Loading;