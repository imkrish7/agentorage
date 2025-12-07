import { EditorContent, EditorContext, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { BlockquoteButton } from "./tiptap-ui/blockquote-button";
import { UndoRedoButton } from "./tiptap-ui/undo-redo-button";
import { TextAlignButton } from "./tiptap-ui/text-align-button";
import { ColorHighlightPopover } from "./tiptap-ui/color-highlight-popover";
import { HeadingDropdownMenu } from "./tiptap-ui/heading-dropdown-menu";
import { ImageUploadButton } from "./tiptap-ui/image-upload-button";
import { LinkPopover } from "./tiptap-ui/link-popover";
import { ListButton } from "./tiptap-ui/list-button";
import { MarkButton } from "./tiptap-ui/mark-button";

const Editor = () => {
	const editor = useEditor({
		immediatelyRender: false,
		extensions: [StarterKit],
		editable: true,
		textDirection: "ltr",
	});
	return (
		<EditorContext.Provider value={{ editor }}>
			<div className="flex w-full">
				<UndoRedoButton
					hideWhenUnavailable={true}
					showShortcut={true}
					action="undo"
					editor={editor}
				/>
				<TextAlignButton align="left" editor={editor} />
				<HeadingDropdownMenu editor={editor} />
				<LinkPopover editor={editor} />
				<MarkButton type="bold" editor={editor} />
				<MarkButton type="code" editor={editor} />
				<MarkButton type="italic" editor={editor} />
				<MarkButton type="strike" editor={editor} />
				<MarkButton type="subscript" editor={editor} />
				<MarkButton type="superscript" editor={editor} />
				<MarkButton type="underline" editor={editor} />
				<ListButton type="bulletList" editor={editor} />
				<ListButton type="orderedList" editor={editor} />
				<ListButton type="taskList" editor={editor} />
				<ImageUploadButton editor={editor} />
				<BlockquoteButton editor={editor} />
				<ColorHighlightPopover editor={editor} />
			</div>
			<div className="border-b border-gray-200" />
			<EditorContent
				className="flex-1"
				editor={editor}
				role="presentation"
			></EditorContent>
		</EditorContext.Provider>
	);
};

export default Editor;
