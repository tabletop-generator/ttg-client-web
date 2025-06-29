import { Share2 } from "lucide-react";

export default function ShareButton() {
  return (
    <button
      onClick={() => navigator.clipboard.writeText(window.location.href)}
      className="btn btn-ghost gap-1"
    >
      <Share2 size={20} className="opacity-80" />
      <span>Share</span>
    </button>
  );
}
