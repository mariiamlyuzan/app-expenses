import styled from 'styled-components';
import { useState } from 'react';
import { expensesSelectors } from '../redux/expenses';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { style } from '../style/style';
import { useTranslation } from 'react-i18next';
const Box = styled.div`
  max-width: 40%;
  padding: 20px;
  margin: 0 auto;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Link = styled(NavLink)`
  font-weight: 100;
  font-size: 20px;
  text-decoration: none;
  padding: 0px;
  margin: 5px;
  color: ${style.accentColor};
`;

const Label = styled.label`
  font-weight: 400;
  font-size: 20px;
  padding: 8px;
  min-width: 40%;

  color: ${style.accentColor};
`;

const Input = styled.input`
  font-weight: 400;
  font-size: 20px;
  text-decoration: none;
  color: ${style.accentColor};
  border: none;
  border-bottom: 1px solid ${style.accentColor};
  padding: 8px;
  min-width: 40%;
  background-color: ${style.mainColor};
  border-radius: 8px;
  margin-bottom: 20px;
  cursor: pointer;
`;
export default function Expenses() {
  const { t } = useTranslation(['common']);
  const expenses = useSelector(expensesSelectors.getExpenses);
  const [filter, setFilter] = useState('');
  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleExpenses = () => {
    const normalizedFilter = filter.toLowerCase();

    return expenses.filter(exp =>
      exp.date.toLowerCase().includes(normalizedFilter),
    );
  };

  const filterExpenses = getVisibleExpenses();
  return (
    <Box>
      <Wrapper>
        <Label>
          {t('findExpenses')}
          <Input type="text" value={filter} onChange={changeFilter}></Input>
        </Label>

        {filterExpenses &&
          filterExpenses.map(exp => (
            <div key={exp._id}>
              <Link to={`${exp._id}`}>{exp.date}</Link>
            </div>
          ))}
      </Wrapper>
    </Box>
  );
}