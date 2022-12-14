import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { expensesSelectors } from '../redux/expenses';
import { style } from '../style/style';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 0px;
`;
const Box = styled.div`
  width: 80%;
  border-bottom: 1px solid ${style.accentColor};
  margin-bottom: 10px;
`;
const Title = styled.p`
  font-weight: 100;
  font-size: 20px;
  text-decoration: none;
  padding: 0px;
  margin: 0;
  color: ${style.accentColor};
`;

const Item = styled.p`
  font-weight: 100;
  font-size: 17px;
  text-decoration: none;
  padding: 0px;

  color: ${style.accentColor};
`;
const Item2 = styled.span`
  font-weight: 100;
  font-size: 18px;
  text-decoration: none;
  padding: 0px;
  margin-left: 8px;
  color: ${style.accentColor};
`;

const Label = styled.label`
  font-weight: 400;
  font-size: 20px;
  padding: 8px;
  min-width: 40%;
  display: block;
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
  border-radius: 0 0 8px 8px;
  margin-bottom: 20px;
  cursor: pointer;
`;

export default function ExpensesByMonth() {
  const [filter, setFilter] = useState('');
  const { t } = useTranslation(['common']);
  const expenses = useSelector(expensesSelectors.getExpenses);

  const yearAndMonth = expenses.map(exp => exp.date.slice(0, 7));

  const allyearAndMonth = [...new Set(yearAndMonth)];

  const allyearAndMonthSort = [...allyearAndMonth].sort(
    (a, b) => Number(b) - Number(a),
  );

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleExpenses = () => {
    return (
      allyearAndMonthSort &&
      allyearAndMonthSort.filter(date => date.includes(filter))
    );
  };

  const allyearAndMonthSortAndFilter = getVisibleExpenses();

  return (
    <>
      <Label>{t('find')}</Label>
      <Input
        type="text"
        placeholder={t('yyyy/mm')}
        value={filter}
        onChange={changeFilter}
      ></Input>
      {allyearAndMonthSortAndFilter &&
        allyearAndMonthSortAndFilter.map(yearAndMonth => (
          <Wrapper key={yearAndMonth}>
            <Box>
              <Title>{yearAndMonth}</Title>
              <Item>
                {t('totalFood')}:
                <Item2>
                  {expenses &&
                    expenses
                      .filter(exp => exp.date.slice(0, 7) === yearAndMonth)
                      .reduce((prev, exp) => {
                        return Number(prev) + Number(exp.food);
                      }, 0)}
                </Item2>
              </Item>

              <Item>
                {t('totalGoods')}:
                <Item2>
                  {expenses &&
                    expenses
                      .filter(exp => exp.date.slice(0, 7) === yearAndMonth)
                      .reduce((prev, exp) => {
                        return Number(prev) + Number(exp.goods);
                      }, 0)}
                </Item2>
              </Item>
              <Item>
                {t('totalServices')}:
                <Item2>
                  {expenses &&
                    expenses
                      .filter(exp => exp.date.slice(0, 7) === yearAndMonth)
                      .reduce((prev, exp) => {
                        return Number(prev) + Number(exp.services);
                      }, 0)}
                </Item2>
              </Item>
              <Item>
                {t('totalMakeup')}:
                <Item2>
                  {expenses &&
                    expenses
                      .filter(exp => exp.date.slice(0, 7) === yearAndMonth)
                      .reduce((prev, exp) => {
                        return Number(prev) + Number(exp.makeup);
                      }, 0)}
                </Item2>
              </Item>
              <Item>
                {t('totalMedicine')}:
                <Item2>
                  {expenses &&
                    expenses
                      .filter(exp => exp.date.slice(0, 7) === yearAndMonth)
                      .reduce((prev, exp) => {
                        return Number(prev) + Number(exp.medicine);
                      }, 0)}
                </Item2>
              </Item>
              <Item>
                {t('totalClothing')}:
                <Item2>
                  {expenses &&
                    expenses
                      .filter(exp => exp.date.slice(0, 7) === yearAndMonth)
                      .reduce((prev, exp) => {
                        return Number(prev) + Number(exp.clothing);
                      }, 0)}
                </Item2>
              </Item>
              <Item>
                {t('totalTransport')}:
                <Item2>
                  {expenses &&
                    expenses
                      .filter(exp => exp.date.slice(0, 7) === yearAndMonth)
                      .reduce((prev, exp) => {
                        return Number(prev) + Number(exp.transport);
                      }, 0)}
                </Item2>
              </Item>
              <Item>
                {t('total')}:
                <Item2>
                  {expenses &&
                    expenses
                      .filter(exp => exp.date.slice(0, 7) === yearAndMonth)
                      .reduce((prev, exp) => {
                        return (
                          Number(prev) +
                          Number(exp.food) +
                          Number(exp.goods) +
                          Number(exp.services) +
                          Number(exp.makeup) +
                          Number(exp.medicine) +
                          Number(exp.clothing) +
                          Number(exp.transport)
                        );
                      }, 0)}
                </Item2>
              </Item>
            </Box>
          </Wrapper>
        ))}
    </>
  );
}
