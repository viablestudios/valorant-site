export function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span role="img" aria-label={`${rating} out of 5 stars`} style={{ display: "inline-flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 16 16" aria-hidden="true">
          <path
            d="M8 1.2 10 6l5.1.4-3.9 3.3 1.2 5L8 12l-4.4 2.7 1.2-5L.9 6.4 6 6z"
            fill={i <= Math.round(rating) ? "var(--gold)" : "rgba(236,232,225,.14)"}
          />
        </svg>
      ))}
    </span>
  );
}
