import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom';

function Auth(props) {
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    const userDetail = localStorage.getItem('log');
    if (userDetail === null) {
      props.history.push('/login');
    } else {
      setAuthenticated(true)
    }
  }, [])

  const children = props.children



  if (authenticated === false) {
    return (
      <div>loading....</div>
    );
  }
  return (
    <div>
      {children}
    </div>
  );
}


export default withRouter(Auth);
