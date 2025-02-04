import { Media } from "@/types";

interface MediaContentProps {
  media: Media;
  className?: string;
}

export function MediaContent({ media, className = "" }: MediaContentProps) {
  const baseStyles = "w-full rounded-xl overflow-hidden";
  const containerStyles = media.type === 'video' ? 'aspect-video' : 'h-48';

  return (
    <div className={`${baseStyles} ${containerStyles} ${className}`}>
      {media.type === 'video' ? (
        <iframe
          className="w-full h-full"
          src={media.src}
          title={media.alt}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <img 
          src={media.src}
          alt={media.alt || ''}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
} 