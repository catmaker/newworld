//Toolbar.tsx
import React from "react";
import { Editor } from "@tiptap/react";
import { Icon } from "./Icons";
import styles from "./toolbar.module.scss";
interface ToolBarProps {
  editor: Editor | null;
}
function ToolBar({ editor }: ToolBarProps) {
  if (!editor) return null;

  return (
    <div className={styles.flex}>
      <div>
        <Icon.H1 editor={editor} />
        <Icon.H2 editor={editor} />
        <Icon.H3 editor={editor} />
        <Icon.Bold editor={editor} />
        <Icon.Italic editor={editor} />
        <Icon.Strikethrough editor={editor} />
        <Icon.Code editor={editor} />
        <Icon.Quote editor={editor} />
      </div>
      <div></div>

      <div></div>
    </div>
  );
}

export default ToolBar;
