import './Login.css'

import { act, useEffect, useReducer, useState } from 'react'

import Card from '../UI/Card'
import Button from '../UI/Button'

const emailReducer = (state, action) => {
    if(action.type === "USER_INPUT") {
        return {
            value: action.val,
            isValid: action.val.includes("@")
        }
    } else if(action.type == "INPUT_BLUR") {
        return {
            value: state.value,
            isValid: state.value.includes("@")
        }
    }

    return {value: '', isValid: false}  
}

const passwordReducer = (state, action) => {
    if(action.type === "USER_INPUT") {
        return {
            value: action.val,
            isValid: action.val.trim().length > 6
        }
    } else if(action.type == "INPUT_BLUR") {
        return {
            value: state.value,
            isValid: state.value.trim().length > 6
        }
    }

    return {value: '', isValid: false}  
}

const Login = (props) => {
    const [formIsValid, setFormValid] = useState(false)

    const [emailState, dispatchEmail] = useReducer(emailReducer, {value: '', isValid: null})
    const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value: '', isValid: null})

    useEffect(() => {
        const timeOut = setTimeout(() => {
            console.log('Checking form validity')
            setFormValid(emailState.isValid && passwordState.isValid)   
        }, 500)
        return () => {
            clearTimeout(timeOut)
        }
    }, [emailState.isValid, passwordState.isValid]);

    const emailChangeHandler = (event) => {
        dispatchEmail({type: 'USER_INPUT', val: event.target.value})
        setFormValid(emailState.isValid && passwordState.isValid)
    }

    const passwordChangeHandler = (event) => {
        dispatchPassword({type: 'USER_INPUT', val: event.target.value})
        setFormValid(emailState.isValid && passwordState.isValid)
    }

    const emailValidateHandler = () => {
        dispatchEmail({type: 'INPUT_BLUR'})
    }

    const passwordValidateHandler = () => {
        dispatchPassword({type: 'INPUT_BLUR'})
    }

    const submitHandler = (event) => {
        event.preventDefault();
        console.log('Submitted')
        props.onLogin(emailState.value, passwordState.value)
    };
    return (
        <Card className="login">
            <form onSubmit={submitHandler}>
                <div className={`control ${emailState.isValid ? '' : 'invalid'}`}>	
                    <label for="email">Email</label>
                    <input type="email" id="email" onBlur={emailValidateHandler} value={emailState.value} onChange={emailChangeHandler}></input>
                </div>
                <div className={`control ${passwordState.isValid ? '' : 'invalid'}`}>
                    <label for="password">Password</label>
                    <input type="password" id="password" onBlur={passwordValidateHandler} value={passwordState.value} onChange={passwordChangeHandler}></input>
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