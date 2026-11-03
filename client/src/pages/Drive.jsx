import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useApp } from "../context/AppContext";
import { useDrive } from "../hooks/useDrive";

import Breadcrumbs from "../components/layout/Breadcrumbs";
import FileGrid from "../components/files/FileGrid";
import FilePreview from "../components/files/FilePreview";
import ShareModal from "../components/files/ShareModal";
import RenameModal from "../components/files/RenameModal";
import MoveModal from "../components/files/MoveModal";
import { ConfirmDialog } from "../components/ui/ConfirmDialog";

const Drive = () => {
  const navigate = useNavigate();
  const { folderId } = useParams();
  const { fetchDriveContent, setCurrentFolderId } = useApp();
  const { deleteItem: removeDriveItem } = useDrive();

  // Active item modal
  const [previewFile, setPreviewFile] = useState(null);
  const [shareItem, setShareItem] = useState(null);
  const [renameItem, setRenameItem] = useState(null);
  const [moveItem, setMoveItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);

  useEffect(() => {
    const id = folderId || null;
    setCurrentFolderId(id);
    fetchDriveContent(id);
  }, [folderId, fetchDriveContent, setCurrentFolderId]);

  const handleConfirmDelete = async () => {
    if (!deleteItem) return;
    await removeDriveItem(deleteItem);
    setDeleteItem(null);
  }

  return (
    <div className="space-y-4">
      {/* Breadcrumbs */}
      <Breadcrumbs />

      {/* Folder & Files */}
      <div className="space-y-6">
        <FileGrid
          onFolderClick={(folder) => navigate(`/drive/${folder.id}`)}
          onPreviewFile={setPreviewFile}
          onShareItem={setShareItem}
          onRenameItem={setRenameItem}
          onMoveItem={setMoveItem}
          onDeleteItem={setDeleteItem}
        />
      </div>

      {/* Modals */}
      {previewFile && (
        <FilePreview file={previewFile} onClose={() => setPreviewFile(null)} />
      )}
      {shareItem && (
        <ShareModal
          isOpen={!!shareItem}
          item={shareItem}
          onClose={() => setShareItem(null)}
        />
      )}
      {renameItem && (
        <RenameModal
          item={renameItem}
          isOpen={!!renameItem}
          onClose={() => setRenameItem(null)}
        />
      )}
      {moveItem && (
        <MoveModal
          item={moveItem}
          isOpen={!!moveItem}
          onClose={() => setMoveItem(null)}
        />
      )}

      {deleteItem && (
        <ConfirmDialog
          isOpen={!!deleteItem}
          onClose={() => setDeleteItem(null)}
          onConfirm={handleConfirmDelete}
          title={`Move ${deleteItem.name} to Trash?`}
          message="You can restore this item from Trash at any time"
          confirmText="Move to Trash"
        />
      )}
    </div>
  );
};

export default Drive;
