import { useEffect, useState } from "react";
export const useDate = () => {
    const locale = "en";
    const [today, setDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date());
        });
        return () => {
            clearInterval(timer);
        };
    }, []);

    const day = today.toLocaleDateString(locale, { weekday: "short" });
    const date = `${day}, ${today.getDate()} ${today.toLocaleDateString(locale, { month: "long" })}`;

    const hour = today.getHours();
    const wish = `Hello! Good ${(hour < 12 && "Morning") || (hour < 17 && "Afternoon") || "Evening"}`;

    const time = today.toLocaleTimeString(locale, { hour: "numeric", hour12: true, minute: "numeric" });
    const seconds = today.toLocaleTimeString();

    return {
        time,
        date,
        wish,
        seconds
    };
};
