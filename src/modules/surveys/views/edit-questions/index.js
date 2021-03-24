import React, { useState, useEffect } from 'react';
import GenerateForm from '../Questions/GenerateForm';
import {
  Grid,
  Box,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Tooltip,
  IconButton,
  Button,
  ButtonGroup
} from '@material-ui/core';
import Page from 'src/components/Page';
import UpdateQuestions from './update-questions';
import Axios from 'axios';
import SaveIcon from '@material-ui/icons/Save';
import { Link } from 'react-router-dom';

const EditQuestions = props => {
  const [] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState('');

  useEffect(() => {
    (async function getQuestions() {
      try {
        const res = await Axios.get('/survey/questions');
        setQuestions([
          res.data.find(q => q.questionId === props.match.params.questionId)
        ]);
      } catch (Err) {
        // console.log(Err);
        setError(Err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // const [newData, setNewData] = useState([]);

  const updateSurvey = data => {
    const newData = { ...data };
    console.log('New updated data : ', data);
    setQuestions([newData]);
  };
  async function saveQuestion() {
    try {
      const res = await Axios['patch'](
        `/survey/question/${props.match.params.questionId}`,
        questions[0]
      );
      props.history.push({
        pathname: '/surveys/questions',
        state: 'update'
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <Page title="questions">
        <Box margin="1rem">
          <Box marginBottom={2}>
            <ButtonGroup
              color="primary"
              aria-label="outlined primary button group"
            >
              <Button>
                <Link to="/surveys/questions/new">Add New Questions</Link>
              </Button>
              <Button>
                <Link to="/surveys/questions">View Questions</Link>
              </Button>
            </ButtonGroup>
          </Box>
          <Grid container spacing={1}>
            <Grid xs={12} lg={6} item>
              <Card style={{ width: '100%' }}>
                <CardHeader title="Edit Question" />
                <Divider />
                <CardContent>
                  {!!questions[0] && (
                    <UpdateQuestions
                      updateData={questions}
                      newUpdatedValue={updateSurvey}
                    />
                  )}
                </CardContent>
              </Card>
            </Grid>
            <Grid xs={12} lg={6} item>
              <Card style={{ width: '100%' }}>
                <CardHeader
                  title="Preview"
                  action={
                    <Tooltip title="Save Question">
                      <IconButton
                        aria-label="Save Question"
                        onClick={saveQuestion}
                      >
                        <SaveIcon color="primary" />
                      </IconButton>
                    </Tooltip>
                  }
                />
                <Divider />
                <CardContent>
                  <GenerateForm input={questions} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Page>
    </div>
  );
};

export default EditQuestions;
