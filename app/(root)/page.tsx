"use client";

import { Modal } from "@/components/ui/modal";
import { useEffect, useState } from "react";

const SetupPage = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="p-4">
      {isClient && (
        <Modal title="Test" description="Test desc" isOpen onClose={() => {}}>
          children
        </Modal>
      )}
    </div>
  );
};

export default SetupPage;
