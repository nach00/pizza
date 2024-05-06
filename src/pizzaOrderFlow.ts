export const pizzaOrderFlow = {
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
        {
          type: "reply",
          intent: "Negative: the customer would not like to order a pizza",
          nextStepID: "done",
        },
      ],
    },

    {
      id: "choose_toppings",
      type: "message",
      message: "Let me know the toppings you would like",
      events: [
        {
          type: "reply",
          intent: "Toppings: the customer has chosen the toppings",
          nextStepID: "done",
        },
        {
          type: "reply",
          intent: "Unclear: the customer was unclear about their choice",
          nextStepID: "assume_cheese",
        },
      ],
    },

    {
      id: "assume_cheese",
      type: "message",
      message: "Would a cheese pizza be ok?",
      events: [
        {
          type: "reply",
          intent: "Affirmative: the customer would like a plain cheese pizza",
          nextStepID: "done",
        },
        {
          type: "reply",
          intent:
            "Negative: the customer would like their pizza extra-cheeseless",
          nextStepID: "done",
        },
      ],
    },

    {
      id: "done",
      type: "message",
      message: "Pizza is on the way!",
    },
  ],
};
