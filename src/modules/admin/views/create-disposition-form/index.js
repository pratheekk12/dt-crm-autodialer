import {
  Button, Card, Grid,
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import React  from 'react';
import DispositionQuestions from './DispositionQuestions';
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
import { createNodeForSortableTree } from './utils'

const initialValues = {
  dispositionQuestions: [{
    "question": "",
    option: [
      {
        label: '',
      },
    ],
  }]
}

function CreateDispositionForm() {
  const [sTree, setSTree] = React.useState(createNodeForSortableTree(initialValues.dispositionQuestions));

  return (<Grid container direction="row" justify="center" spacing={3} style={{ backgroundColor: 'white', margin: '1rem', padding: '2rem', display: 'contents'  }}>
        <Grid item lg={7} xs={12}>
          <Card style={{ display: 'flex', justifyContent: 'center', padding: 10 }}>
            <Formik
              initialValues={initialValues}
              onSubmit={async (values) => {
                createNodeForSortableTree(values.dispositionQuestions)
                setSTree(values.dispositionQuestions)
              }}
              validateOnChange={false}
            >
              {({ values }) => (
                <Form>
                  <DispositionQuestions questions={values.dispositionQuestions} name={"dispositionQuestions"}/>
                  <Button variant="contained" color="primary" type="submit">
                    {'Save'}
                  </Button>
                </Form>
              )}
            </Formik>
          </Card>
          <Card style={{ padding: 10 }}>
            <div style={{ height: 400 }}>
              <SortableTree
                treeData={sTree}
              />
            </div>
          </Card>
        </Grid>
      </Grid>
  );
}

export default CreateDispositionForm;
