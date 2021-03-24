import React, { useState } from 'react';
import {
  Button,
  Box,
  ButtonGroup,
  Grid,
  makeStyles,
  CircularProgress
} from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { Link } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import SaveIcon from '@material-ui/icons/Save';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const useStyles = makeStyles({
  root: {
    margin: '0.5rem 1rem 1rem 1rem'
  }
});

const Templates = props => {
  const classes = useStyles();

  const [, setTemplateData] = useState({ name: '', content: '' });
  const [templateName, setTemplateName] = useState('');
  const [templateContent, setTemplateContent] = useState();
  const [loading, setLoading] = useState(true);

  const handleEditorChange = content => {
    setTemplateContent(content);
  };
  var useDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return (
    <div className={classes.root}>
      <Box marginBottom={2}>
        <ButtonGroup color="primary" aria-label="outlined primary button group">
          <Button>
            <Link to="/campaign/dashboard">Dashboard</Link>
          </Button>
          <Button>
            <Link to="/campaign/view-templates">View Templates</Link>
          </Button>
        </ButtonGroup>
      </Box>
      <div>
        <Box style={{ marginTop: '0.5rem' }}>
          <Formik
            initialValues={
              !!props.location.data
                ? { name: props.location.data.name }
                : { name: '' }
            }
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
              setTemplateName(values.name);
              setTemplateData({ name: templateName, content: templateContent });
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required('Name required')
            })}
          >
            {({ isSubmitting }) => (
              <Form>
                {isSubmitting}
                <Grid container spacing={3}>
                  <Grid item xs={9}>
                    <Field
                      component={TextField}
                      label="Name"
                      autoComplete="off"
                      name="name"
                      variant="outlined"
                      placeholder="Enter Template Name"
                      style={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid container item xs={3} justify="flex-end">
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      size="large"
                      startIcon={<SaveIcon />}
                    >
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
        {loading && (
          <Box
            style={{
              display: 'flex',
              justifyContent: 'center',
              margin: '5rem'
            }}
          >
            <CircularProgress />
          </Box>
        )}
        <Box style={{ marginTop: '1rem' }}>
          <Editor
            initialValue={
              !!props.location.data
                ? props.location.data.content
                : `<p>This is the initial content of the editor</p>`
            }
            onInit={() => {
              setLoading(false);
            }}
            apiKey="i33mef584qbl58g4p846442vgc668cha9zmp29rpz5ql7ag3"
            init={{
              selector: 'textarea#full-featured-non-premium',
              plugins:
                'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
              imagetools_cors_hosts: ['picsum.photos'],
              menubar: 'file edit view insert format tools table help',
              toolbar:
                'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
              toolbar_sticky: true,
              autosave_ask_before_unload: true,
              autosave_interval: '30s',
              autosave_prefix: '{path}{query}-{id}-',
              autosave_restore_when_empty: false,
              autosave_retention: '2m',
              image_advtab: true,
              link_list: [
                { title: 'My page 1', value: 'https://www.tiny.cloud' },
                { title: 'My page 2', value: 'http://www.moxiecode.com' }
              ],
              image_list: [
                { title: 'My page 1', value: 'https://www.tiny.cloud' },
                { title: 'My page 2', value: 'http://www.moxiecode.com' }
              ],
              image_class_list: [
                { title: 'None', value: '' },
                { title: 'Some class', value: 'class-name' }
              ],
              importcss_append: true,
              file_picker_callback: function(callback, value, meta) {
                /* Provide file and text for the link dialog */
                if (meta.filetype === 'file') {
                  callback('https://www.google.com/logos/google.jpg', {
                    text: 'My text'
                  });
                }

                /* Provide image and alt text for the image dialog */
                if (meta.filetype === 'image') {
                  callback('https://www.google.com/logos/google.jpg', {
                    alt: 'My alt text'
                  });
                }

                /* Provide alternative source and posted for the media dialog */
                if (meta.filetype === 'media') {
                  callback('movie.mp4', {
                    source2: 'alt.ogg',
                    poster: 'https://www.google.com/logos/google.jpg'
                  });
                }
              },
              templates: [
                {
                  title: 'New Table',
                  description: 'creates a new table',
                  content:
                    '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>'
                },
                {
                  title: 'Starting my story',
                  description: 'A cure for writers block',
                  content: 'Once upon a time...'
                },
                {
                  title: 'New list with dates',
                  description: 'New List with dates',
                  content:
                    '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>'
                }
              ],
              template_cdate_format:
                '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
              template_mdate_format:
                '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
              height: 390,
              image_caption: true,
              quickbars_selection_toolbar:
                'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
              noneditable_noneditable_class: 'mceNonEditable',
              toolbar_mode: 'sliding',
              contextmenu: 'link image imagetools table',
              skin: useDarkMode ? 'oxide-dark' : 'oxide',
              content_css: useDarkMode ? 'dark' : 'default',
              content_style:
                'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
            onEditorChange={handleEditorChange}
          />
        </Box>
      </div>
    </div>
  );
};

export default Templates;
