import axios from 'axios'
import {useState,useEffect} from 'react'
import {Link ,useParams, useNavigate } from 'react-router-dom'
import {Form, Button, } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {listProductDetails, updateProduct} from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import { PROXY } from '../constants/proxyConstant'

const ProductEditScreen = () => {

    const { id:productId } = useParams();

    const [name,setName] = useState('')
    const [price,setPrice] = useState(0)
    const [image,setImage] = useState('')
    const [brand,setBrand] = useState('')
    const [category,setCategory] = useState('')
    const [countInStock,setCountInStock] = useState(0)
    const [description,setDescription] = useState('')
    const [uploading,setUploading] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const productDetails = useSelector(state=> state.productDetails)
    const {loading, error, product} = productDetails

    const productUpdate = useSelector(state=> state.productUpdate)
    const {loading:loadingUpdate, error:errorUpdate , success: successUpdate} = productUpdate

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(()=>{
        if (!userInfo) {
            navigate('/login')
            
        }
        if(successUpdate){
            dispatch({type:PRODUCT_UPDATE_RESET})
            navigate('/admin/productlist')
        }else{

            if(!product.name || product._id !== productId ){
                dispatch(listProductDetails(productId))
            }else{

                if( product.name !== name )
                    dispatch(listProductDetails(productId))
                    setName(product.name)
                    setPrice(product.price)
                    setCountInStock(product.countInStock)
                    setImage(product.image)
                    setBrand(product.brand)
                    setCategory(product.category)
                    setDescription(product.description)
            }

        }

        // eslint-disable-next-line
    },[userInfo,dispatch,navigate,product,productId,successUpdate])
    

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)
    
        try {
          const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
    
          const { data } = await axios.post(`${PROXY}/api/upload`, formData, config)
    
          setImage(data)
          setUploading(false)
        } catch (error) {
          console.error(error)
          setUploading(false)
        }
      }

    const submitHandler = (e) => {
      e.preventDefault()
      dispatch(updateProduct({
        _id:productId,
        name,
        price,
        brand,
        category,
        description,
        countInStock,
        image


      }))
    }

  return (
    <>
        <Link className='btn btn-light my-3' to='/admin/productlist'>
            Go Back
        </Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ?  <Loader/> : error ? <Message variant='danger'>{error}</Message>:(
                    <Form  onSubmit={submitHandler} >

                        <Form.Group  controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='name' placeholder='Enter name' value={name} onChange={(e)=>setName(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group className='my-3' controlId='price'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control type='number' placeholder='Enter price' value={price} onChange={(e)=>setPrice(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group className='my-3' controlId='image'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control type='text' placeholder='Enter image url' value={image}  onChange={(e)=>setImage(e.target.value)}></Form.Control>
                            <Form.Control
                                type='file'
                                label='Choose File'
                                custom='true'
                                onChange={uploadFileHandler}
                            ></Form.Control>
                            {uploading && <Loader/>}
                        </Form.Group>

                        <Form.Group className='my-3' controlId='brand'>
                            <Form.Label>brand</Form.Label>
                            <Form.Control type='text' placeholder='Enter brand' value={brand}  onChange={(e)=>setBrand(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group className='my-3' controlId='countInStock'>
                            <Form.Label>Count In Stock</Form.Label>
                            <Form.Control type='number' placeholder='Enter countInStock' value={countInStock} onChange={(e)=>setCountInStock(e.target.value)}></Form.Control>
                        </Form.Group>


                        <Form.Group className='my-3' controlId='category'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control type='text' placeholder='Enter category' value={category}  onChange={(e)=>setCategory(e.target.value)}></Form.Control>
                        </Form.Group>


                        <Form.Group  controlId='description'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control type='text' placeholder='Enter Description' value={description}  onChange={(e)=>setDescription(e.target.value)}></Form.Control>
                        </Form.Group>

                   
                        

                        <Button className='my-3' type='submit' variant='primary'>
                            Update
                        </Button>

                    </Form>

                )}

        
            </FormContainer>
    </>
   
  )
}

export default ProductEditScreen 