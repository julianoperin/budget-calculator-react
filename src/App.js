import React, { useState } from "react";
import "./App.css";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import Alert from "./components/Alert";
import { v4 as uuidv4 } from "uuid";

const initialExpense = [
  { id: uuidv4(), charge: "rent", amount: 1600 },
  { id: uuidv4(), charge: "car payment", amount: 400 },
  { id: uuidv4(), charge: "credit card payment", amount: 1200 },
];

const App = () => {
  //! ************ State Values  *****************/
  //! all expenses, add expense
  const [expenses, setExpenses] = useState(initialExpense);

  //! single expense
  const [charge, setCharge] = useState("");
  console.log(charge);

  //! single amount
  const [amount, setAmount] = useState("");
  console.log(amount);

  //! Alert
  const [alert, setAlert] = useState({ show: false });

  //! ************ Functionality  *****************/
  //! Handle charge
  const handleCharge = (e) => {
    setCharge(e.target.value);
  };

  //! Handle amount
  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  //! Handle alert
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };

  //! Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      const singleExpense = { id: uuidv4(), charge, amount };
      setExpenses([...expenses, singleExpense]);
      handleAlert({ type: "success", text: "item added" });
      setCharge("");
      setAmount("");
    } else {
      //! Handle alert else
      handleAlert({
        type: "danger",
        text:
          "charge can't be empty value and amount value has to be a bigger than zero",
      });
    }
  };

  //! clear all items
  const clearItems = () => {
    setExpenses([]);
  };

  //! handle delete
  const handleDelete = (id) => {
    console.log(`item deleted: ${id}`);
  };

  //! handle edit
  const handleEdit = (id) => {
    console.log(`item edited: ${id}`);
  };

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}

      <h1>Budget Calculator:</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleCharge={handleCharge}
          handleAmount={handleAmount}
          handleSubmit={handleSubmit}
        />
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
      </main>
      <h1>
        total spending:{" "}
        <span className="total">
          $
          {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>
    </>
  );
};

export default App;
