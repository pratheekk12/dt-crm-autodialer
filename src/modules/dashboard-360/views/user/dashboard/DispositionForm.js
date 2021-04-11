// import React, { useRef, useState, useEffect } from 'react';
// import { Field, Form, Formik } from 'formik';
// import { TextField } from 'formik-material-ui';
// import { Autocomplete } from '@material-ui/lab';
// import MuiAlert from '@material-ui/lab/Alert';
// import {
//   Button,
//   FormControl,
//   Grid,
//   makeStyles,
//   Snackbar
// } from '@material-ui/core';
// import * as yup from 'yup';
// import { map } from 'lodash';
// import Axios from 'axios';
// import CommonAlert from 'src/components/CommonAlert';
// import { getDispositionFormQuestions2 } from 'src/modules/dashboard-360/utils/util-functions';
// import { SAVE_DISPOSITION } from 'src/modules/dashboard-360/utils/endpoints';
// import { useSelector } from 'react-redux';

// const useStyle = makeStyles(() => ({
//   fieldContainer: {
//     width: '100%'
//   }
// }));

// function Alert(props) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

// const DispositionForm = ({ visibilty }) => {
// const userData = useSelector(state => state.userData);
// console.log('user data', userData);
// const [openSnackbar, setOpenSnackbar] = React.useState(false);
// const handleClose = (event, reason) => {
//   if (reason === 'clickaway') {
//     return;
//   }
//   setOpenSnackbar(false);
// };
// const classes = useStyle();
// const formRef = useRef({});
// const defaultQuestions = getDispositionFormQuestions2();
// const allQuestions = [...defaultQuestions];
// const [questions, setQuestions] = useState(allQuestions);

// const [snackbarMessage, setSnackbarMessage] = useState({
//   severity: '',
//   message: ''
// });

//   const addAnotherQues = (ques, index) => {
//     //questions.length = index+1
//     if (ques && ques.dependentQuestion) {
//       questions.splice(index + 1, 0, ...ques.dependentQuestion);
//       setQuestions(questions);
//     }
//     /*let nextQues = filter(allQuestions, function(que) {
//       return includes(ques.nextQuestions,que.questionCode)
//     });
//     if(!isEmpty(nextQues)){
//       ques.nextQues = nextQues
//     }
//     if(ques.nextQues || ques.answers){
//       setQuestions([...questions,ques])
//     }*/
//   };

//   const resetQuestions = () => {
//     setQuestions(defaultQuestions);
//   };

//   async function saveDispositionForm(formValue) {
// formValue.sip_id = userData.sip_id;
// formValue.agent_type = userData.agent_type;
//     console.log({ formValue });
//     try {
//       await Axios.post(SAVE_DISPOSITION, formValue);

//       // return <CommonAlert text={'Form submitted successfully'} />;
// setSnackbarMessage({
//   severity: 'success',
//   message: 'Form submitted successfully !'
// });
// setOpenSnackbar(true);
//   } catch (err) {
//     console.log(err);
// setSnackbarMessage({
//   severity: 'error',
//   message: 'Something went wrong. Please try again !'
// });
// setOpenSnackbar(true);
// }
// }

