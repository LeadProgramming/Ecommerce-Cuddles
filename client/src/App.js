import React from "react";
// import HomePage from "./HomePage";
import ListingsPage from "./ListingsPage";
import AccountPage from "./AccountPage";
import ShoppingCart from "./components/ShoppingCart";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import BillingAddressPage from "./BillingAddressPage";
import BillingPage from "./BillingPage";
import ConfirmationPage from "./ConfirmationPage";
import AdminPage from "./AdminPage";
import CheckoutPage from "./CheckoutPage";
import UserOrders from "./UserOrders";
import Logout from "./components/Logout";
import AdminSalesPage from "./AdminSalesPage";
import AdminOrdersPage from "./AdminOrdersPage";
import { Route, Switch } from "react-router-dom";
import { UserContext, ItemsContext, CartContext, OrdersContext } from "./context/Context.js";
import { useUserContext, useItemsContext, useCartContext } from "./hooks/contextHooks.js";


//hold account status, info, orders, shopping cart
function App() {
  return (
    <UserContext.Provider value={useUserContext()}>
      <ItemsContext.Provider value={useItemsContext()}>
        <CartContext.Provider value={useCartContext()}>
          <Switch>
            <Route exact path="/"><ListingsPage /></Route>
            {/* <Route path="/listings"><ListingsPage /></Route> */}
            <Route path="/orders"><UserOrders /></Route>
            <Route path="/account"><AccountPage /></Route>
            <Route path="/cart"><ShoppingCart /></Route>
            <Route path="/login"><LoginPage /></Route>
            <Route path="/logout"><Logout /></Route>
            <Route path="/register"><RegisterPage /></Route>
            <Route path="/checkout"><CheckoutPage /></Route>
            <Route path="/address"><BillingAddressPage /></Route>
            <Route path="/billing"><BillingPage /></Route>
            <Route path="/confirmation"><ConfirmationPage /></Route>
            <Route path="/dashboard/listings"><ListingsPage /></Route>
            <Route path="/dashboard/sales"><AdminSalesPage /></Route>
            <Route path="/dashboard/orders"><AdminOrdersPage /></Route>
            <Route path="/dashboard"><AdminPage /></Route>
          </Switch>
        </CartContext.Provider>
      </ItemsContext.Provider>
    </UserContext.Provider >
  );
}
export default App;