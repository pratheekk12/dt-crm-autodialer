import React, { useEffect, useRef, useState } from 'react';
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
import { isEmpty, includes, map, find, difference, intersection } from 'lodash';
import Axios from 'axios';
import MuiAlert from '@material-ui/lab/Alert';
import RenderQuestionByInputTypes from 'src/components/RenderQuestionByInputTypes';
import {
  getDependentQuestionsCodes,
  getDispositionFormQuestions3,
  getDispositionFormQuestions5
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
  const [questions, setQuestions] = useState(getDispositionFormQuestions3);

  let initialValuesObj = {};

  const renderInputBaseQuestions = () => {
    // if (customer.campaignType && customer.campaignType !== null)
    //   return getDispositionFormQuestions5;

    return getDispositionFormQuestions5;
  };

  useEffect(() => {
    setQuestions(renderInputBaseQuestions());
    questions.map(question => {
      initialValuesObj[question.questionCode] = '';
    });
  }, [customer]);

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
    const defaultState = renderInputBaseQuestions();
    setQuestions(defaultState);
  };


  const handleBreak = (e) => {
    var axios = require('axios');
    const AgentSIPID = localStorage.getItem('AgentSIPID')

    // const AgentSIPID = localStorage.getItem('AgentSIPID')

    var axios = require('axios');
    var config = {
      method: 'get',
      url: `http://192.168.4.44:62002/ami/actions/break?Queue=${localStorage.getItem('Queue')}&Interface=SIP%2F${AgentSIPID}&Reason=AgentDisposed&Break=false`,
      headers: {}
    };

    axios(config)
      .then(function (response) {
        console.log((response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleSubmitDisposition = (data) => {
    //console.log(data, "form data")

    handleBreak()

    const id = localStorage.getItem('Interaction_id')
    //console.log(id, "agentid")
    var axios = require('axios');


    var config = {
      method: 'put',
      url: `http://192.168.4.44:62001/api/interactions/${id}`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: { "updateData": data }
    };

    axios(config)
      .then(function (response) {
        console.log(response, "response")

      })
      .catch(function (error) {
        console.log(error);
      });
  }


  async function saveDispositionForm(formValue) {
    formValue.sip_id = userData.sip_id;
    formValue.agent_type = userData.agent_type;
    formValue.agent_id = userData.userId;
    formValue.customerPhoneNumber = customer.phoneNumber;
    formValue.agentName = userData.username;
    if (formValue.guestName && formValue.guestName.length) {
      formValue.guestName = formValue.guestName;
    } else {
      formValue.guestName = customer.guestName;
    }
    formValue.restaurantId = customer.restaurantId;
    formValue.customerId = customer.customerId;
    formValue.feedbackId = customer._id;

    if(localStorage.getItem('Agent_Object_ID')){
      handleSubmitDisposition(formValue)
    }
   
    console.log(formValue)
    try {
      await Axios.post(SAVE_DISPOSITION, formValue);
      setSnackbarMessage({
        severity: 'success',
        message: 'Form submitted successfully !'
      });
      setOpenSnackbar(true);
    } catch (err) {
      alert('Form submission failed');
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
          const checkBoxValues =
            (values[ques.questionCode] &&
              values[ques.questionCode].split(',')) ||
            [];
          const addQuestionOption = difference(inputValue, checkBoxValues);
          const removedOption = difference(checkBoxValues, inputValue);
          if (!isEmpty(addQuestionOption)) {
            for (let cbValue of addQuestionOption) {
              const selectedOption = find(ques.option, { label: cbValue });
              addAnotherQues(
                { ...selectedOption, skipFilter: true },
                index,
                ques,
                setFieldValue,
                values
              );
            }
            setFieldValue(ques.questionCode, inputValue.join());
          }
          if (!isEmpty(removedOption)) {
            /** reset the question when any value removed from checkbox. because it was re-adding the question when not resetting it. */
            let dependentQuesCodes = [];
            const dependentQuesCodesArr = getDependentQuestionsCodes(
              ques.option,
              dependentQuesCodes
            );
            if (!isEmpty(dependentQuesCodesArr)) {
              let filteredQues = questions.filter(
                currentObj =>
                  !includes(dependentQuesCodesArr, currentObj.questionCode)
              );
              questions = filteredQues;
              setQuestions([...filteredQues]);
            }
            /** end */

            const remainingOptions = intersection(inputValue, checkBoxValues);

            /** adding the questions after reset, which is selected in checkbox*/
            for (let cbValue of remainingOptions) {
              const selectedOption = find(ques.option, { label: cbValue });
              addAnotherQues(
                { ...selectedOption, skipFilter: true },
                index,
                ques,
                setFieldValue,
                values
              );
            }
            setFieldValue(ques.questionCode, inputValue.join());
          }
        } else {
          addAnotherQues({}, index, ques, setFieldValue, values);
          setFieldValue(ques.questionCode, inputValue.join());
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
        style={{
          maxHeight: 350,
          overflowY: 'auto',
          overflowX: 'hidden',
          padding: '0.5rem 0'
        }}
      >
        <Formik
          validateOnBlur={false}
          initialValues={initialValuesObj}
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
                          renderOption={(option, value) => {
                            if (values[ques.questionCode] === '') {
                              if (value.selected) {
                                setFieldValue(
                                  ques.questionCode,
                                  value.inputValue
                                );
                                if (value.inputValue === option.label) {
                                  addAnotherQues(
                                    option,
                                    index,
                                    ques,
                                    setFieldValue,
                                    values
                                  );
                                }
                              }
                            }
                            return option.label;
                          }}
                          renderInput={params => {
                            const inputObj = {
                              id: `id-${index}-${ques.questionCode}`
                            };
                            if (values[ques.questionCode]) {
                              inputObj.value = values[ques.questionCode];
                            } else {
                              inputObj.value = '';
                            }
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
                                // required
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
          autoHideDuration={4000}
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
