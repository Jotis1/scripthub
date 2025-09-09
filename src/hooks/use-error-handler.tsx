"use client";

import { useCallback, useState } from "react";

interface UseErrorHandlerReturn {
	error: string | null;
	setError: (error: string | null) => void;
	clearError: () => void;
	handleError: (error: unknown) => void;
}

/**
 * Custom hook for centralized error handling
 */
export function useErrorHandler(): UseErrorHandlerReturn {
	const [error, setError] = useState<string | null>(null);

	const clearError = useCallback(() => {
		setError(null);
	}, []);

	const handleError = useCallback((error: unknown) => {
		if (error instanceof Error) {
			setError(error.message);
		} else if (typeof error === "string") {
			setError(error);
		} else {
			setError("An unexpected error occurred");
		}

		console.error("Error:", error);
	}, []);

	return {
		error,
		setError,
		clearError,
		handleError,
	};
}
