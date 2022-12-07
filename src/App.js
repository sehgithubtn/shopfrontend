import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import { Container} from 'react-bootstrap';
import { Routes, Route } from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderListScreen from "./screens/OrderListScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import ProductListScreen from "./screens/ProductListScreen";

const App = () => {
  return (
    <> 
        <Header/>  
        <main className="py-3">
          <Container> 
              <Routes>
                  <Route exact path="/" element={<HomeScreen/>}  />
                  <Route path="/page/:pageNumber" element={<HomeScreen/>}  />
                  <Route path="/search/:keyword" element={<HomeScreen/>}  />
                  <Route path="/search/:keyword/page/:pageNumber" element={<HomeScreen/>}  />
                  <Route path="/product/:id" element={<ProductScreen/>}  />
                  <Route path='/cart/:id' element={<CartScreen/>}  />
                  <Route path='/cart' element={<CartScreen/>}  />
                  <Route path='/login' element={<LoginScreen/>}  />
                  <Route path='/register' element={<RegisterScreen/>}  />
                  <Route path='/profile' element={<ProfileScreen/>}  />
                  <Route path='/profile/:pageNumber' element={<ProfileScreen/>}  />
                  <Route path='/shipping' element={<ShippingScreen/>}  />
                  <Route path='/payment' element={<PaymentScreen/>}  />
                  <Route path='/placeorder' element={<PlaceOrderScreen/>}  />
                  <Route path='/order/:id' element={<OrderScreen/>}  />
                  <Route path='/admin/orderlist' element={<OrderListScreen/>}  />
                  <Route path='/admin/orderlist/:pageNumber' element={<OrderListScreen/>}  />
                  <Route path='/admin/userlist' element={<UserListScreen/>}  />
                  <Route path='/admin/userlist/:pageNumber' element={<UserListScreen/>}  />
                  <Route path='/admin/user/:id/edit' element={<UserEditScreen/>}  />
                  <Route path='/admin/productlist' element={<ProductListScreen/>}  />
                  <Route path='/admin/productlist/:pageNumber' element={<ProductListScreen/>}  />
                  <Route path='/admin/product/:id/edit' element={<ProductEditScreen/>}  />
                  <Route path="*" element={<PageNotFound />} />
              </Routes>
         </Container>
        </main>
        <Footer/>


    </>
  );
}

export default App;


function PageNotFound() {
  return (
    <div>
      <h2>404 Page not found</h2>
    </div>
  );
}