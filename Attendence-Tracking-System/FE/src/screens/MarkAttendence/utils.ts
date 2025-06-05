import * as Yup from 'yup';

const initialValues = {
    name : null,
    email : null,
    photo : null
}

const validationSchema = Yup.object().shape({
  name: Yup.string().nullable()
    .required('Name is required')
    .trim()
    .matches(/^(?!\s*$).+/, 'Name cannot be only spaces'),
  photo: Yup.string().nullable().required('Photo is required'),  
  email: Yup.string().nullable().required('Email is required').email('Invalid email format').trim().matches(/^(?!\s*$).+/, 'Email cannot be only spaces'),
});

export {initialValues, validationSchema}