//   return (
//     <>
//       <div
//         style={{ maxHeight: '330px', overflowY: 'auto', overflowX: 'hidden' }}
//       >
//         <Formik
//           validateOnBlur={false}
//           initialValues={{
//             subDisposition: ''
//           }}
//           onSubmit={async (values, { setSubmitting, resetForm }) => {
//             console.log(values);
//             await saveDispositionForm(values);
//             setSubmitting(false);
//             // resetForm();
//           }}
//           innerRef={formRef}
//           /*validationSchema={yup.object({
//           category: yup.string().required('Please select a category'),
//           subCategory: yup.string().required('Please select a sub category'),
//           subCategoryItem: yup
//             .string()
//             .required('Please select a sub category item')
//         })}*/
//         >
//           {({ setFieldValue, resetForm }) => (
//             <Form>
//               <Grid container spacing={2} direction="column">
//                 {map(questions, (ques, index) =>
//                   ques.questionType ? (
//                     <Grid item key={index}>
//                       <FormControl
//                         variant="outlined"
//                         className={classes.fieldContainer}
//                       >
//                         <Field
//                           component={TextField}
//                           label={ques.question}
//                           variant="outlined"
//                           multiline={ques.multiline}
//                           rows={ques.rows}
//                           name={ques.questionName}
//                           disabled={visibilty}
//                         />
//                       </FormControl>
//                     </Grid>
//                   ) : (
//                     <Grid item key={index}>
//                       <FormControl
//                         variant="outlined"
//                         className={classes.fieldContainer}
//                       >
//                         <Autocomplete
//                           options={ques.option}
//                           disabled={visibilty}
//                           getOptionLabel={option => option.label}
//                           getOptionSelected={(option, value) => {
//                             return value.label === option.label;
//                           }}
//                           onChange={(event, value) => {
//                             addAnotherQues(value, index);
//                             setFieldValue(ques.questionName, value.label);
//                           }}
//                           renderInput={params => (
//                             <Field
//                               component={TextField}
//                               {...params}
//                               label={ques.question}
//                               variant="outlined"
//                               name={ques.questionName}
//                             />
//                           )}
//                           name={ques.questionName}
//                         />
//                       </FormControl>
//                     </Grid>
//                   )
//                 )}
//                 <Grid
//                   item
//                   container
//                   justify="flex-start"
//                   alignContent="flex-start"
//                 >
//                   {/* <Button
//                     color="secondary"
//                     variant="contained"
//                     size="small"
//                     onClick={resetQuestions}
//                   >
//                     reset
//                   </Button> */}
//                 </Grid>
//                 <Grid item container justify="center" alignContent="center">
//                   <Button
//                     type="submit"
//                     color="primary"
//                     variant="contained"
//                     size="large"
//                     disabled={visibilty}
//                   >
//                     Submit
//                   </Button>
//                 </Grid>
//               </Grid>
//             </Form>
//           )}
//         </Formik>
// <Snackbar
//   open={openSnackbar}
//   autoHideDuration={6000}
//   onClose={handleClose}
// >
//   <Alert onClose={handleClose} severity={snackbarMessage.severity}>
//     {snackbarMessage.message}
//   </Alert>
// </Snackbar>
//       </div>
//     </>
//   );
// };

// export default DispositionForm;

import React, { useRef, useState, useEffect } from 'react';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { Autocomplete } from '@material-ui/lab';
import {
  Button,
  FormControl,
  Grid,
  makeStyles,
  Snackbar
} from '@material-ui/core';
import { isEmpty, includes, map, find } from 'lodash';
import Axios from 'axios';
import MuiAlert from '@material-ui/lab/Alert';
import RenderQuestionByInputTypes from 'src/components/RenderQuestionByInputTypes';
import {
  getDependentQuestionsCodes,
  getDispositionFormQuestions2
} from 'src/modules/dashboard-360/utils/util-functions';
import { SAVE_DISPOSITION } from 'src/modules/dashboard-360/utils/endpoints';
import { useSelector } from 'react-redux';

