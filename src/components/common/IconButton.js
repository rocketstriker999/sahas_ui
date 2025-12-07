export default function IconButton({ icon, onClick, color, className }) {
    return (
        <i
            className={`pi ${icon} ${color} ${className}`}
            onClick={(e) => {
                e.stopPropagation();
                if (onClick) onClick(e);
            }}
        />
    );
}
