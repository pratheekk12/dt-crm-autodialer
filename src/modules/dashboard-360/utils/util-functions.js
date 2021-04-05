export function getAddressFromObj(obj) {
  return `${obj.address1}, ${obj.address2}, ${obj.BillingTownArea}, ${obj.BillingCityName}, ${obj.BillingStateName}, ${obj.BillingCountryName}, ${obj.BillingPin}`;
}

export function getDispositionFormQuestions() {
  return {
    states: [{
      question: 'Feedback',
      questionCode: 'QA_0',
      nextQuestions: ['QA_1', 'QA_2', 'QA_3']
    }, {
      question: 'Do you feel satisfied with our food?',
      questionCode: 'QA_1',
      nextQuestions: ['QA_4', 'QA_5', 'QA_6']
    }, {
      question: 'How would you rate the quality of the food at our restaurant?',
      questionCode: 'QA_2',
      answers: ['1', '2', '3', '4', '5']
    }, {
      question: 'Did you face any issues with any service of the restaurant?',
      questionCode: 'QA_3'
    }, {
      question: 'Satisfied',
      questionCode: 'QA_4'
    }, {
      question: 'It was okay',
      questionCode: 'QA_5',
      nextQuestions: ['QA_7']
    }, {
      question: 'Not Satisfied',
      questionCode: 'QA_6',
      answers: ['Bad Staff Behaviour', 'Bad Hygiene', 'Bad Food Quality'],
    }, {
      question: 'Any suggestion to approve our service?',
      questionCode: 'QA_7'
    }]
  };
}

export function getDispositionFormQuestions2() {
  const questionArr = [{
    question: 'Were you satisfied with the food quality?',
    questionCode: 'QA_1',
    option: [{
      label: 'Yes'
    }, {
      label: 'No',
      dependentQuestion: [{
        question: 'What were you not satisfied with?',
        questionCode: 'QA_2',
        option: [{
          label: 'Food',
          dependentQuestion: [{
            question: 'Portion Size?',
            questionCode: 'QA_3',
            option: [{
              label: 'Small'
            }]
          }]
        },
          {
            label: 'Ambience',
          },
          {
            label: 'Service',
          }
        ]
      }]
    }, {
      label: "Don't want to answer"
    }],
  },
    {
      question: 'Were you satisfied Staff Behaviour?',
      questionCode: 'QA_4',
      option: [{
        label: 'Yes'
      }, {
        label: 'No',
        dependentQuestion: [{
          question: 'What were you not satisfied with?',
          questionCode: 'QA_5',
          option: [{
            label: 'Food',
            dependentQuestion: [{
              question: 'Was he rude?',
              questionCode: 'QA_6',
              option: [{
                label: 'yes'
              }, {
                label: 'no'
              }]
            }, {
              question: 'Not clean the table properly?',
              questionCode: 'QA_7',
              option: [{
                label: 'yes'
              }, {
                label: 'no'
              }]
            }]
          },
            {
              label: 'Ambience',
            },
            {
              label: 'Service',
              dependentQuestion: [{
                question: 'Delay in service?',
                questionCode: 'QA_9',
                option: [{
                  label: 'yes'
                }, {
                  label: 'no'
                }]
              }]
            }
          ]
        }]
      }, {
        label: "Don't want to answer"
      }],
    },
    {
      question: 'How likely will you recommend us to your friends and relatives',
      questionCode: 'QA_8',
      option: [{
        label: 'Yes'
      }, {
        label: 'No'
      }, {
        label: "Don't want to answer"
      }],
    }
  ];

  return questionArr;
}
