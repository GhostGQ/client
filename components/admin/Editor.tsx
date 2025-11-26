"use client";

import {EditorContent, useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import styles from "@/components/admin/Editor.module.css";
import {useEffect} from "react";

interface EditorPropsType {
    onUpdateAction: (value: string) => void,
    value: string
}

export default function RichTextEditor({onUpdateAction, value}: EditorPropsType) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.configure({
                openOnClick: false,
            }),
        ],
        content: value,
        immediatelyRender: false,
        onUpdate: ({editor}) => {
            onUpdateAction(editor.getHTML())
        },
    });

    if (!editor) return null;

    return (
        <div className="border rounded shadow-sm">
            <div className={styles.toolbar}>
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`${styles.button} ${
                        editor.isActive("bold") ? styles.active : ""
                    }`}
                >
                    B
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`${styles.button} ${
                        editor.isActive("italic") ? styles.active : ""
                    }`}
                >
                    I
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleHeading({level: 1}).run()}
                    className={`${styles.button} ${
                        editor.isActive("heading", {level: 1}) ? styles.active : ""
                    }`}
                >
                    H1
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
                    className={`${styles.button} ${
                        editor.isActive("heading", {level: 2}) ? styles.active : ""
                    }`}
                >
                    H2
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={`${styles.button} ${
                        editor.isActive("blockquote") ? styles.active : ""
                    }`}
                >
                    ❝ Quote
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`${styles.button} ${
                        editor.isActive("bulletList") ? styles.active : ""
                    }`}
                >
                    • List
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`${styles.button} ${
                        editor.isActive("orderedList") ? styles.active : ""
                    }`}
                >
                    1. List
                </button>

                <button
                    onClick={() => {
                        const url = window.prompt("Введите ссылку:");
                        if (url) {
                            editor.chain().focus().setLink({href: url}).run();
                        }
                    }}
                    className={`${styles.button} ${
                        editor.isActive("link") ? styles.active : ""
                    }`}
                >
                    🔗 Link
                </button>

                <button
                    onClick={() => editor.chain().focus().unsetLink().run()}
                    className={`${styles.button} ${styles.unlink}`}
                >
                    ❌ Unlink
                </button>
            </div>

            <EditorContent editor={editor} className={styles.editor}/>
        </div>
    );
}
