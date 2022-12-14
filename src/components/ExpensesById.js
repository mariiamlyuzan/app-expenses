import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { expensesOperations, expensesSelectors } from '../redux/expenses';
import { style } from '../style/style';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ExpensesFormUpdate } from './ExpensesFormUpdate';
import { BsArrow90DegLeft } from 'react-icons/bs';

const Wrapper = styled.div`
  width: 280px;
  padding: 0;
  margin: 0 auto;
  margin-bottom: 30px;
`;

const Button = styled.button`
  margin-right: 60%;
  font-weight: 400;
  font-size: 20px;
  text-decoration: none;
  color: ${style.accentColor};
  border: none;

  background-color: ${style.mainColor};
  border-radius: 8px;
  font-family: 'Kalam', cursive;
  cursor: pointer;
`;

export const ExpensesById = () => {
  const dispatch = useDispatch();
  const expensesByDate = useSelector(expensesSelectors.getExpensesById);
  const navigate = useNavigate();
  const { expensesId } = useParams();

  useEffect(() => {
    async function fetch() {
      try {
        await dispatch(expensesOperations.fetchExpensesById(expensesId));
      } catch (error) {
        console.log(error);
      }
    }
    fetch();
  }, [expensesId, dispatch]);

  return (
    <>
      <Button onClick={() => navigate(-1)}>
        <BsArrow90DegLeft />
      </Button>
      <Wrapper>
        {expensesByDate && <ExpensesFormUpdate value={expensesByDate} />}
      </Wrapper>
    </>
  );
};
