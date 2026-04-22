import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 md:text-[0.95rem] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground border border-primary-border",
        destructive: "bg-destructive text-destructive-foreground shadow-sm border-destructive-border",
        outline: "border [border-color:var(--button-outline)] shadow-xs active:shadow-none",
        secondary: "border bg-secondary text-secondary-foreground border border-secondary-border",
        ghost: "border border-transparent",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "min-h-10 px-4 py-2.5 md:min-h-11 md:px-5",
        sm: "min-h-9 rounded-md px-3.5 text-xs md:min-h-10 md:px-4 md:text-sm",
        lg: "min-h-11 rounded-md px-8 md:min-h-12 md:px-10 md:text-base",
        icon: "h-10 w-10 md:h-11 md:w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);
