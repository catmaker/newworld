//Tiptap.tsx
import React, { useEffect, useState } from "react";
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
import { RankingProps } from "@/app/types/Ranking";
import { getRankingAPI } from "@/app/lib/api/ranking";
import { postsCreateAPI } from "@/app/lib/api/community";
interface TiptapProps {
  content: string;
}

const Tiptap = ({ content }: TiptapProps) => {
  const [title, setTitle] = useState("");

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
  const getEditorContent = () => {
    return editor?.getHTML();
  };
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  useEffect(() => {
    if (content) {
      editor?.commands.setContent(content);
    }
  }, [content]);

  const handleRegisterClick = async (e: any) => {
    e.preventDefault();
    const editorContent = getEditorContent();
    try {
      const response = await postsCreateAPI({
        title,
        content: editorContent,
      });

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="border-2">
        <ToolBar editor={editor} />
        <input
          type="text"
          className={styles.h1}
          placeholder="제목을 입력해주세요."
          value={title}
          onChange={handleTitleChange}
        />
        <EditorContent
          id="tiptap"
          editor={editor}
          onClick={() => editor?.commands.focus()}
          className={styles.editor}
        />
      </div>{" "}
      <div className={styles.button_box}>
        <button className={styles.tiptap_button}>취소</button>
        <button onClick={handleRegisterClick} className={styles.tiptap_button}>
          등록
        </button>
      </div>
    </>
  );
};

export default Tiptap;
