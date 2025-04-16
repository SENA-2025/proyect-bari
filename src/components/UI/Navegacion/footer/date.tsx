"use client";

import { Calendar, Clock } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export default function CurrentDate({ initialDate }: { initialDate: string }) {
	const [dateTime, setDateTime] = useState({ date: "", time: "" });

	const dateOptions = useMemo<Intl.DateTimeFormatOptions>(() => ({ weekday: "long", year: "numeric", month: "long", day: "numeric" }), []);
	const timeOptions = useMemo<Intl.DateTimeFormatOptions>(() => ({ hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true }), []);

	useEffect(() => {
		const initialTimestamp = new Date(initialDate).getTime();
		const start = performance.now();

		const updateDateTime = () => {
			const now = new Date(initialTimestamp + (performance.now() - start));

			const newDate = now.toLocaleDateString("es-CO", dateOptions);
			const newTime = now.toLocaleTimeString("es-CO", timeOptions);

			setDateTime(prev => {
				if (prev.date === newDate && prev.time === newTime) return prev;
				return { date: newDate, time: newTime };
			});
		};

		updateDateTime(); // first render

		const interval = setInterval(() => {
			requestAnimationFrame(updateDateTime);
		}, 1000);

		return () => clearInterval(interval);
	}, [initialDate, dateOptions, timeOptions]);

	return (
		<div className="flex items-center gap-2">
			{/* Fecha */}
			<div className="hidden items-center gap-1 text-gray-600 md:flex">
				{dateTime.date && (
					<>
						<Calendar className="text-gray-400" size={14} />
						<span className="text-xs lg:text-sm">{dateTime.date}</span>
					</>
				)}
			</div>

			{/* Hora */}
			<div className="bg-primary-400/10 flex items-center gap-1 rounded-full px-3 py-1">
				{dateTime.time && (
					<>
						<Clock className="text-tertiary-600" size={14} />
						<span className="text-xs text-gray-700 lg:text-sm">{dateTime.time}</span>
					</>
				)}
			</div>
		</div>
	);
}
