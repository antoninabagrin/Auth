import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TermsDialog from './TermsDialog';
import axios from '../../utils/axios';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import {
  Avatar,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { boolean } from 'yup';

export default function SignUp() {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();
  const history = useNavigate();
  const errorStyle = { color: 'red' };

  const formik = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().email(t('Invalid email')).required(t('Required')),
      firstName: Yup.string()
        .max(20, t('Must be 20 characters or less'))
        .required(t('Required')),
      lastName: Yup.string()
        .max(20, t('Must be 20 characters or less'))
        .required(t('Required')),
      username: Yup.string()
        .max(10, t('Must be 10 characters or less'))
        .required(t('Required')),
      password: Yup.string().required(t('Password is required')),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref('password'), null],
        t('Passwords must match'),
      ),
    }),
    onSubmit: (values) => {
      axios
        .post('/auth/signup', {
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          password: values.password,
          confirmPassword: values.confirmPassword,
          username: values.username,
        })
        .then(function (response) {
          if (response.data === 'USER_CREATED' && response.status === 201) {
            history('/signin');
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  });

  const checkDisableJoinButton = () => {
    console.log(formik.values);
    return !formik.values.acceptTerms;
  };

  return (
    <div>
      <TermsDialog
        open={open}
        setOpen={setOpen}
        setFieldValue={formik.setFieldValue}
      />
      <Container maxWidth='sm'>
        <Box
          margin={'10px'}
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
            <Avatar />
            <Typography component='h1' variant='h5'>
              {t('Sign up')}
            </Typography>
          </Box>
          <Box component='form' onSubmit={formik.handleSubmit}>
            <TextField
              margin='normal'
              fullWidth
              autoFocus
              label={t('Email Address')}
              id='email'
              name='email'
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <div style={errorStyle}>{formik.errors.email}</div>
            )}
            <TextField
              margin='normal'
              fullWidth
              autoFocus
              label={t('First Name')}
              id='firstName'
              name='firstName'
              onChange={formik.handleChange}
              value={formik.values.firstName}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <div style={errorStyle}>{formik.errors.firstName}</div>
            )}
            <TextField
              margin='normal'
              fullWidth
              autoFocus
              label={t('Last Name')}
              id='lastName'
              name='lastName'
              onChange={formik.handleChange}
              value={formik.values.lastName}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <div style={errorStyle}>{formik.errors.lastName}</div>
            )}
            <TextField
              margin='normal'
              fullWidth
              autoFocus
              label={t('Username')}
              id='username'
              name='username'
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username && (
              <div style={errorStyle}>{formik.errors.username}</div>
            )}
            <TextField
              margin='normal'
              fullWidth
              autoFocus
              label={t('Password')}
              id='password'
              type='password'
              name='password'
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <div style={errorStyle}>{formik.errors.password}</div>
            )}
            <TextField
              margin='normal'
              fullWidth
              autoFocus
              label={t('Confirm password')}
              id='confirmPassword'
              type='password'
              name='confirmPassword'
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <div style={errorStyle}>{formik.errors.confirmPassword}</div>
              )}
            <FormControlLabel
              control={
                <Checkbox
                  onClick={() => setOpen(true)}
                  value='term'
                  color='primary'
                  checked={formik.values.acceptTerms}
                />
              }
              label={t('I accept the terms and conditions.')}
            />
            {formik.touched.acceptTerms && formik.errors.acceptTerms && (
              <div style={errorStyle}>{formik.errors.acceptTerms}</div>
            )}
            <button
              className='joinButton'
              type='button'
              disabled={checkDisableJoinButton()}
            >
              Join!
            </button>
            {/* <button
              type='submit'
              className='myButton'
              disabled={checkDisableJoinButton()}
            >
              {t('Join')}
            </button> */}
            {/* <Button
              type='submit'
              fullWidth
              variant='contained'
              disabled={checkDisableJoinButton()}
            >
              {t('Join')} */}
            {/* </Button> */}
            <Box display={'flex'} justifyContent={'flex-end'}>
              <Link href='/signin' variant='body2'>
                {t('Already have an account? Sign in!')}
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
