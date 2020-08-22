import * as yup from 'yup';

const schema = yup.object().shape({
  eml: yup.string().email('This must be a valid email').required('This is a required field'),
  psw: yup.string().required('This is a required field'),
});

export default schema;