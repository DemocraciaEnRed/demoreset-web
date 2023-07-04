<template>
  <div>
    <div v-if="editor" class="is-flex is-flex-wrap-wrap my-3">
      <button :class="`button is-primary is-light ${editor.isActive('heading', { level: 1 })? 'is-active': ''}`" @click.prevent="editor.chain().focus().toggleHeading({ level: 1 }).run()">
        <b-icon
          pack="fas"
          icon="heading"
          custom-size="fa-lg"
        />
      </button>
      <button :class="`button is-primary is-light ${editor.isActive('heading', { level: 2 })? 'is-active': ''}`" @click.prevent="editor.chain().focus().toggleHeading({ level: 2 }).run()">
        <b-icon
          pack="fas"
          icon="heading"
          size="is-small"
        />
      </button>
      <button :class="`button is-primary is-light ${editor.isActive('heading', { level: 3 })? 'is-active': ''}`" @click.prevent="editor.chain().focus().toggleHeading({ level: 3 }).run()">
        <b-icon
          pack="fas"
          icon="heading"
          custom-size="fa-sm"
        />
      </button>
      <!-- <button :class="`button is-primary is-light ${editor.isActive('paragraph')? 'is-active': ''}`" @click.prevent="editor.chain().focus().setParagraph().run()">
        <b-icon
          pack="fas"
          icon="paragraph"
          size="is-small"
        />
      </button> -->
      <button :class="`button is-primary is-light ${editor.isActive('bold')? 'is-active': ''}`" @click.prevent="editor.chain().focus().toggleBold().run()">
        <b-icon
          pack="fas"
          icon="bold"
          size="is-small"
        />
      </button>
      <button :class="`button is-primary is-light ${editor.isActive('italic')? 'is-active': ''}`" @click.prevent="editor.chain().focus().toggleItalic().run()">
        <b-icon
          pack="fas"
          icon="italic"
          size="is-small"
        />
      </button>
      <button :class="`button is-primary is-light ${editor.isActive('strike')? 'is-active': ''}`" @click.prevent="editor.chain().focus().toggleStrike().run()">
        <b-icon
          pack="fas"
          icon="strikethrough"
          size="is-small"
        />
      </button>
      <button :class="`button is-primary is-light ${editor.isActive('hightlight')? 'is-active': ''}`" @click.prevent="editor.chain().focus().toggleHighlight().run()">
        <b-icon
          pack="fas"
          icon="highlighter"
          size="is-small"
        />
      </button>
      <button :class="`button is-primary is-light ${editor.isActive('orderedList')? 'is-active': ''}`" @click.prevent="editor.chain().focus().toggleOrderedList().run()">
        <b-icon
          pack="fas"
          icon="list-ol"
          size="is-small"
        />
      </button>
      <button :class="`button is-primary is-light ${editor.isActive('bulletList')? 'is-active': ''}`" @click.prevent="editor.chain().focus().toggleBulletList().run()">
        <b-icon
          pack="fas"
          icon="list-ul"
          size="is-small"
        />
      </button>
      <button :class="`button is-primary is-light ${editor.isActive({ textAlign: 'left' })? 'is-active': ''}`" @click.prevent="editor.chain().focus().setTextAlign('left').run()">
        <b-icon
          pack="fas"
          icon="align-left"
          size="is-small"
        />
      </button>
      <button :class="`button is-primary is-light ${editor.isActive({ textAlign: 'center' })? 'is-active': ''}`" @click.prevent="editor.chain().focus().setTextAlign('center').run()">
        <b-icon
          pack="fas"
          icon="align-center"
          size="is-small"
        />
      </button>
      <button :class="`button is-primary is-light ${editor.isActive({ textAlign: 'right' })? 'is-active': ''}`" @click.prevent="editor.chain().focus().setTextAlign('right').run()">
        <b-icon
          pack="fas"
          icon="align-right"
          size="is-small"
        />
      </button>
      <button :class="`button is-primary is-light ${editor.isActive({ textAlign: 'justify' })? 'is-active': ''}`" @click.prevent="editor.chain().focus().setTextAlign('justify').run()">
        <b-icon
          pack="fas"
          icon="align-justify"
          size="is-small"
        />
      </button>
      <button :class="`button is-primary is-light ${editor.isActive('link')? 'is-active': ''}`" @click.prevent="setLink">
        <b-icon
          pack="fas"
          icon="link"
          size="is-small"
        />
      </button>
      <button :class="`button is-primary is-light`" :disabled="!editor.isActive('link')" @click.prevent="editor.chain().focus().unsetLink().run();">
        <b-icon
          pack="fas"
          icon="link-slash"
          size="is-small"
        />
      </button>
    </div>
    <editor-content :editor="editor" class="tip-tap-editor" />
  </div>
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
  components: {
    EditorContent
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },

  // emits: ['update:modelValue'],

  data () {
    return {
      editor: null
    }
  },
  watch: {
    value (value) {
      const isSame = this.editor.getHTML() === value
      if (isSame) {
        return
      }
      this.editor.commands.setContent(value, false)
    }
  },
  mounted () {
    this.editor = new Editor({
      extensions: [
        StarterKit,
        TextAlign.configure({
          types: ['heading', 'paragraph']
        }),
        Highlight,
        Link
      ],
      content: this.value,
      onUpdate: () => { this.$emit('input', this.editor.getHTML()) }
    })
  },
  beforeUnmount () {
    this.editor.destroy()
  },
  methods: {
    setLink () {
      const previousUrl = this.editor.getAttributes('link').href
      const url = window.prompt('URL', previousUrl)

      // cancelled
      if (url === null) {
        return
      }

      // empty
      if (url === '') {
        this.editor
          .chain()
          .focus()
          .extendMarkRange('link')
          .unsetLink()
          .run()

        return
      }

      // update link
      this.editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url, target: '_blank' })
        .run()
    }
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
  a{
    color:#FF17FD
  }
}

</style>
