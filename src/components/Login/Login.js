import './Login.css'

import { useEffect, useState } from 'react'

import Card from '../UI/Card'
import Button from '../UI/Button'

const Login = (props) => {
    const [enteredEmail, setEnteredEmail] = useState('')
    const [enteredPassword, setEnteredPassword] = useState('')
    const [emailIsValid, setEmailIsValid] = useState()
    const [passwordIsValid, setPasswordIsValid] = useState()
    const [formIsValid, setFormValid] = useState(false)

    useEffect(() => {
        const timeOut = setTimeout(() => {
            console.log('Checking form validity')
            setFormValid(emailIsValid && passwordIsValid)
        }, 500)
        return () => {
            clearTimeout(timeOut)
        }
    }, [emailIsValid, passwordIsValid]);

    const emailChangeHandler = (event) => {
        setEnteredEmail(event.target.value)
    }

    const passwordChangeHandler = (event) => {
        setEnteredPassword(event.target.value)
    }

    const emailValidateHandler = () => {
        setEmailIsValid(enteredEmail.includes('@'))
    }

    const passwordValidateHandler = () => {
        setPasswordIsValid(enteredPassword.trim().length > 6)
    }

    const submitHandler = (event) => {
        event.preventDefault();
        console.log('Submitted')
        props.onLogin(enteredEmail, enteredPassword)
    };
    return (
        <Card className="login">
            <form onSubmit={submitHandler}>
                <div className={`control ${emailIsValid ? '' : 'invalid'}`}>	
                    <label for="email">Email</label>
                    <input type="email" id="email" onBlur={emailValidateHandler} value={enteredEmail} onChange={emailChangeHandler}></input>
                </div>
                <div className={`control ${passwordIsValid ? '' : 'invalid'}`}>
                    <label for="password">Password</label>
                    <input type="password" id="password" onBlur={passwordValidateHandler} value={enteredPassword} onChange={passwordChangeHandler}></input>
                </div>
                <div className='actions'>
                    <Button type="submit" disabled={!formIsValid}>
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    )
}

export default Login