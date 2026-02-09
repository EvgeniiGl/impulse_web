interface IconProps {
    className?: string;
}

export const PlusIcon = ({className = "w-6 h-6"}: IconProps) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 6v12m6-6H6"/>
        <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={2}/>
    </svg>
);
