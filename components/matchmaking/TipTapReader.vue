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
// eslint-disable-next-line import/no-named-as-default
import Link from '@tiptap/extension-link'
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
        Highlight,
        Link
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
.ProseMirror{
   > * + * {
    margin-top: 0.75em;
  }
  h1{
    font-family: 'Roboto Condensed', sans-serif;
    font-size:26px;
    font-weight:500
  }
  h2{
    font-family: 'Roboto Condensed', sans-serif;
    font-size:18px;
    font-weight:500
  }
  h3{
    font-family: 'Roboto Condensed', sans-serif;
    font-size:16px;
    font-weight:500
  }
  ol, ul{
    margin-left: 16px;
  }
  ul{
    list-style: disc;
  }
}

.tip-tap-editor .ProseMirror{
    min-height: 500px;
    padding: 16px;
    background-color: hsl(0deg, 0%, 100%);
    border: 1px solid hsl(0deg, 0%, 86%);
    border-radius: 4px;
    color: hsl(0deg, 0%, 21%);
    &:hover{
        border-color: rgb(181, 181, 181);
    }
    &:focus-visible{
        outline: 0;
        border-color: hsl(229deg, 53%, 53%);
        box-shadow: 0 0 0 0.125em rgba(72, 95, 199, 0.25);
    }
}
</style>
