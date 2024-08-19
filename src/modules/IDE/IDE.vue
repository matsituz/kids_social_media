<!-- <template>
    <div class="code-editor-container">
      <div class="code-editor" ref="editorContainer"></div>
      <iframe class="preview-window" ref="previewWindow"></iframe>
    </div>
  </template>
  
  <script>
  import * as monaco from 'monaco-editor';
  
  export default {
    mounted() {
      this.editor = monaco.editor.create(this.$refs.editorContainer, {
        value: 'console.log("Hello, World!")',
        language: 'javascript'
      });
  
      // Обновление предварительного окна при изменении содержимого редактора
      this.editor.onDidChangeModelContent(() => {
        this.updatePreview();
      });
  
      // Инициализация предварительного окна
      this.updatePreview();
    },
    beforeUnmount() {
      this.editor.dispose();
    },
    methods: {
      updatePreview() {
        const previewWindow = this.$refs.previewWindow;
        const previewDocument = previewWindow.contentDocument || previewWindow.contentWindow.document;
  
        // Получение содержимого редактора
        const code = this.editor.getValue();
  
        // Обновление содержимого предварительного окна
        previewDocument.open();
        previewDocument.write(code);
        previewDocument.close();
      }
    }
  };
  </script>
  
  <style>
  .code-editor-container {
    display: flex;
  }
  
  .code-editor {
    flex: 1;
    height: 400px;
  }
  
  .preview-window {
    flex: 1;
    height: 400px;
  }
  </style>
   -->
<template>
  <div class="code-editor-container">
    <div class="code-editor html-editor" ref="htmlEditor"></div>
    <div class="code-editor css-editor" ref="cssEditor"></div>
    <div class="code-editor js-editor" ref="jsEditor"></div>
  </div>
</template>

<script>
import * as monaco from "monaco-editor";

export default {
  mounted() {
    // Создание редакторов для каждого языка
    this.htmlEditor = monaco.editor.create(this.$refs.htmlEditor, {
      value:
        "<!DOCTYPE html>\n<html>\n<head>\n</head>\n<body>\n</body>\n</html>",
      language: "html",
    });

    this.cssEditor = monaco.editor.create(this.$refs.cssEditor, {
      value: "",
      language: "css",
    });

    this.jsEditor = monaco.editor.create(this.$refs.jsEditor, {
      value: "",
      language: "javascript",
    });
    monaco.editor.defineTheme("vs-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "comment", foreground: "008000" },
        { token: "keyword", foreground: "0000ff" },
        { token: "string", foreground: "a31515" },
      ],
      colors: {},
    });

    // Установка темы "Visual Studio Dark" для редактора
    monaco.editor.setTheme("vs-dark");
  },
  beforeUnmount() {
    // Освобождение ресурсов редакторов
    this.htmlEditor.dispose();
    this.cssEditor.dispose();
    this.jsEditor.dispose();
  },
};
</script>

<style>
.code-editor-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
}

.code-editor {
  height: 400px;
}
</style>
