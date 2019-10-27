export enum ButtonVariant {
    OUTLINED,
    DANGER
}

export interface ButtonProps {
    style?: React.CSSProperties;
    variant?: ButtonVariant;
    label: string;
    onClick: () => void;
    to?: string;
}
