//Toolbar.tsx
import React from "react";
import { Editor } from "@tiptap/react";
import { Icon } from "./Icons";
import styles from "@/app/assets/scss/section/_communityPostToolbar.module.scss";

interface ToolBarProps {
  editor: Editor | null;
}
function ToolBar({ editor }: ToolBarProps) {
  if (!editor) return null;

  return (
    <div className={styles.flex}>
      <form>
        <div>
          <Icon.H1 editor={editor} />
          <Icon.H2 editor={editor} />
          <Icon.H3 editor={editor} />
          <Icon.Bold editor={editor} />
          <Icon.Italic editor={editor} />
          <Icon.Strikethrough editor={editor} />
          <Icon.Code editor={editor} />
          <Icon.Quote editor={editor} />
          <Icon.ColorButton editor={editor} />
        </div>
      </form>
      <div></div>

      <div></div>
    </div>
  );
}

export default ToolBar;
