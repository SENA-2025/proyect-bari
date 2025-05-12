"use client";

import { Calendar, Clock } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export default function CurrentDate({ initialDate }: { initialDate: string }) {
	const [date, setDate] = useState("");
	const [time, setTime] = useState("");

	// Opciones de formato para la fecha y hora
	// Se utilizan useMemo para evitar que se recalculen en cada renderizado
	// y así mejorar el rendimiento
	const dateOptions = useMemo<Intl.DateTimeFormatOptions>(() => ({ weekday: "long", year: "numeric", month: "long", day: "numeric" }), []);
	const timeOptions = useMemo<Intl.DateTimeFormatOptions>(() => ({ hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true }), []);

	// Efecto para actualizar la fecha y hora
	useEffect(() => {
		const initialTimestamp = new Date(initialDate).getTime();
		const start = performance.now();

		// Función para actualizar la fecha y hora
		const updateDateTime = () => {
			const now = new Date(initialTimestamp + (performance.now() - start));

			const newDate = now.toLocaleDateString("es-CO", dateOptions);
			const newTime = now.toLocaleTimeString("es-CO", timeOptions);

			setDate(prev => (prev !== newDate ? newDate : prev));
			setTime(prev => (prev !== newTime ? newTime : prev));
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
			{date && (
				<div className="animate-fade-in hidden items-center gap-1 text-gray-600 md:flex">
					<Calendar className="text-gray-400" size={14} />
					<span className="text-xs transition-all duration-300 ease-in-out lg:text-sm">{date}</span>
				</div>
			)}

			{/* Hora */}
			{time && (
				<div className="bg-primary-400/10 animate-fade-in flex items-center gap-1 rounded-full px-3 py-1">
					<Clock className="text-tertiary-600" size={14} />
					<span className="text-xs text-gray-700 transition-all duration-300 ease-in-out lg:text-sm">{time}</span>
				</div>
			)}
		</div>
	);
}
