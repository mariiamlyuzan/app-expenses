import React from 'react';
import { useFormik } from 'formik';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { authOperations } from '../redux/auth';
import { style } from '../style/style';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

const Wrapper = styled.div`
  max-width: 40%;
  padding: 20px;
  margin: 0 auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Label = styled.label`
  font-weight: 400;
  font-size: 20px;
  padding: 12px;
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
  padding: 12px;
  min-width: 40%;
  background-color: ${style.mainColor};
  border-radius: 8px;
  margin-bottom: 20px;
  cursor: pointer;
  :focus {
    border: none;
    bakground-color: ${style.mainColor};
  }
`;

const Button = styled.button`
  font-weight: 400;
  font-size: 20px;
  text-decoration: none;
  color: ${style.accentColor};
  border: none;
  border-bottom: 1px solid ${style.accentColor};
  padding: 12px;
  background-color: ${style.mainColor};
  border-radius: 8px;
  font-family: 'Source Sans Pro', sans-serif;
  cursor: pointer;
  :hover {
    border-top: 1px solid ${style.accentColor};
    border-left: 1px solid ${style.accentColor};
    border-bottom: none;
  }
`;

const Span = styled.span`
  color: red;
`;

const Div = styled.div`
  text-align: left;
  min-width: 40%;
`;

export const Login = () => {
  const { t } = useTranslation(['common']);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string()
        .min(6, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    }),
    onSubmit: values => {
      dispatch(authOperations.logIn(values));
      formik.resetForm();
    },
  });
  return (
    <Wrapper>
      <Form onSubmit={formik.handleSubmit}>
        <Label htmlFor="email">{t('emailAddress')}</Label>
        <Div>
          {formik.touched.email && formik.errors.email && (
            <Span>{formik.errors.email}</Span>
          )}
        </Div>
        <Input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <Label htmlFor="password">{t('password')}</Label>
        <Div>
          {formik.touched.password && formik.errors.password && (
            <Span>{formik.errors.password}</Span>
          )}
        </Div>
        <Input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <Button type="submit">{t('login')}</Button>
      </Form>
    </Wrapper>
  );
};
