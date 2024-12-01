// @ts-nocheck
import React, { useEffect } from "react";

import { API_URL, useAppContext } from "~context/AppContext";

import PricingSection from "./Pricing";

export default function Pricing({ setIsPricingPage }) {
  const [Price, setPrice] = React.useState(495);
  const [isMonthly, setIsMonthly] = React.useState(true);

  const { subscriptionData } = useAppContext();

  useEffect(() => {

    console.log("subscriptionData1: ", subscriptionData);
    chrome.storage.local.set({ subscriptionData: subscriptionData });
  }, [subscriptionData]);


  useEffect(() => {
    console.log("subscriptionData: ", subscriptionData);
    
    // Check if the subscription status is "active"
    if (subscriptionData?.status === "active") {
      console.log("User is subscribed");
      setIsPricingPage(false); // Hide pricing page if subscribed
    }
  }, [subscriptionData]); // Dependency on subscriptionData to react to updates
  

  // useEffect(() => {
  //   console.log("subscriptionData2: ", subscriptionData);
  //   if (subscriptionData?.metadata?.isSubscribed === "true") {
  //     console.log("it is subscribed")
  //     setIsPricingPage(false);
  //   }
  // }, [subscriptionData]);

  const handleYearly = () => {
    setPrice(850);
    setIsMonthly(false);
  };

  const handleMonthly = () => {
    setPrice(495);
    setIsMonthly(true);
  };

  const handleCheckout = async (priceId, customerId) => {
    if (subscriptionData) {
      fetch(`${API_URL}/create-subscription`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          priceId: priceId,
          customerId: customerId,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            chrome.tabs.create({ url: data.url });
          }
        });
    }
  };

  const handleChange = async () => {
    console.log()
    let priceId;
    if (Price === 495) {
      priceId = process.env.PLASMO_PUBLIC_SIX_MONTH;
      console.log("priceId for monthly: ", priceId);
      await handleCheckout(priceId, subscriptionData.metadata.customerId);
    } else if (Price === 850) {
      console.log("priceId for yearly: ", priceId);
      priceId = process.env.PLASMO_PUBLIC_YEARLY;
      await handleCheckout(priceId, subscriptionData.metadata.customerId);
    }
  };

  return (
    <>
      <div className="pricing-container">
        <div className="pricing-wrapper">
          {/* Heading */}
          <div className="pricing-heading">Practicing</div>

          {/* Video Section */}
          <div className="pricing-section">
            <PricingSection
              Price={Price}
              isMonthly={isMonthly}
              handleYearly={handleYearly}
              handleMonthly={handleMonthly}
              handleChange={handleChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}
