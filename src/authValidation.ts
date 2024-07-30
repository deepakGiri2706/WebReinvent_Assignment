import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from './redux/Store';


const AuthValidation = ({ children }: { children: JSX.Element }) => {

  const navigation = useNavigate()
  
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  useEffect(()=>{
    
    if(!isAuthenticated){
      navigation("/signin")
    }
  },[isAuthenticated])

  return isAuthenticated ? children : null
};

export default AuthValidation;
