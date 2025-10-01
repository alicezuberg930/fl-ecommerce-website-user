'use client'
import useCountdown from "@/hooks/useCountdown";

export default function CountDownTimer() {
    const { hours, minutes, seconds } = useCountdown(new Date(Date.now() + 7200000));

    return (
        <div className="timer_deal_brand" id="clockdiv">
            <div className="item_count_down"><b className="days">00</b></div>
            <span> : </span>
            <div className="item_count_down"><b className="hour">{hours}</b></div>
            <span> : </span>
            <div className="item_count_down"><b className="minute">{minutes}</b></div>
            <span> : </span>
            <div className="item_count_down"><b className="second">{seconds}</b></div>
        </div>
    )
}