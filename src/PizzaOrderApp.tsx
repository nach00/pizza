import React, { useEffect, useState } from "react";
import {
  Button,
  H1,
  YStack,
  XStack,
  Paragraph,
  Image,
  H2,
  H3,
  H5,
  H6,
  Text,
  SizableText,
} from "tamagui";
import type { SizeTokens } from "tamagui";
import { IconContainer, MainCard } from "./Card";

export const jsonData = [
  {
    steps: [
      {
        type: "message",
        events: [
          {
            type: "",
          },
          {
            type: "",
          },
        ],
      },

      {
        type: "",
        events: [
          {
            type: "",
          },
          {
            type: "",
          },
        ],
      },

      {
        type: "",
        events: [
          {
            type: "",
          },
          {
            type: "",
          },
        ],
      },

      {
        type: "",
      },
    ],
  },
];

function PizzaOrderApp({ onJsonDataChange }) {
  const [dynamicJsonData, setDynamicJsonData] = useState(jsonData);

  useEffect(() => {
    if (onJsonDataChange) {
      onJsonDataChange(dynamicJsonData);
    }
  }, [dynamicJsonData, onJsonDataChange]);

  // Update json automatically

  const updateJsonMessage = (stepIndex: number, type: string) => {
    setDynamicJsonData((prevData) => {
      const updatedData = [...prevData];
      updatedData[0].steps[stepIndex].type = type;
      return updatedData;
    });
  };

  const updateJsonReply = (
    stepIndex: number,
    eventIndex: number,
    type: string,
  ) => {
    setDynamicJsonData((prevData) => {
      const updatedData = [...prevData];
      updatedData[0].steps[stepIndex].events[eventIndex].type = type;
      return updatedData;
    });
  };

  // Order steps
  const [orderStep, setOrderStep] = useState(0);

  // Toppings
  const [toppings, setToppings] = useState({
    pepperoni: false,
    sausage: false,
    cheese: false,
    unsure: false,
  });

  // Final choice
  const [finalChoice, setFinalChoice] = useState("");

  // Function to handle the order decision
  const handleOrderDecision = (decision: boolean) => {
    if (decision) {
      setOrderStep(1);
      {
        updateJsonReply(0, 0, "reply");
        updateJsonMessage(1, "message");
      }
    } else {
      setFinalChoice("Negative: the customer would not like to order a pizza");
      setOrderStep(3);
      {
        updateJsonReply(0, 1, "reply");
        updateJsonMessage(1, "message");
      }
    }
  };

  // Function to refresh the page
  const refreshPage = () => {
    window.location.reload();
  };

  // Function to handle the topping change
  const handleToppingChange = (topping: string) => (checked: any) => {
    setToppings((prev) => ({
      ...prev,
      [topping]: checked,
    }));
  };

  // Function to handle the toppings submission
  const handleSubmitToppings = () => {
    const selectedToppings = Object.entries(toppings)
      .filter(([_, value]) => value)
      .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1)); // Capitalizes the first letter

    // Unsure option or no toppings selected
    if (selectedToppings.includes("Unsure") || selectedToppings.length === 0) {
      setOrderStep(2);
      {
        updateJsonReply(1, 1, "reply");
        updateJsonMessage(2, "message");
      }

      // Toppings selected
    } else {
      const chosenToppingsText = selectedToppings.join(", ");
      setFinalChoice(`${chosenToppingsText}`);
      setOrderStep(4);
      {
        updateJsonReply(1, 0, "reply");
        updateJsonMessage(2, "message");
        updateJsonMessage(3, "message");
      }
    }
  };

  // Function to handle the unclear choice
  const handleUnclearChoice = (decision: boolean) => {
    // Cheese pizza OK
    if (decision) {
      setFinalChoice("Cheese");
      {
        updateJsonReply(2, 0, "reply");
        updateJsonMessage(3, "message");
      }
      setOrderStep(4);
      // Extra-cheeseless pizza
    } else {
      setFinalChoice("Extra Cheeseless");
      {
        updateJsonReply(2, 1, "reply");
        updateJsonMessage(3, "message");
      }
      setOrderStep(5);
    }
  };

  return (
    <>
      <MainCard>
        {orderStep === 0 && (
          <YStack gap="$4">
            <XStack gap={24} ai="center" mb={48}>
              <IconContainer>
                <Image
                  source={{
                    uri: "/pizza-large.svg",
                    width: 32.79,
                    height: 39.01,
                  }}
                />
              </IconContainer>
              <YStack gap={20}>
                <Paragraph
                  col="white"
                  fontWeight="bold"
                  fontSize={24}
                  lineHeight={18}
                >
                  Hello!
                </Paragraph>
                <Paragraph col="white" fontSize={20} lineHeight={15}>
                  Would you like to order a pizza?
                </Paragraph>
              </YStack>
            </XStack>
            <XStack gap={48} jc="space-between">
              <Button
                f={1}
                w="100%"
                bc="#1A5ED3"
                onPress={() => handleOrderDecision(true)}
              >
                <Paragraph
                  fontSize={24}
                  col="white"
                  tt="lowercase"
                  fontWeight="normal"
                >
                  Yes
                </Paragraph>
              </Button>
              <Button
                f={1}
                w="100%"
                bc="#1A5ED3"
                onPress={() => handleOrderDecision(false)}
              >
                <Paragraph
                  fontSize={24}
                  col="white"
                  tt="lowercase"
                  fontWeight="normal"
                >
                  No
                </Paragraph>
              </Button>
            </XStack>
          </YStack>
        )}
        {orderStep === 1 && (
          <YStack gap="$4">
            <XStack gap={24} ai="center" mb={48}>
              <IconContainer>
                <Image
                  source={{
                    uri: "/pizza-large.svg",
                    width: 32.79,
                    height: 39.01,
                  }}
                />
              </IconContainer>
              <YStack gap={20}>
                <Paragraph
                  col="white"
                  fontWeight="bold"
                  fontSize={24}
                  lineHeight={18}
                >
                  Great!
                </Paragraph>
                <Paragraph col="white" fontSize={20} lineHeight={15}>
                  Let me know the toppings you would like.
                </Paragraph>
              </YStack>
            </XStack>
            {["pepperoni", "sausage", "cheese", "unsure"].map((topping) => (
              <YStack ai="center">
                <ToppingSelection
                  key={topping}
                  label={topping}
                  size="$4"
                  checked={toppings[topping]}
                  onCheckedChange={handleToppingChange(topping)}
                />
              </YStack>
            ))}
            <Button
              f={1}
              w="100%"
              bc="#1A5ED3"
              onPress={handleSubmitToppings}
              mt={48}
            >
              <Paragraph
                fontSize={24}
                col="white"
                tt="lowercase"
                fontWeight="normal"
              >
                submit toppings
              </Paragraph>
            </Button>
          </YStack>
        )}
        {orderStep === 2 && (
          <YStack gap="$2">
            <XStack gap={24} ai="center" mb={48}>
              <IconContainer>
                <Image
                  source={{
                    uri: "/cheese-large.svg",
                    width: 34.6,
                    height: 24,
                  }}
                />
              </IconContainer>
              <YStack gap={20}>
                <Paragraph
                  col="white"
                  fontWeight="bold"
                  fontSize={24}
                  lineHeight={18}
                >
                  Unclear directions!
                </Paragraph>
                <Paragraph col="white" fontSize={20} lineHeight={15}>
                  Would cheese pizza be okay?
                </Paragraph>
              </YStack>
            </XStack>
            <XStack gap={48} jc="space-between">
              <Button
                f={1}
                w="100%"
                bc="#1A5ED3"
                onPress={() => handleUnclearChoice(true)}
              >
                <Paragraph
                  fontSize={24}
                  col="white"
                  tt="lowercase"
                  fontWeight="normal"
                >
                  Yes
                </Paragraph>
              </Button>
              <Button
                f={1}
                w="100%"
                bc="#1A5ED3"
                onPress={() => handleUnclearChoice(false)}
              >
                <Paragraph
                  fontSize={24}
                  col="white"
                  tt="lowercase"
                  fontWeight="normal"
                >
                  No
                </Paragraph>
              </Button>
            </XStack>
          </YStack>
        )}
        {orderStep === 3 && (
          <YStack gap="$2">
            <XStack gap={24} ai="center" mb={48}>
              <IconContainer>
                <Image
                  source={{
                    uri: "/x-large.svg",
                    width: 24,
                    height: 24,
                  }}
                />
              </IconContainer>
              <YStack gap={20}>
                <Paragraph
                  col="white"
                  fontWeight="bold"
                  fontSize={24}
                  lineHeight={18}
                >
                  No thanks
                </Paragraph>
                <Paragraph col="white" fontSize={20} lineHeight={15}>
                  That’s okay, try again later.
                </Paragraph>
              </YStack>
            </XStack>
            <Button f={1} w="100%" bc="#1A5ED3" onPress={refreshPage}>
              <Paragraph
                fontSize={24}
                col="white"
                tt="lowercase"
                fontWeight="normal"
              >
                Refresh Page
              </Paragraph>
            </Button>
          </YStack>
        )}
        {orderStep === 4 && (
          <YStack gap="$2">
            <XStack gap={24} ai="center" mb={48}>
              <IconContainer>
                <Image
                  source={{
                    uri: "/check-large.svg",
                    width: 24.34,
                    height: 20,
                  }}
                />
              </IconContainer>
              <YStack gap={20}>
                <Paragraph
                  col="white"
                  fontWeight="bold"
                  fontSize={24}
                  lineHeight={18}
                >
                  Pizza is on the way!
                </Paragraph>
                <Paragraph col="white" fontSize={20} lineHeight={15}>
                  You’ve chosen the toppings:
                </Paragraph>
              </YStack>
            </XStack>
            <Paragraph fontSize={24} mb={48} textAlign="center">
              {finalChoice}
            </Paragraph>
            <Button f={1} w="100%" bc="#1A5ED3" onPress={refreshPage}>
              <Paragraph
                fontSize={24}
                col="white"
                tt="lowercase"
                fontWeight="normal"
              >
                Refresh Page
              </Paragraph>
            </Button>
          </YStack>
        )}{" "}
        {orderStep === 5 && (
          <YStack gap="$2">
            <XStack gap={24} ai="center" mb={48}>
              <IconContainer>
                <Image
                  source={{
                    uri: "/x-large.svg",
                    width: 32.79,
                    height: 39.01,
                  }}
                />
              </IconContainer>
              <YStack gap={20}>
                <Paragraph
                  col="white"
                  fontWeight="bold"
                  fontSize={24}
                  lineHeight={18}
                >
                  Negative!
                </Paragraph>
                <Paragraph col="white" fontSize={20} lineHeight={15}>
                  You want your pizza:
                </Paragraph>
              </YStack>
            </XStack>
            <Paragraph fontSize={24} mb={48} textAlign="center">
              {finalChoice}
            </Paragraph>
            <Button f={1} w="100%" bc="#1A5ED3" onPress={refreshPage}>
              <Paragraph
                fontSize={24}
                col="white"
                tt="lowercase"
                fontWeight="normal"
              >
                Refresh Page
              </Paragraph>
            </Button>
          </YStack>
        )}
      </MainCard>
    </>
  );
}

export function ToppingSelection({
  label = "Option",
  checked,
  onCheckedChange,
}: {
  key?: string;
  size: SizeTokens;
  label?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}) {
  const handleClick = () => {
    if (onCheckedChange) {
      onCheckedChange(!checked);
    }
  };

  return (
    <XStack
      onPress={handleClick}
      ai="center"
      width={300}
      gap="$2"
      p="$3"
      br="$12"
      jc="center"
      hoverStyle={{
        backgroundColor: "#3A8CF7",
      }}
      style={{
        borderColor: checked ? "#005DFF" : "#14181F",
        backgroundColor: checked ? "#3A8CF7" : "transparent",
        borderWidth: 2,
        paddingVertical: 4,
        paddingHorizontal: 8,
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      <Paragraph
        col="white"
        fontSize={20}
        style={{
          fontWeight: checked ? "bold" : "normal",
        }}
      >
        {label}
      </Paragraph>
    </XStack>
  );
}

export default PizzaOrderApp;
