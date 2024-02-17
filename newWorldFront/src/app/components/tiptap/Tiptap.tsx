//Tiptap.tsx
import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import ToolBar from "./Toolbar";
import styles from "./toolbar.module.scss";
//tiptap
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import { TextStyle } from "@tiptap/extension-text-style";
import { Document as TiptapDocument } from "@tiptap/extension-document";
import { Paragraph } from "@tiptap/extension-paragraph";
import { Text as TiptapText } from "@tiptap/extension-text";
import { Color } from "@tiptap/extension-color";
interface TiptapProps {
  content: string;
}

const Tiptap = ({ content }: TiptapProps) => {
  const lowlight = createLowlight(common);
  const editor = useEditor({
    extensions: [
      Color,
      TiptapText,
      TiptapDocument,
      Paragraph,
      TextStyle,
      StarterKit,
      Highlight,
      Image.configure({ inline: true, allowBase64: true }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content: `
   
  `,
  });

  useEffect(() => {
    if (content) {
      editor?.commands.setContent(content);
    }
  }, [content]);
  return (
    <div className="border-2">
      <ToolBar editor={editor} />
      <input
        type="text"
        className={styles.h1}
        placeholder="제목을 입력해주세요."
      />
      <EditorContent
        id="tiptap"
        editor={editor}
        onClick={() => editor?.commands.focus()}
        className={styles.editor}
      />
    </div>
  );
};

export default Tiptap;
