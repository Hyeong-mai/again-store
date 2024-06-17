"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface TimerProps {
  endBidDate: string;
  productId: number;
}

const Timer: React.FC<TimerProps> = ({ endBidDate, productId }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(endBidDate) - +new Date();
    let timeLeft: { [key: string]: number } = {};

    if (difference > 0) {
      const totalSeconds = Math.floor(difference / 1000);
      timeLeft = {
        시간: Math.floor(totalSeconds / 3600),
        분: Math.floor((totalSeconds % 3600) / 60),
        초: totalSeconds % 60,
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endBidDate]);

  const handleSellComplete = async () => {
    try {
      const response = await axios.post("/api/sellComplete", { productId });
      console.log("판매 완료 처리 성공:", response.data);
    } catch (error) {
      console.error("판매 완료 처리 실패:", error);
    }
  };

  useEffect(() => {
    if (timeLeft.시간 === 0 && timeLeft.분 === 0 && timeLeft.초 === 0) {
      handleSellComplete();
    }
  }, [timeLeft, productId]);

  return (
    <div>
      {timeLeft.시간 !== undefined ||
      timeLeft.분 !== undefined ||
      timeLeft.초 !== undefined ? (
        <span className="text-green-400">
          {timeLeft.시간?.toString().padStart(2, "0")}:
          {timeLeft.분?.toString().padStart(2, "0")}:
          {timeLeft.초?.toString().padStart(2, "0")}
        </span>
      ) : (
        <span className="text-red-500">입찰이 종료되었습니다.</span>
      )}
    </div>
  );
};

export default Timer;
