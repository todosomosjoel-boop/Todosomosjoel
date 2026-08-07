import { Clock3, Dumbbell, Play } from "lucide-react";

export function VideoCard({ video, compact = false }: { video: any; compact?: boolean }) {
  return <article className={compact ? "video-card compact" : "video-card"}>
    <div className="video-thumb"><span className="video-kicker">{video.category}</span><button aria-label={`Reproducir ${video.title}`}><Play size={20} fill="currentColor" /></button><small>{video.duration}</small></div>
    <div className="video-body"><div><h3>{video.title}</h3><p>{video.note}</p></div><div className="video-meta"><span><Dumbbell size={14}/>{video.equipment}</span><span><Clock3 size={14}/>{video.level}</span></div></div>
  </article>;
}
