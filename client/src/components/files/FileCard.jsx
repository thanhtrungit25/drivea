import React from "react";
import { format } from "date-fns";
import { formatBytes, getFileIcon } from "../../assets/assets";
import { ItemDropdown } from "../ui/ItemDropdown";

const FileCard = ({ file, onPreview, onShare, onRename, onMove, onDelete }) => {
  return (
    <div className="group relative min-w-xs bg-white border-slate-200 hover:border-orange-200 rounded-2xl p-4 transition-all duration-200 cursor-pointer flex items-center justify-between">
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
          {getFileIcon(file.mime_type, "size-6")}
        </div>
        <div>
          <h4
            className="text-sm font-medium text-slate-800 truncate group-hover:text-orange-700 transition-colors"
            title={file.name}
          >
            {file.name}
          </h4>
          <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
            <span>{formatBytes(file.size)}</span>
            <span>{format(new Date(file.created_at), "MMM d, yyyy")}</span>
          </div>
        </div>
      </div>

      <ItemDropdown
        item={file}
        onPreview={onPreview}
        onShare={onShare}
        onRename={onRename}
        onMove={onMove}
        onDelete={onDelete}
      />
    </div>
  );
};

export default FileCard;
