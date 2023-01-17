import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = props => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { register, clearRegistered, registerSuccess, error, clearErrors, isAuthenticated, user} = authContext;

  useEffect(() => {
    console.log("register user")
    console.log(user)
    if (!isAuthenticated) {
      props.history.push('/login');
    }
    if (user?.userRole === "CUSTOMER"){
      props.history.push('/');
    }

    if (error === 'User already exists') {
      setAlert(error, 'danger');
      clearErrors();
    }
    if (registerSuccess) {
      clearRegistered();
      props.history.push('/');
    }

    // eslint-disable-next-line
  }, [error, registerSuccess, isAuthenticated, props.history]);

  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    adresse: '',
    password: '',
    password2: ''
  });

  const { firstName, lastName, email, adresse, password, password2 } = newUser;

  const onChange = e => setNewUser({ ...newUser, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (firstName === '' || email === '' || password === '') {
      setAlert('Please enter all fields', 'danger');
    } else if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
       register({
        firstName: firstName,
        lastName: lastName,
        email: email,
        address: adresse,
        password: password,
        userRole: 'CUSTOMER'
      });
    }
  };

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>First Name</label>
          <input
            id='firstName'
            type='text'
            name='firstName'
            value={firstName}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='name'>Last Name</label>
          <input
              id='lastName'
              type='text'
              name='lastName'
              value={lastName}
              onChange={onChange}
              required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input
            id='email'
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='name'>Adresse</label>
          <input
              id='adresse'
              type='text'
              name='adresse'
              value={adresse}
              onChange={onChange}
              required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
            minLength='6'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password2'>Confirm Password</label>
          <input
            id='password2'
            type='password'
            name='password2'
            value={password2}
            onChange={onChange}
            required
            minLength='6'
          />
        </div>
        <input
          type='submit'
          value='Register'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Register;
