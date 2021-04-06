import React, { useRef, useState, useEffect } from 'react';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { Autocomplete } from '@material-ui/lab';
import { Button, FormControl, Grid, makeStyles } from '@material-ui/core';
import * as yup from 'yup';
import { isEmpty, get, filter, includes, map } from 'lodash';
import { getDispositionFormQuestions2 } from './../../utils/util-functions';
import Axios from 'axios';
import { SAVE_DISPOSITION } from '../../utils/endpoints';
import CommonAlert from 'src/components/CommonAlert';

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
  const [questions, setQuestions] = useState(allQuestions);

  const addAnotherQues = (ques, index) => {
    //questions.length = index+1
    if (ques && ques.dependentQuestion) {
      questions.splice(index + 1, 0, ...ques.dependentQuestion);
      setQuestions(questions);
    }
    /*let nextQues = filter(allQuestions, function(que) {
      return includes(ques.nextQuestions,que.questionCode)
    });
    if(!isEmpty(nextQues)){
      ques.nextQues = nextQues
    }
    if(ques.nextQues || ques.answers){
      setQuestions([...questions,ques])
    }*/
  };

  const resetQuestions = () => {
    setQuestions(defaultQuestions);
  };

  async function saveDispositionForm(formValue) {
    console.log({ formValue });
    try {
      await Axios.post(SAVE_DISPOSITION, formValue);

      return <CommonAlert text={'Form submitted successfully'} />;
    } catch (err) {
      console.log(err);
    }
  }

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
          /*validationSchema={yup.object({
          category: yup.string().required('Please select a category'),
          subCategory: yup.string().required('Please select a sub category'),
          subCategoryItem: yup
            .string()
            .required('Please select a sub category item')
        })}*/
        >
          {({ setFieldValue }) => (
            <Form>
              <Grid container spacing={2} direction="column">
                {map(questions, (ques, index) =>
                  ques.questionType ? (
                    <Grid item key={index}>
                      <FormControl
                        variant="outlined"
                        className={classes.fieldContainer}
                      >
                        <Field
                          component={TextField}
                          label={ques.question}
                          variant="outlined"
                          multiline={ques.multiline}
                          rows={ques.rows}
                          name={ques.questionName}
                        />
                      </FormControl>
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
                          onChange={(event, value) => {
                            addAnotherQues(value, index);
                            setFieldValue(ques.questionName, value.label);
                          }}
                          renderInput={params => (
                            <Field
                              component={TextField}
                              {...params}
                              label={ques.question}
                              variant="outlined"
                              name={ques.questionName}
                            />
                          )}
                          name={ques.questionName}
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
