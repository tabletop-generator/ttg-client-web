import { Bookmark } from "lucide-react";

export default function SaveButton() {
  function openSaveModal() {}

  return (
    <button onClick={openSaveModal} className="btn btn-ghost gap-1">
      <Bookmark size={20} className="opacity-80" />
      <span>Save</span>
    </button>
  );
}
