"use client";

import { CircleDot } from "lucide-react";
import { forwardRef } from "react";
import {
	FormControl,
	FormDescription,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface SelectOption {
	id: number;
	name: string;
}

interface FormSelectFieldProps {
	label: string;
	placeholder: string;
	description: string;
	options: SelectOption[];
	isLoading: boolean;
	onValueChange: (value: string) => void;
	icon?: React.ReactNode;
	disabled?: boolean;
}

export const FormSelectField = forwardRef<
	HTMLButtonElement,
	FormSelectFieldProps
>(
	(
		{
			label,
			placeholder,
			description,
			options,
			isLoading,
			onValueChange,
			icon = <CircleDot className="size-4" />,
			disabled = false,
		},
		ref,
	) => {
		return (
			<FormItem>
				<FormLabel className="flex items-center gap-2">
					{icon}
					{label}
				</FormLabel>
				<Select
					onValueChange={onValueChange}
					disabled={disabled || isLoading}
				>
					<FormControl>
						<SelectTrigger className="w-full" ref={ref}>
							<SelectValue placeholder={placeholder} />
						</SelectTrigger>
					</FormControl>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>{label}</SelectLabel>
							{isLoading ? (
								<SelectItem value="loading" disabled>
									Loading...
								</SelectItem>
							) : options.length === 0 ? (
								<SelectItem value="empty" disabled>
									No {label.toLowerCase()} available
								</SelectItem>
							) : (
								options.map((option) => (
									<SelectItem
										key={option.id}
										value={String(option.id)}
									>
										{option.name}
									</SelectItem>
								))
							)}
						</SelectGroup>
					</SelectContent>
				</Select>
				<FormDescription>{description}</FormDescription>
			</FormItem>
		);
	},
);

FormSelectField.displayName = "FormSelectField";
