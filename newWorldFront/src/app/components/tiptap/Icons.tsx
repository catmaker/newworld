import { Editor } from "@tiptap/core";
import { ReactComponent as H1Icon } from "./img/h1.svg";
import { ReactComponent as H2Icon } from "./img/h2.svg";
import { ReactComponent as H3Icon } from "./img/h3.svg";
import { ReactComponent as BoldIcon } from "./img/bold.svg";
import { ReactComponent as ItalicIcon } from "./img/italic.svg";
import { ReactComponent as StrikethroughIcon } from "./img/strikethrough.svg";
import { ReactComponent as CodeIcon } from "./img/code.svg";
import { ReactComponent as QuoteIcon } from "./img/quote.svg";
import "./icons.css";
interface IconProps {
  editor: Editor | null;
}

const H1: React.FC<IconProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }
  return (
    <button onClick={() => editor.chain().toggleHeading({ level: 1 }).run()}>
      <H1Icon />
    </button>
  );
};

const H2: React.FC<IconProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }
  return (
    <button onClick={() => editor.chain().toggleHeading({ level: 2 }).run()}>
      <H2Icon />
    </button>
  );
};

const H3: React.FC<IconProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }
  return (
    <button onClick={() => editor.chain().toggleHeading({ level: 3 }).run()}>
      <H3Icon />
    </button>
  );
};

const Bold: React.FC<IconProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }
  return (
    <button onClick={() => editor.chain().toggleBold().run()}>
      <BoldIcon />
    </button>
  );
};

const Italic: React.FC<IconProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }
  return (
    <button onClick={() => editor.chain().toggleItalic().run()}>
      <ItalicIcon />
    </button>
  );
};

const Strikethrough: React.FC<IconProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }
  return (
    <button onClick={() => editor.chain().toggleStrike().run()}>
      <StrikethroughIcon />
    </button>
  );
};

const Code: React.FC<IconProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }
  return (
    <button className="code" onClick={() => editor.chain().toggleCode().run()}>
      <CodeIcon />
    </button>
  );
};

const Quote: React.FC<IconProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }
  return (
    <button onClick={() => editor.chain().toggleBlockquote().run()}>
      <QuoteIcon />
    </button>
  );
};
const ColorButton: React.FC<{ editor: Editor }> = ({ editor }) => {
  if (!editor) {
    return null;
  }
  return (
    <input
      type="color"
      onInput={(event) => {
        const target = event.target as HTMLInputElement;
        editor.chain().focus().setColor(target.value).run();
      }}
      value={editor.getAttributes("textStyle").color}
      data-testid="setColor"
      style={{
        backgroundColor: "transparent",
        border: "none",
        padding: "3px",
      }}
    />
  );
};
export const Icon = {
  H1,
  H2,
  H3,
  Bold,
  Italic,
  Strikethrough,
  Code,
  Quote,
  ColorButton,
};
