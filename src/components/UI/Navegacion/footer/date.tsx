"use client";

import { Calendar, Clock } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export default function CurrentDate({ initialDate }: { initialDate: string }) {
	const initialTimestamp = useMemo(() => new Date(initialDate).getTime(), [initialDate]);
	const [dateTime, setDateTime] = useState({ date: "", time: "" });

	const dateOptions = useMemo<Intl.DateTimeFormatOptions>(
		() => ({
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		}),
		[]
	);

	const timeOptions = useMemo<Intl.DateTimeFormatOptions>(
		() => ({
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
			hour12: true,
		}),
		[]
	);

	useEffect(() => {
		const start = performance.now();

		const updateDateTime = () => {
			const elapsed = performance.now() - start;
			const now = new Date(initialTimestamp + elapsed);

			setDateTime({
				date: now.toLocaleDateString("es-CO", dateOptions),
				time: now.toLocaleTimeString("es-CO", timeOptions),
			});
		};

		updateDateTime();

		const interval = setInterval(updateDateTime, 1000);
		return () => clearInterval(interval);
	}, [initialTimestamp, dateOptions, timeOptions]);

	return (
		<div className="flex items-center gap-4">
			{/* Fecha */}
			<div className="hidden items-center gap-1 text-gray-600 md:flex">
				<Calendar className="text-gray-400" size={14} />
				<span className="text-xs lg:text-sm">{dateTime.date}</span>
			</div>

			{/* Hora */}
			<div className="bg-primary-400/5 flex items-center gap-1 rounded-full px-2 py-1">
				<Clock className="text-tertiary-600" size={14} />
				<span className="text-xs text-gray-700 lg:text-sm">{dateTime.time}</span>
			</div>
		</div>
	);
}
