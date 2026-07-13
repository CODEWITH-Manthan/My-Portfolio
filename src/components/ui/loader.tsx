'use client';

export default function Loader() {
  return (
    <div className="loader-container">
      <div className="loader-logo">MI</div>
      <div className="text-white/20 text-xs tracking-widest mb-4">MANTHAN ILAKE</div>
      <div className="loader-bar">
        <div className="loader-bar-fill" />
      </div>
      <div className="text-white/15 text-xs tracking-widest mt-4">INITIALIZING PORTFOLIO</div>
    </div>
  );
}
