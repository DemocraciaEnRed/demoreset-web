<template>
  <editor-content :editor="editor" />
</template>

<script>
// eslint-disable-next-line import/no-named-as-default
import Highlight from '@tiptap/extension-highlight'
// eslint-disable-next-line import/no-named-as-default
import TextAlign from '@tiptap/extension-text-align'
// eslint-disable-next-line import/no-named-as-default
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
      extensions: [
        StarterKit,
        TextAlign.configure({
          types: ['heading', 'paragraph']
        }),
        Highlight
      ],
      content: `${this.content}`
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
