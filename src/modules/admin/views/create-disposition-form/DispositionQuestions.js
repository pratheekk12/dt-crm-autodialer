import { Box, Button, makeStyles } from '@material-ui/core';
import { Field, FastField, FieldArray } from 'formik';
import { TextField } from 'formik-material-ui';
import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Autocomplete } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
  textField: {
    display: 'flex',
    margin: `${theme.spacing(2)}px 0`
  },
  containedSecondary: {
    color: 'white'
  }
}));

const initialValues = {
  dispositionQuestions: [
    {
      question: '',
      option: [
        {
          label: ''
        }
      ]
    }
  ]
};

const questionsBank = [{question_id: 1, "questionType":"rating","questionName":"rating name","label":"label"},
  {question_id: 2,"questionType":"textarea","questionName":"text area name","label":"text area lable","additionalConfig":{"rows":3}},
  {question_id: 3,"questionType":"text","questionName":"text name","label":"text lable"},
  {question_id: 4,"questionType":"checkbox","questionName":"check box name","label":"checkbox label","additionalConfig":{"displayType":"inline"},"options":[{"label":"CB label 1","value":"checkbox value 1"},{"label":"CB label 2","value":"checkbox value 2"},{"label":"CB label 3","value":"checkbox value 3"}]},
  {question_id: 5,"questionType":"radio","questionName":"radio name","label":"radio label","additionalConfig":{"displayType":"inline"},"options":[{"label":"radio label 1","value":"radio opt 1"},{"label":"radio label 2","value":"radio opt 2"},{"label":"radio label 3","value":"radio opt 3"}]},
  {question_id: 6,"questionType":"select","questionName":"select name","label":"select label","additionalConfig":{"displayType":"inline"},"options":[{"label":"select label 1","value":"select opt 1"},{"label":"select label 2","value":"select opt 2"},{"label":"select label 3","value":"select opt 3"},{"label":"select label 4","value":"select opt 4"}]}]

function DispositionQuestions({ questions, name, setFieldValue }) {
  const classes = useStyles();
  const [dependentQuestions, setDependentQuestions] = React.useState({});

  const handleChange = (questionAns, dependentQues, queIndex, ansIndex) => {
    setDependentQuestions({
      ...dependentQuestions,
      [`dependentQuestions${queIndex}${ansIndex}`]: !dependentQuestions[
        `dependentQuestions${queIndex}${ansIndex}`
      ]
    });
    questionAns.dependentQuestion = dependentQues;
  };

  return (
    questions.length > 0 && (
      <FieldArray name={name}>
        {({ insert, remove, push }) => (
          <>
            {questions.length > 0 &&
              questions.map((dispositionQuestion, index) => (
                <Box
                  padding={2}
                  display="block"
                  position="relative"
                  border={1}
                  key={index}
                  margin={1}
                  style={{ borderColor: '#C4C4C4', borderRadius: '0.25rem' }}
                >
                  <Autocomplete
                    options={questionsBank}
                    getOptionLabel={option => option.questionName}
                    getOptionSelected={(option, value) => {
                      return value.questionName === option.questionName;
                    }}
                    onChange={(event, value) => {
                      console.log(`value------>`,value)
                      setFieldValue(`${name}.${index}.question`, value.questionName);
                    }}
                    renderInput={params => (
                      <FastField
                        name={`${name}.${index}.question`}
                        component={TextField}
                        style={{ width: '100%' }}
                        className={classes.textField}
                        label={`Enter Question ${index + 1}`}
                        variant="outlined"
                        autoComplete="off"
                        {...params}
                      />
                    )}
                  />
                  <Box
                    padding={1}
                    border={1}
                    display="block"
                    position="relative"
                    style={{ borderColor: '#C4C4C4', borderRadius: '0.25rem' }}
                  >
                    <FieldArray name={`${name}.${index}.option`}>
                      {({ insert, remove, push }) => (
                        <div>
                          {dispositionQuestion.option.length > 0 &&
                            dispositionQuestion.option.map(
                              (questionAns, ansIndex) => (
                                <div
                                  className="row"
                                  key={`${name}.${index}.option.${ansIndex}`}
                                >
                                  <FastField
                                    name={`${name}.${index}.option.${ansIndex}.label`}
                                    component={TextField}
                                    style={{
                                      width: '100%',
                                      margin: '0.5rem',
                                      paddingRight: '1rem'
                                    }}
                                    className={classes.textField}
                                    label="Enter Answer"
                                    variant="outlined"
                                    autoComplete="off"
                                  />
                                  <Button
                                    variant="contained"
                                    color="secondary"
                                    className={classes.containedSecondary}
                                    startIcon={<DeleteIcon />}
                                    style={{ margin: '0.5rem' }}
                                    onClick={() => {
                                      remove(ansIndex);
                                      handleChange(
                                        questionAns,
                                        [],
                                        index,
                                        ansIndex
                                      );
                                    }}
                                  >
                                    Answer
                                  </Button>
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        checked={
                                          dependentQuestions[
                                            `dependentQuestions${index}${ansIndex}`
                                          ]
                                        }
                                        onChange={() => {
                                          handleChange(
                                            questionAns,
                                            initialValues.dispositionQuestions,
                                            index,
                                            ansIndex
                                          );
                                        }}
                                        color="primary"
                                      />
                                    }
                                    label="It has dependent Question?"
                                  />
                                  {dependentQuestions[
                                    `dependentQuestions${index}${ansIndex}`
                                  ] && (
                                    <DispositionQuestions
                                      questions={
                                        questionAns.dependentQuestion
                                          ? questionAns.dependentQuestion
                                          : []
                                      }
                                      name={`${name}.${index}.option.${ansIndex}.dependentQuestion`}
                                      setFieldValue={setFieldValue}
                                    />
                                  )}
                                </div>
                              )
                            )}
                          <Button
                            variant="outlined"
                            startIcon={<AddIcon />}
                            onClick={() => {
                              push({ label: '' });
                            }}
                            style={{ margin: '0.5rem' }}
                          >
                            Answer
                          </Button>
                        </div>
                      )}
                    </FieldArray>
                  </Box>
                  <div className="col">
                    <Button
                      variant="contained"
                      color="secondary"
                      className={classes.containedSecondary}
                      startIcon={<DeleteIcon />}
                      style={{ marginTop: '1rem' }}
                      onClick={() => remove(index)}
                    >
                      Question
                    </Button>
                  </div>
                </Box>
              ))}
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() =>
                push({
                  question: '',
                  option: [
                    {
                      label: ''
                    }
                  ]
                })
              }
              style={{ margin: 10 }}
            >
              Question
            </Button>
          </>
        )}
      </FieldArray>
    )
  );
}

export default DispositionQuestions;
