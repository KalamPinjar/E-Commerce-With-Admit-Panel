"use client";

import { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import { Button } from "@/components/ui/button";

interface AleartModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
  loading: boolean;
}

export const AlertModal: React.FC<AleartModalProps> = ({
  isOpen,
  onConfirm,
  onClose,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Modal
        title="Are you sure?"
        description="This action cannot be undone."
        isOpen={isOpen}
        onClose={onClose}
      >
        <div className="flex justify-end items-center space-x-2 pt-6 w-full">
          <Button disabled={loading} onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={loading} variant="destructive" onClick={onConfirm}>
            Confirm
          </Button>
        </div>
      </Modal>
    </>
  );
};
