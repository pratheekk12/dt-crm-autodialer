import map from 'lodash/map';

export function getAddressFromObj(obj) {
  return `${obj.address1}, ${obj.address2}, ${obj.BillingTownArea}, ${obj.BillingCityName}, ${obj.BillingStateName}, ${obj.BillingCountryName}, ${obj.BillingPin}`;
}

export function getDependentQuestionsCodes(options, dependentQuesCodes) {
  for (let opt of options) {
    if (opt.dependentQuestion) {
      dependentQuesCodes.push(...map(opt.dependentQuestion, 'questionCode'));
      for (let depQue of opt.dependentQuestion) {
        getDependentQuestionsCodes(depQue.option, dependentQuesCodes);
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
              question: 'What were you not satisfied with',
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
                              questionCode: 'taste',
                              question: 'Food Taste',
                              questionName: 'QA_8',
                              questionType: 'radio',
                              option: [
                                {
                                  label: 'Good'
                                },
                                {
                                  label: 'Bad'
                                },
                                {
                                  label: 'Different taste from other DT'
                                }
                              ]
                            },
                            {
                              questionCode: 'foodFreshness',
                              question: 'Food Freshness',
                              questionName: 'QA_9',
                              questionType: 'radio',
                              option: [
                                {
                                  label: 'Yes'
                                },
                                {
                                  label: 'No'
                                }
                              ]
                            },
                            {
                              questionCode: 'spicy',
                              question: 'Spicy',
                              questionName: 'QA_10',
                              questionType: 'radio',
                              option: [
                                {
                                  label: 'Yes'
                                },
                                {
                                  label: 'No'
                                }
                              ]
                            },
                            {
                              questionCode: 'serverService',
                              question:
                                'Was the server attentive, friendly & knowledgeable?',
                              questionName: 'QA_11',
                              questionType: 'radio',
                              option: [
                                {
                                  label: 'Yes'
                                },
                                {
                                  label: 'No'
                                }
                              ]
                            },
                            {
                              questionCode: 'waitTimeAttended',
                              question: 'Wait time to be attended to',
                              questionName: 'QA_12',
                              questionType: 'radio',
                              option: [
                                {
                                  label: 'On Time'
                                },
                                {
                                  label: '<5 mts'
                                },
                                {
                                  label: '5-10 mts'
                                },
                                {
                                  label: '10-20 mts'
                                },
                                {
                                  label: '20-30 mts'
                                },
                                {
                                  label: '>30 mts'
                                }
                              ]
                            },
                            {
                              questionCode: 'waitTimeForOrder',
                              question:
                                'Wait time for order to be served to the customer',
                              questionName: 'QA_13',
                              questionType: 'radio',
                              option: [
                                {
                                  label: 'On Time'
                                },
                                {
                                  label: '<5 mts'
                                },
                                {
                                  label: '5-10 mts'
                                },
                                {
                                  label: '10-20 mts'
                                },
                                {
                                  label: '20-30 mts'
                                },
                                {
                                  label: '>30 mts'
                                }
                              ]
                            },
                            {
                              questionCode: 'cleanliness',
                              question: 'Cleanliness',
                              questionName: 'QA_14',
                              questionType: 'radio',
                              option: [
                                {
                                  label: 'Good'
                                },
                                {
                                  label: 'Bad'
                                },
                                {
                                  label: 'Need Improvement'
                                }
                              ]
                            },
                            {
                              questionCode: 'seating',
                              question: 'Seating',
                              questionName: 'QA_15',
                              questionType: 'radio',
                              option: [
                                {
                                  label: 'Good'
                                },
                                {
                                  label: 'Bad'
                                },
                                {
                                  label: 'Need Improvement'
                                }
                              ]
                            },
                            {
                              questionCode: 'quantity',
                              question: 'Quantity',
                              questionName: 'QA_16',
                              questionType: 'radio',
                              option: [
                                {
                                  label: 'More'
                                },
                                {
                                  label: 'Less'
                                },
                                {
                                  label: 'Adequate'
                                }
                              ]
                            },
                            {
                              questionCode: 'price',
                              question: 'Price',
                              questionName: 'QA_17',
                              questionType: 'radio',
                              option: [
                                {
                                  label: 'High'
                                },
                                {
                                  label: 'Average'
                                },
                                {
                                  label: 'Low'
                                }
                              ]
                            },
                            {
                              questionCode: 'remarks_feedback',
                              question: 'Remarks/feedback',
                              questionName: 'QA_18',
                              questionType: 'textarea',
                              additionalConfig: {
                                rows: 4
                              },
                              option: [{}]
                            }
                          ]
                        },
                        {
                          label: 'Not Happy',
                          dependentQuestion: [
                            {
                              questionCode: 'issues',
                              question: 'Issues',
                              questionName: 'QA_19',
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
                              questionCode: 'overallCustomerRating',
                              question: 'Overall customer rating given in call',
                              questionName: 'QA_20',
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
                              questionName: 'QA_21',
                              questionType: 'textarea',
                              additionalConfig: {
                                rows: 4
                              },
                              option: [{}]
                            }
                          ]
                        },
                        {
                          label: 'Average',
                          dependentQuestion: [
                            {
                              questionCode: 'overallCustomerRating',
                              question: 'Overall customer rating given in call',
                              questionName: 'QA_22',
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
                              questionCode: 'taste',
                              question: 'Food Taste',
                              questionName: 'QA_23',
                              questionType: 'radio',
                              option: [
                                {
                                  label: 'Good'
                                },
                                {
                                  label: 'Bad'
                                },
                                {
                                  label: 'Different taste from other DT'
                                }
                              ]
                            },
                            {
                              questionCode: 'foodFreshness',
                              question: 'Food Freshness',
                              questionName: 'QA_24',
                              questionType: 'radio',
                              option: [
                                {
                                  label: 'Yes'
                                },
                                {
                                  label: 'No'
                                }
                              ]
                            },
                            {
                              questionCode: 'spicy',
                              question: 'Spicy',
                              questionName: 'QA_25',
                              questionType: 'radio',
                              option: [
                                {
                                  label: 'Yes'
                                },
                                {
                                  label: 'No'
                                }
                              ]
                            },
                            {
                              questionCode: 'serverService',
                              question:
                                'Was the server attentive, friendly & knowledgeable?',
                              questionName: 'QA_26',
                              questionType: 'radio',
                              option: [
                                {
                                  label: 'Yes'
                                },
                                {
                                  label: 'No'
                                }
                              ]
                            },
                            {
                              questionCode: 'waitTimeAttended',
                              question: 'Wait time to be attended to',
                              questionName: 'QA_27',
                              questionType: 'radio',
                              option: [
                                {
                                  label: 'On Time'
                                },
                                {
                                  label: '<5 mts'
                                },
                                {
                                  label: '5-10 mts'
                                },
                                {
                                  label: '10-20 mts'
                                },
                                {
                                  label: '20-30 mts'
                                },
                                {
                                  label: '>30 mts'
                                }
                              ]
                            },
                            {
                              questionCode: 'waitTimeForOrder',
                              question:
                                'Wait time for order to be served to the customer',
                              questionName: 'QA_28',
                              questionType: 'radio',
                              option: [
                                {
                                  label: 'On Time'
                                },
                                {
                                  label: '<5 mts'
                                },
                                {
                                  label: '5-10 mts'
                                },
                                {
                                  label: '10-20 mts'
                                },
                                {
                                  label: '20-30 mts'
                                },
                                {
                                  label: '>30 mts'
                                }
                              ]
                            },
                            {
                              questionCode: 'cleanliness',
                              question: 'Cleanliness',
                              questionName: 'QA_29',
                              questionType: 'radio',
                              option: [
                                {
                                  label: 'Good'
                                },
                                {
                                  label: 'Bad'
                                },
                                {
                                  label: 'Need Improvement'
                                }
                              ]
                            },
                            {
                              questionCode: 'seating',
                              question: 'Seating',
                              questionName: 'QA_30',
                              questionType: 'radio',
                              option: [
                                {
                                  label: 'Good'
                                },
                                {
                                  label: 'Bad'
                                },
                                {
                                  label: 'Need Improvement'
                                }
                              ]
                            },
                            {
                              questionCode: 'quantity',
                              question: 'Quantity',
                              questionName: 'QA_31',
                              questionType: 'radio',
                              option: [
                                {
                                  label: 'More'
                                },
                                {
                                  label: 'Less'
                                },
                                {
                                  label: 'Adequate'
                                }
                              ]
                            },
                            {
                              questionCode: 'price',
                              question: 'Price',
                              questionName: 'QA_32',
                              questionType: 'radio',
                              option: [
                                {
                                  label: 'High'
                                },
                                {
                                  label: 'Average'
                                },
                                {
                                  label: 'Low'
                                }
                              ]
                            },
                            {
                              questionCode: 'remarks_feedback',
                              question: 'Remarks/feedback',
                              questionName: 'QA_33',
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
                  label: 'Not interested',
                  dependentQuestion: [
                    {
                      questionCode: 'remarks_feedback5',
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
