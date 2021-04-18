import React, { useRef, useState, useEffect } from 'react';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { Autocomplete } from '@material-ui/lab';
import { Button, FormControl, Grid, makeStyles } from '@material-ui/core';
import { isEmpty, includes, map, find, difference, intersection } from 'lodash';
import { getDispositionFormQuestions2, getDependentQuestionsCodes } from './../../utils/util-functions';
import Axios from 'axios';
import { SAVE_DISPOSITION } from '../../utils/endpoints';
import CommonAlert from 'src/components/CommonAlert';
import RenderQuestionByInputTypes from 'src/components/RenderQuestionByInputTypes';

const useStyle = makeStyles(() => ({
  fieldContainer: {
    width: '100%'
  }
}));

const DispositionForm = () => {
  const classes = useStyle();
  const formRef = useRef({});
  const defaultQuestions = getDispositionFormQuestions2();
  const allQuestions = [...defaultQuestions];
  let [questions, setQuestions] = useState(allQuestions);

  const addAnotherQues = (ques, index, parentQuestion, setFieldValue, values) => {
    let dependentQuesCodes = []
    const dependentQuesCodesArr = getDependentQuestionsCodes(parentQuestion.option, dependentQuesCodes)
    let filteredQues = questions
    if(!isEmpty(dependentQuesCodesArr)){
      if(!ques.skipFilter){
        filteredQues = questions.filter(currentObj => !includes(dependentQuesCodesArr, currentObj.questionCode));
      }
      for(let queCode of dependentQuesCodesArr){
        if(values[queCode]){
          setFieldValue(queCode, '');
        }
      }
    }
    if (ques && ques.dependentQuestion) {
      for(let depQue of ques.dependentQuestion){
        depQue.parentQuestion = parentQuestion.questionCode
      }
      filteredQues.splice(index + 1, 0, ...ques.dependentQuestion);
    }else{

      filteredQues.splice(index + 1, 0, ...[]);
    }
    setQuestions(filteredQues);
  };

  const resetQuestions = () => {
    setQuestions(defaultQuestions);
  };

  async function saveDispositionForm(formValue) {
    console.log({ formValue });
    try {
      await Axios.post(SAVE_DISPOSITION, formValue);
      alert('Form submitted successfully')
      //return <CommonAlert text={'Form submitted successfully'} />;
    } catch (err) {
      alert('Form submission failed')
      console.log(err);
    }
  }

  const onInputChange = (inputTypeValues, index, ques, setFieldValue, values) => {
    const inputValue = inputTypeValues[ques.questionCode]

    if(inputValue){
      if(ques.questionType === 'checkbox'){
        if(!isEmpty(inputValue)){
          const checkBoxValues = (values[ques.questionCode] && values[ques.questionCode].split(',')) || []
          const addQuestionOption = difference(inputValue, checkBoxValues)
          const removedOption = difference(checkBoxValues , inputValue)
          if(!isEmpty(addQuestionOption)){
            for(let cbValue of addQuestionOption){
              const selectedOption = find(ques.option, {label : cbValue})
              addAnotherQues({...selectedOption, skipFilter: true}, index, ques, setFieldValue, values);
            }
            setFieldValue(ques.questionCode, inputValue.join());
          }
          if(!isEmpty(removedOption)){

            /** reset the question when any value removed from checkbox. because it was re-adding the question when not resetting it. */
            let dependentQuesCodes = []
            const dependentQuesCodesArr = getDependentQuestionsCodes(ques.option, dependentQuesCodes)
            if(!isEmpty(dependentQuesCodesArr)){
              let filteredQues = questions.filter(currentObj => !includes(dependentQuesCodesArr, currentObj.questionCode));
              questions = filteredQues
              setQuestions([...filteredQues]);
            }
            /** end */

            const remainingOptions = intersection(inputValue , checkBoxValues)

            /** adding the questions after reset, which is selected in checkbox*/
            for(let cbValue of remainingOptions){
              const selectedOption = find(ques.option, {label : cbValue})
              addAnotherQues({...selectedOption, skipFilter: true}, index, ques, setFieldValue, values);
            }
            setFieldValue(ques.questionCode, inputValue.join())
          }
        }else{
          addAnotherQues({}, index, ques, setFieldValue, values);
          setFieldValue(ques.questionCode, inputValue.join());
        }
      }else{
        const selectedOption = find(ques.option, {label : inputValue})
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
            // resetForm();
          }}
          innerRef={formRef}
        >
          {({ setFieldValue, values }) => (
            <Form>
              <Grid container spacing={2} direction="column">
                {map(questions, (ques, index) =>
                  (ques.questionType && ques.questionType !== 'select') ? (
                    <Grid item key={index}>
                      <RenderQuestionByInputTypes question={ques} onInputChange={(newValues)=>onInputChange(newValues, index, ques, setFieldValue, values)}/>
                    </Grid>
                  ) : (
                    <Grid item key={index}>
                      <FormControl
                        variant="outlined"
                        className={classes.fieldContainer}
                      >
                        <Autocomplete
                          options={ques.option}
                          getOptionLabel={option => option.label}
                          getOptionSelected={(option, value) => {
                            return value.label === option.label;
                          }}
                          id={`autocomplete-id-${index}-${ques.questionCode}`}
                          onChange={(event, value) => {
                            if(value){
                              addAnotherQues(value, index, ques, setFieldValue, values);
                              setFieldValue(ques.questionCode, value.label);
                            }
                          }}
                          renderOption={(option, value) => {
                            if(values[ques.questionCode] === ""){
                              if(value.selected){
                                setFieldValue(ques.questionCode, value.inputValue)
                                if(value.inputValue === option.label){
                                  addAnotherQues(option, index, ques, setFieldValue, values);
                                }
                              }
                            }
                            return option.label;
                          }}
                          renderInput={params => {
                            const inputObj = {id: `id-${index}-${ques.questionCode}`}
                            if(values[ques.questionCode]){
                              inputObj.value = values[ques.questionCode]
                            }else{
                              inputObj.value = ""
                            }
                           return <Field
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
      </div>
    </>
  );
};

export default DispositionForm;
