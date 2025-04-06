import { CircleCheck, CircleX } from "lucide-react";
import { Toaster } from "react-hot-toast";

export default function LoadToaster() {
	return (
		<Toaster
			position="bottom-right"
			gutter={-8}
			toastOptions={{
				duration: 5000,
				success: {
					duration: 2000,
					icon: <CircleCheck className="size-5 shrink-0 text-green-500" />,
					className:
						"z-50 flex items-center gap-2 bg-white text-gray-800 border border-green-300 shadow-md rounded-lg px-3 lg:px-4 py-2 lg:py-3 text-xs lg:text-sm xl:text-base font-medium select-none mx-2 lg:mx-4 mb-4",
				},
				loading: {},
				error: {
					duration: 4000,
					icon: <CircleX className="size-5 shrink-0 text-red-500" />,
					className:
						"z-50 flex items-center gap-2 bg-white text-gray-800 border border-red-300 shadow-md rounded-lg px-3 lg:px-4 py-2 lg:py-3 text-xs lg:text-sm xl:text-base font-medium select-none mx-2 lg:mx-4 mb-4",
				},
			}}
		/>
	);
}