const useStyle = makeStyles(() => ({
  fieldContainer: {
    width: '100%'
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const DispositionForm = ({ visibility, customer }) => {
  const userData = useSelector(state => state.userData);
  console.log('user data', userData);

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };
  const [snackbarMessage, setSnackbarMessage] = useState({
    severity: '',
    message: ''
  });

  const classes = useStyle();
  const formRef = useRef({});
  const defaultQuestions = getDispositionFormQuestions2();
  const allQuestions = [...defaultQuestions];
  const [questions, setQuestions] = useState(allQuestions);

  const addAnotherQues = (
    ques,
    index,
    parentQuestion,
    setFieldValue,
    values
  ) => {
    let dependentQuesCodes = [];
    const dependentQuesCodesArr = getDependentQuestionsCodes(
      parentQuestion.option,
      dependentQuesCodes
    );
    let filteredQues = questions;
    if (!isEmpty(dependentQuesCodesArr)) {
      filteredQues = questions.filter(
        currentObj => !includes(dependentQuesCodesArr, currentObj.questionCode)
      );
      for (let queCode of dependentQuesCodesArr) {
        if (values[queCode]) {
          setFieldValue(queCode, '');
        }
      }
    }
    if (ques && ques.dependentQuestion) {
      for (let depQue of ques.dependentQuestion) {
        depQue.parentQuestion = parentQuestion.questionCode;
      }
      filteredQues.splice(index + 1, 0, ...ques.dependentQuestion);
    } else {
      filteredQues.splice(index + 1, 0, ...[]);
    }
    setQuestions(filteredQues);
  };

  const resetQuestions = () => {
    const defaultState = getDispositionFormQuestions2();
    setQuestions(defaultState);
  };

  async function saveDispositionForm(formValue) {
    formValue.sip_id = userData.sip_id;
    formValue.agent_type = userData.agent_type;
    formValue.agent_id = userData.userId;
    formValue.customerPhoneNumber = customer.phoneNumber;
    formValue.agentName = userData.username;
    formValue.guestName = customer.guestName;
    // console.log(formValue)
    // formValue.languageChoosed = formValue['QA_5'];
    // formValue.customerExperiences = formValue['QA_9'];
    // formValue.mainDisposition = formValue['QA_6'];
    // formValue.requiredType = formValue['QA_7'];
    // formValue.subDisposition = formValue['QA_8'];
    // formValue.remarks_feedback = formValue['QA_13'];
    // formValue.overallCustomerRating = formValue['QA_12'];
    // formValue.Rating = formValue['QA_11'];
    // formValue.issues = formValue['QA_10'];
    console.log({ formValue });
    try {
      await Axios.post(SAVE_DISPOSITION, formValue);
      setSnackbarMessage({
        severity: 'success',
        message: 'Form submitted successfully !'
      });
      setOpenSnackbar(true);
    } catch (err) {
      alert('Form submission failed')
      console.log(err);
      setSnackbarMessage({
        severity: 'error',
        message: 'Something went wrong. Please try again !'
      });
      setOpenSnackbar(true);
    }
  }

  const onInputChange = (
    inputTypeValues,
    index,
    ques,
    setFieldValue,
    values
  ) => {
    const inputValue = inputTypeValues[ques.questionCode];

    if (inputValue) {
      if (ques.questionType === 'checkbox') {
        if (!isEmpty(inputValue)) {
          for (let cbValue of inputValue) {
            const selectedOption = find(ques.option, { label: cbValue });
            addAnotherQues(selectedOption, index, ques, setFieldValue, values);
            setFieldValue(ques.questionCode, inputValue.join());
          }
        }
      } else {
        const selectedOption = find(ques.option, { label: inputValue });
        addAnotherQues(selectedOption, index, ques, setFieldValue, values);
        setFieldValue(ques.questionCode, inputValue);
      }
    }
  };

  return (
    <>
      <div
        style={{ maxHeight: '330px', overflowY: 'auto', overflowX: 'hidden' }}
      >
        <Formik
          validateOnBlur={false}
          initialValues={{}}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            console.log(values);
            await saveDispositionForm(values);
            setSubmitting(false);
            resetQuestions();
            resetForm();
          }}
          innerRef={formRef}
        >
          {({ setFieldValue, values }) => (
            <Form>
              <Grid container spacing={2} direction="column">
                {map(questions, (ques, index) =>
                  ques.questionType && ques.questionType !== 'select' ? (
                    <Grid item key={index}>
                      <RenderQuestionByInputTypes
                        question={ques}
                        visibility={visibility}
                        onInputChange={newValues =>
                          onInputChange(
                            newValues,
                            index,
                            ques,
                            setFieldValue,
                            values
                          )
                        }
                      />
                    </Grid>
                  ) : (
                    <Grid item key={index}>
                      <FormControl
                        variant="outlined"
                        className={classes.fieldContainer}
                      >
                        <Autocomplete
                          disabled={visibility}
                          options={ques.option}
                          getOptionLabel={option => option.label}
                          getOptionSelected={(option, value) => {
                            return value.label === option.label;
                          }}
                          id={`autocomplete-id-${index}-${ques.questionCode}`}
                          onChange={(event, value) => {
                            if (value) {
                              addAnotherQues(
                                value,
                                index,
                                ques,
                                setFieldValue,
                                values
                              );
                              setFieldValue(ques.questionCode, value.label);
                            }
                          }}
                          renderInput={params => {
                            console.log(`values------->`, values);
                            const inputObj = {
                              id: `id-${index}-${ques.questionCode}`
                            };
                            if (values[ques.questionCode]) {
                              inputObj.value = values[ques.questionCode];
                            } else {
                              inputObj.value = '';
                            }
                            console.log(`params----->`, {
                              ...params.inputProps,
                              ...{ inputObj }
                            });
                            return (
                              <Field
                                component={TextField}
                                {...params}
                                label={ques.question}
                                variant="outlined"
                                name={ques.questionCode}
                                id={`field-id-${ques.questionCode}`}
                                inputProps={{
                                  ...params.inputProps,
                                  ...inputObj
                                }}
                                required
                              />
                            );
                          }}
                          name={ques.questionCode}
                        />
                      </FormControl>
                    </Grid>
                  )
                )}
                {/* <Grid
                  item
                  container
                  justify="flex-start"
                  alignContent="flex-start"
                >
                  <Button
                    color="secondary"
                    variant="contained"
                    size="small"
                    onClick={resetQuestions}
                  >
                    reset
                  </Button>
                </Grid> */}
                <Grid item container justify="center" alignContent="center">
                  <Button
                    type="submit"
                    disabled={visibility}
                    color="primary"
                    variant="contained"
                    size="large"
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={snackbarMessage.severity}>
            {snackbarMessage.message}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};

export default DispositionForm;
