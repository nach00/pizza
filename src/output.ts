const pizzaOutput = [
  {
    initialStepID: "greeting",

    steps: [
      {
        id: "greeting",
        type: "message",
        message: "Hello! Would you like to order a pizza?",
        events: [
          {
            type: "reply",
            intent: "Affirmative: the customer would like to order a pizza",
            nextStepID: "choose_toppings",
          },
        ],
      },

      {
        id: "choose_toppings",
        type: "message",
        message: "Let me know the toppings you would like",
        events: [],
      },
    ],
  },
];
