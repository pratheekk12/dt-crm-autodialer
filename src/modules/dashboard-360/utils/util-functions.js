import map from 'lodash/map';

export function getAddressFromObj(obj) {
  return `${obj.address1}, ${obj.address2}, ${obj.BillingTownArea}, ${obj.BillingCityName}, ${obj.BillingStateName}, ${obj.BillingCountryName}, ${obj.BillingPin}`;
}

export function getDependentQuestionsCodes(options, dependentQuesCodes) {
  for (let opt of options) {
    if (opt.dependentQuestion) {
      //dependentQuesCodes = [...dependentQuesCodes, ...map(opt.dependentQuestion,'questionCode')]
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
                            },
                            {
                              questionCode: 'escalated',
                              question: 'Escalated to L2',
                              questionType: 'checkbox',
                              questionName: 'QA_38',
                              option: [
                                {
                                  label: 'Yes',
                                  name: 'escalated'
                                }
                              ]
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
                            },
                            {
                              questionCode: 'escalated',
                              question: 'Escalated to L2',
                              questionType: 'checkbox',
                              questionName: 'QA_37',
                              option: [
                                {
                                  label: 'Yes',
                                  name: 'escalated'
                                }
                              ]
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
                            },
                            {
                              questionCode: 'escalated',
                              question: 'Escalated to L2',
                              questionType: 'checkbox',
                              questionName: 'QA_36',
                              option: [
                                {
                                  label: 'Yes',
                                  name: 'escalated'
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
                    },
                    {
                      questionCode: 'escalated',
                      question: 'Escalated to L2',
                      questionType: 'checkbox',
                      questionName: 'QA_34',
                      option: [
                        {
                          label: 'Yes',
                          name: 'escalated'
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
            },
            {
              questionCode: 'escalated',
              question: 'Escalated to L2',
              questionType: 'checkbox',
              questionName: 'QA_35',
              option: [
                {
                  label: 'Yes',
                  name: 'escalated'
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

export function getDispositionFormQuestions4() {
  const questionArr = [
    {
      questionCode: 'mainDisposition',
      question: 'Main Disposition',
      questionName: 'QA_101',
      option: [
        {
          label: 'Connected',
          dependentQuestion: [
            {
              questionCode: 'response',
              question: 'Response',
              questionName: 'QA_103',
              option: [
                {
                  label: 'Interested',
                  dependentQuestion: [
                    {
                      questionCode: 'languageChoosed',
                      question: 'Language',
                      questionName: 'QA_105',
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
                      questionCode: 'foodQuality',
                      question: 'Food Quality',
                      questionName: 'QA_106',
                      questionType: 'radio',
                      option: [
                        {
                          label: 'Highly Satisfied'
                        },
                        {
                          label: 'Satisfied'
                        },
                        {
                          label: 'Neutral'
                        },
                        {
                          label: 'Dissatisfied'
                        },
                        {
                          label: 'Highly Dissatisfied'
                        }
                      ]
                    },
                    {
                      questionCode: 'foodQuantity',
                      question: 'Food Quantity',
                      questionType: 'radio',
                      questionName: 'QA_107',
                      option: [
                        {
                          label: 'Highly Satisfied'
                        },
                        {
                          label: 'Satisfied'
                        },
                        {
                          label: 'Neutral'
                        },
                        {
                          label: 'Dissatisfied'
                        },
                        {
                          label: 'Highly Dissatisfied'
                        }
                      ]
                    },
                    {
                      questionCode: 'foodPackaging',
                      question: 'Food Packaging',
                      questionName: 'QA_108',
                      questionType: 'radio',
                      option: [
                        {
                          label: 'Highly Satisfied'
                        },
                        {
                          label: 'Satisfied'
                        },
                        {
                          label: 'Neutral'
                        },
                        {
                          label: 'Dissatisfied'
                        },
                        {
                          label: 'Highly Dissatisfied'
                        }
                      ]
                    },
                    {
                      questionCode: 'wrongItem',
                      question: 'Wrong Item',
                      questionType: 'radio',
                      questionName: 'QA_109',
                      option: [
                        {
                          label: 'Highly Satisfied'
                        },
                        {
                          label: 'Satisfied'
                        },
                        {
                          label: 'Neutral'
                        },
                        {
                          label: 'Dissatisfied'
                        },
                        {
                          label: 'Highly Dissatisfied'
                        }
                      ]
                    },
                    {
                      questionCode: 'missingItem',
                      question: 'Missing Item',
                      questionType: 'radio',
                      questionName: 'QA_110',
                      option: [
                        {
                          label: 'Highly Satisfied'
                        },
                        {
                          label: 'Satisfied'
                        },
                        {
                          label: 'Neutral'
                        },
                        {
                          label: 'Dissatisfied'
                        },
                        {
                          label: 'Highly Dissatisfied'
                        }
                      ]
                    },
                    {
                      questionCode: 'overallCustomerRating',
                      question: 'Overall customer rating given in call',
                      questionName: 'QA_111',
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
                      questionCode: 'customerExperiences',
                      question: "Customer Experience's",
                      questionName: 'QA_112',
                      option: [
                        {
                          label: 'Happy',
                          dependentQuestion: [
                            {
                              questionCode: 'recommendUs',
                              question:
                                'How would you recommend us to your friends and family',
                              questionName: 'QA_113',
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
                                },
                                {
                                  label: '6'
                                },
                                {
                                  label: '7'
                                },
                                {
                                  label: '8'
                                },
                                {
                                  label: '9'
                                },
                                {
                                  label: '10'
                                }
                              ]
                            }
                          ]
                        },
                        {
                          label: 'Average'
                        },
                        {
                          label: 'Not Happy'
                        }
                      ]
                    },
                    {
                      questionCode: 'escalated',
                      question: 'Escalated to L2',
                      questionType: 'checkbox',
                      questionName: 'QA_140',
                      option: [
                        {
                          label: 'Yes',
                          name: 'escalated'
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
                      questionName: 'QA_104',
                      questionType: 'textarea',
                      additionalConfig: {
                        rows: 4
                      },
                      option: [{}]
                    },
                    {
                      questionCode: 'escalated',
                      question: 'Escalated to L2',
                      questionType: 'checkbox',
                      questionName: 'QA_139',
                      option: [
                        {
                          label: 'Yes',
                          name: 'escalated'
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
          label: 'Not Connected',
          dependentQuestion: [
            {
              questionCode: 'subDisposition',
              question: 'Sub disposition',
              questionName: 'QA_102',
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
              questionCode: 'escalated',
              question: 'Escalated to L2',
              questionType: 'checkbox',
              questionName: 'QA_137',
              option: [
                {
                  label: 'Yes',
                  name: 'escalated'
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
