import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { addCustomerAction, removeCustomerAction } from './store/customerReducer';
import { addCashAction, getCashAction } from './store/cashReducer';
import { fetchCustomers } from './asyncActions/customers';
import {asyncDecrementCreator, asyncIncrementCreator, decrementCreator, incrementCreator} from "./store/countReducer";
import {fetchUsers} from "./store/userReducer";

function App() {

  const dispatch = useDispatch()
  const cash = useSelector(state => state.cash)
  const customer = useSelector(state => state.customer)
  const count = useSelector(state => state.countReducer.count)
  const users = useSelector(state => state.userReducer.users)

  const addCash = (amount) => {
    dispatch(addCashAction(amount))
  }
  const getCash = (amount) => {
    dispatch(getCashAction(amount))
  }

  const addCustomer = (name) => {
    const customer = {
      name, 
      id: Date.now()
    }
    dispatch(addCustomerAction(customer))
  }

  const removeCustomer = (id) => {
    dispatch(removeCustomerAction(id))
  }

  return (
    <div className="App">
      <div style={{fontSize:"1.5rem"}}>
        {cash.cash}
      </div>
      <div style={{display: "flex"}}>
          <button onClick={() => {addCash(Number(prompt('Enter cash amount')))}}>Add cash</button>
          <button onClick={() => {getCash(Number(prompt('Enter cash amount')))}}>Get cash</button>
          <button onClick={() => {addCustomer(prompt('Enter customer name'))}}>Add customer</button>
          <button onClick={() => dispatch(fetchCustomers())}>Get client from fake DB</button>
      </div>
      {customer.customers.length > 0 ?
          <div style={{marginTop: "10px"}}>
            {customer.customers.map(customer => (
              <div key={customer.id} className="customer" onClick={() => {removeCustomer(customer.id)}}>{customer.name}</div>
            ))}
          </div>
          :
          <div>
            No clients!
          </div>
      }

      <br></br>
      <hr></hr>
      <br></br>

      <div className="saga-block">
        <h1>Saga</h1>
        <div className="count">{count}</div>
        <div className="btns">
            <button className="btn" onClick={() => dispatch(asyncIncrementCreator())}>ИНКРЕМЕНТ++</button>
            <button className="btn" onClick={() => dispatch(asyncDecrementCreator())}>ДЕКРЕМЕНТ--</button>
            <button className="btn" onClick={() => dispatch(fetchUsers())}>ПОЛУЧИТЬ ЮЗЕРОВ--</button>
        </div>
        <div className="users">
            {users.map(user =>
                <div className="user" key={user.id}>
                    {user.name}
                </div>
            )}
        </div>
      </div>

    </div>
  );
}

export default App;
