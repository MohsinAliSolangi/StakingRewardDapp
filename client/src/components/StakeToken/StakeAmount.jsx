import React from "react"; 
import { useContext, useRef } from "react";
import { ethers } from "ethers";
import Button from "../Button/Button";
import { toast } from "react-hot-toast";
import "./StakeToken.css";
import { Store } from "../../Store/Store";

const StakeAmount = () => {
  const { loader, setloader, getSignerStakingContrat } = useContext(Store);

  const stakeAmountRef = useRef();

  const stakeToken = async (e) => {
    e.preventDefault();
    const amount = stakeAmountRef.current.value.trim();
    console.log(amount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid positive number.");
      return;
    }
    const amountToStake = ethers.utils.parseUnits(amount, 18).toString();
    try {
      const transaction = await getSignerStakingContrat().stake(amountToStake);
      await toast.promise(transaction.wait(), {
        loading: "Transaction is pending...",
        success: "Transaction successful 👌",
        error: "Transaction failed 🤯",
      });
      stakeAmountRef.current.value = "";
      setloader(!loader);
      // if (receipt.status === 1) {
      //     setloader(!loader);
      //     stakeAmountRef.current.value = "";
      //   } else {
      //       toast.error("Transaction failed. Please try again.")
      //   }
    } catch (error) {
      toast.error("Staking Failed");
      console.error(error.message);
    }
  };
  return (
    <form onSubmit={stakeToken} className="stake-amount-form">
      <label className="stake-input-label">Enter Staked Amount:</label>
      <input type="text" ref={stakeAmountRef} />
      <Button onClick={stakeToken} type="submit" label="Stake Token" />
    </form>
  );
};
export default StakeAmount;
