//Tiptap.tsx
import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import ToolBar from "./Toolbar";
import styles from "@/app/assets/scss/section/_communityPostToolbar.module.scss";
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

import { postsCreateAPI, postsUpdateAPI } from "@/app/lib/api/community";
import { useRouter } from "next/navigation";
interface TiptapProps {
  content: string;
  nickname: string;
  originTitle?: string;
  originCategory?: string;
  originDetail?: string;
}

const Tiptap = ({
  content,
  nickname,
  originTitle,
  originDetail,
  originCategory,
}: TiptapProps) => {
  const router = useRouter();
  const [title, setTitle] = useState(originTitle); // 원래의 제목을 초기값으로 설정
  const [selectedOption, setSelectedOption] = useState("QUESTION");
  const lowlight = createLowlight(common);
  const isEditMode = !!originDetail;
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
    content: originDetail,
  });
  const getEditorContent = () => {
    return editor?.getHTML();
  };
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    if (content) {
      editor?.commands.setContent(content);
    }
  }, [content]);

  const handleRegisterClick = async (e: any) => {
    e.preventDefault();
    if (isEditMode) {
      const data = await postsUpdateAPI({
        postId: 1,
        title: title,
        detail: getEditorContent(),
        postType: selectedOption,
        nickname: nickname,
      });
    } else {
      // 게시글 등록 로직
      if (title?.trim() === "") {
        alert("제목을 입력해주세요.");
        return;
      }
      if (getEditorContent() === "") {
        alert("내용을 입력해주세요.");
        return;
      }
    }

    const editorContent = getEditorContent();

    try {
      const data = await postsCreateAPI({
        title: title,
        detail: editorContent,
        postType: selectedOption,
        nickname: nickname,
      });

      if (data?.status === 200) {
        router.push(`/community/${data.data.postId}`);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="border-2">
        <div>커뮤니티 글 작성 공간입니다.</div>
        <p className={styles.alert}>
          경고: 비방, 불법 콘텐츠, 스팸은 금지되며 위반 시 조치가 취해질 수
          있습니다. 커뮤니티 규칙을 준수해주세요.
        </p>
        <div className={styles.select_category_label}>
          카테고리를 선택해주세요.
        </div>
        <select
          className={styles.select_category}
          value={selectedOption}
          onChange={handleChange}
        >
          <option value="QUESTION">질문</option>
          <option value="NORMAL">기타</option>
        </select>
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
      </div>
      <>
        <div className={styles.button_box}>
          {isEditMode ? (
            <button
              onClick={handleRegisterClick}
              className={styles.tiptap_button}
            >
              수정
            </button>
          ) : (
            <button
              onClick={handleRegisterClick}
              className={styles.tiptap_button}
            >
              등록
            </button>
          )}
        </div>
      </>
    </>
  );
};

export default Tiptap;
