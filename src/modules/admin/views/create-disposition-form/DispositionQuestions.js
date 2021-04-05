import { Box, Button, makeStyles } from '@material-ui/core';
import { Field, FastField, FieldArray } from 'formik';
import { TextField } from 'formik-material-ui';
import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

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

function DispositionQuestions({ questions, name }) {
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
                  <FastField
                    name={`${name}.${index}.question`}
                    component={TextField}
                    style={{ width: '100%' }}
                    className={classes.textField}
                    label={`Enter Question ${index + 1}`}
                    variant="outlined"
                    autoComplete="off"
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
