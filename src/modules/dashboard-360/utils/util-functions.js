export function getAddressFromObj(obj) {
  return `${obj.address1}, ${obj.address2}, ${obj.BillingTownArea}, ${obj.BillingCityName}, ${obj.BillingStateName}, ${obj.BillingCountryName}, ${obj.BillingPin}`;
}

export function getDispositionFormQuestions() {
  return {
    "states" : [{
      question : 'Feedback',
      questionCode: "QA_0",
      nextQuestions: ["QA_1","QA_2","QA_3"]
    },{
      question : 'Do you feel satisfied with our food?',
      questionCode: "QA_1",
      nextQuestions: ["QA_4","QA_5","QA_6"]
    },{
      question : 'How would you rate the quality of the food at our restaurant?',
      questionCode: "QA_2",
      answers: ["1","2","3","4","5"]
    },{
      question : 'Did you face any issues with any service of the restaurant?',
      questionCode: "QA_3"
    },{
      question : 'Satisfied',
      questionCode: "QA_4"
    },{
      question : 'It was okay',
      questionCode: "QA_5",
      nextQuestions: ["QA_7"]
    },{
      question : 'Not Satisfied',
      questionCode: "QA_6",
      answers: ["Bad Staff Behaviour","Bad Hygiene","Bad Food Quality"],
    },{
      question : 'Any suggestion to approve our service?',
      questionCode: "QA_7"
    }]
  }
}
