import React, {useState, useContext, useEffect} from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Login = (props) =>{
    const alertContext = useContext(AlertContext) 
    const{setAlert} = alertContext;
    const authContext = useContext(AuthContext)
    const {login, error, clearErrors, isAuthenticated } = authContext;


    useEffect(()=>{

        if(isAuthenticated){
            props.history.push('/')

        }

        if(error ==='Invalid Credentials'){
            setAlert(error, 'danger');
            clearErrors();
        }

        //es-lint-disable-next-line
    },[error,isAuthenticated, props.history]);


    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    const onChange = (e) => setUser({...user, [e.target.name]: e.target.value})
    const onSubmit = (e) => {
        e.preventDefault();
        if(email === '' || password === ''){
            setAlert("Please fill in all fields", 'danger');
        }else{
            login({
                email,
                password
            })
        }
    }
    /*destructure */
    const { email, password} = user;
    return(
        <div className='form-container'>
            <h1>Login</h1>

            <form onSubmit={onSubmit}>

                <div className ="form-group">
                    <label htmlFor="email">Your Email</label>
                    <input type="email" name="email" value={email} onChange={onChange} ></input>
                </div>
                <div className ="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={onChange} ></input>
                </div>
                <input type="submit" value="Login" className="btn btn-primary btn-block"></input>
            </form>
        </div>
    )

}

export default Login