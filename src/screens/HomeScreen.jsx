import { useEffect } from "react";
import Product from "../components/Product"
import {Row,Col} from 'react-bootstrap';
import {useParams ,Link} from 'react-router-dom'
import {useDispatch , useSelector} from 'react-redux'
import { listProducts } from "../actions/productActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";


const HomeScreen = () => {

  const { keyword } = useParams()
  const  {pageNumber =1}  = useParams()

  const dispatch = useDispatch()
  const productList =  useSelector(state =>  state.productList)
  const {loading, error ,products,page,pages} = productList

  useEffect(()=>{
    dispatch(listProducts(keyword,pageNumber))
  },[dispatch,keyword,pageNumber])


  return (
    <> 
        <Meta  />
        {!keyword ? <ProductCarousel/> : <Link to='/' onClick={()=>{
          // eslint-disable-next-line
          keyword=''}} className="btn tbn-light">Go Back</Link>}
        <h1>Latest Products</h1>
        {loading ? (<Loader/>) : error ? (<Message variant='danger'>{error}</Message>) :
          <>
            <Row>
                {products.length === 0 ? <Message variant='danger'>There is no results for the search operation</Message> : products.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
                
            </Row>
            <Paginate pages={pages} page={page} keyword = {keyword ? keyword : ''}></Paginate>
          </>
        }
    </>
  )
}

export default HomeScreen