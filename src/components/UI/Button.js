import './Button.css'

const Button = (props) => {
    return (
        <button className='button' type={props.type} disabled={props.disabled} onClick={props.onClick}>
            {props.children}
        </button>
    )
}   

export default Button