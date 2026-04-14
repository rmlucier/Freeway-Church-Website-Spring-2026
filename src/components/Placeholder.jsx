export default function Placeholder({ label, aspect = '16/9', className = '' }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-fc-black-soft border border-fc-cream/10 ${className}`}
      style={{ aspectRatio: aspect }}
    >
      {/* Diagonal hatch pattern */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, transparent 0 10px, rgba(0,155,141,0.18) 10px 11px)',
        }}
      />
      <div className="relative z-10 text-center px-6">
        <div className="eyebrow mb-2">Image Placeholder</div>
        <div className="font-display font-bold uppercase text-fc-cream/80 text-lg md:text-xl tracking-wide">
          {label}
        </div>
      </div>
    </div>
  );
}
