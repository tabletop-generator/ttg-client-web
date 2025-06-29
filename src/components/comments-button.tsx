import { MessageCircle } from "lucide-react";
import Link from "next/link";

export default function CommentsButton({
  commentCount,
}: {
  commentCount: number;
}) {
  return (
    <Link href="#comments">
      <button className="btn btn-ghost gap-1">
        <MessageCircle size={20} className="opacity-80" />
        <span>{commentCount.toString()}</span>
      </button>
    </Link>
  );
}
