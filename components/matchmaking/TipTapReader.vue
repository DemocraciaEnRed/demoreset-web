<template>
  <editor-content :editor="editor" />
</template>

<script>
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import StarterKit from '@tiptap/starter-kit'
import { Editor, EditorContent } from '@tiptap/vue-2'

export default {
  name: 'TipTapReader',
  components: {
    EditorContent
  },
  props: {
    content: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      editor: null
    }
  },
  mounted () {
    this.editor = new Editor({
      editable: false,
      content: `${this.content}`,
      extensions: [
        StarterKit,
        TextAlign.configure({
          types: ['heading', 'paragraph']
        }),
        Highlight
      ]
    })
  },

  beforeUnmount () {
    this.editor.destroy()
  }
}
</script>

<style lang="scss">
.ProseMirror {
  > * + * {
    margin-top: 0.75em;
  }
}
</style>
