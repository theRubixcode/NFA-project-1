import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Spacing from "../Spacing";
import Section from "../Section";
import FunFact from "../FunFact";
import { preSale } from "../../utils/web3";
import Button from "../Button";
import { toast } from "react-toastify";

const Countdown = ({ onTransactionComplete }) => {
  const launchDate = new Date("2023-08-12T12:00:00Z").getTime();
  const now = new Date().getTime();
  const timeRemaining = launchDate - now;

  const [countdownFinished, setCountdownFinished] = useState(
    timeRemaining <= 0
  );
  const [countdown, setCountdown] = useState(() => {
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  });

  const useClaimHandle = async () => {
    const tx = await preSale();
    if (tx) {
      onTransactionComplete(tx);
      toast.success("You are all set!");
    }
  };

  const updateCountdown = () => {
    setCountdown((prevCountdown) => {
      const totalSeconds =
        prevCountdown.days * 86400 +
        prevCountdown.hours * 3600 +
        prevCountdown.minutes * 60 +
        prevCountdown.seconds;

      if (totalSeconds > 0) {
        const remainingSeconds = totalSeconds - 1;
        const updatedDays = Math.floor(remainingSeconds / 86400);
        const updatedHours = Math.floor((remainingSeconds % 86400) / 3600);
        const updatedMinutes = Math.floor((remainingSeconds % 3600) / 60);
        const updatedSeconds = remainingSeconds % 60;

        return {
          days: updatedDays,
          hours: updatedHours,
          minutes: updatedMinutes,
          seconds: updatedSeconds,
        };
      } else {
        setCountdownFinished(true);
        return prevCountdown;
      }
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      updateCountdown();
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!countdownFinished) {
    return (
      <div className="container">
        <FunFact title="Pre-Sale Ends In" />
        <Spacing lg="25" md="25" />
        <div style={{ color: "goldenrod" }} className="row">
          <div className="col-md-3">
            <h1 style={{ color: "goldenrod" }}>{countdown.days}</h1>
            <p className="cs_size-20">Days</p>
          </div>
          <div className="col-md-3">
            <h1 style={{ color: "goldenrod" }}>{countdown.hours}</h1>
            <p className="cs_size-20">Hours</p>
          </div>
          <div className="col-md-3">
            <h1 style={{ color: "goldenrod" }}>{countdown.minutes}</h1>
            <p className="cs_size-20">Minutes</p>
          </div>
          <div className="col-md-3">
            <h1 style={{ color: "goldenrod" }}>{countdown.seconds}</h1>
            <p className="cs_size-20">Seconds</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            <Spacing lg="25" md="25" />
            <span onClick={useClaimHandle}>
              <Section tag="span" className="cs-btn cs-btn_filed cs-accent_btn">
                <Icon icon="simple-icons:ethereum" />
                <Section tag="span">{"Claim"}</Section>
              </Section>
            </span>
          </div>
        </div>
      </div>
    );
  } else {
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
          <FunFact title="PreClaim Timer" />
          <Spacing lg="25" md="25" />
          <h1 style={{ color: "goldenrod" }}> Sale Ended </h1>
          <p>Event has already occurred</p>
          <Spacing lg="25" md="25" />
          <Button btnText="Ended">
            <Icon icon="ri:lock-line" />
          </Button>
        </div>
      </div>
    </div>;
  }
};

export default Countdown;