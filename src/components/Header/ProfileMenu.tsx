import React from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Icon } from "@iconify/react";

type Props = {};

const ProfileMenu = (props: Props) => {
  return (
    <div>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className=" flex gap-4 py-3 px-3 rounded-full items-center hover:shadow-md border cursor-pointer">
            <Icon icon="svg-spinners:3-dots-bounce" />
            <Icon icon="gg:profile" className="w-6 h-6" />
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Profile</ContextMenuItem>
          <ContextMenuItem>Billing</ContextMenuItem>
          <ContextMenuItem>Team</ContextMenuItem>
          <ContextMenuItem>Subscription</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
};

export default ProfileMenu;


