import {useEffect, useState} from 'react'
import {useNavigate } from 'react-router-dom'
import {Form, Button ,Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import {savePaymentMethod} from '../actions/cartActions'

const PaymentScreen = () => {
    const navigate= useNavigate()

    const cart = useSelector(state=>state.cart)
    const { shippingAddress} =cart


    if (!shippingAddress.address) {
        navigate('/shipping')
      }
    
    const [paymentMethod, setPaymentMethod] = useState('Paypal')
    
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(()=>{
        if (!userInfo) {
            navigate('/login')
        }
    },[userInfo,navigate])
    
    const dispatch = useDispatch()


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check type='radio' label='Paypal or Credit Card' id='Paypal' name='paymentMethod' value='Paypal' checked onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
                        {/* <Form.Check type='radio' label='Stripe' id='Stripe' name='paymentMethod' value='Stripe' onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check> */}
                    </Col>
                </Form.Group>
                <Button className='mt-3' type='submit' variant='primary'>Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen