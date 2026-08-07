export function ProgressBar({ value }: { value: number }) {
  return <div className="progress-track" aria-label={`${value}%`}><span style={{ width: `${value}%` }} /></div>;
}
