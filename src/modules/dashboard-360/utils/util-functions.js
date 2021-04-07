export function getAddressFromObj(obj) {
  return `${obj.address1}, ${obj.address2}, ${obj.BillingTownArea}, ${obj.BillingCityName}, ${obj.BillingStateName}, ${obj.BillingCountryName}, ${obj.BillingPin}`;
}

export function getDispositionFormQuestions() {
  return {
    states: [
      {
        question: 'Feedback',
        questionCode: 'QA_0',
        nextQuestions: ['QA_1', 'QA_2', 'QA_3']
      },
      {
        question: 'Do you feel satisfied with our food?',
        questionCode: 'QA_1',
        nextQuestions: ['QA_4', 'QA_5', 'QA_6']
      },
      {
        question:
          'How would you rate the quality of the food at our restaurant?',
        questionCode: 'QA_2',
        answers: ['1', '2', '3', '4', '5']
      },
      {
        question: 'Did you face any issues with any service of the restaurant?',
        questionCode: 'QA_3'
      },
      {
        question: 'Satisfied',
        questionCode: 'QA_4'
      },
      {
        question: 'It was okay',
        questionCode: 'QA_5',
        nextQuestions: ['QA_7']
      },
      {
        question: 'Not Satisfied',
        questionCode: 'QA_6',
        answers: ['Bad Staff Behaviour', 'Bad Hygiene', 'Bad Food Quality']
      },
      {
        question: 'Any suggestion to approve our service?',
        questionCode: 'QA_7'
      }
    ]
  };
}

export function getDispositionFormQuestions2() {
  const questionArr = [
    // {
    //   question: 'Agent name',
    //   questionName: 'agentName',
    //   questionCode: 'QA_1',
    //   option: [
    //     {
    //       label: 'Pavithra'
    //     },
    //     {
    //       label: 'Nandini'
    //     },
    //     {
    //       label: 'Bhuvaneshwari'
    //     },
    //     {
    //       label: 'Maria'
    //     }
    //   ]
    // },
    // {
    //   questionName: 'customerPhoneNumber',
    //   question: 'Customer Phone Number',
    //   questionCode: 'QA_2',
    //   questionType: 'text'
    // },
    // {
    //   questionName: 'guestName',
    //   question: 'Enter Guest Name',
    //   questionCode: 'QA_3',
    //   questionType: 'text'
    // },
    {
      questionName: 'numberOfAttempt',
      question: 'Attempt',
      questionCode: 'QA_4',
      option: [
        {
          label: 'Attempt 1'
        },
        {
          label: 'Attempt 2'
        },
        {
          label: 'Attempt 3'
        }
      ]
    },
    {
      questionName: 'languageChoosed',
      question: 'Language',
      questionCode: 'QA_5',
      option: [
        {
          label: 'English'
        },
        {
          label: 'Tamil'
        },
        {
          label: 'Kannada'
        },
        {
          label: 'Hindi'
        },
        {
          label: 'Malayalam'
        },
        {
          label: 'Telugu'
        }
      ]
    },
    {
      questionName: 'mainDisposition',
      question: 'Main Disposition',
      questionCode: 'QA_6',
      option: [
        {
          label: 'Connected'
        },
        {
          label: 'Not Connected'
        },
        {
          label: 'Feedback completed in call'
        }
      ]
    },
    {
      questionName: 'requiredType',
      question: 'Required Type',
      questionCode: 'QA_7',
      option: [
        {
          label: 'Take away'
        },
        {
          label: 'Quality'
        },
        {
          label: 'Quantity'
        }
      ]
    },
    {
      questionName: 'subDisposition',
      question: 'Sub disposition',
      questionCode: 'QA_8',
      option: [
        {
          label: 'RNR'
        },
        {
          label: 'Not Reachable'
        },
        {
          label: 'Switch Off'
        },
        {
          label: 'Wrong Number'
        },
        {
          label: 'Call Disconnected'
        },
        {
          label: 'Language Barrier'
        },
        {
          label: 'Not Interested to share feedback'
        },
        {
          label: 'Invalid number'
        },
        {
          label: 'Busy'
        },
        {
          label: 'Feedback taken'
        }
      ]
    },
    {
      questionName: 'customerExperiences',
      question: "Customer Experience's",
      questionCode: 'QA_9',
      option: [
        {
          label: 'Happy'
        },
        {
          label: 'Not Happy'
        },
        {
          label: 'Average'
        }
      ]
    },
    {
      questionName: 'issues',
      question: 'Issues',
      questionCode: 'QA_10',
      option: [
        {
          label: 'Wrong item / delivery'
        },
        {
          label: 'Not happy with the Ambience'
        },
        {
          label: 'Not happy with service'
        },
        {
          label: 'No much variety'
        },
        {
          label: 'Issue with quality_uncooked food'
        },
        {
          label: 'Issue with quality_Stable food'
        },
        {
          label: 'Issue with quality_Spice food'
        },
        {
          label: 'Issue with quality_Over cooked food'
        },
        {
          label: 'Issue with quality_Oily'
        },
        {
          label: 'Issue with quality_Cold food'
        },
        {
          label: 'Issue with quality_Bland'
        },
        {
          label: 'Happy with the Service/Food/Overall'
        },
        {
          label: 'Delay in service'
        }
      ]
    },
    {
      questionName: 'Rating',
      question: 'Rating',
      questionCode: 'QA_11',
      option: [
        {
          label: 'Given by customer'
        },
        {
          label: 'Not given by customer'
        }
      ]
    },
    {
      questionName: 'overallCustomerRating',
      question: 'Overall customer rating given in call',
      questionCode: 'QA_12',
      option: [
        {
          label: '1'
        },
        {
          label: '2'
        },
        {
          label: '3'
        },
        {
          label: '4'
        },
        {
          label: '5'
        }
      ]
    },
    {
      questionName: 'remarks_feedback',
      question: 'Remarks/feedback',
      questionCode: 'QA_13',
      questionType: 'text',
      multiline: true,
      rows: 4
    }
  ];

  return questionArr;
}
