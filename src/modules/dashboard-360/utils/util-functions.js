import map from 'lodash/map';

export function getAddressFromObj(obj) {
  return `${obj.address1}, ${obj.address2}, ${obj.BillingTownArea}, ${obj.BillingCityName}, ${obj.BillingStateName}, ${obj.BillingCountryName}, ${obj.BillingPin}`;
}

export function getDependentQuestionsCodes(options, dependentQuesCodes) {
  for (let opt of options) {
    if (opt.dependentQuestion) {
      dependentQuesCodes = [
        ...dependentQuesCodes,
        ...map(opt.dependentQuestion, 'questionCode')
      ];
      for (let depQue of opt.dependentQuestion) {
        return getDependentQuestionsCodes(depQue.option, dependentQuesCodes);
      }
    }
  }
  return dependentQuesCodes;
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
    // {
    //   questionName: 'numberOfAttempt',
    //   question: 'Attempt',
    //   questionCode: 'QA_4',
    //   option: [
    //     {
    //       label: 'Attempt 1'
    //     },
    //     {
    //       label: 'Attempt 2'
    //     },
    //     {
    //       label: 'Attempt 3'
    //     }
    //   ]
    // },
    {
      questionCode: 'languageChoosed',
      question: 'Language',
      questionName: 'QA_5',
      option: [
        {
          label: 'English'
          // dependentQuestion: [
          //   {
          //     questionName: 'whatWereYouNotSatisfiedWith?',
          //     question: 'What were you not satisfied with ?',
          //     questionCode: 'QA_14',
          //     questionType: 'radio',
          //     option: [
          //       {
          //         label: 'Food',
          //         dependentQuestion: [
          //           {
          //             questionName: 'taste',
          //             question: 'Are you satisfied with our food?',
          //             questionCode: 'QA_15',
          //             questionType: 'rating',
          //             option: [
          //               {
          //                 label: 'yes'
          //               },
          //               {
          //                 label: 'no'
          //               }
          //             ]
          //           },
          //           {
          //             questionName: 'taste2',
          //             question: 'Are you satisfied with our food2?',
          //             questionCode: 'QA_152',
          //             option: [
          //               {
          //                 label: 'yes'
          //               },
          //               {
          //                 label: 'no'
          //               }
          //             ]
          //           }
          //         ]
          //       },
          //       {
          //         label: 'Food2'
          //       }
          //     ]
          //   }
          // ]
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
      questionCode: 'mainDisposition',
      question: 'Main Disposition',
      questionName: 'QA_6',
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
      questionCode: 'requiredType',
      question: 'Required Type',
      questionName: 'QA_7',
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
      // questionType: 'checkbox',
      // option: [
      //   {
      //     label: 'Food',
      //     dependentQuestion: [
      //       {
      //         questionName: 'taste',
      //         question: 'Are you satisfied with our food?',
      //         questionCode: 'QA_7_QA_15',
      //         questionType: 'rating',
      //         option: [
      //           {
      //             label: 'yes'
      //           },
      //           {
      //             label: 'no'
      //           }
      //         ]
      //       },
      //       {
      //         questionName: 'taste2',
      //         question: 'Are you satisfied with our food2?',
      //         questionCode: 'QA_7_QA_152',
      //         option: [
      //           {
      //             label: 'yes'
      //           },
      //           {
      //             label: 'no'
      //           }
      //         ]
      //       }
      //     ]
      //   },
      //   {
      //     label: 'Food2'
      //   }
      // ]
    },
    {
      questionCode: 'subDisposition',
      question: 'Sub disposition',
      questionName: 'QA_8',
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
      questionCode: 'customerExperiences',
      question: "Customer Experience's",
      questionName: 'QA_9',
      option: [
        {
          label: 'Happy'
        },
        {
          label: 'Not Happy',
          dependentQuestion: [
            {
              questionCode: 'whatWereYouNotSatisfiedWith?',
              question: 'What were you not satisfied with ?',
              questionName: 'QA_14',
              option: [
                {
                  label: 'Food',
                  dependentQuestion: [
                    {
                      questionCode: 'taste',
                      question: 'Are you satisfied with our food?',
                      questionName: 'QA_15',
                      option: [
                        {
                          label: 'yes'
                        },
                        {
                          label: 'no'
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          label: 'Average'
        }
      ]
    },
    {
      questionCode: 'issues',
      question: 'Issues',
      questionName: 'QA_10',
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
      questionCode: 'Rating',
      question: 'Rating',
      questionName: 'QA_11',
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
      questionCode: 'overallCustomerRating',
      question: 'Overall customer rating given in call',
      questionName: 'QA_12',
      questionType: 'radio',
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
      questionCode: 'remarks_feedback',
      question: 'Remarks/feedback',
      questionName: 'QA_13',
      questionType: 'textarea',
      additionalConfig: {
        rows: 4
      },
      option: [{}]
    }
  ];

  return questionArr;
}

export function getDispositionFormQuestions3() {
  const questionArr = [
    {
      questionCode: 'mainDisposition',
      question: 'Main Disposition',
      questionName: 'QA_1',
      option: [
        {
          label: 'Connected',
          dependentQuestion: [
            {
              questionCode: 'response',
              question: 'Response',
              questionName: 'QA_3',
              option: [
                {
                  label: 'Interested',
                  dependentQuestion: [
                    {
                      questionCode: 'languageChoosed',
                      question: 'Language',
                      questionName: 'QA_5',
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
                      questionCode: 'customerExperiences',
                      question: "Customer Experience's",
                      questionName: 'QA_6',
                      option: [
                        {
                          label: 'Happy',
                          dependentQuestion: [
                            {
                              questionCode: 'overallCustomerRating',
                              question: 'Overall customer rating given in call',
                              questionName: 'QA_7',
                              questionType: 'radio',
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
                              questionCode: 'remarks_feedback',
                              question: 'Remarks/feedback',
                              questionName: 'QA_8',
                              questionType: 'textarea',
                              additionalConfig: {
                                rows: 4
                              },
                              option: [{}]
                            }
                          ]
                        },
                        {
                          label: 'Not Happy'
                        },
                        {
                          label: 'Average'
                        }
                      ]
                    }
                  ]
                },
                {
                  label: 'Not interested',
                  dependentQuestion: [
                    {
                      questionCode: 'remarks_feedback',
                      question: 'Remarks/feedback',
                      questionName: 'QA_4',
                      questionType: 'textarea',
                      additionalConfig: {
                        rows: 4
                      },
                      option: [{}]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          label: 'Not Connected',
          dependentQuestion: [
            {
              questionCode: 'subDisposition',
              question: 'Sub disposition',
              questionName: 'QA_2',
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
            }
          ]
        }
      ]
    }
  ];

  return questionArr;
}
