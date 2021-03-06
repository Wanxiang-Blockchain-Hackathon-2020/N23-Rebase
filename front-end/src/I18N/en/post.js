import { ABSTRACT_MAX_WORDS } from '@/constant'

export default {
  title: {
    allPosts: 'All Proposals',
    add: 'Add Proposal',
    edit: 'Edit'
  },
  fields: {
    title: 'Title',
    content: 'Content',
  },
  status: {
    posted: 'Posted',
  },
  form: {
    search: 'Search Proposals',
    button: {
      continue: 'Continue',
      cancel: 'Cancel',
      saveDraft: 'Save as Draft',
      save: 'Save & Post'
    },
    fields: {
      title: 'Title',
      desc: 'Content',
    },
    error: {
      required: 'This field is required',
      tooLong: 'This field is too long',
      [`limit${ABSTRACT_MAX_WORDS}`]: `You can only type ${ABSTRACT_MAX_WORDS} words max.`
    }
  },
  modal: {
    addTagComment: 'Add Comment',
    confirm: 'Confirm',
    cancel: 'Cancel',
  },
  header: {
    post: 'post',
  },
  search: {
    number: 'Number',
    title: 'Title',
    abstract: 'Abstract',
    email: 'Author email',
    name: 'Author name'
  },
  btnText: {
    edit: 'Edit',
    add: 'Add',
  }
}
